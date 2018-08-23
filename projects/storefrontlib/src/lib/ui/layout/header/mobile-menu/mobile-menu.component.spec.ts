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
import { ConfigService } from './../../../../site-context/config.service';
import { CurrencySelectorComponent } from './../../../../site-context/currency-selector/currency-selector.component';
import { LanguageSelectorComponent } from './../../../../site-context/language-selector/language-selector.component';
import { LoginModule } from './../../../../user/components/login/login.module';
import { MobileMenuComponent } from './mobile-menu.component';

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
          provide: ConfigService,
          useValue: { site: 'en' }
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
});
