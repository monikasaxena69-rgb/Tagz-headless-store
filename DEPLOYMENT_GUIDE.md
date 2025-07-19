# 🚀 Zuno Website - Complete Deployment Guide

## 🌟 **Quick Start: Vercel Deployment (Recommended)**

Vercel is the **best choice** for Next.js apps - it's free, fast, and made by the Next.js team.

### **Option 1: GitHub + Vercel (Easiest)**

#### **Step 1: Push to GitHub**
```bash
# From your project directory (/workspace)
git init
git add .
git commit -m "Complete Zuno tracking website"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/zuno-website.git
git branch -M main
git push -u origin main
```

#### **Step 2: Deploy to Vercel**
1. **Visit**: [vercel.com](https://vercel.com)
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import** your GitHub repository
5. **Vercel auto-detects** Next.js - no configuration needed!

#### **Step 3: Environment Variables**
In Vercel dashboard → **Settings → Environment Variables**:
```
SHOPIFY_STORE_DOMAIN=xphnnb-pg.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=9fb1ffebc27c222aa6534add410f0079
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```

#### **Step 4: Deploy & Go Live**
- Click **"Deploy"**
- ✅ **Your site will be live** at `https://your-project-name.vercel.app`
- 🔄 **Auto-deploys** on every GitHub push

---

### **Option 2: Direct Vercel CLI Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel --prod

# Follow the prompts - Vercel will guide you!
```

---

## 🌐 **Alternative Deployment Options**

### **Option 3: Netlify**

#### **Method A: Netlify CLI**
```bash
# Build the project
npm run build

# Login to Netlify
npx netlify-cli login

# Deploy
npx netlify-cli deploy --prod --dir=.next
```

#### **Method B: Netlify Dashboard**
1. **Build locally**: `npm run build`
2. **Visit**: [netlify.com](https://netlify.com)
3. **Drag & drop** the `.next` folder
4. **Add environment variables** in site settings

### **Option 4: Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### **Option 5: DigitalOcean App Platform**
1. **Connect GitHub** repository
2. **Select** your repository
3. **Auto-detects** Next.js
4. **Add environment variables**
5. **Deploy**

---

## ⚙️ **Environment Variables (Required for All Platforms)**

Make sure to add these in your deployment platform:

```bash
SHOPIFY_STORE_DOMAIN=xphnnb-pg.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=9fb1ffebc27c222aa6534add410f0079
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 🔗 **Custom Domain Setup**

### **Vercel Custom Domain**
1. **Vercel Dashboard** → **Settings → Domains**
2. **Add your domain**: `www.zuno.com`
3. **Update DNS** with provided records:
   - `A Record`: `76.76.19.61`
   - `CNAME`: `cname.vercel-dns.com`

### **Netlify Custom Domain**
1. **Site Dashboard** → **Domain Management**
2. **Add custom domain**
3. **Update nameservers** or DNS records

---

## 📋 **Pre-Deployment Checklist**

### **✅ Before You Deploy**
- [ ] All dependencies installed (`npm install`)
- [ ] Project builds successfully (`npm run build`)
- [ ] Environment variables configured
- [ ] Shopify integration tested
- [ ] All components working

### **✅ After Deployment**
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Shopify products display
- [ ] Buy buttons work
- [ ] Mobile responsive
- [ ] Contact forms functional

---

## 🚨 **Troubleshooting Common Issues**

### **Build Errors**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### **Environment Variables Not Working**
- Check variable names are exact
- Restart the deployment
- Verify in platform dashboard

### **Shopify Products Not Loading**
- Verify Shopify domain is correct
- Check API token has proper permissions
- Test API connection locally first

### **Images Not Loading**
- Ensure `cdn.shopify.com` is in Next.js config
- Check image URLs are valid

---

## 📊 **Expected Performance**

After deployment, you should see:
- **⚡ Page Load**: <2 seconds
- **📱 Mobile Score**: 90+
- **🔍 SEO Score**: 95+
- **♿ Accessibility**: 100

---

## 🎯 **Recommended: Vercel Deployment**

**Why Vercel?**
- ✅ **Free tier** perfect for this project
- ✅ **Automatic deployments** from GitHub
- ✅ **Perfect Next.js support**
- ✅ **Global CDN** for fast loading
- ✅ **Zero configuration** needed
- ✅ **Custom domains** included
- ✅ **SSL certificates** automatic

---

## 🔄 **Continuous Deployment**

Once connected to GitHub:
1. **Make changes** to your code
2. **Push to GitHub**: `git push`
3. **Automatic deployment** triggered
4. **Live in ~30 seconds**

---

## 🌟 **Your Live Website Will Include:**

- ✅ **Beautiful landing page** with animated hero
- ✅ **Product showcase** with Shopify integration
- ✅ **Individual product pages** with full details
- ✅ **Responsive design** for all devices
- ✅ **Fast loading** with optimized images
- ✅ **Professional animations** and interactions
- ✅ **Newsletter signup** functionality
- ✅ **Direct Shopify checkout** integration

**Your Zuno tracking device website will be live and ready to sell products! 🚀**

---

## 📞 **Need Help?**

If you encounter any issues:
1. Check the build logs in your deployment platform
2. Verify environment variables are set correctly
3. Test the build locally first: `npm run build`
4. Most issues are related to environment variables or missing dependencies

**Ready to go live? Start with Vercel - it's the easiest and most reliable option! 🌟**