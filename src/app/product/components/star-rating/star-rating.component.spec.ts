import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { MaterialModule } from 'app/material.module';

describe('StarRatingComponent in product', () => {
  let starRatingComponent: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule],
        declarations: [StarRatingComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    starRatingComponent = fixture.componentInstance;
    spyOn(starRatingComponent, 'getStar').and.callThrough();
  });

  it('should be created', () => {
    expect(starRatingComponent).toBeTruthy();
  });

  it('should call getStar()', () => {
    starRatingComponent.rating = 3;

    let icon = starRatingComponent.getStar(2);
    expect(icon).toEqual('star');

    icon = starRatingComponent.getStar(3);
    expect(icon).toEqual('star');

    icon = starRatingComponent.getStar(3.3);
    expect(icon).toEqual('star_half');

    icon = starRatingComponent.getStar(4);
    expect(icon).toEqual('star_outline');
  });
});
