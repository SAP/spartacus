import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { combineReducers, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromAuth from '../../../../auth/store';
import * as fromCms from '../../../../cms/store';
import * as fromRoot from '../../../../routing/store';
import * as fromSCStore from '../../../../site-context/shared/store';
import * as fromUser from '../../../../user/store';
import { CmsModule } from './../../../../cms/cms.module';
import { CurrencySelectorComponent } from './../../../../site-context/currency-selector/currency-selector.component';
import { LanguageSelectorComponent } from './../../../../site-context/language-selector/language-selector.component';
import { LoginModule } from './../../../../user/components/login/login.module';
import { MobileMenuComponent } from './mobile-menu.component';
import { By } from '@angular/platform-browser';
import { SiteContextModuleConfig } from '../../../../site-context/site-context-module-config';
import { CmsModuleConfig } from '../../../../cms/cms-module-config';

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
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          user: combineReducers(fromUser.getReducers()),
          auth: combineReducers(fromAuth.getReducers()),
          siteContext: combineReducers(fromSCStore.getReducers())
        }),
        EffectsModule.forRoot(fromCms.effects)
      ],
      declarations: [
        MobileMenuComponent,
        LanguageSelectorComponent,
        CurrencySelectorComponent
      ],
      providers: [
        provideMockActions(() => of()),
        fromCms.NavigationEntryItemEffects,
        {
          provide: CmsModuleConfig,
          useValue: { site: 'en' }
        },
        {
          provide: SiteContextModuleConfig,
          useExisting: CmsModuleConfig
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
      expect(fixture.debugElement.query(By.css('y-login'))).not.toBeNull();
    });

    it('should contain the Site Context components', () => {
      expect(
        fixture.debugElement.query(By.css('y-language-selector'))
      ).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('y-currency-selector'))
      ).not.toBeNull();
    });

    describe('Dynamic slots', () => {
      it('should contain the NavigationBar', () => {
        expect(
          fixture.debugElement.query(
            By.css('y-dynamic-slot[position="NavigationBar"]')
          )
        ).not.toBeNull();
      });
    });
  });
});
