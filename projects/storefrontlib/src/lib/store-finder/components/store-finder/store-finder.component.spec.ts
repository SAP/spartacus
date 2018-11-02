import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreFinderHeaderComponent } from '../store-finder-header/store-finder-header.component';
import { StoreFinderComponent } from './store-finder.component';
import { StoreFinderSearchComponent } from '../store-finder-search/store-finder-search.component';
import { WindowRef } from '../../services/window-ref';

describe('StoreFinderComponent', () => {
  let component: StoreFinderComponent;
  let fixture: ComponentFixture<StoreFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [
        StoreFinderComponent,
        StoreFinderHeaderComponent,
        StoreFinderSearchComponent
      ],
      providers: [WindowRef]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
