var express = require('express');
var body_parser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();

// *Sensitive data removed.

var transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "", // *Email
		pass: "" // *Pass
	}
});

var mailOptions = {
	from: '', // *From
	to: '', // *To
	subject: '',
	text: '',
}

app.use(body_parser.urlencoded({ extended: false }));

app.post('/submit', function(req, res){
	mailOptions.subject = req.body.name;
	mailOptions.text = [ req.body.email, req.body.message ].join('\n\n');
	transporter.sendMail(mailOptions, (error, info) => {
		if (error){
			return console.log(error);
		}
	})

	res.end();
});

app.listen(8080);

