/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  configureWunderGraphApplication,
  cors,
  EnvironmentVariable,
  introspect,
  templates,
} from '@wundergraph/sdk';
import operations from './wundergraph.operations';
import server from './wundergraph.server';

const ccv2 = introspect.openApi({
  apiNamespace: 'ccv2',
  source: {
    kind: 'file',
    filePath: './ccv2.json',
  },
  baseURL: 'https://spartacus-demo.eastus.cloudapp.azure.com:8443/occ/v2/',
});

const countries = introspect.graphql({
  apiNamespace: 'countries',
  url: 'https://countries.trevorblades.com/',
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [countries, ccv2],
  server,
  operations,
  codeGenerators: [
    {
      templates: [
        // use all the typescript react templates to generate a client
        ...templates.typescript.all,
      ],
    },
  ],
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === 'production'
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            'http://localhost:4200',
          ]
        : [
            'http://localhost:4200',
            new EnvironmentVariable('WG_ALLOWED_ORIGIN'),
          ],
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== 'production' ||
      process.env.GITPOD_WORKSPACE_ID !== undefined,
  },
});
