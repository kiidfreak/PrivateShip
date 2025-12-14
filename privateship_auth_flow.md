# User Authentication & Onboarding Flow

## 🎯 Design Philosophy: "Award-Winning UX"
Minimizing friction is the priority. Identity verification is usually tedious; our goal is to make it feel **invisible** and **secure**.

- **Passwordless**: No passwords to remember. Phone number + OTP only.
- **Immediate**: Real-time validation, auto-advancing fields.
- **Visual**: Subtle animations (Framer Motion) to guide attention, not distract.
- **Contextual**: Explain *why* we need info right when we ask for it.

---

## 🌊 The Flow

### 1. Login / Sign Up Screen
**Route**: `/auth/login`

**Visuals**:
- Clean, centered card on a dark backdrop (glassmorphism).
- "Welcome to PrivateShip" header with "Verify once, trusted everywhere" subtext.

**Interaction**:
1.  **Input**: User enters Mobile Number.
    -   *UX Polish*: Auto-format formatting `(555) 123-4567`.
    -   *UX Polish*: Flag selector based on geo-IP or default (start with generic or simple dropdown).
2.  **Action**: User clicks "Continue" (or presses Enter).
    -   *Animation*: Button shows a loading spinner.
    -   *Transition*: If valid, the card contents **slide left** to reveal the OTP screen.

### 2. Verification (OTP) Screen
**Route**: `/auth/verify` (or keeping state on same page)

**Visuals**:
- Header changes to "Check your phone".
- Subtext shows the number sent to with an "Edit" link to go back.

**Interaction**:
1.  **Input**: 6-digit OTP code.
    -   *UX Polish*: **One-Time Password (OTP) Slots**. 6 distinct boxes.
    -   *UX Polish*: **Auto-focus** first box on load.
    -   *UX Polish*: **Auto-advance** to next box upon typing digit.
    -   *UX Polish*: **Paste support** (User pastes "123456", it fills all boxes).
2.  **Action**: Logic checks automatically on the 6th digit input.
    -   *No "Submit" button needed* (reduces click fatigue).
3.  **Success State**:
    -   Input boxes turn **Green**.
    -   A success checkmark animation plays.
    -   Redirects to Dashboard `/dashboard`.
4.  **Error State**:
    -   Input boxes shake horizontally.
    -   Turn **Red**.
    -   "Invalid code" toast message appears.
    -   Auto-clear the boxes for retry.

### 3. Loading / "Creating Identity" (Interstitials)
between Verify -> Dashboard

**Visuals**:
- Full screen overlay or modal.
- "Generating your Zero-Knowledge Identity Anchor..."
- **Matrix/Terminal-style text effect** rapidly scrolling random hashes -> settling on "Verified".

---

## 🛠️ Technical Implementation Plan

### Frontend Components needed:
- `PhoneInput`: A specialized input usage `react-phone-number-input` or custom logic.
- `OTPInput`: Custom component managing 6 refs/inputs.
- `AuthLayout`: Wrapper for the auth pages (centered, background).

### API Requirements:
- `POST /auth/send-otp`: Already implemented (Mock).
- `POST /auth/verify-otp`: Already implemented (Mock). Returns JWT/Session.

### Next Steps:
1. Create `apps/web/src/app/auth/login/page.tsx`
2. Create `apps/web/src/app/auth/verify/page.tsx` (or combine logic)
3. Implement the `OTPInput` component with framer-motion.
