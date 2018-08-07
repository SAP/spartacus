import { ComponentWrapperComponent } from './../../../cms/components/component-wrapper/component-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './../../../user/components/login/login.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageLayoutComponent } from './login-page-layout.component';
import { DynamicSlotComponent } from '../../../cms/components';

import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromStore from '../../../user/store';

describe('LandingPageLayoutComponent', () => {
  let component: LoginPageLayoutComponent;
  let fixture: ComponentFixture<LoginPageLayoutComponent>;

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
        LoginPageLayoutComponent,
        LoginComponent,
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
