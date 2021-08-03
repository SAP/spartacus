import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from 'projects/core/src/i18n';
import { SpinnerButtonComponent } from './spinner-button.component';

describe('SpinnerButtonComponent', () => {
  let component: SpinnerButtonComponent;
  let fixture: ComponentFixture<SpinnerButtonComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [SpinnerButtonComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerButtonComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty button', () => {
    expect(
      el.query(By.css('.cx-spinner-button-container .loader-container'))
    ).toBeNull();
  });

  it('should display spinner inside the button', () => {
    component.disabled = true;
    fixture.detectChanges();

    expect(
      el.query(By.css('.cx-spinner-button-container .loader-container'))
    ).toBeTruthy();
  });

  it('should display text inside the button', () => {
    component.text = 'Test';
    fixture.detectChanges();

    expect(
      el.query(By.css('.cx-spinner-button-container ng-content')).nativeElement
        .innerHTML
    ).toContain('Test');
  });

  it('should trigger clickEvent on button click', () => {
    spyOn(component.clikEvent, 'emit');

    const button = el.query(By.css('.btn-primary')).nativeElement;
    button.click();

    expect(component.clikEvent.emit).toHaveBeenCalled();
  });
});
