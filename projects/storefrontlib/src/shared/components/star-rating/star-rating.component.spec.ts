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
    starRatingComponent.setRate(3, true);
    expect(starRatingComponent.setRate).toHaveBeenCalled();
  });

  it('should call saveRate', () => {
    spyOn(starRatingComponent, 'saveRate').and.callThrough();
    spyOn(starRatingComponent, 'setRate');
    starRatingComponent.disabled = false;
    starRatingComponent.saveRate(3);
    expect(starRatingComponent.setRate).toHaveBeenCalled();
    starRatingComponent.disabled = true;
    starRatingComponent.saveRate(3);
  });
});
