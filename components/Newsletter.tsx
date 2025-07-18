export default function Newsletter() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-text-light mb-6">
          Stay Updated with <span className="bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">Zuno</span>
        </h2>
        <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
          Be the first to know about new products and exclusive offers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-full bg-background border border-text-muted/30 text-text-light placeholder-text-muted focus:border-highlight focus:outline-none"
          />
          <button className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200">
            Subscribe
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 text-text-muted text-sm">
          <div className="flex items-center space-x-2">
            <span>✅</span>
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📧</span>
            <span>Monthly updates</span>
          </div>
        </div>
      </div>
    </section>
  );
}
