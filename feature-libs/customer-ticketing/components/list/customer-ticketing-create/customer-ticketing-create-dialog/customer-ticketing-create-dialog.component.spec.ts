import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  I18nTestingModule,
  RoutingService,
  Translatable,
  TranslationService,
} from '@spartacus/core';
import {
  CustomerTicketingFacade,
  TicketStarter,
} from '@spartacus/customer-ticketing/root';
import {
  FileUploadModule,
  FocusConfig,
  FormErrorsModule,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { CustomerTicketingCreateDialogComponent } from './customer-ticketing-create-dialog.component';
import createSpy = jasmine.createSpy;
import { Component, Directive, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

const mockCategories = [
  {
    id: 'ENQUIRY',
    name: 'Enquiry',
  },
];

const mockTicketAssociatedObjects = [
  {
    code: '00000626',
    modifiedAt: '2022-06-30T16:16:44+0000',
    type: 'Order',
  },
];

const mockTicketStarter: TicketStarter = {
  message: 'Test',
  subject: 'Test',
  ticketCategory: {
    id: 'ENQUIRY',
    name: 'Enquiry',
  },
  associatedTo: {
    code: '00000626',
    modifiedAt: '2022-06-30T16:16:44+0000',
    type: 'Order',
  },
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}
class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockCustomerTicketingFacade implements Partial<CustomerTicketingFacade> {
  createTicket = createSpy().and.returnValue(EMPTY);
  getCreateTicketPayload = createSpy().and.returnValue(of(mockTicketStarter));
  getTicketCategories = createSpy().and.returnValue(of(mockCategories));
  getTicketAssociatedObjects = createSpy().and.returnValue(
    of(mockTicketAssociatedObjects)
  );
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  get(): Observable<GlobalMessageEntities> {
    return of({});
  }
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
  remove(_: GlobalMessageType, __?: number): void {}
}

class MockTranslationService {
  translate(): Observable<string> {
    return of('translated string');
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('CustomerTicketingCreateDialogComponent', () => {
  let component: CustomerTicketingCreateDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingCreateDialogComponent>;
  let customerTicketingFacade: CustomerTicketingFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule,
      ],
      declarations: [
        CustomerTicketingCreateDialogComponent,
        MockCxIconComponent,
        MockKeyboadFocusDirective,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    }).compileComponents();
    customerTicketingFacade = TestBed.inject(CustomerTicketingFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(globalMessageService, 'add').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build form', () => {
    expect(component.form.get('message')?.value).toBeDefined();
    expect(component.form.get('subject')?.value).toBeDefined();
    expect(component.form.get('ticketCategory')?.value).toBeDefined();
    expect(component.form.get('associatedTo')?.value).toBeDefined();
    expect(component.form.get('file')?.value).toBeDefined();
  });

  describe('trigger create ticket request', () => {
    it('should call createTicket if the form is valid', () => {
      component.form.get('message')?.setValue(mockTicketStarter.message);
      component.form.get('subject')?.setValue(mockTicketStarter.subject);
      component.form.get('ticketCategory')?.setValue(mockCategories);
      component.form.get('associatedTo')?.setValue(mockTicketAssociatedObjects);
      component.createTicketRequest();

      expect(customerTicketingFacade.createTicket).toHaveBeenCalled();
    });

    it('should not call createTicket if the form is invalid', () => {
      component.form.get('subject')?.setValue('');
      component.createTicketRequest();
      expect(customerTicketingFacade.createTicket).not.toHaveBeenCalled();
    });

    it('should handle HttpErrorModel error correctly when creating a ticket', () => {
      const expectedErrorMessage = 'mock-error-message';
      const error = new HttpErrorModel();
      error.details = [{ message: expectedErrorMessage }];
      customerTicketingFacade.createTicket = createSpy().and.returnValue(
        throwError(error)
      );
      component.form.get('message')?.setValue(mockTicketStarter.message);
      component.form.get('subject')?.setValue(mockTicketStarter.subject);
      component.form.get('ticketCategory')?.setValue(mockCategories);
      component.form.get('associatedTo')?.setValue(mockTicketAssociatedObjects);
      component.createTicketRequest();

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: expectedErrorMessage },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should handle other error correctly when creating a ticket', () => {
      const expectedErrorMessage = 'error';
      customerTicketingFacade.createTicket = createSpy().and.returnValue(
        throwError(expectedErrorMessage)
      );
      component.form.get('message')?.setValue(mockTicketStarter.message);
      component.form.get('subject')?.setValue(mockTicketStarter.subject);
      component.form.get('ticketCategory')?.setValue(mockCategories);
      component.form.get('associatedTo')?.setValue(mockTicketAssociatedObjects);
      component.createTicketRequest();

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { raw: 'translated string' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
