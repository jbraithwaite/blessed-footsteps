declare module 'next-slicezone' {
  export default React.Component;
}

declare module 'next-slicezone/resolver' {
  export function createResolver(): promise<void>;
}

declare module 'next-slicezone/hooks' {
  import Prismic from '@prismicio/client';
  import { GetStaticProps, GetStaticPaths } from 'next';

  export function useGetStaticProps<P>(params: {
    /** Object passed to client `apiOptions` */
    apiParams?: (options: {
      params: Record<string, string>;
      previewData: unknown;
      preview: boolean;
    }) => Record<string, string | boolean | undefined>;
    /** Pass a Prismic client here */
    client: ReturnType<typeof Prismic.client>;
    /** Key of slices array in API response (`doc.data[slicesKey]`) */
    slicesKey?: string;
    /** Custom type to be queried */
    type?: string;
    /**
     * One of `repeat` or `single`, to switch between `getByUID` and
     * `getSingle` calls
     */
    queryType?: 'repeat' | 'single';
    /** Object passed to return object of `getStatcProps` */
    getStaticPropsParams?: Record<string, string | number | boolean>;
  }): GetStaticProps;

  export function useGetStaticPaths(params: {
    /** Custom type to be queried */
    type?: string;
    /** Object passed to client `apiOptions` */
    apiParams?: (options: {
      params: Record<string, string>;
      previewData: unknown;
      preview: unknown;
    }) => Record<string, string | undefined>;
    /** Pass a Prismic client here */
    client: ReturnType<typeof Prismic.client>;
    /**
     * Function to format Next path argument. Pass null to skip.
     *
     * e.g `({uid}) => ({ params:{ uid }})`
     */
    formatPath: ((object) => object) | null;
  }): GetStaticPaths;
}
