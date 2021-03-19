import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { TruncateTextWithPopoverComponent } from './truncate-text-with-popover.component';
import { TruncateTextWithPopoverModule } from './truncate-text-with-popover.module';

const mockContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

describe('TruncateTextWithPopoverComponent', () => {
  let component: TruncateTextWithPopoverComponent;
  let fixture: ComponentFixture<TruncateTextWithPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, TruncateTextWithPopoverModule],
        declarations: [TruncateTextWithPopoverComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TruncateTextWithPopoverComponent);
    component = fixture.componentInstance;
    component.content = mockContent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should check content length and ', () => {
    it('return true if content length is bigger than max length', () => {
      expect(component.isLengthExceed).toBeTruthy();
    });

    it('return false if max length is bigger than content length', () => {
      component.content = 'TEST';
      fixture.detectChanges();

      expect(component.isLengthExceed).toBeFalsy();
    });
  });
});
