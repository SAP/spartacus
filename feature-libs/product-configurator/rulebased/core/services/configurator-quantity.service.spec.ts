import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
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
    it('should not emit anything until it will be initialized from outside', () => {
      let result;
      classUnderTest
        .getQuantity()
        .subscribe((quantity) => {
          result = quantity;
        })
        .unsubscribe();
      expect(result).toBeUndefined();
    });

    it('should return value that was set with setQuantity', (done) => {
      const quantity = 100;
      classUnderTest.setQuantity(quantity);
      classUnderTest
        .getQuantity()
        .pipe(take(1))
        .subscribe((userId) => {
          expect(userId).toBe(quantity);
          done();
        });
    });
  });
});
