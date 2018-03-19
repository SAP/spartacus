import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPageLayoutComponent } from './category-page-layout.component';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import * as fromRoot from '../../../routing/store';
import * as fromCmsReducer from '../../../cms/store/reducers';

import { StoreModule, combineReducers } from '@ngrx/store';

describe('CategoryPageComponent', () => {
  let component: CategoryPageLayoutComponent;
  let fixture: ComponentFixture<CategoryPageLayoutComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          })
        ],
        declarations: [
          CategoryPageLayoutComponent,
          DynamicSlotComponent,
          ComponentWrapperComponent
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
