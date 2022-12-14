import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpfCheckoutPaymentsComponent } from './opf-checkout-payments.component';

describe('OpfCheckoutPaymentsComponent', () => {
  let component: OpfCheckoutPaymentsComponent;
  let fixture: ComponentFixture<OpfCheckoutPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpfCheckoutPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpfCheckoutPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
