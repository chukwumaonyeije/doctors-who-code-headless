# Formspree Contact Form Setup Guide

## Overview
Your contact form is now integrated with Formspree. Follow these steps to complete the setup.

## Step 1: Create a Form in Formspree

1. Log in to your Formspree account at https://formspree.io
2. Click **"+ New Form"**
3. Give your form a name (e.g., "Doctors Who Code Contact Form")
4. Copy the **Form ID** (it looks like `xyzabc123`)

## Step 2: Update the Form ID in Your Code

Open `components/ContactForm.tsx` and replace `YOUR_FORMSPREE_FORM_ID` with your actual Form ID:

```tsx
const [state, handleSubmit] = useForm("YOUR_ACTUAL_FORM_ID_HERE");
```

## Step 3: Configure Email Settings in Formspree

### Setting the "From" Email (info@codecraftmd.com)

1. In your Formspree dashboard, go to your form's **Settings**
2. Click on **"Email"** tab
3. Under **"From Address"**, enter: `info@codecraftmd.com`
4. You'll need to verify this email address by clicking the verification link Formspree sends

**Note**: For custom domain emails, you may need to:
- Add Formspree to your email domain's SPF record
- Or use Formspree's email forwarding feature
- Check Formspree's documentation for specific requirements

### Setting Up Auto-Responses

1. In your form's settings, click **"Autoresponse"** tab
2. Toggle **"Enable autoresponse"** to ON
3. Configure your auto-response:
   - **Subject**: e.g., "Thank you for contacting Doctors Who Code"
   - **Reply-to**: `info@codecraftmd.com`
   - **Message**: Customize with your preferred confirmation message

**Example Auto-Response Template**:
```
Hi {{name}},

Thank you for reaching out! I've received your message and will get back to you within 24-48 hours.

In the meantime, feel free to:
- Check out my latest blog posts: https://doctorswhocode.com/blog
- Connect with me on LinkedIn: https://www.linkedin.com/in/chukwumaonyeije/
- Learn more about CodeCraftMD: https://codecraftmd.com

Best regards,
Dr. Chukwuma Onyeije
Founder, Doctors Who Code

---
This is an automated response. Your original message:
{{field:message}}
```

## Step 4: Configure Submission Settings

### Custom Thank You Page (Optional)
In the **"Settings"** > **"After Submission"** section:
- **Redirect**: Leave blank to use the built-in success message
- Or enter a custom URL if you want to redirect users

### Spam Protection
1. Go to **"Settings"** > **"Spam Filtering"**
2. Enable **reCAPTCHA** (recommended) or use Formspree's built-in spam filtering

## Step 5: Configure Notification Settings

1. Go to **"Settings"** > **"Email Notifications"**
2. Add email addresses where you want to receive notifications
3. Customize the notification email format

## Step 6: Test Your Form

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/contact`
3. Fill out and submit the form
4. Check:
   - You receive the submission notification
   - The visitor receives the auto-response email
   - The success message displays correctly

## Additional Features

### Custom Email Templates
Formspree supports custom HTML email templates:
1. Go to **"Settings"** > **"Email Templates"**
2. Choose **"Custom HTML"**
3. Design your branded email template

### Integration with Other Tools
Formspree can integrate with:
- Slack
- Google Sheets
- Mailchimp
- Zapier
- And more...

Check the **"Integrations"** tab in your form settings.

## Troubleshooting

### Email Not Sending from info@codecraftmd.com
- Verify the email address in Formspree
- Check your domain's email configuration
- Consider using Formspree's email forwarding if direct sending isn't working

### Auto-Response Not Received
- Check spam folder
- Verify auto-response is enabled in settings
- Test with a different email address

### Form Not Submitting
- Check browser console for errors
- Verify Form ID is correct
- Check Formspree dashboard for submission logs

## Security Considerations

- Formspree handles spam filtering automatically
- All form submissions are over HTTPS
- Consider adding reCAPTCHA for extra protection
- Rate limiting is built-in to prevent abuse

## Pricing Notes

- **Free Plan**: 50 submissions/month
- **Paid Plans**: Start at $10/month for 1,000 submissions
- Check https://formspree.io/pricing for current pricing

---

## Summary of Hidden Fields Already Configured

Your form includes these hidden fields for better email handling:

1. **`_replyto`**: Automatically sets the reply-to address to the visitor's email
2. **`_subject`**: Customizes the email subject with visitor name and subject line

These ensure you can reply directly to form submissions and identify them easily in your inbox.

---

Need help? Check Formspree docs: https://help.formspree.io/
