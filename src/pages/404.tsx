import * as React from 'react';
import { useRouter } from '@hooks/useRouter';

export const Custom404: React.FunctionComponent<Custom404Props> = () => {
  const router = useRouter();

  React.useEffect(() => {
    function goHome() {
      router.push({ name: 'home' });
    }

    window.addEventListener('keypress', goHome, false);
    window.addEventListener('click', goHome, false);
    return () => {
      window.removeEventListener('keypress', goHome, false);
      window.removeEventListener('click', goHome, false);
    };
  }, [router]);

  const now = new Date();

  // Thanks https://tailwindcomponents.com/u/laraben
  // https://tailwindcomponents.com/component/mac-terminal

  return (
    <div className="margins-off flex min-h-screen items-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="mx-auto w-11/12 sm:w-1/2 sm:max-w-lg">
        <div className="mx-auto h-64 w-full rounded border-black bg-black subpixel-antialiased shadow-2xl">
          <div
            className="flex h-6 items-center rounded-t border-b border-gray-500 bg-gray-100 text-center text-black"
            id="headerTerminal"
          >
            <div
              className="ml-2 flex h-3 w-3 items-center rounded-full border-red-900 bg-red-500 text-center shadow-inner"
              id="closebtn"
            ></div>
            <div
              className="ml-2 h-3 w-3 rounded-full border-yellow-900 bg-yellow-500 shadow-inner"
              id="minbtn"
            ></div>
            <div
              className="ml-2 h-3 w-3 rounded-full border-green-900 bg-green-500 shadow-inner"
              id="maxbtn"
            ></div>
            <div className="mx-auto pr-16" id="terminaltitle">
              <p className="text-center text-sm">Terminal</p>
            </div>
          </div>
          <div
            className="h-auto bg-black pl-1  pt-1 font-mono text-xs text-white"
            id="console"
          >
            <p className="mb-5 pb-1">
              Last login: {now.toDateString()} {now.toLocaleTimeString()} on
              ttys002
            </p>
            <p className="pb-1">
              <span className="text-red-600">warning</span> 404 - Page not found
            </p>
            <p className="pb-1">
              The content you were looking for was not found
            </p>
            <p className="mb-2 pb-1">Press any key to go home</p>
            <p className="pb-1">
              jbraithwaite@atlantis: <span className="text-green-600">~</span> $
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface Custom404Props {}

export default Custom404;
