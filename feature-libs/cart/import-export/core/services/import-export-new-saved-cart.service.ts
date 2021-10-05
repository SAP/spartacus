import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { Observable, of, queueScheduler } from 'rxjs';
import {
  Cart,
  MultiCartService,
  OrderEntry,
  StateUtils,
  UserIdService,
} from '@spartacus/core';
import { ProductsData } from '@spartacus/cart/import-export/core';
import {
  delayWhen,
  filter,
  map,
  observeOn,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AbstractImportExportCartService } from './abstract-import-export-cart.service';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';

@Injectable({
  providedIn: 'root',
})
export class ImportExportNewSavedCartService extends AbstractImportExportCartService {
  constructor(
    protected actionsSubject: ActionsSubject,
    protected userIdService: UserIdService,
    protected multiCartService: MultiCartService,
    protected savedCartService: SavedCartFacade
  ) {
    super(actionsSubject);
  }

  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }

  addEntries(
    products: ProductsData,
    savedCartInfo?: { name: string; description: string }
  ): Observable<string> {
    return this.userIdService.takeUserId().pipe(
      switchMap((userId: string) =>
        this.multiCartService
          .createCart({
            userId,
            extraData: { active: false },
          })
          .pipe(
            filter((cartData: StateUtils.ProcessesLoaderState<Cart>) =>
              Boolean(cartData.value?.code)
            ),
            map(
              (cartData: StateUtils.ProcessesLoaderState<Cart>) =>
                cartData.value?.code as string
            ),
            tap((cartId: string) => {
              this.savedCartService.saveCart({
                cartId,
                saveCartName: savedCartInfo?.name,
                saveCartDescription: savedCartInfo?.description,
              });
              this.savedCartService.loadSavedCarts();
            }),
            observeOn(queueScheduler),
            delayWhen(() =>
              this.savedCartService
                .getSaveCartProcessLoading()
                .pipe(filter((loading) => !loading))
            ),
            tap((cartId: string) =>
              this.multiCartService.addEntries(userId, cartId, products)
            )
          )
      )
    );
  }
}
