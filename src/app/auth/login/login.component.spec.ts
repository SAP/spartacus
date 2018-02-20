import { TestBed, ComponentFixture } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromStore from './../store';
import * as fromReducers from './../store/reducers';
import { MatDialogModule, MatDialog } from '@angular/material';
import { LoginComponent } from './login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login.module';
import { async } from 'q';
import { of } from 'rxjs/observable/of';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '../auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from '../../newocc/config.service';
import { Action } from 'rxjs/scheduler/Action';
import { Actions, EffectsModule } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs/observable/empty';
import { Observable } from 'rxjs/Observable';
import * as fromUserEffect from './../store/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserTokenInterceptor } from '../http-interceptors/user-token.interceptor';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const mockUserDetails: any = {
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

class MockConfigService {
  site = {};
}

fdescribe('CurrencySelectorComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store<fromStore.UserState>;
  let subscriptions: BehaviorSubject<any>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromStore.reducers,
            user: combineReducers(fromStore.reducers)
          })
        ],
        declarations: [LoginComponent],
        providers: [
          {
            provide: ConfigService,
            useClass: MockConfigService
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    subscriptions = TestBed.get(new BehaviorSubject<any>(mockUserDetails));

    spyOn(store, 'select').and.returnValue(of(mockUserDetails));
    spyOn(subscriptions, 'next').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
