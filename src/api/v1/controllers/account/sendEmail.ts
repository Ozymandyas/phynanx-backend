import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'gaetan.ruet@hec.edu', pass: '' },
})

const mailOptions = {
  from: 'gaetan.ruet@hec.edu',
  to: 'ga.ruet@gmail.com',
  subject: 'Sending',
  text: 'easy',
}

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})
