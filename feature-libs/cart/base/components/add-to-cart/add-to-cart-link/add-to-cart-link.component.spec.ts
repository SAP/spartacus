import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartLinkComponent } from './add-to-cart-link.component';

describe('AddToCartLinkComponent', () => {
  let component: AddToCartLinkComponent;
  let fixture: ComponentFixture<AddToCartLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToCartLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
