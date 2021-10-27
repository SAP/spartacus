import { EventEmitter, Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  Product,
} from '@spartacus/core';
import { ProductReference } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import {
  VisualizationLoadInfo,
  VisualizationLoadResult,
} from '../../visual-viewer/models/visualization-load-info';
import { VisualViewerService } from '../../visual-viewer/visual-viewer.service';
import { VisualPickingProductListService } from '../visual-picking-product-list/visual-picking-product-list.service';

@Injectable({
  providedIn: 'any',
})
export class VisualPickingTabService {
  constructor(
    protected currentProductService: CurrentProductService,
    protected globalMessageService: GlobalMessageService
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

    this.currentProductService.getProduct().subscribe((currentProduct) => {
      if (!currentProduct || !currentProduct.code) {
        return;
      }
      this.visualViewerService
        .loadVisualization((currentProduct as Product).code as string)
        .subscribe((visualizationLoadInfo: VisualizationLoadInfo) =>
          this.handleLoadVisualizationResult(
            visualizationLoadInfo,
            currentProduct as Product
          )
        );
    });
  }
  public loadComplete = new EventEmitter<VisualizationLoadInfo>();

  private handleLoadVisualizationResult(
    visualizationLoadInfo: VisualizationLoadInfo,
    currentProduct: Product
  ): void {
    switch (visualizationLoadInfo.result) {
      case VisualizationLoadResult.Success:
        this.visualPickingProductListService
          .getFilteredProductReferences$()
          .subscribe((productReferences: ProductReference[]) => {
            const productCodes: string[] = productReferences.map(
              (productReference) =>
                (productReference.target as Product).code as string
            );

            this.visualViewerService.includedProductCodes = productCodes;
            this.loadComplete.emit(visualizationLoadInfo);
          });
        break;

      case VisualizationLoadResult.NoMatchFound:
        this.globalMessageService.add(
          { key: 'errors.visualLoad.noMatchingVisualFound' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
        this.loadComplete.emit(visualizationLoadInfo);
        break;

      case VisualizationLoadResult.MultipleMatchesFound:
        this.globalMessageService.add(
          { key: 'errors.visualLoad.multipleMatchingVisualsFound' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
        this.loadComplete.emit(visualizationLoadInfo);
        break;

      case VisualizationLoadResult.UnexpectedError:
        console.error(
          `Visualization load failed for product code ${currentProduct.code}: ${visualizationLoadInfo.errorMessage}`
        );
        this.globalMessageService.add(
          { key: 'errors.visualLoad.unexpectedLoadError' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
        this.loadComplete.emit(visualizationLoadInfo);
        break;
    }
  }

  private visualViewerService: VisualViewerService;
  private visualPickingProductListService: VisualPickingProductListService;
}
