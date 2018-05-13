import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromStore from './../../store';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageType } from '../../../routing/models/page-context.model';
import { MatDialog } from '@angular/material';
import { UserToken } from '../../models/token-types.model';
import * as fromRouting from '../../../routing/store';

const mockUser = {
  username: 'mockUsername',
  password: '1234',
  rememberMe: false
};

const mockUserToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx'
};

const cntx = { id: 'testPageId', type: PageType.CONTENT_PAGE };

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<fromStore.UserState>;
  let dialog: MatDialog;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          BrowserAnimationsModule,
          FormsModule,
          StoreModule.forRoot({
            ...fromStore.reducers,
            user: combineReducers(fromStore.reducers)
          })
        ],
        declarations: [LoginComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    dialog = TestBed.get(MatDialog);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(dialog, 'open').and.callThrough();
  });

  it('should be created', () => {
    const routerState = {
      state: {
        context: cntx
      }
    };

    const spy = spyOn(store, 'select');
    spy.and.returnValue(of(routerState));

    component = new LoginComponent(dialog, store);

    expect(component).toBeTruthy();
  });

  it('should logout and clear user state', () => {
    const routerState = {
      state: {
        context: {
          id: 'multiStepCheckoutSummaryPage'
        }
      }
    };

    const spy = spyOn(store, 'select');
    spy.and.returnValue(of(routerState));

    component.logout();
    expect(component.isLogin).toEqual(false);
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.Logout());
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromRouting.Go({
        path: ['']
      })
    );
  });

  it('should login', () => {
    component.username = mockUser.username;
    component.password = mockUser.password;
    component.login();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserToken({
        userId: component.username,
        password: component.password
      })
    );
  });

  it('should load user details when token exists', () => {
    component.username = mockUser.username;

    spyOn(store, 'select').and.returnValue(of(mockUserToken));

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserDetails(mockUserToken.userId)
    );
    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.Login());
    component.isLogin = true;
  });
  // Add some UI unit tests once we remove material
});
