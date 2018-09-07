import { PageType } from './../../routing/models/page-context.model';
import { SiteContextModuleConfig } from '../site-context-module-config';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LanguageSelectorComponent } from './language-selector.component';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromStore from './../shared/store';
import * as fromRoot from '../../routing/store';

import * as fromActions from './../shared/store/actions/languages.action';
import { of } from 'rxjs';

class MockSiteContextModuleConfig {
  site = {
    language: 'de',
    currency: 'JPY'
  };
}

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
          useClass: MockSiteContextModuleConfig
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

  it('should contain languages button', () => {
    component.languages$ = of(languages);

    const label = el.query(By.css('label'));
    const select = el.query(By.css('select'));

    fixture.changeDetectorRef.markForCheck();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(select.nativeElement.value).toEqual(languages[0].isocode);
    });

    expect(label.nativeElement.textContent).toEqual('Language');
  });

  it('should get language data', () => {
    const action = new fromActions.LoadLanguagesSuccess(languages);
    store.dispatch(action);

    store.select(fromStore.getAllLanguages).subscribe(data => {
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
