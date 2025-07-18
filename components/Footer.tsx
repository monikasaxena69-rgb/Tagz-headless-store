// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-background border-t border-text-muted">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Support Column */}
        <div>
          <h3 className="text-lg font-semibold text-text-light mb-4">Support</h3>
          <ul className="space-y-2">
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

        {/* Company Column */}
        <div>
          <h3 className="text-lg font-semibold text-text-light mb-4">Company</h3>
          <ul className="space-y-2">
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
      <div className="text-center text-sm text-text-muted pb-6">
        © {new Date().getFullYear()} Zuno Labs. Made with ❤️ for peace of mind.
      </div>
    </footer>
  )
}
