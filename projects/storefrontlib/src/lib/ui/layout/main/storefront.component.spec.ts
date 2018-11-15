import { MobileMenuComponent } from '../header/mobile-menu/mobile-menu.component';
import { HeaderSkipperComponent } from '../header/header-skipper/header-skipper.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorefrontComponent } from './storefront.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentWrapperDirective } from '../../../cms/components';
import { GlobalMessageModule } from '../../../global-message/global-message.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OccSiteService } from '../../../../../../core/src/site-context/occ/occ-site.service';
import { SiteContextModule } from '../../../site-context/site-context.module';
import { LoginComponent } from '../../../user/components/login/login.component';
import * as fromUserReducer from '../../../user/store/reducers';
import * as fromCmsReducer from '../../../cms/store/reducers';
import * as fromAuth from '../../../auth/store';
import { TertiaryBarComponent } from '../header/tertiary-bar/tertiary-bar.component';
import { OutletDirective } from '../../../outlet';
import {
  PWAModuleConfig,
  defaultPWAModuleConfig
} from '../../../pwa/pwa.module-config';
import { PwaModule } from '../../../pwa/pwa.module';
import { SiteContextConfig, ConfigurableRoutesService } from '@spartacus/core';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-dynamic-slot',
  template: 'MockDynamicSlotComponent'
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}

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

class MockConfigurableRoutesService {
  changeLanguage() {}
}

describe('StorefrontComponent', () => {
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
        EffectsModule.forRoot([]),
        SiteContextModule
      ],
      declarations: [
        StorefrontComponent,
        HeaderComponent,
        FooterComponent,
        MockDynamicSlotComponent,
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
          provide: ConfigurableRoutesService,
          useClass: MockConfigurableRoutesService
        },
        GlobalMessageService
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
