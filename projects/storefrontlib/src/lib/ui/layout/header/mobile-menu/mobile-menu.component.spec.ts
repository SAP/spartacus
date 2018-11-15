import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ServiceWorkerModule,
  ɵangular_packages_service_worker_service_worker_b as RegistrationOptions
} from '@angular/service-worker';

import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SiteContextConfig } from '@spartacus/core';

import { of } from 'rxjs';

import { PwaModule } from 'projects/storefrontlib/src/lib/pwa/pwa.module';
import {
  PWAModuleConfig,
  defaultPWAModuleConfig
} from 'projects/storefrontlib/src/lib/pwa/pwa.module-config';

import { SiteContextModule } from '../../../../site-context';
import * as fromAuth from '../../../../auth/store';
import { CmsModuleConfig } from '../../../../cms/cms-module-config';
import { CmsModule } from './../../../../cms/cms.module';
import * as fromCms from '../../../../cms/store';
import * as fromUser from '../../../../user/store';
import { LoginModule } from './../../../../user/components/login/login.module';

import { MobileMenuComponent } from './mobile-menu.component';

const MockPwaRegistrationOptions: RegistrationOptions = {
  enabled: false
};

describe('MobileMenuComponent', () => {
  let component: MobileMenuComponent;
  let fixture: ComponentFixture<MobileMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginModule,
        CmsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('user', fromUser.getReducers()),
        StoreModule.forFeature('auth', fromAuth.getReducers()),
        EffectsModule.forRoot(fromCms.effects),
        PwaModule,
        ServiceWorkerModule,
        SiteContextModule
      ],
      declarations: [MobileMenuComponent],
      providers: [
        provideMockActions(() => of()),
        fromCms.NavigationEntryItemEffects,
        {
          provide: CmsModuleConfig,
          useValue: { site: 'en' }
        },
        {
          provide: SiteContextConfig,
          useExisting: CmsModuleConfig
        },
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
    fixture = TestBed.createComponent(MobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UI tests', () => {
    it('should contain the hamburger', () => {
      expect(
        fixture.debugElement.query(By.css('button.hamburger'))
      ).not.toBeNull();
    });

    it('should contain the login status component', () => {
      expect(fixture.debugElement.query(By.css('cx-login'))).not.toBeNull();
    });

    it('should contain the Site Context components', () => {
      expect(
        fixture.debugElement.query(By.css('cx-language-selector'))
      ).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('cx-currency-selector'))
      ).not.toBeNull();
    });

    describe('Dynamic slots', () => {
      it('should contain the NavigationBar', () => {
        expect(
          fixture.debugElement.query(
            By.css('cx-dynamic-slot[position="NavigationBar"]')
          )
        ).not.toBeNull();
      });
    });

    describe('toggleMenu', () => {
      it('should open or close menu', () => {
        component.showMenu = false;
        component.toggleMenu();

        expect(component.showMenu).toBe(true);

        component.toggleMenu();
        expect(component.showMenu).toBe(false);
      });
    });
  });
});
