import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';

import { CmsService } from '@spartacus/core';
import { ProductSearchService, CmsSearchBoxComponent } from '@spartacus/core';

import { of } from 'rxjs';

import { BootstrapModule } from '../../bootstrap.module';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { PictureComponent } from '../../ui/components/media/picture/picture.component';

import { SearchBoxComponentService } from './search-box-component.service';
import { SearchBoxComponent } from './search-box.component';

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

@Pipe({
  name: 'stripHtml'
})
class MockStripHtmlPipe implements PipeTransform {
  transform(): any {}
}

describe('SearchBoxComponent in CmsLib', () => {
  let searchBoxComponent: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let serviceSpy: any;

  const mockSearchBoxComponentData: CmsSearchBoxComponent = {
    uid: '001',
    typeCode: 'SearchBoxComponent',
    modifiedtime: new Date('2017-12-21T18:15:15+0000'),
    name: 'Mock SearchBox',
    displayProductImages: true,
    displayProducts: true,
    displaySuggestions: true,
    container: false,
    maxProducts: 5,
    maxSuggestions: 5,
    minCharactersBeforeRequest: 3,
    waitTimeBeforeRequest: 500
  };

  const MockCmsService = {
    getComponentData: () => of(mockSearchBoxComponentData)
  };

  const mockKeyEvent1 = <KeyboardEvent>{
    key: 'Enter'
  };

  const mockKeyEvent2 = <KeyboardEvent>{
    key: 'Enter123'
  };

  class SearchBoxComponentServiceSpy {
    launchSearchPage = jasmine.createSpy('launchSearchPage');
    typeahead = jasmine.createSpy('search').and.callFake(() => of([]));
    queryParam$ = of('test');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BootstrapModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
      ],
      declarations: [
        SearchBoxComponent,
        PictureComponent,
        MockTranslateUrlPipe,
        MockStripHtmlPipe
      ],
      providers: [
        { provide: CmsService, useValue: MockCmsService },
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

    serviceSpy = fixture.debugElement.injector.get(
      SearchBoxComponentService
    ) as any;

    spyOn(searchBoxComponent, 'onKey').and.callThrough();
    //    spyOn(searchBoxComponent, 'launchSearchPage').and.callThrough();
    spyOn(searchBoxComponent.searchBoxControl, 'reset').and.callThrough();
  });

  it('should be created', () => {
    expect(searchBoxComponent).toBeTruthy();
  });

  it('should search input value be equal to search query if was defined', () => {
    fixture.detectChanges();
    expect(searchBoxComponent.searchBoxControl.value).toEqual('test');
  });

  it('should dispatch new search query on text update', () => {
    searchBoxComponent.searchBoxControl.setValue('testQuery');
    expect(searchBoxComponent.searchBoxControl.value).toEqual('testQuery');
    fixture.detectChanges();
    expect(serviceSpy.typeahead).toHaveBeenCalled();
  });

  it('should dispatch new search query on input', () => {
    searchBoxComponent.queryText = 'test input';
    expect(searchBoxComponent.searchBoxControl.value).toEqual('test input');
    fixture.detectChanges();
    expect(serviceSpy.typeahead).toHaveBeenCalled();
  });

  it('should call onKey(event: any) and launchSearchPage(query: string)', () => {
    searchBoxComponent.onKey(mockKeyEvent1);
    expect(searchBoxComponent.onKey).toHaveBeenCalled();
    expect(serviceSpy.launchSearchPage).toHaveBeenCalled();
  });

  it('should only call onKey(event: any)', () => {
    searchBoxComponent.onKey(mockKeyEvent2);
    expect(searchBoxComponent.onKey).toHaveBeenCalled();
    expect(serviceSpy.launchSearchPage).not.toHaveBeenCalled();
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
