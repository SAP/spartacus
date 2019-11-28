import {
  Component,
  Directive,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import { MerchandisingProducts } from '../../model/merchandising-products.model';
import { MerchandisingCarouselComponent } from './merchandising-carousel.component';

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

/*
 * The actual directrive would prefix our metadata attributes with the prefix input. We will not test
 * the directive's behaviour as part of the tests for this component, so we should not expect the generated
 * metadata attributes to contain any kind of prefix
 */
@Directive({
  selector: '[cxAttributes]',
  inputs: ['cxAttributes', 'cxAttributesNamePrefix'],
})
class MockAttributesDirective {
  @Input() cxAttributes: Map<string, string>;
  @Input() cxAttributesNamePrefix: string;
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

const mockMerchandisingProductsMetadata: Map<string, string> = new Map();
mockMerchandisingProductsMetadata.set(
  'custom-metadata-field-1',
  'custom-metadata-data-value-1'
);
const mockMerchandisingProducts: MerchandisingProducts = {
  products: [
    {
      code: '1',
      name: 'product 1',
      price: {
        formattedValue: '100.00',
      },
      images: {
        PRIMARY: {
          image: {
            url: 'whatever.jpg',
          },
        },
      },
    },
    {
      code: '2',
      name: 'product 2',
      price: {
        formattedValue: '200.00',
      },
    },
  ],
  metadata: mockMerchandisingProductsMetadata,
};

const mockComponentData: CmsMerchandisingCarouselComponent = {
  uid: '001',
  typeCode: 'MerchandisingCarouselComponent',
  modifiedTime: new Date('2017-12-21T18:15:15+0000'),
  scroll: 'ALLVISIBLE',
  title: 'Mock Title',
  name: 'Mock Product Carousel',
  strategy: 'test-strategy-1',
  container: 'false',
};

const MockCmsMerchandisingCarouselComponent = <CmsComponentData<any>>{
  data$: of(mockComponentData),
};

class MockCdsMerchandisingProductService {
  loadProductsForStrategy(): Observable<MerchandisingProducts> {
    return of(mockMerchandisingProducts);
  }
}

describe('MerchandisingCarouselComponent', () => {
  let component: MerchandisingCarouselComponent;
  let fixture: ComponentFixture<MerchandisingCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MerchandisingCarouselComponent,
        MockCarouselComponent,
        MockAttributesDirective,
        MockMediaComponent,
        MockUrlPipe,
      ],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsMerchandisingCarouselComponent,
        },
        {
          provide: CdsMerchandisingProductService,
          useClass: MockCdsMerchandisingProductService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandisingCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have a title', async () => {
    let actualTitle: string;
    component.title$.subscribe(title => (actualTitle = title));
    expect(actualTitle).toBe(mockComponentData.title);
  });

  it('should have MerchandisingProducts populated', () => {
    const expectedMerchandisingCarouselModelMetadata: Map<
      string,
      string
    > = new Map(mockMerchandisingProductsMetadata);

    expectedMerchandisingCarouselModelMetadata.set(
      'title',
      mockComponentData.title
    );
    expectedMerchandisingCarouselModelMetadata.set(
      'name',
      mockComponentData.name
    );
    expectedMerchandisingCarouselModelMetadata.set(
      'strategyid',
      mockComponentData.strategy
    );
    expectedMerchandisingCarouselModelMetadata.set(
      'slots',
      mockMerchandisingProducts.products.length.toString()
    );
    expectedMerchandisingCarouselModelMetadata.set('id', mockComponentData.uid);

    let actualCarouselMetadata: Map<string, string>;
    const actualCarouselProducts: Product[] = [];
    component.merchandisingCarouselModel$.subscribe(merchandisingProducts => {
      actualCarouselMetadata = merchandisingProducts.metadata;
      merchandisingProducts.items$.forEach(observableProduct =>
        observableProduct.subscribe(product =>
          actualCarouselProducts.push(product)
        )
      );
    });
    expect(actualCarouselMetadata).toEqual(
      expectedMerchandisingCarouselModelMetadata
    );
    expect(actualCarouselProducts).toEqual(mockMerchandisingProducts.products);
  });

  it('should have 2 items', async(() => {
    let items: Observable<Product>[];
    component.merchandisingCarouselModel$.subscribe(
      merchandisingCarouselModel => (items = merchandisingCarouselModel.items$)
    );
    expect(items.length).toBe(2);
  }));

  it('should have product code 111 in first product', async(() => {
    let items: Observable<Product>[];
    component.merchandisingCarouselModel$.subscribe(
      merchandisingCarouselModel => (items = merchandisingCarouselModel.items$)
    );
    let product: Product;
    items[0].subscribe(p => (product = p));
    expect(product).toEqual(mockMerchandisingProducts.products[0]);
  }));

  describe('UI test', () => {
    it('should have 2 rendered templates', async(() => {
      const el = fixture.debugElement.queryAll(By.css('a'));
      expect(el.length).toEqual(2);
    }));

    it('should render product name in template', async(() => {
      const el = fixture.debugElement.query(By.css('a:first-child h4'));
      expect(el.nativeElement).toBeTruthy();
      expect(el.nativeElement.innerText).toEqual('product 1');
    }));

    it('should render product price in template', async(() => {
      const el = fixture.debugElement.query(By.css('a:last-child .price'));
      expect(el.nativeElement).toBeTruthy();
      expect(el.nativeElement.innerText).toEqual('200.00');
    }));

    it('should render product primary image for the first item', async(() => {
      const el = fixture.debugElement.query(By.css('a:first-child cx-media'));
      expect(el.nativeElement).toBeTruthy();
    }));

    it('should not render product primary image for the 2nd item', async(() => {
      const el = fixture.debugElement.query(By.css('a:last-child cx-media'));
      expect(el).toBeNull();
    }));
  });
});
