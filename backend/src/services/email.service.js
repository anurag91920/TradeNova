import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  initialize() {
    try {
      // Only create transporter if email config exists
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        logger.warn('⚠️ Email service disabled: SMTP credentials not configured');
        return;
      }

      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      // Verify connection
      this.transporter.verify((error) => {
        if (error) {
          logger.warn('⚠️ Email service verification failed:', error.message);
          this.transporter = null;
        } else {
          logger.info('✅ Email service ready');
        }
      });
    } catch (error) {
      logger.warn('⚠️ Email service initialization failed:', error.message);
      this.transporter = null;
    }
  }

  async sendEmail({ to, subject, html, text }) {
    if (!this.transporter) {
      logger.warn(`📧 Email not sent (service disabled): ${subject} → ${to}`);
      return { messageId: 'disabled', disabled: true };
    }

    try {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
        text: text || html
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`📧 Email sent to ${to}: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error('Email send error:', error.message);
      // Don't throw - just log. Email is non-critical.
      return { error: error.message, failed: true };
    }
  }

  async sendWelcomeEmail(user) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Welcome to TradeNova! 🚀</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>Hi <strong>${user.fullName || user.username}</strong>,</p>
          <p>Thank you for registering with TradeNova. Your account has been created successfully.</p>
          <p>You can now start trading cryptocurrencies with our platform.</p>
          <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Your Account:</strong></p>
            <p style="margin: 5px 0;">Email: ${user.email}</p>
            <p style="margin: 5px 0;">Username: ${user.username}</p>
          </div>
          <p>Best regards,<br>TradeNova Team</p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to: user.email,
      subject: 'Welcome to TradeNova',
      html
    });
  }

  async sendTradeConfirmation(trade, user) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6366f1;">Trade Confirmation</h1>
        <p>Hi ${user.fullName || user.username},</p>
        <p>Your trade has been executed successfully.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Symbol</strong></td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${trade.symbol}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Type</strong></td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${trade.type}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Quantity</strong></td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">${trade.quantity}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Price</strong></td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">$${trade.price}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Total</strong></td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">$${trade.total}</td>
          </tr>
        </table>
        <p>Thank you for trading with TradeNova!</p>
      </div>
    `;

    return this.sendEmail({
      to: user.email,
      subject: `Trade Confirmation - ${trade.symbol}`,
      html
    });
  }

  async sendPasswordReset(user, resetToken) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6366f1;">Password Reset Request</h1>
        <p>Hi ${user.fullName || user.username},</p>
        <p>You requested to reset your password. Click the button below to proceed:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
        </div>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `;

    return this.sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html
    });
  }
}

export const emailService = new EmailService();
export default emailService;