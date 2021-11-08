import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  Product,
  ProductReference,
  ProductScope,
  Translatable,
  MockTranslatePipe,
} from '@spartacus/core';

import {
  VisualizationLoadInfo,
  VisualizationLoadStatus,
  VisualizationLookupResult,
} from '../../../../src/components/visual-viewer/models/visualization-load-info';
import { CurrentProductService } from '@spartacus/storefront';
import { EpdVisualizationConfig } from '../../../../src/config/epd-visualization-config';
import { getValidConfig } from '../../../../src/config/epd-visualization-test-config';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { VisualViewerService } from '../../visual-viewer/visual-viewer.service';
import { VisualPickingProductListService } from '../visual-picking-product-list/visual-picking-product-list.service';
import { VisualPickingTabService } from './visual-picking-tab.service';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { SceneLoadInfo } from '../../visual-viewer/models/scene-load-info';

const SPAREPART = 'SPAREPART';

const currentProduct: Product = {
  code: 'currentProduct',
};

const productReferences: ProductReference[] = [
  {
    referenceType: SPAREPART,
    target: { code: 'sparePart1' },
  },
  {
    referenceType: SPAREPART,
    target: { code: 'sparePart2' },
  },
];

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

  loadVisualization(productCode: string): Observable<VisualizationLoadInfo> {
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

  sceneLoadInfo$ = new Subject<SceneLoadInfo>();

  selectedProductCodes: string[];
  selectedProductCodesChange = new EventEmitter<string[]>();

  get visualizationLoadInfoChange() {
    return new EventEmitter<VisualizationLoadInfo>();
  }

  setVisualizationLoadInfo(visualizationLoadInfo: VisualizationLoadInfo) {
    this._visualizationLoadInfo = visualizationLoadInfo;
  }
  get visualizationLoadInfo(): VisualizationLoadInfo {
    return this._visualizationLoadInfo;
  }
  private _visualizationLoadInfo: VisualizationLoadInfo;
}

class MockVisualPickingProductListService {
  getProductReferencesResponse: Observable<ProductReference[]>;
  getFilteredProductReferencesResponse: Observable<ProductReference[]>;

  getProductReferences$(): Observable<ProductReference[]> {
    return this.getProductReferencesResponse;
  }
  getFilteredProductReferences$(): Observable<ProductReference[]> {
    return this.getFilteredProductReferencesResponse;
  }

  currentProduct$: Observable<Product> = of(currentProduct);

  selectedProductCodes: string[];
  selectedProductCodesChange = new EventEmitter<string[]>();
}

class MockChangeDetectorRef {
  markForCheck(): void {}
  detach(): void {}
  detectChanges(): void {}
  checkNoChanges(): void {}
  reattach(): void {}
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
  let mockChangeDetectorRef = new MockChangeDetectorRef();

  beforeEach(() => {
    mockGlobalMessageService = new MockGlobalMessageService();
    mockVisualViewerService = new MockVisualViewerService();
    mockCurrentProductService = new MockCurrentProductService();

    TestBed.configureTestingModule({
      declarations: [MockTranslatePipe],
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
        {
          provide: ChangeDetectorRef,
          useValue: mockChangeDetectorRef,
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
    it('should call visualViewerService.loadVisualization when product references available', () => {
      const mockVisualizationLoadInfoChange = {
        subscribe: (
          _next?: (value: string[]) => void,
          _error?: (error: any) => void,
          _complete?: () => void
        ) => Subscription,
      };

      const getVisualViewerServiceVisualizationLoadInfoChangePropertySpy =
        spyOnProperty(
          mockVisualViewerService,
          'visualizationLoadInfoChange',
          'get'
        ).and.returnValue(mockVisualizationLoadInfoChange);
      const mockVisualizationLoadInfoChangeSubscribeSpy = spyOn(
        mockVisualizationLoadInfoChange,
        'subscribe'
      );

      const mockVisualPickingProductListService = {
        getProductReferences$: () => {
          return of(productReferences);
        },

        currentProduct$: of(currentProduct),
      };

      const getVisualPickingProductListServicePropertySpy = spyOnProperty<any>(
        visualPickingTabService,
        'visualPickingProductListService',
        'get'
      ).and.returnValue(mockVisualPickingProductListService);

      const loadVisualizationSpy = spyOn(
        visualViewerService,
        'loadVisualization'
      ).and.returnValue(
        of(<VisualizationLoadInfo>{
          lookupResult: VisualizationLookupResult.UniqueMatchFound,
          loadStatus: VisualizationLoadStatus.Loaded,
        })
      );

      visualPickingTabService.initialize(
        visualViewerService,
        visualPickingProductListService
      );

      expect(
        getVisualViewerServiceVisualizationLoadInfoChangePropertySpy
      ).toHaveBeenCalledTimes(1);
      expect(mockVisualizationLoadInfoChangeSubscribeSpy).toHaveBeenCalledTimes(
        1
      );
      expect(getVisualPickingProductListServicePropertySpy).toHaveBeenCalled();

      expect(loadVisualizationSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call visualViewerService.loadVisualization when no product references available', () => {
      const mockVisualizationLoadInfoChange = {
        subscribe: (
          _next?: (value: string[]) => void,
          _error?: (error: any) => void,
          _complete?: () => void
        ) => Subscription,
      };

      const getVisualViewerServiceVisualizationLoadInfoChangePropertySpy =
        spyOnProperty(
          mockVisualViewerService,
          'visualizationLoadInfoChange',
          'get'
        ).and.returnValue(mockVisualizationLoadInfoChange);
      const mockVisualizationLoadInfoChangeSubscribeSpy = spyOn(
        mockVisualizationLoadInfoChange,
        'subscribe'
      );

      const mockVisualPickingProductListService = {
        getProductReferences$: () => {
          return of([]);
        },

        currentProduct$: of(currentProduct),
      };

      const getVisualPickingProductListServicePropertySpy = spyOnProperty<any>(
        visualPickingTabService,
        'visualPickingProductListService',
        'get'
      ).and.returnValue(mockVisualPickingProductListService);

      const loadVisualizationSpy = spyOn(
        visualViewerService,
        'loadVisualization'
      ).and.returnValue(
        of(<VisualizationLoadInfo>{
          lookupResult: VisualizationLookupResult.UniqueMatchFound,
          loadStatus: VisualizationLoadStatus.Loaded,
        })
      );

      visualPickingTabService.initialize(
        visualViewerService,
        visualPickingProductListService
      );

      expect(
        getVisualViewerServiceVisualizationLoadInfoChangePropertySpy
      ).toHaveBeenCalledTimes(1);
      expect(mockVisualizationLoadInfoChangeSubscribeSpy).toHaveBeenCalledTimes(
        1
      );
      expect(getVisualPickingProductListServicePropertySpy).toHaveBeenCalled();

      expect(loadVisualizationSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('productReferences', () => {
    it('should return the value that was set', () => {
      visualPickingTabService['setProductReferences'](productReferences);
      expect(visualPickingTabService['productReferences']).toBe(
        productReferences
      );
    });
  });

  describe('hideNoProductReferencesText', () => {
    it('should return true when product references have not been retrieved', () => {
      expect(visualPickingTabService['productReferences']).toBeUndefined();
      expect(visualPickingTabService.hideNoProductReferencesText).toEqual(true);
    });

    it('should return false when no product references of required type exist for current product', () => {
      visualPickingTabService['setProductReferences']([]);
      expect(visualPickingTabService.hideNoProductReferencesText).toEqual(
        false
      );
    });

    it('should return true when one or more product references of required type exists for current product', () => {
      visualPickingTabService['setProductReferences'](productReferences);
      expect(visualPickingTabService.hideNoProductReferencesText).toEqual(true);
    });
  });

  describe('visualizationLoadStatus', () => {
    it('should return NotStarted when visualizationLoadInfo not initialized', () => {
      visualPickingTabService.visualViewerService = visualViewerService;
      expect(visualViewerService.visualizationLoadInfo).toBeUndefined();
      expect(visualPickingTabService['visualizationLoadStatus']).toEqual(
        VisualizationLoadStatus.NotStarted
      );
    });

    it('should return visualizationLoadInfo.loadStatus when visualizationLoadInfo is initialized', () => {
      visualPickingTabService.visualViewerService = visualViewerService;
      visualViewerService['setVisualizationLoadInfo']({
        lookupResult: VisualizationLookupResult.UniqueMatchFound,
        loadStatus: VisualizationLoadStatus.Loaded,
      });
      expect(visualPickingTabService['visualizationLoadStatus']).toEqual(
        VisualizationLoadStatus.Loaded
      );
    });
  });

  describe('hideProductList', () => {
    it('should return true when product references have not been retrieved', () => {
      expect(visualPickingTabService['productReferences']).toBeUndefined();
      expect(visualPickingTabService.hideProductList).toEqual(true);
    });

    it('should return true when no product references of required type exist for current product', () => {
      visualPickingTabService['setProductReferences']([]);
      expect(visualPickingTabService.hideProductList).toEqual(true);
    });

    it('should return true when one or more product references of required type exists for current product', () => {
      visualPickingTabService['setProductReferences'](productReferences);
      expect(visualPickingTabService.hideProductList).toEqual(false);
    });
  });

  describe('hideViewport', () => {
    it('should return true when product references have not been retrieved', () => {
      expect(visualPickingTabService['productReferences']).toBeUndefined();
      expect(visualPickingTabService.hideViewport).toEqual(true);
    });

    it('should return true when no product references of required type exist for current product', () => {
      visualPickingTabService['setProductReferences']([]);
      expect(visualPickingTabService.hideViewport).toEqual(true);
    });

    it('should return true when one or more product references of required type exists for current product and visualizationLoadStatus is NotStarted', () => {
      visualPickingTabService['setProductReferences'](productReferences);
      spyOnProperty<any>(
        visualPickingTabService,
        'visualizationLoadStatus',
        'get'
      ).and.returnValue(VisualizationLoadStatus.NotStarted);
      expect(visualPickingTabService.hideViewport).toEqual(true);
    });

    it('should return false when one or more product references of required type exists for current product and visualizationLoadStatus is Loading', () => {
      visualPickingTabService['setProductReferences'](productReferences);
      spyOnProperty<any>(
        visualPickingTabService,
        'visualizationLoadStatus',
        'get'
      ).and.returnValue(VisualizationLoadStatus.Loading);
      expect(visualPickingTabService.hideViewport).toEqual(false);
    });

    it('should return false when one or more product references of required type exists for current product and visualizationLoadStatus is Loaded', () => {
      visualPickingTabService['setProductReferences'](productReferences);
      spyOnProperty<any>(
        visualPickingTabService,
        'visualizationLoadStatus',
        'get'
      ).and.returnValue(VisualizationLoadStatus.Loading);
      expect(visualPickingTabService.hideViewport).toEqual(false);
    });

    it('should return true when one or more product references of required type exists for current product and visualizationLoadStatus is UnexpectedError', () => {
      visualPickingTabService['setProductReferences'](productReferences);
      spyOnProperty<any>(
        visualPickingTabService,
        'visualizationLoadStatus',
        'get'
      ).and.returnValue(VisualizationLoadStatus.UnexpectedError);
      expect(visualPickingTabService.hideViewport).toEqual(true);
    });
  });

  describe('showErrorMessage', () => {
    it('should not do anything when showErrorMessages is false', () => {
      visualPickingTabService['showErrorMessages'] = false;

      const mockGlobalMessageServiceAddSpy = spyOn(
        mockGlobalMessageService,
        'add'
      );

      visualPickingTabService['showErrorMessage']('some error message');
      visualPickingTabService['showErrorMessage'](<Translatable>{
        message: 'someTranslatableKey',
      });

      expect(mockGlobalMessageServiceAddSpy).toHaveBeenCalledTimes(0);
    });

    it('should call globalMessageService.add when showErrorMessages is true', () => {
      expect(visualPickingTabService['showErrorMessages']).toEqual(true);

      const mockGlobalMessageServiceAddSpy = spyOn(
        mockGlobalMessageService,
        'add'
      );

      visualPickingTabService['showErrorMessage']('some error message');
      visualPickingTabService['showErrorMessage'](<Translatable>{
        message: 'someTranslatableKey',
      });

      expect(mockGlobalMessageServiceAddSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('setupVisualFilteringSubscription', () => {
    it('should set visualViewerService.includedProductCodes with product codes from product references produced by getFilteredProductReferences$()', () => {
      visualPickingTabService.visualPickingProductListService =
        visualPickingProductListService;
      visualPickingTabService.visualViewerService = visualViewerService;

      spyOn(
        visualPickingProductListService,
        'getFilteredProductReferences$'
      ).and.returnValue(of(productReferences));

      const setIncludedProductCodesProperty = spyOnProperty(
        visualViewerService,
        'includedProductCodes',
        'set'
      ).and.callThrough();

      visualPickingTabService['setupVisualFilteringSubscription']();

      expect(setIncludedProductCodesProperty).toHaveBeenCalledTimes(1);
      expect(setIncludedProductCodesProperty).toHaveBeenCalledWith([
        'sparePart1',
        'sparePart2',
      ]);
    });
  });

  describe('handleLoadVisualizationInfoChange', () => {
    it('should setup visual filtering when scene loading started', () => {
      const setupVisualFilteringSubscriptionSpy = spyOn<any>(
        visualPickingTabService,
        'setupVisualFilteringSubscription'
      );

      const mockGlobalMessageServiceAddSpy = spyOn(
        mockGlobalMessageService,
        'add'
      );

      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.UniqueMatchFound,
        loadStatus: VisualizationLoadStatus.Loading,
      });

      expect(setupVisualFilteringSubscriptionSpy).toHaveBeenCalledTimes(1);
      expect(mockGlobalMessageServiceAddSpy).toHaveBeenCalledTimes(0);
    });

    it('should not do anything (except change ref detection) when scene loaded', () => {
      const setupVisualFilteringSubscriptionSpy = spyOn<any>(
        visualPickingTabService,
        'setupVisualFilteringSubscription'
      );

      const mockGlobalMessageServiceAddSpy = spyOn(
        mockGlobalMessageService,
        'add'
      );

      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.UniqueMatchFound,
        loadStatus: VisualizationLoadStatus.Loaded,
      });

      expect(setupVisualFilteringSubscriptionSpy).toHaveBeenCalledTimes(0);
      expect(mockGlobalMessageServiceAddSpy).toHaveBeenCalledTimes(0);
    });

    it('should show error message when unexpected error occurs during load', () => {
      mockGlobalMessageService.expectedText = {
        key: 'errors.visualLoad.unexpectedLoadError',
      };
      mockGlobalMessageService.expectedType = GlobalMessageType.MSG_TYPE_ERROR;
      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.UniqueMatchFound,
        loadStatus: VisualizationLoadStatus.UnexpectedError,
      });
    });

    it('should not do anything (except change ref detection) when no match found', () => {
      // This is a common expected scenario that should not produce an error message.
      const setupVisualFilteringSubscriptionSpy = spyOn<any>(
        visualPickingTabService,
        'setupVisualFilteringSubscription'
      );

      const mockGlobalMessageServiceAddSpy = spyOn(
        mockGlobalMessageService,
        'add'
      );

      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.NoMatchFound,
        loadStatus: VisualizationLoadStatus.NotStarted,
      });

      expect(setupVisualFilteringSubscriptionSpy).toHaveBeenCalledTimes(0);
      expect(mockGlobalMessageServiceAddSpy).toHaveBeenCalledTimes(0);
    });

    it('should show error message when multiple matches found', () => {
      mockGlobalMessageService.expectedText = {
        key: 'errors.visualLoad.multipleMatchingVisualsFound',
      };
      mockGlobalMessageService.expectedType = GlobalMessageType.MSG_TYPE_ERROR;
      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.MultipleMatchesFound,
        loadStatus: VisualizationLoadStatus.NotStarted,
      });
    });

    it('should show error message when unexpected error occurs during lookup', () => {
      mockGlobalMessageService.expectedText = {
        key: 'errors.visualLoad.unexpectedLoadError',
      };
      mockGlobalMessageService.expectedType = GlobalMessageType.MSG_TYPE_ERROR;
      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.UnexpectedError,
        loadStatus: VisualizationLoadStatus.NotStarted,
      });
    });
  });

  describe('visualViewerService', () => {
    it('should return value that was set', () => {
      visualPickingTabService.visualViewerService = visualViewerService;
      expect(visualPickingTabService.visualViewerService).toBe(
        visualViewerService
      );
    });
  });

  describe('visualPickingProductListService', () => {
    it('should return value that was set', () => {
      visualPickingTabService.visualPickingProductListService =
        visualPickingProductListService;
      expect(visualPickingTabService.visualPickingProductListService).toBe(
        visualPickingProductListService
      );
    });
  });
});
