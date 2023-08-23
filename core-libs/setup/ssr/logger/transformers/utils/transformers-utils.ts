/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TransformerConfig } from '../default-transformers';
import { ExpressLogTransformer } from '../express-log-transformer';

export interface ExpressLogTransformerConfig {
  replace?: TransformerConfig;
  remove?: [keyof TransformerConfig];
}

export function getLogTransformers(
  transformers: ExpressLogTransformerConfig | undefined,
  defaultTransformers: TransformerConfig
): ExpressLogTransformer[] {
  let parsedTransformers: TransformerConfig = {
    ...defaultTransformers,
    ...transformers?.replace,
  };
  if (transformers) {
    transformers.remove?.forEach((transformerToBeRemoved) => {
      delete parsedTransformers[transformerToBeRemoved];
    });
  }
  return parseTransformers(parsedTransformers);
}

export function parseTransformers(
  transformersConfig: TransformerConfig
): ExpressLogTransformer[] {
  return Object.keys(transformersConfig)
    .map((key) => transformersConfig[key as keyof TransformerConfig])
    .filter(isTransformer);
}

export function isTransformer(
  transformer: ExpressLogTransformer | undefined
): transformer is ExpressLogTransformer {
  return transformer !== undefined;
}
