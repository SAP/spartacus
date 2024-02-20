import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { AvatarComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { IconModule } from '../../../../cms-components';
import { FileUploadModule, FormErrorsModule } from '../../form';
import { MessagingComponent } from './messaging.component';
import {
  MessageEvent,
  MessageEventBoundItem,
  MessagingConfigs,
} from './messaging.model';

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

const mockItemList: MessageEventBoundItem[] = [
  { id: '', name: 'NO SELECTION' },
  { id: 'p1', name: 'Product 1' },
  { id: 'p2', name: 'Product 2' },
];

describe('MessagingComponent', () => {
  let component: MessagingComponent;
  let fixture: ComponentFixture<MessagingComponent>;
  let messagingConfig: MessagingConfigs;
  let htmlElement: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconModule,
        FileUploadModule,
        FormErrorsModule,
        ReactiveFormsModule,
      ],

      declarations: [MessagingComponent, AvatarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingComponent);
    component = fixture.componentInstance;
    component.messageEvents$ = of(mockMessageEvents);
    component.messagingConfigs = messagingConfig = {
      displayAddMessageSection: of(true),
    };
    fixture.detectChanges();
    htmlElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSend on click of send', () => {
    spyOn(component, 'onSend');

    fixture.debugElement.query(By.css('.cx-send')).nativeElement.click();
    fixture.detectChanges();

    expect(component.onSend).toHaveBeenCalled();
  });

  it('should render send as btn-primary by default', () => {
    expect(htmlElement.querySelectorAll('.btn-primary').length).toBe(1);
    expect(htmlElement.querySelectorAll('.btn-secondary').length).toBe(0);
  });

  it('should render send as btn-secondary if requested', () => {
    (component.messagingConfigs ?? {}).sendBtnIsNotPrimary = true;
    fixture.detectChanges();
    expect(htmlElement.querySelectorAll('.btn-primary').length).toBe(0);
    expect(htmlElement.querySelectorAll('.btn-secondary').length).toBe(1);
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

  describe('with item support', () => {
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

    it('should not render an item selection control (drop down list box) when there are no items provided', () => {
      expect(
        fixture.debugElement.query(By.css('.cx-message-item-selection'))
      ).toBeNull();
    });

    it('should render an item selection control (drop down list box) when there are items provided', () => {
      messagingConfig.itemList$ = of(mockItemList);
      fixture.detectChanges();
      expect(
        fixture.debugElement.queryAll(
          By.css('.cx-message-item-selection option')
        ).length
      ).toBe(mockItemList.length);
    });

    it('should set the default item accordingly to provided config', () => {
      messagingConfig.itemList$ = of(mockItemList);
      messagingConfig.defaultItemId = mockItemList[2].id;
      component.ngOnInit(); // so the just changed config is considered
      expect(component.form.get('item')?.value).toEqual(mockItemList[2].id);
    });

    it('should emit selected itemId when adding a new message', () => {
      spyOn(component.send, 'emit');
      messagingConfig.itemList$ = of(mockItemList);
      fixture.detectChanges();

      const itemDDLB = fixture.debugElement.query(
        By.css('.cx-message-item-selection')
      ).nativeElement;
      itemDDLB.value = 'p1';
      itemDDLB.dispatchEvent(new Event('change'));

      const messageInput = fixture.debugElement.query(
        By.css('.cx-message-input input')
      ).nativeElement;
      messageInput.value = 'yet another text';
      messageInput.dispatchEvent(new Event('input'));
      fixture.debugElement.query(By.css('.btn-primary')).nativeElement.click();

      fixture.detectChanges();
      expect(component.send.emit).toHaveBeenCalledWith({
        files: '' as unknown as File,
        message: 'yet another text',
        itemId: 'p1',
      });
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
  describe('resetForm', () => {
    beforeEach(() => {
      component.fileUploadComponent = jasmine.createSpyObj(
        'fileUploadComponent',
        ['removeFile']
      );
    });
    it('should remove all files uploaded', () => {
      component.resetForm();
      expect(component.fileUploadComponent?.removeFile).toHaveBeenCalled();
    });
    it('should not fail if there is no file upload component', () => {
      component.fileUploadComponent = undefined;
      spyOn(component.form, 'reset');
      component.resetForm();
      expect(component.form.reset).toHaveBeenCalled();
    });

    it('should reset item DDLB to the default entry', () => {
      const defaultItemId = 'default';
      messagingConfig.defaultItemId = defaultItemId;
      spyOn(component.form, 'reset');
      component.resetForm();
      expect(component.form.reset).toHaveBeenCalledWith({
        item: defaultItemId,
      });
    });
  });
});
