import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryPageLayoutComponent } from './category-page-layout.component';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import * as fromCmsReducer from '../../../cms/store/reducers';

import { StoreModule } from '@ngrx/store';
import { OutletDirective } from '../../../outlet';

describe('CategoryPageLayoutComponent', () => {
  let component: CategoryPageLayoutComponent;
  let fixture: ComponentFixture<CategoryPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers())
      ],
      declarations: [
        CategoryPageLayoutComponent,
        DynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
