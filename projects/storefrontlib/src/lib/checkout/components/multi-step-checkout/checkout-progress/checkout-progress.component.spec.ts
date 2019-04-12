import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutProgressComponent } from './checkout-progress.component';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutConfig } from '../../../config/checkout-config';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;

const mockRouterState = {
  state: {
    context: {
      id: defaultCheckoutConfig.checkout.steps[0].url,
    },
  },
};
class MockRoutingService {
  getRouterState(): Observable<any> {
    return of(mockRouterState);
  }
}

@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('CheckoutProgressComponent', () => {
  let component: CheckoutProgressComponent;
  let fixture: ComponentFixture<CheckoutProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [CheckoutProgressComponent, MockTranslateUrlPipe],
      providers: [
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.ngOnInit();
    component.steps = defaultCheckoutConfig.checkout.steps;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain steps with labels', () => {
    const steps = fixture.debugElement.query(By.css('.cx-nav')).nativeElement;

    MockCheckoutConfig.checkout.steps.forEach((step, index) => {
      expect(steps.innerText).toContain(step.name && index + 1);
    });
  });

  it('should contain link with "is-active" class', () => {
    const step = fixture.debugElement.query(
      By.css('.cx-item:nth-child(1) .cx-link')
    ).nativeElement;

    expect(step.getAttribute('class')).toContain('is-active');
  });

  it('should contain links with "is-disabled" class', () => {
    const steps = fixture.debugElement.queryAll(
      By.css('.cx-item .cx-link.is-disabled')
    );

    expect(steps.length).toBe(3);
  });
});
