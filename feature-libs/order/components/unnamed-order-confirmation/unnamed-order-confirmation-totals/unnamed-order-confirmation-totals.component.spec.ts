import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UnnamedFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { UnnamedOrderConfirmationTotalsComponent } from './unnamed-order-confirmation-totals.component';
import createSpy = jasmine.createSpy;

class MockUnnamedService implements Partial<UnnamedFacade> {
  getOrderDetails = createSpy().and.returnValue(
    of({
      code: 'test-code-412',
    })
  );
}

describe('UnnamedOrderConfirmationTotalsComponent', () => {
  let component: UnnamedOrderConfirmationTotalsComponent;
  let fixture: ComponentFixture<UnnamedOrderConfirmationTotalsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [UnnamedOrderConfirmationTotalsComponent],
        providers: [{ provide: UnnamedFacade, useClass: MockUnnamedService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UnnamedOrderConfirmationTotalsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
