import { Component, NgModule, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../../store/reducers';
import * as fromActions from '../../store/actions';
import { ComponentWrapperComponent } from './component-wrapper.component';
import { ComponentMapperService } from '../../services/component-mapper.service';
import { AbstractCmsComponent } from '../abstract-cms-component';
import { CmsModuleConfig } from '../../cms-module-config';
import { By } from '@angular/platform-browser';
import { Config } from '../../../config/config.module';

@Component({
  template: 'test content'
})
export class TestComponent extends AbstractCmsComponent {
  static componentName = 'TestComponent';
}
@NgModule({
  declarations: [TestComponent],
  entryComponents: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {}

const MockCmsModuleConfig: CmsModuleConfig = {
  cmsComponentMapping: {
    CMSTestComponent: 'TestComponent'
  }
};

const cmsComponents: any[] = [{ uid: 'TestUid', typeCode: 'CMSTestComponent' }];

describe('ComponentWrapperComponent', () => {
  let wrapperComponent: ComponentWrapperComponent;
  let fixture: ComponentFixture<ComponentWrapperComponent>;
  let store: Store<fromReducers.CmsState>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromReducers.getReducers())
        })
      ],
      declarations: [ComponentWrapperComponent],
      providers: [
        ComponentMapperService,
        { provide: Config, useClass: MockCmsModuleConfig }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentWrapperComponent);
    wrapperComponent = fixture.componentInstance;
    el = fixture.debugElement;

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(wrapperComponent).toBeTruthy();
  });

  it('should instantiate the found component correctly', () => {
    const getComponentAction = new fromActions.GetComponentFromPage(
      cmsComponents
    );
    store.dispatch(getComponentAction);

    wrapperComponent.componentType = 'CMSTestComponent';
    wrapperComponent.componentUid = 'TestUid';
    wrapperComponent.componentClass = 'testCssClass';
    wrapperComponent.contextParameters = 'test context parameters';

    wrapperComponent.ngAfterViewInit();
    fixture.detectChanges();

    expect(wrapperComponent.target.length).toBe(1);
    expect(wrapperComponent.cmpRef.instance.component).toEqual(
      cmsComponents[0]
    );
    expect(wrapperComponent.cmpRef.instance.uid).toEqual('TestUid');
    expect(wrapperComponent.cmpRef.instance.contextParameters).toEqual(
      'test context parameters'
    );
    expect(
      el.query(By.css('.testCssClass')).nativeElement.textContent.trim()
    ).toEqual('test content');
  });
});
