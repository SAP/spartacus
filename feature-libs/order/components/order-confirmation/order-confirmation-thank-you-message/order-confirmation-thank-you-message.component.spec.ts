import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  TranslationService,
} from '@spartacus/core';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
import { OrderFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderConfirmationThankYouMessageComponent } from './order-confirmation-thank-you-message.component';
import createSpy = jasmine.createSpy;

const replenishmentOrderCode = 'test-repl-code';
const mockOrder = {
  code: 'test-code-412',
  guid: 'guid',
  guestCustomer: true,
  paymentInfo: { billingAddress: { email: 'test@test.com' } },
};

@Component({ selector: 'cx-add-to-home-screen-banner', template: '' })
class MockAddtoHomeScreenBannerComponent {}

@Component({ selector: 'cx-guest-register-form', template: '' })
class MockGuestRegisterFormComponent {
  @Input() guid: string;
  @Input() email: string;
}

class MockOrderFacade implements Partial<OrderFacade> {
  getOrderDetails = createSpy().and.returnValue(of(mockOrder));
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add() {}
}

class MockTranslationService {
  translate = createSpy().and.returnValue(of('testMessage'));
}

describe('OrderConfirmationThankYouMessageComponent', () => {
  let component: OrderConfirmationThankYouMessageComponent;
  let fixture: ComponentFixture<OrderConfirmationThankYouMessageComponent>;

  let orderFacade: OrderFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          OrderConfirmationThankYouMessageComponent,
          MockAddtoHomeScreenBannerComponent,
          MockGuestRegisterFormComponent,
          MockFeatureLevelDirective,
        ],
        providers: [
          { provide: OrderFacade, useClass: MockOrderFacade },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
          { provide: TranslationService, useClass: MockTranslationService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      OrderConfirmationThankYouMessageComponent
    );
    component = fixture.componentInstance;
    orderFacade = TestBed.inject(OrderFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should display order code', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.cx-page-title')).nativeElement
        .innerHTML
    ).toContain(mockOrder.code);
  });

  it('should display replenishment order code', () => {
    orderFacade.getOrderDetails = createSpy().and.returnValue(
      of({ ...mockOrder, replenishmentOrderCode })
    );

    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('.cx-page-title')).nativeElement
        .innerHTML
    ).toContain(replenishmentOrderCode);
  });

  it('should display guest register form for guest user', () => {
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('cx-guest-register-form'))
    ).not.toBeNull();
  });

  it('should not display guest register form for login user', () => {
    orderFacade.getOrderDetails = createSpy().and.returnValue(
      of({ guid: 'guid', guestCustomer: false })
    );

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('cx-guest-register-form'))
    ).toBeNull();
  });

  it('should add assistive message after view init', () => {
    const addSpy: jasmine.Spy = spyOn(globalMessageService, 'add');
    const expectedMessage = `testMessage ${mockOrder.code}. testMessage testMessage`;

    component.ngOnInit();
    component.ngAfterViewInit();

    expect(addSpy).toHaveBeenCalledWith(
      expectedMessage,
      GlobalMessageType.MSG_TYPE_ASSISTIVE
    );
  });
});
