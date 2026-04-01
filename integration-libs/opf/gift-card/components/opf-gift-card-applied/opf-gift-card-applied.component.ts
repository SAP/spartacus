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
import {
  GlobalMessageService,
  GlobalMessageType,
  TranslatePipe,
} from '@spartacus/core';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfGiftCardFacade } from '../../root/facade/opf-gift-card.facade';
import { OpfGiftCards } from '../../root/model/opf-gift-card.model';
import { OutletModule } from '@spartacus/storefront';

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

  @Input() opfGiftCards: OpfGiftCards[];
  
  removeGiftCard(giftCardId: string) {
    this.giftCardFacade.removeGiftCard(giftCardId).subscribe({
      next: () => {
        this.activeCartFacade.reloadActiveCart();
        this.globalMessageService.add(
          { key: 'opfGiftCard.removedSuccessfully' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      },
      error: (error) => {
        const message = error.details?.[0]?.message;
        this.globalMessageService.add(
          { raw: message },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      },
    });
  }
}
