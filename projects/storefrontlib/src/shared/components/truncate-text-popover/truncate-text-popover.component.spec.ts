import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { TruncateTextPopoverComponent } from './truncate-text-popover.component';
import { TruncateTextPopoverModule } from './truncate-text-with-popover.module';

const mockContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

describe('TruncateTextPopoverComponent', () => {
  let component: TruncateTextPopoverComponent;
  let fixture: ComponentFixture<TruncateTextPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, TruncateTextPopoverModule],
        declarations: [TruncateTextPopoverComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TruncateTextPopoverComponent);
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
