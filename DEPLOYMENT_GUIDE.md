# Vercel Deployment Troubleshooting Guide

## 🚨 Current Issue: Build Command Error

If you're seeing `Error: Command "npm run build" exited with 1`, follow these steps:

## ✅ **Step-by-Step Fix:**

### 1. **Update Your Repository**
Make sure you've pushed all the latest changes to GitHub:

```bash
git add .
git commit -m "Fix build errors and add deployment configuration"
git push origin main
```

### 2. **Vercel Environment Variables** 
In your Vercel dashboard, add these environment variables:

| Variable Name | Value | Required |
|---------------|-------|----------|
| `SHOPIFY_STORE_DOMAIN` | `your-store-name` (without .myshopify.com) | ✅ YES |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Your storefront API token | ✅ YES |
| `NODE_VERSION` | `18` | 🔧 Recommended |

**How to add environment variables:**
1. Go to your project in Vercel dashboard
2. Click "Settings" tab
3. Click "Environment Variables" 
4. Add each variable above

### 3. **Redeploy**
After adding environment variables:
1. Go to "Deployments" tab in Vercel
2. Click "Redeploy" on the latest deployment
3. Select "Use existing build cache" ❌ (uncheck this)
4. Click "Redeploy"

## 🔍 **Common Causes & Solutions:**

### Issue: Node.js Version Mismatch
**Solution:** Ensure Vercel uses Node.js 18
- Add `NODE_VERSION=18` as environment variable
- Check that `.nvmrc` file contains `18`

### Issue: Missing TypeScript Types
**Solution:** Fresh dependency install
```bash
# In Vercel, this happens automatically, but you can verify locally:
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Environment Variables Not Set
**Solution:** The app will fail if Shopify credentials are missing
- Verify `SHOPIFY_STORE_DOMAIN` is just the store name (e.g., "my-store", not "my-store.myshopify.com")
- Verify `SHOPIFY_STOREFRONT_ACCESS_TOKEN` is correct

### Issue: Build Cache Problems
**Solution:** Clear Vercel build cache
1. In Vercel dashboard → Deployments
2. Click "Redeploy" 
3. Uncheck "Use existing build cache"
4. Deploy

## 🛠 **Advanced Debugging:**

### Check Build Logs
1. Go to Vercel dashboard
2. Click on the failed deployment
3. Check "Build Logs" for specific error messages
4. Look for:
   - TypeScript errors
   - Missing dependencies
   - Environment variable issues

### Local Build Test
Run these commands locally to ensure everything works:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test build
npm run build

# Should see: ✓ Compiled successfully
```

### Verify Shopify Credentials
Test your Shopify setup:
1. Go to Shopify Admin
2. Apps → Develop apps (or Manage private apps)
3. Check Storefront API permissions
4. Verify token is active

## 📋 **Checklist Before Deployment:**

- [ ] All code pushed to GitHub
- [ ] Environment variables added in Vercel
- [ ] Node.js version set to 18
- [ ] Local build works (`npm run build`)
- [ ] Shopify credentials are valid
- [ ] Clear build cache on redeploy

## 🆘 **Still Having Issues?**

If the build still fails:

1. **Check the exact error** in Vercel build logs
2. **Compare with local build** - does `npm run build` work locally?
3. **Verify environment variables** are exactly as shown above
4. **Try a fresh deployment** from a new git commit

## 📞 **Next Steps:**

After successful deployment:
1. Visit your live site URL
2. Test that pages load correctly
3. Add real Shopify products to test functionality
4. Monitor for any runtime errors

---

**✅ Your site should now deploy successfully on Vercel!**