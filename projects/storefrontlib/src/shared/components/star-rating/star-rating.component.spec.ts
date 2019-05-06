import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from './star-rating.component';
describe('StarRatingComponent in product', () => {
  let starRatingComponent: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbRatingModule],
      declarations: [StarRatingComponent],
      providers: [NgbRatingConfig],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    starRatingComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(starRatingComponent).toBeTruthy();
  });
});
