const mailer = require('nodemailer');
const dash_button = require('node-dash-button');
const dash = dash_button(["34:d2:70:6f:e5:c0","ac:63:be:9a:29:3d"], null, null, 'all');

dash.on("detected", function (dash_id){
    if(dash_id == "34:d2:70:6f:e5:c0") {
        send("Kyukyutto");
    } else if(dash_id == "ac:63:be:9a:29:3d") {
        send("Elleair");
    }
});

function send(button_name) {

    const smtpConfig = {
        service: "Gmail",
        auth: {
            user: 'YOUR MAIL ACCOUNT',
            pass: 'PASSWORD'
        }
    };
    const mailOptions = {
        from: 'DASHBUTTON <'+smtpConfig.auth.user+'>',
        to: 'NOTIFICATION TARGET ADDRESS',
        subject: 'Emergency call was pressed [' + button_name + ']',
        html: '<p>The following buttons were pressed.</p><h2>'+button_name+'</h2>'
    };

    const smtp = mailer.createTransport(smtpConfig);

    smtp.sendMail(mailOptions, function(err, res){
        if(err){
            console.log(err);
        }else{
            console.log('Message sent: ' + button_name);
        }
        smtp.close();
    });
}

send("TEST");

