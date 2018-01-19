import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import * as fromRoot from '../../routing/store';
import * as fromCmsReducer from '../../newcms/store/reducers';
import { SearchBoxComponent } from './search-box.component';
import { ConfigService } from '../../newcms/config.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { PictureComponent } from '../../ui/components/media/picture/picture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class UseConfigService {
  cmsComponentMapping = {
    SearchBoxComponent: 'SearchBoxComponent'
  };
}

fdescribe('SearchBoxComponent in CmsLib', () => {
  let store: Store<fromCmsReducer.CmsState>;
  let searchBoxComponent: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let el: DebugElement;

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

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          FormsModule,
          MatAutocompleteModule,
          MatChipsModule,
          MatFormFieldModule,
          MatInputModule,
          MatSelectModule,
          ReactiveFormsModule,
          RouterTestingModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          })
        ],
        declarations: [SearchBoxComponent, PictureComponent],
        providers: [{ provide: ConfigService, useClass: UseConfigService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    searchBoxComponent = fixture.componentInstance;

    el = fixture.debugElement;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of(mockSearchBoxComponentData));
    spyOn(searchBoxComponent, 'onKey').and.callThrough();
    spyOn(searchBoxComponent, 'launchSearchPage').and.callThrough();
    spyOn(searchBoxComponent, 'onFocus').and.callThrough();
    spyOn(searchBoxComponent.searchBoxControl, 'reset').and.callThrough();
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
});
