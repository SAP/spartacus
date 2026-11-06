import { TestBed } from '@angular/core/testing';
import { ImageFetchPriority } from '../components/media/media.model';
import { LcpPresenceMappingService } from './lcp-presence-mapping.service';
import { LcpPresence } from './lcp-presence.model';

describe('LcpPresenceMappingService', () => {
  let service: LcpPresenceMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LcpPresenceMappingService);
  });

  it('should return HIGH fetch priority when LCP is present', () => {
    const result = service.getFetchPriority(LcpPresence.HAS_LCP);
    expect(result).toBe(ImageFetchPriority.HIGH);
  });

  it('should return undefined when LCP is not present', () => {
    const result = service.getFetchPriority(LcpPresence.NO_LCP);
    expect(result).toBeUndefined();
  });

  it('should return undefined for undefined input', () => {
    const result = service.getFetchPriority(undefined as any);
    expect(result).toBeUndefined();
  });
});
