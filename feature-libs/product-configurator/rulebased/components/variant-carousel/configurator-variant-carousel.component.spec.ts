import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorVariantCarouselComponent } from './configurator-variant-carousel.component';

describe('ConfiguratorVariantCarouselComponent', () => {
  let component: ConfiguratorVariantCarouselComponent;
  let fixture: ComponentFixture<ConfiguratorVariantCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguratorVariantCarouselComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorVariantCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
