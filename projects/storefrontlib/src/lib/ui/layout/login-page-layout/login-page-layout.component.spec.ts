import { Component, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageLayoutComponent } from './login-page-layout.component';
import { RouterTestingModule } from '@angular/router/testing';

@Pipe({
  name: 'cxPath'
})
class MockPathPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-login-form',
  template: ''
})
export class MockLoginComponent {}

describe('LoginPageLayoutComponent', () => {
  let component: LoginPageLayoutComponent;
  let fixture: ComponentFixture<LoginPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginPageLayoutComponent, MockLoginComponent, MockPathPipe]
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
