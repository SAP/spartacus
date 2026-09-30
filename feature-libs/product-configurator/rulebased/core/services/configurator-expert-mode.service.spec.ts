import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
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

    it('should return value that was set with setExpModeRequested', async () => {
      const expMode = true;
      classUnderTest.setExpModeRequested(expMode);
      const userId = await firstValueFrom(classUnderTest.getExpModeRequested());
      expect(userId).toBe(expMode);
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

    it('should return value that was set with setExpModeActive', async () => {
      const expMode = true;
      classUnderTest.setExpModeActive(expMode);
      const userId = await firstValueFrom(classUnderTest.getExpModeActive());
      expect(userId).toBe(expMode);
    });
  });
});
