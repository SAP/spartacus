import { PaymentManagementPageLayoutComponent } from './payment-management-page-layout.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('PaymentManagementPageLayoutComponent', () => {
  let component: PaymentManagementPageLayoutComponent;
  let fixture: ComponentFixture<PaymentManagementPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentManagementPageLayoutComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentManagementPageLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
