import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfiguratorQuantityService } from './configurator-quantity.service';
import { cold } from 'jasmine-marbles';

describe('ConfiguratorQuantityService', () => {
  let classUnderTest: ConfiguratorQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorQuantityService],
    });
    classUnderTest = TestBed.inject(ConfiguratorQuantityService);
  });

  describe('getQuantity', () => {
    it('should not emit anything until it will be initialized from outside', () => {
      expect(classUnderTest.getQuantity()).toBeObservable(cold(''));
    });

    it('should return value that was set with setQuantity', async () => {
      const result = 100;
      classUnderTest.setQuantity(result);
      const quantity = await firstValueFrom(classUnderTest.getQuantity());
      expect(quantity).toBe(result);
    });
  });
});
