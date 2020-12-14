import { B2bStorefrontModule } from '@spartacus/setup';
import { provideConfig } from '@spartacus/core';

describe('B2bStorefrontModule', () => {
  describe('withConfig', () => {
    it('should provide config', () => {
      const config = { test: 'test' };
      const result = B2bStorefrontModule.withConfig(config as any);
      expect(result.providers).toContain(
        jasmine.objectContaining(provideConfig(config))
      );
    });
  });
});
