export default function Newsletter() {
  return (
    <section className="relative px-4 pb-8 bg-gradient-to-b from-primary/10 via-accent2/15 to-primary/10 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 md:w-48 md:h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 md:w-60 md:h-60 bg-highlight/25 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 md:w-36 md:h-36 bg-accent1/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-highlight/30 border border-highlight/50 text-highlight font-semibold text-sm shadow-lg shadow-highlight/10">
          <span className="mr-2">📬</span>
          Join the Community
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-text-light mb-6">
          Stay Updated with <span className="bg-gradient-to-r from-primary via-accent2 to-highlight bg-clip-text text-transparent">Zuno</span>
        </h2>
        <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
          Be the first to know about new products, exclusive offers, and cutting-edge tracking technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-full bg-background/80 backdrop-blur-md border border-primary/40 text-text-light placeholder-text-muted focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20 transition-all duration-200"
          />
          <button className="bg-gradient-to-r from-primary to-accent2 hover:from-primary/80 hover:to-accent2/80 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-primary/20">
            Subscribe
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 text-text-muted text-sm">
          <div className="flex items-center space-x-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
            <span>✅</span>
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center space-x-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-accent1/20">
            <span>📧</span>
            <span>Monthly updates</span>
          </div>
          <div className="flex items-center space-x-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-highlight/20">
            <span>🎁</span>
            <span>Exclusive offers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
