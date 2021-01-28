import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorPriceComponent } from './configurator-price.component';

describe('ConfiguratorPriceComponent', () => {
  let component: ConfiguratorPriceComponent;
  let fixture: ComponentFixture<ConfiguratorPriceComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorPriceComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorPriceComponent);
    component = fixture.componentInstance;

    //component.totalPrice = null;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  /**
  describe('price type', () => {
    it('should be PRICE_ONLY if only price was passed to the component', () => {
      component.valuePrice = mockValuePrice;

      const type = component.getPriceType();

      expect(type).toEqual(ConfiguratorPriceType.PRICE_ONLY);
    });

    it('should be QUANTITY_ONLY if only quantity was passed to the component', () => {
      component.quantity = mockQuantity;

      const type = component.getPriceType();

      expect(type).toEqual(ConfiguratorPriceType.QUANTITY_ONLY);
    });

    it('should be PRICE_AND_QUANTITY if both price and quantity were passed to the component', () => {
      component.valuePrice = mockValuePrice;
      component.quantity = mockQuantity;

      const type = component.getPriceType();

      expect(type).toEqual(ConfiguratorPriceType.PRICE_AND_QUANTITY);
    });
  });
   */
});
