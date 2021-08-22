import * as React from 'react';
import { useRouter } from 'prismic/router';

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
    <div className="min-h-screen flex items-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="w-11/12 sm:w-1/2 sm:max-w-lg mx-auto">
        <div className="w-full shadow-2xl subpixel-antialiased rounded h-64 bg-black border-black mx-auto">
          <div
            className="flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black"
            id="headerTerminal"
          >
            <div
              className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"
              id="closebtn"
            ></div>
            <div
              className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3"
              id="minbtn"
            ></div>
            <div
              className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3"
              id="maxbtn"
            ></div>
            <div className="mx-auto pr-16" id="terminaltitle">
              <p className="text-center text-sm">Terminal</p>
            </div>
          </div>
          <div
            className="pl-1 pt-1 h-auto  text-white font-mono text-xs bg-black"
            id="console"
          >
            <p className="pb-1 mb-5">
              Last login: {now.toDateString()} {now.toLocaleTimeString()} on
              ttys002
            </p>
            <p className="pb-1">
              <span className="text-red-600">warning</span> 404 - Page not found
            </p>
            <p className="pb-1">
              The content you were looking for was not found
            </p>
            <p className="pb-1 mb-2">Press any key to go home</p>
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
