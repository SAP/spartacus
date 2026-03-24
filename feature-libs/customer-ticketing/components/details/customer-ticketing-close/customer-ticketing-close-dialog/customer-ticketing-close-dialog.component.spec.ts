import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  MockTranslationService,
  RoutingService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  CustomerTicketingFacade,
  STATUS,
  STATUS_NAME,
} from '@spartacus/customer-ticketing/root';
import {
  FocusConfig,
  FocusDirective,
  FormErrorsModule,
  ICON_TYPE,
  IconComponent,
  LaunchDialogService,
  MessagingComponent,
  MessagingConfigs,
} from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { CustomerTicketingCloseDialogComponent } from './customer-ticketing-close-dialog.component';
import createSpy = jasmine.createSpy;

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockCustomerTicketingFacade implements Partial<CustomerTicketingFacade> {
  createTicketEvent = createSpy().and.returnValue(EMPTY);
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  selector: 'cx-messaging',
  template: '',
})
class MockCxMessagingComponent {
  @Input() messageEvents$: Observable<Array<MessageEvent>>;
  @Input() scrollToInput?: boolean = true;
  @Input() messagingConfigs?: MessagingConfigs;
}

@Directive({ selector: '[cxFocus]' })
class MockKeyboardFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('CustomerTicketingCloseDialogComponent', () => {
  let component: CustomerTicketingCloseDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingCloseDialogComponent>;
  let customerTicketingFacade: CustomerTicketingFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormErrorsModule,
        CustomerTicketingCloseDialogComponent,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    })
      .overrideComponent(CustomerTicketingCloseDialogComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            IconComponent,
            MessagingComponent,
            FocusDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockCxIconComponent,
            MockCxMessagingComponent,
            MockKeyboardFocusDirective,
          ],
        },
      })
      .compileComponents();

    customerTicketingFacade = TestBed.inject(CustomerTicketingFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingCloseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form', () => {
    expect(component.form.get('message')?.value).toBeDefined();
    expect(component.form.get('file')?.value).toBeDefined();
  });

  describe('closeRequest', () => {
    it('should not call createTicketEvent if the form is invalid', () => {
      component.form.get('message')?.setValue('');
      component.closeRequest();

      expect(customerTicketingFacade.createTicketEvent).not.toHaveBeenCalled();
    });

    it('should call createTicketEvent if the form is valid', () => {
      const mockEvent = {
        message: 'mockMessage',
        toStatus: {
          id: STATUS.CLOSED,
          name: STATUS_NAME.CLOSED,
        },
      };

      component.form.get('message')?.setValue('mockMessage');
      component.closeRequest();

      expect(customerTicketingFacade.createTicketEvent).toHaveBeenCalledWith(
        mockEvent
      );
    });
  });
});
