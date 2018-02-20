import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromStore from './../store';
import { LoginComponent } from './login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

const mockEmptyUser: any = {
  account: {
    details: {}
  },
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

    spyOn(store, 'select').and.returnValue(of(mockUser));
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();

    expect(component.user).toEqual(mockUser);
  });

  it('should logout and clear user state', () => {
    component.logout();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ClearUserDetails(component.user.account.details)
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromStore.ClearUserToken(component.user.auth.token)
    );
    expect(component.user).toEqual(mockEmptyUser);
  });
});
