import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { TruncateTextWithPopoverComponent } from './truncate-text-with-popover.component';
import { TruncateTextWithPopoverModule } from './truncate-text-with-popover.module';

const mockContent = 'Test text';

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
});
