import { User } from "./user.model";

export function send_verify_email(id: string , user: User){
    const verifyLink = `http://[::1]:3000/users/verify${id}`
    const VERIFY_HTML = `<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0;">
         <meta name="format-detection" content="telephone=no"/>
    
    
        <style>
    /* Reset styles */ 
    body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
    body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
    img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    #outlook a { padding: 0; }
    .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
    .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
    
    
    @media all and (min-width: 560px) {
        .container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
    }
    
    
    a, a:hover {
        color: #127DB3;
    }
    .footer a, .footer a:hover {
        color: #999999;
    }
    
         </style>
    
    
        <title>Get this responsive email template</title>
    
    </head>
    
    
    <body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
        background-color: #F0F0F0;
        color: #000000;"
        bgcolor="#F0F0F0"
        text="#000000">
    
    
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
        bgcolor="#F0F0F0">
    
    
    <table border="0" cellpadding="0" cellspacing="0" align="center"
        width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
        max-width: 560px;" class="wrapper">
    
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                padding-top: 20px;
                padding-bottom: 20px;">
    
                
                <div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
                color: #F0F0F0;" class="preheader">
                    
                
                <a target="_blank" style="text-decoration: none;"
                    href=""><img border="0" vspace="0" hspace="0"
                    src="https://raw.githubusercontent.com/konsav/email-templates/master/images/logo-black.png"
                    width="100" height="30"
                    alt="Logo" title="Logo" style="
                    color: #000000;
                    font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
    
            </td>
        </tr>
    
    
    </table>
    
    
    <table border="0" cellpadding="0" cellspacing="0" align="center"
        bgcolor="#FFFFFF"
        width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
        max-width: 560px;" class="container">
    
        
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
                padding-top: 25px;
                color: #000000;
                font-family: sans-serif;" class="header">
                    Merhaba  ${user.fullName}
            </td>
        </tr>
        
    
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
                padding-top: 5px;
                color: #000000;
                font-family: sans-serif;" class="subheader">
                    Şifrenizi değiştirmek için aşağıdaki butona tıklayabilirsiniz.
                     *Bu e-posta şifre değiştirme talebinize istinaden gönderilmiştir.
            </td>
        </tr>
    
        
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
                padding-top: 20px;" class="hero"><a target="_blank" style="text-decoration: none;"
                href=""><img border="0" vspace="0" hspace="0"
                src="https://icon-library.com/images/verified-icon-png/verified-icon-png-1.jpg"
                alt="Please enable images to view this content" title="Hero Image"
                width="300" style="
                width: 100%;
                max-width: 200px;
                color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"/></a></td>
        </tr>
    
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                padding-top: 25px; 
                color: #000000;
                font-family: sans-serif;" class="paragraph">
            </td>
        </tr>
    
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                padding-top: 25px;
                padding-bottom: 5px;" class="button"><a
                href="" target="_blank" style="text-decoration: underline;">
                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;"><tr><td align="center" valign="middle" style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
                        color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 120%;"
                        href=\`${verifyLink}\`>
                            Doğrula
                        </a>
                </td></tr></table></a>
            </td>
        </tr>
    
        <tr>	
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                padding-top: 25px;" class="line"><hr
                color="#E0E0E0" align="center" width="100%" size="1" noshade style="margin: 0; padding: 0;" />
            </td>
        </tr>
    
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%;" class="list-item"><table align="center" border="0" cellspacing="0" cellpadding="0" style="width: inherit; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;">
                
                
            </table></td>
        </tr>
    
        
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
                padding-top: 20px;
                padding-bottom: 25px;
                color: #000000;
                font-family: sans-serif;" class="paragraph">
                    Send By&nbsp;İsmail Akça <a href="mailto:info@packupp.com" target="_blank" style="color: #127DB3; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 160%;"></a>
            </td>
        </tr>
    
    
    </table>
    
    
    <table border="0" cellpadding="0" cellspacing="0" align="center"
        width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
        max-width: 560px;" class="wrapper">
    
        
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
                padding-top: 25px;" class="social-icons"><table
                width="256" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse: collapse; border-spacing: 0; padding: 0;">
                <tr>
    
                    
                    <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                        href=""
                    style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                        color: #000000;"
                        alt="F" title="Facebook"
                        width="44" height="44"
                        src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/facebook.png"></a></td>
    
                
                    <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                        href=""
                    style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                        color: #000000;"
                        alt="T" title="Twitter"
                        width="44" height="44"
                        src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/twitter.png"></a></td>				
    
                    
                    <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                        href=""
                    style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                        color: #000000;"
                        alt="G" title="Google Plus"
                        width="44" height="44"
                        src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/googleplus.png"></a></td>		
    
                    
                    <td align="center" valign="middle" style="margin: 0; padding: 0; padding-left: 10px; padding-right: 10px; border-collapse: collapse; border-spacing: 0;"><a target="_blank"
                        href=""
                    style="text-decoration: none;"><img border="0" vspace="0" hspace="0" style="padding: 0; margin: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: inline-block;
                        color: #000000;"
                        alt="I" title="Instagram"
                        width="44" height="44"
                        src="https://raw.githubusercontent.com/konsav/email-templates/master/images/social-icons/instagram.png"></a></td>
    
                </tr>
                </table>
            </td>
        </tr>
    
        
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 13px; font-weight: 400; line-height: 150%;
                padding-top: 20px;
                padding-bottom: 20px;
                color: #999999;
                font-family: sans-serif;" class="footer">
    
                    This email template was sent to&nbsp;you becouse we&nbsp;want to&nbsp;make the&nbsp;world a&nbsp;better place. You&nbsp;could change your <a href="https://github.com/konsav/email-templates/" target="_blank" style="text-decoration: underline; color: #999999; font-family: sans-serif; font-size: 13px; font-weight: 400; line-height: 150%;">subscription settings</a> anytime.
    
                    
                    <img width="1" height="1" border="0" vspace="0" hspace="0" style="margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;"
                    src="https://raw.githubusercontent.com/konsav/email-templates/master/images/tracker.png" />
    
            </td>
        </tr>
    
    
    </table>
    
    
    </td></tr></table>
    
    </body>
    </html>`
    return VERIFY_HTML
}