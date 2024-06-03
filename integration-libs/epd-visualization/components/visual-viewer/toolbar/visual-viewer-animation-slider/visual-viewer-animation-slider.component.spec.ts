import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { VisualViewerAnimationSliderComponent } from './visual-viewer-animation-slider.component';

@Pipe({
  name: 'cxNumeric',
})
class MockNumericPipe implements PipeTransform {
  transform(): any {}
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('VisualViewerAnimationSliderComponent', () => {
  let visualViewerAnimationSliderComponent: VisualViewerAnimationSliderComponent;
  let fixture: ComponentFixture<VisualViewerAnimationSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockNumericPipe],
      imports: [CommonModule, I18nTestingModule],
      providers: [
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualViewerAnimationSliderComponent);
    visualViewerAnimationSliderComponent = fixture.componentInstance;

    expect(visualViewerAnimationSliderComponent.initialized).toEqual(false);
    fixture.detectChanges();
  });

  it('should create animation slider component', () => {
    expect(visualViewerAnimationSliderComponent).toBeTruthy();
  });

  it('should return value that was set', () => {
    visualViewerAnimationSliderComponent.value = 0.5;
    expect(visualViewerAnimationSliderComponent.value).toEqual(0.5);
  });

  it('should return disabled value that was set', () => {
    visualViewerAnimationSliderComponent.disabled = true;
    expect(visualViewerAnimationSliderComponent.disabled).toEqual(true);

    visualViewerAnimationSliderComponent.disabled = false;
    expect(visualViewerAnimationSliderComponent.disabled).toEqual(false);
  });
});
