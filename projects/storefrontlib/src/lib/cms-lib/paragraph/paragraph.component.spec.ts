import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../cms/store/reducers';
import { ParagraphComponent } from './paragraph.component';
import { CmsModuleConfig } from '../../cms/cms-module-config';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponentMapping: {
    CMSParagraphComponent: 'ParagraphComponent'
  }
};

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromCmsReducer.getReducers())
        })
      ],
      declarations: [ParagraphComponent],
      providers: [{ provide: CmsModuleConfig, useValue: UseCmsModuleConfig }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphComponent);
    paragraphComponent = fixture.componentInstance;

    el = fixture.debugElement;

    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(paragraphComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    spyOn(store, 'select').and.returnValue(of(componentData));
    expect(paragraphComponent.component).toBeNull();
    paragraphComponent.bootstrap();
    expect(paragraphComponent.component).toBe(componentData);
    expect(el.query(By.css('p')).nativeElement.textContent).toEqual(
      paragraphComponent.component.content
    );
  });

  it('should sanitize unsafe html', () => {
    const unsafeData = Object.assign({}, componentData);
    unsafeData.content = `<img src="" onerror='alert(1)'>`;
    spyOn(store, 'select').and.returnValue(of(unsafeData));
    spyOn(console, 'warn').and.stub(); // Prevent warning to be showed by Angular when sanitizing

    expect(paragraphComponent.component).toBeNull();
    paragraphComponent.bootstrap();
    expect(paragraphComponent.component).toBe(unsafeData);
    expect(el.query(By.css('p')).nativeElement.innerHTML).toEqual(
      `<img src="">`
    );
  });
});
