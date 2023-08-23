/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TraceparentTransformer } from './traceparent-transformer';

declare module '../default-transformers' {
  interface TransformerConfig {
    traceparentTransformer?: TraceparentTransformer;
  }
}

export * from './default-traceparent-transformer';
export * from './traceparent-transformer';
