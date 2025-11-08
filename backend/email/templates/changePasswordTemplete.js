export const passwordChange = (email, firstName, lastName) => {
  return `<!DOCTYPE html>
<html lang="en" style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0;">
  <head>
    <meta charset="UTF-8" />
    <title>Password Changed Successfully</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 30px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <tr>
              <td style="background-color: #ff7b00; color: #ffffff; text-align: center; padding: 20px 0;">
                <h2 style="margin: 0; font-size: 24px;">🔐 Password Changed Successfully</h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <p style="font-size: 16px; color: #333333;">
                  Hi <strong>${firstName} ${lastName}</strong>,
                </p>

                <p style="font-size: 15px; color: #555555; line-height: 1.6;">
                  This is a confirmation that the password for your account 
                  <strong>${email}</strong> has been successfully changed.
                </p>

                <p style="font-size: 15px; color: #555555; line-height: 1.6;">
                  If you did not make this change, please reset your password immediately or contact our support team.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://yourwebsite.com/login"
                    style="background-color: #ff7b00; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: bold;">
                    Go to Login
                  </a>
                </div>

                <p style="font-size: 14px; color: #888888; text-align: center;">
                  — The PassOp Security Team
                </p>
              </td>
            </tr>
          </table>

          <p style="font-size: 12px; color: #999999; margin-top: 15px;">
            If you didn’t request this password change, please ignore this message or contact support.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
