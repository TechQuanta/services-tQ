"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Check } from 'lucide-react';

// Import the centralized configuration
import appConfig from '../../../lib/data.json'; 

// Destructure the necessary data, including the static exchangeRates
const { 
    header, 
    tabs, 
    cta, 
    budgetPlan: BUDGET_PLAN, 
    apiConfig 
} = appConfig.pages.pricingPage;

const API_URL = apiConfig.url;
const INITIAL_PRICING_STATE = apiConfig.initialState;
const STATIC_EXCHANGE_RATES = apiConfig.exchangeRates || {}; 

// --- 1. UTILITY FUNCTIONS FOR DYNAMIC CURRENCY & LOCALIZATION ---

/**
 * Maps the Timezone ID to the standard currency code for regions where locale detection fails.
 */
const TIMEZONE_TO_CURRENCY_MAP = {
    'Asia/Kolkata': 'INR', // Guaranteed fix for India
    'Europe/London': 'GBP',
    'Europe/Paris': 'EUR',
    'Asia/Tokyo': 'JPY',
    // We rely on Intl.NumberFormat for the rest of the world.
};

/**
 * Step 1 (Primary): Detects the currency from the user's timezone.
 */
const getCurrencyCodeFromTimezone = () => {
    try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const currencyCode = TIMEZONE_TO_CURRENCY_MAP[timeZone];
        
        if (currencyCode) {
            return currencyCode.toUpperCase();
        }
    } catch (e) {
        // Silent failure
    }
    return null; 
};

/**
 * Step 2 (Fallback): Detects the currency from the user's browser locale settings.
 */
const getPassiveLocalCurrencyCode = () => {
    try {
        const locale = navigator.language;
        const formatter = new Intl.NumberFormat(locale, { 
            style: 'currency', 
            currency: 'USD'
        });
        
        const currencyCode = formatter.resolvedOptions().currency;

        if (currencyCode) {
            return currencyCode.toUpperCase();
        }
    } catch (e) {
        // Silent failure
    }
    return 'USD';
};

/**
 * Primary function to resolve the user's currency using the best available method.
 */
const resolveUserCurrency = async () => {
    // 1. Try Timezone detection
    const timezoneCurrency = getCurrencyCodeFromTimezone();
    if (timezoneCurrency) {
        return timezoneCurrency;
    }

    // 2. Fallback to passive locale detection
    let passiveCurrency = getPassiveLocalCurrencyCode();
    
    // 3. Final override check for India/USD conflict (Guaranteed Fix)
    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (currentTimeZone === 'Asia/Kolkata' && passiveCurrency === 'USD') {
        passiveCurrency = 'INR';
    }

    return passiveCurrency;
};


/**
 * Finds the appropriate exchange rate from the controlled static map.
 * This function handles the requirement:
 * - If currency is in STATIC_EXCHANGE_RATES (Top 10), use that rate.
 * - Otherwise (remaining currencies), return 1 (USD parity).
 */
const getExchangeRate = (targetCurrency, rates) => {
    const rate = rates[targetCurrency.toUpperCase()];
    // The core logic: return the rate if found, otherwise return 1 (USD).
    return rate || 1;
};


/**
 * Formats a price value after conversion.
 */
const formatPrice = (basePriceUSD, exchangeRate, currencyCode) => {
    if (typeof basePriceUSD !== 'number' || basePriceUSD === 0) {
        return basePriceUSD;
    }

    const convertedPrice = basePriceUSD * exchangeRate;

    return convertedPrice.toLocaleString(undefined, { 
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
};


// --- 2. MAIN COMPONENT ---

export default function ServiceSection() {
    
    const [activeTab, setActiveTab] = useState('new');
    const [basePricingData, setBasePricingData] = useState(INITIAL_PRICING_STATE);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null);
    
    const [localCurrencyCode, setLocalCurrencyCode] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState(1); 
    const [conversionFailed, setConversionFailed] = useState(false); 

    // 2a. Function to fetch the base data 
    const fetchPricingData = useCallback(async () => {
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            if (data.newAppPricing && data.existingAppPricing) {
                setBasePricingData(data);
                return true; 
            } else {
                throw new Error("API returned an unexpected data structure.");
            }
        } catch (err) {
            console.error("Failed to fetch pricing data:", err);
            setError(apiConfig.defaultError); 
            setBasePricingData(INITIAL_PRICING_STATE); 
            return false;
        }
    }, []);

    // 2b. Function to determine the user's rate
    const setLocalPricingContext = useCallback(async () => {
        const userCurrency = await resolveUserCurrency();
        const rate = getExchangeRate(userCurrency, STATIC_EXCHANGE_RATES);
        
        setLocalCurrencyCode(userCurrency);
        setExchangeRate(rate);

        // Check if a currency was detected but we don't have a specific rate for it (i.e., it defaults to USD)
        // We only set this flag if the currency is NOT USD, AND the rate defaults to 1.
        const isRateDefined = STATIC_EXCHANGE_RATES.hasOwnProperty(userCurrency);
        
        if (userCurrency !== 'USD' && !isRateDefined) {
             setConversionFailed(true); 
        } else {
             setConversionFailed(false); 
        }
        
        return true; 
    }, []);

    // 2c. Load all data and set currency context on component mount
    useEffect(() => {
        const loadAllData = async () => {
            // Wait for both the currency context and the API data before finishing loading
            await Promise.all([
                fetchPricingData(),
                setLocalPricingContext()
            ]);
            
            setIsLoading(false);
        };

        loadAllData();
    }, [fetchPricingData, setLocalPricingContext]);


    // --- Data processing and rendering helpers (Unchanged) ---
    const { newAppPricing, existingAppPricing } = basePricingData;
    let pricingList = activeTab === 'new' ? newAppPricing : existingAppPricing;
    const shouldShowBudgetPlan = activeTab === 'new';

    const getNumericalPrice = (plan) => {
        if (typeof plan.priceUSD === 'number') return plan.priceUSD; 
        if (typeof plan.price === 'string') {
            const priceString = plan.price.replace(/[^0-9.]/g, ''); 
            const priceNumber = parseFloat(priceString);
            return isNaN(priceNumber) ? 0 : priceNumber;
        }
        return plan.price || 0;
    };
    
    if (shouldShowBudgetPlan && BUDGET_PLAN) {
        const budgetPriceAsNumber = getNumericalPrice(BUDGET_PLAN);
        const convertedBudgetPlan = {
            ...BUDGET_PLAN,
            priceUSD: budgetPriceAsNumber, 
        }
        pricingList = [...pricingList, convertedBudgetPlan];
    }

    // --- Price CONVERSION (The core logic) ---
    const convertedPricingList = pricingList.map(plan => {
        const basePrice = getNumericalPrice(plan);
        const formattedPrice = formatPrice(basePrice, exchangeRate, localCurrencyCode);

        return {
            ...plan,
            price: formattedPrice, 
        };
    });

    // Conditional Rendering for Loading and Error States
    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-white text-black">
                <p className="text-xl">Detecting location, resolving currency, and loading pricing plans...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-white text-black">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    const getGridCols = () => {
        if (convertedPricingList.length <= 2) return 'grid-cols-1 md:grid-cols-2';
        return 'grid-cols-1 md:grid-cols-3';
    };

    // Render Component with Dynamic Data
    return (
        <section className="w-full bg-white text-black py-16 px-4">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
                
                {/* Header */}
                <div className="text-center mb-12 w-full">
                    <div className="mb-4 flex justify-center">
                        <span 
                            className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                            style={{ color: 'rgb(1, 247, 247)', backgroundColor: 'rgba(1, 247, 247, 0.1)' }}
                        >
                            {header.tag}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{header.title}</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">{header.subtitle}</p>
                    
                    {/* Localization Context Message (Dynamic) */}
                    <p className="mt-4 text-sm font-medium text-gray-600">
                        Prices are based on a **USD** reference and converted to your local currency: **{localCurrencyCode}**
                        {exchangeRate !== 1 && (
                            <span className="ml-2">(1 USD ≈ {exchangeRate} {localCurrencyCode} - *Controlled Static Rate*)</span>
                        )}
                        {exchangeRate === 1 && localCurrencyCode !== 'USD' && !conversionFailed && (
                            <span className="ml-2"> (Rate not defined. Price is shown in {localCurrencyCode} using a **1:1 USD** parity.)</span>
                        )}
                        {conversionFailed && (
                             <span className="block mt-1 text-xs text-red-500">
                                Rate for {localCurrencyCode} not defined. Price shown with **1:1 USD** parity.
                             </span>
                        )}
                    </p>
                </div>

                {/* Toggle Buttons (unchanged) */}
                <div className="flex gap-4 justify-center mb-14">
                    <button
                        onClick={() => setActiveTab('new')}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                            activeTab === 'new'
                                ? 'text-black font-bold shadow-lg'
                                : 'text-gray-700 border border-gray-300 hover:border-gray-400'
                        }`}
                        style={{
                            backgroundColor: activeTab === 'new' ? 'rgb(1, 247, 247)' : 'transparent'
                        }}
                    >
                        {tabs.new}
                    </button>
                    <button
                        onClick={() => setActiveTab('existing')}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                            activeTab === 'existing'
                                ? 'text-black font-bold shadow-lg'
                                : 'text-gray-700 border border-gray-300 hover:border-gray-400'
                        }`}
                        style={{
                            backgroundColor: activeTab === 'existing' ? 'rgb(1, 247, 247)' : 'transparent'
                        }}
                    >
                        {tabs.existing}
                    </button>
                </div>

                {/* Pricing Cards Grid */}
                <div className={`grid gap-8 w-full max-w-7xl ${getGridCols()}`}>
                    {convertedPricingList.map((plan, index) => {
                        const isRecommended = plan.recommended;
                        
                        return (
                            <div
                                key={index}
                                className={`
                                    rounded-2xl p-8 relative transition-all duration-300
                                    flex flex-col h-full
                                    ${isRecommended 
                                        ? 'md:col-span-1 md:row-span-1 border-2 shadow-xl hover:shadow-2xl scale-100 md:scale-105' 
                                        : 'border border-gray-200 shadow-md hover:shadow-lg'
                                    }
                                    hover:border-opacity-80
                                `}
                                style={{
                                    borderColor: 'rgb(1, 247, 247)',
                                    backgroundColor: isRecommended ? 'rgba(1, 247, 247, 0.05)' : 'rgb(255, 255, 255)'
                                }}
                            >
                                {/* Recommended Badge (unchanged) */}
                                {isRecommended && (
                                    <div
                                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                                        style={{ backgroundColor: 'rgb(1, 247, 247)', color: 'black' }}
                                    >
                                        Most Popular
                                    </div>
                                )}

                                {/* Plan Header (unchanged) */}
                                <div className="mb-6 flex-shrink-0">
                                    <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                                    <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                                </div>

                                {/* Price Section: Uses the DYNAMICALLY CONVERTED PRICE */}
                                <div className="mb-8 flex-shrink-0">
                                    <div className="flex items-baseline">
                                        {/* plan.price is now the formatted local currency string */}
                                        <span className="text-5xl font-bold text-black">{plan.price}</span>
                                    </div>
                                </div>

                                {/* Features List (unchanged) */}
                                <ul className="space-y-3.5 mb-8 flex-grow">
                                    {(plan.features || []).map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start gap-3">
                                            <Check
                                                size={20}
                                                className="mt-0.5 flex-shrink-0 min-w-fit"
                                                style={{ color: 'rgb(1, 247, 247)' }}
                                            />
                                            <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button (unchanged) */}
                                <button
                                    className={`
                                        w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300
                                        flex-shrink-0
                                        ${isRecommended 
                                            ? 'text-white hover:opacity-90' 
                                            : 'text-white hover:opacity-90'
                                        }
                                    `}
                                    style={{ 
                                        backgroundColor: isRecommended ? 'rgb(1, 247, 247)' : 'rgba(0, 0, 0, 0.9)',
                                        color: isRecommended ? 'black' : 'white'
                                    }}
                                >
                                    {plan.buttonText || cta.buttonText}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}