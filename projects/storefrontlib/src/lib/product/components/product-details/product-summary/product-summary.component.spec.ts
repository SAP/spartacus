import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { AddToCartModule } from '../../../../../cms-components/checkout';
import { OutletDirective } from '../../../../outlet';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { FormComponentsModule } from './../../../../ui/components/form-components/form-components.module';

describe('ProductSummaryComponent in product', () => {
  let productSummaryComponent: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AddToCartModule, FormComponentsModule, I18nTestingModule],
      declarations: [ProductSummaryComponent, OutletDirective],
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
