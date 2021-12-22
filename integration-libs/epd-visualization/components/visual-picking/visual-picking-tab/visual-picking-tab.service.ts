import { ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  Product,
  ProductReference,
  Translatable,
  WindowRef,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import {
  VisualizationLoadInfo,
  VisualizationLoadStatus,
  VisualizationLookupResult,
} from '../../visual-viewer/models/visualization-load-info';
import { VisualViewerService } from '../../visual-viewer/visual-viewer.service';
import { VisualPickingProductListService } from './product-list/visual-picking-product-list.service';

@Injectable({
  providedIn: 'any',
})
export class VisualPickingTabService implements OnDestroy {
  constructor(
    protected currentProductService: CurrentProductService,
    protected globalMessageService: GlobalMessageService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected windowRef: WindowRef
  ) {}

  /**
   * Initialize the service.
   * @param visualViewerService The VisualViewerService instance to use.
   * @param visualPickingProductListService The VisualPickingProductListService instance to use.
   */
  public initialize(
    visualViewerService: VisualViewerService,
    visualPickingProductListService: VisualPickingProductListService
  ): void {
    if (!this.windowRef.isBrowser()) {
      return;
    }

    this.visualViewerService = visualViewerService;
    this.visualPickingProductListService = visualPickingProductListService;

    this.visualizationLoadInfoChangeSubscription =
      this.visualViewerService.visualizationLoadInfoChange.subscribe(
        this.handleLoadVisualizationInfoChange.bind(this)
      );

    this.getFilteredProductReferencesSubscription =
      this.visualPickingProductListService
        .getFilteredProductReferences()
        .subscribe((productReferences: ProductReference[]) => {
          const productCodes: string[] = productReferences.map(
            (productReference) =>
              (productReference.target as Product).code as string
          );

          this.visualViewerService.includedProductCodes = productCodes;
        });

    this.getProductReferencesSubscription = this.visualPickingProductListService
      .getProductReferences()
      .subscribe((productReferences: ProductReference[]) => {
        this.setProductReferences(productReferences);
        if (productReferences.length > 0) {
          this.visualPickingProductListService.currentProduct$
            .pipe(first())
            .subscribe((currentProduct: Product) => {
              this.visualViewerService
                .loadVisualization(currentProduct.code as string)
                .pipe(first())
                .subscribe();
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (!this.windowRef.isBrowser()) {
      return;
    }
    this.visualizationLoadInfoChangeSubscription.unsubscribe();
    this.getProductReferencesSubscription.unsubscribe();
    this.getFilteredProductReferencesSubscription.unsubscribe();
  }

  private visualizationLoadInfoChangeSubscription: Subscription;
  private getProductReferencesSubscription: Subscription;
  private getFilteredProductReferencesSubscription: Subscription;

  /**
   * When true, error messages will be shown when visualization load/lookup failures occur.
   */
  protected showErrorMessages: boolean = true;

  private _productReferences: ProductReference[];
  private get productReferences(): ProductReference[] {
    return this._productReferences;
  }
  private setProductReferences(value: ProductReference[]) {
    this._productReferences = value;

    // hideNoProductReferencesText, hideProductList, hideViewport values may have changed
    this.changeDetectorRef.markForCheck();
  }

  private get visualizationLoadStatus(): VisualizationLoadStatus {
    return (
      this.visualViewerService.visualizationLoadInfo?.loadStatus ??
      VisualizationLoadStatus.NotStarted
    );
  }

  public get hideNoProductReferencesText() {
    if (!this.windowRef.isBrowser()) {
      return true;
    }
    return (
      this.productReferences === undefined ||
      (this.productReferences as ProductReference[]).length > 0
    );
  }

  public get hideProductList() {
    if (!this.windowRef.isBrowser()) {
      return true;
    }
    return (
      this.productReferences === undefined ||
      (this.productReferences as ProductReference[]).length === 0
    );
  }

  public get hideViewport() {
    if (!this.windowRef.isBrowser()) {
      return true;
    }
    return (
      this.productReferences === undefined ||
      (this.productReferences as ProductReference[]).length === 0 ||
      !(
        this.visualizationLoadStatus === VisualizationLoadStatus.Loading ||
        this.visualizationLoadStatus === VisualizationLoadStatus.Loaded
      )
    );
  }

  private showErrorMessage(message: string | Translatable) {
    if (this.showErrorMessages) {
      this.globalMessageService.add(message, GlobalMessageType.MSG_TYPE_ERROR);
    }
  }

  private handleLoadVisualizationInfoChange(
    visualizationLoadInfo: VisualizationLoadInfo
  ): void {
    switch (visualizationLoadInfo.lookupResult) {
      case VisualizationLookupResult.UniqueMatchFound:
        switch (visualizationLoadInfo.loadStatus) {
          case VisualizationLoadStatus.Loading:
            break;

          case VisualizationLoadStatus.UnexpectedError:
            this.showErrorMessage({
              key: 'epdVisualization.errors.visualLoad.unexpectedLoadError',
            });
            break;
        }
        break;

      case VisualizationLookupResult.NoMatchFound:
        break;

      case VisualizationLookupResult.MultipleMatchesFound:
        this.showErrorMessage({
          key: 'epdVisualization.errors.visualLoad.multipleMatchingVisualsFound',
        });
        break;

      case VisualizationLookupResult.UnexpectedError:
        this.showErrorMessage({
          key: 'epdVisualization.errors.visualLoad.unexpectedLoadError',
        });
        break;
    }
    this.changeDetectorRef.detectChanges();
  }

  private _visualViewerService: VisualViewerService;
  public get visualViewerService(): VisualViewerService {
    return this._visualViewerService;
  }
  public set visualViewerService(value: VisualViewerService) {
    if (!this.windowRef.isBrowser()) {
      return;
    }
    this._visualViewerService = value;
  }

  private _visualPickingProductListService: VisualPickingProductListService;
  public get visualPickingProductListService(): VisualPickingProductListService {
    return this._visualPickingProductListService;
  }
  public set visualPickingProductListService(
    value: VisualPickingProductListService
  ) {
    if (!this.windowRef.isBrowser()) {
      return;
    }
    this._visualPickingProductListService = value;
  }
}
