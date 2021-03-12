import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { KeyboardFocusTestingModule } from 'projects/storefrontlib/src/layout/a11y/keyboard-focus/focus-testing.module';
import { TruncateTextWithPopoverComponent } from './truncate-text-with-popover.component';
import { TruncateTextWithPopoverModule } from './truncate-text-with-popover.module';

const mockContent = 'Test text';

fdescribe('TruncateTextWithPopoverComponent', () => {
  let component: TruncateTextWithPopoverComponent;
  let fixture: ComponentFixture<TruncateTextWithPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          KeyboardFocusTestingModule,
          TruncateTextWithPopoverModule,
        ],
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
});
