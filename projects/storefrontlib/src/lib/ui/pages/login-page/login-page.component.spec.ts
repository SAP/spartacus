import { LoginPageLayoutModule } from './../../layout/login-page-layout/login-page-layout.module';
import { ComponentWrapperComponent } from './../../../cms/components/component-wrapper/component-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPageComponent } from './login-page.component';
import { DynamicSlotComponent } from '../../../cms/components';

import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromStore from '../../../user/store';

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
          ...fromStore.reducers,
          user: combineReducers(fromStore.reducers)
        })
      ],
      declarations: [
        LoginPageComponent,
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
