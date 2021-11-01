import { Provider } from '@angular/core';
import { getValidConfig } from './config/epd-visualization-test-config';
import { EpdVisualizationModule } from './epd-visualization.module';

describe('EpdVisualizationModule', () => {
  describe('forRoot', () => {
    it(`should return module and providers`, () => {
      const moduleWithProviders = EpdVisualizationModule.forRoot(
        getValidConfig()
      );
      expect(moduleWithProviders.ngModule).toBeTruthy();
      expect(moduleWithProviders.ngModule).toBe(EpdVisualizationModule);
      expect(moduleWithProviders.providers).toBeTruthy();
      expect(moduleWithProviders.providers?.length).toEqual(2);
      expect((moduleWithProviders.providers as Provider[])[0]).toBeTruthy();
      expect((moduleWithProviders.providers as Provider[])[1]).toBeTruthy();
    });
  });
});
