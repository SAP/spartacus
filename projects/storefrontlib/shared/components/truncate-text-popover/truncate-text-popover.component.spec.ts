import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { TruncateTextPopoverComponent } from './truncate-text-popover.component';
import { TruncateTextPopoverModule } from './truncate-text-popover.module';

const mockContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const mockContentLimitTo100Characters =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ... ';

describe('TruncateTextPopoverComponent', () => {
  let component: TruncateTextPopoverComponent;
  let fixture: ComponentFixture<TruncateTextPopoverComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          TruncateTextPopoverModule,
          RouterTestingModule,
        ],
        declarations: [TruncateTextPopoverComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TruncateTextPopoverComponent);
    component = fixture.componentInstance;
    component.content = mockContent;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should check content length and ', () => {
    it('return true if content length is bigger than max length', () => {
      expect(component.isTruncated).toBeTruthy();
    });

    it('return false if max length is bigger than content length', () => {
      component.content = 'TEST';
      fixture.detectChanges();

      expect(component.isTruncated).toBeFalsy();
    });
  });

  it('should render truncated text', () => {
    component.charactersLimit = 5;
    fixture.detectChanges();

    const truncatedText = fixture.debugElement.query(By.css('.truncated-text'))
      .nativeElement.innerText;

    expect(el.query(By.css('.truncated-text'))).toBeTruthy();
    expect(truncatedText).toEqual(mockContentLimitTo100Characters);
    expect(truncatedText.length).toEqual(104);
  });

  it('should render button with "more" text', () => {
    const buttonText = fixture.debugElement.query(By.css('button'))
      .nativeElement.innerText;

    expect(el.query(By.css('button'))).toBeTruthy();
    expect(buttonText).toContain('more');
  });
});
