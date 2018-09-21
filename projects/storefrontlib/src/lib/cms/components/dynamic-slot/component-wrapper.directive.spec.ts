import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { DynamicSlotComponent } from './dynamic-slot.component';
import { AbstractCmsComponent } from '../abstract-cms-component';
import { ComponentMapperService } from '../../services';
import { CmsModuleConfig } from '../../cms-module-config';
import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../../store/reducers';
import { StoreModule, combineReducers } from '@ngrx/store';

const testText = 'test text';

@Component({
  selector: 'y-test',
  template: `<div id="debugEl1">${testText}</div>`
})
export class TestComponent extends AbstractCmsComponent {}

@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}

export class MockCmsModuleConfig {
  cmsComponentMapping = {
    CMSTestComponent: 'y-test'
  };
}

@Component({
  template:
    '<ng-container yComponentWrapper componentType="CMSTestComponent"></ng-container>'
})
class TestWrapperComponent {}

describe('ComponentWrapperDirective', () => {
  let fixture: ComponentFixture<TestWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromReducers.getReducers())
        })
      ],
      declarations: [
        TestWrapperComponent,
        DynamicSlotComponent,
        ComponentWrapperDirective
      ],
      providers: [
        ComponentMapperService,
        { provide: CmsModuleConfig, useClass: MockCmsModuleConfig }
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
});
