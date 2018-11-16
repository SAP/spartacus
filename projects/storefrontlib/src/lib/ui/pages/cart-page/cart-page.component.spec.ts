import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from '../../../cart/services';
import { CartPageComponent } from './cart-page.component';
import { Component } from '@angular/core';

@Component({
  template: '',
  selector: 'cx-cart-page-layout'
})
class MockCartPageComponent {}

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartPageComponent, MockCartPageComponent],
      providers: [{ provide: CartService, useClass: MockCartPageComponent }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
