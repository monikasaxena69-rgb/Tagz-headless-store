# Zuno Headless Store

This is a Next.js + TypeScript + Tailwind CSS headless storefront for Zuno, designed to work with Shopify's Storefront API.

## Features

- 🛍️ Modern headless e-commerce storefront
- ⚡ Built with Next.js 13 for optimal performance
- 🎨 Styled with Tailwind CSS for responsive design
- 🔌 Integrated with Shopify Storefront API
- 📱 Mobile-friendly responsive design
- 🚀 Ready for Vercel deployment

## Setup & Installation

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the example environment file and configure your Shopify settings:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Shopify store credentials:

```env
SHOPIFY_STORE_DOMAIN=your-store-domain
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

**Getting Shopify Credentials:**
1. Go to your Shopify Admin panel
2. Navigate to Apps > Develop apps (or Manage private apps for older stores)
3. Create a new app or use an existing one
4. Enable Storefront API access
5. Copy the Storefront access token

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. Push your code to a GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project" and import your GitHub repository
4. Add environment variables in Vercel:
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
5. Deploy!

### Option 2: Deploy via CLI

```bash
npm install -g vercel
vercel
```

### Option 3: Deploy from ZIP

If you uploaded a ZIP file to Vercel:
1. Ensure all dependencies are in `package.json`
2. Add environment variables in Vercel dashboard
3. The build should work automatically

## Troubleshooting

### Common Issues

**Build Errors:**
- Make sure all TypeScript dependencies are installed
- Check that environment variables are properly set
- Ensure Shopify credentials are valid

**Deployment Issues:**
- Verify `vercel.json` configuration
- Check Vercel function logs for errors
- Ensure environment variables are set in Vercel dashboard

**Runtime Errors:**
- Check browser console for client-side errors
- Verify Shopify API permissions and tokens
- Ensure your Shopify store has products to display

### Getting Help

If you encounter issues:
1. Check the Vercel deployment logs
2. Verify your Shopify API credentials
3. Ensure your Shopify store has the Storefront API enabled
4. Check the browser console for JavaScript errors

## Project Structure

```
├── components/          # React components
├── lib/                # Utility functions and API calls
├── pages/              # Next.js pages and routing
├── styles/             # CSS and styling files
├── .env.example        # Environment variables template
├── vercel.json         # Vercel deployment configuration
└── README.md           # This file
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 13** - React framework with SSR/SSG
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **GraphQL** - Query language for Shopify API
- **Vercel** - Deployment platform
