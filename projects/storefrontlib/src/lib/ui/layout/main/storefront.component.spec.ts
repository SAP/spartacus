import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ServiceWorkerModule,
  ɵangular_packages_service_worker_service_worker_b as RegistrationOptions
} from '@angular/service-worker';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SiteContextConfig } from '@spartacus/core';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { OutletDirective } from '../../../outlet';
import { HeaderSkipperComponent } from '../header/header-skipper/header-skipper.component';
import { MobileMenuComponent } from '../header/mobile-menu/mobile-menu.component';
import { TertiaryBarComponent } from '../header/tertiary-bar/tertiary-bar.component';
import * as fromAuth from '../../../auth/store';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import { GlobalMessageModule } from '../../../global-message/global-message.module';
import { PwaModule } from '../../../pwa/pwa.module';
import {
  PWAModuleConfig,
  defaultPWAModuleConfig
} from '../../../pwa/pwa.module-config';
import { SiteContextModule } from '../../../site-context/site-context.module';
import * as fromCmsReducer from '../../../cms/store/reducers';
import * as fromUserReducer from '../../../user/store/reducers';
import { LoginComponent } from '../../../user/components/login/login.component';
import { OccSiteService } from '../../../../../../core/src/site-context/occ/occ-site.service';

import { StorefrontComponent } from './storefront.component';

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

const MockPwaRegistrationOptions: RegistrationOptions = {
  enabled: false
};

fdescribe('StorefrontComponent', () => {
  let component: StorefrontComponent;
  let fixture: ComponentFixture<StorefrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('user', fromUserReducer.getReducers()),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
        StoreModule.forFeature('auth', fromAuth.getReducers()),
        GlobalMessageModule,
        PwaModule,
        ServiceWorkerModule,
        EffectsModule.forRoot([]),
        SiteContextModule
      ],
      declarations: [
        StorefrontComponent,
        HeaderComponent,
        FooterComponent,
        DynamicSlotComponent,
        ComponentWrapperDirective,
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
        { provide: OccSiteService },
        {
          provide: PWAModuleConfig,
          useValue: defaultPWAModuleConfig
        },
        {
          provide: RegistrationOptions,
          useValue: MockPwaRegistrationOptions
        }
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
