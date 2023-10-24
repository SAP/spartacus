import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  CustomerTicketingFacade,
  STATUS_NAME,
  TicketDetails,
  TicketStarter,
} from '@spartacus/customer-ticketing/root';
import { LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, of, throwError } from 'rxjs';
import { CustomerTicketingCreateDialogComponent } from './customer-ticketing-create-dialog.component';
import createSpy = jasmine.createSpy;

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
  uploadAttachment = createSpy().and.returnValue(EMPTY);
}

describe('CustomerTicketingCreateDialogComponent', () => {
  let component: CustomerTicketingCreateDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingCreateDialogComponent>;
  let customerTicketingFacade: CustomerTicketingFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingCreateDialogComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();
    customerTicketingFacade = TestBed.inject(CustomerTicketingFacade);
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
    describe('when the form is valid', () => {
      beforeEach(() => {
        component.form.get('message')?.setValue(mockTicketStarter.message);
        component.form.get('subject')?.setValue(mockTicketStarter.subject);
        component.form.get('ticketCategory')?.setValue(mockCategories);
        component.form
          .get('associatedTo')
          ?.setValue(mockTicketAssociatedObjects);
      });

      it('should call createTicket if the form is valid', () => {
        component.createTicketRequest();

        expect(customerTicketingFacade.createTicket).toHaveBeenCalled();
      });

      it('should upload attachments after creating the ticket', () => {
        const mockFileList: File[] = [
          new File(['foo'], 'foo.txt', {
            type: 'text/plain',
          }),
        ];
        component.form.get('file')?.setValue(mockFileList);
        const mockTicketDetails: TicketDetails = {
          id: '000001',

          status: { id: 'mock-status-id', name: STATUS_NAME.OPEN },
          ticketEvents: [
            {
              code: 'code-000001',
              createdAt: 'mock-create-date',
              author: 'mock-author',
              message: 'mock-message',
              addedByAgent: true,
              ticketEventAttachments: [{}],
            },
          ],
        };

        (customerTicketingFacade.createTicket as jasmine.Spy).and.returnValue(
          of(mockTicketDetails)
        );

        component.createTicketRequest();

        expect(customerTicketingFacade.uploadAttachment).toHaveBeenCalled();
      });

      it('should close if there is an error creating the ticket', () => {
        spyOn(component, 'close').and.callThrough();
        (customerTicketingFacade.createTicket as jasmine.Spy).and.returnValue(
          throwError(() => 'error')
        );

        component.createTicketRequest();

        expect(component.close).toHaveBeenCalledWith('Something went wrong');
      });
    });

    it('should not call createTicket if the form is invalid', () => {
      component.form.get('subject')?.setValue('');
      component.createTicketRequest();
      expect(customerTicketingFacade.createTicket).not.toHaveBeenCalled();
    });
  });
});
