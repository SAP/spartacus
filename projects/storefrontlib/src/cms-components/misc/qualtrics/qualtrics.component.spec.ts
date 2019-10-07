import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualtricsLoaderService, WindowRef } from '@spartacus/core';
import { QualtricsComponent } from './qualtrics.component';

class MockQualtricsLoader {
  trigger(): void {}
}

describe('QualtricsComponent', () => {
  let component: QualtricsComponent;
  let fixture: ComponentFixture<QualtricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualtricsComponent],
      providers: [
        WindowRef,
        {
          provide: QualtricsLoaderService,
          useClass: MockQualtricsLoader,
        },
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
