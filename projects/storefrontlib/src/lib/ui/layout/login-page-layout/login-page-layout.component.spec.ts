import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageLayoutComponent } from './login-page-layout.component';
import { provideMockActions } from '../../../../../../../node_modules/@ngrx/effects/testing';
import { Pipe, PipeTransform, Component } from '@angular/core';

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
      declarations: [
        LoginPageLayoutComponent,
        MockLoginComponent,
        MockPathPipe
      ],
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
