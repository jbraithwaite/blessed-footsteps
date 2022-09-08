import type { Config } from 'prismic-ts-codegen';
import { loadEnvConfig } from '@next/env';

loadEnvConfig('./', true);

const accessToken = process.env.PRISMIC_API_TOKEN;
const repositoryName = process.env.PRISMIC_REPOSITORY_NAME;

const customTypesAPIToken = process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN;

const config: Config = {
  accessToken,
  repositoryName,
  customTypesAPIToken,
  output: './src/prismic/types.generated.ts',
  models: {
    fetchFromRepository: true,
  },
};

export default config;

if (!accessToken) {
  throw new Error('Environment variable `PRISMIC_API_TOKEN` not set');
}

if (!process.env.PRISMIC_REPOSITORY_NAME) {
  throw new Error('Environment variable `PRISMIC_REPOSITORY_NAME` not set');
}
