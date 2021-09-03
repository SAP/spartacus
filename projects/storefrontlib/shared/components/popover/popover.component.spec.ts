import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs/operators';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { KeyboardFocusTestingModule } from '../../../layout/a11y/keyboard-focus/focus-testing.module';
import { PopoverComponent } from './popover.component';
import { PopoverEvent, PopoverPosition } from './popover.model';
import { PositioningService } from '../../services/positioning/positioning.service';
import { Subject } from 'rxjs';

const mockPopoverPosition = 'top';

const mockPopoverProperties = {
  content: 'Test content',
  customClass: 'test-class',
  displayCloseButton: true,
  triggerElement: new ElementRef(document.createElement('a')),
};

class MockPositionService {
  positionElements(): PopoverPosition {
    return mockPopoverPosition;
  }

  getPositioningClass(): string {
    return `${mockPopoverPosition} auto`;
  }
}

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, IconModule, KeyboardFocusTestingModule],
      declarations: [PopoverComponent],
      providers: [
        { provide: PositioningService, useClass: MockPositionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverComponent);

    component = fixture.componentInstance;
    component.popoverInstance = fixture.componentRef;

    component.content = mockPopoverProperties.content;
    component.customClass = mockPopoverProperties.customClass;
    component.triggerElement = mockPopoverProperties.triggerElement;
    component.displayCloseButton = mockPopoverProperties.displayCloseButton;
    component.eventSubject = new Subject<PopoverEvent>();
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render `content` property', () => {
    expect(fixture.debugElement.nativeNode.innerText).toContain(
      mockPopoverProperties.content
    );
  });

  it('should contain custom class', () => {
    expect(fixture.debugElement.nativeNode.classList).toContain(
      mockPopoverProperties.customClass
    );
  });

  it('should contain position class', () => {
    expect(fixture.debugElement.nativeNode.classList).toContain(
      mockPopoverPosition
    );
  });

  it('should contain `opened` class', () => {
    expect(fixture.debugElement.nativeNode.classList).toContain('opened');
  });

  it('should contain close button', () => {
    expect(fixture.debugElement.query(By.css('button.close'))).toBeTruthy();
  });

  it('should not display close button', () => {
    component.displayCloseButton = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button.close'))).toBeFalsy();
  });

  it('should emit `insideClick` event', () => {
    component.eventSubject.pipe(take(1)).subscribe((event: PopoverEvent) => {
      expect(event).toBe(PopoverEvent.INSIDE_CLICK);
    });

    fixture.debugElement.query(By.css('.popover-body')).nativeElement.click();
    fixture.detectChanges();
  });

  it('should emit `closeButtonClick` event', () => {
    component.eventSubject.pipe(take(1)).subscribe((event: PopoverEvent) => {
      expect(event).toBe(PopoverEvent.CLOSE_BUTTON_CLICK);
    });

    fixture.debugElement.query(By.css('button.close')).nativeElement.click();
    fixture.detectChanges();
  });

  it('should emit `closeButtonKeydown` event', () => {
    component.eventSubject.pipe(take(1)).subscribe((event: PopoverEvent) => {
      expect(event).toBe(PopoverEvent.CLOSE_BUTTON_KEYDOWN);
    });

    fixture.debugElement
      .query(By.css('button.close'))
      .triggerEventHandler('keydown.enter', new Event('keydown'));
    fixture.detectChanges();
  });

  it('should emit `outsideClick` event', () => {
    component.eventSubject.pipe(take(1)).subscribe((event: PopoverEvent) => {
      expect(event).toBe(PopoverEvent.OUTSIDE_CLICK);
    });

    document.body.click();
    fixture.detectChanges();
  });

  it('should emit `escapeKeydown` event', () => {
    component.eventSubject.pipe(take(1)).subscribe((event: PopoverEvent) => {
      expect(event).toBe(PopoverEvent.ESCAPE_KEYDOWN);
    });

    fixture.debugElement.triggerEventHandler('keydown.escape', null);
    fixture.detectChanges();
  });
});
