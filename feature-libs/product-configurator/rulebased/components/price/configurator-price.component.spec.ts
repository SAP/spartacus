import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ConfiguratorPriceComponent,
  ConfiguratorPriceType,
} from './configurator-price.component';

const mockProductPrice = 100;
const mockProductQuantity = 10;
const mockCalculatedTotal = 1000;

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
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('price type', () => {
    it('should be PRICE_ONLY', () => {
      component.productPrice = mockProductPrice;

      const type = component.getPriceType();

      expect(type).toEqual(ConfiguratorPriceType.PRICE_ONLY);
    });

    it('should be QUANTITY_ONLY', () => {
      component.quantity = mockProductQuantity;

      const type = component.getPriceType();

      expect(type).toEqual(ConfiguratorPriceType.QUANTITY_ONLY);
    });

    it('should be PRICE_AND_QUANTITY', () => {
      component.productPrice = mockProductPrice;
      component.quantity = mockProductQuantity;

      const type = component.getPriceType();

      expect(type).toEqual(ConfiguratorPriceType.PRICE_AND_QUANTITY);
    });
  });

  describe('calculating total', () => {
    it('should calculate for more than 1 product', () => {
      component.productPrice = mockProductPrice;
      component.quantity = mockProductQuantity;

      const total = component.calculateTotal();

      expect(total).toEqual(mockCalculatedTotal);
    });

    it('should calculate for 1 product', () => {
      component.productPrice = mockProductPrice;

      const total = component.calculateTotal();

      expect(total).toEqual(mockProductPrice);
    });

    it('should not calculate without product price', () => {
      const total = component.calculateTotal();

      expect(total).toBeUndefined();
    });
  });
});
