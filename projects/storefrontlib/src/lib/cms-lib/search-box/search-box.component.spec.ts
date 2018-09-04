import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../cms/store/reducers';
import * as fromProductStore from '../../product/store';
import * as fromRouting from '../../routing/store';
import { SearchBoxComponent } from './search-box.component';
import { ConfigService } from '../../cms/config.service';
import { MaterialModule } from '../../material.module';
import { PictureComponent } from '../../ui/components/media/picture/picture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchConfig } from '../../product/search-config';
import { By } from '@angular/platform-browser';

export class UseConfigService {
  cmsComponentMapping = {
    SearchBoxComponent: 'SearchBoxComponent'
  };
}

describe('SearchBoxComponent in CmsLib', () => {
  let store: Store<fromCmsReducer.CmsState>;
  let searchBoxComponent: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let selectSpy: jasmine.Spy;

  const mockSearchBoxComponentData = {
    uid: '001',
    typeCode: 'SearchBoxComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: 'Mock SearchBox',
    type: 'SearchBox Component',
    displayProductImages: 'true',
    displayProducts: 'true',
    displaySuggestions: 'true',
    container: 'false',
    maxProducts: '5',
    maxSuggestions: '5',
    minCharactersBeforeRequest: '3',
    waitTimeBeforeRequest: '500'
  };

  const mockSearchSuggestions = {
    suggestions: [
      {
        value: 'test1'
      },
      {
        value: 'test2'
      }
    ]
  };

  const mockKeyEvent1 = {
    key: 'Enter'
  };

  const mockKeyEvent2 = {
    key: 'Enter123'
  };

  const mockQueryString = '?query=mockQuery';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromCmsReducer.getReducers()),
          products: combineReducers(fromProductStore.getReducers())
        })
      ],
      declarations: [SearchBoxComponent, PictureComponent],
      providers: [{ provide: ConfigService, useClass: UseConfigService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    searchBoxComponent = fixture.componentInstance;

    store = TestBed.get(Store);
    selectSpy = spyOn(store, 'select');
    spyOn(store, 'dispatch').and.callThrough();

    spyOn(searchBoxComponent, 'onKey').and.callThrough();
    spyOn(searchBoxComponent, 'launchSearchPage').and.callThrough();
    spyOn(searchBoxComponent.searchBoxControl, 'reset').and.callThrough();
  });

  it('should be created', () => {
    expect(searchBoxComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    selectSpy.and.returnValue(of(mockSearchBoxComponentData));
    expect(searchBoxComponent.component).toBeNull();
    searchBoxComponent.bootstrap();
    expect(searchBoxComponent.component).toBe(mockSearchBoxComponentData);
  });

  it('should dispatch new search query on text update', () => {
    selectSpy.and.returnValue(of(mockSearchBoxComponentData));
    searchBoxComponent.bootstrap();

    selectSpy.and.returnValue(of([mockSearchSuggestions]));
    searchBoxComponent.searchBoxControl.setValue('testQuery');
    expect(searchBoxComponent.searchBoxControl.value).toEqual('testQuery');

    searchBoxComponent.search(of('testQuery')).subscribe(() => {
      const searchConfig = new SearchConfig();
      searchConfig.pageSize = searchBoxComponent.maxSuggestions;
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromProductStore.GetProductSuggestions({
          term: 'testQuery',
          searchConfig: searchConfig
        })
      );
    });
  });

  it('should call onKey(event: any) and launchSearchPage(query: string)', () => {
    searchBoxComponent.onKey(mockKeyEvent1);
    expect(searchBoxComponent.onKey).toHaveBeenCalled();
    expect(searchBoxComponent.launchSearchPage).toHaveBeenCalled();
  });

  it('should only call onKey(event: any)', () => {
    searchBoxComponent.onKey(mockKeyEvent2);
    expect(searchBoxComponent.onKey).toHaveBeenCalled();
    expect(searchBoxComponent.launchSearchPage).not.toHaveBeenCalled();
  });

  it('should call launchSearchPage(query: string) and navigate away', () => {
    searchBoxComponent.launchSearchPage(mockQueryString);
    expect(searchBoxComponent.launchSearchPage).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromRouting.Go({ path: ['/search', mockQueryString] })
    );
  });

  describe('UI tests', () => {
    it('should contain an input text field', () => {
      expect(
        fixture.debugElement.query(By.css('input[type="text"]'))
      ).not.toBeNull();
    });
    // TODO: UI test once auto complete is no longer with material
  });
});
