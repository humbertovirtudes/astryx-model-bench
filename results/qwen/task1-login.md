# qwen/qwen3.6-27b — Task 1-Login

**Model:** `qwen/qwen3.6-27b`
**Prompt tokens:** 282
**Completion tokens:** 2915

---



# Login Page with Astryx Design System

## 1. `src/main.tsx`

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, Theme } from '@astryxdesign/core';
import { neutralTheme } from '@astryxdesign/theme-neutral';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={neutralTheme} mode="auto">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

## 2. `src/App.tsx`

```tsx
import React from 'react';
import { Heading, Text } from '@astryxdesign/core';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <div className="ax-flex ax-items-center ax-justify-center ax-min-h-screen ax-bg-surface ax-p-4 ax-md:p-6 ax-lg:p-8">
      <div className="ax-w-full ax-max-w-md">
        <div className="ax-mb-8 ax-text-center">
          <Heading level={1} className="ax-mb-2 ax-text-heading-lg ax-font-semibold ax-text-on-surface">
            Welcome back
          </Heading>
          <Text className="ax-text-body ax-text-on-surface-variant">
            Sign in to your account to continue
          </Text>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default App;
```

## 3. `src/components/LoginForm.tsx`

```tsx
import React, { useState, useCallback, useMemo } from 'react';
import {
  Card,
  FormLayout,
  Field,
  TextInput,
  Button,
  CheckboxInput,
  Text,
} from '@astryxdesign/core';

type ValidationErrors = {
  email?: string;
  password?: string;
};

type FormState = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const useFormValidation = (values: FormState): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
};

const LoginForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = useMemo(() => useFormValidation(formState), [formState]);

  const hasErrors = useMemo(
    () => Object.keys(errors).length > 0,
    [errors]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, email: e.target.value }));
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, password: e.target.value }));
    },
    []
  );

  const handleRememberMeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, rememberMe: e.target.checked }));
    },
    []
  );

  const handleEmailBlur = useCallback(() => {
    setTouched((prev) => ({ ...prev, email: true }));
  }, []);

  const handlePasswordBlur = useCallback(() => {
    setTouched((prev) => ({ ...prev, password: true }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitAttempted(true);
      setTouched({ email: true, password: true });

      if (hasErrors) return;

      setIsSubmitting(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Login submitted:', {
          email: formState.email,
          rememberMe: formState.rememberMe,
        });
        // Handle successful login (redirect, etc.)
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState, hasErrors]
  );

  const emailError = touched.email || submitAttempted ? errors.email : undefined;
  const passwordError = touched.password || submitAttempted ? errors.password : undefined;

  const emailFieldState = emailError ? 'error' : touched.email && !emailError ? 'success' : undefined;
  const passwordFieldState = passwordError ? 'error' : touched.password && !passwordError ? 'success' : undefined;

  return (
    <Card className="ax-p-6 ax-md:p-8 ax-shadow-card ax-rounded-lg">
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Login form"
        className="ax-flex ax-flex-col ax-gap-6"
      >
        <FormLayout>
          <Field
            label="Email address"
            error={emailError}
            state={emailFieldState}
            className="ax-mb-4"
          >
            <TextInput
              id="email"
              type="email"
              value={formState.email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              placeholder="you@example.com"
              autoComplete="email"
              aria-label="Email address"
              aria-describedby={emailError ? 'email-error' : undefined}
              aria-invalid={!!emailError}
              className="ax-w-full"
              disabled={isSubmitting}
            />
            {emailError && (
              <Text
                id="email-error"
                className="ax-text-error ax-text-caption ax-mt-1"
                role="alert"
              >
                {emailError}
              </Text>
            )}
          </Field>

          <Field
            label="Password"
            error={passwordError}
            state={passwordFieldState}
            className="ax-mb-4"
          >
            <TextInput
              id="password"
              type="password"
              value={formState.password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-label="Password"
              aria-describedby={passwordError ? 'password-error' : undefined}
              aria-invalid={!!passwordError}
              className="ax-w-full"
              disabled={isSubmitting}
            />
            {passwordError && (
              <Text
                id="password-error"
                className="ax-text-error ax-text-caption ax-mt-1"
                role="alert"
              >
                {passwordError}
              </Text>
            )}
          </Field>

          <div className="ax-flex ax-items-center ax-justify-between ax-mb-6">
            <CheckboxInput
              id="remember-me"
              checked={formState.rememberMe}
              onChange={handleRememberMeChange}
              label="Remember me"
              aria-label="Remember me on this device"
              disabled={isSubmitting}
            />

            <Button
              variant="text"
              size="sm"
              className="ax-text-primary ax-underline ax-text-caption"
              type="button"
              aria-label="Forgot password"
            >
              Forgot password?
            </Button>
          </div>

          <Button
            variant="primary"
            type="submit"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
            className="ax-mt-2"
            aria-label={isSubmitting ? 'Signing in...' : 'Sign in'}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </FormLayout>
      </form>
    </Card>
  );
};

export default LoginForm;
```

## Key Design Decisions

### Validation Architecture
- **`useFormValidation`** — a custom hook that returns typed `ValidationErrors` based on current form values. Runs on every render via `useMemo`, keeping it cheap and referentially stable.
- **`touched` state** — separates "user interacted with field" from "form was submitted", so errors only appear after blur or submit attempt.
- **Field states** — `error` / `success` / `undefined` passed to `Field` and `TextInput` for visual feedback.

### Accessibility
- Every input has a matching `id` and `aria-label`.
- Error messages use `role="alert"` and `aria-describedby` to link them to their fields.
- `aria-invalid` toggles based on error presence.
- The form has `aria-label="Login form"` and `noValidate` (we handle validation ourselves).
- Submit button updates its `aria-label` when loading.

### Responsive Behavior
| Breakpoint | Behavior |
|---|---|
| **375px (mobile)** | Full-width card with `ax-p-6`, stacked layout, full-width button |
| **768px (tablet)** | Increased padding `ax-md:p-8`, more breathing room |
| **Desktop** | Card constrained to `ax-max-w-md`, centered with flexbox |

### Dark Mode
- `ThemeProvider` with `mode="auto"` respects the user's OS preference via `prefers-color-scheme`.
- All colors flow through Astryx semantic tokens (`ax-bg-surface`, `ax-text-on-surface`, `ax-text-error`, etc.), so dark mode is automatic — no conditional logic needed in components.

### No Inline Styles
All spacing, typography, and layout use Astryx utility class names (`ax-p-6`, `ax-mb-4`, `ax-flex`, `ax-gap-6`, etc.) and semantic token references. The `Card`, `Button`, and `TextInput` components handle their own internal styling through the theme.