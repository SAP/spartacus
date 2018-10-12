import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, StoreModule } from '@ngrx/store';

import { StoreFinderListCountComponent } from './store-finder-list-count.component';

import * as fromReducers from '../../store';
import * as fromRoot from '../../../routing/store';

describe('StoreFinderListCountComponent', () => {
  let component: StoreFinderListCountComponent;
  let fixture: ComponentFixture<StoreFinderListCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          stores: combineReducers(fromReducers.reducers)
        }),
        RouterTestingModule
      ],
      declarations: [StoreFinderListCountComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderListCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
