import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { NgbRatingModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
describe('StarRatingComponent in product', () => {
  let starRatingComponent: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbRatingModule],
      declarations: [StarRatingComponent],
      providers: [NgbRatingConfig]
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
