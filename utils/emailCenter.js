const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false,
		secureConnection: false,
		// ignoreTLS: true,
		auth: {
			user: process.env.SMTP_EMAIL,
			pass: process.env.SMTP_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
			server: 'smtp.office365.com',
		},
	});

	const message = {
		from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
		to: options.email,
		subject: options.subject,
		html: options.message,
	};

	// verify connection configuration
	transporter.verify(function (error, success) {
		if (error) {
			console.log('This is error:', error);
		} else {
			console.log('Server is ready to take our messages');
		}
	});

	const info = await transporter.sendMail(message);
	console.log(info);
	return info;
};

module.exports = sendEmail;
