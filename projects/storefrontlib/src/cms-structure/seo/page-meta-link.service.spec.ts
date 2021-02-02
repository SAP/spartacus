import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { PageMetaLinkService } from './page-meta-link.service';

describe('PageMetaLinkService', () => {
  let service: PageMetaLinkService;
  let winRef: WindowRef;

  const pageUrl = 'https://www.myurl.com/en/USD';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRef],
    });

    service = TestBed.inject(PageMetaLinkService);
    winRef = TestBed.inject(WindowRef);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should add canonical link', () => {
    service.addCanonicalLink(pageUrl);
    const linkElement: HTMLLinkElement = winRef.document.getElementById(
      'cxCanonical'
    ) as HTMLLinkElement;
    expect(linkElement.href).toEqual(pageUrl);
  });

  it('should update existing canonical link', () => {
    service.addCanonicalLink('https://www.myurl.com/first/');
    service.addCanonicalLink('https://www.myurl.com/2nd/');
    const linkElement: HTMLLinkElement = winRef.document.getElementById(
      'cxCanonical'
    ) as HTMLLinkElement;
    expect(linkElement.href).toEqual('https://www.myurl.com/2nd/');
  });

  it('should remove existing canonical link', () => {
    service.addCanonicalLink(pageUrl);
    service.addCanonicalLink(undefined);
    const linkElement: HTMLLinkElement = winRef.document.getElementById(
      'cxCanonical'
    ) as HTMLLinkElement;
    expect(linkElement).toBeNull();
  });
});
