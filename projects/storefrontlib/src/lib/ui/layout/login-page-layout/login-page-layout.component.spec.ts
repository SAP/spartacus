import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageLayoutComponent } from './login-page-layout.component';

@Component({
  selector: 'cx-login-form',
  template: ''
})
class MockLoginFormComponent {}

describe('LoginPageLayoutComponent', () => {
  let component: LoginPageLayoutComponent;
  let fixture: ComponentFixture<LoginPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageLayoutComponent, MockLoginFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
