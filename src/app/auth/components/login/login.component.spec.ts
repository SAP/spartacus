import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromStore from './../../store';
import { LoginComponent } from './login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { tap } from 'rxjs/operators';

const mockUser = {
  name: 'mockUsername',
  pass: '1234',
  ref: null
};

const mockUserState: any = {
  account: {
    details: {
      displayUid: 'Display Uid',
      firstName: 'First',
      lastName: 'Last',
      name: 'First Last',
      type: 'Mock Type',
      uid: 'UID'
    }
  },
  auth: {
    token: {
      access_token: 'xxx',
      token_type: 'bearer',
      refresh_token: 'xxx',
      expires_in: 1000,
      scope: ['xxx'],
      username: 'xxx'
    }
  }
};

const mockEmptyUser: any = {
  account: {
    details: {}
  },
  auth: {
    token: {}
  }
};

const mockEmptyUserToken = {
  auth: {
    token: {}
  }
};

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<fromStore.UserState>;

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
        declarations: [LoginComponent, LoginDialogComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(of(mockUserState));
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();

    expect(component.user$).toEqual(of(mockUserState));
  });

  it('should logout and clear user state', () => {
    component.logout();

    expect(store.dispatch).toHaveBeenCalledWith(new fromStore.Logout());
  });

  it('should login and not dispatch user details', () => {
    spyOn(store, 'select').and.returnValue(of(mockEmptyUserToken.auth.token));

    component.login(mockUser);

    store.select(fromStore.getUserState).subscribe(data => {
      expect(data).toEqual({} as fromStore.UserState);
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserToken({
        username: mockUser.name,
        password: mockUser.pass
      })
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(mockUser.name);
  });

  // Uncomment this test after replacing material (MatDialogRef) with ng-bootstrap from the LoginDialogComponent,
  // otherwise it gives 'Cannot read property 'close' of undefined' error
  // it('should login and also dispatch user details', () => {
  //   let spy = spyOn(store, 'select');

  //   spy.and.returnValue(of(mockUserToken.auth.token));
  //   const action = new fromStore.LoadUserTokenSuccess(mockUserToken.auth.token);

  //   store.dispatch(action);

  //   component.login();

  //   spy.and.callThrough();
  //   store.select(fromStore.getUserState).subscribe(data => {
  //     expect(data).toEqual(mockUserToken);
  //   });
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     new fromStore.LoadUserTokenSuccess(mockUserToken.auth.token)
  //   );
  //   expect(store.dispatch).toHaveBeenCalledWith(
  //     new fromStore.LoadUserDetails(component.username)
  //   );
  // });
});
