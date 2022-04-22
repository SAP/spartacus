import { CommonModule } from '@angular/common';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from 'projects/storefrontlib/cms-components/misc/icon/testing/icon-testing.module';
import { MessageComponent } from './message.component';
import { MessageData } from './message.model';
import { MessageService } from './services';

const mockMessage1: MessageData = {
  message: {
    raw: 'mock message 1',
  },
};

const mockMessage2: MessageData = {
  message: {
    raw: 'mock message 2',
  },
};

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, IconTestingModule],
      declarations: [MessageComponent],
      providers: [MessageService],
    }).compileComponents();

    messageService = TestBed.inject(MessageService);
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a message component dynamically', () => {
    messageService.add(mockMessage1);
    const el: ElementRef[] = fixture.debugElement.queryAll(
      By.css('cx-org-notification')
    );
    expect(el.length).toEqual(1);
  });

  it('should add new message first', () => {
    messageService.add(mockMessage1);
    messageService.add(mockMessage2);
    fixture.detectChanges();
    const lastMessage: HTMLElement = fixture.debugElement.query(
      By.css('cx-org-notification:first-child')
    ).nativeElement;
    expect(lastMessage.innerText).toEqual('mock message 2');

    const firstMessage: HTMLElement = fixture.debugElement.query(
      By.css('cx-org-notification:last-child')
    ).nativeElement;
    expect(firstMessage.innerText).toEqual('mock message 1');
  });
});
