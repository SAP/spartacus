/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '@spartacus/core';

@Pipe({
  name: 'isSelected',
})
export class SelectedProductPipe implements PipeTransform {
  transform(value: Product[], product: Product): boolean {
    return Boolean(value?.find((item) => item.code === product.code));
  }
}
