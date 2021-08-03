import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from 'projects/core/src/i18n';
import { ProgressButtonComponent } from './progress-button.component';

describe('ProgressButtonComponent', () => {
  let component: ProgressButtonComponent;
  let fixture: ComponentFixture<ProgressButtonComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ProgressButtonComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressButtonComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty button', () => {
    expect(
      el.query(By.css('.cx-progress-button-container .loader-container'))
    ).toBeNull();
  });

  it('should display spinner inside the button', () => {
    component.loading = true;
    fixture.detectChanges();

    expect(
      el.query(By.css('.cx-progress-button-container .loader-container'))
    ).toBeTruthy();
  });

  it('should trigger clickEvent on button click', () => {
    spyOn(component.clikEvent, 'emit');

    const button = el.query(By.css('.btn-primary')).nativeElement;
    button.click();

    expect(component.clikEvent.emit).toHaveBeenCalled();
  });
});
