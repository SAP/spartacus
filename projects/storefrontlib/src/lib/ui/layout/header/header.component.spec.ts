import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from '../../../auth/store';
import { ComponentWrapperDirective } from '../../../cms/components';
import * as fromCmsReducer from '../../../cms/store/reducers';
import { SiteContextModule } from '../../../site-context';
import * as fromUserReducer from '../../../user/store/reducers';
import { LoginComponent } from './../../../user/components/login/login.component';
import { HeaderSkipperComponent } from './header-skipper/header-skipper.component';
import { HeaderComponent } from './header.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { TertiaryBarComponent } from './tertiary-bar/tertiary-bar.component';
import { CmsModuleConfig } from '../../../cms/cms-module-config';
import { OutletDirective } from '../../../outlet';
import { PwaModule } from './../../../pwa/pwa.module';
import {
  PWAModuleConfig,
  defaultPWAModuleConfig
} from '../../../pwa/pwa.module-config';
import { SiteContextConfig } from '@spartacus/core';
import { Input, Component } from '@angular/core';

const MockCmsModuleConfig: CmsModuleConfig = {
  site: {
    language: 'de',
    currency: 'JPY'
  }
};

@Component({
  selector: 'cx-dynamic-slot',
  template: 'MockDynamicSlotComponent'
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
  @Input()
  limit: number;
  @Input()
  contextParameters: any;
  @Input()
  componentClass: string;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('user', fromUserReducer.getReducers()),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
        StoreModule.forFeature('auth', fromAuth.getReducers()),
        PwaModule,
        EffectsModule.forRoot([]),
        SiteContextModule
      ],
      declarations: [
        HeaderComponent,
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
          useValue: MockCmsModuleConfig
        },
        {
          provide: PWAModuleConfig,
          useValue: defaultPWAModuleConfig
        }
      ]
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

  // UI TEST
  describe('UI tests', () => {
    it('should contain the header skipper component', () => {
      expect(
        fixture.debugElement.query(By.css('cx-header-skipper'))
      ).not.toBeNull();
    });

    it('should contain the Site Context Selectors', () => {
      expect(
        fixture.debugElement.query(
          By.css(
            'div.cx-content__slot:not(#cx-mobile-menu) cx-language-selector'
          )
        )
      ).not.toBeNull();

      expect(
        fixture.debugElement.query(
          By.css(
            'div.cx-content__slot:not(#cx-mobile-menu) cx-currency-selector'
          )
        )
      ).not.toBeNull();
    });

    it('should contain the tertiary-bar component', () => {
      expect(
        fixture.debugElement.query(By.css('cx-tertiary-bar'))
      ).not.toBeNull();
    });

    it('should contain the login status component', () => {
      expect(
        fixture.debugElement.query(
          By.css('div.cx-content__slot:not(#cx-mobile-menu) cx-login')
        )
      ).not.toBeNull();
    });

    it('should contain the mobile menu component', () => {
      expect(
        fixture.debugElement.query(By.css('cx-mobile-menu'))
      ).not.toBeNull();
    });

    describe('Dynamic slots', () => {
      it('should contain site logo', () => {
        expect(
          fixture.debugElement.query(
            By.css('cx-dynamic-slot[position="SiteLogo"]')
          )
        ).not.toBeNull();
      });

      it('should contain the searchbox', () => {
        expect(
          fixture.debugElement.query(
            By.css('cx-dynamic-slot[position="SearchBox"]')
          )
        ).not.toBeNull();
      });

      it('should contain the mini cart', () => {
        expect(
          fixture.debugElement.query(
            By.css('cx-dynamic-slot[position="MiniCart"]')
          )
        ).not.toBeNull();
      });

      it('should contain the navigation bar', () => {
        expect(
          fixture.debugElement.query(
            By.css(
              'div.cx-content__slot:not(#cx-mobile-menu) cx-dynamic-slot[position="NavigationBar"]'
            )
          )
        ).not.toBeNull();
      });
    });
  });
});
