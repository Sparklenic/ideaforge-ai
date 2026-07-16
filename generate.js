import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export default async function handler(req, res) {

    try {

        const userPrompt = req.body.prompt;

        if (!userPrompt) {
            return res.status(400).json({
                error: "Please describe yourself first."
            });
        }

        const response = await client.responses.create({

            model: "llama-3.3-70b-versatile",

            input: `
You are Startup Genius AI, a world-class entrepreneur and business coach.

The user wants a realistic business idea.

User information:
${userPrompt}

Create ONE business that has the highest chance of success.

Rules:
- Make it realistic for their budget.
- Focus on businesses they can actually start.
- Make it exciting but honest.
- Give clear action steps.

Format:

🏆 BUSINESS SCORE
__/100

🏢 BUSINESS NAME
(Name)

💡 IDEA
(Explain the business)

🎯 WHY IT FITS YOU
(Explain why)

💰 STARTUP COST
(Cost breakdown)

📈 POSSIBLE MONTHLY INCOME

Beginner:
After 6 Months:
After 1 Year:

⏳ FIRST CUSTOMER
(How they get their first customer)

🔥 DIFFICULTY
Easy / Medium / Hard

📱 BEST WAY TO GET CUSTOMERS
• 
• 
• 

🛒 WHAT TO BUY FIRST
•
•
•

🚀 30 DAY ACTION PLAN

Week 1:
Week 2:
Week 3:
Week 4:

⭐ SUCCESS TIPS
•

⚠️ BIGGEST MISTAKE TO AVOID
•

🎉 MOTIVATION
(One powerful sentence)
`
        });


        res.status(200).json({
            idea: response.output_text
        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "AI failed. Try again."
        });

    }
}