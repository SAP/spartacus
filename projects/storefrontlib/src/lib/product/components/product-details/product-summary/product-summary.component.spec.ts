import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { AddToCartModule } from '../../../../cart/components/add-to-cart/add-to-cart.module';
import { FormComponentsModule } from './../../../../ui/components/form-components/form-components.module';
import { OutletDirective } from '../../../../outlet';

describe('ProductSummaryComponent in product', () => {
  let productSummaryComponent: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AddToCartModule, FormComponentsModule],
      declarations: [ProductSummaryComponent, OutletDirective]
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
