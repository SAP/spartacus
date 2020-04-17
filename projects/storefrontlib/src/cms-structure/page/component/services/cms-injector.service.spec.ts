import { TestBed } from '@angular/core/testing';
import { CmsInjectorService } from './cms-injector.service';
import { CmsMappingService } from '../../../services/cms-mapping.service';
import { CmsService } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData } from '@spartacus/storefront';

const mockCmsMappingService = jasmine.createSpyObj('CmsMappingService', [
  'getComponentMapping',
]);

const mockCmsService = {
  getComponentData: jasmine.createSpy().and.returnValue(of('data')),
};

describe('CmsInjectorService', () => {
  let service: CmsInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CmsMappingService,
          useValue: mockCmsMappingService,
        },
        {
          provide: CmsService,
          useValue: mockCmsService,
        },
      ],
    });
    service = TestBed.inject(CmsInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getInjector', () => {
    it('should return injector with CmsComponentData', () => {
      const injector = service.getInjector('aaa', 'sampleUid');
      const data = injector.get(CmsComponentData);
      expect(data).toBeTruthy();
      expect(data.uid).toEqual('sampleUid');
    });
  });
});
