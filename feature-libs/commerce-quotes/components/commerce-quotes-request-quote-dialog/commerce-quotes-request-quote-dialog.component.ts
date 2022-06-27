import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommerceQuotesFacade } from '@spartacus/commerce-quotes/root';
import { RoutingService } from '@spartacus/core';
import { FocusConfig, ICON_TYPE, ModalService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cx-commerce-quotes-request-quote-dialog',
  templateUrl: './commerce-quotes-request-quote-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesRequestQuoteDialogComponent {
  iconTypes = ICON_TYPE;
  cartId: string;
  requestInProgress$ = new BehaviorSubject<boolean>(false);

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    comment: new FormControl('', [Validators.required]),
  });

  constructor(
    protected modalService: ModalService,
    protected commerceQuotesFacade: CommerceQuotesFacade,
    protected routingService: RoutingService
  ) {}

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  onSubmit(goToDetails?: boolean): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.requestInProgress$.next(true);
      this.commerceQuotesFacade
        .createQuote(
          { name: this.form.controls.name.value },
          { text: this.form.controls.comment.value }
        )
        .subscribe((quote) => {
          if (goToDetails) {
            this.routingService.go({
              cxRoute: 'quoteEdit',
              params: { quoteId: quote.code },
            });
          }

          this.modalService.dismissActiveModal();
        });
    }
  }
}
