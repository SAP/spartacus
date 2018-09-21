import { TestBed, inject } from '@angular/core/testing';

import { CustomTemplateService } from './custom-template.service';

describe('CustomTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomTemplateService]
    });
  });

  it('should be created', inject([CustomTemplateService], (service: CustomTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
