import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of, BehaviorSubject, EMPTY } from 'rxjs';
import * as NgrxStore from '@ngrx/store';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import { CmsModuleConfig } from '../../../cms/cms-module-config';
import { PageType } from '../../../routing/models/page-context.model';
import { UserToken } from './../../../auth/models/token-types.model';
import * as fromStore from './../../store';
import * as fromCms from './../../../cms/store';
import { LoginComponent } from './login.component';
import { OutletDirective } from '../../../outlet';
import createSpy = jasmine.createSpy;
import { AuthService } from '../../../auth/facade/auth.service';
import { RoutingService } from '../../../routing/facade/routing.service';

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

const MockCmsModuleConfig: CmsModuleConfig = {
  server: {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  },

  site: {
    baseSite: 'electronics',
    language: '',
    currency: ''
  }
};

const cntx = { id: 'testPageId', type: PageType.CONTENT_PAGE };

const selectors = {
  getDetails: new BehaviorSubject(null)
};
const mockSelect = selector => {
  switch (selector) {
    case fromStore.getDetails:
      return () => selectors.getDetails;
    default:
      return () => EMPTY;
  }
};

const mockAuth = {
  userToken$: new BehaviorSubject(null),
  login: createSpy(),
  logout: createSpy()
};

const mockRouting = {
  go: createSpy()
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<fromStore.UserState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        FormsModule,
        StoreModule.forRoot({
          ...fromStore.getReducers(),
          user: combineReducers(fromStore.getReducers()),
          cms: combineReducers(fromCms.getReducers())
        }),
        HttpClientTestingModule
      ],
      declarations: [
        DynamicSlotComponent,
        LoginComponent,
        ComponentWrapperDirective,
        OutletDirective
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
        { provide: CmsModuleConfig, useValue: MockCmsModuleConfig },
        { provide: AuthService, useValue: mockAuth },
        { provide: RoutingService, useValue: mockRouting }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
    spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    const routerState = {
      state: {
        context: cntx
      }
    };

    selectors.getDetails.next(routerState);

    expect(component).toBeTruthy();
  });

  it('should logout and clear user state', () => {
    selectors.getDetails.next({});

    component.logout();
    expect(component.isLogin).toEqual(false);
    expect(mockAuth.logout).toHaveBeenCalled();
    expect(mockRouting.go).toHaveBeenCalledWith(['/login']);
  });

  it('should load user details when token exists', () => {
    mockAuth.userToken$.next(mockUserToken);

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserDetails(mockUserToken.userId)
    );
    expect(mockAuth.login).toHaveBeenCalled();
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
