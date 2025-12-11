"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Check } from 'lucide-react';

// Import the centralized configuration
import appConfig from '../../../lib/data.json'; 

// Destructure the necessary data
const { 
    header, 
    tabs, 
    cta, 
    budgetPlan: BUDGET_PLAN, 
    apiConfig 
} = appConfig.pages.pricingPage;

const API_URL = apiConfig.url;
const INITIAL_PRICING_STATE = apiConfig.initialState;


export default function ServiceSection() {
    const [activeTab, setActiveTab] = useState('new');
    const [pricingData, setPricingData] = useState(INITIAL_PRICING_STATE);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch the data from the Google Apps Script API
    const fetchPricingData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.newAppPricing && data.existingAppPricing) {
                setPricingData(data);
            } else {
                throw new Error("API returned an unexpected data structure.");
            }

        } catch (err) {
            console.error("Failed to fetch pricing data:", err);
            setError(apiConfig.defaultError); 
            setPricingData(INITIAL_PRICING_STATE); 
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load data on component mount
    useEffect(() => {
        fetchPricingData();
    }, [fetchPricingData]);

    const { newAppPricing, existingAppPricing } = pricingData;
    
    // Combine budget plan with pricing list if on 'new' tab
    let pricingList = activeTab === 'new' ? newAppPricing : existingAppPricing;
    const shouldShowBudgetPlan = activeTab === 'new';
    if (shouldShowBudgetPlan && BUDGET_PLAN) {
        pricingList = [...pricingList, BUDGET_PLAN];
    }

    // Conditional Rendering for Loading and Error States
    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-white text-black">
                <p className="text-xl">Loading pricing plans...</p>
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

    // Calculate grid columns based on number of cards
    const getGridCols = () => {
        if (pricingList.length <= 2) return 'grid-cols-1 md:grid-cols-2';
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
                </div>

                {/* Toggle Buttons */}
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
                    {pricingList.map((plan, index) => {
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
                                {/* Recommended Badge */}
                                {isRecommended && (
                                    <div
                                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                                        style={{ backgroundColor: 'rgb(1, 247, 247)', color: 'black' }}
                                    >
                                        Most Popular
                                    </div>
                                )}

                                {/* Plan Header */}
                                <div className="mb-6 flex-shrink-0">
                                    <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                                    <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                                </div>

                                {/* Price Section */}
                                <div className="mb-8 flex-shrink-0">
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-bold text-black">{plan.price}</span>
                                        {!plan.price.includes('/month') && plan.price !== 'Custom' && (
                                            <span className="text-gray-500 ml-2 text-sm">USD</span>
                                        )}
                                    </div>
                                </div>

                                {/* Features List */}
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

                                {/* CTA Button */}
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