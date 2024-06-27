import { Injectable, inject } from '@angular/core';
import { DirectionMode, DirectionService } from '@spartacus/storefront';

@Injectable({ providedIn: 'root' })
export class ConfiguratorPriceService {
  protected directionService = inject(DirectionService);

  protected isRTLDirection(): boolean {
    return this.directionService.getDirection() === DirectionMode.RTL;
  }

  removeSign(value: string | undefined, sign: string): string {
    if (value) {
      return value.replace(sign, '');
    }
    return '';
  }

  addSign(value: string | undefined, sign: string): string {
    if (value) {
      return this.isRTLDirection() ? value + sign : sign + value;
    }
    return '';
  }

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
