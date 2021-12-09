import { ChangeDetectorRef, Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  Product,
  Translatable,
} from '@spartacus/core';
import { ProductReference } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
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
export class VisualPickingTabService {
  constructor(
    protected currentProductService: CurrentProductService,
    protected globalMessageService: GlobalMessageService,
    protected changeDetectorRef: ChangeDetectorRef
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
    this.visualViewerService = visualViewerService;
    this.visualPickingProductListService = visualPickingProductListService;

    this.visualViewerService.visualizationLoadInfoChange.subscribe(
      this.handleLoadVisualizationInfoChange.bind(this)
    );

    this.visualPickingProductListService
      .getProductReferences$()
      .subscribe((productReferences: ProductReference[]) => {
        this.setProductReferences(productReferences);
        if (productReferences.length > 0) {
          this.visualPickingProductListService.currentProduct$.subscribe(
            (currentProduct: Product) => {
              this.visualViewerService
                .loadVisualization(currentProduct.code as string)
                .subscribe();
            }
          );
        }
      });
  }

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
    return (
      this.productReferences === undefined ||
      (this.productReferences as ProductReference[]).length > 0
    );
  }

  public get hideProductList() {
    return (
      this.productReferences === undefined ||
      (this.productReferences as ProductReference[]).length === 0
    );
  }

  public get hideViewport() {
    return (
      this.productReferences === undefined ||
      (this.productReferences as ProductReference[]).length === 0 ||
      !(
        this.visualizationLoadStatus === VisualizationLoadStatus.Loading ||
        this.visualizationLoadStatus === VisualizationLoadStatus.Loaded
      )
    );
  }

  private setupVisualFilteringSubscription(): void {
    this.visualPickingProductListService
      .getFilteredProductReferences$()
      .subscribe((productReferences: ProductReference[]) => {
        const productCodes: string[] = productReferences.map(
          (productReference) =>
            (productReference.target as Product).code as string
        );

        this.visualViewerService.includedProductCodes = productCodes;
      });
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
            this.setupVisualFilteringSubscription();
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
    this._visualViewerService = value;
  }

  private _visualPickingProductListService: VisualPickingProductListService;
  public get visualPickingProductListService(): VisualPickingProductListService {
    return this._visualPickingProductListService;
  }
  public set visualPickingProductListService(
    value: VisualPickingProductListService
  ) {
    this._visualPickingProductListService = value;
  }
}
