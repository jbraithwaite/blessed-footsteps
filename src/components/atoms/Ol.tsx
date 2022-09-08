import * as React from 'react';

export const Ol: React.FunctionComponent<React.PropsWithChildren<OlProps>> = ({
  children,
}) => {
  return (
    <ol className="list-decimal list-inside sm:list-outside">{children}</ol>
  );
};

export interface OlProps {}
