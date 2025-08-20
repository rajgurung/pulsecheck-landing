// Vercel API Route for PulseCheck Signup
// Securely handles email signups and integrates with Airtable

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

        // Airtable API Integration
        const airtableApiKey = process.env.AIRTABLE_API_KEY;
        const airtableBaseId = process.env.AIRTABLE_BASE_ID;
        const airtableTableName = process.env.AIRTABLE_TABLE_NAME || 'Signups';

        if (!airtableApiKey || !airtableBaseId) {
            console.error('Missing Airtable environment variables');
            return res.status(500).json({
                error: 'Configuration error',
                message: 'Database service is not properly configured'
            });
        }

        // Create signup record in Airtable
        const airtableResponse = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${airtableApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                records: [{
                    fields: {
                        'Email': email,
                        'Plan': plan,
                        'Signup Date': new Date().toISOString().split('T')[0], // YYYY-MM-DD format
                        'Timestamp': new Date().toISOString(),
                        'Source': 'Landing Page',
                        'Status': 'New'
                    }
                }]
            })
        });

        const airtableData = await airtableResponse.json();

        if (!airtableResponse.ok) {
            console.error('Airtable API error:', airtableData);
            
            // Handle potential duplicate email (Airtable doesn't enforce uniqueness by default)
            if (airtableData.error && airtableData.error.message && 
                airtableData.error.message.includes('duplicate')) {
                return res.status(200).json({
                    success: true,
                    message: 'Thanks! You\'re already on our list.',
                    duplicate: true
                });
            }
            
            return res.status(500).json({
                error: 'Database error',
                message: 'Unable to process signup. Please try again.'
            });
        }

        // Log successful signup (for monitoring)
        console.log('Successful signup:', { 
            email: email.replace(/(.{3}).*(@.*)/, '$1***$2'), // Partially hide email in logs
            plan, 
            timestamp: new Date().toISOString(),
            recordId: airtableData.records[0]?.id
        });

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Successfully joined the waitlist!',
            recordId: airtableData.records[0]?.id
        });

    } catch (error) {
        console.error('Signup API error:', error);
        
        return res.status(500).json({
            error: 'Server error',
            message: 'An unexpected error occurred. Please try again.'
        });
    }
}