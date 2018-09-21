import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { CartItemListComponent } from './cart-item-list.component';
import { CartItemComponent } from '../../cart-shared/cart-item/cart-item.component';
import { ComponentsModule } from '../../../../ui/components/components.module';
import { CartService } from '../../../services/cart.service';

class MockCartService {
  removeCartEntry() {}
  loadCartDetails() {}
  updateCartEntry() {}
}

describe('CartItemListComponent', () => {
  let component: CartItemListComponent;
  let fixture: ComponentFixture<CartItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [CartItemListComponent, CartItemComponent],
      providers: [{ provide: CartService, useClass: MockCartService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
