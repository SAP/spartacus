import { of } from 'rxjs';
import { CmsModule } from './../../../cms/cms.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigModule } from '@spartacus/core';
import { LoginPageLayoutComponent } from './login-page-layout.component';

import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromCms from '../../../cms/store';
import * as fromStore from '../../../user/store';
import * as fromAuthStore from '../../../auth/store';
import { LoginModule } from '../../../user/components/login/login.module';
import { provideMockActions } from '../../../../../../../node_modules/@ngrx/effects/testing';
import { EffectsModule } from '@ngrx/effects';

describe('LoginPageLayoutComponent', () => {
  let component: LoginPageLayoutComponent;
  let fixture: ComponentFixture<LoginPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        LoginModule,
        RouterTestingModule,
        ConfigModule.forRoot(),
        CmsModule,
        StoreModule.forRoot({
          ...fromStore.getReducers(),
          user: combineReducers(fromStore.getReducers()),
          auth: combineReducers(fromAuthStore.getReducers())
        }),
        EffectsModule.forRoot(fromCms.effects)
      ],
      declarations: [LoginPageLayoutComponent],
      providers: [provideMockActions(() => of())]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
