import { ChangeDetectionStrategy, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { ConfiguratorAttributeSingleSelectionImageComponent } from './configurator-attribute-single-selection-image.component';

class MockGroupService {}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config;
}

describe('ConfigAttributeSingleSelectionImageComponent', () => {
  let component: ConfiguratorAttributeSingleSelectionImageComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeSingleSelectionImageComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeSingleSelectionImageComponent,
          MockFocusDirective,
        ],
        imports: [ReactiveFormsModule, NgSelectModule],
        providers: [
          ConfiguratorAttributeBaseComponent,
          ConfiguratorStorefrontUtilsService,
          {
            provide: ConfiguratorGroupsService,
            useClass: MockGroupService,
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeSingleSelectionImageComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  function createImage(url: string, altText: string): Configurator.Image {
    const image: Configurator.Image = {
      url: url,
      altText: altText,
    };
    return image;
  }

  function createValue(
    code: string,
    name: string,
    isSelected: boolean,
    images: Configurator.Image[]
  ): Configurator.Value {
    const value: Configurator.Value = {
      valueCode: code,
      name: name,
      selected: isSelected,
      images: images,
    };
    return value;
  }

  beforeEach(() => {
    const image = createImage('url', 'altText');
    const images: Configurator.Image[] = [image, image, image];
    const value1 = createValue('1', 'val1', false, images);
    const value2 = createValue('2', 'val2', false, images);
    const value3 = createValue('3', 'val3', false, images);
    const values: Configurator.Value[] = [value1, value2, value3];

    fixture = TestBed.createComponent(
      ConfiguratorAttributeSingleSelectionImageComponent
    );
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    component.attribute = {
      name: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
      required: false,
      selectedSingleValue: values[2].valueCode,
      groupId: 'testGroup',
      values: values,
    };
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 images', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('.cx-img').length).toBe(3);
  });

  it('should init with val3', () => {
    fixture.detectChanges();
    expect(component.attributeRadioButtonForm.value).toEqual(
      component.attribute.values[2].valueCode
    );
  });

  it('should select another single selection image value', () => {
    const singleSelectionImageId =
      '#cx-configurator--single_selection_image--' +
      component.attribute.name +
      '--' +
      component.attribute.values[1].valueCode +
      '-input';
    const valueToSelect = fixture.debugElement.query(
      By.css(singleSelectionImageId)
    ).nativeElement;
    expect(valueToSelect.checked).toBe(false);
    valueToSelect.click();
    fixture.detectChanges();
    expect(valueToSelect.checked).toBe(true);
    expect(component.attributeRadioButtonForm.value).toEqual(
      component.attribute.values[1].valueCode
    );
  });
});
