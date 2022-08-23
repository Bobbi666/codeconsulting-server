const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
const sendEmail = require('./utils/emailCenter');

app.use(cors());

app.listen(PORT, () => console.log('server is up and runnig at PORT :' + PORT));

app.get('/test', (req, res) => {
	res.send('up and running');
});

app.post('/sendemail', async (req, res) => {
	const { name, message, email, phone } = req.body;

	console.log(req.body);

	let htmlMessage = `  <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>New Contact on Website</title>
    
            <style>
                main {
                    width: 800px;
                    margin: 0 auto;
                    padding: 15px;
                    border: 1px solid black;
                    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    
                    margin-top: 200px;
                }
                strong {
                    color: blue;
                }
            </style>
        </head>
        <body style="margin: 0 auto">
            <main>
                <h2>Hi Oskar</h2>
                <p>Following is the new Contact on the website</p>
    
                <div class="contact-details">
                    <h3>Name: <strong>${name}</strong></h3>
                    <h3>
                        Email:
                        <strong
                            ><a href="mailto:alib4111@gmail.com">${email}</a></strong
                        >
                    </h3>
                    <h3>Phone: <strong>${phone}</strong></h3>
    
                    <div class="message">
                        <h3>Message</h3>
                        <p>
                            ${message}
                        </p>
                    </div>
                </div>
            </main>
        </body>
    </html> `;

	const options = {
		email: 'Oskar.johansson@codeconsulting.se',
		subject: 'test',
		message: htmlMessage,
	};

	const response = await sendEmail(options);

	res.status(200).json({
		success: true,
		messageId: response.messageId,
	});
});
