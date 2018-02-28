import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromStore from './../../store';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageType } from '../../../routing/models/page-context.model';
import { MatDialog } from '@angular/material';
import { UserToken } from '../../models/token-types.model';

const mockUser = {
  username: 'mockUsername',
  password: '1234',
  rememberMe: false
};

const mockEmptyUser: any = {
  account: {
    details: {}
  },
  auth: {
    token: {}
  }
};

const mockUserToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  username: 'xxx'
};

const cntx = { id: 'testPageId', type: PageType.CONTENT_PAGE };

fdescribe('LoginComponent', () => {
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

  it('should create', () => {
    const routerState = {
      state: {
        context: cntx
      }
    };

    const spy = spyOn(store, 'select');
    spy.and.returnValue(of(routerState));

    component = new LoginComponent(dialog, store);

    expect(component).toBeTruthy();
    expect(component.pageContext).toEqual(cntx);
  });

  it('should logout and clear user state', () => {
    component.pageContext = cntx;

    component.logout();
    expect(component.isLogin).toEqual(false);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.Logout(component.pageContext)
    );
  });

  it('should login and not dispatch user details', () => {
    component.username = mockUser.username;
    component.password = mockUser.password;

    component.login();

    store.select(fromStore.getUserState).subscribe(data => {
      expect(data).toEqual(mockEmptyUser);
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserToken({
        userId: mockUser.username,
        password: mockUser.password
      })
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(mockUser.username);
  });

  it('should login and also dispatch user details', () => {
    component.username = mockUser.username;
    component.pageContext = cntx;

    const spy = spyOn(store, 'select');

    spy.and.returnValue(of(mockUserToken));
    const action = new fromStore.LoadUserTokenSuccess(mockUserToken);

    store.dispatch(action);

    component.login();

    spy.and.callThrough();
    store.select(fromStore.getUserState).subscribe(data => {
      expect(data.auth.token).toEqual(mockUserToken);
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserTokenSuccess(mockUserToken)
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserDetails(component.username)
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.Login(component.pageContext)
    );
  });
  // Add some UI unit tests once we remove material
});
