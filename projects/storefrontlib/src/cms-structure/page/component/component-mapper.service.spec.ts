import { Component, NgModule, PLATFORM_ID, Renderer2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { CmsConfig } from '@spartacus/core';
import { ComponentMapperService } from './component-mapper.service';

const createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-test',
  template: 'test',
})
class TestComponent {}

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent],
})
class TestModule {}

const MockCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    CMSTestComponent: { component: TestComponent },
    CMSWebComponent: { component: 'path/to/file.js#cms-component' },
    CMSEagerWebComponent: { component: '#cms-eager-component' },
  },
};

describe('ComponentMapperService', () => {
  let mapperService: ComponentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        ComponentMapperService,
        { provide: CmsConfig, useValue: MockCmsModuleConfig },
        Renderer2,
        { provide: PLATFORM_ID, useValue: 'no-browser' },
      ],
    });

    mapperService = TestBed.inject(ComponentMapperService);
  });

  it('should ComponentMapperService is injected', inject(
    [ComponentMapperService],
    (service: ComponentMapperService) => {
      expect(service).toBeTruthy();
    }
  ));

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
    let mockRenderer: Renderer2;
    let mockScriptElement;

    beforeEach(() => {
      mockScriptElement = { setAttribute: createSpy(), onload: undefined };

      mockRenderer = {
        createElement: createSpy().and.returnValue(mockScriptElement),
        appendChild: createSpy(),
      } as any;
    });

    it('should return selector and initialize scripts', async () => {
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

    it('should return selector for eagerly loaded web components', async () => {
      const selector = await mapperService.initWebComponent(
        'CMSEagerWebComponent',
        mockRenderer
      );
      expect(selector).toEqual('cms-eager-component');
      expect(mockRenderer.createElement).not.toHaveBeenCalled();
      expect(mockRenderer.appendChild).not.toHaveBeenCalled();
      expect(mockScriptElement.setAttribute).not.toHaveBeenCalled();
    });

    it('should return true to web component', inject(
      [ComponentMapperService],
      (service: ComponentMapperService) => {
        expect(service.isWebComponent('CMSWebComponent')).toBeTruthy();
      }
    ));
  });
});
