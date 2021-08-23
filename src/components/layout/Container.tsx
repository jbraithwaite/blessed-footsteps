import cx from 'classnames';
import * as React from 'react';
import { useRouter } from 'prismic/router';

export const Container: React.FunctionComponent<ContainerProps> = ({
  children,
  className,
}) => {
  const { isPreview } = useRouter();

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
      {isPreview && (
        // eslint-disable-next-line @next/next/no-html-link-for-pages
        <a
          href="/api/exit-preview"
          className="bg-yellow-400 text-white p-3 rounded-lg absolute bottom-4 right-4 shadow-md hover:shadow-sm hover:bg-yellow-500 active:shadow-inner active:bg-yellow-600"
        >
          Exit Preview
        </a>
      )}
    </>
  );
};

export interface ContainerProps
  extends Partial<Pick<HTMLElement, 'className'>> {}
