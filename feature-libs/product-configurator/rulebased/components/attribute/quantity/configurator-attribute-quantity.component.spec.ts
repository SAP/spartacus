import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';
import { I18nTestingModule } from '@spartacus/core';
import { ItemCounterComponent } from '@spartacus/storefront';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

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
    spyOn(component, 'onChangeQuantity').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should button be enabled', () => {
    const button = fixture.debugElement.queryAll(
      By.css('cx-item-counter button')
    )[1].nativeElement;

    button.click();

    fixture.detectChanges();

    expect(component.onChangeQuantity).toHaveBeenCalled();
  });
});
