/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BaseOption, Product, VariantOptionQualifier } from 'projects/core/src/model';
import { p } from './p';

export type GroupedOption = {
  name: string;
  variantOptions: { value: string; code: string }[];
};

@Injectable({ providedIn: 'root' })
export class ProductMultiDimensionalService {
  getVariants(product: Product): GroupedOption[] {
    // @ts-ignore
    product = p;
    console.log(this.groupBaseOptions(product));

    return this.groupBaseOptions(product);
  }

  groupBaseOptions(product: Product): GroupedOption[] {
    const groupedOptions: GroupedOption[] = [];
    const baseOptions: BaseOption = product.baseOptions?.[0] ?? {};
    let selectedQualifiers: VariantOptionQualifier[] = baseOptions.selected?.variantOptionQualifiers ?? [];
    const temp: any[] = [
      {
        name: 'Color',
        qualifier: 'B2C_Color',
        value: 'Red'
      },
      {
        name: 'Size',
        qualifier: 'B2C_SIZE',
        value: 'L'
      },
      {
        name: 'Material',
        qualifier: 'B2C_Material',
        value: 'Cotton'
      }
    ];
    selectedQualifiers = temp;

    // Blue M Cotton
    baseOptions.options?.forEach((option) => {

      option.variantOptionQualifiers?.forEach((qualifier) => {
        if (qualifier.name) {
          let group = groupedOptions.find(g => g.name === qualifier.name);
          if (!group) {
            group = { name: qualifier.name, variantOptions: [] };
            groupedOptions.push(group);
          }
          if (this.shouldAdd(group.name, selectedQualifiers, option.variantOptionQualifiers ?? [])) {
            group.variantOptions.push({ value: qualifier.value ?? '', code: option.code ?? '' });
          }
        }
      });
    });

    return groupedOptions;
  }

  shouldAdd(groupName: string, selectedQualifiers: VariantOptionQualifier[], optionQualifiers: VariantOptionQualifier[]): boolean {
     return optionQualifiers.every((q) => {
      if (q.name === groupName) {
        return true;
      }

      return selectedQualifiers.find(((x) => {
        return q.value === x.value;
      }));
    });
  }
}
