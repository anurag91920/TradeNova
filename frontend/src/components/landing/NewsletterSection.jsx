import React, { useState } from 'react';
import { FiMail, FiCheck, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    
    // Simulate subscription
    setSubscribed(true);
    toast.success('Successfully subscribed to newsletter!');
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <section className="py-16 px-6 border-t border-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="relative card bg-gradient-to-br from-primary-600/20 via-indigo-600/20 to-primary-600/20 
                        border-primary-500/30 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

          <div className="relative p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 
                                rounded-full text-xs text-white mb-4">
                  📬 Newsletter
                </div>
                <h3 className="text-3xl font-bold mb-3 text-white">
                  Stay Updated with Crypto Trends
                </h3>
                <p className="text-slate-300 mb-4">
                  Get weekly market insights, trading tips, and exclusive updates delivered to your inbox.
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <FiCheck className="w-4 h-4 text-success-400" />
                    Weekly digest
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCheck className="w-4 h-4 text-success-400" />
                    No spam
                  </span>
                </div>
              </div>

              {/* Right form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 
                               rounded-lg text-white placeholder:text-slate-400
                               focus:outline-none focus:ring-2 focus:ring-primary-500 
                               focus:border-transparent backdrop-blur-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribed}
                  className="w-full py-3.5 bg-white text-primary-600 font-semibold rounded-lg 
                             hover:bg-slate-100 transition-all flex items-center justify-center 
                             gap-2 disabled:opacity-50"
                >
                  {subscribed ? (
                    <>
                      <FiCheck /> Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe Now <FiArrowRight />
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-400 text-center">
                  Join 15,000+ subscribers. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;