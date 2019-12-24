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
import { MerchandisingProduct } from '../../model/merchandising-products.model';
import { MerchandisingCarouselComponent } from './merchandising-carousel.component';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';
import { MerchandisingCarouselModel } from './model/index';

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

const mockComponentData: CmsMerchandisingCarouselComponent = {
  uid: '001',
  typeCode: 'MerchandisingCarouselComponent',
  modifiedTime: new Date('2017-12-21T18:15:15+0000'),
  scroll: 'ALLVISIBLE',
  title: 'Mock Title',
  name: 'Mock Product Carousel',
  strategy: 'test-strategy-1',
  container: 'false',
  backgroundColour: '#000000',
  textColour: '#ffffff',
};

const merchandisingCarouselModelProducts: MerchandisingProduct[] = [
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
];
const merchandisingCarouselModelMetadata: Map<string, string> = new Map();
merchandisingCarouselModelMetadata.set(
  'custom-metadata-field-1',
  'custom-metadata-data-value-1'
);
const merchandisingCarouselModel: MerchandisingCarouselModel = {
  items$: merchandisingCarouselModelProducts.map(merchandisingProduct =>
    of(merchandisingProduct)
  ),
  metadata: merchandisingCarouselModelMetadata,
  title: mockComponentData.title,
  backgroundColor: mockComponentData.backgroundColour,
  textColor: mockComponentData.textColour,
};

const MockCmsMerchandisingCarouselComponent = <CmsComponentData<any>>{
  data$: of(mockComponentData),
};

class MockMerchandisingCarouselComponentService {
  getMerchandisingCarouselModel(): Observable<MerchandisingCarouselModel> {
    return of(merchandisingCarouselModel);
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
          provide: MerchandisingCarouselComponentService,
          useClass: MockMerchandisingCarouselComponentService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MerchandisingCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have a title', async(() => {
    let actualTitle: string;
    component.merchandisingCarouselModel$.subscribe(
      carouselModel => (actualTitle = carouselModel.title)
    );
    expect(actualTitle).toBe(mockComponentData.title);
  }));

  it('should have a background color', async(() => {
    let actualBackgroundColor: string;
    component.merchandisingCarouselModel$.subscribe(
      carouselModel =>
        (actualBackgroundColor = <string>carouselModel.backgroundColor)
    );
    expect(actualBackgroundColor).toBe(mockComponentData.backgroundColour);
  }));

  it('should have a text color', async(() => {
    let actualTextColor: string;
    component.merchandisingCarouselModel$.subscribe(
      carouselModel => (actualTextColor = <string>carouselModel.textColor)
    );
    expect(actualTextColor).toBe(mockComponentData.textColour);
  }));

  it('should have MerchandisingProducts populated', async(() => {
    let actualCarouselMetadata: Map<string, string>;
    const actualCarouselProducts: MerchandisingProduct[] = [];
    component.merchandisingCarouselModel$.subscribe(merchandisingProducts => {
      actualCarouselMetadata = merchandisingProducts.metadata;
      merchandisingProducts.items$.forEach(observableProduct =>
        observableProduct.subscribe(product =>
          actualCarouselProducts.push(product)
        )
      );
    });
    expect(actualCarouselMetadata).toEqual(merchandisingCarouselModel.metadata);
    expect(actualCarouselProducts).toEqual(merchandisingCarouselModelProducts);
  }));

  it('should have 2 items', async(() => {
    let items: Observable<Product>[];
    component.merchandisingCarouselModel$.subscribe(
      actualMerchandisingCarouselModel =>
        (items = actualMerchandisingCarouselModel.items$)
    );
    expect(items.length).toBe(2);
  }));

  it('should have product code 111 in first product', async(() => {
    let items: Observable<Product>[];
    component.merchandisingCarouselModel$.subscribe(
      actualMerchandisingCarouselModel =>
        (items = actualMerchandisingCarouselModel.items$)
    );
    let product: Product;
    items[0].subscribe(p => (product = p));
    expect(product).toEqual(merchandisingCarouselModelProducts[0]);
  }));

  describe('UI test', () => {
    it('should have 2 rendered templates', async(() => {
      const el = fixture.debugElement.queryAll(
        By.css('.data-cx-merchandising-product')
      );
      expect(el.length).toBe(2);
    }));

    it('should render product name in template', async(() => {
      const el = fixture.debugElement.queryAll(
        By.css('.data-cx-merchandising-product + a h4')
      );
      expect(el[0].nativeElement).toBeTruthy();
      expect(el[0].nativeElement.innerText).toBe('product 1');
      expect(el[1].nativeElement).toBeTruthy();
      expect(el[1].nativeElement.innerText).toBe('product 2');
    }));

    it('should render product price in template', async(() => {
      const el = fixture.debugElement.queryAll(
        By.css('.data-cx-merchandising-product + a .price')
      );
      expect(el[0].nativeElement).toBeTruthy();
      expect(el[0].nativeElement.innerText).toBe('100.00');
      expect(el[1].nativeElement).toBeTruthy();
      expect(el[1].nativeElement.innerText).toBe('200.00');
    }));

    it('should only render product primary image for the first item', async(() => {
      const el = fixture.debugElement.queryAll(
        By.css('.data-cx-merchandising-product + a')
      );
      expect(el[0].query(By.css('cx-media'))).toBeTruthy();
      expect(el[1].query(By.css('cx-media'))).toBeFalsy();
    }));
  });
});
