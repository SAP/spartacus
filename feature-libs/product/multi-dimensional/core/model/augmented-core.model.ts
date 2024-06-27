/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/core';
import { VariantMatrixElement } from 'projects/core/src/model';

export type VariantsCategories = {
  name: string;
  categoryVariants: VariantMatrixElement[];
};

declare module '@spartacus/core' {
  const enum ProductScope {}
}
