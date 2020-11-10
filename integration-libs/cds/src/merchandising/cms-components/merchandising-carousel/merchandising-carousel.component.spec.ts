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
import {
  PageContext,
  PageType,
  Product,
  RoutingService,
} from '@spartacus/core';
import { CmsComponentData, IntersectionService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { MerchandisingMetadata, MerchandisingProduct } from '../../model/index';
import { MerchandisingCarouselComponent } from './merchandising-carousel.component';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';
import { MerchandisingCarouselModel } from './model/index';
import createSpy = jasmine.createSpy;

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
 * The actual directive would prefix our metadata attributes with the prefix input. We will not test
 * the directive's behaviour as part of the tests for this component, so we should not expect the generated
 * metadata attributes to contain any kind of prefix
 */
@Directive({
  selector: '[cxAttributes]',
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['cxAttributes', 'cxAttributesNamePrefix'],
})
class MockAttributesDirective {
  @Input() cxAttributes: { [attribute: string]: any };
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
const merchandisingCarouselModelMetadata: MerchandisingMetadata = {
  'custom-metadata-field-1': 'custom-metadata-data-value-1',
};
const merchandisingCarouselModel: MerchandisingCarouselModel = {
  id:'testCarouselId',
  items$: merchandisingCarouselModelProducts.map((merchandisingProduct) =>
    of(merchandisingProduct)
  ),
  productIds: ['1','2'],
  metadata: merchandisingCarouselModelMetadata,
  title: mockComponentData.title,
  backgroundColor: mockComponentData.backgroundColour,
  textColor: mockComponentData.textColour,
};

const MockCmsMerchandisingCarouselComponent = <CmsComponentData<any>>{
  data$: of(mockComponentData),
};

class MockMerchandisingCarouselComponentService {
  sendCarouselViewEvent = createSpy(
    'MerchandisingCarouselComponentService.sendCarouselViewEvent'
  ).and.callFake(() => of());

  getMerchandisingCarouselModel(): Observable<MerchandisingCarouselModel> {
    return of(merchandisingCarouselModel);
  }

  getMerchandisingCaourselViewportThreshold(): number {
    return 0.8;
  }
}

class RoutingServiceStub {
  getPageContext(): Observable<PageContext> {
    return of(new PageContext('homepage', PageType.CONTENT_PAGE));
  }
}

class IntersectionServiceStub {
  isIntersected(): Observable<boolean> {
    return of();
  }
}

describe('MerchandisingCarouselComponent', () => {
  let component: MerchandisingCarouselComponent;
  let componentService: MerchandisingCarouselComponentService;
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
        {
          provide: RoutingService,
          useClass: RoutingServiceStub,
        },
        {
          provide: IntersectionService,
          useClass: IntersectionServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MerchandisingCarouselComponent);
    component = fixture.componentInstance;
    componentService = TestBed.inject(MerchandisingCarouselComponentService);
    fixture.detectChanges();
  }));

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should have a title', async(() => {
    let actualTitle: string;
    component.merchandisingCarouselModel$.subscribe(
      (carouselModel) => (actualTitle = carouselModel.title)
    );
    expect(actualTitle).toBe(mockComponentData.title);
  }));

  it('should have a background color', async(() => {
    let actualBackgroundColor: string;
    component.merchandisingCarouselModel$.subscribe(
      (carouselModel) =>
        (actualBackgroundColor = <string>carouselModel.backgroundColor)
    );
    expect(actualBackgroundColor).toBe(mockComponentData.backgroundColour);
  }));

  it('should have a text color', async(() => {
    let actualTextColor: string;
    component.merchandisingCarouselModel$.subscribe(
      (carouselModel) => (actualTextColor = <string>carouselModel.textColor)
    );
    expect(actualTextColor).toBe(mockComponentData.textColour);
  }));

  it('should have MerchandisingProducts populated', async(() => {
    let actualCarouselMetadata: MerchandisingMetadata;
    const actualCarouselProducts: MerchandisingProduct[] = [];
    component.merchandisingCarouselModel$.subscribe((merchandisingProducts) => {
      actualCarouselMetadata = merchandisingProducts.metadata;
      merchandisingProducts.items$.forEach((observableProduct) =>
        observableProduct.subscribe((product) =>
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
      (actualMerchandisingCarouselModel) =>
        (items = actualMerchandisingCarouselModel.items$)
    );
    expect(items.length).toBe(2);
  }));

  it('should have product code 111 in first product', async(() => {
    let items: Observable<Product>[];
    component.merchandisingCarouselModel$.subscribe(
      (actualMerchandisingCarouselModel) =>
        (items = actualMerchandisingCarouselModel.items$)
    );
    let product: Product;
    items[0].subscribe((p) => (product = p));
    expect(product).toEqual(merchandisingCarouselModelProducts[0]);
  }));

  describe('merchandisingCarouselModel$', () => {
    let intersectionService: IntersectionService;
    beforeEach(() => {
      intersectionService = TestBed.inject(IntersectionService);
    });

    it('should not trigger if the carousel is not in the viewport', () => {
      spyOn(intersectionService, 'isIntersected').and.returnValue(of(false));

      component.merchandisingCarouselModel$.subscribe((_) => {});

      expect(componentService.sendCarouselViewEvent).not.toHaveBeenCalled();
    });

    it('should trigger if the carousel is in the viewport', () => {
      spyOn(intersectionService, 'isIntersected').and.returnValue(of(true));

      component.merchandisingCarouselModel$.subscribe((_) => {});

      expect(componentService.sendCarouselViewEvent).toHaveBeenCalled();
    });
  });

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
