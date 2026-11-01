# Joseph Habati — Portfolio

## Activating the Contact Form (one-time setup)

The contact form uses [Formspree](https://formspree.io) — free, no backend needed.
Messages go straight to **abc@gmail.com**.

### Steps

1. Go to [https://formspree.io](https://formspree.io) and sign up with your email**abc@gmail.com**
2. Click **+ New Form**, give it any name (e.g. "Portfolio Contact")
3. Copy your form ID — it looks like `ujkgvbfs` (8 characters)
4. Open `index.html` and find this line (around the contact section):
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Replace `YOUR_FORM_ID` with your actual ID:
   ```html
   action="https://formspree.io/f/xeupwezabcdefghijklmn"
   ```
6. Save and deploy — the form is live.

Formspree free plan supports **50 submissions/month**, which is plenty for a portfolio.
