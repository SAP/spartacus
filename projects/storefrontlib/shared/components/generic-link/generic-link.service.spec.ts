import { TestBed } from '@angular/core/testing';
import { GenericLinkComponentService } from './generic-link-component.service';

describe('GenericLinkService', () => {
  let service: GenericLinkComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericLinkComponentService],
    });
    service = TestBed.inject(GenericLinkComponentService);
  });

  describe('isExternalUrl', () => {
    it('should return false when url does not start with a configured protocol', () => {
      expect(service.isExternalUrl('other-protocol://example.com')).toBeFalsy();
      expect(service.isExternalUrl('://example.com')).toBeFalsy();
      expect(service.isExternalUrl('example.com')).toBeFalsy();
      expect(service.isExternalUrl('./local/url')).toBeFalsy();
      expect(service.isExternalUrl('/local/url')).toBeFalsy();
      expect(service.isExternalUrl('local/url')).toBeFalsy();
    });

    it('should return true when url starts with http:// or https://', () => {
      expect(service.isExternalUrl('https://example.com')).toBeTruthy();
      expect(service.isExternalUrl('http://example.com')).toBeTruthy();
      expect(service.isExternalUrl('http://')).toBeTruthy();
      expect(service.isExternalUrl('https://')).toBeTruthy();
    });

    it('should return true when url starts with mailto: or tel:', () => {
      expect(service.isExternalUrl('tel:123456789')).toBeTruthy();
      expect(service.isExternalUrl('mailto:test@example.com')).toBeTruthy();
      expect(service.isExternalUrl('tel:')).toBeTruthy();
      expect(service.isExternalUrl('mailto:')).toBeTruthy();
    });
  });
});
