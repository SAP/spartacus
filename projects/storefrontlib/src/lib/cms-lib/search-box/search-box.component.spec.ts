import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../cms/store/reducers';
import * as fromProductStore from '../../product/store';
import { SearchBoxComponent } from './search-box.component';
import { ConfigService } from '../../cms/config.service';
import { MaterialModule } from '../../material.module';
import { PictureComponent } from '../../ui/components/media/picture/picture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchConfig } from '../../product/search-config';

export class UseConfigService {
  cmsComponentMapping = {
    SearchBoxComponent: 'SearchBoxComponent'
  };
}

describe('SearchBoxComponent in CmsLib', () => {
  let store: Store<fromCmsReducer.CmsState>;
  let searchBoxComponent: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

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
      providers: [{ provide: ConfigService, useClass: UseConfigService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    searchBoxComponent = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of(mockSearchBoxComponentData));
    spyOn(store, 'dispatch').and.callThrough();

    spyOn(searchBoxComponent, 'onKey').and.callThrough();
    spyOn(searchBoxComponent, 'launchSearchPage').and.callThrough();
    spyOn(searchBoxComponent, 'onFocus').and.callThrough();
    spyOn(searchBoxComponent.searchBoxControl, 'reset').and.callThrough();
    spyOn(searchBoxComponent, 'clickInside').and.callThrough();
    spyOn(searchBoxComponent, 'clickout').and.callThrough();
  });

  it('should be created', () => {
    expect(searchBoxComponent).toBeTruthy();
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(searchBoxComponent.component).toBeNull();
    searchBoxComponent.bootstrap();
    expect(searchBoxComponent.component).toBe(mockSearchBoxComponentData);

    // TODO: after replacing material with boothstrap4, need some ui test here
  });

  it('should dispatch new search query with new input', () => {
    searchBoxComponent.bootstrap();
    searchBoxComponent.searchBoxControl.setValue('testQuery');
    expect(searchBoxComponent.searchBoxControl.value).toEqual('testQuery');

    const searchConfigA = new SearchConfig();
    searchConfigA.pageSize = searchBoxComponent.maxProduct;
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProductStore.SearchProducts({
        queryText: 'testQuery',
        searchConfig: searchConfigA
      })
    );
    const searchConfigB = new SearchConfig();
    searchConfigB.pageSize = searchBoxComponent.maxSuggestions;
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromProductStore.GetProductSuggestions({
        term: 'testQuery',
        searchConfig: searchConfigB
      })
    );
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

  it('should call onFocus()', () => {
    searchBoxComponent.onFocus();
    expect(searchBoxComponent.onFocus).toHaveBeenCalled();
    expect(searchBoxComponent.searchBoxControl.reset).toHaveBeenCalled();
  });

  it('should call launchSearchPage(query: string) and searchBoxControl.reset()', () => {
    searchBoxComponent.launchSearchPage(mockQueryString);
    expect(searchBoxComponent.launchSearchPage).toHaveBeenCalled();
    expect(searchBoxComponent.searchBoxControl.reset).toHaveBeenCalled();
  });

  it('should call clickInside()', () => {
    searchBoxComponent.clickInside();
    expect(searchBoxComponent.clickInside).toHaveBeenCalled();
    expect(searchBoxComponent.clickedInside).toBe(true);
  });

  it('should call clickout()', () => {
    searchBoxComponent.clickout();
    expect(searchBoxComponent.clickout).toHaveBeenCalled();
    expect(searchBoxComponent.clickedInside).toBe(false);
  });
});
