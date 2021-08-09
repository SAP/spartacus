import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GlobalMessageType, I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { MessageComponent } from './message.component';

@Component({
  template: `<cx-message>Test</cx-message>`,
})
class TestHostComponent {}

const mockCssClassForMessage: Record<string, boolean> = {
  'message-success': true,
  'message-info': false,
  'message-warning': false,
  'message-danger': false,
};

fdescribe('MessageComponent', () => {
  let component: MessageComponent;
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
    component = fixture.componentInstance;
  });

  it('should create message component', () => {
    expect(component).toBeTruthy();
  });

  it('should return proper css class base on type from input', () => {
    component.type = GlobalMessageType.MSG_TYPE_CONFIRMATION;

    expect(component.getCssClassesForMessage).toEqual(mockCssClassForMessage);
  });

  it('should return proper icon type base on type from input', () => {
    component.type = GlobalMessageType.MSG_TYPE_CONFIRMATION;

    expect(component.getIconType).toEqual(ICON_TYPE.SUCCESS);
  });

  it('should show <ng-content> content', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    const element = testFixture.debugElement.query(By.css('cx-message'))
      .nativeElement;

    expect(element.textContent).toEqual('Test');
  });
});
