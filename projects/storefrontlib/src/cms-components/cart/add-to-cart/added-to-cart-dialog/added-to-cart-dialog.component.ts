import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ActiveCartService,
  Cart,
  OrderEntry,
  PromotionLocation,
  PromotionResult,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import {
  filter,
  map,
  pluck,
  shareReplay,
  startWith,
  switchMap,
  switchMapTo,
  tap,
} from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';

@Component({
  selector: 'cx-added-to-cart-dialog',
  templateUrl: './added-to-cart-dialog.component.html',
})
export class AddedToCartDialogComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;

  entry$: Observable<OrderEntry>;
  cart$: Observable<Cart>;
  loaded$: Observable<boolean>;
  addedEntryWasMerged$: Observable<boolean>;
  /**
   * @deprecated since 3.0, set numberOfEntriesBeforeAdd instead
   */
  increment: boolean;
  numberOfEntriesBeforeAdd: number;
  orderPromotions$: Observable<PromotionResult[]>;
  promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  quantity = 0;
  modalIsOpen = false;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  form: FormGroup = new FormGroup({});

  private quantityControl$: Observable<FormControl>;

  private subscription = new Subscription();

  constructor(
    protected modalService: ModalService,
    protected cartService: ActiveCartService,
    protected promotionService: PromotionService,
    protected routingService: RoutingService
  ) {}
  /**
   * Returns an observable formControl with the quantity of the cartEntry,
   * but also updates the entry in case of a changed value.
   * The quantity can be set to zero in order to remove the entry.
   */
  getQuantityControl(): Observable<FormControl> {
    if (!this.quantityControl$) {
      this.quantityControl$ = this.entry$.pipe(
        filter((e) => !!e),
        map((entry) => this.getFormControl(entry)),
        switchMap(() =>
          this.form.valueChanges.pipe(
            // tslint:disable-next-line:deprecation
            startWith(null),
            tap((valueChange) => {
              if (valueChange) {
                this.cartService.updateEntry(
                  valueChange.entryNumber,
                  valueChange.quantity
                );
                if (valueChange.quantity === 0) {
                  this.dismissModal('Removed');
                }
              } else {
                this.form.markAsPristine();
              }
            })
          )
        ),
        map(() => <FormControl>this.form.get('quantity')),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.quantityControl$;
  }

  ngOnInit() {
    this.orderPromotions$ = this.promotionService.getOrderPromotions(
      this.promotionLocation
    );
    this.addedEntryWasMerged$ = this.loaded$.pipe(
      filter((loaded) => loaded),
      switchMapTo(this.cartService.getEntries()),
      map((entries) => entries.length === this.numberOfEntriesBeforeAdd)
    );

    // close modal on the router navigation (i.e. after clicking link):
    this.subscription.add(
      this.routingService
        .getRouterState()
        .pipe(
          pluck('nextState'),
          filter((nextState) => !!nextState) // wait for navigation start
        )
        .subscribe((nextState) => {
          this.dismissModal(`Navigation to URL: ${nextState.url}`);
        })
    );
  }

  private getFormControl(entry: OrderEntry): FormControl {
    if (!this.form.get('quantity')) {
      const quantity = new FormControl(entry.quantity, { updateOn: 'blur' });
      this.form.addControl('quantity', quantity);

      const entryNumber = new FormControl(entry.entryNumber);
      this.form.addControl('entryNumber', entryNumber);
    }
    return <FormControl>this.form.get('quantity');
  }

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
