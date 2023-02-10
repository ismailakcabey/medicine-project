import { Injectable  } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./user.dto";
import { Role } from "./user.enum";
import { User } from "./user.model";
const sgMail = require('@sendgrid/mail')
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
@Injectable()
export class UserService {
    constructor(
        @InjectModel('MedicineUser') private readonly user: Model<User>
    ){}
    
    async insertUser(users: UserDto){
        const addUser = new this.user(users);
        const mailControlUser = await this.user.findOne({mail: addUser?.mail})
        const phoneControlUser = await this.user.findOne({phoneNumber: addUser?.phoneNumber})
        const identitiyControlUser = await this.user.findOne({phoneNumber: addUser?.identityId})
        if(phoneControlUser){
            return {
                status: false,
                message:"this user is already phone number"
            }
        }
        if(mailControlUser){
            return {
                status: false,
                message:"this user is already mail address"
            }
        }
        if(identitiyControlUser){
            return {
                status: false,
                message:"this user is already identitiy id"
            }
        }
        const result = await addUser.save()
        console.log("kullanıcı oluşturuldu")
        let email = await this.sendUserVerifyMail(result?.id as string,addUser)
        console.log("mail yollandı"+email)
        return{
            status: true,
            message: "user successfully created",
            userId:result?.id as string,
        }
    }

    async getAllUser(userDto):Promise<{
        status: boolean,
        data: User[],
        count: number
    }>{
        console.log(userDto)
        console.log("DENEME")
        const users = await this.user.find(userDto).limit(userDto?.limit)
        const usersCount = await this.user.count(userDto)
        return {
            status: true,
            count: usersCount,
            data: users
        }
    }

    async getUserById(id):Promise<{
        status: boolean,
        data: User,
        message: string
    }>{
        const users = await this.user.findById(id)
        return {
            status: true,
            message:"success",
            data: users,
        }
    }

    async updateUserById(id , update):Promise<{
        status: boolean,
        message: string,
    }>{
        const mailControlUser = await this.user.findOne({mail: update?.mail})
        const phoneControlUser = await this.user.findOne({phoneNumber: update?.phoneNumber})
        const identitiyControlUser = await this.user.findOne({phoneNumber: update?.identityId})
        update.updatedDate = Date.now()
        if(update.id){
            return {
                status: false,
                message:"id is not updated",
            }
        }
        if(phoneControlUser){
            return {
                status: false,
                message:"this user is already phone number",
            }
        }
        if(mailControlUser){
            return {
                status: false,
                message:"this user is already mail address"
            }
        }
        if(identitiyControlUser){
            return {
                status: false,
                message:"this user is already identitiy id"
            }
        }
        const updateUser = await this.user.findByIdAndUpdate(id, update)
        return {
            status: true,
            message: "updated user successfully",
        }
    }

    async verifyUserById(id):Promise<boolean>{
        const verifyUser = await this.user.findByIdAndUpdate(id,{isMail:true})
        if(verifyUser){
            return true
        }
        else{
            return false
        }
    }

    async sendUserVerifyMail(id,user:User){
        dotenv.config({debug: true});
        let email = process.env.MAIL_JET_SEND_EMAIL
        console.log(email)
        const Mailjet = require('node-mailjet');
const mailjet = new Mailjet({
    apiKey: process.env.MAIL_JET_API_KEY,
    apiSecret: process.env.MAIL_JET_API_SECRET_KEY
  });
const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: email,
                Name: "ECZANE SEPETI"
              },
              To: [
                {
                  Email: user.mail,
                  Name: user.fullName
                }
              ],
              Subject: "Email Doğrulama",
              TextPart: "Mailde yer alan butondan email adresinizi doğrulayabilirsiniz",
              HTMLPart: `<!DOCTYPE html>
              <html>
              <head>
              
                <meta charset="utf-8">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <title>Email Confirmation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                /**
                 * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
                 */
                @media screen {
                  @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                  }
              
                  @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                  }
                }
              
                /**
                 * Avoid browser level font resizing.
                 * 1. Windows Mobile
                 * 2. iOS / OSX
                 */
                body,
                table,
                td,
                a {
                  -ms-text-size-adjust: 100%; /* 1 */
                  -webkit-text-size-adjust: 100%; /* 2 */
                }
              
                /**
                 * Remove extra space added to tables and cells in Outlook.
                 */
                table,
                td {
                  mso-table-rspace: 0pt;
                  mso-table-lspace: 0pt;
                }
              
                /**
                 * Better fluid images in Internet Explorer.
                 */
                img {
                  -ms-interpolation-mode: bicubic;
                }
              
                /**
                 * Remove blue links for iOS devices.
                 */
                a[x-apple-data-detectors] {
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  color: inherit !important;
                  text-decoration: none !important;
                }
              
                /**
                 * Fix centering issues in Android 4.4.
                 */
                div[style*="margin: 16px 0;"] {
                  margin: 0 !important;
                }
              
                body {
                  width: 100% !important;
                  height: 100% !important;
                  padding: 0 !important;
                  margin: 0 !important;
                }
              
                /**
                 * Collapse table borders to avoid space between cells.
                 */
                table {
                  border-collapse: collapse !important;
                }
              
                a {
                  color: #1a82e2;
                }
              
                img {
                  height: auto;
                  line-height: 100%;
                  text-decoration: none;
                  border: 0;
                  outline: none;
                }
                </style>
              
              </head>
              <body style="background-color: #e9ecef;">
              
                <!-- start preheader -->
                <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                  A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
                </div>
                <!-- end preheader -->
              
                <!-- start body -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
              
                  <!-- start logo -->
                  <tr>
                    <td align="center" bgcolor="#e9ecef">
                      <!--[if (gte mso 9)|(IE)]>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                      <tr>
                      <td align="center" valign="top" width="600">
                      <![endif]-->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                          <td align="center" valign="top" style="padding: 36px 24px;">
                            <a href="https://sendgrid.com" target="_blank" style="display: inline-block;">
                              <img src="https://madicanacdnstorage.blob.core.windows.net/main/Assets/photo/r/kalp-ve-damar-cerrahisi-53326_b.jpg" alt="Logo" border="0" width="150" style="display: block; width: 150px; max-width: 150px; min-width: 150px;">
                            </a>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                      </td>
                      </tr>
                      </table>
                      <![endif]-->
                    </td>
                  </tr>
                  <!-- end logo -->
              
                  <!-- start hero -->
                  <tr>
                    <td align="center" bgcolor="#e9ecef">
                      <!--[if (gte mso 9)|(IE)]>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                      <tr>
                      <td align="center" valign="top" width="600">
                      <![endif]-->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                          <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">${user.fullName} , Email adresini doğrulaman gerekmektedir .</h1>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                      </td>
                      </tr>
                      </table>
                      <![endif]-->
                    </td>
                  </tr>
                  <!-- end hero -->
              
                  <!-- start copy block -->
                  <tr>
                    <td align="center" bgcolor="#e9ecef">
                      <!--[if (gte mso 9)|(IE)]>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                      <tr>
                      <td align="center" valign="top" width="600">
                      <![endif]-->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              
                        <!-- start copy -->
                        <tr>
                          <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Selam aramıza hoşgeldin sağlıklı günler dileriz</p>
                          </td>
                        </tr>
                        <!-- end copy -->
              
                        <!-- start button -->
                        <tr>
                          <td align="left" bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                        <a href="http://localhost:3000/users/verify/${id}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Doğrula</a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- end button -->
              
                        <!-- start copy -->
                        
                        <!-- end copy -->
              
                        <!-- start copy -->
                        
                        <!-- end copy -->
              
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                      </td>
                      </tr>
                      </table>
                      <![endif]-->
                    </td>
                  </tr>
                  <!-- end copy block -->
              
                  <!-- start footer -->
                 
                  <!-- end footer -->
              
                </table>
                <!-- end body -->
              
              </body>
              </html>`
            }
          ]
        })
request
    .then((result) => {
        console.log(result.body)
        console.log(result.body.Messages[0])
    })
    .catch((err) => {
        console.log(err.statusCode)

    })
    }

    async delUserById(id):Promise<{
        status: boolean,
        message: string,
    }>{
        const users = await this.user.findByIdAndDelete(id)
        return {
            status: true,
            message: "deleted user successfully"
        }
    }

}