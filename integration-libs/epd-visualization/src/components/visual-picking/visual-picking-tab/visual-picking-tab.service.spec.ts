import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  Product,
  ProductReference,
  ProductScope,
  Translatable,
} from '@spartacus/core';

import { VisualizationInfo } from '../../../../src/models/visualizations/visualization-info';
import {
  VisualizationLoadInfo,
  VisualizationLoadResult,
} from '../../../../src/components/visual-viewer/models/visualization-load-info';
import { CurrentProductService } from '@spartacus/storefront';
import { EpdVisualizationConfig } from '../../../../src/config/epd-visualization-config';
import { getValidConfig } from '../../../../src/config/epd-visualization-test-config';
import { from, Observable, of } from 'rxjs';
import { ContentType } from '../../visual-viewer';
import { VisualViewerService } from '../../visual-viewer/visual-viewer.service';
import { VisualPickingProductListService } from '../visual-picking-product-list/visual-picking-product-list.service';
import { VisualPickingTabService } from './visual-picking-tab.service';

const SPAREPART = 'SPAREPART';

const currentProduct: Product = {
  code: 'currentProduct',
};

const visualization: VisualizationInfo = {
  visualizationId: 'visualization id',
  version: 'visualization version',
  sceneId: 'scene id',
  folderId: 'folder id',
  category: 'category',
  contentType: ContentType.Model3D,
};

class MockGlobalMessageService {
  expectedText?: Translatable;
  expectedType?: GlobalMessageType;
  expectedTimeout?: number;

  add(text: Translatable, type: GlobalMessageType, timeout?: number): void {
    if (this.expectedText !== undefined) {
      expect(text.key).toBe(this.expectedText.key);
    }
    if (this.expectedType !== undefined) {
      expect(type).toBe(this.expectedType);
    }
    if (this.expectedTimeout !== undefined) {
      expect(timeout).toBe(this.expectedTimeout);
    }
  }
}

class MockCurrentProductService {
  currentProductObservable: Observable<Product | null>;

  getProduct(
    scopes?: (ProductScope | string)[] | ProductScope | string
  ): Observable<Product | null> {
    expect(scopes).toBeUndefined();
    return this.currentProductObservable;
  }
}

class MockVisualViewerService {
  expectedLoadVisualizationProductCode?: string;
  loadVisualizationResponse: Observable<VisualizationLoadInfo>;

  expectedIncludedProductCodes: string[];

  public loadVisualization(
    productCode: string
  ): Observable<VisualizationLoadInfo> {
    if (this.expectedLoadVisualizationProductCode !== undefined) {
      expect(productCode).toBe(this.expectedLoadVisualizationProductCode);
    }
    if (!this.loadVisualizationResponse) {
      throw new Error('loadVisualizationResponse was not set');
    }
    return this.loadVisualizationResponse;
  }

  set includedProductCodes(includedProductCodes: string[]) {
    if (this.expectedIncludedProductCodes !== undefined) {
      expect(includedProductCodes).toEqual(this.expectedIncludedProductCodes);
    }
  }
}

class MockVisualPickingProductListService {
  getFilteredProductReferencesResponse: Observable<ProductReference[]>;

  getFilteredProductReferences$(): Observable<ProductReference[]> {
    return this.getFilteredProductReferencesResponse;
  }
}

describe('VisualPickingTabService', () => {
  let mockGlobalMessageService: MockGlobalMessageService;
  let mockVisualViewerService: MockVisualViewerService;
  let visualViewerService: VisualViewerService;
  let mockVisualPickingProductListService =
    new MockVisualPickingProductListService();
  let visualPickingProductListService: VisualPickingProductListService;
  let visualPickingTabService: VisualPickingTabService;
  let mockCurrentProductService: MockCurrentProductService;

  beforeEach(() => {
    mockGlobalMessageService = new MockGlobalMessageService();
    mockVisualViewerService = new MockVisualViewerService();
    mockCurrentProductService = new MockCurrentProductService();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: EpdVisualizationConfig,
          useValue: getValidConfig(),
        },
        {
          provide: CurrentProductService,
          useValue: mockCurrentProductService,
        },
        {
          provide: GlobalMessageService,
          useValue: mockGlobalMessageService,
        },
        {
          provide: VisualViewerService,
          useValue: mockVisualViewerService,
        },
        {
          provide: VisualPickingProductListService,
          useValue: mockVisualPickingProductListService,
        },
      ],
    });

    visualViewerService = TestBed.inject(VisualViewerService);
    visualPickingProductListService = TestBed.inject(
      VisualPickingProductListService
    );

    visualPickingTabService = TestBed.inject(VisualPickingTabService);
  });

  describe('initialize', () => {
    it('should show warning when no visualization found', (done) => {
      mockCurrentProductService.currentProductObservable = of({
        code: 'currentProduct',
      });

      mockVisualViewerService.loadVisualizationResponse = of({
        result: VisualizationLoadResult.NoMatchFound,
      });

      mockGlobalMessageService.expectedText = {
        key: 'errors.visualLoad.noMatchingVisualFound',
      };
      mockGlobalMessageService.expectedType = GlobalMessageType.MSG_TYPE_ERROR;

      visualPickingTabService.loadComplete.subscribe(
        (visualizationLoadInfo: VisualizationLoadInfo) => {
          expect(visualizationLoadInfo).toBeTruthy();
          expect(visualizationLoadInfo.result).toBe(
            VisualizationLoadResult.NoMatchFound
          );
          done();
        }
      );
      visualPickingTabService.initialize(
        visualViewerService,
        visualPickingProductListService
      );
    });

    it('should show warning when multiple visualization matches found', (done) => {
      mockCurrentProductService.currentProductObservable = of({
        code: 'currentProduct',
      });

      mockVisualViewerService.loadVisualizationResponse = of({
        result: VisualizationLoadResult.MultipleMatchesFound,
      });

      mockGlobalMessageService.expectedText = {
        key: 'errors.visualLoad.multipleMatchingVisualsFound',
      };
      mockGlobalMessageService.expectedType = GlobalMessageType.MSG_TYPE_ERROR;

      visualPickingTabService.loadComplete.subscribe(
        (visualizationLoadInfo: VisualizationLoadInfo) => {
          expect(visualizationLoadInfo).toBeTruthy();
          expect(visualizationLoadInfo.result).toBe(
            VisualizationLoadResult.MultipleMatchesFound
          );
          expect(visualizationLoadInfo.visualization).toBeUndefined();
          expect(visualizationLoadInfo.matches).toBeUndefined();

          done();
        }
      );
      visualPickingTabService.initialize(
        visualViewerService,
        visualPickingProductListService
      );
    });

    it('should show warning when unexpected error occurs', (done) => {
      mockCurrentProductService.currentProductObservable = of({
        code: 'currentProduct',
      });

      const errorMessage = 'something bad happened';
      mockVisualViewerService.loadVisualizationResponse = of({
        result: VisualizationLoadResult.UnexpectedError,
        errorMessage: errorMessage,
      });

      mockGlobalMessageService.expectedText = {
        key: 'errors.visualLoad.unexpectedLoadError',
      };
      mockGlobalMessageService.expectedType = GlobalMessageType.MSG_TYPE_ERROR;

      visualPickingTabService.loadComplete.subscribe(
        (visualizationLoadInfo: VisualizationLoadInfo) => {
          expect(visualizationLoadInfo).toBeTruthy();
          expect(visualizationLoadInfo.result).toBe(
            VisualizationLoadResult.UnexpectedError
          );
          expect(visualizationLoadInfo.visualization).toBeUndefined();
          expect(visualizationLoadInfo.matches).toBeUndefined();
          expect(visualizationLoadInfo.errorMessage).toEqual(errorMessage);

          done();
        }
      );
      visualPickingTabService.initialize(
        visualViewerService,
        visualPickingProductListService
      );
    });

    it('should load visualization and set includeProductCodes property on VisualViewerService on success', (done) => {
      mockCurrentProductService.currentProductObservable = of(currentProduct);
      mockVisualViewerService.expectedLoadVisualizationProductCode =
        currentProduct.code as string;
      mockVisualViewerService.loadVisualizationResponse = of({
        result: VisualizationLoadResult.Success,
        visualization: visualization,
        matches: [visualization],
      });

      const productReferences: ProductReference[] = [
        {
          referenceType: SPAREPART,
          target: { code: 'sparePart1' },
        },
        {
          target: { code: 'sparePart2' },
        },
      ];

      mockVisualPickingProductListService.getFilteredProductReferencesResponse =
        of(productReferences);

      mockVisualViewerService.expectedIncludedProductCodes =
        productReferences.map((pr) => pr.target?.code as string);

      visualPickingTabService.loadComplete.subscribe(
        (visualizationLoadInfo: VisualizationLoadInfo) => {
          expect(visualizationLoadInfo).toBeTruthy();
          expect(visualizationLoadInfo.result).toBe(
            VisualizationLoadResult.Success
          );
          expect(visualizationLoadInfo.visualization).toBeTruthy();
          expect(visualizationLoadInfo.matches).toBeTruthy();
          expect(visualizationLoadInfo.errorMessage).toBeUndefined();
          done();
        }
      );
      visualPickingTabService.initialize(
        visualViewerService,
        visualPickingProductListService
      );
    });

    it('should ignore product with no product code (but load a subsequent valid product)', (done) => {
      const currentProduct: Product = {
        code: 'currentProduct',
      };

      mockCurrentProductService.currentProductObservable = from([
        null,
        { code: undefined },
        currentProduct,
      ]);
      mockVisualViewerService.expectedLoadVisualizationProductCode =
        currentProduct.code as string;
      mockVisualViewerService.loadVisualizationResponse = of({
        result: VisualizationLoadResult.Success,
        visualization: visualization,
        matches: [visualization],
      });

      const productReferences: ProductReference[] = [
        {
          referenceType: SPAREPART,
          target: { code: 'sparePart1' },
        },
        {
          target: { code: 'sparePart2' },
        },
      ];

      mockVisualPickingProductListService.getFilteredProductReferencesResponse =
        of(productReferences);

      mockVisualViewerService.expectedIncludedProductCodes =
        productReferences.map((pr) => pr.target?.code as string);

      visualPickingTabService.loadComplete.subscribe(
        (visualizationLoadInfo: VisualizationLoadInfo) => {
          expect(visualizationLoadInfo).toBeTruthy();
          expect(visualizationLoadInfo.result).toBe(
            VisualizationLoadResult.Success
          );
          expect(visualizationLoadInfo.visualization).toBeTruthy();
          expect(visualizationLoadInfo.matches).toBeTruthy();
          expect(visualizationLoadInfo.errorMessage).toBeUndefined();
          done();
        }
      );
      visualPickingTabService.initialize(
        visualViewerService,
        visualPickingProductListService
      );
    });
  });
});
