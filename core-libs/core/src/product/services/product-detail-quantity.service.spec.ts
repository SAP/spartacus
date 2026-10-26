import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ProductDetailQuantityService } from './product-detail-quantity.service';

describe('ProductDetailQuantityService', () => {
  let service: ProductDetailQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailQuantityService);
  });

  it('should emit default quantity of 1', async () => {
    const quantity = await firstValueFrom(service.getQuantity());
    expect(quantity).toBe(1);
  });

  it('should emit quantity set via setQuantity', async () => {
    service.setQuantity(7);
    const quantity = await firstValueFrom(service.getQuantity());
    expect(quantity).toBe(7);
  });

  it('should return quantity set via setQuantity from getQuantityValue', () => {
    service.setQuantity(7);
    expect(service.getQuantityValue()).toBe(7);
  });

  it('should reset quantity to 1', async () => {
    service.setQuantity(4);
    service.reset();
    const quantity = await firstValueFrom(service.getQuantity());
    expect(quantity).toBe(1);
  });
});
