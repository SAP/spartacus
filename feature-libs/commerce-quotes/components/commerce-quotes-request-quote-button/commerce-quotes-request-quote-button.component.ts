import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CommerceQuotesRequestQuoteDialogComponent } from '../commerce-quotes-request-quote-dialog/commerce-quotes-request-quote-dialog.component';

@Component({
  selector: 'cx-commerce-quotes-request-quote-button',
  templateUrl: './commerce-quotes-request-quote-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesRequestQuoteButtonComponent implements OnInit {
  modalRef: ModalRef;
  cartId$: Observable<string>;

  constructor(
    protected modalService: ModalService,
    protected activeCartService: ActiveCartFacade
  ) {}

  ngOnInit(): void {
    this.cartId$ = this.activeCartService.getActiveCartId();
  }

  showDialog() {
    console.log('showDialog');
    this.activeCartService
      .getActiveCartId()
      .pipe(
        take(1),
        tap((cartId: string) => {
          let modalInstance: any;
          this.modalRef = this.modalService.open(
            CommerceQuotesRequestQuoteDialogComponent,
            {
              centered: true,
              size: 'lg',
            }
          );
          modalInstance = this.modalRef.componentInstance;
          modalInstance.cartId = cartId;
        })
      )
      .subscribe();
  }
}
