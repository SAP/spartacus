import { MobileMenuComponent } from './../header/mobile-menu/mobile-menu.component';
import { HeaderSkipperComponent } from './../header/header-skipper/header-skipper.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { MaterialModule } from '../../../material.module';
import { GlobalMessageModule } from '../../../global-message/global-message.module';
import { StoreModule, combineReducers } from '@ngrx/store';
import { OccSiteService } from '../../../occ/site-context/occ-site.service';
import * as fromRoot from '../../../routing/store';
import { LanguageSelectorComponent } from '../../../site-context/language-selector/language-selector.component';
import { CurrencySelectorComponent } from '../../../site-context/currency-selector/currency-selector.component';
import { LoginComponent } from './../../../user/components/login/login.component';
import { ConfigService } from '../../../site-context/config.service';
import * as fromUserReducer from '../../../user/store/reducers';
import * as fromSCStore from './../../../site-context/shared/store';
import * as fromCmsReducer from '../../../cms/store/reducers';
import * as fromAuth from '../../../auth/store';
import { TertiaryBarComponent } from '../header/tertiary-bar/tertiary-bar.component';

class MockConfigService {
  server = {
    baseUrl: '',
    occPrefix: ''
  };

  site = {
    baseSite: '',
    language: '',
    currency: ''
  };
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
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
        MainComponent,
        HeaderComponent,
        FooterComponent,
        DynamicSlotComponent,
        ComponentWrapperComponent,
        LanguageSelectorComponent,
        CurrencySelectorComponent,
        HeaderSkipperComponent,
        TertiaryBarComponent,
        MobileMenuComponent,
        LoginComponent
      ],
      providers: [
        { provide: ConfigService, useClass: MockConfigService },
        { provide: OccSiteService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
