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
  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const handleEmailChange = useCallback(
    (value: string) => {
      setFormState((prev) => ({ ...prev, email: value }));
    },
    []
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      setFormState((prev) => ({ ...prev, password: value }));
    },
    []
  );

  const handleRememberMeChange = useCallback(
    (checked: boolean) => {
      setFormState((prev) => ({ ...prev, rememberMe: checked }));
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
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Login submitted:', {
          email: formState.email,
          rememberMe: formState.rememberMe,
        });
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
              label="Email address"
              value={formState.email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              placeholder="you@example.com"
              autoComplete="email"
              aria-label="Email address"
              aria-describedby={emailError ? 'email-error' : undefined}
              aria-invalid={!!emailError}
              className="ax-w-full"
              isDisabled={isSubmitting}
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
              label="Password"
              value={formState.password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-label="Password"
              aria-describedby={passwordError ? 'password-error' : undefined}
              aria-invalid={!!passwordError}
              className="ax-w-full"
              isDisabled={isSubmitting}
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
              label="Remember me"
              value={formState.rememberMe}
              onChange={handleRememberMeChange}
              aria-label="Remember me on this device"
              isDisabled={isSubmitting}
            />

            <Button
              label="Forgot password?"
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
            label="Sign in"
            variant="primary"
            type="submit"
            fullWidth
            isDisabled={isSubmitting}
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