import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ActiveCartFacade,
  EntryGroup,
  MultiCartFacade,
  OrderEntry,
} from '@spartacus/cart/base/root';
import {
  BundleSelectors,
  BundleService,
  CartBundleService,
  ProductBtnActionTypes,
  ProductSelectionState,
  StateWithBundle,
} from '@spartacus/cart/bundle/core';
import { Product, RoutingService, UserIdService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';

import {
  BundleProgressService,
  PREVIEW_STEP,
} from './components/bundle-progress/bundle-progress.service';

@Component({
  selector: 'cx-bundle-main',
  templateUrl: './bundle-main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BundleMainComponent implements OnInit, OnDestroy {
  cartId$: Observable<string> = this.activeCartService.getActiveCartId();
  entryGroupNo$: Observable<number> = this.route.queryParams.pipe(
    map((params) => Number.parseInt(params.edit, 10))
  );

  bundle$: Observable<EntryGroup | undefined> = combineLatest([
    this.activeCartService.getEntryGroups(),
    this.entryGroupNo$,
  ]).pipe(
    map(([entryGroups, entryGroupNo]) => {
      return entryGroups.find(
        (entryGroup) => entryGroup.entryGroupNumber === entryGroupNo
      );
    })
  );
  bundleSections$: Observable<EntryGroup[]> = this.bundle$.pipe(
    map((bundle) => bundle?.entryGroups ?? [])
  );

  activeSectionProducts$: Observable<Product[]>;
  allSelectedProducts$: Observable<Product[]>;
  selectedProductsPerSection$: Observable<Record<number, Product[]>>;

  isPreview$: Observable<boolean>;

  private subscription = new Subscription();

  iconTypes = ICON_TYPE;
  productBtnActions = ProductBtnActionTypes;

  constructor(
    protected multiCartService: MultiCartFacade,
    protected bundleService: BundleService,
    protected cartBundleService: CartBundleService,
    public bundleProgress: BundleProgressService,
    protected userIdService: UserIdService,
    protected store: Store<StateWithBundle>,
    protected routingService: RoutingService,
    protected route: ActivatedRoute,
    protected activeCartService: ActiveCartFacade
  ) {}

  ngOnInit() {
    this.bundle$.subscribe(console.log);

    this.initActiveSectionProducts();
    this.initSelectedProducts();
    this.isPreview$ = this.bundleProgress.activeStep$.pipe(
      map((step) => step?.key === PREVIEW_STEP.key)
    );
    this.initBundleProgressSteps();
    this.getAllowedProducts();
  }

  toggleProductSelection(
    { product }: ProductSelectionState,
    sectionId: number
  ) {
    this.activeCartService.addToEntryGroup(
      sectionId ? sectionId : (this.activeStep.key as number),
      product as OrderEntry
    );
  }

  get activeStep() {
    return this.bundleProgress.activeStep;
  }

  editSection(productCode: string) {
    this.selectedProductsPerSection$.pipe(take(1)).subscribe((selections) => {
      const key = Object.entries(selections).find(([_, products]) => {
        return Boolean(
          products.find((product) => product.code === productCode)
        );
      })?.[0];
      if (key) {
        this.bundleProgress.goToStep(key);
      }
    });
  }

  onNext() {
    this.bundleProgress.onNext();
  }

  onPrev() {
    this.bundleProgress.onPrev();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private initActiveSectionProducts(): void {
    this.activeSectionProducts$ = this.bundleProgress.activeStep$.pipe(
      withLatestFrom(this.bundleSections$, this.cartId$),
      switchMap(([activeStep, bundleSections, cartId]) => {
        const group = bundleSections.find(
          ({ entryGroupNumber }) => entryGroupNumber === activeStep?.key
        );
        return this.store.select(
          BundleSelectors.getAvailableEntryGroupEntries(
            cartId,
            group?.entryGroupNumber as number
          )
        );
      })
    );
  }

  private initBundleProgressSteps() {
    this.subscription.add(
      this.bundleSections$
        .pipe(
          map((sections) =>
            sections.map(({ entryGroupNumber, label }) => ({
              key: entryGroupNumber as number,
              label: label ?? '',
            }))
          ),
          filter((sections) => sections?.length > 0)
        )
        .subscribe((steps) => {
          this.bundleProgress.init(
            [...steps, PREVIEW_STEP],
            // TODO: Start step should not be hardcoded and should be used for bundle edition mode
            1
          );
        })
    );
  }

  private getAllowedProducts() {
    this.subscription.add(
      this.bundle$
        .pipe(withLatestFrom(this.cartId$, this.userIdService.getUserId()))
        .subscribe(([bundle, cartId, userId]) => {
          bundle?.entryGroups?.forEach((section) => {
            this.bundleService.getBundleAllowedProducts(
              cartId,
              userId,
              section.entryGroupNumber as number
            );
          });
        })
        .unsubscribe()
    );
  }

  private initSelectedProducts(): void {
    this.selectedProductsPerSection$ = combineLatest([
      this.bundle$,
      this.cartId$,
    ]).pipe(
      switchMap(([bundle, cartId]) =>
        this.bundleService.getBundleSelectedProducts(
          cartId,
          bundle.entryGroupNumber as number
        )
      )
    );

    this.allSelectedProducts$ = this.selectedProductsPerSection$.pipe(
      map((selections) => Object.values(selections ?? {}).flat())
    );
  }
}
