import React, { useState } from 'react';
import { FiPlus, FiMinus, FiHelpCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Is TradeNova free to use?',
      answer: 'Yes! We offer a generous free plan that includes basic trading features, up to 5 orders per day, and email support. You can upgrade to our Pro plan anytime for advanced features like unlimited trading, API access, and priority support.',
    },
    {
      question: 'How secure is my money and data?',
      answer: 'We use bank-level 256-bit AES encryption, two-factor authentication (2FA), and secure SSH tunnels for all data transmission. Your funds are stored in segregated cold wallets, and our platform undergoes regular third-party security audits.',
    },
    {
      question: 'Which cryptocurrencies can I trade?',
      answer: 'TradeNova supports 120+ trading pairs including all major cryptocurrencies like Bitcoin (BTC), Ethereum (ETH), BNB, Solana (SOL), Cardano (ADA), Ripple (XRP), and many more. We add new pairs regularly based on market demand.',
    },
    {
      question: 'Do you charge trading fees?',
      answer: 'We charge a competitive 0.1% trading fee on all transactions. There are no hidden charges, no deposit fees, and no monthly maintenance fees on our free plan. Pro users get reduced fees of 0.05%.',
    },
    {
      question: 'How fast are deposits and withdrawals?',
      answer: 'Cryptocurrency deposits are credited instantly after network confirmation. Fiat deposits via bank transfer take 1-2 business days. Withdrawals are processed within 24 hours, with most completed within 1-2 hours.',
    },
    {
      question: 'Can I use TradeNova on my mobile device?',
      answer: 'Absolutely! TradeNova is fully responsive and optimized for mobile devices. You can access it from any smartphone or tablet browser, and we also offer Progressive Web App (PWA) installation for an app-like experience.',
    },
    {
      question: 'What kind of customer support do you offer?',
      answer: 'We offer 24/7 email support for all users, live chat support for Pro users during business hours, and dedicated phone support for Enterprise customers. Our average response time is under 2 hours.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. There are no long-term contracts or cancellation fees. You will continue to have access to paid features until the end of your billing period.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-24 px-6 border-t border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] 
                      bg-primary-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 
                          border border-primary-500/30 rounded-full text-sm text-primary-400 mb-4">
            <FiHelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Everything you need to know about TradeNova. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`card transition-all duration-300 ${
                  isOpen ? 'border-primary-500/50 shadow-glow' : 'hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between gap-4 text-left p-6"
                >
                  <span className={`font-semibold text-lg transition-colors ${
                    isOpen ? 'text-primary-400' : 'text-slate-100'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                  flex-shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-primary-500 text-white rotate-180'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isOpen ? <FiMinus className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="pt-4 border-t border-slate-800">
                      <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 card text-center bg-gradient-to-br from-primary-600/10 to-indigo-600/10 border-primary-500/30">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
            <p className="text-slate-400 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:support@tradenova.com"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Contact Support
              </a>
              <Link
                to="/register"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;