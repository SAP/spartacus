import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsProductReferencesComponent,
  Product,
  ProductReference,
  ProductReferenceService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CurrentProductService } from '../../current-product.service';
import { ProductReferencesComponent } from './product-references.component';

@Component({
  selector: 'cx-carousel',
  template: `
    <ng-container *ngFor="let item$ of items">
      <ng-container
        *ngTemplateOutlet="template; context: { item: item$ | async }"
      ></ng-container>
    </ng-container>
  `,
})
class MockCarouselComponent {
  @Input() title: string;
  @Input() template: TemplateRef<any>;
  @Input() items: any[];
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  selector: 'cx-media',
  template: '',
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

describe('ProductReferencesComponent', () => {
  let component: ProductReferencesComponent;
  let productReferenceService: ProductReferenceService;
  let fixture: ComponentFixture<ProductReferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        ProductReferencesComponent,
        MockCarouselComponent,
        MockMediaComponent,
        MockUrlPipe,
      ],
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReferencesComponent);
    productReferenceService = TestBed.inject(ProductReferenceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit component data', () => {
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
    spyOn(productReferenceService, 'cleanReferences').and.stub();

    let result: string;
    component['productCode$']
      .subscribe((data) => (result = data))
      .unsubscribe();

    expect(result).toEqual(mockProduct.code);
    expect(productReferenceService.cleanReferences).toHaveBeenCalled();
  });

  it('should have 2 items', () => {
    spyOn(productReferenceService, 'loadProductReferences').and.callThrough();
    spyOn(productReferenceService, 'getProductReferences').and.callThrough();

    let items: Observable<Product>[];
    component.items$.subscribe((i) => (items = i)).unsubscribe();

    expect(items.length).toBe(2);

    expect(productReferenceService.loadProductReferences).toHaveBeenCalled();
    expect(productReferenceService.getProductReferences).toHaveBeenCalled();
  });

  it('should have product reference code 111 in first product', () => {
    let items: Observable<Product>[];
    component.items$.subscribe((i) => (items = i)).unsubscribe();

    let product: Product;
    items[0].subscribe((p) => (product = p)).unsubscribe();

    expect(product).toBe(mockProductReferences[0].target);
  });

  describe('Component template render', () => {
    it('should have 2 rendered elements', () => {
      const el = fixture.debugElement.queryAll(By.css('a'));

      expect(el.length).toEqual(2);
    });
  });

  it('should render product attributes', () => {
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
});
