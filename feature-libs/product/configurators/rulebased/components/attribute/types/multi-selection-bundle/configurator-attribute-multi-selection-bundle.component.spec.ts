import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorAttributeMultiSelectionBundleComponent } from './configurator-attribute-multi-selection-bundle.component';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeProductCardComponent } from '../../product-card/configurator-attribute-product-card.component';
import { I18nTestingModule } from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemCounterComponent } from '@spartacus/storefront';
import { ConfiguratorShowMoreComponent } from '../../../show-more/configurator-show-more.component';

fdescribe('ConfiguratorAttributeMultiSelectionBundleComponent', () => {
  let component: ConfiguratorAttributeMultiSelectionBundleComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeMultiSelectionBundleComponent>;
  let htmlElem: HTMLElement;

  const createImage = (url: string, altText: string): Configurator.Image => {
    const image: Configurator.Image = {
      url: url,
      altText: altText,
    };
    return image;
  };

  const createValue = (
    description: string,
    images: Configurator.Image[],
    name,
    quantity: number,
    selected: boolean,
    valueCode: string,
    valueDisplay: string
  ): Configurator.Value => {
    const value: Configurator.Value = {
      description,
      images,
      name,
      quantity,
      selected,
      valueCode,
      valueDisplay,
    };
    return value;
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          RouterTestingModule,
          UrlTestingModule,
          ReactiveFormsModule,
        ],
        declarations: [
          ConfiguratorAttributeMultiSelectionBundleComponent,
          ConfiguratorAttributeProductCardComponent,
          ConfiguratorShowMoreComponent,
          ItemCounterComponent,
        ],
      })
        .overrideComponent(ConfiguratorAttributeMultiSelectionBundleComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    const values: Configurator.Value[] = [
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        true,
        '1111',
        'Lorem Ipsum Dolor'
      ),
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        true,
        '2222',
        'Lorem Ipsum Dolor'
      ),
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '3333',
        'Lorem Ipsum Dolor'
      ),
      createValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '4444',
        'Lorem Ipsum Dolor'
      ),
    ];

    fixture = TestBed.createComponent(
      ConfiguratorAttributeMultiSelectionBundleComponent
    );
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    component.attribute = {
      name: 'attributeName',
      attrCode: 1111,
      uiType: Configurator.UiType.CHECKBOXLIST_PRODUCT,
      required: true,
      groupId: 'testGroup',
      values: values,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with OnInit', () => {
    expect(component.disableDeselectAction$.getValue()).toBe(false);
    component.disableDeselectAction$.next(true);
    fixture.detectChanges();

    expect(component.disableDeselectAction$.getValue()).toBe(true);
  });

  it('should render 4 multi selection bundle items after init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const cardList = htmlElem.querySelectorAll(
      '.cx-configurator-attribute-product-card'
    );

    expect(cardList.length).toBe(4);
  });

  it('should mark two items as selected', () => {
    component.ngOnInit();

    expect(component.attribute.values[0].selected).toEqual(true);
    expect(component.attribute.values[1].selected).toEqual(true);
    expect(component.attribute.values[2].selected).toEqual(false);
    expect(component.attribute.values[3].selected).toEqual(false);
  });
});
