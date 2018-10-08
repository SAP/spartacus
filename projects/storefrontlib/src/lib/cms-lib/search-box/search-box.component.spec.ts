import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromRoot from '../../routing/store';
import * as fromProductStore from '../../product/store';
import { SearchBoxComponent } from './search-box.component';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { PictureComponent } from '../../ui/components/media/picture/picture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BootstrapModule } from '../../bootstrap.module';
import { CmsService } from '../../cms/facade/cms.service';
import { CmsComponentData, ProductSearchService } from '@spartacus/storefront';
import { SearchBoxComponentService } from './search-box-component.service';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponentMapping: {
    SearchBoxComponent: 'SearchBoxComponent'
  }
};

describe('SearchBoxComponent in CmsLib', () => {
  let store: Store<any>;
  let searchBoxComponent: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let selectSpy: jasmine.Spy;
  let sbcsSpy: any;

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

  const MockCmsService = {
    getComponentData: () => of(mockSearchBoxComponentData)
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

  class SearchBoxComponentServiceSpy {
    launchSearchPage = jasmine.createSpy('launchSearchPage');
    search = jasmine.createSpy('search').and.callFake(() => of([]));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BootstrapModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromProductStore.getReducers())
        })
      ],
      declarations: [SearchBoxComponent, PictureComponent],
      providers: [
        { provide: CmsService, useValue: MockCmsService },
        { provide: CmsModuleConfig, useValue: UseCmsModuleConfig },
        {
          provide: ProductSearchService,
          useValue: {}
        },
        {
          provide: CmsComponentData,
          useValue: {
            data$: of({})
          }
        }
      ]
    })
      .overrideComponent(SearchBoxComponent, {
        set: {
          providers: [
            {
              provide: SearchBoxComponentService,
              useClass: SearchBoxComponentServiceSpy
            }
          ]
        }
      })

      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    searchBoxComponent = fixture.componentInstance;

    sbcsSpy = fixture.debugElement.injector.get(
      SearchBoxComponentService
    ) as any;

    store = TestBed.get(Store);
    selectSpy = spyOn(store, 'select');
    spyOn(store, 'dispatch').and.callThrough();

    spyOn(searchBoxComponent, 'onKey').and.callThrough();
    //    spyOn(searchBoxComponent, 'launchSearchPage').and.callThrough();
    spyOn(searchBoxComponent.searchBoxControl, 'reset').and.callThrough();
  });

  it('should be created', () => {
    expect(searchBoxComponent).toBeTruthy();
  });

  it('should dispatch new search query on text update', () => {
    selectSpy.and.returnValue(of([mockSearchSuggestions]));
    searchBoxComponent.searchBoxControl.setValue('testQuery');
    expect(searchBoxComponent.searchBoxControl.value).toEqual('testQuery');
    fixture.detectChanges();
    expect(sbcsSpy.search).toHaveBeenCalled();
  });

  it('should call onKey(event: any) and launchSearchPage(query: string)', () => {
    searchBoxComponent.onKey(mockKeyEvent1);
    expect(searchBoxComponent.onKey).toHaveBeenCalled();
    expect(sbcsSpy.launchSearchPage).toHaveBeenCalled();
  });

  it('should only call onKey(event: any)', () => {
    searchBoxComponent.onKey(mockKeyEvent2);
    expect(searchBoxComponent.onKey).toHaveBeenCalled();
    expect(sbcsSpy.launchSearchPage).not.toHaveBeenCalled();
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
