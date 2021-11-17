import { Component, DebugElement, Input } from '@angular/core';
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
  'cx-message-success': true,
  'cx-message-info': false,
  'cx-message-warning': false,
  'cx-message-danger': false,
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [MessageComponent, MockCxIconComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create message component', () => {
    expect(component).toBeTruthy();
  });

  it('should return proper css class base on type from input', () => {
    component.type = GlobalMessageType.MSG_TYPE_CONFIRMATION;
    fixture.detectChanges();

    expect(component.getCssClassesForMessage).toEqual(mockCssClassForMessage);
  });

  it('should return proper icon type base on type from input', () => {
    component.type = GlobalMessageType.MSG_TYPE_CONFIRMATION;
    fixture.detectChanges();

    expect(component.getIconType).toEqual(ICON_TYPE.SUCCESS);
  });

  it('should show <ng-content> content', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    const element = testFixture.debugElement.query(
      By.css('cx-message')
    ).nativeElement;
    expect(element.textContent).toEqual('Test');
  });

  it('should show close button and trigger close action', () => {
    spyOn(component.closeMessage, 'emit');

    const button = el.query(By.css('.cx-message .close')).nativeElement;
    button.click();

    expect(button).toBeTruthy();
    expect(component.closeMessage.emit).toHaveBeenCalled();
  });

  it('should show message component with text in header', () => {
    component.text = 'Test';
    fixture.detectChanges();

    const text = el.query(
      By.css('.cx-message .cx-message-header .cx-message-text')
    ).nativeElement;

    expect(text.textContent).toEqual(' Test ');
  });

  it('should show action button and trigger button action', () => {
    spyOn(component.buttonAction, 'emit');
    component.actionButtonText = 'Test';
    fixture.detectChanges();

    const button = el.query(
      By.css('.cx-message .cx-action-link')
    ).nativeElement;
    button.click();

    expect(button.textContent).toEqual(' Test ');
    expect(button).toBeTruthy();
    expect(component.buttonAction.emit).toHaveBeenCalled();
  });
});
