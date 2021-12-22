import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  MockTranslatePipe,
  Product,
  ProductReference,
  ProductScope,
  provideConfigFactory,
  provideDefaultConfigFactory,
  Translatable,
  WindowRef,
} from '@spartacus/core';
import { getEpdVisualizationDefaultConfig } from '@spartacus/epd-visualization/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { getTestConfig } from '../../../root/testing/epd-visualization-test-config';
import { SceneLoadInfo } from '../../visual-viewer/models/scene-load-info';
import {
  VisualizationLoadInfo,
  VisualizationLoadStatus,
  VisualizationLookupResult,
} from '../../visual-viewer/models/visualization-load-info';
import { VisualViewerService } from '../../visual-viewer/visual-viewer.service';
import { VisualPickingProductListService } from './product-list/visual-picking-product-list.service';
import { VisualPickingTabService } from './visual-picking-tab.service';

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

const filteredProductReferences: ProductReference[] = [productReferences[1]];

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

  getProductReferences(): Observable<ProductReference[]> {
    return this.getProductReferencesResponse;
  }
  getFilteredProductReferences(): Observable<ProductReference[]> {
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
  let windowRef: WindowRef;

  beforeEach(() => {
    mockGlobalMessageService = new MockGlobalMessageService();
    mockVisualViewerService = new MockVisualViewerService();
    mockCurrentProductService = new MockCurrentProductService();

    TestBed.configureTestingModule({
      declarations: [MockTranslatePipe],
      providers: [
        provideConfigFactory(getTestConfig),
        provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
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

    windowRef = TestBed.inject(WindowRef);

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
        getProductReferences: () => {
          return of(productReferences);
        },

        getFilteredProductReferences: () => {
          return of(filteredProductReferences);
        },

        currentProduct$: of(currentProduct),
      };

      const getVisualPickingProductListServicePropertySpy = spyOnProperty<any>(
        visualPickingTabService,
        'visualPickingProductListService',
        'get'
      ).and.returnValue(mockVisualPickingProductListService);

      mockVisualViewerService.expectedIncludedProductCodes =
        filteredProductReferences.map(
          (productReference) => productReference.target?.code as string
        );

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
        getProductReferences: () => {
          return of([]);
        },

        getFilteredProductReferences: () => {
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

    it('should not do anything when not running in browser', () => {
      const getVisualViewerServiceVisualizationLoadInfoChangePropertySpy =
        spyOnProperty(
          mockVisualViewerService,
          'visualizationLoadInfoChange',
          'get'
        );

      mockVisualPickingProductListService.getProductReferences = () => {
        return of([]);
      };
      mockVisualPickingProductListService.getFilteredProductReferences = () => {
        return of([]);
      };
      mockVisualPickingProductListService.currentProduct$ = of(currentProduct);

      const getVisualPickingProductListServicePropertySpy = spyOnProperty<any>(
        visualPickingTabService,
        'visualPickingProductListService',
        'get'
      );

      mockVisualViewerService.expectedIncludedProductCodes =
        filteredProductReferences.map(
          (productReference) => productReference.target?.code as string
        );

      const loadVisualizationSpy = spyOn(
        visualViewerService,
        'loadVisualization'
      );

      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);

      visualPickingTabService.initialize(
        visualViewerService,
        visualPickingProductListService
      );

      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(
        getVisualViewerServiceVisualizationLoadInfoChangePropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(
        getVisualPickingProductListServicePropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(loadVisualizationSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('ngOnDestroy', () => {
    it('should do nothing when not running in browser', () => {
      mockVisualPickingProductListService.getProductReferences = () => {
        return of([]);
      };
      mockVisualPickingProductListService.getFilteredProductReferences = () => {
        return of([]);
      };
      mockVisualPickingProductListService.currentProduct$ = of(currentProduct);

      visualPickingTabService.initialize(
        visualViewerService,
        visualPickingProductListService
      );

      const visualizationLoadInfoChangeSubscriptionUnsubscribeSpy = spyOn(
        visualPickingTabService['visualizationLoadInfoChangeSubscription'],
        'unsubscribe'
      );
      const getProductReferencesSubscriptionUnsubscribeSpy = spyOn(
        visualPickingTabService['getProductReferencesSubscription'],
        'unsubscribe'
      );
      const getFilteredProductReferencesSubscriptionUnsubscribeSpy = spyOn<any>(
        visualPickingTabService['getFilteredProductReferencesSubscription'],
        'unsubscribe'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);

      visualPickingTabService.ngOnDestroy();

      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(
        visualizationLoadInfoChangeSubscriptionUnsubscribeSpy
      ).toHaveBeenCalledTimes(0);
      expect(
        getProductReferencesSubscriptionUnsubscribeSpy
      ).toHaveBeenCalledTimes(0);
      expect(
        getFilteredProductReferencesSubscriptionUnsubscribeSpy
      ).toHaveBeenCalledTimes(0);
    });

    it('should unsubscribe observable subscriptions when running in browser', () => {
      mockVisualPickingProductListService.getProductReferences = () => {
        return of([]);
      };
      mockVisualPickingProductListService.getFilteredProductReferences = () => {
        return of([]);
      };
      mockVisualPickingProductListService.currentProduct$ = of(currentProduct);

      visualPickingTabService.initialize(
        visualViewerService,
        visualPickingProductListService
      );

      const visualizationLoadInfoChangeSubscriptionUnsubscribeSpy = spyOn(
        visualPickingTabService['visualizationLoadInfoChangeSubscription'],
        'unsubscribe'
      );
      const getProductReferencesSubscriptionUnsubscribeSpy = spyOn(
        visualPickingTabService['getProductReferencesSubscription'],
        'unsubscribe'
      );
      const getFilteredProductReferencesSubscriptionUnsubscribeSpy = spyOn<any>(
        visualPickingTabService['getFilteredProductReferencesSubscription'],
        'unsubscribe'
      );

      visualPickingTabService.ngOnDestroy();

      expect(
        visualizationLoadInfoChangeSubscriptionUnsubscribeSpy
      ).toHaveBeenCalledTimes(1);
      expect(
        getProductReferencesSubscriptionUnsubscribeSpy
      ).toHaveBeenCalledTimes(1);
      expect(
        getFilteredProductReferencesSubscriptionUnsubscribeSpy
      ).toHaveBeenCalledTimes(1);
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

    it('should return true when not running in browser', () => {
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualPickingTabService['setProductReferences']([]);
      expect(visualPickingTabService.hideNoProductReferencesText).toEqual(true);
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
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

    it('should return false when one or more product references of required type exists for current product', () => {
      visualPickingTabService['setProductReferences'](productReferences);
      expect(visualPickingTabService.hideProductList).toEqual(false);
    });

    it('should return true when not running in browser', () => {
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualPickingTabService['setProductReferences'](productReferences);
      expect(visualPickingTabService.hideProductList).toEqual(true);
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
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

    it('should return true when not running in browser', () => {
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualPickingTabService['setProductReferences'](productReferences);
      spyOnProperty<any>(
        visualPickingTabService,
        'visualizationLoadStatus',
        'get'
      ).and.returnValue(VisualizationLoadStatus.Loading);
      expect(visualPickingTabService.hideViewport).toEqual(true);
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
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

  describe('handleLoadVisualizationInfoChange', () => {
    it('should not produce an error when scene loading started', () => {
      const mockGlobalMessageServiceAddSpy = spyOn(
        mockGlobalMessageService,
        'add'
      );

      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.UniqueMatchFound,
        loadStatus: VisualizationLoadStatus.Loading,
      });

      expect(mockGlobalMessageServiceAddSpy).toHaveBeenCalledTimes(0);
    });

    it('should not produce an error when when scene loaded successfully', () => {
      const mockGlobalMessageServiceAddSpy = spyOn(
        mockGlobalMessageService,
        'add'
      );

      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.UniqueMatchFound,
        loadStatus: VisualizationLoadStatus.Loaded,
      });

      expect(mockGlobalMessageServiceAddSpy).toHaveBeenCalledTimes(0);
    });

    it('should show error message when unexpected error occurs during load', () => {
      mockGlobalMessageService.expectedText = {
        key: 'epdVisualization.errors.visualLoad.unexpectedLoadError',
      };
      mockGlobalMessageService.expectedType = GlobalMessageType.MSG_TYPE_ERROR;
      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.UniqueMatchFound,
        loadStatus: VisualizationLoadStatus.UnexpectedError,
      });
    });

    it('should not do anything (except change ref detection) when no match found', () => {
      // This is a common expected scenario that should not produce an error message.
      const mockGlobalMessageServiceAddSpy = spyOn(
        mockGlobalMessageService,
        'add'
      );

      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.NoMatchFound,
        loadStatus: VisualizationLoadStatus.NotStarted,
      });

      expect(mockGlobalMessageServiceAddSpy).toHaveBeenCalledTimes(0);
    });

    it('should show error message when multiple matches found', () => {
      mockGlobalMessageService.expectedText = {
        key: 'epdVisualization.errors.visualLoad.multipleMatchingVisualsFound',
      };
      mockGlobalMessageService.expectedType = GlobalMessageType.MSG_TYPE_ERROR;
      visualPickingTabService['handleLoadVisualizationInfoChange']({
        lookupResult: VisualizationLookupResult.MultipleMatchesFound,
        loadStatus: VisualizationLoadStatus.NotStarted,
      });
    });

    it('should show error message when unexpected error occurs during lookup', () => {
      mockGlobalMessageService.expectedText = {
        key: 'epdVisualization.errors.visualLoad.unexpectedLoadError',
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
