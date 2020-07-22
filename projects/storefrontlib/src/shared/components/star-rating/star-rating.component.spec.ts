import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingComponent } from './star-rating.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockIconComponent {
  @Input() type;
}

describe('StarRatingComponent in product', () => {
  let starRatingComponent: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [MockIconComponent, StarRatingComponent],
      providers: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    starRatingComponent = fixture.componentInstance;
  });

  const INPUT_RATE = 3;

  it('should be created', () => {
    expect(starRatingComponent).toBeTruthy();
  });

  it('should call', () => {
    spyOn(starRatingComponent, 'setRate');
    starRatingComponent.ngOnInit();
    expect(starRatingComponent.setRate).toHaveBeenCalled();
  });

  it('should call setRate and call through it', () => {
    spyOn(starRatingComponent, 'setRate').and.callThrough();
    starRatingComponent.setRate(INPUT_RATE, true);
    expect(starRatingComponent.setRate).toHaveBeenCalled();
  });

  it('should call saveRate', () => {
    spyOn(starRatingComponent, 'saveRate').and.callThrough();
    spyOn(starRatingComponent, 'setRate');
    starRatingComponent.disabled = false;
    starRatingComponent.saveRate(INPUT_RATE);
    expect(starRatingComponent.setRate).toHaveBeenCalled();
    starRatingComponent.disabled = true;
    starRatingComponent.saveRate(INPUT_RATE);
  });
});
