# PulseCheck Signup Setup Guide

## 🚀 Vercel Deployment with ConvertKit Integration

### Prerequisites
- Vercel account (free tier works)
- ConvertKit account (free up to 1000 subscribers)

### 1. ConvertKit Setup

1. **Create ConvertKit Account**
   - Go to [ConvertKit.com](https://convertkit.com)
   - Sign up for free account

2. **Get API Credentials**
   - Go to [Account Settings > Advanced](https://app.convertkit.com/account_settings/advanced_settings)
   - Copy your **API Key**
   - Note: Keep this secure!

3. **Create a Form**
   - Go to "Grow" > "Landing Pages & Forms"
   - Create a new form (can be simple, we'll use API)
   - Copy the **Form ID** from the form URL or settings

### 2. Vercel Environment Variables

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add these variables:

   ```
   CONVERTKIT_API_KEY = your_actual_api_key_here
   CONVERTKIT_FORM_ID = your_actual_form_id_here
   ```

2. **For Local Development:**
   - Copy `.env.example` to `.env.local`
   - Fill in your ConvertKit credentials
   - Never commit `.env.local` to git

### 3. Test the Setup

1. **Deploy to Vercel**
   ```bash
   git add .
   git commit -m "Add ConvertKit signup integration"
   git push origin main
   ```

2. **Test Signup Flow**
   - Visit your deployed site
   - Click any "Join Waitlist" button
   - Fill out the form with a test email
   - Check ConvertKit for new subscriber

### 4. ConvertKit Configuration

**Recommended Tags to Create:**
- `free` - For free plan signups  
- `indie` - For indie plan signups
- `team` - For team plan signups
- `pulsecheck-signup` - For all signups from landing page

**Set up Automation:**
- Create welcome email sequence
- Tag-based segmentation for different plans
- Follow-up sequences based on interest level

### 5. Monitoring & Analytics

**Check API Logs:**
- Vercel Dashboard > Functions tab
- View logs for `/api/signup` function
- Monitor for errors or issues

**ConvertKit Analytics:**
- Track signup rates
- Monitor email engagement
- A/B test welcome sequences

### 6. Security Notes

- ✅ API keys are securely stored in Vercel environment
- ✅ No sensitive data exposed in frontend
- ✅ CORS headers properly configured
- ✅ Input validation on both client and server
- ✅ Graceful error handling

### 7. Troubleshooting

**Common Issues:**
- **"Configuration error"**: Check environment variables are set in Vercel
- **"Email service error"**: Verify ConvertKit API key and form ID
- **CORS errors**: Ensure API route is deployed properly

**Testing Locally:**
```bash
npm install -g vercel
vercel dev
```
Then test at `http://localhost:3000`

### 8. Next Steps

1. **Email Sequences**: Set up automated welcome emails in ConvertKit
2. **Analytics**: Add tracking for signup conversion rates  
3. **A/B Testing**: Test different form copy and CTAs
4. **Monitoring**: Set up alerts for signup errors

---

🎉 **You're all set!** Your PulseCheck signup is now collecting real subscribers securely.