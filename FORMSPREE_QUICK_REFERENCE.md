# Formspree Quick Reference Card

## 🚀 Quick Setup Checklist

- [ ] Create form in Formspree dashboard
- [ ] Copy Form ID and update `components/ContactForm.tsx` (line 7)
- [ ] Set "From" address to `info@codecraftmd.com`
- [ ] Verify the email address
- [ ] Enable auto-response
- [ ] Test the form

---

## 📧 Email Configuration Settings

### From Address
```
info@codecraftmd.com
```
*Navigate to: Settings > Email > From Address*

### Reply-To
Already handled automatically via the `_replyto` hidden field in the form.

---

## 🤖 Auto-Response Settings

**Navigate to**: Settings > Autoresponse

### Recommended Settings:
- **Enable**: ✅ ON
- **Subject**: `Thank you for contacting Doctors Who Code`
- **Reply-to**: `info@codecraftmd.com`

### Template Variables You Can Use:
- `{{name}}` - Visitor's name
- `{{email}}` - Visitor's email
- `{{subject}}` - Form subject field
- `{{message}}` - Form message field
- `{{field:FIELDNAME}}` - Any custom field

### Sample Auto-Response:
```
Hi {{name}},

Thank you for contacting Doctors Who Code! I've received your message and will respond within 24-48 hours.

Your message:
Subject: {{subject}}
---
{{message}}
---

In the meantime:
• Read our blog: https://doctorswhocode.com/blog
• Connect on LinkedIn: https://linkedin.com/in/chukwumaonyeije

Best regards,
Dr. Chukwuma Onyeije
info@codecraftmd.com
```

---

## 🎨 After Submission Behavior

**Navigate to**: Settings > After Submission

### Option 1: Use Built-in Success Message (Current Setup) ✅
- **Redirect URL**: Leave blank
- The form shows a success message with checkmark

### Option 2: Custom Redirect (Optional)
- **Redirect URL**: `https://yourdomain.com/thank-you`
- Requires creating a `/app/thank-you/page.tsx`

---

## 🛡️ Spam Protection

**Navigate to**: Settings > Spam Filtering

### Recommended:
- ✅ Enable Formspree's built-in filtering
- ✅ Enable reCAPTCHA (optional but recommended)
- ✅ Rate limiting (automatic)

---

## 📬 Notification Settings

**Navigate to**: Settings > Email Notifications

### Where to receive submissions:
```
info@codecraftmd.com
[Add any additional email addresses]
```

### Notification Format:
- **Subject**: `New contact from {{name}}`
- **Include submission data**: ✅ Yes

---

## 🔧 Advanced Features

### Integrations
**Navigate to**: Integrations tab

Available integrations:
- Slack (get notifications)
- Google Sheets (log submissions)
- Mailchimp (add to mailing list)
- Zapier (connect to 1000+ apps)

### Custom Email Templates
**Navigate to**: Settings > Email Templates

For branded auto-response emails with your logo and styling.

---

## 🧪 Testing Your Form

1. Run dev server: `npm run dev`
2. Visit: `http://localhost:3000/contact`
3. Fill out form with your email
4. Submit and verify:
   - ✅ Form shows success message
   - ✅ You receive notification email
   - ✅ Auto-response arrives in your inbox
   - ✅ Email shows as from `info@codecraftmd.com`

---

## 📊 Form Analytics

**Navigate to**: Dashboard > Your Form

View:
- Total submissions
- Submission rate
- Recent submissions
- Spam blocked

---

## ⚙️ Environment Variables (Optional)

For additional security, you can store the Form ID in environment variables:

Create `.env.local`:
```env
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id_here
```

Update `components/ContactForm.tsx`:
```tsx
const [state, handleSubmit] = useForm(
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "YOUR_FORMSPREE_FORM_ID"
);
```

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Email not from info@codecraftmd.com | Verify email in Formspree settings |
| Auto-response not received | Check spam folder, verify enabled in settings |
| Form not submitting | Check Form ID, check browser console |
| Spam submissions | Enable reCAPTCHA |

---

## 📱 Form Fields Included

Your form includes:
- ✅ Name (required)
- ✅ Email (required)
- ✅ Subject (required)
- ✅ Message (required)
- 🔒 Hidden: `_replyto` (for direct replies)
- 🔒 Hidden: `_subject` (custom email subject)

---

## 💰 Pricing Reference

- **Free**: 50 submissions/month
- **Bronze**: $10/month - 1,000 submissions
- **Silver**: $20/month - 5,000 submissions
- **Gold**: $40/month - 10,000 submissions

Check current pricing: https://formspree.io/pricing

---

## 🔗 Useful Links

- **Formspree Dashboard**: https://formspree.io/forms
- **Documentation**: https://help.formspree.io/
- **API Reference**: https://formspree.io/docs
- **Status Page**: https://status.formspree.io/

---

## 📞 Support

- Email: support@formspree.io
- Docs: https://help.formspree.io/
- Twitter: @formspree

---

**Last Updated**: December 2025
**Project**: Doctors Who Code
**Form Location**: `/app/contact/page.tsx`
