import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

// Defining the function with a flexible handler to avoid chaining errors in this environment
const _sendEmail = createServerFn({ method: "POST" })
  .handler(async (ctx: any) => {
    // In TanStack Start, 'data' is passed within the context object
    const data = ctx.data as z.infer<typeof contactSchema>;

    if (!data) throw new Error("No data provided");

    const validatedData = contactSchema.parse(data);
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not defined");
    }

    const resend = new Resend(apiKey);

    try {
      const result = await resend.emails.send({
        from: "Bharath's Petal <onboarding@resend.dev>",
        to: ["bharathserman@gmail.com"],
        subject: `[Portfolio] Message from ${validatedData.name}`,
        replyTo: validatedData.email,
        text: `New message from: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
            </head>
            <body style="margin: 0; padding: 0; background-color: #fcf8f8; font-family: 'Inter', -apple-system, sans-serif;">
              <div style="width: 100%; padding: 60px 0; background-color: #fcf8f8;">
                <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(232, 128, 154, 0.1); border: 1px solid #ffe4e1;">
                  
                  <!-- Header Area -->
                  <div style="padding: 40px 40px 30px 40px; text-align: center; border-bottom: 1px solid #fdf2f2;">
                    <div style="display: inline-block; width: 44px; height: 44px; line-height: 44px; background: linear-gradient(135deg, #ffb7c5 0%, #e8809a 100%); border-radius: 50%; color: white; font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: bold; margin-bottom: 20px;">
                      B
                    </div>
                    <p style="text-transform: uppercase; letter-spacing: 0.3em; font-size: 10px; color: #e8809a; font-weight: 700; margin: 0 0 12px 0;">New Thought Received</p>
                    <h1 style="font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #2d2a2a; margin: 0; font-weight: 600; line-height: 1.2;">
                      A message drifted <br/> into your <span style="color: #e8809a; font-style: italic;">garden</span>.
                    </h1>
                  </div>

                  <!-- Content Area -->
                  <div style="padding: 40px;">
                    <div style="margin-bottom: 30px;">
                      <p style="text-transform: uppercase; letter-spacing: 0.15em; font-size: 9px; color: #a0aec0; margin: 0 0 8px 0; font-weight: bold;">From the Traveler</p>
                      <p style="font-size: 18px; color: #2d2a2a; margin: 0; font-weight: 500;">${validatedData.name}</p>
                      <p style="font-size: 14px; color: #e8809a; margin: 4px 0 0 0;">${validatedData.email}</p>
                    </div>

                    <div style="position: relative; padding: 30px; background-color: #fffafb; border-radius: 16px; border: 1px solid #ffe4e1;">
                      <!-- Decorative Petal SVG in background -->
                      <div style="margin-bottom: 15px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffb7c5" style="opacity: 0.5;">
                          <path d="M 12 23 C 2 12, 5 2, 11 2 Q 12 4, 13 2 C 19 2, 22 12, 12 23 Z" />
                        </svg>
                      </div>
                      <p style="font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; color: #4a3a3a; line-height: 1.6; margin: 0;">
                        "${validatedData.message.replace(/\n/g, '<br/>')}"
                      </p>
                    </div>

                    <div style="margin-top: 40px; text-align: center;">
                      <a href="mailto:${validatedData.email}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #ffb7c5 0%, #e8809a 100%); color: white; text-decoration: none; border-radius: 100px; font-size: 12px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; box-shadow: 0 10px 20px rgba(232, 128, 154, 0.2);">
                        Reply to Traveler
                      </a>
                    </div>
                  </div>

                  <!-- Footer Area -->
                  <div style="padding: 30px; background-color: #fdfafb; text-align: center;">
                    <p style="font-size: 11px; color: #b0a4a4; letter-spacing: 0.1em; margin: 0;">
                      Sent from your <strong style="color: #e8809a;">Anime Portfolio</strong> &copy; 2026
                    </p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      if (result.error) {
        console.error("Resend error:", result.error);
        throw new Error("Failed to send email");
      }

      return { success: true };
    } catch (error) {
      console.error("Email handler error:", error);
      throw new Error("Something went wrong");
    }
  });

// Explicitly export with the expected type to fix the client-side error in Contact.tsx
export const sendEmail = _sendEmail as unknown as (args: { data: z.infer<typeof contactSchema> }) => Promise<{ success: boolean }>;
