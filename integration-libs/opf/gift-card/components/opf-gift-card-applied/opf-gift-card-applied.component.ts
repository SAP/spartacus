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
import { OpfGiftCardFacade } from '@spartacus/opf/gift-card/root';
import { OutletModule } from '@spartacus/storefront';
import { SAPGiftCards } from '../../root/model';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-opf-gift-card-applied',
  templateUrl: './opf-gift-card-applied.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, CommonModule, TranslatePipe, OutletModule],
})
export class OpfGiftCardAppliedComponent {
  protected globalMessageService = inject(GlobalMessageService);
  protected giftCardFacade = inject(OpfGiftCardFacade);
  protected activeCartFacade = inject(ActiveCartFacade);

  @Input() giftCards: SAPGiftCards[];

  removeGiftCard(giftCardId: string) {
    this.giftCardFacade.removeGiftCard(giftCardId).subscribe({
      next: () => {
        this.activeCartFacade.reloadActiveCart();
        this.globalMessageService.add(
          { key: 'giftCard.removedSuccessfully' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      },
      error: (error) => {
          console.error('Error removing gift card:', error.details[0].message);

        const message = error?.message;
        this.globalMessageService.add(
          { raw: message },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      },
    });
  }
}
