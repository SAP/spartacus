import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from 'projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
import { KeyboardFocusTestingModule } from 'projects/storefrontlib/layout/a11y/keyboard-focus/focus-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { Subject } from 'rxjs';
import { MessageData } from '../message.model';
import { MessageService } from '../services/message.service';
import { NotificationMessageComponent } from './notification-message.component';

class MockMessageService {}

const MockMessageData: Partial<MessageData> = {
  message: {
    raw: 'Raw mock message',
  },
  events: new Subject(),
};

describe('NotificationMessageComponent', () => {
  let component: NotificationMessageComponent;
  let fixture: ComponentFixture<NotificationMessageComponent>;
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
      declarations: [NotificationMessageComponent],

      providers: [
        {
          provide: MessageData,
          useValue: MockMessageData,
        },
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
      ],
    }).compileComponents();

    messageData = TestBed.inject(MessageData);

    fixture = TestBed.createComponent(NotificationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have notification message', () => {
    const el: HTMLElement = fixture.debugElement.query(
      By.css('p')
    ).nativeElement;
    expect(el.innerText).toEqual('Raw mock message');
  });

  it('should have close button', () => {
    const closeButton: HTMLElement = fixture.debugElement.query(
      By.css('button.close')
    ).nativeElement;
    expect(closeButton).toBeDefined();
  });

  it('should emit close event', () => {
    const nextEvent = spyOn(messageData.events, 'next');
    const el: HTMLElement = fixture.debugElement.query(
      By.css('button.close')
    ).nativeElement;

    el.click();

    expect(nextEvent).toHaveBeenCalledWith({
      close: true,
    });
  });
});
