import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { ItemCounterComponent } from '@spartacus/storefront';
import {
  ConfiguratorUISettings,
  DefaultConfiguratorUISettings,
} from '../../config/configurator-ui-settings';
import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';

describe(' ConfiguratorAttributeQuantityComponent', () => {
  let component: ConfiguratorAttributeQuantityComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeQuantityComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeQuantityComponent,
          ItemCounterComponent,
        ],
        imports: [I18nTestingModule],
        providers: [
          {
            provide: ConfiguratorUISettings,
            useValue: DefaultConfiguratorUISettings,
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeQuantityComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorAttributeQuantityComponent);

    component = fixture.componentInstance;
    component.initialQuantity = { quantity: 1 };
    component.quantity = new FormControl(1);
    component.readonly = false;

    spyOn(component.changeQuantity, 'emit').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleQuantity on event onChangeQuantity', () => {
    component.onChangeQuantity();

    expect(component.changeQuantity.emit).toHaveBeenCalled();
  });
});
