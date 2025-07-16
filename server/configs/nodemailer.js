import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, body }) => {
  const response = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html: body,
  });
  return response;
};

export const getBookingConfirmationEmail = (booking) => {
  const showDate = new Date(booking.show.showDateTime).toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  const showTime = new Date(booking.show.showDateTime).toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  console.log(booking);

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Hi ${booking.user.name},</h2>
      <p>Your booking for <strong style="color: #F84565;">"${booking.show.movie.title}"</strong> is confirmed.</p>
      <p>
        <strong>Date:</strong> ${showDate}<br/>
        <strong>Time:</strong> ${showTime}
      </p>
      <p>Enjoy the show! 🎬</p>
      <p>Thanks for booking with us!</p>
      <hr style="margin: 20px 0;"/>
      <p style="color: gray;">– QuickShow Team</p>
    </div>
  `;
};

export default sendEmail;
