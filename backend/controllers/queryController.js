import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "onboarding@resend.dev";
const ADMIN_EMAIL = "krishnaprasad24795@gmail.com";

export async function sendQuery(req, res) {
  const { name, phone,email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, phone number, email and message are required" });
  }

  try {
    const htmlContent = `
  <div style="
    font-family: 'Segoe UI', Arial, sans-serif; 
    max-width: 650px; 
    margin: auto; 
    padding: 25px; 
    background: #f4f7fb; 
    border-radius: 12px;
    border: 1px solid #e0e6ed;
  ">

    <div style="
      background: #0ea5e9;
      padding: 18px 20px;
      border-radius: 10px;
      text-align: center;
      color: white;
      font-size: 22px;
      font-weight: bold;
      letter-spacing: .5px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    ">
      New Support Query Received
    </div>

    <div style="
      background: white;
      margin-top: 20px;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      border: 1px solid #eef1f5;
    ">
      <p style="font-size: 16px; color: #444; margin-bottom: 12px;">
        Hello Admin,
      </p>

      <p style="font-size: 15px; color: #555; margin-bottom: 20px;">
        You have received a new support query from the website:
      </p>

      <table style="width: 100%; font-size: 15px; color: #333;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 8px 0;">${name}</td>
        </tr>

        
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
        <td style="padding: 8px 0;">${phone}</td>
      </tr>
      
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Email:</td>
          <td style="padding: 8px 0;">${email}</td>
        </tr>

        <tr>
          <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
          <td style="padding: 8px 0; line-height: 1.5;">
            ${message.replace(/\n/g, "<br>")}
          </td>
        </tr>
      </table>

      <div style="margin-top: 25px; text-align: center;">
        <a href="mailto:${email}" style="
          display: inline-block;
          padding: 12px 24px;
          background: #0ea5e9;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          box-shadow: 0 3px 10px rgba(14, 165, 233, 0.3);
        ">
          Reply to User
        </a>
      </div>

    </div>

    <p style="text-align: center; margin-top: 20px; color: #888; font-size: 13px;">
      © ${new Date().getFullYear()} Farebuzzer Travel Pvt. Ltd — Support Notification
    </p>

  </div>
`;


    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      reply_to: email,
      subject: `New Query from ${name}`,
      html: htmlContent,
      text: message,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({
      success: true,
      message: "Query sent successfully!",
      emailId: data.id,
    });

  } catch (err) {
    console.error("Query controller error:", err);
    return res.status(500).json({
      error: "Something went wrong",
      message: err.message,
    });
  }
}
