import '../styles/index.css';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { AnalyticsProvider } from 'src/hooks/analytics';
import { LoggerProvider } from 'src/hooks/logger';

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApplyProviders
      providers={[
        <LoggerProvider key="logger" />,
        <AnalyticsProvider key="analytics" />,
      ]}
    >
      <Component {...pageProps} />
    </ApplyProviders>
  );
};

export default MyApp;

const ApplyProviders: React.FunctionComponent<{
  providers: React.ReactElement[];
}> = ({ providers, children }) => {
  return providers.reduceRight(nestChildrenReducer, <>{children}</>);
};

function nestChildrenReducer(
  children: React.ReactNode,
  provider: React.ReactElement,
): React.ReactElement {
  return React.cloneElement(provider, {}, children);
}
