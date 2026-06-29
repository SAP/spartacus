/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { $, type VivaldiConfig } from '@vivaldi/config';
import { createContext } from './src/api/context';
import { rootRouter } from './src/api/routers/root';

export default {
  tRPC: {
    createContext: () => createContext(),
    router: rootRouter,
    prefix: '/api',
  },
  server: {
    devProxy: {
      frontend: {
        target: $.FRONTEND_BASE_URL,
      },
    },
    resilience: {
      timeout: true,
    },
  },
} satisfies VivaldiConfig;
