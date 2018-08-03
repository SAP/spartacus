import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { LoginComponent } from '../../../user/components/login/login.component';
import { MaterialModule } from '../../../material.module';
import { GlobalMessageModule } from '../../../global-message/global-message.module';
import { StoreModule, combineReducers } from '@ngrx/store';
import { OccSiteService } from '../../../occ/site-context/occ-site.service';
import * as fromRoot from '../../../routing/store';
import { LanguageSelectorComponent } from '../../../site-context/language-selector/language-selector.component';
import { CurrencySelectorComponent } from '../../../site-context/currency-selector/currency-selector.component';
import { ConfigService } from '../../../../config.service';
import * as fromUserReducer from '../../../user/store/reducers';
import * as fromSCStore from './../../../site-context/shared/store';
import * as fromCmsReducer from '../../../cms/store/reducers';

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
          ...fromRoot.reducers,
          user: combineReducers(fromUserReducer.reducers),
          siteContext: combineReducers(fromSCStore.reducers),
          cms: combineReducers(fromCmsReducer.reducers)
        }),
        GlobalMessageModule
      ],
      declarations: [
        MainComponent,
        HeaderComponent,
        FooterComponent,
        DynamicSlotComponent,
        ComponentWrapperComponent,
        LoginComponent,
        LanguageSelectorComponent,
        CurrencySelectorComponent
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
