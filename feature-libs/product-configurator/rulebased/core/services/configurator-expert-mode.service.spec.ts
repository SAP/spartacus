import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { ConfiguratorExpertModeService } from './configurator-expert-mode.service';

describe('ConfiguratorExpertModeService', () => {
  let classUnderTest: ConfiguratorExpertModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguratorExpertModeService],
    });
    classUnderTest = TestBed.inject(ConfiguratorExpertModeService);
  });

  describe('getExpModeRequested', () => {
    it('should not emit anything until it will be initialized from outside', () => {
      let result;
      classUnderTest
        .getExpModeRequested()
        .subscribe((expMode) => {
          result = expMode;
        })
        .unsubscribe();
      expect(result).toBeUndefined();
    });

    it('should return value that was set with setExpModeRequested', (done) => {
      const expMode = true;
      classUnderTest.setExpModeRequested(expMode);
      classUnderTest
        .getExpModeRequested()
        .pipe(take(1))
        .subscribe((userId) => {
          expect(userId).toBe(expMode);
          done();
        });
    });
  });

  describe('getExpModeActive', () => {
    it('should not emit anything until it will be initialized from outside', () => {
      let result;
      classUnderTest
        .getExpModeActive()
        .subscribe((expMode) => {
          result = expMode;
        })
        .unsubscribe();
      expect(result).toBeUndefined();
    });

    it('should return value that was set with setExpModeActive', (done) => {
      const expMode = true;
      classUnderTest.setExpModeActive(expMode);
      classUnderTest
        .getExpModeActive()
        .pipe(take(1))
        .subscribe((userId) => {
          expect(userId).toBe(expMode);
          done();
        });
    });
  });
});
