import { AsyncPipe, NgFor, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  CmsProductReferencesComponent,
  FeaturesConfigModule,
  MockFeatureTogglesController,
  MockTranslatePipe,
  Product,
  ProductReference,
  ProductReferenceService,
  provideMockFeatureToggles,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  CarouselComponent,
  CarouselScrollingComponent,
} from '@spartacus/storefront';
import { MediaComponent } from 'core-libs/storefront/shared/components/media/media.component';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';
import { ProductReferencesComponent } from './product-references.component';

@Component({
  selector: 'cx-carousel',
  template: `
    cx-carousel
    <ng-container *ngFor="let item$ of items">
      <ng-container
        *ngTemplateOutlet="template; context: { item: item$ | async }"
      ></ng-container>
    </ng-container>
  `,
  imports: [FeaturesConfigModule, NgTemplateOutlet, NgFor, AsyncPipe],
})
class MockCarouselComponent {
  @Input() title: string;
  @Input() template: TemplateRef<any>;
  @Input() items: any[];
}

@Component({
  selector: 'cx-carousel-scrolling',
  template: `
    cx-carousel-scrolling
    <ng-container *ngFor="let item$ of items">
      <ng-container
        *ngTemplateOutlet="template; context: { item: item$ | async }"
      ></ng-container>
    </ng-container>
  `,
  imports: [FeaturesConfigModule, NgTemplateOutlet, AsyncPipe, NgFor],
})
class MockCarouselScrollingComponent {
  @Input() title: string;
  @Input() template: TemplateRef<any>;
  @Input() items: any[];
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-media',
  template: '',
  imports: [FeaturesConfigModule],
})
class MockMediaComponent {
  @Input() container: any;
  @Input() format: string;
}

const mockProduct: Product = {
  code: '1',
};

const mockProductReferences = [
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
    },
  },
  {
    target: {
      code: '222',
      name: 'product reference 2',
      price: {
        formattedValue: '$200.00',
      },
    },
  },
];

const mockComponentData: CmsProductReferencesComponent = {
  uid: '001',
  typeCode: 'ProductReferenceComponent',
  productReferenceTypes: 'SIMILAR',
};

const MockCmsProductCarouselComponent = <CmsComponentData<any>>{
  data$: of(mockComponentData),
};

class MockCurrentProductService {
  getProduct(): Observable<any> {
    return of(mockProduct);
  }
}

class MockProductReferenceService {
  loadProductReferences(
    _productCode: string,
    _referenceType?: string,
    _pageSize?: number
  ): void {}

  getProductReferences(
    _productCode: string,
    _referenceType?: string
  ): Observable<ProductReference[]> {
    return of([mockProductReferences[0], mockProductReferences[1]]);
  }

  cleanReferences(): void {}
}
RouterModule.forRoot([]);

describe('ProductReferencesComponent', () => {
  let component: ProductReferencesComponent;
  let productReferenceService: ProductReferenceService;
  let fixture: ComponentFixture<ProductReferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeaturesConfigModule, RouterModule.forRoot([])],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsProductCarouselComponent,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
        {
          provide: ProductReferenceService,
          useClass: MockProductReferenceService,
        },
        provideMockFeatureToggles({
          productCarouselScrolling: true,
        }),
      ],
    })
      .overrideComponent(ProductReferencesComponent, {
        remove: {
          imports: [
            TranslatePipe,
            UrlPipe,
            MediaComponent,
            CarouselScrollingComponent,
            CarouselComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockUrlPipe,
            MockMediaComponent,
            MockCarouselScrollingComponent,
            MockCarouselComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(waitForAsync(() => {
    const toggles = TestBed.inject(MockFeatureTogglesController);
    toggles.reset({ productCarouselScrolling: true });
    fixture = TestBed.createComponent(ProductReferencesComponent);
    productReferenceService = TestBed.inject(ProductReferenceService);
    component = fixture.componentInstance;
  }));

  it('should emit component data', () => {
    fixture.detectChanges();
    let componentData: CmsProductReferencesComponent;
    component['componentData$']
      .subscribe((data) => (componentData = data))
      .unsubscribe();

    expect(componentData).toEqual(mockComponentData);

    let title: string;
    component['title$'].subscribe((data) => (title = data)).unsubscribe();

    expect(title).toEqual(componentData.title);
  });

  it('should get productCode', () => {
    fixture.detectChanges();
    spyOn(productReferenceService, 'cleanReferences').and.stub();

    let result: string;
    component['productCode$']
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(mockProduct.code);
    expect(productReferenceService.cleanReferences).toHaveBeenCalled();
  });

  it('should have 2 items', () => {
    fixture.detectChanges();
    spyOn(productReferenceService, 'loadProductReferences').and.callThrough();
    spyOn(productReferenceService, 'getProductReferences').and.callThrough();

    let items: Observable<Product>[];
    component.items$.subscribe((i) => (items = i)).unsubscribe();

    expect(items.length).toBe(2);

    expect(productReferenceService.loadProductReferences).toHaveBeenCalled();
    expect(productReferenceService.getProductReferences).toHaveBeenCalled();
  });

  it('should have product reference code 111 in first product', () => {
    fixture.detectChanges();
    let items: Observable<Product>[];
    component.items$.subscribe((i) => (items = i)).unsubscribe();

    let product: Product;
    items[0].subscribe((p) => (product = p)).unsubscribe();

    expect(product).toBe(mockProductReferences[0].target);
  });

  describe('Component template render', () => {
    it('should have 2 rendered elements', () => {
      fixture.detectChanges();
      const el = fixture.debugElement.queryAll(By.css('a'));

      expect(el.length).toEqual(2);
    });
  });

  it('should render product attributes', () => {
    fixture.detectChanges();
    const productNameElement = fixture.debugElement.query(
      By.css('a:first-child h4')
    ).nativeElement;
    expect(productNameElement.innerText).toEqual('product reference 1');

    const priceElement = fixture.debugElement.query(
      By.css('a:last-child .price')
    ).nativeElement;
    expect(priceElement.innerText).toEqual('$200.00');

    const productImage = fixture.debugElement.query(
      By.css('a:first-child cx-media')
    );
    expect(productImage.nativeElement).toBeTruthy();

    const el = fixture.debugElement.query(By.css('a:last-child cx-media'));
    expect(el.nativeElement).toBeTruthy();
  });

  describe('when feature toggle "productCarouselScrolling" is enabled', () => {
    beforeEach(() => {
      const toggles = TestBed.inject(MockFeatureTogglesController);
      toggles.set('productCarouselScrolling', true);
    });

    it('should render cx-carousel-scrolling component', () => {
      fixture.detectChanges();
      const carouselScrollingComponent = fixture.debugElement.query(
        By.css('cx-carousel-scrolling')
      );
      expect(carouselScrollingComponent).toBeTruthy();
    });
  });
  describe('when feature toggle "productCarouselScrolling" is disabled', () => {
    it('should render cx-carousel component', () => {
      const toggles = TestBed.inject(MockFeatureTogglesController);
      toggles.set('productCarouselScrolling', false);
      fixture.detectChanges();
      const carouselComponent = fixture.debugElement.query(
        By.css('cx-carousel')
      );
      expect(carouselComponent).toBeTruthy();
    });
  });
});
