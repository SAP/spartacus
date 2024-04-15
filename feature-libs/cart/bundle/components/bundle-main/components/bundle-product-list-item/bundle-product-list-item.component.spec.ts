import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  Pipe,
  PipeTransform
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Product } from '@spartacus/core';
import { OutletDirective, OutletModule, ProductListItemContextSource } from '@spartacus/storefront';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
import { BehaviorSubject } from 'rxjs';
import { BundleProductListItemComponent } from './bundle-product-list-item.component';

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
class MockAddToCartComponent {
  @Input() product: Product;
  @Input() showQuantity: boolean;
}

@Component({
  selector: 'cx-star-rating',
  template: ''
})
class MockStarRatingComponent {
  @Input() rating: any;
  @Input() disabled: any;
}

@Component({
  selector: 'cx-media',
  template: '',
})
class MockPictureComponent {
  @Input() container: any;
  @Input() alt: any;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: any;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Directive({
  selector: '[cxOutlet]',
})
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
}

const mockProduct: Product = {
  name: 'Test product',
  code: '1',
  averageRating: 4.5,
  stock: {
    stockLevelStatus: 'inStock',
  },
  images: {
    PRIMARY: {},
  },
  baseOptions: [
    {
      selected: {
        variantOptionQualifiers: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'L' },
        ],
      },
    },
  ],
};

const mockProduct$ = new BehaviorSubject(mockProduct);

class MockProductListItemContextSource {
  product$ = jasmine.createSpy('product$').and.returnValue(mockProduct$);
}

describe('BundleProductListItemComponent', () => {
  let component: BundleProductListItemComponent;
  let fixture: ComponentFixture<BundleProductListItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule, OutletModule],
        declarations: [
          BundleProductListItemComponent,
          MockPictureComponent,
          MockAddToCartComponent,
          MockStarRatingComponent,
          MockUrlPipe,
          MockCxIconComponent,
          MockFeatureLevelDirective,
          MockOutletDirective,
        ],
        providers: [
          {
            provide: ProductListItemContextSource,
            useClass: MockProductListItemContextSource
          }
        ],
      })
        .overrideComponent(BundleProductListItemComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleProductListItemComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should component created', () => {
    expect(component).toBeDefined();
  });
});
