/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';
import { Image } from 'projects/core/src/model';

export type VariantCategoryOption = { value: string; code: string; images: Image[]; order: number };

export type VariantCategory = {
  name: string;
  variantOptions: VariantCategoryOption[];
  hasImages: boolean;
};

declare module '@spartacus/core' {
  const enum ProductScope {}
}
