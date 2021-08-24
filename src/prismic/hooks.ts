import { either } from 'fp-ts';
import { constUndefined, flow } from 'fp-ts/lib/function';
import { useRouter } from 'next/router';
import React from 'react';
import { useLogger } from 'src/hooks/logger';
import { failable } from 'types/failable';
import { JsonParse } from 'types/json';

export function usePreview(documentId: string, activeRef: string | undefined) {
  const router = useRouter();
  const ref = useRefFromCookie();

  React.useEffect(() => {
    if (ref.state === 'pending' || !router.isPreview) {
      return;
    }

    if (ref.state === 'failure') {
      const path = '/api/exit-preview';
      window.location.href = path;
      return;
    }

    if (ref.value !== activeRef) {
      const path = `/api/preview?token=${ref.value}&documentId=${documentId}`;
      // Using a window redirect seems to cause less issues with Next.js
      // Was getting a 404 on the API not exisiting
      window.location.href = path;
      return;
    }
  }, [activeRef, documentId, ref, router]);
}

function getCookie(name: string): string | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }
  const value = `; ${window.document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(';').shift() : undefined;
}

function useRefFromCookie(): failable.Failable<string> {
  const logger = useLogger();
  const [ref, setRef] = React.useState<failable.Failable<string>>(
    failable.pending(),
  );

  const cookieKey = 'io.prismic.preview';
  const repositoryName = process.env.PRISMIC_REPOSITORY_NAME;
  const keyName = `${repositoryName}.prismic.io`;

  React.useEffect(() => {
    const cookieValue = getCookie(cookieKey);

    if (!cookieValue) {
      return setRef(failable.failure(new Error('Missing cookie')));
    }

    if (!repositoryName) {
      logger.error(
        'Missing environment variable `PRISMIC_REPOSITORY_NAME` on the client',
      );
      return setRef(failable.failure(new Error('Missing repository name')));
    }

    const reference = getRef(keyName)(cookieValue);

    if (reference) {
      setRef(failable.success(reference));
    } else {
      logger.error('Could not find the information in the cookie', {
        extra: { keyName, cookieValue },
      });
      setRef(failable.failure(new Error('Issue finding the cookie value')));
    }
  }, [logger, keyName, repositoryName]);

  return ref;
}

const getRef = (keyName: string): ((str: string) => string | undefined) =>
  flow(
    decodeURIComponent,
    JsonParse,
    either.fold(constUndefined, (a) => {
      if (
        typeof a === 'object' &&
        a !== null &&
        !Array.isArray(a) &&
        keyName in a
      ) {
        const b = a[keyName];
        if (
          typeof b === 'object' &&
          b !== null &&
          !Array.isArray(b) &&
          'preview' in b &&
          typeof b.preview === 'string'
        ) {
          return b.preview;
        }
      }

      return undefined;
    }),
  );
