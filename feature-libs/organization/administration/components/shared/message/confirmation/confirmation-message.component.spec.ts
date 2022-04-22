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
import { ConfirmationMessageComponent } from './confirmation-message.component';
import { ConfirmationMessageData } from './confirmation-message.model';

class MockMessageService {}

const MockMessageData: Partial<MessageData> = {
  message: {
    raw: 'Raw mock message',
  },
  events: new Subject(),
};

describe('ConfirmationMessageComponent', () => {
  let component: ConfirmationMessageComponent;
  let fixture: ComponentFixture<ConfirmationMessageComponent>;
  let messageData: MessageData<ConfirmationMessageData>;

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
      declarations: [ConfirmationMessageComponent],

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

    fixture = TestBed.createComponent(ConfirmationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have confirmation message', () => {
    const messageEl: HTMLElement = fixture.debugElement.query(
      By.css('.message p')
    ).nativeElement;
    expect(messageEl.innerText).toEqual('Raw mock message');
  });

  it('should have confirm button', () => {
    const button: HTMLElement = fixture.debugElement.query(
      By.css('button.confirm')
    ).nativeElement;
    expect(button).toBeDefined();
  });

  it('should have cancel button', () => {
    const button: HTMLElement = fixture.debugElement.query(
      By.css('button.cancel')
    ).nativeElement;
    expect(button).toBeDefined();
  });

  it('should emit confirm event', () => {
    const nextEvent = spyOn(messageData.events, 'next');
    const el: HTMLElement = fixture.debugElement.query(
      By.css('button.confirm')
    ).nativeElement;

    el.click();

    expect(nextEvent).toHaveBeenCalledWith({
      confirm: true,
    });
  });

  it('should not emit confirm event', () => {
    const nextEvent = spyOn(messageData.events, 'next');
    const el: HTMLElement = fixture.debugElement.query(
      By.css('button.cancel')
    ).nativeElement;

    el.click();

    expect(nextEvent).not.toHaveBeenCalledWith({
      confirm: true,
    } as ConfirmationMessageData);

    expect(nextEvent).toHaveBeenCalledWith({
      close: true,
    } as ConfirmationMessageData);
  });
});
