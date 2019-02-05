import { TestBed } from '@angular/core/testing';
import { SiteContextUrlSerializer } from './site-context-url-serializer';
import { SiteContextParamsService } from '../facade/site-context-params.service';

describe('SiteContextUrlSerializer', () => {
  const mockSiteContextParamsService = {
    getContextParameters: () => {}
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        SiteContextUrlSerializer,
        {
          provide: SiteContextParamsService,
          useValue: mockSiteContextParamsService
        }
      ]
    })
  );

  it('should be created', () => {
    const service: SiteContextUrlSerializer = TestBed.get(
      SiteContextUrlSerializer
    );
    expect(service).toBeTruthy();
  });
});
