import {
  ComponentFixture,
  TestBed,
  TestBedStatic,
} from '@angular/core/testing';
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

  function configureTestingModule(): TestBedStatic {
    return TestBed.configureTestingModule({
      declarations: [QualtricsComponent],
      providers: [
        {
          provide: QualtricsLoaderService,
          useClass: MockQualtricsLoaderService,
        },
        { provide: QualtricsConfig, useValue: mockQualtricsConfig },
      ],
    });
  }

  function stubSeviceAndCreateComponent() {
    service = TestBed.inject(QualtricsLoaderService);
    spyOn(service, 'addScript').and.stub();

    fixture = TestBed.createComponent(QualtricsComponent);
    component = fixture.componentInstance;
  }

  describe('with config', () => {
    beforeEach(() => {
      configureTestingModule();
      stubSeviceAndCreateComponent();
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

  describe('without config', () => {
    it('should NOT add qualtrics script', () => {
      configureTestingModule().overrideProvider(QualtricsConfig, {
        useValue: {},
      });
      TestBed.compileComponents();

      stubSeviceAndCreateComponent();

      expect(service.addScript).not.toHaveBeenCalledWith(
        'assets/deployment-script.js'
      );
    });
  });
});
