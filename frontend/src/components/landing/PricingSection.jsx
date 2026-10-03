import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiX, FiArrowRight } from 'react-icons/fi';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for beginners',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { text: 'Basic trading', included: true },
        { text: '5 orders per day', included: true },
        { text: 'Email support', included: true },
        { text: 'Advanced charts', included: false },
        { text: 'API access', included: false },
        { text: 'Priority support', included: false },
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro',
      description: 'For serious traders',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        { text: 'Unlimited trading', included: true },
        { text: 'Advanced charts', included: true },
        { text: 'Priority support', included: true },
        { text: 'API access', included: true },
        { text: 'Portfolio analytics', included: true },
        { text: 'Custom alerts', included: true },
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For institutions',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Dedicated manager', included: true },
        { text: 'SLA guarantee', included: true },
        { text: 'White-label option', included: true },
        { text: '24/7 phone support', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 border-t border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 
                          border border-primary-500/30 rounded-full text-sm text-primary-400 mb-4">
            💰 Simple Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Start free, upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-success-500 
                              text-white text-xs rounded-full">
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice / 12;
            
            return (
              <div
                key={i}
                className={`relative card transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary-500/50 shadow-glow-lg scale-105 lg:scale-110'
                    : 'hover:border-slate-700 hover:scale-[1.02]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 
                                  px-4 py-1 bg-gradient-to-r from-primary-500 to-indigo-600 
                                  text-white text-xs font-bold rounded-full shadow-lg">
                    🔥 MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-100 mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold gradient-text">
                        ${price === 0 ? '0' : price.toFixed(0)}
                      </span>
                      <span className="text-slate-400 text-sm">/month</span>
                    </div>
                    {billingCycle === 'yearly' && plan.yearlyPrice > 0 && (
                      <p className="text-xs text-success-400 mt-2">
                        Billed ${plan.yearlyPrice} yearly
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        {feature.included ? (
                          <FiCheck className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <FiX className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-slate-300' : 'text-slate-600'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to="/register"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                      plan.popular
                        ? 'btn-primary'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {plan.cta} <FiArrowRight />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap gap-8 justify-center text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <FiCheck className="text-success-500" /> 14-day free trial
          </span>
          <span className="flex items-center gap-2">
            <FiCheck className="text-success-500" /> No credit card required
          </span>
          <span className="flex items-center gap-2">
            <FiCheck className="text-success-500" /> Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;