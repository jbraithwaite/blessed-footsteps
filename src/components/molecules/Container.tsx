import cx from 'classnames';
import * as React from 'react';

export const Container: React.FunctionComponent<
  React.PropsWithChildren<ContainerProps>
> = ({ children, className }) => {
  return (
    <div
      className={cx(
        'max-w-full px-5 py-20 sm:mx-auto sm:max-w-3xl sm:px-24',
        className,
      )}
    >
      {children}
    </div>
  );
};

export interface ContainerProps
  extends Partial<Pick<HTMLElement, 'className'>> {}
