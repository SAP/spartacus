import { PaymentManagementPageComponent } from './payment-management-page.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { PaymentManagementPageLayoutModule } from '../../layout/payment-management-page-layout/payment-management-page-layout.module';

fdescribe('PaymentManagementPageLayoutComponent', () => {
  let component: PaymentManagementPageComponent;
  let fixture: ComponentFixture<PaymentManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PaymentManagementPageLayoutModule],
      declarations: [PaymentManagementPageComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentManagementPageComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
