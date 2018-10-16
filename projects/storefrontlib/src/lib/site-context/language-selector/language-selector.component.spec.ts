import { PageType } from './../../routing/models/page-context.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store, StoreModule, combineReducers, select } from '@ngrx/store';

import { LanguageSelectorComponent } from './language-selector.component';
import * as fromStore from './../shared/store';
import * as fromRoot from '../../routing/store';

import * as fromActions from './../shared/store/actions/languages.action';
import { of } from 'rxjs';
import { SiteContextModuleConfig } from '../site-context-module-config';

const MockSiteContextModuleConfig = {
  site: {
    language: 'de',
    currency: 'JPY'
  }
};

describe('LanguageSelectorComponent', () => {
  const languages = [
    { active: false, isocode: 'en', name: 'English', nativeName: 'English' }
  ];

  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;
  let store: Store<fromStore.SiteContextState>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          siteContext: combineReducers(fromStore.getReducers())
        })
      ],
      declarations: [LanguageSelectorComponent],
      providers: [
        {
          provide: SiteContextModuleConfig,
          useValue: MockSiteContextModuleConfig
        }
      ]
    })
      .overrideComponent(LanguageSelectorComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain dropdown with languages', () => {
    component.languages$ = of(languages);

    const label = el.query(By.css('label'));
    const selectBox = el.query(By.css('select'));
    fixture.changeDetectorRef.markForCheck();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(selectBox.nativeElement.value).toEqual(languages[0].isocode);
    });

    expect(label.nativeElement.textContent).toEqual('Language');
  });

  it('should contain disabled dropdown when languages list is empty', () => {
    component.languages$ = of([]);
    const selectBox = el.query(By.css('select'));
    fixture.detectChanges();

    expect(selectBox.nativeElement.disabled).toBeTruthy();
  });

  it('should contain enabled dropdown when languages list is NOT empty', () => {
    component.languages$ = of(languages);
    const selectBox = el.query(By.css('select'));
    fixture.detectChanges();

    expect(selectBox.nativeElement.disabled).toBeFalsy();
  });

  it('should get language data', () => {
    const action = new fromActions.LoadLanguagesSuccess(languages);
    store.dispatch(action);

    store.pipe(select(fromStore.getAllLanguages)).subscribe(data => {
      expect(data).toEqual(languages);
    });
  });

  it('should change language', () => {
    const pageContext = { id: 'testPageId', type: PageType.CONTENT_PAGE };
    store.dispatch({
      type: 'ROUTER_NAVIGATION',
      payload: {
        routerState: {
          context: pageContext
        },
        event: {}
      }
    });

    const englishLanguage = 'en';
    component.setActiveLanguage(englishLanguage);
    expect(component.activeLanguage).toEqual(englishLanguage);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromActions.SetActiveLanguage(englishLanguage)
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromActions.LanguageChange()
    );
  });
});
