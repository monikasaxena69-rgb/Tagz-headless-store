export default function Footer() {
  return (
    <footer className="bg-background border-t border-text-muted/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo.png" 
                alt="Zuno Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="text-text-muted text-sm mb-4">
              Never lose anything again with our smart tracking technology.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-text-muted hover:text-highlight transition-colors">📘</a>
              <a href="#" className="text-text-muted hover:text-highlight transition-colors">📷</a>
              <a href="#" className="text-text-muted hover:text-highlight transition-colors">🐦</a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-text-light font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-text-muted hover:text-highlight transition-colors">Zuno Card</a></li>
              <li><a href="#" className="text-text-muted hover:text-highlight transition-colors">Zuno Key</a></li>
              <li><a href="#" className="text-text-muted hover:text-highlight transition-colors">Zuno Pro</a></li>
              <li><a href="#" className="text-text-muted hover:text-highlight transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-text-light font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {['Help Center','Contact Us','Warranty','Returns'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-text-muted hover:text-highlight transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-text-light font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {['About Us','Careers','Privacy','Terms'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-text-muted hover:text-highlight transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-text-muted/20 pt-8 text-center">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Zuno Labs. All rights reserved. Made with ❤️ for peace of mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
