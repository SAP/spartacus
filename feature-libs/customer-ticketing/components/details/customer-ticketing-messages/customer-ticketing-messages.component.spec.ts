import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  EventService,
  I18nTestingModule,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import {
  CustomerTicketingConfig,
  CustomerTicketingFacade,
  DATE_FORMAT_A11Y,
  STATUS_NAME,
  TicketDetails,
  TicketEvent,
} from '@spartacus/customer-ticketing/root';
import {
  MessageEvent,
  MessagingComponent,
  MessagingConfigs,
} from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { CustomerTicketingMessagesComponentService } from './customer-ticketing-messages-component.service';
import { CustomerTicketingMessagesComponent } from './customer-ticketing-messages.component';
import createSpy = jasmine.createSpy;

describe('CustomerTicketMessagesComponent', () => {
  let component: CustomerTicketingMessagesComponent;
  let fixture: ComponentFixture<CustomerTicketingMessagesComponent>;
  let customerTicketingFacade: CustomerTicketingFacade;

  const mockSendEvent: { files: FileList | undefined; message: string } = {
    files: '' as unknown as FileList,
    message: 'mock message',
  };

  const mockResponse = { message: mockSendEvent.message, code: 'mockCode' };

  const createTicketResponse$ = new BehaviorSubject<TicketEvent>({});
  const getTicket$ = new BehaviorSubject<TicketDetails>({});

  class MockCustomerTicketingFacade
    implements Partial<CustomerTicketingFacade>
  {
    createTicketEvent = () => createTicketResponse$;
    getTicket = createSpy().and.returnValue(getTicket$.asObservable());
    downloadAttachment = createSpy().and.returnValue(EMPTY);
    uploadAttachment = createSpy().and.returnValue(EMPTY);
  }

  class MockEventService implements Partial<EventService> {
    dispatch<T extends object>(_event: T): void {}
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, CustomerTicketingMessagesComponent],
      providers: [
        CustomerTicketingMessagesComponentService,
        provideMockFeatureToggles({ a11yMessagingListKeyboardFocus: false }),
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
        { provide: EventService, useClass: MockEventService },
      ],
    })
      .overrideComponent(CustomerTicketingMessagesComponent, {
        remove: {
          imports: [TranslatePipe, MessagingComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockCxMessagingComponent],
        },
      })
      .compileComponents();

    createTicketResponse$.next(mockResponse);
    customerTicketingFacade = TestBed.inject(CustomerTicketingFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createTicketEvent on send', () => {
    const mustWaitForAttachment = false;
    spyOn(customerTicketingFacade, 'createTicketEvent').and.callThrough();
    component.onSend(mockSendEvent);

    expect(customerTicketingFacade.createTicketEvent).toHaveBeenCalledWith(
      {
        message: 'mock message',
      },
      mustWaitForAttachment
    );
  });

  it('should call uploadAttachment if the file is attached', () => {
    // Create a mock FileList with [Symbol.iterator] to satisfy the FileList interface
    const file = 'mockFile' as unknown as File;
    const fileList: FileList = {
      0: file,
      length: 1,
      item: (index: number) => (index === 0 ? file : null),
      [Symbol.iterator]: function* () {
        yield file;
      },
    } as unknown as FileList;

    spyOn(customerTicketingFacade, 'createTicketEvent').and.callThrough();
    mockSendEvent.files = fileList;
    component.onSend(mockSendEvent);

    expect(customerTicketingFacade.uploadAttachment).toHaveBeenCalledWith(
      file,
      'mockCode'
    );
  });

  it('should not call uploadAttachment if the file is not attached', () => {
    // Create a mock FileList with [Symbol.iterator] to satisfy the FileList interface
    const file = '' as unknown as File;
    const fileList: FileList = {
      0: file,
      length: 0,
      item: () => null,
      [Symbol.iterator]: function* () {
        // No files to yield
      },
    } as unknown as FileList;

    spyOn(customerTicketingFacade, 'createTicketEvent').and.callThrough();
    mockSendEvent.files = fileList;
    component.onSend(mockSendEvent);

    expect(customerTicketingFacade.uploadAttachment).not.toHaveBeenCalled();
  });

  it('should call downloadAttachment', () => {
    const mockEvent = {
      messageCode: 'mockCode',
      attachmentId: 'mockId',
      fileName: 'mockName',
    };
    component.downloadAttachment(mockEvent);

    expect(customerTicketingFacade.downloadAttachment).toHaveBeenCalledWith(
      'mockCode',
      'mockId'
    );
  });

  describe('messaging', () => {
    let mockTicketDetails: TicketDetails;

    beforeEach(() => {
      mockTicketDetails = {
        ticketEvents: [
          {
            createdAt: 'mock-create-date',
            author: 'mock-author',
            message: 'mock-message',
            addedByAgent: true,
            ticketEventAttachments: [{}],
          },
        ],
        status: { id: 'mock-status-id', name: STATUS_NAME.OPEN },
      };

      getTicket$.next(mockTicketDetails);
    });

    it('should provide the ticket events as messages', () => {
      const expected: MessageEvent[] = [
        {
          createdAt: 'mock-create-date',
          author: 'mock-author',
          message: 'mock-message',
          addedByAgent: true,
          ticketEventAttachments: [{}],
          text: 'mock-message',
          rightAlign: true,
          attachments: [{}],
        } as MessageEvent & { message: string },
      ];

      component.messageEvents$.subscribe((actual) => {
        expect(actual).toEqual(expected);
      });
    });

    it('should generate a messages config', () => {
      const customerTicketingConfig = TestBed.inject(CustomerTicketingConfig);
      const actual = component.messagingConfigs;

      actual.displayAddMessageSection?.subscribe((displayAddMessageSection) =>
        expect(displayAddMessageSection).toBe(true)
      );
      expect(actual.attachmentRestrictions).toEqual(
        customerTicketingConfig.customerTicketing?.attachmentRestrictions
      );
      expect(actual.charactersLimit).toEqual(
        customerTicketingConfig.customerTicketing?.inputCharactersLimit
      );
      expect(actual.enableFileUploadOption).toBe(true);
      expect(actual.dateFormat).toBeUndefined();
    });
  });

  describe('a11yMessagingListKeyboardFocus feature toggle', () => {
    let toggleController: MockFeatureTogglesController;

    beforeEach(() => {
      toggleController = TestBed.inject(MockFeatureTogglesController);
    });

    describe('when toggle is OFF (default)', () => {
      it('should not set dateFormat in messagingConfigs', () => {
        toggleController.set('a11yMessagingListKeyboardFocus', false);
        fixture = TestBed.createComponent(CustomerTicketingMessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.messagingConfigs.dateFormat).toBeUndefined();
      });
    });

    describe('when toggle is ON', () => {
      it('should set dateFormat to DATE_FORMAT_A11Y in messagingConfigs', () => {
        toggleController.set('a11yMessagingListKeyboardFocus', true);
        fixture = TestBed.createComponent(CustomerTicketingMessagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.messagingConfigs.dateFormat).toBe(DATE_FORMAT_A11Y);
      });
    });
  });
});
