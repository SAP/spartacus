import { Component, NgModule } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { ComponentMapperService } from './component-mapper.service';
import { ConfigService } from '../config.service';

@Component({
  template: 'test'
})
export class TestComponent {}

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}

export class MockConfigService {
  cmsComponentMapping = {
    CMSTestComponent: 'TestComponent'
  };
}

fdescribe('ComponentMapperService', () => {
  let mapperService: ComponentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        ComponentMapperService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    mapperService = TestBed.get(ComponentMapperService);
  });

  it(
    'should ComponentMapperService is injected',
    inject([ComponentMapperService], (service: ComponentMapperService) => {
      expect(service).toBeTruthy();
    })
  );

  describe('getComponentTypeByCode', () => {
    it('should get existing angular component', () => {
      const type = mapperService.getComponentTypeByCode('CMSTestComponent');
      expect(type.name).toEqual('TestComponent');
    });

    it('should get warning for non-existing angular component', () => {
      const type = mapperService.getComponentTypeByCode('OtherCmsComponent');
      expect(type).toEqual(undefined);
      expect(mapperService.missingComponents).toContain('OtherCmsComponent');
    });
  });
});
