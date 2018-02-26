import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { LoginModule } from '../../../auth/components/login/login.module';
import { SiteContextModule } from '../../../site-context/site-context.module';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromUserStore from '../../../auth/store';
import * as fromCMSStore from '../../../cms/store';

import { EffectsModule } from '@ngrx/effects';
import { OccSiteService } from '../../../newocc/site-context/occ-site.service';
import { ConfigService } from '../../../newocc/config.service';

class MockConfigService {
  x = {};

  server = {
    baseUrl: '',
    occPrefix: ''
  };

  site = {
    baseSite: '',
    language: '',
    currency: ''
  };

  authentication = {
    client_id: '',
    client_secret: '',
    userToken: {}
  };
}

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: OccSiteService;

  const data = {
    currencies: [
      { active: false, isocode: 'USD', name: 'US Dollar', symbol: '$' }
    ]
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          LoginModule,
          SiteContextModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCMSStore.reducers),
            user: combineReducers(fromUserStore.reducers)
          }),
          EffectsModule.forRoot([])
        ],
        declarations: [
          HeaderComponent,
          DynamicSlotComponent,
          ComponentWrapperComponent
        ],
        providers: [
          OccSiteService,
          { provide: ConfigService, useClass: MockConfigService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    service = TestBed.get(OccSiteService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
