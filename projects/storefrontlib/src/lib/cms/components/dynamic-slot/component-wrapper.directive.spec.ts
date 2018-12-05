import { Component, Inject, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { ComponentMapperService } from '../../services';
import { CmsModuleConfig } from '../../cms-module-config';
import { CmsComponentData } from '../cms-component-data';
import { CxApiService } from '../../../cx-api/cx-api.service';
import { CmsService } from '../../facade/cms.service';
import { CmsComponent } from '@spartacus/core';

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

const MockCmsModuleConfig: CmsModuleConfig = {
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

@Component({
  template:
    '<ng-container cxComponentWrapper componentType="CMSTestComponent" componentUid="test_uid"></ng-container>'
})
class TestWrapperComponent {}

describe('ComponentWrapperDirective', () => {
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [TestWrapperComponent, ComponentWrapperDirective],
      providers: [
        ComponentMapperService,
        { provide: CmsModuleConfig, useValue: MockCmsModuleConfig },
        { provide: CmsService, useValue: { getComponentData: () => {} } },
        { provide: CxApiService, useValue: { cms: {}, auth: {}, routing: {} } }
      ]
    }).compileComponents();
  }));

  describe('with angular component', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestWrapperComponent);
    });

    it('should instantiate the found component correctly', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#debugEl1').textContent).toContain(
        testText
      );
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
      const cmsMapping = TestBed.get(CmsModuleConfig) as CmsModuleConfig;
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
