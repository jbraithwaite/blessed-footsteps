import cx from 'classnames';
import * as React from 'react';
import { useRouter } from 'prismic/router';

export const Page: React.FunctionComponent<PageProps> = ({
  children,
  className,
}) => {
  const { isPreview, push } = useRouter();

  return (
    <>
      <div className={cx('app-page', className)}>{children}</div>
      {isPreview && (
        <a
          onClick={() => push({ name: 'exitPreview' })}
          className="bg-yellow-400 text-white p-3 rounded-lg fixed bottom-4 right-4 shadow-md hover:shadow-sm hover:bg-yellow-500 active:shadow-inner active:bg-yellow-600"
        >
          Exit Preview
        </a>
      )}
    </>
  );
};

export interface PageProps extends Partial<Pick<HTMLElement, 'className'>> {}
