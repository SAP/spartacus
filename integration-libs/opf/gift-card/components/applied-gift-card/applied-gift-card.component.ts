/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { GiftCardService } from '../../core/services';
import { OutletModule } from '@spartacus/storefront';
import { SAPGiftCard } from '../../root/model';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-applied-gift-card',
  templateUrl: './applied-gift-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, CommonModule, TranslatePipe, OutletModule],
})
export class AppliedGiftCardComponent {
  protected globalMessageService = inject(GlobalMessageService);
  protected giftCardService = inject(GiftCardService);
  protected activeCartFacade = inject(ActiveCartFacade);

  @Input() giftCards: SAPGiftCard[];

  removeGiftCard(giftCardId: string) {
    this.giftCardService.removeGiftCard(giftCardId).subscribe({
      next: () => {
        this.activeCartFacade.reloadActiveCart();
        this.globalMessageService.add(
          { key: 'giftCard.removedSuccessfully' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      },
      error: (error) => {
        const message = error?.message || 'giftCard.errors.removeFailed';
        this.globalMessageService.add(
          { raw: message },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      },
    });
  }
}
