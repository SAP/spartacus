/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Image } from '@spartacus/core';

export type VariantCategoryOption = {
  value: string;
  code: string;
  images: Image[];
};

export type VariantCategory = {
  name: string;
  variantOptions: VariantCategoryOption[];
  hasImages: boolean;
};

declare module '@spartacus/core' {
  const enum ProductScope {}
}
