"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Check } from "lucide-react";
import appConfig from "../../../lib/data.json";

/* ---------------- CONFIG ---------------- */
const {
  header,
  tabs,
  cta,
  budgetPlan: BUDGET_PLAN,
  apiConfig,
} = appConfig.pages.pricingPage;

const API_URL = apiConfig.url;
const INITIAL_PRICING_STATE = apiConfig.initialState;
const STATIC_EXCHANGE_RATES = apiConfig.exchangeRates || {};

const SUPPORTED_CURRENCIES = [
  "USD",
  ...Object.keys(STATIC_EXCHANGE_RATES),
].map(c => c.toUpperCase());

/* ---------------- HELPERS ---------------- */
const TIMEZONE_TO_CURRENCY_MAP = {
  "Asia/Kolkata": "INR",
  "Europe/London": "GBP",
  "Europe/Paris": "EUR",
  "Asia/Tokyo": "JPY",
};

const resolveUserCurrency = async () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_TO_CURRENCY_MAP[tz] || "USD";
  } catch {
    return "USD";
  }
};

const getExchangeRate = (currency) =>
  STATIC_EXCHANGE_RATES[currency] || 1;

const formatPrice = (usd, rate, currency) => {
  if (!usd || Number.isNaN(usd)) return null;
  return (usd * rate).toLocaleString(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });
};

/* ---------------- COMPONENT ---------------- */
export default function ServiceSection({ openChat, MEETING_SLUGS }) {
  if (!openChat || !MEETING_SLUGS) return null;

  const [activeTab, setActiveTab] = useState("new");
  const [pricingData, setPricingData] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------- API (UNCHANGED LOGIC) ---------- */
  const fetchPricingData = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Pricing API failed");
      const data = await res.json();

      if (!data?.newAppPricing || !data?.existingAppPricing) {
        throw new Error("Invalid pricing data");
      }

      setPricingData(data);
    } catch (err) {
      console.error(err);
      setError(apiConfig.defaultError);
      setPricingData(INITIAL_PRICING_STATE);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ---------- EFFECTS ---------- */
  useEffect(() => {
    fetchPricingData();
    resolveUserCurrency().then((cur) => {
      setCurrency(cur);
      setRate(getExchangeRate(cur));
    });
  }, [fetchPricingData]);

  /* ---------- SAFE DATA DERIVATION ---------- */
  const pricingList = useMemo(() => {
    if (!pricingData) return [];

    let list =
      activeTab === "new"
        ? pricingData.newAppPricing
        : pricingData.existingAppPricing;

    if (activeTab === "new" && BUDGET_PLAN) {
      list = [...list, BUDGET_PLAN];
    }

    return list
      .map((plan) => {
        const usd =
          typeof plan.priceUSD === "number"
            ? plan.priceUSD
            : Number(plan.price?.replace(/[^0-9.]/g, ""));

        const price = formatPrice(usd, rate, currency);

        if (!price) return null;

        let calSlug = MEETING_SLUGS.PROJECT_DISCUSSION;
        if (plan.name?.toLowerCase().includes("frontend"))
          calSlug = MEETING_SLUGS.FRONTEND_DEV;
        if (plan.name?.toLowerCase().includes("mvp"))
          calSlug = MEETING_SLUGS.MVP_DEV;

        // Mark MVP plan as recommended
        const isRecommended = plan.name?.toLowerCase().includes("mvp");

        return { ...plan, price, calSlug, isRecommended };
      })
      .filter(Boolean);
  }, [pricingData, activeTab, rate, currency, MEETING_SLUGS]);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-lg text-gray-500">
          Loading pricing…
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-500">
        {error}
      </section>
    );
  }

  /* ---------- RENDER ---------- */
  return (
    <section className="w-full bg-white py-20 px-4" id="Pricing">
      <div className="max-w-7xl mx-auto text-center">

        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-[#01f7f7] bg-[rgba(1,247,247,0.1)]">
          {header.tag}
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mt-4">
          {header.title}
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-3">
          {header.subtitle}
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mt-12">
          {["new", "existing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-lg font-semibold ${
                activeTab === tab
                  ? "bg-[#01f7f7] text-black"
                  : "border border-gray-300"
              }`}
            >
              {tabs[tab]}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid gap-8 mt-16 md:grid-cols-3">
          {pricingList.map((plan, idx) => {
            const isRecommended = plan.isRecommended;
            
            return (
              <div
                key={idx}
                className={`
                  rounded-2xl p-8 flex flex-col relative transition-all duration-300
                  ${isRecommended
                    ? "md:col-span-1 md:row-span-1 border-2 shadow-xl hover:shadow-2xl scale-100 md:scale-105"
                    : "border border-gray-200"
                  }
                `}
                style={{
                  borderColor: isRecommended ? "rgb(1, 247, 247)" : "rgb(229, 231, 235)",
                  backgroundColor: isRecommended ? "rgba(1, 247, 247, 0.05)" : "rgb(255, 255, 255)",
                }}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                    style={{ backgroundColor: "rgb(1, 247, 247)", color: "black" }}
                  >
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-gray-500 mt-1">{plan.subtitle}</p>

                <div className="text-4xl font-bold mt-6">
                  {plan.price}
                </div>

                <ul className="space-y-3 mt-8 flex-grow">
                  {plan.features?.map((f, i) => (
                    <li key={i} className="flex gap-3">
                      <Check className="text-[#01f7f7]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openChat(plan.calSlug)}
                  className="mt-8 py-3 rounded-lg font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: isRecommended ? "rgb(1, 247, 247)" : "rgb(0, 0, 0)",
                    color: isRecommended ? "black" : "white",
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