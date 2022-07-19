import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CQConfig } from '@spartacus/commerce-quotes/core';
import {
  CommerceQuotesFacade,
  QuoteAction,
  QuoteMetadata,
} from '@spartacus/commerce-quotes/root';
import { RoutingService } from '@spartacus/core';
import { FocusConfig, ICON_TYPE, ModalService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cx-commerce-quotes-request-quote-dialog',
  templateUrl: './commerce-quotes-request-quote-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesRequestQuoteDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;
  cartId: string;
  requestInProgress$ = new BehaviorSubject<boolean>(false);
  minRequestInitiationValue =
    this.config.commerceQuotes?.tresholds?.requestInitiation;

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
    protected routingService: RoutingService,
    protected config: CQConfig
  ) {}

  ngOnInit(): void {}

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  onSubmit(goToDetails?: boolean): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    } else {
      const quoteCreationPayload: QuoteMetadata = {
        name: this.form.controls.name.value,
      };

      if (this.form.controls.description.value.length) {
        quoteCreationPayload.description = this.form.controls.description.value;
      }
      this.requestInProgress$.next(true);
      this.commerceQuotesFacade
        .createQuote(quoteCreationPayload, {
          text: this.form.controls.comment.value,
        })
        .subscribe((quote) => {
          if (goToDetails) {
            this.routingService.go({
              cxRoute: 'quoteDetails',
              params: { quoteId: quote.code },
            });
          } else {
            this.commerceQuotesFacade.performQuoteAction(
              quote.code,
              QuoteAction.SUBMIT
            );
          }

          this.modalService.dismissActiveModal();
        });
    }
  }
}
