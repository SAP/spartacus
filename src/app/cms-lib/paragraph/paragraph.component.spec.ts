import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../cms/store/reducers';
import { ParagraphComponent } from './paragraph.component';
import { ConfigService } from '../../cms/config.service';

export class UseConfigService {
  cmsComponentMapping = {
    CMSParagraphComponent: 'ParagraphComponent'
  };
}

describe('CmsParagraphComponent in CmsLib', () => {
  let store: Store<fromCmsReducer.CmsState>;
  let paragraphComponent: ParagraphComponent;
  let fixture: ComponentFixture<ParagraphComponent>;
  let el: DebugElement;

  const componentData = {
    uid: '001',
    typeCode: 'CMSParagraphComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: 'TestCMSParagraphComponent',
    container: 'false',
    type: 'Paragraph',
    content: 'Arbitrary paragraph content'
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          })
        ],
        declarations: [ParagraphComponent],
        providers: [{ provide: ConfigService, useClass: UseConfigService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphComponent);
    paragraphComponent = fixture.componentInstance;

    el = fixture.debugElement;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of(componentData));
  });

  it('should be created', () => {
    expect(paragraphComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(paragraphComponent.component).toBeNull();
    paragraphComponent.bootstrap();
    expect(paragraphComponent.component).toBe(componentData);
    expect(el.query(By.css('p')).nativeElement.textContent).toEqual(
      paragraphComponent.component.content
    );
  });
});
