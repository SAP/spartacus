import { Component, NgModule, PLATFORM_ID, Renderer2 } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { CmsConfig } from '@spartacus/core';
import { ComponentMapperService } from './component-mapper.service';
import { ComponentType } from '../model/component-type.model';

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
    CMSTestNoSSRComponent: { component: TestComponent, disableSSR: true },
    CMSWebComponent: { component: 'path/to/file.js#cms-component' },
    CMSEagerWebComponent: { component: '#cms-eager-component' },
  },
};

describe('ComponentMapperService', () => {
  let service: ComponentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        ComponentMapperService,
        { provide: CmsConfig, useValue: MockCmsModuleConfig },
        Renderer2,
      ],
    });
  });

  it('should inject ComponentMapperService', inject(
    [ComponentMapperService],
    (srv: ComponentMapperService) => {
      expect(srv).toBeTruthy();
    }
  ));

  describe('getComponent', () => {
    beforeEach(() => {
      service = TestBed.inject(ComponentMapperService);
    });

    it('should return component data if present', () => {
      const component = service.getComponent('CMSTestComponent');
      expect(component).toBe(
        MockCmsModuleConfig.cmsComponents.CMSTestComponent.component
      );
    });
    it('should return null if component is not configured', () => {
      const component = service.getComponent('Unknown');
      expect(component).toBeNull();
    });
  });

  describe('shouldRenderComponent', () => {
    describe('for server', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
        });
        service = TestBed.inject(ComponentMapperService);
      });

      it('should return false for disableSSR ', () => {
        expect(
          service.shouldRenderComponent('CMSTestNoSSRComponent')
        ).toBeFalsy();
      });
      it('should return true without disableSSR', () => {
        expect(service.shouldRenderComponent('CMSTestComponent')).toBeTruthy();
      });
    });
    describe('for browser', () => {
      beforeEach(() => {
        service = TestBed.inject(ComponentMapperService);
      });

      it('should return true for disableSSR ', () => {
        expect(
          service.shouldRenderComponent('CMSTestNoSSRComponent')
        ).toBeTruthy();
      });
      it('should return true without disableSSR ', () => {
        expect(service.shouldRenderComponent('CMSTestComponent')).toBeTruthy();
      });
    });
  });

  describe('getComponentType', () => {
    beforeEach(() => {
      service = TestBed.inject(ComponentMapperService);
    });

    it('should detect component', () => {
      expect(service.getComponentType('CMSTestComponent')).toBe(
        ComponentType.CmsComponent
      );
    });
    it('should detect web component', () => {
      expect(service.getComponentType('CMSWebComponent')).toBe(
        ComponentType.WebComponent
      );
    });

    it('should detect eager web component', () => {
      expect(service.getComponentType('CMSEagerWebComponent')).toBe(
        ComponentType.WebComponent
      );
    });
  });
});
