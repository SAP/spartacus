import { TestBed, inject } from '@angular/core/testing';
import { CmsModelService } from './cms-model.service';

describe('CmsSubscriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CmsModelService]
    });
  });

  it('should ...', inject([CmsModelService], (service: CmsModelService) => {
    expect(service).toBeTruthy();
  }));
});
