import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AnimationSliderComponent } from './animation-slider.component';
import { SliderElementDirective } from './slider-element.directive';
import { SliderHandleDirective } from './slider-handle.directive';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('VisualComponent', () => {
  let animationSliderComponent: AnimationSliderComponent;
  let fixture: ComponentFixture<AnimationSliderComponent>;
  let httpMock: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          AnimationSliderComponent,
          SliderElementDirective,
          SliderHandleDirective,
        ],
        imports: [RouterTestingModule, HttpClientTestingModule],
        providers: [],
      }).compileComponents();

      httpMock = TestBed.inject(HttpTestingController);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationSliderComponent);
    animationSliderComponent = fixture.componentInstance;
    animationSliderComponent.value = 0.5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(animationSliderComponent).toBeTruthy();
  });
});
