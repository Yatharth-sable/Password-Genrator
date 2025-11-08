export const ResetTemplate = (url) => {
    return `<!DOCTYPE html>
<html lang="en" style="font-family: Arial, sans-serif; background-color: #f5f6fa; margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f6fa;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin: 40px auto;">
      <tr>
        <td style="background-color: #1f1f1f; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px;">Password Reset Request</h1>
        </td>
      </tr>

      <tr>
        <td style="padding: 30px; color: #333;">
          <p style="font-size: 16px;">Hi,</p>
          <p style="font-size: 15px; line-height: 1.6;">
            We received a request to reset your password. Click the button below to set a new password:
          </p>

          <p style="text-align: center; margin: 30px 0;">
            <a href=${url} style="background-color: #ff6a00; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Reset Password
            </a>
          </p>

          <p style="font-size: 14px; color: #555;">
            If you didn’t request this, you can safely ignore this email. Your password will remain unchanged.
          </p>

          <p style="margin-top: 30px; font-size: 13px; color: #777;">
            Thanks,<br />
            The Support Team
          </p>
        </td>
      </tr>

      <tr>
        <td style="background-color: #1f1f1f; color: #ccc; padding: 15px; text-align: center; font-size: 12px;">
          © {{currentYear}} YourAppName. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>
`
}