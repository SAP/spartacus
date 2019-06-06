import { Component, NgModule, PLATFORM_ID, Renderer2 } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { ComponentMapperService } from './component-mapper.service';
import { CmsConfig } from '@spartacus/core';

const createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-test',
  template: 'test',
})
export class TestComponent {}

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent],
})
export class TestModule {}

const MockCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    CMSTestComponent: { component: TestComponent },
    CMSWebComponent: { component: 'path/to/file.js#cms-component' },
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

    mapperService = TestBed.get(ComponentMapperService);
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
    const mockScriptElement = { setAttribute: createSpy(), onload: undefined };

    const mockRenderer: Renderer2 = {
      createElement: createSpy().and.returnValue(mockScriptElement),
      appendChild: createSpy(),
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
