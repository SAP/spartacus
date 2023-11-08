import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventService, I18nTestingModule } from '@spartacus/core';
import {
  CustomerTicketingFacade,
  TicketEvent,
} from '@spartacus/customer-ticketing/root';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { CustomerTicketingMessagesComponent } from './customer-ticketing-messages.component';
import createSpy = jasmine.createSpy;
import { Component, Input } from '@angular/core';
import { MessagingConfigs } from '@spartacus/storefront';

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

  class MockCustomerTicketingFacade
    implements Partial<CustomerTicketingFacade>
  {
    createTicketEvent = () => createTicketResponse$;
    getTicket = createSpy().and.returnValue(EMPTY);
    downloadAttachment = createSpy().and.returnValue(EMPTY);
    uploadAttachment = createSpy().and.returnValue(EMPTY);
  }

  class MockEventService implements Partial<EventService> {
    dispatch<T extends object>(_event: T): void {}
  }

  @Component({
    selector: 'cx-messaging',
  })
  class MockCxMessagingComponent {
    @Input() messageEvents$: Observable<Array<MessageEvent>>;
    @Input() scrollToInput?: boolean = true;
    @Input() messagingConfigs?: MessagingConfigs;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        CustomerTicketingMessagesComponent,
        MockCxMessagingComponent,
      ],
      providers: [
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
        { provide: EventService, useClass: MockEventService },
      ],
    }).compileComponents();

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
    const fileList: FileList = {
      0: 'mockFile' as unknown as File,
      length: 1,
      item: () => 'mockFile' as unknown as File,
    };

    spyOn(customerTicketingFacade, 'createTicketEvent').and.callThrough();
    mockSendEvent.files = fileList;
    component.onSend(mockSendEvent);

    expect(customerTicketingFacade.uploadAttachment).toHaveBeenCalledWith(
      'mockFile' as unknown as File,
      'mockCode'
    );
  });

  it('should not call uploadAttachment if the file is not attached', () => {
    const fileList: FileList = {
      0: '' as unknown as File,
      length: 0,
      item: () => 'mockFile' as unknown as File,
    };

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
});
