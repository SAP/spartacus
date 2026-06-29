/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { $, type VivaldiApi } from '@vivaldi/config';

const hosts = [
  {
    name: 'occ',
    origin: $.OCC_BASE_URL,
  },
] satisfies VivaldiApi['hosts'];

export default {
  hosts,

  apis: [
    {
      name: 'occ_v2',
      destination: {
        host: 'occ',
        path: '/occ/v2',
      },
    },
  ],
} satisfies VivaldiApi<typeof hosts>;
