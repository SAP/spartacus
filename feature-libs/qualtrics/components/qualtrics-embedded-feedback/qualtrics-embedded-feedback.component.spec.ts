import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QualtricsEmbeddedFeedbackComponent } from './qualtrics-embedded-feedback.component';

describe('QualtricsEmbeddedFeedbackComponent', () => {
  let component: QualtricsEmbeddedFeedbackComponent;
  let fixture: ComponentFixture<QualtricsEmbeddedFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualtricsEmbeddedFeedbackComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualtricsEmbeddedFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
