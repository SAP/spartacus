import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { IconModule } from '../../../../cms-components';
import { FileUploadModule, FormErrorsModule } from '../../form';
import { MessagingComponent } from './messaging.component';
import { MessageEvent } from './messaging.model';

const mockMessageEvent: MessageEvent = {
  rightAlign: false,
  text: 'mockMessage',
  author: 'Mark Rivers',
};

const mockMessageEventWithItem: MessageEvent = {
  rightAlign: true,
  text: 'mockMessage',
  author: 'Mark Rivers',
  item: { id: 'p123', name: 'Product 123' },
};
const mockMessageEvents: Array<MessageEvent> = [
  mockMessageEvent,
  mockMessageEventWithItem,
];

describe('MessagingComponent', () => {
  let component: MessagingComponent;
  let fixture: ComponentFixture<MessagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconModule,
        FileUploadModule,
        FormErrorsModule,
        ReactiveFormsModule,
      ],
      declarations: [MessagingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingComponent);
    component = fixture.componentInstance;
    component.messageEvents$ = of(mockMessageEvents);
    component.messagingConfigs = { displayAddMessageSection: of(true) };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSend on click of send', () => {
    spyOn(component, 'onSend');

    fixture.debugElement.query(By.css('.btn-primary')).nativeElement.click();
    fixture.detectChanges();

    expect(component.onSend).toHaveBeenCalled();
  });

  it('should emit send event', () => {
    spyOn(component.send, 'emit');
    component.form.get('message')?.setValue('mockMessage');
    component.onSend();

    expect(component.send.emit).toHaveBeenCalledWith({
      files: '' as unknown as File,
      message: 'mockMessage',
    });
  });

  it('should emit trigger downloadAttachment event', () => {
    spyOn(component.downloadAttachment, 'emit');
    component.form.get('message')?.setValue('mockMessage');
    component.triggerDownload('mockCode', 'mockId', 'mockName');

    expect(component.downloadAttachment.emit).toHaveBeenCalledWith({
      messageCode: 'mockCode',
      attachmentId: 'mockId',
      fileName: 'mockName',
    });
  });

  it('should not render an item link when there is no item attached to the message', () => {
    expect(
      fixture.debugElement.query(
        By.css('.cx-message-card:nth-child(1) .cx-message-item-link')
      )
    ).toBeNull();
  });

  it('should render an item link when there is an item attached to the message', () => {
    expect(
      fixture.debugElement.query(
        By.css('.cx-message-card:nth-child(2) .cx-message-item-link')
      ).nativeElement.text
    ).toEqual('Product 123:');
  });

  it('should fire itemClicked event when clicking item link', () => {
    spyOn(component.itemClicked, 'emit');
    fixture.debugElement
      .query(By.css('.cx-message-card:nth-child(2) .cx-message-item-link'))
      .nativeElement.click();
    expect(component.itemClicked.emit).toHaveBeenCalledWith({
      item: mockMessageEventWithItem.item,
    });
  });

  describe('getMessageText', () => {
    it('should return only message text if no item is provided', () => {
      expect(component.getMessageText(mockMessageEvent)).toEqual('mockMessage');
    });
    it('should prefix item name to the message text if an item is provided', () => {
      expect(component.getMessageText(mockMessageEventWithItem)).toEqual(
        'Product 123: mockMessage'
      );
    });
  });
});
