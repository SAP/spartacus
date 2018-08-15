import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromStore from '../../../store';
import * as fromAuthStore from '../../../../auth/store';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let store: Store<fromStore.UserState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromStore.getReducers(),
          user: combineReducers(fromStore.getReducers()),
          auth: combineReducers(fromAuthStore.getReducers())
        })
      ],
      declarations: [LoginFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.stub();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form property', () => {
    expect(component.form.controls['userId'].value).toBe('');
    expect(component.form.controls['password'].value).toBe('');
  });

  it('should login', () => {
    component.form.controls['userId'].setValue('test@email.com');
    component.form.controls['password'].setValue('secret');
    component.login();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAuthStore.LoadUserToken({
        userId: 'test@email.com',
        password: 'secret'
      })
    );
  });
});
