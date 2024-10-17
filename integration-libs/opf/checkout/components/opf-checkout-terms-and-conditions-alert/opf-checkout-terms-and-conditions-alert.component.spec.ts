import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpfCheckoutTermsAndConditionsAlertComponent } from './opf-checkout-terms-and-conditions-alert.component';

@Component({
  selector: 'cx-icon',
  template: '<ng-content></ng-content>',
})
class MockIconComponent {
  @Input() type: string;
}

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

const alertSelector = '.cx-opf-checkout-terms-and-conditions-alert';

describe('OpfCheckoutTermsAndConditionsAlertComponent', () => {
  let fixture: ComponentFixture<OpfCheckoutTermsAndConditionsAlertComponent>;
  let component: OpfCheckoutTermsAndConditionsAlertComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OpfCheckoutTermsAndConditionsAlertComponent,
        MockIconComponent,
        MockTranslatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      OpfCheckoutTermsAndConditionsAlertComponent
    );
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render component if isVisible is set to true', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector(alertSelector);

    expect(alertElement).toBeTruthy();
  });

  it('should not render component if isVisible is set to false', () => {
    component.isVisible = false;
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector(alertSelector);

    expect(alertElement).toBeNull();
  });

  it('should set isVisible to false, if close method is called', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector(alertSelector);

    expect(alertElement).toBeTruthy();

    component.close();
    expect(component.isVisible).toBeFalsy();
  });
});
