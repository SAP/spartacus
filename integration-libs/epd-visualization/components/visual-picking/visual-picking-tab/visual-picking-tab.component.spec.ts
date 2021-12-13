import { CommonModule } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Component, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MockTranslatePipe,
  Product,
  ProductReference,
  TranslationService,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { Observable, of, Subject } from 'rxjs';
import {
  VisualizationLoadInfo,
  VisualViewerComponent,
  VisualViewerModule,
} from '../../visual-viewer';
import { SceneLoadInfo } from '../../visual-viewer/models/scene-load-info';
import { VisualViewerService } from '../../visual-viewer/visual-viewer.service';
import { VisualPickingProductFilterComponent } from './product-filter/visual-picking-product-filter.component';
import { VisualPickingProductFilterModule } from './product-filter/visual-picking-product-filter.module';
import { VisualPickingProductFilterService } from './product-filter/visual-picking-product-filter.service';
import {
  VisualPickingProductListItem,
  VisualPickingProductListModule,
} from './product-list';
import { VisualPickingProductListComponent } from './product-list/visual-picking-product-list.component';
import { VisualPickingProductListService } from './product-list/visual-picking-product-list.service';
import { VisualPickingTabComponent } from './visual-picking-tab.component';
import { VisualPickingTabService } from './visual-picking-tab.service';

const currentProduct: Product = {
  code: 'currentProduct',
};

class MockVisualPickingTabService {
  visualViewerService: VisualViewerService;
  visualPickingProductListService: VisualPickingProductListService;

  public initialize(
    _visualViewerService: VisualViewerService,
    _visualPickingProductListService: VisualPickingProductListService
  ): void {}
}

class MockVisualPickingProductFilterService {
  filter = '';

  getFilteredProducts(
    _unfilteredProductReferences$: Observable<ProductReference[]>
  ): Observable<ProductReference[]> {
    return of([]);
  }
}

class MockVisualPickingProductListService {
  public initialize() {}

  public getCurrentProductReferences(): Observable<ProductReference[]> {
    return of([]);
  }

  public getFilteredProductReferences(): Observable<ProductReference[]> {
    return of([]);
  }

  public get filteredItems$(): Observable<VisualPickingProductListItem[]> {
    return of([]);
  }

  currentProduct$: Observable<Product> = of(currentProduct);

  public selectedProductCodes: string[];
  public selectedProductCodesChange = new EventEmitter<string[]>();
}

class MockTranslationService {
  translate(_key: string, _options?: any, _whitespaceUntilLoaded?: boolean) {
    return of('');
  }

  loadChunks(_chunkNames: string | string[]) {
    return of([]);
  }
}

@Component({
  selector: 'cx-page-layout',
  template: 'mock',
})
class MockPageLayoutComponent {}

class MockVisualViewerService {
  loadVisualizationResponse: Observable<VisualizationLoadInfo>;

  public loadVisualization(
    _productCode: string
  ): Observable<VisualizationLoadInfo> {
    return this.loadVisualizationResponse;
  }

  public includedProductCodes: string[];

  public sceneLoadInfo$ = new Subject<SceneLoadInfo>();

  public selectedProductCodes: string[];
  public selectedProductCodesChange = new EventEmitter<string[]>();
}

describe('VisualPickingTabComponent', () => {
  let visualPickingTabComponent: VisualPickingTabComponent;
  let fixture: ComponentFixture<VisualPickingTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualPickingTabComponent, MockTranslatePipe],
      imports: [
        CommonModule,
        IconModule,
        FormsModule,
        UrlModule,
        RouterTestingModule.withRoutes([
          {
            path: 'product',
            component: MockPageLayoutComponent,
          },
        ]),
        HttpClientTestingModule,
        VisualViewerModule,
        VisualPickingProductListModule,
        VisualPickingProductFilterModule,
      ],
      providers: [
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
      ],
    })
      .overrideComponent(VisualViewerComponent, {
        set: {
          providers: [
            {
              provide: VisualViewerService,
              useClass: MockVisualViewerService,
            },
          ],
        },
      })
      .overrideModule(VisualPickingProductFilterModule, {
        set: {
          providers: [
            {
              provide: VisualPickingProductFilterService,
              useClass: MockVisualPickingProductFilterService,
            },
          ],
        },
      })
      .overrideComponent(VisualPickingTabComponent, {
        set: {
          providers: [
            {
              provide: VisualPickingTabService,
              useClass: MockVisualPickingTabService,
            },
          ],
        },
      })
      .overrideComponent(VisualPickingProductFilterComponent, {
        set: {
          providers: [
            {
              provide: VisualPickingProductFilterService,
              useClass: MockVisualPickingProductFilterService,
            },
          ],
        },
      })
      .overrideComponent(VisualPickingProductListComponent, {
        set: {
          providers: [
            {
              provide: VisualPickingProductListService,
              useClass: MockVisualPickingProductListService,
            },
          ],
        },
      })
      .compileComponents();

    TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(VisualPickingTabComponent);
    visualPickingTabComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create visual picking tab component', () => {
    expect(visualPickingTabComponent).toBeTruthy();
  });
});
