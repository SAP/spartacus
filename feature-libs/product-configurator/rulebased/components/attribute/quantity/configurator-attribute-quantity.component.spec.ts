import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';
import { I18nTestingModule } from '@spartacus/core';
import { ItemCounterComponent } from '@spartacus/storefront';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuantityConfig } from '../../config/quantity-config';

class MockQuantityConfig {
  debounceTime = 500;
}

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
            provide: QuantityConfig,
            useClass: MockQuantityConfig,
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
    component.disableQuantityActions = false;

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
