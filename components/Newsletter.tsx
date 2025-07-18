import { useState, useRef, useEffect } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-accent1/10 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-highlight/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent2/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4">
            <span className="bg-gradient-to-r from-primary via-highlight to-accent2 bg-clip-text text-transparent">
              Stay Connected
            </span>
          </h2>
          <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
            Get the latest updates on new products, exclusive offers, and tracking technology innovations.
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1 relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-background/70 backdrop-blur-md border border-text-muted/30 rounded-full text-text-light placeholder-text-muted focus:outline-none focus:border-highlight focus:ring-2 focus:ring-highlight/20 transition-all duration-300 hover:border-primary/50"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-highlight/10 to-accent2/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary/30 group relative overflow-hidden"
              >
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </form>
          ) : (
            <div className="animate-[slideUp_0.5s_ease-out] bg-highlight/20 border border-highlight/50 rounded-2xl p-6 max-w-lg mx-auto">
              <div className="text-4xl mb-2 animate-bounce">🎉</div>
              <h3 className="text-xl font-semibold text-highlight mb-2">Thank you for subscribing!</h3>
              <p className="text-text-muted">We'll keep you updated with the latest from Zuno.</p>
            </div>
          )}
        </div>

        <div className={`mt-12 transition-all duration-1000 delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-muted">
            <div className="flex items-center space-x-2 hover:text-highlight transition-colors duration-300">
              <span>🔒</span>
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-highlight transition-colors duration-300">
              <span>📧</span>
              <span>No Spam</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-highlight transition-colors duration-300">
              <span>🎁</span>
              <span>Exclusive Offers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
