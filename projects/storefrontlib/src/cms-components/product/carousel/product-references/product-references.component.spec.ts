import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  typeCode: 'ProductCarouselComponent',
  productReferenceTypes: 'UPSELL',
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
  get(_code: string): Observable<ProductReference[]> {
    return of([mockProductReferences[0], mockProductReferences[1]]);
  }

  cleanReferences(): void {}
}

describe('ProductReferencesComponent', () => {
  let component: ProductReferencesComponent;
  let fixture: ComponentFixture<ProductReferencesComponent>;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have 2 items', async(() => {
    let items: Observable<Product>[];
    component.items$.subscribe((i) => (items = i));
    expect(items.length).toBe(2);
  }));

  it('should have product reference code 111 in first product', async(() => {
    let items: Observable<Product>[];
    component.items$.subscribe((i) => (items = i));
    let product: Product;
    items[0].subscribe((p) => (product = p));

    expect(product).toBe(mockProductReferences[0].target);
  }));

  describe('UI test', () => {
    it('should have 2 rendered templates', async(() => {
      const el = fixture.debugElement.queryAll(By.css('a'));
      expect(el.length).toEqual(2);
    }));
  });

  it('should render product name in template', async(() => {
    const el = fixture.debugElement.query(By.css('a:first-child h4'));
    expect(el.nativeElement).toBeTruthy();
    expect(el.nativeElement.innerText).toEqual('product reference 1');
  }));

  it('should render product price in template', async(() => {
    const el = fixture.debugElement.query(By.css('a:last-child .price'));
    expect(el.nativeElement).toBeTruthy();
    expect(el.nativeElement.innerText).toEqual('$200.00');
  }));

  it('should render product primary image for the first item', async(() => {
    const el = fixture.debugElement.query(By.css('a:first-child cx-media'));
    expect(el.nativeElement).toBeTruthy();
  }));

  it('should render missing product image for the 2nd item as well', async(() => {
    const el = fixture.debugElement.query(By.css('a:last-child cx-media'));
    expect(el.nativeElement).toBeTruthy();
  }));
});
