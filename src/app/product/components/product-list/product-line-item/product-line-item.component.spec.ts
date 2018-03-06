import { MaterialModule } from 'app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductLineItemComponent } from './product-line-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AddToCartComponent } from '../../../../cart/components/add-to-cart/add-to-cart.component';
import { OccCartService } from '../../../../newocc/cart/cart.service';
import { HttpModule } from '@angular/http';

fdescribe('ProductLineItemComponent in product-list', () => {
  let component: ProductLineItemComponent;
  let fixture: ComponentFixture<ProductLineItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule, HttpModule, RouterTestingModule],
        declarations: [ProductLineItemComponent, AddToCartComponent],
        providers: [OccCartService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLineItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
