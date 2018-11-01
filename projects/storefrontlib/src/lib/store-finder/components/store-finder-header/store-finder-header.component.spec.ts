import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { StoreFinderHeaderComponent } from './store-finder-header.component';
import { StoreFinderSearchComponent } from '../store-finder-search/store-finder-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WindowRef } from '../../services/window-ref';
import { Router, ActivatedRoute } from '@angular/router';

fdescribe('StoreFinderHeaderComponent', () => {
  let component: StoreFinderHeaderComponent;
  let fixture: ComponentFixture<StoreFinderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [StoreFinderHeaderComponent, StoreFinderSearchComponent],
      providers: [
        WindowRef,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {} }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
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
