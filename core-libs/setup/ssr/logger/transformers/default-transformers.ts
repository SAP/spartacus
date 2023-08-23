/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultTraceparentTransformer } from './traceparent/default-traceparent-transformer';

export interface TransformerConfig {}

export const defaultTransformersConfig: TransformerConfig = {
  traceparentTransformer: new DefaultTraceparentTransformer(),
};
