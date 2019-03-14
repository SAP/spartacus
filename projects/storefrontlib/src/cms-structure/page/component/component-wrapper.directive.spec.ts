import { Component, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  TestModuleMetadata
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { CmsComponentData } from '../../../lib/cms/components/cms-component-data';
import {
  CmsComponent,
  CmsService,
  ComponentMapperService,
  CmsConfig,
  CxApiService
} from '@spartacus/core';

const testText = 'test text';

@Component({
  selector: 'cx-test',
  template: `
    <div id="debugEl1">${testText}</div>
  `
})
export class TestComponent {
  constructor(
    public cmsData: CmsComponentData<CmsComponent>,
    @Inject('testService') public testService
  ) {}
}

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}

const MockCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    CMSTestComponent: {
      selector: 'cx-test',
      providers: [
        {
          provide: 'testService',
          useValue: 'testValue'
        }
      ]
    }
  }
};

class MockCmsService {
  getComponentData(): any {}
  isLaunchInSmartEdit(): boolean {
    return true;
  }
}

@Component({
  template:
    '<ng-container cxComponentWrapper componentType="cms_typeCode" componentMappedType="CMSTestComponent" ' +
    'componentUid="test_uid" componentUuid="test_uuid" componentCatalogUuid="test_catalogUuid">' +
    '</ng-container>'
})
class TestWrapperComponent {}

describe('ComponentWrapperDirective', () => {
  let fixture: ComponentFixture<TestWrapperComponent>;
  let cmsService: CmsService;

  let testBedConfig: TestModuleMetadata;

  beforeEach(() => {
    testBedConfig = {
      imports: [TestModule],
      declarations: [TestWrapperComponent, ComponentWrapperDirective],
      providers: [
        ComponentMapperService,
        { provide: CmsConfig, useValue: MockCmsModuleConfig },
        { provide: CmsService, useClass: MockCmsService },
        { provide: CxApiService, useValue: { cms: {}, auth: {}, routing: {} } }
      ]
    };
  });

  describe('in SSR', () => {
    let cmsConfig: CmsConfig;

    beforeEach(async(() => {
      testBedConfig.providers.push({
        provide: PLATFORM_ID,
        useValue: 'server'
      });
      TestBed.configureTestingModule(testBedConfig).compileComponents();
    }));

    describe('with angular component', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        cmsService = TestBed.get(CmsService);
        cmsConfig = TestBed.get(CmsConfig);
      });

      it('should instantiate the found component if it was enabled for SSR', () => {
        cmsConfig.cmsComponents.CMSTestComponent.disableSSR = false;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#debugEl1').textContent).toContain(
          testText
        );
      });

      it('should NOT instantiate the found component if it was disabled for SSR', () => {
        cmsConfig.cmsComponents.CMSTestComponent.disableSSR = true;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#debugEl1')).toBe(null);
      });
    });
  });

  describe('in non-SSR', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule(testBedConfig).compileComponents();
    }));

    describe('with angular component', () => {
      beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        cmsService = TestBed.get(CmsService);
      });

      it('should instantiate the found component correctly', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#debugEl1').textContent).toContain(
          testText
        );
      });

      it('should add smartedit contract if app launch in smart edit', () => {
        fixture.detectChanges();
        const el = fixture.debugElement;
        const compEl = el.query(By.css('cx-test')).nativeElement;
        expect(compEl.getAttribute('data-smartedit-component-id')).toEqual(
          'test_uid'
        );
        expect(compEl.getAttribute('data-smartedit-component-type')).toEqual(
          'cms_typeCode'
        );
        expect(
          compEl.getAttribute('data-smartedit-catalog-version-uuid')
        ).toEqual('test_catalogUuid');
        expect(compEl.getAttribute('data-smartedit-component-uuid')).toEqual(
          'test_uuid'
        );
        expect(compEl.classList.contains('smartEditComponent')).toBeTruthy();
      });

      it('should not add smartedit contract if app launch in smart edit', () => {
        spyOn(cmsService, 'isLaunchInSmartEdit').and.returnValue(false);

        fixture = TestBed.createComponent(TestWrapperComponent);
        fixture.detectChanges();
        const el = fixture.debugElement;
        const compEl = el.query(By.css('cx-test')).nativeElement;
        expect(compEl.getAttribute('data-smartedit-component-id')).toEqual(
          null
        );
        expect(compEl.getAttribute('data-smartedit-component-type')).toEqual(
          null
        );
        expect(
          compEl.getAttribute('data-smartedit-catalog-version-uuid')
        ).toEqual(null);
        expect(compEl.getAttribute('data-smartedit-component-uuid')).toEqual(
          null
        );
        expect(compEl.classList.contains('smartEditComponent')).toBeFalsy();
      });

      it('should inject cms component data', () => {
        fixture.detectChanges();
        const testCromponemtInstance = <TestComponent>(
          fixture.debugElement.children[0].componentInstance
        );
        expect(testCromponemtInstance.cmsData.uid).toContain('test_uid');
      });

      it('should provide configurable cms component providers', () => {
        fixture.detectChanges();
        const testCromponemtInstance = <TestComponent>(
          fixture.debugElement.children[0].componentInstance
        );
        expect(testCromponemtInstance.testService).toEqual('testValue');
      });
    });

    describe('with web component', () => {
      let scriptEl;

      beforeEach(() => {
        const cmsMapping = TestBed.get(CmsConfig) as CmsConfig;
        cmsMapping.cmsComponents.CMSTestComponent.selector =
          'path/to/file.js#cms-component';
        fixture = TestBed.createComponent(TestWrapperComponent);
        fixture.detectChanges();
        scriptEl = fixture.debugElement.nativeNode.nextSibling;
      });

      it('should load web component script', () => {
        expect(scriptEl.src).toContain('path/to/file.js');
      });

      it('should instantiate web component', done => {
        scriptEl.onload(); // invoke load callbacks

        // run in next runloop (to process async tasks)
        setTimeout(() => {
          const cmsComponentElement = fixture.debugElement.nativeElement.querySelector(
            'cms-component'
          );
          expect(cmsComponentElement).toBeTruthy();
          const componentData = cmsComponentElement.cxApi.CmsComponentData;
          expect(componentData.uid).toEqual('test_uid');
          done();
        });
      });

      it('should pass cxApi to web component', done => {
        scriptEl.onload(); // invoke load callbacks

        // run in next runloop (to process async tasks)
        setTimeout(() => {
          const cmsComponentElement = fixture.debugElement.nativeElement.querySelector(
            'cms-component'
          );
          const cxApi = cmsComponentElement.cxApi as CxApiService;
          expect(cxApi.cms).toBeTruthy();
          expect(cxApi.auth).toBeTruthy();
          expect(cxApi.routing).toBeTruthy();
          done();
        });
      });
    });
  });
});
