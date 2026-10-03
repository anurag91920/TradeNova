import React from 'react';
import { FiStar } from 'react-icons/fi';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Day Trader · Mumbai',
      avatar: 'RS',
      avatarColor: 'from-blue-500 to-indigo-600',
      rating: 5,
      text: 'TradeNova completely changed how I trade. The real-time analytics and intuitive dashboard have helped me increase my profits by 40% in just 3 months.',
    },
    {
      name: 'Priya Patel',
      role: 'Crypto Investor · Bangalore',
      avatar: 'PP',
      avatarColor: 'from-pink-500 to-purple-600',
      rating: 5,
      text: "Best crypto platform I've used. The interface is beautiful, and the customer support is incredibly responsive.",
    },
    {
      name: 'Amit Kumar',
      role: 'Crypto Analyst · Delhi',
      avatar: 'AK',
      avatarColor: 'from-green-500 to-emerald-600',
      rating: 5,
      text: 'The technical analysis tools are world-class. I can do everything from candlestick patterns to advanced indicators all in one place.',
    },
    {
      name: 'Sneha Reddy',
      role: 'Trader · Hyderabad',
      avatar: 'SR',
      avatarColor: 'from-orange-500 to-red-600',
      rating: 5,
      text: 'Been trading for 5 years, and TradeNova is by far the most polished platform I have used.',
    },
    {
      name: 'Vikram Singh',
      role: 'Portfolio Manager · Pune',
      avatar: 'VS',
      avatarColor: 'from-cyan-500 to-blue-600',
      rating: 5,
      text: 'The portfolio analytics are phenomenal. I can track all my positions, P&L, and historical performance in one unified dashboard.',
    },
    {
      name: 'Anjali Mehta',
      role: 'New Trader · Chennai',
      avatar: 'AM',
      avatarColor: 'from-yellow-500 to-orange-600',
      rating: 5,
      text: "As a beginner, I found TradeNova extremely easy to use. The onboarding process made it simple to get started.",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-sm text-primary-400 mb-4">
            ⭐ Loved by Traders
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Users <span className="gradient-text">Say</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Join 50,000+ traders who trust TradeNova for their crypto journey
          </p>

          <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-full">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-white font-semibold">4.9</span>
            <span className="text-slate-500 text-sm">· Based on 2,340 reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="card card-hover group relative">
              <div className="absolute top-4 right-4 text-6xl text-primary-500/10 font-serif leading-none select-none">
                "
              </div>

              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <FiStar key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-slate-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className={`w-11 h-11 bg-gradient-to-br ${testimonial.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-100 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          {[
            { icon: '🏆', text: 'Best Crypto App 2025' },
            { icon: '🔒', text: 'Bank-Level Security' },
            { icon: '⚡', text: '99.9% Uptime' },
            { icon: '🌍', text: 'Available Worldwide' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full text-sm text-slate-400">
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;