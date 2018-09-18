import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromStore from '../../store';
import * as fromAuthStore from '../../../auth/store';
import { RegisterComponent } from './register.component';

const mockTitlesList = {
  titles: [
    {
      code: 'mr',
      name: 'Mr.'
    },
    {
      code: 'mrs',
      name: 'Mrs.'
    }
  ]
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
      declarations: [RegisterComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load titles', () => {
      spyOn(store, 'select').and.returnValue(of({ mockTitlesList }));
      component.ngOnInit();
      component.titles$.subscribe(data => {
        expect(data.mockTitlesList).toEqual(mockTitlesList);
      });
    });

    it('should fetch titles if the state is empty', () => {
      spyOn(store, 'select').and.returnValue(of({}));
      component.ngOnInit();
      component.titles$.subscribe(() => {
        expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadTitles());
      });
    });

    it('form invalid when empty', () => {
      component.ngOnInit();
      expect(component.userRegistrationForm.valid).toBeFalsy();
    });

    it('should contains error if repassword is different than password', () => {
      component.ngOnInit();
      component.userRegistrationForm.controls['password'].setValue('test');
      component.userRegistrationForm.controls['passwordconf'].setValue('test1');

      const isNotEqual = component.userRegistrationForm.hasError('NotEqual');
      expect(isNotEqual).toBeTruthy();
    });

    it('should not contain error if repassword is the same as password', () => {
      component.ngOnInit();
      component.userRegistrationForm.controls['password'].setValue('test');
      component.userRegistrationForm.controls['passwordconf'].setValue('test');

      const isNotEqual = component.userRegistrationForm.hasError('NotEqual');
      expect(isNotEqual).toBeFalsy();
    });
  });

  describe('submit', () => {
    it('should submit form', () => {
      component.submit();
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.RegisterUser({
          firstName: '',
          lastName: '',
          password: '',
          titleCode: '',
          uid: ''
        })
      );
    });
  });
});
