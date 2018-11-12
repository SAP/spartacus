import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { DynamicSlotComponent } from './dynamic-slot.component';
import { ComponentMapperService } from '../../services';
import { CmsModuleConfig } from '../../cms-module-config';
import * as fromReducers from '../../store/reducers';
import { StoreModule } from '@ngrx/store';
import { OutletDirective } from '../../../outlet';
import { CmsComponentData } from '../cms-component-data';

const testText = 'test text';

@Component({
  selector: 'cx-test',
  template: `<div id="debugEl1">${testText}</div>`
})
export class TestComponent {
  constructor(public cmsData: CmsComponentData) {}
}

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}

const MockCmsModuleConfig: CmsModuleConfig = {
  cmsComponentMapping: {
    CMSTestComponent: 'cx-test'
  }
};

@Component({
  template:
    '<ng-container yComponentWrapper componentType="CMSTestComponent" componentUid="test_uid"></ng-container>'
})
class TestWrapperComponent {}

fdescribe('ComponentWrapperDirective', () => {
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromReducers.getReducers())
      ],
      declarations: [
        TestWrapperComponent,
        DynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
      ],
      providers: [
        ComponentMapperService,
        { provide: CmsModuleConfig, useValue: MockCmsModuleConfig }
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
  });

  describe('with web component', () => {
    beforeEach(() => {
      const cmsMapping = TestBed.get(CmsModuleConfig) as CmsModuleConfig;
      cmsMapping.cmsComponentMapping.CMSTestComponent = 'file.js#cms-component';
      fixture = TestBed.createComponent(TestWrapperComponent);
    });

    it('should instantiate web component', done => {
      fixture.detectChanges();

      const scriptEl = fixture.debugElement.nativeNode.nextSibling;
      expect(scriptEl.src).toContain('file.js');
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
  });
});
