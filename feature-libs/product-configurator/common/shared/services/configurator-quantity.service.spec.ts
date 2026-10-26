import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { cold } from 'jasmine-marbles';
import { ConfiguratorQuantityService } from './configurator-quantity.service';

describe('ConfiguratorQuantityService', () => {
  let classUnderTest: ConfiguratorQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorQuantityService],
    });
    classUnderTest = TestBed.inject(ConfiguratorQuantityService);
  });

  describe('getQuantity', () => {
    it('should emit default quantity of 1', () => {
      expect(classUnderTest.getQuantity()).toBeObservable(cold('1', { 1: 1 }));
    });

    it('should return value that was set with setQuantity', async () => {
      const result = 100;
      classUnderTest.setQuantity(result);
      const quantity = await firstValueFrom(classUnderTest.getQuantity());
      expect(quantity).toBe(result);
    });
  });
});
