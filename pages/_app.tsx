import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Force rebuild: Build timestamp
const FORCE_REBUILD = process.env.NODE_ENV === 'production' ? Date.now() : 'dev'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Build ID: {FORCE_REBUILD} */}
      <Component {...pageProps} />
    </>
  )
}
