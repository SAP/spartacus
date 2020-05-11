import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualtricsConfig } from './config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';
import { QualtricsComponent } from './qualtrics.component';

const mockQualtricsConfig: QualtricsConfig = {
  qualtrics: {
    scriptSource: 'assets/deployment-script.js',
  },
};

class MockQualtricsLoaderService {
  addScript(): void {}
}

describe('QualtricsComponent', () => {
  let component: QualtricsComponent;
  let fixture: ComponentFixture<QualtricsComponent>;
  let service: QualtricsLoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualtricsComponent],
      providers: [
        {
          provide: QualtricsLoaderService,
          useClass: MockQualtricsLoaderService,
        },
        { provide: QualtricsConfig, useValue: mockQualtricsConfig },
      ],
    }).compileComponents();
  }));

  describe('with config', () => {
    beforeEach(() => {
      service = TestBed.inject(QualtricsLoaderService);
      spyOn(service, 'addScript').and.stub();

      fixture = TestBed.createComponent(QualtricsComponent);
      component = fixture.componentInstance;
    });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should add qualtrics script', () => {
      fixture.detectChanges();
      expect(service.addScript).toHaveBeenCalledWith(
        'assets/deployment-script.js'
      );
    });
  });
});
