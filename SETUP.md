# PulseCheck Signup Setup Guide

## 🚀 Vercel Deployment with Airtable Integration

### Prerequisites
- Vercel account (free tier works)
- Airtable account (free forever - up to 1,000 records)

### 1. Airtable Setup

1. **Create Airtable Account**
   - Go to [Airtable.com](https://airtable.com)
   - Sign up for free account (free forever!)

2. **Create Your Base**
   - Click "Create a base" → "Start from scratch"
   - Name it "PulseCheck Signups" 
   - Rename the table to "Signups"

3. **Set Up Table Structure**
   Delete default fields and create these fields:
   - **Email** (Single line text) - Primary field
   - **Plan** (Single select: free, indie, team)
   - **Signup Date** (Date)  
   - **Timestamp** (Date and time)
   - **Source** (Single line text)
   - **Status** (Single select: New, Contacted, Converted)

4. **Get API Credentials**
   - Go to [Personal Access Tokens](https://airtable.com/create/tokens)
   - Click "Create new token"
   - Name: "PulseCheck API"
   - Scopes: `data.records:write` (for your base)
   - Copy the **Personal Access Token**
   - Get **Base ID**: Go to your base → Help → API documentation → Copy Base ID

### 2. Vercel Environment Variables

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add these variables:

   ```
   AIRTABLE_API_KEY = your_personal_access_token_here
   AIRTABLE_BASE_ID = your_base_id_here
   AIRTABLE_TABLE_NAME = Signups
   ```

2. **For Local Development:**
   - Copy `.env.example` to `.env.local`
   - Fill in your Airtable credentials
   - Never commit `.env.local` to git

### 3. Test the Setup

1. **Deploy to Vercel**
   ```bash
   git add .
   git commit -m "Add Airtable signup integration"
   git push origin main
   ```

2. **Test Signup Flow**
   - Visit your deployed site
   - Click any "Join Waitlist" button
   - Fill out the form with a test email
   - Check Airtable for new record!

### 4. Airtable Benefits

**Visual Dashboard:**
- See all signups in a beautiful spreadsheet view
- Sort by date, plan, or any field
- Add notes and track follow-up status
- Export to CSV anytime

**Easy Management:**
- Filter by plan interest (free, indie, team)
- Track conversion from signup to customer
- Add custom fields as needed
- No email limits or restrictions

### 5. Monitoring & Analytics

**Check API Logs:**
- Vercel Dashboard > Functions tab
- View logs for `/api/signup` function
- Monitor for errors or issues

**Airtable Analytics:**
- Visual charts and reports in Airtable
- Track signup trends over time
- Plan distribution analytics

### 6. Security Notes

- ✅ API keys are securely stored in Vercel environment
- ✅ No sensitive data exposed in frontend
- ✅ CORS headers properly configured
- ✅ Input validation on both client and server
- ✅ Graceful error handling

### 7. Troubleshooting

**Common Issues:**
- **"Configuration error"**: Check environment variables are set in Vercel
- **"Database error"**: Verify Airtable API key and Base ID
- **CORS errors**: Ensure API route is deployed properly

**Testing Locally:**
```bash
npm install -g vercel
vercel dev
```
Then test at `http://localhost:3000`

### 8. Future Email Marketing

**When Ready to Scale:**
- Export your Airtable data to CSV
- Import to ConvertKit, Mailchimp, or any email service
- Your data is portable and not locked into any platform!

**Automation Ideas:**
- Use Zapier to connect Airtable to email services
- Trigger welcome emails based on plan selection
- Set up Slack notifications for new signups

### 9. Next Steps

1. **Growth Tracking**: Monitor signup rates and plan distribution
2. **Analytics**: Add tracking for signup conversion rates
3. **A/B Testing**: Test different form copy and CTAs  
4. **Email Marketing**: When ready, export and import to email service

---

🎉 **You're all set!** Your PulseCheck signup is now collecting real subscribers with Airtable - **free forever** for up to 1,000 signups!