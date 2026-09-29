import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, passengers, travelDate, numberOfDays, enquiryFrom } = body;

    // Server-side validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Name, Email, and Phone are required fields." },
        { status: 400 }
      );
    }

    // SMTP Credentials from environment variables
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.RECIPIENT_EMAIL || smtpUser;

    if (!smtpUser || !smtpPass) {
      console.warn("SMTP_USER or SMTP_PASS not defined in environment variables.");
      return NextResponse.json(
        {
          success: false,
          message: "SMTP is not configured yet. Please configure SMTP_USER and SMTP_PASS in your frontend/.env file.",
        },
        { status: 500 }
      );
    }

    // Create Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const pageSource = enquiryFrom || "General Travel Enquiry";
    const timestamp = new Date().toLocaleString("en-GB", { timeZone: "UTC" });

    // HTML Email Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Travel Enquiry</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #191e3b; }
          .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #191e3b 0%, #006ce4 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
          .header h2 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
          .header p { margin: 6px 0 0 0; font-size: 13px; color: #dbeafe; font-weight: 500; }
          .badge { display: inline-block; background: #fcd535; color: #191e3b; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 800; margin-top: 12px; text-transform: uppercase; }
          .body { padding: 24px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          .table th, .table td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .table th { background-color: #f8fafc; color: #64748b; font-weight: 700; width: 36%; }
          .table td { color: #0f172a; font-weight: 600; }
          .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; }
          .contact-link { color: #006ce4; text-decoration: none; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2>New Travel Enquiry Received</h2>
            <p>You have received a new booking enquiry from your website</p>
            <div class="badge">Source: ${pageSource}</div>
          </div>
          <div class="body">
            <table class="table">
              <tr>
                <th>Enquiry From Page</th>
                <td><strong style="color: #006ce4;">${pageSource}</strong></td>
              </tr>
              <tr>
                <th>Customer Name</th>
                <td>${name}</td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td><a href="mailto:${email}" class="contact-link">${email}</a></td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td><a href="tel:${phone}" class="contact-link">${phone}</a></td>
              </tr>
              <tr>
                <th>Passengers</th>
                <td>${passengers || "Not specified"}</td>
              </tr>
              <tr>
                <th>Travel Date</th>
                <td>${travelDate || "Not specified"}</td>
              </tr>
              <tr>
                <th>Number of Days</th>
                <td>${numberOfDays ? `${numberOfDays} Days` : "Not specified"}</td>
              </tr>
              <tr>
                <th>Submitted At</th>
                <td>${timestamp} UTC</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            <p>This automated email notification was sent from your Travel Platform Website.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send Mail
    await transporter.sendMail({
      from: `"Travel Website Enquiry" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New Enquiry [${pageSource}]: ${name}`,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry email sent successfully!",
    });
  } catch (error) {
    console.error("Error in SMTP email API route:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to send enquiry email.",
      },
      { status: 500 }
    );
  }
}
