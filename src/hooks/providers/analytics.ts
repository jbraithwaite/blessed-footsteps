import React from 'react';

export interface Analytics {
  track(
    name: string,
    extra?: Record<string, string | boolean | number | undefined>,
  ): void;
}

const AnalyticsContext = React.createContext<Analytics | undefined>(undefined);

export const AnalyticsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const value: Analytics = {
    track: (name, extra) => {
      if (
        typeof window !== undefined &&
        'plausible' in window &&
        typeof (window as any).plausible === 'function'
      ) {
        const plausible = (window as any).plausible as Plausible;

        plausible(name, { props: extra });
      }
    },
  };
  return React.createElement(AnalyticsContext.Provider, { value }, children);
};

export function useAnalytics(): Analytics {
  const analytics = React.useContext(AnalyticsContext);

  if (!analytics) {
    throw new Error('`useAnalytics` must be a child of `AnalyticsProvider`');
  }

  return analytics;
}

type Plausible = (
  eventName: string,
  options?: {
    callback?: () => void;
    props?: Record<string, string | boolean | number | undefined>;
  },
) => void;
