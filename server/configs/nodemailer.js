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
  try {
    const response = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      html: body,
    });
    return response;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};

export const getBookingConfirmationEmail = (booking) => {
  const showDate = new Date(booking.show.showDateTime).toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  const showTime = new Date(booking.show.showDateTime).toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
  });

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
      <p style="color: gray;">– SnapShow Team</p>
    </div>
  `;
};

export const getReminderEmailBody = (task) => {
  const showDate = new Date(task.showTime).toLocaleDateString('en-US', {
    timeZone: 'Asia/Kolkata',
  });

  const showTime = new Date(task.showTime).toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
  });

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hello ${task.userName},</h2>
      <p>This is a quick reminder that your movie:</p>
      <h3 style="color: #F84565;">"${task.movieTitle}"</h3>
      <p>
        is scheduled for <strong>${showDate}</strong> at
        <strong>${showTime}</strong>.
      </p>
      <p>
        It starts in approximately <strong>8 hours</strong>, make sure you're ready!
      </p>
      <br/>
      <p>Enjoy the show!</p>
      <hr style="margin: 20px 0;" />
      <p style="color: gray;">– SnapShow Team</p>
    </div>
  `;
};

export const getNewShowAnnouncementEmail = ({ userName, movieTitle }) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hi ${userName},</h2>
      <p>We've just added a new show to our library:</p>
      <h3 style="color: #F84565;">"${movieTitle}"</h3>
      <p>Visit our website to explore it now!</p>
      <br/>
      <p>Thanks,<br/>QuickShow Team</p>
    </div>
  `;
};

export default sendEmail;
