import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';
import { Configurator } from '../../../core/model/configurator.model';
import { I18nTestingModule } from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { ConfiguratorShowMoreComponent } from '../../show-more/configurator-show-more.component';
import { By } from '@angular/platform-browser';
import { ItemCounterComponent } from '@spartacus/storefront';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
const mockQuantity = new FormControl(1);

fdescribe('ConfiguratorAttributeProductCardComponent', () => {
  let component: ConfiguratorAttributeProductCardComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeProductCardComponent>;

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
    quantity: number,
    selected: boolean,
    valueCode: string,
    valueDisplay: string
  ): Configurator.Value => {
    const value: Configurator.Value = {
      description,
      images,
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
          ConfiguratorAttributeProductCardComponent,
          ConfiguratorShowMoreComponent,
          ItemCounterComponent,
        ],
      })
        .overrideComponent(ConfiguratorAttributeProductCardComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeProductCardComponent
    );
    component = fixture.componentInstance;
    component.quantity = mockQuantity;
    component.disabledAction = false;
    component.multiSelect = false;
    component.product = createValue(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      [createImage('url', 'alt')],
      1,
      false,
      '1111-2222',
      'Lorem Ipsum Dolor'
    );

    spyOn(component, 'onHandleSelect').and.callThrough();
    spyOn(component, 'onHandleDeselect').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should button be enabled when disabledAction = false & selected = false', () => {
    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;
    expect(button.disabled).toBe(false);
  });

  it('should button be enabled when disabledAction = false & selected = true', () => {
    component.product.selected = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;
    expect(button.disabled).toBe(false);
  });

  it('should button be disabled when disabledAction = true & selected = true', () => {
    component.disabledAction = true;
    component.product.selected = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    expect(button.disabled).toBe(true);
  });

  it('should button be called with onHandleSelect', () => {
    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;
    button.click();

    fixture.detectChanges();

    expect(component.onHandleSelect).toHaveBeenCalled();
  });

  it('should button be called with onHandleDeselect', () => {
    component.product.selected = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    button.click();

    fixture.detectChanges();

    expect(component.onHandleDeselect).toHaveBeenCalled();
  });

  it('should button be select when multiSelect = false & selected = false', () => {
    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    expect(button.innerText).toContain('configurator.button.select');
  });

  it('should button be deselect when multiSelect = false & selected = true', () => {
    component.product.selected = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    expect(button.innerText).toContain('configurator.button.deselect');
  });

  it('should button be add when multiSelect = true & selected = false', () => {
    component.multiSelect = true;
    component.product.selected = false;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    expect(button.innerText).toContain('configurator.button.add');
  });

  it('should button be remove when multiSelect = true & selected = true', () => {
    component.multiSelect = true;
    component.product.selected = true;

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button.btn'))
      .nativeElement;

    expect(button.innerText).toContain('configurator.button.remove');
  });

  it('should quantity be hidden when multiSelect = false', () => {
    component.multiSelect = false;

    fixture.detectChanges();

    const quantityContainer = fixture.debugElement.query(
      By.css('.cx-configurator-attribute-product-card-quantity')
    );

    expect(quantityContainer).toBeNull();
  });

  it('should quantity be visible when multiSelect = true', () => {
    component.multiSelect = true;

    fixture.detectChanges();

    const quantityContainer = fixture.debugElement.query(
      By.css('.cx-configurator-attribute-product-card-quantity')
    );

    expect(quantityContainer).toBeDefined();
  });
});
