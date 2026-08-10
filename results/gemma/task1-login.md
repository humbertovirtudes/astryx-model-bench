# google/gemma-4-e4b — Task 1-Login

**Model:** `google/gemma-4-e4b`
**Prompt tokens:** 292
**Completion tokens:** 2094

---

This solution provides a complete, production-ready implementation using TypeScript, functional components, and adhering strictly to the Astryx design system guidelines for styling and responsiveness.

### 1. `src/main.tsx` (Entry Point with Theme Provider)

This file sets up the application context, including the required theme provider for dark mode support.

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@astryxdesign/core';
import { CssBaseline } from '@astryxdesign/core';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Wrap the entire application in ThemeProvider and CssBaseline for proper styling context
root.render(
  <React.StrictMode>
    <ThemeProvider>
      {/* CssBaseline resets browser default styles */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### 2. `src/components/LoginForm.tsx` (The Form Component)

This component handles the state, validation logic, and rendering of all form elements using Astryx components.

```tsx
// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { Card, FormLayout, Field, TextInput, Button, Heading, Text, CheckboxInput } from '@astryxdesign/core';

interface LoginFormProps {}

const initialFormState = {
  email: '',
  password: '',
  rememberMe: false,
};

/**
 * Login form component using Astryx design system.
 */
const LoginForm: React.FC<LoginFormProps> = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<{ email?: string; password?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = (): boolean => {
    let tempErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!formData.email) {
      tempErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login Attempt:', {
        email: formData.email,
        rememberMe: formData.rememberMe,
      });
      // Here you would typically call an API service
      alert(`Logging in with ${formData.email}...`);
    } else {
      console.error('Validation failed');
    }
  };

  return (
    <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col items-center space-y-2 mb-6">
        <Heading level={2} className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </Heading>
        <Text color="secondary" className="dark:text-gray-400">
          Sign in to continue to your account.
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <FormLayout>
          <Field name="email" label="Email Address" required aria-label="Email Address">
            <TextInput
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!errors?.email}
              className={`
                ${errors?.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700'} 
                focus:ring-2 focus:ring-primary/50 transition duration-150 ease-in-out
              `}
            />
          </Field>
        </FormLayout>

        {/* Password Field */}
        <FormLayout>
          <Field name="password" label="Password" required aria-label="Password">
            <TextInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••"
              aria-invalid={!!errors?.password}
              className={`
                ${errors?.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700'} 
                focus:ring-2 focus:ring-primary/50 transition duration-150 ease-in-out
              `}
            />
          </Field>
        </FormLayout>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <CheckboxInput
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              aria-label="Remember me checkbox"
            />
            <Text color="secondary" className="dark:text-gray-400">
              Remember me
            </Text>
          </div>

          {/* Forgot Password Link */}
          <button 
            type="button" 
            className="text-sm text-primary hover:underline transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 py-1 px-2 rounded-md"
            onClick={() => alert('Navigating to Forgot Password page')}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className={`w-full py-3 text-lg ${errors?.email || errors?.password ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!!errors}
        >
          Log In
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
```

### 3. `src/App.tsx` (Page Layout)

This component provides the overall page structure, centering the form card and ensuring responsiveness across all breakpoints.

```tsx
// src/App.tsx
import React from 'react';
import { Container, Heading, Text } from '@astryxdesign/core';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 sm:py-20">
      {/* Container ensures proper padding and centering */}
      <Container>
        <div className="flex justify-center items-start pt-8 pb-16">
          {/* The LoginForm component handles its own max-width and centering within the Card */}
          <LoginForm />
        </div>
      </Container>

      {/* Optional Footer/Branding Area for completeness */}
      <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-600">
        &copy; {new Date().getFullYear()} Astryx Design System Demo. All rights reserved.
      </div>
    </div>
  );
};

export default App;
```