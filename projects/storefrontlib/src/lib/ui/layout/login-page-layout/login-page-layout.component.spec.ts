import { RouterTestingModule } from '@angular/router/testing';
import { ComponentWrapperComponent } from './../../../cms/components/component-wrapper/component-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageLayoutComponent } from './login-page-layout.component';
import { DynamicSlotComponent } from '../../../cms/components';

import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromStore from '../../../user/store';
import { LoginModule } from '../../../user/components/login/login.module';

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
        StoreModule.forRoot({
          ...fromStore.reducers,
          user: combineReducers(fromStore.reducers)
        })
      ],
      declarations: [
        LoginPageLayoutComponent,
        ComponentWrapperComponent,
        DynamicSlotComponent
      ]
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
