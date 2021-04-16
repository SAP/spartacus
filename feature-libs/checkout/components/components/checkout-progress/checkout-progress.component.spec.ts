import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutStep, CheckoutStepType } from '@spartacus/checkout/root';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { CheckoutProgressComponent } from './checkout-progress.component';

const mockCheckoutSteps: Array<CheckoutStep> = [
  {
    id: 'step0',
    name: 'step 0',
    routeName: 'route0',
    type: [CheckoutStepType.PAYMENT_TYPE],
  },
  {
    id: 'step1',
    name: 'step 1',
    routeName: 'route1',
    type: [CheckoutStepType.SHIPPING_ADDRESS],
  },
  {
    id: 'step2',
    name: 'step 2',
    routeName: 'route2',
    type: [CheckoutStepType.DELIVERY_MODE],
  },
];

class MockCheckoutStepService {
  steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<CheckoutStep[]>(
    mockCheckoutSteps
  );
  activeStepIndex$: Observable<number> = of(0);
}

@Pipe({
  name: 'cxUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

@Pipe({
  name: 'cxMultiLine',
})
class MockMultiLinePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('CheckoutProgressComponent', () => {
  let component: CheckoutProgressComponent;
  let fixture: ComponentFixture<CheckoutProgressComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [
          CheckoutProgressComponent,
          MockTranslateUrlPipe,
          MockMultiLinePipe,
        ],
        providers: [
          { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain steps with labels', () => {
    const steps = fixture.debugElement.query(By.css('.cx-nav')).nativeElement;

    mockCheckoutSteps.forEach((step) => {
      expect(steps.innerText).toContain(step.name);
    });
  });

  it('should contain link with "active" class', () => {
    const step = fixture.debugElement.query(
      By.css('.cx-item:nth-child(1) .cx-link')
    ).nativeElement;

    expect(step.getAttribute('class')).toContain('active');
  });

  it('should contain links with "disabled" class', () => {
    const steps = fixture.debugElement.queryAll(
      By.css('.cx-item .cx-link.disabled')
    );

    expect(steps.length).toBe(2);
  });

  describe('isActive()', () => {
    it('should return first step as active', () => {
      expect(component.isActive(0)).toBe(true);
    });

    it('should return second step as NOT active', () => {
      expect(component.isActive(1)).toBe(false);
    });
  });

  describe('isDisabled()', () => {
    it('should return first step as NOT disabled', () => {
      expect(component.isDisabled(0)).toBe(false);
    });

    it('should return second step as disabled', () => {
      expect(component.isDisabled(1)).toBe(true);
    });
  });

  describe('getTabIndex()', () => {
    beforeEach(() => {
      component.activeStepIndex = 1;
    });

    it('should return first step as focusable via tabindex', () => {
      expect(component.isActive(0)).toBe(false);
      expect(component.isDisabled(0)).toBe(false);
      expect(component.getTabIndex(0)).toBe(0);
    });

    it('should return second step as NOT focusable via tabindex', () => {
      expect(component.isActive(1)).toBe(true);
      expect(component.isDisabled(1)).toBe(false);
      expect(component.getTabIndex(1)).toBe(-1);
    });

    it('should return third step as NOT focusable via tabindex', () => {
      expect(component.isActive(2)).toBe(false);
      expect(component.isDisabled(2)).toBe(true);
      expect(component.getTabIndex(2)).toBe(-1);
    });
  });
});
