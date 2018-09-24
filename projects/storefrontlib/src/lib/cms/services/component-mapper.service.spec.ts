import { Component, NgModule } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { ComponentMapperService } from './component-mapper.service';
import { CmsModuleConfig } from '../cms-module-config';

@Component({
  selector: 'y-test',
  template: 'test'
})
export class TestComponent {}

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}

const MockCmsModuleConfig: CmsModuleConfig = {
  cmsComponentMapping: {
    CMSTestComponent: 'y-test'
  }
};

describe('ComponentMapperService', () => {
  let mapperService: ComponentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        ComponentMapperService,
        { provide: CmsModuleConfig, useValue: MockCmsModuleConfig }
      ]
    });

    mapperService = TestBed.get(ComponentMapperService);
  });

  it('should ComponentMapperService is injected', inject(
    [ComponentMapperService],
    (service: ComponentMapperService) => {
      expect(service).toBeTruthy();
    }
  ));

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
