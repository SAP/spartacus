/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { DirectionMode, DirectionService } from '@spartacus/storefront';

@Injectable({ providedIn: 'root' })
export class ConfiguratorPriceService {
  protected directionService = inject(DirectionService);

  protected isRTLDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.RTL;
  }

  /**
   * Removes any sign (+/-) from the formatted price value
   *
   * @param value formatted value
   * @param sign the sign, typically '+' or '-'
   * @returns formatted value without sign
   */
  removeSign(value: string | undefined, sign: string): string {
    if (value) {
      return value.replace(sign, '');
    }
    return '';
  }

  /**
   * Adds a sign (+/-) to the formatted price value
   *
   * @param value formatted value
   * @param sign the sign, typically '+' or '-'
   * @returns formatted value with sign
   */
  addSign(value: string | undefined, sign: string): string {
    if (value) {
      return this.isRTLDirection() ? value + sign : sign + value;
    }
    return '';
  }

  /**
   * Formats the value for display on the UI
   *
   * @param priceValue price value
   * @param formattedValue pre-formatted value
   * @returns formatted value
   */
  compileFormattedValue(
    priceValue: number,
    formattedValue: string | undefined
  ): string {
    if (priceValue > 0) {
      return this.addSign(formattedValue, '+');
    } else {
      // for negative values formatted value already contains the minus sign, but always before value
      if (this.isRTLDirection()) {
        const withoutSign = this.removeSign(formattedValue, '-');
        return this.addSign(withoutSign, '-');
      }
      return formattedValue ?? '';
    }
  }
}
