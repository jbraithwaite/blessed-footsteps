import { either } from 'fp-ts';
import { constUndefined, flow } from 'fp-ts/lib/function';
import { useRouter } from 'next/router';
import React from 'react';
import { noop } from 'src/utils';
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
      router.push('/api/exit-preview').catch(noop);
      return;
    }

    if (ref.value && ref.value !== activeRef) {
      router
        .push(`/api/preview?token=${ref}&documentId=${documentId}`)
        .catch(noop);
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

function useRefFromCookie(): failable.Failable<string | undefined> {
  const [ref, setRef] = React.useState<failable.Failable<string | undefined>>(
    failable.pending(),
  );

  const cookieKey = 'io.prismic.preview';
  const repositoryName = process.env.PRISMIC_REPOSITORY_NAME;
  const keyName = `${repositoryName}.prismic.io`;

  React.useEffect(() => {
    const cookieValue = getCookie(cookieKey);

    if (!cookieValue || !repositoryName) {
      return setRef(failable.failure(new Error('Missing Cookie or repo name')));
    }

    setRef(failable.success(getRef(keyName)(cookieValue)));
  }, [keyName, repositoryName]);

  return ref;
}

const getRef = (keyName: string) =>
  flow(
    decodeURI,
    JsonParse,
    either.fold(constUndefined, (d) => {
      if (
        typeof d === 'object' &&
        d !== null &&
        !Array.isArray(d) &&
        keyName in d
      ) {
        const f = d[keyName];
        if (
          typeof f === 'object' &&
          f !== null &&
          !Array.isArray(f) &&
          'preview' in f &&
          typeof f.preview === 'string'
        ) {
          return f.preview;
        }
      }

      return undefined;
    }),
  );
