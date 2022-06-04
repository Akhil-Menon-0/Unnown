const express = require('express');
const router = express.Router();
const Post = require('../../models/postmodel');

router.post('/post_add', upload.single('pgImage'), async (req, res) => {
  const {
    sellerId,
    sellerName,
    description,
    price,
    priceDuration,
    pgName,
    city,
    district,
    address,
    offers,
    contact
  } = req.body;

  try {
    tinify.key = '2y2SHMhp1Mb7LsM7HvSBKykzTBL3zKbJ';

    destination = 'uploads/pg_pics/' + req.file.filename;
    let source = tinify.fromFile(req.file.path);

    // console.log(source);
    // console.log(req.file.path);
    source.toFile(destination);
    // console.log('Filename : ' + req.file.filename);
    const newPG = new PG({
      sellerId,
      sellerName,
      pgImage: req.file.path,
      pgName,
      district,
      city,
      description,
      price,
      priceDuration,
      address,
      offers,
      contact: contact
    });
    await newPG.save();

    let user = await User.findById(sellerId);
    user.pgs_owned.push(newPG._id);
    await user.save();

    if (user.notificationKey) {
      webpush.setVapidDetails(
        'mailto:ritviknagpal48@gmail.com',
        'BHU9LF2ji9Dw9OGo4GZKgvEQyAT4_Hx6V2RrdxT6jJ65hOTwP360mYN452JoCjmlzrRuqcm2tq_u-CCKJtDd7cs',
        'DMKyTNMX0g8S7gvXvXcdNam8odC_Eu0ofLclV0kmYt8'
      );

      var pushConfig = {
        endpoint: user.notificationKey.endpoint,
        keys: {
          auth: user.notificationKey.keys.auth,
          p256dh: user.notificationKey.keys.p256dh
        }
      };

      webpush.sendNotification(
        pushConfig,
        JSON.stringify({
          title: 'New PG Successfully Added',
          content:
            'Your New PG, ' + newPG.pgName + ' has been successfully added',
          openUrl: 'https://yehlo.company/description_pg/' + newPG._id,
          image: newPG.pgImage
        })
      );
    }

    const output = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="x-ua-compatible" content="ie=edge" />
            <title>New PG Added</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
              rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
              integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
              crossorigin="anonymous"
            />
        
            <style type="text/css"></style>
          </head>
          <body style="background-image: url('bg.jpg')">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 600px;"
                  >
                    <tr>
                      <td
                        align="left"
                        style="padding: 0px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; "
                      >
                        <h1
                          style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; color:  #3C4E62; line-height: 48px; text-align: center"
                        >
                          New PG Successfully Added
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
        
              <tr>
                <td align="center">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="max-width: 600px;"
                  >
                    <tr>
                      <td
                        align="left"
                        style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"
                      >
                        <p class="text-center" style="margin: 0; color:  #3C4E62">
                          Hi ${user.userName}, Your new PG, ${newPG.pgName} has been
                          successfully added !
                        </p>
                        <p class="text-center" style="margin: 0; color:  #3C4E62">
                          Click on the button below to visit <i>My Entries</i> page in your Dashboard.
                        </p>
                      </td>
                    </tr>
        
                    <tr>
                      <td align="left">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td align="center" style="padding: 12px;">
                              <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td
                                    align="center"
                                    bgcolor="#1a82e2"
                                    style="border-radius: 6px;"
                                  >
                                    <a
                                      href="https://yehlo.company/my_entries"
                                      target="_blank"
                                      style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; background-color: #4FAC2D; text-decoration: none; border-radius: 6px;"
                                      >My Entries</a
                                    >
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
  
                    <tr>
                    <td align="center">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px;"
                      >
                        <tr>
                          <td
                            align="left"
                            style="padding: 0px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; "
                          >
                            <h3
                              style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -1px; color:  #3C4E62; line-height: 48px; text-align: center"
                            >
                              Have Any Questions?
                            </h3>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
      
                  <tr>
                    <td
                      align="left"
                      style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"
                    >
                      <p class="text-center" style="margin: 0; color:  #3C4E62">
                        Team Yehlo is always there for all your queries. Click on the
                        button below to directly visit our
                        <span style="font-style: italic">Contact Us</span> page to go
                        through a very easy Customer Support procedure, or you can
                        directly mail us at
                        <span style="font-style: italic"
                          >yehlo.company@gmail.com</span
                        >
                      </p>
                    </td>
                  </tr>
      
                  <tr>
                    <td align="left">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td
                                  align="center"
                                  bgcolor="#1a82e2"
                                  style="border-radius: 6px;"
                                >
                                  <a
                                    href="https://yehlo.company/contact_us"
                                    target="_blank"
                                    style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; background-color: #4E838D; text-decoration: none; border-radius: 6px;"
                                    >Contact Us</a
                                  >
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px;"
                      >
                        <tr>
                          <td
                            align="left"
                            style="padding: 0px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; "
                          >
                            <h3
                              style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -1px; color:  #3C4E62; line-height: 48px; text-align: center"
                            >
                              Have an Idea?
                            </h3>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
      
                  <tr>
                    <td
                      align="left"
                      style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"
                    >
                      <p class="text-center" style="margin: 0; color:  #3C4E62">
                        Team Yehlo always welcome bright ideas from interested
                        individuals. Click on the button below to directly submit an
                        idea.
                      </p>
                    </td>
                  </tr>
      
                  <tr>
                    <td align="left">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td
                                  align="center"
                                  bgcolor="#1a82e2"
                                  style="border-radius: 6px;"
                                >
                                  <a
                                    href="https://yehlo.company/contact_us"
                                    target="_blank"
                                    style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; background-color: #856421; text-decoration: none; border-radius: 6px;"
                                    >Submit an Idea</a
                                  >
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
        
                    <tr>
                      <td
                        align="left"
                        style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"
                      >
                        <p class="" style="margin: 0; color:  #3C4E62">
                          Cheers,
                        </p>
                        <p class="" style="margin: 0; color:  #3C4E62">
                          Team Yehlo
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>        
      `;

    let transporter = nodemailer.createTransport({
      // host: 'mail.google.com',
      // port: 587,
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'yehlo.company@gmail.com',
        clientId:
          '344922640035-vhtd4emju9jn59gh1jfg8m3scclmldtn.apps.googleusercontent.com',
        clientSecret: 'Sl6_Jk_3Tjx0p8nxJL59q8yp',
        refreshToken:
          '1//04CEnwJFC7URHCgYIARAAGAQSNwF-L9Ir7iG4UTgWSxcon8CgFrRBWxE7kTSkgpGSlYRqs9CacaowmNsaZje4IbTF9aHYqcP5W6o',
        accessToken: accessToken
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Team YehLo" <yehlo.company@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: 'New PG Successfully Added', // Subject line
      text: 'Your New PG, ' + newPG.pgName + ' has been successfully added !', // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return; // // console.log(error);
      }
      // // console.log('Message sent: %s', info.messageId);
      // // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    res.status(200).json({
      message: 'PG successfully created',
      PG: newPG
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Unable to add PG!!!' });
  }
});

module.exports = router;
