import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFinderPageLayoutComponent } from './store-finder-page-layout.component';
import { StoreFinderModule } from '../../../store-finder/store-finder.module';
import { StoreModule, combineReducers } from '@ngrx/store';

describe('StoreFinderPageLayoutComponent', () => {
  let component: StoreFinderPageLayoutComponent;
  let fixture: ComponentFixture<StoreFinderPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreFinderPageLayoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
