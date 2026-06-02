import nodemailer from 'nodemailer';

interface EmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Configure mail distribution systems using standard environmental variables
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.SMTP_PORT || '2525', 10),
    auth: {
        user: process.env.SMTP_USER || '', // Your secure SMTP username
        pass: process.env.SMTP_PASS || '', // Your secure SMTP password
    },
});

export const sendAdminNotificationEmail = async (data: EmailData): Promise<void> => {
    const mailOptions = {
        from: `"Platform Alerts" <noreply@denkinesh.com>`,
        to: process.env.ADMIN_ALERT_EMAIL || 'admin@denkinesh.com',
        subject: `🚨 New Contact Inquiry: ${data.subject}`,
        html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee;">
        <h2 style="color: #0284c7; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Inbound Lead Logged</h2>
        <p><strong>Sender Name:</strong> ${data.name}</p>
        <p><strong>Reply-To Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Subject Segment:</strong> ${data.subject}</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #0284c7;">
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="font-size: 11px; color: #999; margin-top: 25px;">Logged via Denkinesh Technologies automated pipeline core architecture.</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
};