import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { QualtricsConfig } from '../../../shared/config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';
import { QualtricsComponent } from './qualtrics.component';

class MockQualtricsLoaderService {
  load(): Observable<boolean> {
    return of(true);
  }
}

class MockQualtricsConfig {
  qualtrics: {};
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
          useClass: MockQualtricsLoaderService,
        },
        {
          provide: QualtricsConfig,
          useClass: MockQualtricsConfig,
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

  it('should be loaded', () => {
    let result: boolean;

    component.qualtricsEnabled$.subscribe(data => (result = data));

    expect(result).toBe(true);
  });
});
