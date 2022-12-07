/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MultisiteIsolationConfig } from './multisite-isolation-config';

export const defaultMultisiteIsolationConfig: MultisiteIsolationConfig = {
  multisiteIsolation: {
    enabled: true,
    isolationDetection: false,
    decorator: '|',
  },
};
