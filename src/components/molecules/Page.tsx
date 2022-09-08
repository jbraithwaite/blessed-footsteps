import cx from 'classnames';
import * as React from 'react';
import { useRouter } from '@hooks/useRouter';

export const Page: React.FunctionComponent<
  React.PropsWithChildren<PageProps>
> = ({ children, className }) => {
  const { isPreview, push } = useRouter();

  return (
    <>
      <div className={cx('app-page', 'pb-40', className)}>{children}</div>
      {isPreview && (
        <a
          onClick={() => push({ name: 'exitPreview' })}
          className="fixed bottom-4 right-4 rounded-lg bg-yellow-400 p-3 text-white shadow-md hover:bg-yellow-500 hover:shadow-sm active:bg-yellow-600 active:shadow-inner"
        >
          Exit Preview
        </a>
      )}
    </>
  );
};

export interface PageProps extends Partial<Pick<HTMLElement, 'className'>> {}
