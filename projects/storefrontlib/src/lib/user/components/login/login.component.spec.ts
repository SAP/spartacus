import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import { CmsModuleConfig } from '../../../cms/cms-module-config';
import { MaterialModule } from '../../../material.module';
import { PageType } from '../../../routing/models/page-context.model';
import * as fromRouting from '../../../routing/store';
import { UserToken } from './../../../auth/models/token-types.model';
import * as fromAuthStore from './../../../auth/store';
import * as fromStore from './../../store';
import * as fromCms from './../../../cms/store';
import { LoginComponent } from './login.component';

const mockUserToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx'
};

const mockUserDetails: any = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  type: 'Mock Type',
  uid: 'UID'
};

class MockCmsModuleConfig {
  server = {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  };

  site = {
    baseSite: 'electronics',
    language: '',
    currency: ''
  };
}

const cntx = { id: 'testPageId', type: PageType.CONTENT_PAGE };

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<fromStore.UserState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        StoreModule.forRoot({
          ...fromStore.getReducers(),
          user: combineReducers(fromStore.getReducers()),
          auth: combineReducers(fromAuthStore.getReducers()),
          cms: combineReducers(fromCms.getReducers())
        }),
        HttpClientTestingModule
      ],
      declarations: [
        DynamicSlotComponent,
        LoginComponent,
        ComponentWrapperDirective
      ],
      providers: [
        provideMockActions(() => of()),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              firstChild: {
                routeConfig: {
                  canActivate: [{ GUARD_NAME: 'AuthGuard' }]
                }
              }
            }
          }
        },
        { provide: CmsModuleConfig, useClass: MockCmsModuleConfig }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    const routerState = {
      state: {
        context: cntx
      }
    };

    const spy = spyOn(store, 'select');
    spy.and.returnValue(of(routerState));

    expect(component).toBeTruthy();
  });

  it('should logout and clear user state', () => {
    const spy = spyOn(store, 'select');
    spy.and.returnValue(of({}));

    component.logout();
    expect(component.isLogin).toEqual(false);
    expect(store.dispatch).toHaveBeenCalledWith(new fromAuthStore.Logout());
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromRouting.Go({
        path: ['/login']
      })
    );
  });

  it('should load user details when token exists', () => {
    spyOn(store, 'select').and.returnValue(of(mockUserToken));

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserDetails(mockUserToken.userId)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new fromAuthStore.Login());
    component.isLogin = true;
  });

  describe('UI tests', () => {
    it('should contain the dynamic slot: HeaderLinks', () => {
      component.ngOnInit();
      component.user$ = of(mockUserDetails);
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(
          By.css('y-dynamic-slot[position="HeaderLinks"]')
        )
      ).not.toBeNull();
    });

    it('should display the correct message depending on whether the user is logged on or not', () => {
      component.ngOnInit();
      component.user$ = of({});
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('a[routerLink="login"'))
      ).not.toBeNull();
    });
  });
});
