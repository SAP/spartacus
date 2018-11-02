import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { StoreFinderHeaderComponent } from './store-finder-header.component';
import { StoreFinderSearchComponent } from '../store-finder-search/store-finder-search.component';
import { WindowRef } from '../../services/window-ref';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('StoreFinderHeaderComponent', () => {
  let component: StoreFinderHeaderComponent;
  let fixture: ComponentFixture<StoreFinderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [StoreFinderHeaderComponent, StoreFinderSearchComponent],
      providers: [WindowRef]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
