import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CheckoutStep, CheckoutStepType } from '@spartacus/checkout/base/root';
import {
  CurrencyService,
  CxDatePipe,
  LanguageService,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { MockUrlPipe } from '../../../../../core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { BehaviorSubject, firstValueFrom, Observable, of } from 'rxjs';
import { CheckoutStepService } from '../services/checkout-step.service';
import { CheckoutProgressComponent } from './checkout-progress.component';
import { MultiLinePipe } from './multiline-titles.pipe';

const mockCheckoutSteps: Array<CheckoutStep> = [
  {
    id: 'step0',
    name: 'step 0',
    routeName: 'route0',
    type: [CheckoutStepType.PAYMENT_DETAILS],
  },
  {
    id: 'step1',
    name: 'step 1',
    routeName: 'route1',
    type: [CheckoutStepType.DELIVERY_ADDRESS],
  },
  {
    id: 'step2',
    name: 'step 2',
    routeName: 'route2',
    type: [CheckoutStepType.DELIVERY_MODE],
  },
];

class MockCheckoutStepService implements Partial<CheckoutStepService> {
  steps$: BehaviorSubject<CheckoutStep[]> = new BehaviorSubject<CheckoutStep[]>(
    mockCheckoutSteps
  );
  activeStepIndex$: Observable<number> = of(0);
}

@Pipe({ name: 'cxMultiLine' })
class MockMultiLinePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('CheckoutProgressComponent', () => {
  let component: CheckoutProgressComponent;
  let fixture: ComponentFixture<CheckoutProgressComponent>;

  beforeEach(async () => {
    const mockCurrencyService = {
      getActive: () => of('USD'),
    };
    const mockLanguageService = {
      getActive: () => of('en'),
    };
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), CheckoutProgressComponent],
      providers: [
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        { provide: CurrencyService, useValue: mockCurrencyService },
        { provide: LanguageService, useValue: mockLanguageService },
      ],
    })
      .overrideComponent(CheckoutProgressComponent, {
        remove: {
          imports: [TranslatePipe, MockUrlPipe, CxDatePipe, MultiLinePipe],
        },
        add: {
          imports: [MockTranslatePipe, MockUrlPipe, MockMultiLinePipe],
        },
      })
      .compileComponents();
  });

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
      expect(steps.textContent?.trim()).toContain(step.name);
    });
  });

  it('should combine currency and language into params$', async () => {
    component.ngOnInit();
    const [currency, language] = await firstValueFrom(component.params$);
    expect(currency).toBe('USD');
    expect(language).toBe('en');
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

  describe('getStepState()', () => {
    beforeEach(() => {
      component.activeStepIndex = 1;
    });

    it('should return first step as completed', () => {
      expect(component.getStepState(0)).toBe('completed');
    });

    it('should return second step as selected', () => {
      expect(component.getStepState(1)).toBe('selected');
    });

    it('should return third step as disabled', () => {
      expect(component.getStepState(2)).toBe('disabled');
    });
  });
});
