import { Component, NgModule, PLATFORM_ID, Renderer2 } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { ComponentMapperService } from './component-mapper.service';
import { CmsModuleConfig } from '../cms-module-config';

const createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-test',
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
  cmsComponents: {
    CMSTestComponent: { selector: 'cx-test' },
    CMSWebComponent: { selector: 'path/to/file.js#cms-component' }
  }
};

describe('ComponentMapperService', () => {
  let mapperService: ComponentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        ComponentMapperService,
        { provide: CmsModuleConfig, useValue: MockCmsModuleConfig },
        Renderer2,
        { provide: PLATFORM_ID, useValue: 'no-browser' }
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
      expect(type).toEqual(null);
      expect(mapperService.missingComponents).toContain('OtherCmsComponent');
    });
  });

  describe('isWebComponent', () => {
    it('should return false to angular component', inject(
      [ComponentMapperService],
      (service: ComponentMapperService) => {
        expect(service.isWebComponent('CMSTestComponent')).toBeFalsy();
      }
    ));

    it('should return true to web component', inject(
      [ComponentMapperService],
      (service: ComponentMapperService) => {
        expect(service.isWebComponent('CMSWebComponent')).toBeTruthy();
      }
    ));
  });

  describe('initWebComponent', () => {
    const mockScriptElement = { setAttribute: createSpy(), onload: undefined };

    const mockRenderer: Renderer2 = {
      createElement: createSpy().and.returnValue(mockScriptElement),
      appendChild: createSpy()
    } as any;

    it('should return selector', async () => {
      const selector = await mapperService.initWebComponent(
        'CMSWebComponent',
        mockRenderer
      );
      expect(selector).toEqual('cms-component');
      expect(mockRenderer.createElement).toHaveBeenCalledWith('script');
      expect(mockRenderer.appendChild).toHaveBeenCalled();
      expect(mockScriptElement.setAttribute).toHaveBeenCalledWith(
        'src',
        'path/to/file.js'
      );
    });

    it('should return true to web component', inject(
      [ComponentMapperService],
      (service: ComponentMapperService) => {
        expect(service.isWebComponent('CMSWebComponent')).toBeTruthy();
      }
    ));
  });
});
