# GTM import — VINVARO

Container: **GTM-NWSKQ88T**  
GA4 stream: **G-ETETEE4QB8**

## Import

1. Open [Google Tag Manager](https://tagmanager.google.com/) → container **GTM-NWSKQ88T**.
2. **Admin** → **Import Container**.
3. Choose `vinvaro-gtm-container.json`.
4. Workspace: **Existing** (or a new one named “VINVARO analytics”).
5. Import option: **Merge** → **Rename conflicting tags, triggers and variables**.
6. Review → **Confirm**.
7. Replace `REPLACE_ME` on the **Constant** variables (Meta / LinkedIn / Google Ads) when you have IDs. GTM does not allow empty constants.
8. **Submit** → **Publish**.

## Variables (fill later)

| Variable | What to paste |
| --- | --- |
| `Const - GA Measurement ID` | `G-ETETEE4QB8` (prefilled) |
| `Const - Meta Pixel ID` | Meta Events Manager pixel ID |
| `Const - Google Ads ID` | `AW-…` |
| `Const - Google Ads Demo Label` | Conversion label for demo thank-you |
| `Const - Google Ads Signup Label` | Conversion label for sign-up |
| `Const - Google Ads Trial Label` | Conversion label for start trial |
| `Const - Google Ads Subscribe Label` | Conversion label for payment method / subscribe |
| `Const - LinkedIn Partner ID` | Insight Tag partner ID |
| `Const - LinkedIn Demo Conversion ID` | LinkedIn conversion ID (demo) |
| `Const - LinkedIn Signup Conversion ID` | LinkedIn conversion ID (sign-up) |
| `Const - LinkedIn Trial Conversion ID` | LinkedIn conversion ID (trial) |
| `Const - LinkedIn Subscribe Conversion ID` | LinkedIn conversion ID (subscribe) |

Leave unset IDs as `REPLACE_ME`. Custom HTML tags skip firing while the value is still `REPLACE_ME`.

## dataLayer events (from the sites)

| Event | Site | Meaning |
| --- | --- | --- |
| `schedule_demo` / `generate_lead` | vinvaro.com `/bedankt` | Demo booked |
| `contact_submit` / `generate_lead` | vinvaro.com contact form | Contact lead |
| `sign_up` | app.vinvaro.com | Account created |
| `start_trial` | app | Organisation + trial started |
| `begin_checkout` | app | Stripe payment-method Checkout opened |
| `add_payment_info` / `subscribe` | app | Payment method saved |
| `onboarding_complete` | app | Onboarding finished |
| `purchase` | app (server → GA MP) | Invoice paid |

## Prefer GTM *or* Vercel for the same pixel

The sites also accept `NEXT_PUBLIC_META_PIXEL_ID` (and friends) on Vercel.  
**Do not set the same Meta / LinkedIn / Ads ID in both Vercel and GTM**, or events double-fire.  
Recommended: keep ads pixels in **GTM variables** only; keep `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_GTM_ID` on Vercel.
