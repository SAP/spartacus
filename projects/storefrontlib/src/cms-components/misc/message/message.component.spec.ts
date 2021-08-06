import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let messageComponent: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [MessageComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    messageComponent = fixture.componentInstance;
  });

  it('should create message component', () => {
    expect(messageComponent).toBeTruthy();
  });
});
