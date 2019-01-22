import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { Component, Input } from '@angular/core';
import {
  OutletDirective,
  OutletService
} from 'projects/storefrontlib/src/lib/outlet';
import { FormComponentsModule } from './../../../../ui/components/form-components/form-components.module';

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>'
})
export class MockAddToCartComponent {
  @Input() productCode: string;
  @Input() quantity: number;
  @Input() maxQuantity: number;
}

describe('ProductSummaryComponent in product', () => {
  let productSummaryComponent: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormComponentsModule],
      declarations: [
        ProductSummaryComponent,
        MockAddToCartComponent,
        OutletDirective
      ],
      providers: [OutletService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSummaryComponent);
    productSummaryComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(productSummaryComponent).toBeTruthy();
  });
});
