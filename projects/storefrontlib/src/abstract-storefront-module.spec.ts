import { AbstractStorefrontModule } from './abstract-storefront-module';
import { DefaultConfigService } from './default-config.service';

class TestStorefrontModule extends AbstractStorefrontModule {}

export class TestDefaultConfigService extends DefaultConfigService {
  propertyA = 'default value A';
  propertyB = 'default value B';
}
export class TestOverridingConfigService {
  propertyB = 'overriding value B';
  propertyC = 'overriding value C';
}

describe('AbstractStorefrontModule Tests', () => {
  let testDefaultConfigService: TestDefaultConfigService;
  let testOverridingConfigService: TestOverridingConfigService;

  beforeEach(() => {
    testDefaultConfigService = new TestDefaultConfigService();
    testOverridingConfigService = new TestOverridingConfigService();
  });

  describe('Create AbstractStorefrontModule', () => {
    it('should be truthy', () => {
      const storefrontModuleInstance = new TestStorefrontModule();
      expect(storefrontModuleInstance).toBeTruthy();
    });
  });

  describe('Test function configServiceFactory', () => {
    it('should handle undefined config param', () => {
      const expectedResult = { ...testDefaultConfigService };
      const result = AbstractStorefrontModule.configServiceFactory(
        undefined,
        testDefaultConfigService
      );
      expect(result).toEqual(expectedResult);
    });
    it('should handle undefined default config param', () => {
      const expectedResult = { ...testOverridingConfigService };
      const result = AbstractStorefrontModule.configServiceFactory(
        testOverridingConfigService,
        undefined
      );
      expect(result).toEqual(expectedResult);
    });

    it('should properly override properties', () => {
      const expectedResult = {
        ...testDefaultConfigService,
        propertyB: 'overriding value B',
        propertyC: 'overriding value C'
      };
      const result = AbstractStorefrontModule.configServiceFactory(
        testOverridingConfigService,
        testDefaultConfigService
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('Test function getOverriddenConfigProvider', () => {
    it('should return a provider', () => {
      const result = AbstractStorefrontModule.getOverriddenConfigProvider(
        testOverridingConfigService
      );
      expect(result).toBeDefined();
    });
  });
});
