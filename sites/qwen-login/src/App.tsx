import React from 'react';
import { Theme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';
import { Heading, Text } from '@astryxdesign/core';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <Theme theme={neutralTheme}>
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
    </Theme>
  );
};

export default App;