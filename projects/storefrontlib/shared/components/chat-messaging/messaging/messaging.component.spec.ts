import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { IconModule } from 'projects/storefrontlib/cms-components';
import { of } from 'rxjs';
import { FileUploadModule, FormErrorsModule } from '../../form';
import { AvatarModule } from '../avatar';
import { MessagingComponent } from './messaging.component';
import { MessageEvent } from './messaging.model';

const mockMessageEvent: MessageEvent = {
  rightAlign: false,
  text: 'mockMessage',
  author: 'Mark Rivers',
};
const mockMessageEvents: Array<MessageEvent> = [
  mockMessageEvent,
  mockMessageEvent,
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
        AvatarModule,
        ReactiveFormsModule,
      ],
      declarations: [MessagingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingComponent);
    component = fixture.componentInstance;
    component.messageEvents$ = of(mockMessageEvents);
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

    expect(component.send.emit).toHaveBeenCalled();
  });
});
