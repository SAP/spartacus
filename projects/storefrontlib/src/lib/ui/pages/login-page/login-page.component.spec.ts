import { ComponentWrapperComponent } from './../../../cms/components/component-wrapper/component-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './../../../user/components/login/login.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { DynamicSlotComponent } from '../../../cms/components';

import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromStore from '../../../user/store';
import { LoginPageLayoutComponent } from '../../layout/login-page-layout/login-page-layout.component';

describe('LandingPageLayoutComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromStore.reducers,
          user: combineReducers(fromStore.reducers)
        })
      ],
      declarations: [
        LoginPageComponent,
        LoginComponent,
        LoginPageLayoutComponent,
        ComponentWrapperComponent,
        DynamicSlotComponent
      ]
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
