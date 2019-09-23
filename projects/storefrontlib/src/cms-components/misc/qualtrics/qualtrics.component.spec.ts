import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureConfigService, WindowRef } from '@spartacus/core';
import { QualtricsComponent } from './qualtrics.component';

class MockFeatureConfigService {
  isEnabled(_feature: string): boolean {
    return true;
  }
}

fdescribe('QualtricsComponent', () => {
  let component: QualtricsComponent;
  let fixture: ComponentFixture<QualtricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualtricsComponent],
      providers: [
        WindowRef,
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualtricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
