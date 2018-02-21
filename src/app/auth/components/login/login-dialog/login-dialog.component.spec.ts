import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromStore from './../../../store';
import * as fromReducers from './../../../store/reducers';
import { MatDialogRef } from '@angular/material';
import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { MaterialModule } from '../../../../material.module';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigService } from '../../../../newocc/config.service';

const mockUser: any = {
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

const mockUserToken = {
  account: {
    details: {}
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

const mockEmptyUserToken = {
  auth: {
    token: {}
  }
};

fdescribe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;
  let store: Store<fromStore.UserState>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          FormsModule,
          BrowserAnimationsModule,
          StoreModule.forRoot({
            ...fromStore.reducers,
            user: combineReducers(fromStore.reducers)
          })
        ],
        declarations: [LoginDialogComponent],
        providers: [
          {
            provide: MatDialogRef
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login and not dispatch user details', () => {
    spyOn(store, 'select').and.returnValue(of(mockEmptyUserToken.auth.token));

    component.login();

    store.select(fromStore.getUserState).subscribe(data => {
      expect(data).toEqual({} as fromStore.UserState);
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.LoadUserToken({
        username: component.username,
        password: component.password
      })
    );
    expect(store.dispatch).not.toHaveBeenCalledWith(component.username);
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
