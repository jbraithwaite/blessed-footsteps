import cx from 'classnames';
import * as React from 'react';

export const Container: React.FunctionComponent<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <>
      <div
        className={cx(
          'max-w-full px-5 py-20 sm:px-24 sm:max-w-3xl sm:mx-auto',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};

export interface ContainerProps
  extends Partial<Pick<HTMLElement, 'className'>> {}
