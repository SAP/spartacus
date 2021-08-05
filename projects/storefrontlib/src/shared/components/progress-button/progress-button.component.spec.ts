import { Component, DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from 'projects/core/src/i18n';
import { ProgressButtonComponent } from './progress-button.component';

@Component({
  template: `<cx-progress-button>Test</cx-progress-button>`,
})
class TestHostComponent {}

describe('ProgressButtonComponent', () => {
  let component: ProgressButtonComponent;
  let fixture: ComponentFixture<ProgressButtonComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ProgressButtonComponent, TestHostComponent],
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

  it('should not display spinner inside the disabled button', () => {
    component.disabled = true;
    fixture.detectChanges();

    const button = el.query(By.css('.btn-primary')).nativeElement;

    expect(
      el.query(By.css('.cx-progress-button-container .loader-container'))
    ).toBeFalsy();
    expect(button.disabled).toBeTruthy();
  });

  it('should trigger clickEvent on button click', () => {
    spyOn(component.clikEvent, 'emit').and.callThrough();

    const button = el.query(By.css('.btn-primary')).nativeElement;
    button.click();

    expect(component.clikEvent.emit).toHaveBeenCalled();
  });

  it('should show <ng-content> content', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    const element = testFixture.debugElement.query(By.css('div')).nativeElement;

    expect(element.textContent).toEqual('Test');
  });

  it('should add additional class', () => {
    component.class = 'testClass';
    fixture.detectChanges();

    const button = el.query(By.css('.btn-primary')).nativeElement;
    expect(button.className).toContain('testClass');
  });

  it('should add aria label attribute', () => {
    component.ariaLabel = 'testAriaLabel';
    fixture.detectChanges();

    const button = el.query(By.css('.btn-primary')).nativeElement;
    expect(button.ariaLabel).toContain('testAriaLabel');
  });

  describe('should not trigger clickEvent on button click when ', () => {
    beforeEach(() => {
      spyOn(component.clikEvent, 'emit').and.callThrough();
    });

    it('button is disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const button = el.query(By.css('.btn-primary')).nativeElement;
      button.click();

      expect(component.clikEvent.emit).not.toHaveBeenCalled();
    });

    it('component is loading', () => {
      component.loading = true;
      fixture.detectChanges();

      const button = el.query(By.css('.btn-primary')).nativeElement;
      button.click();

      expect(component.clikEvent.emit).not.toHaveBeenCalled();
    });
  });
});
