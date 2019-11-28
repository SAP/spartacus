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

const mockMerchandisingProducts = {
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

  it('should have 2 items', async(() => {
    let items: Observable<Product>[];
    component.items$.subscribe(i => (items = i));
    expect(items.length).toBe(2);
  }));

  it('should have product code 111 in first product', async(() => {
    let items: Observable<Product>[];
    component.items$.subscribe(i => (items = i));
    let product: Product;
    items[0].subscribe(p => (product = p));

    expect(product).toBe(mockMerchandisingProducts.products[0]);
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
