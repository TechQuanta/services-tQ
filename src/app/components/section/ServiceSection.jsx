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
    }, [apiConfig.defaultError]); // Added dependency

    // Load data on component mount
    useEffect(() => {
        fetchPricingData();
    }, [fetchPricingData]);

    const { newAppPricing, existingAppPricing } = pricingData;
    
    const pricingList = activeTab === 'new' ? newAppPricing : existingAppPricing;

    // --- Conditional Rendering for Loading and Error States (UNCHANGED) ---

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black">
                <p className="text-xl">Loading pricing plans...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    // --- Render Component with Dynamic Data (USING JSON) ---

    return (
        <div className="min-h-screen bg-white text-black py-12 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="mb-4">
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ color: 'rgb(1, 247, 247)' }}>
                            {header.tag}
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold mb-4">{header.title}</h1>
                    <p className="text-gray-400 text-lg">{header.subtitle}</p>
                </div>

                {/* Toggle Buttons */}
                <div className="flex gap-4 justify-center mb-12">
                    <button
                        onClick={() => setActiveTab('new')}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                            activeTab === 'new'
                                ? 'text-black font-bold'
                                : 'text-black border border-gray-300'
                        }`}
                        style={{
                            backgroundColor: activeTab === 'new' ? 'rgb(1, 247, 247)' : 'transparent'
                        }}
                    >
                        {tabs.new}
                    </button>
                    <button
                        onClick={() => setActiveTab('existing')}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                            activeTab === 'existing'
                                ? 'text-black font-bold'
                                : 'text-black border border-gray-300'
                        }`}
                        style={{
                            backgroundColor: activeTab === 'existing' ? 'rgb(1, 247, 247)' : 'transparent'
                        }}
                    >
                        {tabs.existing}
                    </button>
                </div>

                {/* Pricing Cards */}
                <div className={`grid gap-8 ${activeTab === 'new' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'} max-w-6xl mx-auto mb-12`}>
                    {pricingList.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl p-8 relative transition-all ${
                                plan.recommended
                                    ? 'md:scale-105 border-2'
                                    : 'border border-gray-700'
                            }`}
                            style={{
                                borderColor: 'rgb(1, 247, 247)',
                                backgroundColor: plan.recommended ? 'rgb(255, 255, 255)' : 'transparent'
                            }}
                        >
                            {/* Recommended Badge */}
                            {plan.recommended && (
                                <div
                                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold"
                                    style={{ backgroundColor: 'rgb(1, 247, 247)', color: 'black' }}
                                >
                                    Recommended
                                </div>
                            )}

                            {/* Plan Header */}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-gray-400 mb-6">{plan.subtitle}</p>

                            {/* Price */}
                            <div className="mb-8">
                                <span className="text-5xl font-bold">{plan.price}</span>
                                <span className="text-gray-400 ml-2">
                                    {plan.price.includes('/month') ? '' : 'USD'}
                                </span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {(plan.features || []).map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <Check
                                            size={20}
                                            className="mt-1 flex-shrink-0"
                                            style={{ color: 'rgb(1, 247, 247)' }}
                                        />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                className="w-full py-3 rounded-lg font-semibold transition-all text-white font-bold"
                                style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
                            >
                                {cta.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
                
                {/* Budget Landing Page Plan Bar */}
                {activeTab === 'new' && (
                    <div 
                        className="max-w-6xl mx-auto mb-12 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-lg"
                        style={{
                            borderColor: 'rgb(1, 247, 247)',
                            border: '2px solid',
                            backgroundColor: 'rgb(255, 255, 255)',
                        }}
                    >
                        <div className="md:w-1/3 text-center md:text-left mb-4 md:mb-0">
                            <h3 className="text-2xl font-bold mb-1">{BUDGET_PLAN.name}</h3>
                            <p className="text-gray-500 text-sm">{BUDGET_PLAN.subtitle}</p>
                        </div>

                        {/* Features List */}
                        <div className="md:w-2/5 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mb-4 md:mb-0">
                            {BUDGET_PLAN.features.map((feature, index) => (
                                <span key={index} className="flex items-center text-sm text-gray-700">
                                    <Check size={14} className="mr-1 flex-shrink-0" style={{ color: 'rgb(1, 247, 247)' }} />
                                    {feature}
                                </span>
                            ))}
                        </div>

                        {/* Price and CTA */}
                        <div className="flex flex-col items-center md:flex-row md:items-center md:w-1/4">
                            <div className="text-3xl font-bold mb-2 md:mb-0 md:mr-4">
                                {BUDGET_PLAN.price}
                                <span className="text-base text-gray-400 ml-1">USD</span>
                            </div>
                            <button
                                className="w-full md:w-auto px-6 py-2 rounded-lg font-semibold transition-all text-white font-bold whitespace-nowrap"
                                style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
                            >
                                {BUDGET_PLAN.buttonText}
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="text-center">
                    <p className="text-gray-400">
                        {cta.contactUs.prefix}{' '}
                        <span style={{ color: 'rgb(1, 247, 247)' }} className="font-semibold cursor-pointer hover:opacity-80">
                            {cta.contactUs.linkText}
                        </span>
                        {' '}{cta.contactUs.suffix}
                    </p>
                </div>
            </div>
        </div>
    );
}