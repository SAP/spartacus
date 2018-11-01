import { StoreFinderComponent } from './store-finder.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

describe('StoreFinderComponent', () => {
  let component: StoreFinderComponent;
  let fixture: ComponentFixture<StoreFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [StoreFinderComponent],
      providers: []
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
