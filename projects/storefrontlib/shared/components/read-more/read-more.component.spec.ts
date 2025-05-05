import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ReadMoreComponent } from './read-more.component';
import { By } from '@angular/platform-browser';

describe('ReadMoreComponent', () => {
  let component: ReadMoreComponent;
  let fixture: ComponentFixture<ReadMoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReadMoreComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display text truncated when collapsed by default', () => {
    const longText =
      'This is a long text that should be truncated by the ReadMoreComponent when collapsed.';
    component.text = longText;
    component.maxLength = 10;
    fixture.detectChanges();

    const displayedText = fixture.nativeElement.textContent;

    expect(displayedText.trim()).toBe(
      longText.slice(0, component.maxLength).trim()
    );
  });

  it('should display full text when expanded', () => {
    const longText =
      'This is a long text that should be truncated by the ReadMoreComponent when collapsed.';
    component.text = longText;
    component.maxLength = 10;
    component.isCollapsed = false; // Manually setting to test expanded state
    fixture.detectChanges();

    const displayedText = fixture.nativeElement.textContent;

    expect(displayedText.trim()).toBe(longText.trim());
  });

  it('should toggle isCollapsed when button is clicked', () => {
    const longText =
      'This is a long text that exceeds the maximum length threshold.';
    component.text = longText;
    component.maxLength = 10;
    component.showReadMore = true;
    fixture.detectChanges();

    expect(component.isCollapsed).toBe(true);

    const button = fixture.debugElement.query(By.css('button.btn-link'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isCollapsed).toBe(false);

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isCollapsed).toBe(true);
  });

  it('should not show read more button if text is less than max length', () => {
    const shortText = 'Short text';
    component.text = shortText;
    component.maxLength = 10;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn-link'));
    expect(button).toBeNull();
  });

  it('should show read more button if text is greater than max length', () => {
    const longText =
      'This is a long text that exceeds the maximum length threshold.';
    component.text = longText;
    component.maxLength = 10;
    component.showReadMore = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn-link'));
    expect(button).not.toBeNull();
  });
});
