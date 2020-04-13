import { TestBed } from '@angular/core/testing';
import { CmsDataService } from './cms-data.service';
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

describe('CmsDataService', () => {
  let service: CmsDataService;

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
    service = TestBed.inject(CmsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCmsDataForComponent', () => {
    it('should return proper uid', () => {
      const data = service.getCmsDataForComponent('sampleUid2');
      expect(data.uid).toEqual('sampleUid2');
    });

    it('should return cms data', () => {
      const data = service.getCmsDataForComponent('sampleUid');
      expect(mockCmsService.getComponentData).toHaveBeenCalledWith('sampleUid');
      expect(data.data$).toBeTruthy();
    });
  });

  describe('getInjectorForComponent', () => {
    it('should return injector with CmsComponentData', () => {
      const injector = service.getInjectorForComponent('aaa', 'sampleUid');
      const data = injector.get(CmsComponentData);
      expect(data).toBeTruthy();
      expect(data.uid).toEqual('sampleUid');
    });
  });
});
