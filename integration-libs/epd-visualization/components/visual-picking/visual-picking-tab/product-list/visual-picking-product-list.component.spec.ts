import { CommonModule } from '@angular/common';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Component, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  I18nTestingModule,
  Product,
  ProductReference,
  UrlModule,
} from '@spartacus/core';
import {
  AddToCartModule,
  CarouselModule,
  IconModule,
  MediaModule,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CompactAddToCartModule } from './compact-add-to-cart/compact-add-to-cart.module';
import { VisualPickingProductListItem } from './model/visual-picking-product-list-item.model';
import { PagedListModule } from './paged-list/paged-list.module';
import { VisualPickingProductListComponent } from './visual-picking-product-list.component';
import { VisualPickingProductListService } from './visual-picking-product-list.service';

const productReferences: ProductReference[] = [
  {
    target: {
      code: '111',
      name: 'product reference 1',
      price: {
        formattedValue: '$100.00',
      },
      images: {
        PRIMARY: {
          image: {
            url: 'whatever.jpg',
          },
        },
      },
      stock: {
        stockLevelStatus: 'outOfStock',
      },
    },
  },
  {
    target: {
      code: '222',
      name: 'product reference 2',
      price: {
        formattedValue: '$200.00',
      },
      stock: {
        stockLevelStatus: 'inStock',
      },
    },
  },
];

const emptySelection: VisualPickingProductListItem[] = [
  {
    product: productReferences[0].target as Product,
    selected: false,
  },
  {
    product: productReferences[1].target as Product,
    selected: false,
  },
];

const currentProduct: Product = {
  code: 'currentProduct',
};

class MockVisualPickingProductListService {
  initialize() {}

  public getCurrentProductReferences(): Observable<ProductReference[]> {
    return of(productReferences);
  }
  public getFilteredProductReferences(): Observable<ProductReference[]> {
    return of(productReferences);
  }

  public get filteredItems$(): Observable<VisualPickingProductListItem[]> {
    return of(emptySelection);
  }

  set selectedProductCodes(selectedProductCodes: string[]) {
    this._selectedProductCodes = selectedProductCodes;
  }
  get selectedProductCodes(): string[] {
    return this._selectedProductCodes;
  }
  _selectedProductCodes: string[] = [];
  public selectedProductCodesChange = new EventEmitter<string[]>();

  get itemsPerSlide(): number {
    return this._itemsPerSlide;
  }
  set itemsPerSlide(itemsPerSlide: number) {
    this._itemsPerSlide = itemsPerSlide;
  }
  _itemsPerSlide = 7;

  get activeSlideStartIndex(): number {
    return this._activeSlideStartIndex;
  }
  set activeSlideStartIndex(activeSlideStartIndex: number) {
    this._activeSlideStartIndex = activeSlideStartIndex;
  }
  _activeSlideStartIndex = 0;

  currentProduct$: Observable<Product> = of(currentProduct);
}

@Component({
  selector: 'cx-page-layout',
  template: 'mock',
})
class MockPageLayoutComponent {}

describe('VisualPickingProductListComponent', () => {
  let visualPickingProductListComponent: VisualPickingProductListComponent;
  let fixture: ComponentFixture<VisualPickingProductListComponent>;
  let mockVisualPickingProductListService: MockVisualPickingProductListService =
    new MockVisualPickingProductListService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([
          {
            path: 'product',
            component: MockPageLayoutComponent,
          },
        ]),
        HttpClientTestingModule,
        CommonModule,
        MediaModule,
        IconModule,
        CarouselModule,
        PagedListModule,
        AddToCartModule,
        UrlModule,
        I18nTestingModule,
        CompactAddToCartModule,
      ],
      declarations: [VisualPickingProductListComponent],
      providers: [Actions],
    })
      .overrideComponent(VisualPickingProductListComponent, {
        set: {
          providers: [
            {
              provide: VisualPickingProductListService,
              useValue: mockVisualPickingProductListService,
            },
          ],
        },
      })
      .compileComponents();

    TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(VisualPickingProductListComponent);
    visualPickingProductListComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create visual picking product list component', () => {
    expect(visualPickingProductListComponent).toBeTruthy();
  });

  describe('selectedProductCodes', () => {
    it('should delegate to VisualPickingProductListService', () => {
      const setterSpy = spyOnProperty(
        mockVisualPickingProductListService,
        'selectedProductCodes',
        'set'
      );
      const getterSpy = spyOnProperty(
        mockVisualPickingProductListService,
        'selectedProductCodes',
        'get'
      );
      visualPickingProductListComponent.selectedProductCodes =
        visualPickingProductListComponent.selectedProductCodes;
      expect(setterSpy).toHaveBeenCalledTimes(1);
      expect(getterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('itemsPerSlide', () => {
    it('should delegate to VisualPickingProductListService', () => {
      const setterSpy = spyOnProperty(
        mockVisualPickingProductListService,
        'itemsPerSlide',
        'set'
      );
      const getterSpy = spyOnProperty(
        mockVisualPickingProductListService,
        'itemsPerSlide',
        'get'
      );
      visualPickingProductListComponent.itemsPerSlide =
        visualPickingProductListComponent.itemsPerSlide;
      expect(setterSpy).toHaveBeenCalledTimes(1);
      expect(getterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('activeSlideStartIndex', () => {
    it('should delegate to VisualPickingProductListService', () => {
      const setterSpy = spyOnProperty(
        mockVisualPickingProductListService,
        'activeSlideStartIndex',
        'set'
      );
      const getterSpy = spyOnProperty(
        mockVisualPickingProductListService,
        'activeSlideStartIndex',
        'get'
      );
      visualPickingProductListComponent.activeSlideStartIndex =
        visualPickingProductListComponent.activeSlideStartIndex;
      expect(setterSpy).toHaveBeenCalledTimes(1);
      expect(getterSpy).toHaveBeenCalledTimes(1);
    });
  });
});
