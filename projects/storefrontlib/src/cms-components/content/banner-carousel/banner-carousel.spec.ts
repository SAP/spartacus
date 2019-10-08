import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'cx-banner-carousel',
  template: '',
})
class MockBannerCarouselComponent {
  getItems() {
    return of();
  }
}

describe('CreateComponent', () => {
  let component: MockBannerCarouselComponent;
  let fixture: ComponentFixture<MockBannerCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockBannerCarouselComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockBannerCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get items', () => {
    expect(component.getItems()).toBeTruthy();
  });
});
