# Static Site Generator

This project is a static site generator for a book. One of the goals of this
project is longevity and durability. The dynamic nature of most websites lend
themselves to security issues that require constant updating. By producing a
static site, we not only create a highly
[portable](https://en.wikipedia.org/wiki/Software_portability) format but also
one that requires minimal maintenance and cost.

## Technology / Services

-   [Prismic](https://prismic.io) Headless CMS to handle all content
-   [Next.js](https://nextjs.org/) React framework that builds the static
    content.
-   [tailwindcss](https://tailwindcss.com/) CSS framework
-   (optional) [Pipedream](https://pipedream.com/) Used to trigger builds
-   (optional) [GitHub Pages](https://pages.github.com/) Static site hosting

## Getting Started

Set the [environment variables](#environment-variables)

```bash
yarn install

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Environment Variables

Duplicate this `.env.local.sample`, rename it `.env.local` and fill it in.

-   `REPO_NAME` - Prismic repository name
-   `ACCESS_TOKEN` - Prismic access token
    (`https://<REPO_NAME>.prismic.io/settings/apps/`)

## Deploying static site

The github workflow `deplay-static.yml` will create a build of the App (fetching
the latest data from Prismic) and push the static files to the `gh-pages`
branch.

This workflow can also be triggered when documents are updated in Prismic via
webhook.

Setup a webhook on Prismic

-   Set the "Secret" to a long lived
    [Personal access token](https://github.com/settings/tokens). This token will
    need access to `workflow`.

Setup a trigger on [Pipedream](https://pipedream.com/) to
[dispatch a workflow event](https://docs.github.com/en/rest/reference/actions#create-a-workflow-dispatch-event)

-   Set the "authorization" header with `Bearer {{event.body.secret}}`
-   Set the "body" with `{"ref":"main"}`
-   Consider throttling workflow execution.

## TODOs

-   Create actual account Create data types

    -   Chapter
    -   Locations (Venues)
    -   Citations

-   Improve GitHub actions (Cache yaml install)
-   Figure out displaying citations on chapter pages
-   Make graphql queries generate types
-   Convert snake case of queries to lower camel
-   Upstream: improve types (e.g. `ApiOptions`)
-   [Darkmode](https://tailwindcss.com/docs/dark-mode)
-   Deploy to Varcel for quick previews
-   Make search work when dynamic, do something else when static, maybe algolia?
