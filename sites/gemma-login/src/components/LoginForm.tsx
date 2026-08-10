import React, { useState } from 'react';
import { Card, FormLayout, Field, TextInput, Button, Heading, Text, CheckboxInput } from '@astryxdesign/core';

const initialFormState = {
  email: '',
  password: '',
  rememberMe: false,
};

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<{ email?: string; password?: string } | null>(null);

  const handleEmailChange = (value: string) => {
    setFormData(prev => ({ ...prev, email: value }));
  };
  const handlePasswordChange = (value: string) => {
    setFormData(prev => ({ ...prev, password: value }));
  };
  const handleRememberMeChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
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
        <Text className="dark:text-gray-400">
          Sign in to continue to your account.
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormLayout>
          <Field label="Email Address" inputID="gemma-email">
            <TextInput
              label="Email Address"
              value={formData.email}
              onChange={handleEmailChange}
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

        <FormLayout>
          <Field label="Password" inputID="gemma-password" isRequired>
            <TextInput
              label="Password"
              value={formData.password}
              onChange={handlePasswordChange}
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

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <CheckboxInput
              label="Remember me"
              value={formData.rememberMe}
              onChange={handleRememberMeChange}
            />
            <Text className="dark:text-gray-400">
              Remember me
            </Text>
          </div>

          <button 
            type="button" 
            className="text-sm text-primary hover:underline transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 py-1 px-2 rounded-md"
          >
            Forgot password?
          </button>
        </div>

        <Button 
          label="Log In"
          type="submit" 
          className={`w-full py-3 text-lg ${errors?.email || errors?.password ? 'opacity-50 cursor-not-allowed' : ''}`}
          isDisabled={!!errors}
        >
          Log In
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;