"use client";
import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function ServiceSection() {
  const [activeTab, setActiveTab] = useState('new');

  const newAppPricing = [
    {
      name: 'Frontend Development',
      subtitle: 'Basic App Package',
      price: '$799',
      recommended: false,
      features: [
        'Mobile app for your users',
        'Converting your design into working app',
        'Connecting to external services',
        'Smooth animations and transitions',
        'Help when you need it',
        '10-30 Day Delivery',
        'Unlimited changes until you are happy'
      ]
    },
    {
      name: 'MVP Development',
      subtitle: 'Complete Starter Package',
      price: '$2,499',
      recommended: true,
      features: [
        'Mobile app plus admin dashboard',
        'Custom design for your brand',
        'Converting designs into working app',
        'Building your apps brain (backend)',
        '1-3 Month Delivery',
        'Getting your app on App Store & Play Store',
        'Testing everything works perfectly',
        'Unlimited changes until you are happy'
      ]
    },
    {
      name: 'Full-Cycle App Development',
      subtitle: 'Everything You Need',
      price: '$4,499',
      recommended: false,
      features: [
        'User app, business app & admin dashboard',
        'Premium design customized for your brand',
        'Converting designs into working app',
        'Complete backend system built for growth',
        '2-4 Month Delivery',
        'Publishing on App Store & Play Store',
        'Thorough testing for flawless performance',
        'Full control with admin dashboard',
        'Unlimited changes until you are happy'
      ]
    }
  ];

  const existingAppPricing = [
    {
      name: 'App Maintenance & Support',
      subtitle: 'Ongoing App Care',
      price: '$999/month',
      recommended: false,
      features: [
        'Monthly updates and bug fixes',
        'Performance optimization',
        'Security patches and updates',
        'Device compatibility maintenance',
        'User support and feedback handling',
        'Server monitoring and maintenance',
        'Feature enhancements',
        'App Store & Play Store management'
      ]
    }
  ];

  const pricingList = activeTab === 'new' ? newAppPricing : existingAppPricing;

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ color: 'rgb(1, 247, 247)' }}>
              Simple Pricing
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 text-lg">Clear options to bring your app idea to life, with everything included to launch successfully</p>
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
            New App Development
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
            Existing App Maintenance
          </button>
        </div>

        {/* Pricing Cards */}
        <div className={`grid gap-8 ${activeTab === 'new' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'} max-w-6xl mx-auto mb-12`}>
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
                <span className="text-gray-400 ml-2">USD</span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
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
                className="w-full py-3 rounded-lg font-semibold transition-all text-black font-bold"
                style={{ backgroundColor: 'rgb(1, 247, 247)' }}
              >
                Start Your Project →
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400">
            Need a custom solution?{' '}
            <span style={{ color: 'rgb(1, 247, 247)' }} className="font-semibold cursor-pointer hover:opacity-80">
              Contact us
            </span>
            {' '}for personalized pricing.
          </p>
        </div>
      </div>
    </div>
  );
}