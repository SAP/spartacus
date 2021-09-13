import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalMessageType, I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { IconTestingModule } from 'projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
import { KeyboardFocusTestingModule } from 'projects/storefrontlib/layout/a11y/keyboard-focus/focus-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { Subject } from 'rxjs';
import { BaseMessageComponent } from './base-message.component';
import { MessageData } from './message.model';

const MockMessageData: Partial<MessageData> = {
  message: {
    raw: 'Raw mock message',
  },
  type: GlobalMessageType.MSG_TYPE_INFO,
  events: new Subject(),
};

@Component({
  template: '',
})
class MessageComponent extends BaseMessageComponent {}

describe('BaseMessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let messageData: MessageData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        PaginationTestingModule,
        KeyboardFocusTestingModule,
        I18nTestingModule,
        IconTestingModule,
      ],
      declarations: [MessageComponent],

      providers: [
        {
          provide: MessageData,
          useValue: MockMessageData,
        },
      ],
    }).compileComponents();

    messageData = TestBed.inject(MessageData);

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have message', () => {
    component.ngOnInit();
    expect(component.message).toEqual({ raw: 'Raw mock message' });
  });

  describe('icons', () => {
    it('should have icon', () => {
      messageData.messageIcon = ICON_TYPE.CIRCLE;
      component.ngOnInit();
      expect(component.messageIcon).toEqual(ICON_TYPE.CIRCLE);
    });

    it('should not have icon', () => {
      messageData.messageIcon = undefined;
      component.ngOnInit();
      expect(component.messageIcon).toBeFalsy();
    });
  });

  describe('message type', () => {
    it('should have info type', () => {
      messageData.type = GlobalMessageType.MSG_TYPE_INFO;
      component.ngOnInit();
      expect(component.type).toEqual('info');
    });

    it('should have warning type', () => {
      messageData.type = GlobalMessageType.MSG_TYPE_WARNING;
      component.ngOnInit();
      expect(component.type).toEqual('warning');
    });

    it('should have error type', () => {
      messageData.type = GlobalMessageType.MSG_TYPE_ERROR;
      component.ngOnInit();
      expect(component.type).toEqual('error');
    });

    it('should have default info type', () => {
      messageData.type = undefined;
      component.ngOnInit();
      expect(component.type).toEqual('info');
    });
  });

  describe('close()', () => {
    beforeEach(function () {
      // https://github.com/gruntjs/grunt-contrib-jasmine/issues/213
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });

    it('should emit close event', () => {
      const nextEvent = spyOn(messageData.events, 'next');
      component.close();
      expect(nextEvent).toHaveBeenCalledWith({
        close: true,
      });
    });

    it('should close after message timeout', () => {
      const nextEvent = spyOn(messageData.events, 'next');
      messageData.timeout = 10;
      component.ngOnInit();

      expect(nextEvent).not.toHaveBeenCalled();
      jasmine.clock().tick(10);
      expect(nextEvent).toHaveBeenCalledWith({
        close: true,
      });
    });
  });
});
