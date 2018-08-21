import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as fromStore from '../../../store';
import * as fromRouting from '../../../../routing/store';
import * as fromAuthStore from '../../../../auth/store';
import * as fromGlobalMessage from '../../../../global-message/store';
import { GlobalMessageType } from './../../../../global-message/models/message.model';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let store: Store<fromStore.UserState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
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

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.returnValues(
      of(undefined),
      of({ access_token: 'test' }),
      of('/test')
    );

    component.ngOnInit();
    fixture.detectChanges();
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

  it('should redirect to returnUrl saved in store if there is one', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromGlobalMessage.AddMessage({
        text: 'Logged In Successfully',
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION
      })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromRouting.Go({ path: ['/test'] })
    );
  });
});
