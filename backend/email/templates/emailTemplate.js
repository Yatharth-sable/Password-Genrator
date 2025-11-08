export const otpTemplate = (otp) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PassOp OTP Email Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .otp-code {
            letter-spacing: 0.5em; /* Spreads out the numbers */
        }
    </style>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">

    <!-- Main container for the email preview -->
    <div class="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- Email client header simulation -->
            <div class="bg-gray-50 p-4 border-b border-gray-200">
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div class="mt-4 text-sm text-gray-600">
                    <p><span class="font-semibold text-gray-800">From:</span> PassOp Team &lt;noreply@passop.com&gt;</p>
                    <p><span class="font-semibold text-gray-800">To:</span> user@example.com</p>
                    <p><span class="font-semibold text-gray-800">Subject:</span> Your PassOp One-Time Password</p>
                </div>
            </div>

            <!-- Actual Email Content -->
            <div class="p-6 sm:p-10 text-gray-700 leading-relaxed">
                <!-- Header/Logo -->
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-gray-900">PassOp</h1>
                </div>

                <!-- OTP Message -->
                <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Your One-Time Password</h2>
                <p class="mb-6 text-center">
                    Please use the following code to complete your action.
                </p>

                <!-- OTP Code -->
                <div class="text-center my-8">
                    <div class="inline-block bg-gray-100 text-gray-900 font-bold text-4xl py-4 px-8 rounded-lg shadow-inner otp-code">
                        ${otp}
                    </div>
                </div>

                <!-- Expiration and Security Info -->
                <p class="text-center text-sm text-gray-500 mb-6">
                    This code is valid for the next 10 minutes.
                </p>
                <p class="text-center text-sm text-gray-500">
                    If you did not request this code, please ignore this email or contact our support team immediately.
                </p>

                <!-- Footer -->
                <div class="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p class="mb-2">If you have any questions, feel free to contact our support team.</p>
                    <p>&copy; 2024 PassOp. All rights reserved.</p>
                    <p class="mt-1">123 Security Lane, Web City, TX 75001</p>
                </div>
            </div>
        </div>
    </div>

</body>
</html>

`
}
