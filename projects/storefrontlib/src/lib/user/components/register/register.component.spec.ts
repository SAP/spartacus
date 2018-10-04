import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import * as NgrxStore from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromAuthStore from '../../../auth/store';
import * as fromUserStore from '../../store';
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

const selectors = {
  getUserToken: new BehaviorSubject(null),
  getAllTitles: new BehaviorSubject(null)
};
const mockSelect = selector => {
  switch (selector) {
    case fromUserStore.getAllTitles:
      return () => selectors.getAllTitles;

    case fromAuthStore.getUserToken:
      return () => selectors.getUserToken;
  }
};

describe('RegisterComponent', () => {
  let controls;
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

    selectors.getUserToken.next({});
    spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();

    controls = component.userRegistrationForm.controls;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load titles', () => {
      spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);
      selectors.getAllTitles.next({ mockTitlesList });
      selectors.getUserToken.next(null);

      component.ngOnInit();
      component.titles$.subscribe(data => {
        expect(data.mockTitlesList).toEqual(mockTitlesList);
      });
    });

    it('should fetch titles if the state is empty', () => {
      component.ngOnInit();
      component.titles$.subscribe(() => {
        expect(store.dispatch).toHaveBeenCalledWith(new fromStore.LoadTitles());
      });
    });

    it('form invalid when empty', () => {
      spyOnProperty(NgrxStore, 'select').and.returnValue(mockSelect);
      selectors.getAllTitles.next({ mockTitlesList });
      component.ngOnInit();
      expect(component.userRegistrationForm.valid).toBeFalsy();
    });

    it('should contains error if repassword is different than password', () => {
      component.ngOnInit();

      controls['password'].setValue('test');
      controls['passwordconf'].setValue('test1');

      const isNotEqual = component.userRegistrationForm.hasError('NotEqual');
      expect(isNotEqual).toBeTruthy();
    });

    it('should not contain error if repassword is the same as password', () => {
      component.ngOnInit();

      controls['password'].setValue('test');
      controls['passwordconf'].setValue('test');

      const isNotEqual = component.userRegistrationForm.hasError('NotEqual');
      expect(isNotEqual).toBeFalsy();
    });

    it('form valid when filled', () => {
      component.ngOnInit();

      controls['titleCode'].setValue('Mr');
      controls['firstName'].setValue('John');
      controls['lastName'].setValue('Doe');
      controls['email'].setValue('JohnDoe@thebest.john.intheworld.com');
      controls['termsandconditions'].setValue(true);
      controls['password'].setValue('strongPass$!123');
      controls['passwordconf'].setValue('strongPass$!123');

      expect(component.userRegistrationForm.valid).toBeTruthy();
    });

    it('form invalid when not all required fields filled', () => {
      component.ngOnInit();

      controls['titleCode'].setValue('');
      controls['firstName'].setValue('John');
      controls['lastName'].setValue('');
      controls['email'].setValue('JohnDoe@thebest.john.intheworld.com');
      controls['termsandconditions'].setValue(true);
      controls['password'].setValue('strongPass$!123');
      controls['passwordconf'].setValue('strongPass$!123');

      expect(component.userRegistrationForm.valid).toBeFalsy();
    });

    it('form invalid when not terms not checked', () => {
      component.ngOnInit();

      controls['titleCode'].setValue('Mr');
      controls['firstName'].setValue('John');
      controls['lastName'].setValue('Doe');
      controls['email'].setValue('JohnDoe@thebest.john.intheworld.com');
      controls['termsandconditions'].setValue(false);
      controls['password'].setValue('strongPass$!123');
      controls['passwordconf'].setValue('strongPass$!123');

      expect(component.userRegistrationForm.valid).toBeFalsy();
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
