import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CmsComponent,
  CmsService,
  CmsSiteContextSelectorComponent,
  contextServiceMapProvider,
  Currency,
  CurrencyService,
  Language,
  LanguageService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { LanguageCurrencyComponent } from './language-currency.component';
import { SiteContextComponentService } from './site-context-component.service';
import { SiteContextSelectorComponent } from './site-context-selector.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

describe('LanguageCurrencyComponent in CmsLib', () => {
  let component: LanguageCurrencyComponent;
  let fixture: ComponentFixture<LanguageCurrencyComponent>;
  let el: DebugElement;

  const mockLanguages: Language[] = [
    { active: true, isocode: 'ja', name: 'Japanese', nativeName: 'Japanese' },
    { active: true, isocode: 'en', name: 'English', nativeName: 'English' },
    { active: true, isocode: 'de', name: 'German', nativeName: 'German' },
  ];
  const mockActiveLang = 'en';

  const MockLanguageService = {
    active: mockActiveLang,
    getAll(): Observable<Language[]> {
      return of(mockLanguages);
    },
    getActive(): Observable<string> {
      return of(this.active);
    },
    setActive(isocode: string): void {
      this.active = isocode;
    },
  };

  const mockCurrencies: Currency[] = [
    { active: true, isocode: 'USD', name: 'Dolar', symbol: '$' },
    { active: true, isocode: 'EUR', name: 'Euro', symbol: '€' },
  ];
  const mockActiveCurr = 'EUR';

  const MockCurrencyService = {
    active: mockActiveCurr,
    getAll(): Observable<Currency[]> {
      return of(mockCurrencies);
    },
    getActive(): Observable<string> {
      return of(this.active);
    },
    setActive(isocode: string): void {
      this.active = isocode;
    },
  };

  const mockComponentData: CmsSiteContextSelectorComponent = {
    typeCode: 'LanguageCurrencyComponent',
  };

  const MockCmsService = {
    getComponentData: () => of(mockComponentData),
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(mockComponentData),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule],
        declarations: [
          LanguageCurrencyComponent,
          SiteContextSelectorComponent,
          MockCxIconComponent,
        ],
        providers: [
          { provide: CmsService, useValue: MockCmsService },
          {
            provide: LanguageService,
            useValue: MockLanguageService,
          },
          {
            provide: CurrencyService,
            useValue: MockCurrencyService,
          },
          {
            provide: CmsComponentData,
            useValue: MockCmsComponentData,
          },
          contextServiceMapProvider,
        ],
      })
        .overrideComponent(SiteContextSelectorComponent, {
          set: {
            providers: [
              {
                provide: SiteContextComponentService,
                useClass: SiteContextComponentService,
              },
            ],
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCurrencyComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a language select with number of options', () => {
    const selectBox = el.query(
      By.css('cx-site-context-selector[context="language"] select')
    );
    const select = <HTMLSelectElement>selectBox.nativeElement;
    expect(select.options.length).toEqual(mockLanguages.length);
  });

  it('should contain a currency select with number of options', () => {
    const selectBox = el.query(
      By.css('cx-site-context-selector[context="currency"] select')
    );
    const select = <HTMLSelectElement>selectBox.nativeElement;
    expect(select.options.length).toEqual(mockCurrencies.length);
  });
});
