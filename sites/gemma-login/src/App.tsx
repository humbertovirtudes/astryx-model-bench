import React from 'react';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <Theme theme={neutralTheme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 sm:py-20 flex justify-center items-start">
        <LoginForm />
        <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-600">
          &copy; {new Date().getFullYear()} Gemma-4-e4b Login Page
        </div>
      </div>
    </Theme>
  );
};

export default App;