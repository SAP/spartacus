import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { MaterialModule } from '../../../material.module';
import { CurrencySelectorComponent } from '../../../site-context/currency-selector/currency-selector.component';
import { LanguageSelectorComponent } from '../../../site-context/language-selector/language-selector.component';
import { LoginHeaderSlotComponent } from './../../../user/components/login/login-header-slot/login-header-slot.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import { ConfigService } from '../../../site-context/config.service';
import * as fromUserReducer from '../../../user/store/reducers';
import * as fromSCStore from './../../../site-context/shared/store';
import * as fromCmsReducer from '../../../cms/store/reducers';

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
        StoreModule.forRoot({
          ...fromRoot.reducers,
          user: combineReducers(fromUserReducer.reducers),
          siteContext: combineReducers(fromSCStore.reducers),
          cms: combineReducers(fromCmsReducer.reducers)
        })
      ],
      declarations: [
        HeaderComponent,
        DynamicSlotComponent,
        ComponentWrapperComponent,
        CurrencySelectorComponent,
        LanguageSelectorComponent,
        LoginHeaderSlotComponent
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
