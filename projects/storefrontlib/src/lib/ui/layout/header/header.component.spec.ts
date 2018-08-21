import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { MaterialModule } from '../../../material.module';
import { CurrencySelectorComponent } from '../../../site-context/currency-selector/currency-selector.component';
import { LanguageSelectorComponent } from '../../../site-context/language-selector/language-selector.component';
import { LoginComponent } from './../../../user/components/login/login.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import { ConfigService } from '../../../site-context/config.service';
import * as fromUserReducer from '../../../user/store/reducers';
import * as fromSCStore from './../../../site-context/shared/store';
import * as fromCmsReducer from '../../../cms/store/reducers';
import * as fromAuth from '../../../auth/store';

class MockConfigService {
  site = {
    language: 'de',
    currency: 'JPY'
  };
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          user: combineReducers(fromUserReducer.getReducers()),
          siteContext: combineReducers(fromSCStore.getReducers()),
          cms: combineReducers(fromCmsReducer.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        })
      ],
      declarations: [
        HeaderComponent,
        DynamicSlotComponent,
        ComponentWrapperComponent,
        CurrencySelectorComponent,
        LanguageSelectorComponent,
        LoginComponent
      ],
      providers: [{ provide: ConfigService, useClass: MockConfigService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
