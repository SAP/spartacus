import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { combineReducers, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ConfigModule } from '@spartacus/core';
import * as fromAuthStore from '../../../auth/store';
import * as fromStore from '../../../user/store';
import * as fromCms from '../../../cms/store';
import { CmsModule } from './../../../cms/cms.module';
import { LoginPageLayoutModule } from './../../layout/login-page-layout/login-page-layout.module';
import { LoginPageComponent } from './login-page.component';
import { EffectsModule } from '@ngrx/effects';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        LoginPageLayoutModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromStore.getReducers(),
          user: combineReducers(fromStore.getReducers()),
          auth: combineReducers(fromAuthStore.getReducers())
        }),
        EffectsModule.forRoot(fromCms.effects),
        CmsModule,
        ConfigModule.forRoot()
      ],
      declarations: [LoginPageComponent],
      providers: [provideMockActions(() => of())]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
