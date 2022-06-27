import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { take, tap } from 'rxjs/operators';
import { CommerceQuotesRequestQuoteDialogComponent } from '../commerce-quotes-request-quote-dialog/commerce-quotes-request-quote-dialog.component';

@Component({
  selector: 'cx-commerce-quotes-request-quote-button',
  templateUrl: './commerce-quotes-request-quote-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesRequestQuoteButtonComponent {
  modalRef: ModalRef;

  constructor(
    protected modalService: ModalService,
    protected activeCartService: ActiveCartFacade
  ) {}

  showDialog() {
    this.activeCartService
      .getActiveCartId()
      .pipe(
        take(1),
        tap((cartId: string) => {
          this.modalRef = this.modalService.open(
            CommerceQuotesRequestQuoteDialogComponent,
            {
              centered: true,
              size: 'lg',
            }
          );
          this.modalRef.componentInstance.cartId = cartId;
        })
      )
      .subscribe();
  }
}
