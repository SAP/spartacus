import { MobileMenuComponent } from '../header/mobile-menu/mobile-menu.component';
import { HeaderSkipperComponent } from '../header/header-skipper/header-skipper.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorefrontComponent } from './storefront.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import { GlobalMessageModule } from '../../../global-message/global-message.module';
import { StoreModule, combineReducers } from '@ngrx/store';
import { OccSiteService } from '../../../occ/site-context/occ-site.service';
import * as fromRoot from '../../../routing/store';
import { LanguageSelectorComponent } from '../../../site-context/language-selector/language-selector.component';
import { CurrencySelectorComponent } from '../../../site-context/currency-selector/currency-selector.component';
import { LoginComponent } from '../../../user/components/login/login.component';
import * as fromUserReducer from '../../../user/store/reducers';
import * as fromSCStore from '../../../site-context/shared/store';
import * as fromCmsReducer from '../../../cms/store/reducers';
import * as fromAuth from '../../../auth/store';
import { TertiaryBarComponent } from '../header/tertiary-bar/tertiary-bar.component';
import { OutletDirective } from '../../../outlet';
import { SiteContextConfig } from '@spartacus/core';

const MockSiteContextModuleConfig: SiteContextConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  },

  site: {
    baseSite: '',
    language: '',
    currency: ''
  }
};

describe('StorefrontComponent', () => {
  let component: StorefrontComponent;
  let fixture: ComponentFixture<StorefrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          user: combineReducers(fromUserReducer.getReducers()),
          siteContext: combineReducers(fromSCStore.getReducers()),
          cms: combineReducers(fromCmsReducer.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        }),
        GlobalMessageModule
      ],
      declarations: [
        StorefrontComponent,
        HeaderComponent,
        FooterComponent,
        DynamicSlotComponent,
        ComponentWrapperDirective,
        LanguageSelectorComponent,
        CurrencySelectorComponent,
        HeaderSkipperComponent,
        TertiaryBarComponent,
        MobileMenuComponent,
        LoginComponent,
        OutletDirective
      ],
      providers: [
        {
          provide: SiteContextConfig,
          useValue: MockSiteContextModuleConfig
        },
        { provide: OccSiteService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
