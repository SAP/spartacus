import {
  Component,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsProductCarouselComponent,
  I18nTestingModule,
  Product,
  ProductScope,
  ProductService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { ProductCarouselComponent } from './product-carousel.component';

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

@Component({ selector: 'cx-product-carousel-item', template: '' })
class MockProductCarouselItemComponent {
  @Input() item: any;
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

const productCodeArray: string[] = ['1', '2'];

const mockProducts = {
  1: {
    code: '1',
    name: 'product 1',
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
  2: {
    code: '2',
    name: 'product 2',
    price: {
      formattedValue: '$200.00',
    },
  },
};

const mockComponentData: CmsProductCarouselComponent = {
  uid: '001',
  typeCode: 'ProductCarouselComponent',
  modifiedTime: new Date('2017-12-21T18:15:15+0000'),
  popup: 'false',
  productCodes: productCodeArray.join(' '),
  scroll: 'ALLVISIBLE',
  title: 'Mock Title',
  name: 'Mock Product Carousel',
  container: 'false',
};

const MockCmsProductCarouselComponent = <CmsComponentData<any>>{
  data$: of(mockComponentData),
};

class MockProductService {
  get(code): Observable<Product> {
    return of(mockProducts[code]);
  }
}

describe('ProductCarouselComponent', () => {
  let component: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [
          ProductCarouselComponent,
          MockProductCarouselItemComponent,
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
            provide: ProductService,
            useClass: MockProductService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(
    'should be created',
    waitForAsync(() => {
      expect(component).toBeTruthy();
    })
  );

  it('should have 2 items', (done) => {
    const productService = TestBed.inject(ProductService);
    spyOn(productService, 'get').and.callThrough();

    const scopes = [ProductScope.LIST, ProductScope.PRICE, ProductScope.STOCK];

    component.items$.subscribe((items) => {
      expect(productService.get).toHaveBeenCalledTimes(2);
      expect(productService.get).toHaveBeenCalledWith('1', scopes);
      expect(productService.get).toHaveBeenCalledWith('2', scopes);
      expect(items?.length).toBe(2);

      done();
    });
  });

  it(
    'should have product code 111 in first product',
    waitForAsync(() => {
      let items: Observable<Product>[];
      component.items$.subscribe((i) => (items = i));
      let product: Product;
      items[0].subscribe((p) => (product = p));

      expect(product).toBe(mockProducts[1]);
    })
  );

  describe('UI test', () => {
    it(
      'should have 2 rendered templates',
      waitForAsync(() => {
        const el = fixture.debugElement.queryAll(
          By.css('cx-product-carousel-item')
        );
        expect(el.length).toEqual(2);
      })
    );
  });
});
