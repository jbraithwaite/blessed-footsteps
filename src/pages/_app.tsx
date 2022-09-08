import '../styles/index.css';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { AnalyticsProvider } from 'src/hooks/providers/analytics';
import { repositoryName } from '@prismic/client';
import { PrismicPreview } from '@prismicio/next';

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApplyProviders
      providers={[
        <AnalyticsProvider key="analytics" />,
        <PrismicPreview repositoryName={repositoryName} key="prismic" />,
      ]}
    >
      <Component {...pageProps} />
    </ApplyProviders>
  );
};

export default MyApp;

const ApplyProviders: React.FunctionComponent<{
  providers: React.ReactElement[];
  children: React.ReactNode;
}> = ({ providers, children }) => {
  return providers.reduceRight(nestChildrenReducer, <>{children}</>);
};

function nestChildrenReducer(
  children: React.ReactNode,
  provider: React.ReactElement,
): React.ReactElement {
  return React.cloneElement(provider, {}, children);
}
