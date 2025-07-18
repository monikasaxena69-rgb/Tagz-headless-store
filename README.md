# Zuno - Smart Tracking Technology

A modern, vibrant Next.js website for Zuno tracking devices with integrated Shopify store.

## 🚀 Features

- **Responsive Design**: Beautiful, mobile-first design
- **Shopify Integration**: Direct product linking and data fetching
- **Vibrant UI**: Colorful gradients and smooth animations
- **Fast Performance**: Optimized Next.js with static generation

## 🛠️ Setup & Deployment

### Prerequisites
- Node.js 16+ 
- Shopify store with Storefront API access
- Vercel account

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your values
4. Run development server: `npm run dev`

### Vercel Deployment

#### Step 1: Push to GitHub
Make sure your code is in a GitHub repository.

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Next.js project

#### Step 3: Configure Environment Variables
In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here
```

#### Step 4: Deploy
Click "Deploy" and Vercel will build and deploy your site.

#### Step 5: Add Custom Domain
1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update your domain's DNS records as instructed by Vercel

## 🌐 Shopify Setup

### Get Storefront Access Token:
1. Go to your Shopify admin
2. Apps → Develop apps → Create an app
3. Configure → Storefront API → Enable
4. Copy the Storefront access token

### Store Domain:
Use your myshopify.com domain (e.g., `your-store.myshopify.com`)

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `SHOPIFY_STORE_DOMAIN` | Your Shopify store domain (without https://) |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Shopify Storefront API access token |
| `NEXT_PUBLIC_SITE_URL` | Your website URL (for SEO/meta tags) |

## 🎨 Customization

The website features several customizable sections:
- **Header**: Logo, navigation, shop button
- **Hero**: Rotating slides with product highlights  
- **Features**: Benefit cards with icons
- **Products**: Shopify product showcase
- **Newsletter**: Email subscription
- **Footer**: Links and social media

## 📱 Social Media Links

Update the footer social media links in `components/Footer.tsx`:
- Instagram: @tryzuno
- Facebook: @tryzuno  
- Twitter/X: @try_zuno

## 🚀 Performance

- Static Site Generation (SSG) for fast loading
- Image optimization
- CSS-in-JS with Tailwind CSS
- Responsive design for all devices

---

Built with ❤️ for Zuno Technologies
