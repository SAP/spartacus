import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfiguratorTextfieldInputFieldReadonlyComponent } from './configurator-textfield-input-field-readonly.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('TextfieldInputFieldReadonlyComponent', () => {
  let component: ConfiguratorTextfieldInputFieldReadonlyComponent;
  let htmlElem: HTMLElement;
  let fixture: ComponentFixture<ConfiguratorTextfieldInputFieldReadonlyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorTextfieldInputFieldReadonlyComponent,
          MockTranslateUrlPipe,
        ],
      })
        .overrideComponent(ConfiguratorTextfieldInputFieldReadonlyComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorTextfieldInputFieldReadonlyComponent
    );
    component = fixture.componentInstance;
    component.attribute = {
      configurationLabel: 'attributeName',
      configurationValue: 'input123',
    };
    fixture.detectChanges();
    htmlElem = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a visually hidden span', () => {
    const idLabel = component.getIdLabel(component.attribute);
    const elementsSpan = htmlElem.querySelectorAll('#' + idLabel);
    expect(elementsSpan.length).toBe(1);
    const elementSpan = elementsSpan[0];
    expect(elementSpan.id).toBe(idLabel);
    expect(elementSpan.className).toBe('cx-visually-hidden');
  });

  it('should render a hidden label', () => {
    const elementsLabel = htmlElem.querySelectorAll('label');
    expect(elementsLabel.length).toBe(1);
    const elementLabel = elementsLabel[0];
    expect(elementLabel.innerHTML).toBe(component.attribute.configurationLabel);
  });

  it('should render a value', () => {
    const elementsDiv = htmlElem.querySelectorAll('div');
    expect(elementsDiv.length).toBe(1);
    const elementDiv = elementsDiv[0];
    expect(elementDiv.innerHTML).toContain(
      component.attribute.configurationValue
    );
  });
});
