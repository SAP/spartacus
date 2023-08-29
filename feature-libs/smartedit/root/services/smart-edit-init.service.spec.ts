import { TestBed } from '@angular/core/testing';
import { SmartEditInitService } from './smart-edit-init.service';
import { SmartEditService } from '../../core/services/smart-edit.service';
import { SmartEditLauncherService } from './smart-edit-launcher.service';

describe('SmartEditInitService', () => {
  let service: SmartEditInitService;
  let smartEditServiceMock: jasmine.SpyObj<SmartEditService>;
  let smartEditLauncherServiceMock: jasmine.SpyObj<SmartEditLauncherService>;

  beforeEach(() => {
    const smartEditServiceSpy = jasmine.createSpyObj('SmartEditService', [
      'processCmsPage',
    ]);
    const smartEditLauncherServiceSpy = jasmine.createSpyObj(
      'SmartEditLauncherService',
      ['isLaunchedInSmartEdit']
    );

    TestBed.configureTestingModule({
      providers: [
        SmartEditInitService,
        { provide: SmartEditService, useValue: smartEditServiceSpy },
        {
          provide: SmartEditLauncherService,
          useValue: smartEditLauncherServiceSpy,
        },
      ],
    });

    service = TestBed.inject(SmartEditInitService);
    smartEditServiceMock = TestBed.inject(
      SmartEditService
    ) as jasmine.SpyObj<SmartEditService>;
    smartEditLauncherServiceMock = TestBed.inject(
      SmartEditLauncherService
    ) as jasmine.SpyObj<SmartEditLauncherService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should call processCmsPage if launched in SmartEdit', () => {
      smartEditLauncherServiceMock.isLaunchedInSmartEdit.and.returnValue(true);

      service.init();

      expect(smartEditServiceMock.processCmsPage).toHaveBeenCalled();
    });

    it('should not call processCmsPage if not launched in SmartEdit', () => {
      smartEditLauncherServiceMock.isLaunchedInSmartEdit.and.returnValue(false);

      service.init();

      expect(smartEditServiceMock.processCmsPage).not.toHaveBeenCalled();
    });
  });
});
