import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemListComponent } from './cart-item-list.component';

describe('CartItemListComponent', () => {
  let component: CartItemListComponent;
  let fixture: ComponentFixture<CartItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartItemListComponent]
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
