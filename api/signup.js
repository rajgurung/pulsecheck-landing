// Vercel API Route for PulseCheck Signup
// Securely handles email signups and integrates with ConvertKit

export default async function handler(req, res) {
    // Set CORS headers for security
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method not allowed',
            message: 'Only POST requests are accepted' 
        });
    }

    try {
        const { email, plan } = req.body;

        // Validate required fields
        if (!email || !plan) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Email and plan are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email',
                message: 'Please provide a valid email address'
            });
        }

        // Validate plan options
        const validPlans = ['free', 'indie', 'team'];
        if (!validPlans.includes(plan)) {
            return res.status(400).json({
                error: 'Invalid plan',
                message: 'Plan must be one of: free, indie, team'
            });
        }

        // ConvertKit API Integration
        const convertKitApiKey = process.env.CONVERTKIT_API_KEY;
        const convertKitFormId = process.env.CONVERTKIT_FORM_ID;

        if (!convertKitApiKey || !convertKitFormId) {
            console.error('Missing ConvertKit environment variables');
            return res.status(500).json({
                error: 'Configuration error',
                message: 'Email service is not properly configured'
            });
        }

        // Subscribe to ConvertKit
        const convertKitResponse = await fetch(`https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: convertKitApiKey,
                email: email,
                tags: [plan, 'pulsecheck-signup'], // Tag with plan and source
                fields: {
                    plan_interest: plan,
                    signup_date: new Date().toISOString(),
                    source: 'landing_page'
                }
            })
        });

        const convertKitData = await convertKitResponse.json();

        if (!convertKitResponse.ok) {
            console.error('ConvertKit API error:', convertKitData);
            
            // Handle duplicate email gracefully
            if (convertKitData.message && convertKitData.message.includes('already subscribed')) {
                return res.status(200).json({
                    success: true,
                    message: 'Thanks! You\'re already on our list.',
                    duplicate: true
                });
            }
            
            return res.status(500).json({
                error: 'Email service error',
                message: 'Unable to process signup. Please try again.'
            });
        }

        // Log successful signup (for monitoring)
        console.log('Successful signup:', { 
            email: email.replace(/(.{3}).*(@.*)/, '$1***$2'), // Partially hide email in logs
            plan, 
            timestamp: new Date().toISOString() 
        });

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Successfully joined the waitlist!',
            subscriber_id: convertKitData.subscription?.subscriber?.id
        });

    } catch (error) {
        console.error('Signup API error:', error);
        
        return res.status(500).json({
            error: 'Server error',
            message: 'An unexpected error occurred. Please try again.'
        });
    }
}