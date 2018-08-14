import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromStore from '../../store';
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
          user: combineReducers(fromStore.getReducers())
        })
      ],
      declarations: [RegisterComponent]
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
