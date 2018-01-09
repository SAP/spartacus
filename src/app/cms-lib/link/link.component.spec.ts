import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import { LinkComponent } from './link.component';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../newcms/store/reducers';
import { ConfigService } from '../../newcms/config.service';

export class UseConfigService {
  cmsComponentMapping = {
    CMSLinkComponent: 'LinkComponent'
  };
}

fdescribe('LinkComponent', () => {
  let linkComponent: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;
  let store: Store<fromCmsReducer.CmsState>;
  let el: DebugElement;

  const componentData = {
    uid: '001',
    typeCode: 'CMSLinkComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: 'TestCMSLinkComponent',
    type: 'link',
    linkName: 'Arbitrary link name',
    url: 'http://localhost:8888/'
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          }),
          RouterTestingModule
        ],
        declarations: [ LinkComponent ],
        providers: [{ provide: ConfigService, useClass: UseConfigService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    linkComponent = fixture.componentInstance;
    el = fixture.debugElement;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of(componentData));
  });

  it('should create component', () => {
    expect(linkComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(linkComponent.component).toBeNull();
    linkComponent.bootstrap();
    expect(linkComponent.component).toBe(componentData);
    expect(el.query(By.css('a')).nativeElement.textContent).toEqual(
      linkComponent.component.linkName
    );
    expect(el.query(By.css('a')).nativeElement.url).toEqual(
      linkComponent.component.link
    );
  });
});
