# Outlook Quick Parts Setup Guide

## 🎯 Goal
Set up 6 email templates in Outlook for instant responses to contact form submissions.

**Total Setup Time: 10 minutes**

---

## 📋 Step-by-Step Instructions

### **Step 1: Open Outlook Desktop**
- Launch Microsoft Outlook on your computer
- Make sure you're in the **Mail** view

---

### **Step 2: Create Your First Quick Part**

#### A. Create New Email
1. Click **New Email** button
2. Leave the subject blank
3. Leave "To:" blank

#### B. Paste Template
1. Open `EMAIL_RESPONSE_TEMPLATES.md`
2. Copy the **GENERAL INQUIRY** template (lines 51-69)
3. Paste into the email body

#### C. Save as Quick Part
1. **Select all the text** you just pasted (Ctrl+A)
2. Go to **Insert** tab in the ribbon
3. Click **Quick Parts** dropdown
4. Click **Save Selection to Quick Part Gallery**
5. In the dialog box:
   - **Name:** `Contact - General`
   - **Gallery:** Quick Parts
   - **Category:** General
   - **Description:** Template for general inquiries
   - **Save in:** Building Blocks.dotx
   - **Options:** Insert content only
6. Click **OK**
7. Close the draft email (don't save it)

---

### **Step 3: Repeat for All Templates**

Repeat Step 2 for each template:

| Template Name | Category Tag | Template Location |
|---------------|--------------|-------------------|
| `Contact - General` | `[GENERAL]` | Lines 51-69 |
| `Contact - Collaboration` | `[COLLABORATION]` | Lines 77-102 |
| `Contact - Technical` | `[TECHNICAL]` | Lines 110-130 |
| `Contact - Speaking` | `[SPEAKING]` | Lines 138-166 |
| `Contact - Consulting` | `[CONSULTING]` | Lines 174-201 |
| `Contact - Media` | `[MEDIA]` | Lines 209-245 |

---

### **Step 4: Test Your Quick Parts**

1. Open any email in your inbox
2. Click **Reply**
3. Go to **Insert** tab
4. Click **Quick Parts** dropdown
5. You should see all 6 templates listed!
6. Click one to insert it

---

## 🚀 Using Your Templates

### **When You Receive a Form Submission:**

#### **Option A: Manual Selection**
1. Click **Reply** on the notification email
2. Look at the subject line for the category tag (e.g., `[COLLABORATION]`)
3. Go to **Insert** tab → **Quick Parts**
4. Select matching template (e.g., `Contact - Collaboration`)
5. Customize `[Name]`, `[subject]`, and personalized sections
6. Click **Send**

**Time: ~30 seconds**

---

#### **Option B: Keyboard Shortcuts (Advanced)**

Set up Quick Steps for even faster responses:

1. Go to **Home** tab
2. In **Quick Steps** section, click dropdown → **New Quick Step**
3. Choose **Custom**
4. Configure:
   - **Name:** `Reply: General`
   - **Actions:**
     1. Click **Add Action** → **Reply**
     2. Click **Add Action** → **Show As** → Mark as Read
   - **Shortcut Key:** Ctrl+Shift+1
5. Click **Finish**

**Limitation:** Quick Steps can't insert Quick Parts automatically, so you'll still need to insert the template manually. But the shortcut opens the reply window instantly.

---

## 💡 Pro Tips

### **Organize Your Quick Parts**
Create categories for easy finding:
1. When saving Quick Part, set **Category** to:
   - "Contact Forms" (for all 6 templates)
   - Or separate by priority: "Priority", "Standard", etc.

### **Edit a Quick Part**
1. **Insert** tab → **Quick Parts** → **Building Blocks Organizer**
2. Find your template
3. Click **Edit Properties** or **Delete**

### **Backup Your Quick Parts**
Quick Parts are stored in:
```
C:\Users\[YourUsername]\AppData\Roaming\Microsoft\Document Building Blocks\
```
File: `Building Blocks.dotx`

**Tip:** Copy this file to OneDrive or backup location monthly

---

## 📱 Alternative: Outlook Web (Office 365)

If you use Outlook in a browser:

### **Use Signatures as Templates**

1. Click **Settings** (gear icon) → **View all Outlook settings**
2. Go to **Mail** → **Compose and reply**
3. Under **Email signature**, create 6 signatures:
   - `Template: General`
   - `Template: Collaboration`
   - `Template: Technical`
   - `Template: Speaking`
   - `Template: Consulting`
   - `Template: Media`
4. Paste each template into its signature

**To Use:**
1. Click **Reply**
2. Click **Insert signature** button (three dots)
3. Choose appropriate template
4. Customize and send

**Limitation:** Signatures are limited to 10KB of HTML, so keep templates concise.

---

## 🔄 Mobile Options

### **iOS (iPhone/iPad):**
Use **Text Replacement**:
1. Settings → General → Keyboard → Text Replacement
2. Add shortcuts:
   - Shortcut: `;general` → Paste template
   - Shortcut: `;collab` → Paste template
   - Etc.

### **Android:**
Use **Gboard**:
1. Settings → Languages & Input → Gboard → Text Correction → Personal Dictionary
2. Add shortcuts similar to iOS

**Limitation:** Mobile templates should be shorter versions of desktop templates.

---

## 📊 Tracking Response Times

### **Use Outlook Categories:**
After replying, categorize the email:

1. Right-click email → **Categorize**
2. Create categories:
   - 🟢 **General** (Green)
   - 🔵 **Collaboration** (Blue)
   - 🟡 **Technical** (Yellow)
   - 🟣 **Speaking** (Purple)
   - 🟠 **Consulting** (Orange)
   - 🔴 **Media** (Red)

### **Create Search Folders:**
1. Right-click **Search Folders**
2. **New Search Folder** → **Mail from specific people**
3. Configure to show all emails from Formspree

---

## 🆘 Troubleshooting

### **Quick Parts Not Showing Up**
- Restart Outlook
- Check if saved to correct location (Building Blocks.dotx)
- Verify you're in **Insert** tab, not **Home** tab

### **Can't Find Building Blocks Organizer**
- **Insert** tab → **Quick Parts** → **Building Blocks Organizer**
- If still missing, you may need to enable the Developer tab

### **Templates Look Wrong After Inserting**
- Quick Parts preserve formatting
- If pasting from Markdown, use "Keep Text Only" when pasting
- Or manually format after pasting

---

## ✅ Verification Checklist

After setup, verify:
- [ ] All 6 templates saved as Quick Parts
- [ ] Can access templates from Insert → Quick Parts
- [ ] Templates format correctly when inserted
- [ ] Tested inserting template in a reply
- [ ] Personalized placeholders ([Name], [subject]) are easy to find

---

## 🎉 You're Ready!

You now have a professional email response system that lets you reply to contact form submissions in 30-60 seconds!

**Next:** Test it by submitting a test form at `http://localhost:3000/contact`

---

**Last Updated:** December 2025  
**Supports:** Outlook 2016, 2019, 2021, Microsoft 365  
**Reference:** `EMAIL_RESPONSE_TEMPLATES.md`
