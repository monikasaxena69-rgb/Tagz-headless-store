import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-primary/10 via-background to-accent2/15 pt-8 pb-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-highlight/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent1/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 items-start">
          {/* Logo and description */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start mb-6">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <img 
                  src="/logo.png" 
                  alt="Zuno Logo" 
                  className="w-44 h-44 md:w-52 md:h-52 object-contain cursor-pointer"
                />
              </Link>
            </div>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="https://www.facebook.com/tryzuno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/tryzuno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-accent1/20 border border-accent1/40 rounded-full flex items-center justify-center text-accent1 hover:bg-accent1 hover:text-white transition-all duration-200 transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://twitter.com/try_zuno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-highlight/20 border border-highlight/40 rounded-full flex items-center justify-center text-highlight hover:bg-highlight hover:text-black transition-all duration-200 transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="bg-background/30 backdrop-blur-sm p-6 rounded-2xl border border-primary/20">
            <h3 className="text-text-light font-semibold mb-4 bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Products</h3>
            <ul className="space-y-3 text-sm">
              {['Zuno Card', 'Zuno Clip', 'Zuno Jet', 'Zuno Pet', 'Zuno Pro'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-text-muted hover:text-highlight transition-colors duration-200 flex items-center space-x-2 p-2 rounded-lg hover:bg-highlight/10">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="bg-background/30 backdrop-blur-sm p-6 rounded-2xl border border-accent1/20">
            <h3 className="text-text-light font-semibold mb-4 bg-gradient-to-r from-accent1 to-accent2 bg-clip-text text-transparent">Support</h3>
            <ul className="space-y-3 text-sm">
              {['Help Center','Contact Us','Warranty','Returns'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-text-muted hover:text-highlight transition-colors duration-200 flex items-center space-x-2 p-2 rounded-lg hover:bg-highlight/10"
                  >
                    <span className="w-2 h-2 bg-accent1 rounded-full"></span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="bg-background/30 backdrop-blur-sm p-6 rounded-2xl border border-highlight/20">
            <h3 className="text-text-light font-semibold mb-4 bg-gradient-to-r from-accent2 to-highlight bg-clip-text text-transparent">Company</h3>
            <ul className="space-y-3 text-sm">
              {['About Us','Careers','Privacy','Terms'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-text-muted hover:text-highlight transition-colors duration-200 flex items-center space-x-2 p-2 rounded-lg hover:bg-highlight/10"
                  >
                    <span className="w-2 h-2 bg-highlight rounded-full"></span>
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/30 pt-8 text-center bg-background/20 backdrop-blur-sm rounded-2xl p-6">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Zuno Technologies. All rights reserved. Made with <span className="text-highlight">❤️</span> for peace of mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
