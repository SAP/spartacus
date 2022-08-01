import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { ConfiguratorExpertModeService } from './configurator-expert-mode.service';

describe('ConfiguratorExpertModeService', () => {
  let classUndertest: ConfiguratorExpertModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorExpertModeService],
    });
    classUndertest = TestBed.inject(ConfiguratorExpertModeService);
  });

  describe('getExpMode', () => {
    it('should not emit anything until it will be initialized from outside', () => {
      let result;
      classUndertest
        .getExpMode()
        .subscribe((expMode) => {
          result = expMode;
        })
        .unsubscribe();
      expect(result).toBeUndefined();
    });

    it('should return value that was set with setExpMode', (done) => {
      const expMode = true;
      classUndertest.setExpMode(expMode);
      classUndertest
        .getExpMode()
        .pipe(take(1))
        .subscribe((userId) => {
          expect(userId).toBe(expMode);
          done();
        });
    });
  });
});
