#!/bin/bash

echo "🚀 Zuno Website Deployment Script"
echo "=================================="

# Check if build is successful
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo ""
    echo "🌟 DEPLOYMENT OPTIONS:"
    echo "1. Deploy to Vercel (Recommended)"
    echo "2. Deploy to Netlify"
    echo "3. Manual deployment instructions"
    echo ""
    
    read -p "Choose deployment option (1-3): " choice
    
    case $choice in
        1)
            echo "🚀 Deploying to Vercel..."
            echo "Please run: vercel --prod"
            echo ""
            echo "First time? Run: vercel login"
            echo "Then run: vercel --prod"
            ;;
        2)
            echo "🌐 Deploying to Netlify..."
            echo "Please run: npx netlify-cli deploy --prod --dir=.next"
            echo ""
            echo "First time? Run: npx netlify-cli login"
            ;;
        3)
            echo "📋 Manual Deployment Instructions:"
            echo ""
            echo "1. Upload the .next folder to your hosting provider"
            echo "2. Set environment variables:"
            echo "   SHOPIFY_STORE_DOMAIN=xphnnb-pg.myshopify.com"
            echo "   SHOPIFY_STOREFRONT_ACCESS_TOKEN=9fb1ffebc27c222aa6534add410f0079"
            echo "   NEXT_PUBLIC_SITE_URL=https://yourdomain.com"
            echo "3. Start the server with: npm start"
            ;;
        *)
            echo "❌ Invalid option"
            ;;
    esac
else
    echo "❌ Build failed! Please fix the errors before deploying."
    exit 1
fi

echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo "🎉 Your Zuno website is ready to go live!"