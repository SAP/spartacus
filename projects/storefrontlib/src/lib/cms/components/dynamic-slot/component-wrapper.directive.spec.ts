import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { DynamicSlotComponent } from './dynamic-slot.component';
import { ComponentMapperService } from '../../services';
import { CmsModuleConfig } from '../../cms-module-config';
import { OutletDirective } from '../../../outlet';
import { CmsComponentData } from '../cms-component-data';
import { CmsService } from '../../facade/cms.service';

class MockCmsService {
  getComponentData() {}
}

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

describe('ComponentWrapperDirective', () => {
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [
        TestWrapperComponent,
        DynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
      ],
      providers: [
        ComponentMapperService,
        { provide: CmsModuleConfig, useValue: MockCmsModuleConfig },
        { provide: CmsService, useClass: MockCmsService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
  });

  it('should instantiate the found component correctly', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#debugEl1').textContent).toContain(testText);
  });

  it('should inject cms component data', () => {
    fixture.detectChanges();
    const testCromponemtInstance = <TestComponent>(
      fixture.debugElement.children[0].componentInstance
    );
    expect(testCromponemtInstance.cmsData.uid).toContain('test_uid');
  });
});
