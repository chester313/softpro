import React, { useState } from 'react';
import { useEffect } from 'react';
import { Check, X, Zap, Crown, Rocket, Star, ArrowRight } from 'lucide-react';
import { PricingPlan, crudOperations } from '../lib/supabase';

// Icon mapping
const iconMap: Record<string, any> = {
  Zap,
  Crown,
  Rocket,
  Star
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPricingPlans();
  }, []);

  const loadPricingPlans = async () => {
    setIsLoading(true);
    const { data, error } = await crudOperations.pricingPlans.getAll();
    if (data && !error) {
      setPlans(data);
    } else {
      console.error('Error loading pricing plans:', error);
    }
    setIsLoading(false);
  };

  const getDiscountPercentage = () => {
    if (plans.length === 0) return 0;
    const firstPlan = plans[0];
    return Math.round(((firstPlan.monthly_price * 12 - firstPlan.annual_price) / (firstPlan.monthly_price * 12)) * 100);
  };

  if (isLoading) {
    return (
      <section id="pricing" className="section-spacing bg-black relative">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="section-spacing bg-black relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-2 text-cyan-400 font-mono text-sm">
            <Star className="w-4 h-4" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2 className="section-heading">
            Choose Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Digital Evolution
            </span>
          </h2>
          <p className="cyber-text max-w-2xl mx-auto">
            Flexible pricing plans designed to scale with your ambitions. 
            No hidden fees, no vendor lock-in, just pure innovation.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-16 animate-fade-in-up">
          <div className="cyber-card inline-flex p-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                -{getDiscountPercentage()}%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = iconMap[plan.icon] || Zap;
            return (
            <div
              key={plan.id}
              className={`relative cyber-card group ${plan.popular ? 'scale-105 border-purple-500/50' : ''} animate-scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-mono">
                  {plan.name}
                </h3>
                <p className="text-gray-400 mb-6">
                  {plan.description}
                </p>
                
                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold text-white glow-text font-mono">
                      ${billingCycle === 'monthly' ? plan.monthly_price : plan.annual_price}
                    </span>
                    <span className="text-gray-400">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingCycle === 'annual' && (
                    <p className="text-green-400 text-sm font-medium">
                      Save ${((plan.monthly_price * 12) - plan.annual_price).toLocaleString()} annually
                    </p>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <h4 className="text-white font-semibold mb-4 font-mono">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t border-gray-800">
                    <h5 className="text-gray-400 text-sm mb-3">Not included:</h5>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center space-x-3">
                          <X className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          <span className="text-gray-500 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button className={`w-full btn-cyber flex items-center justify-center space-x-2 group ${
                plan.popular ? 'bg-gradient-to-r from-purple-400 to-pink-500 border-purple-400' : ''
              }`}>
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${plan.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
            </div>
            );
          })}
        </div>

        {/* Enterprise CTA */}
        <div className="cyber-card text-center animate-fade-in-up">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 font-mono">
              Need Something Custom?
            </h3>
            <p className="text-gray-300 mb-6">
              Our enterprise solutions are tailored to your specific requirements. 
              Let's discuss how we can architect the perfect solution for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-cyber">
                Schedule Consultation
              </button>
              <button className="btn-cyber-secondary">
                View Enterprise Features
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-800 animate-fade-in-up">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400 glow-text font-mono mb-2">99.99%</div>
            <div className="text-gray-400 text-sm">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 glow-text font-mono mb-2">SOC 2</div>
            <div className="text-gray-400 text-sm">Compliant</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400 glow-text font-mono mb-2">24/7</div>
            <div className="text-gray-400 text-sm">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 glow-text font-mono mb-2">30-Day</div>
            <div className="text-gray-400 text-sm">Money Back</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;