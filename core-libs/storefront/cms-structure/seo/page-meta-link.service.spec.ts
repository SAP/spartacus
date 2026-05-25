import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { PageMetaLinkService } from './page-meta-link.service';

describe('PageMetaLinkService', () => {
  let service: PageMetaLinkService;
  let winRef: WindowRef;

  const pageUrl = 'https://www.myurl.com/en/USD';
  const preconnectUrl = 'https://media.example.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRef],
    });

    service = TestBed.inject(PageMetaLinkService);
    winRef = TestBed.inject(WindowRef);
  });

  afterEach(() => {
    // Clean up any preconnect links added to the document head
    const links = Array.from(
      winRef.document.head.querySelectorAll('link[rel="preconnect"]')
    );
    links.forEach((link) => link.remove());
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should add canonical link', () => {
    service.setCanonicalLink(pageUrl);
    let linkElement: HTMLLinkElement = winRef.document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    expect(linkElement.href).toEqual(pageUrl);
  });

  it('should update existing canonical link', () => {
    service.setCanonicalLink('https://www.myurl.com/first/');
    service.setCanonicalLink('https://www.myurl.com/2nd/');
    let linkElement: HTMLLinkElement = winRef.document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    expect(linkElement.href).toEqual('https://www.myurl.com/2nd/');
  });

  it('should remove existing canonical link', () => {
    service.setCanonicalLink(pageUrl);
    service.setCanonicalLink(undefined);
    const linkElement: HTMLLinkElement = winRef.document.getElementById(
      'cxCanonical'
    ) as HTMLLinkElement;
    expect(linkElement).toBeNull();
  });

  it('should add a preconnect link to the document head', () => {
    service.addPreconnectLink(preconnectUrl);
    const linkElement = winRef.document.head.querySelector(
      `link[rel="preconnect"][href="${preconnectUrl}"]`
    ) as HTMLLinkElement;
    expect(linkElement).toBeTruthy();
    expect(linkElement.rel).toBe('preconnect');
    //URL constructor is used for normalizing href
    expect(new URL(linkElement.href).origin).toBe(preconnectUrl);
  });

  it('should not add duplicate preconnect links', () => {
    service.addPreconnectLink(preconnectUrl);
    service.addPreconnectLink(preconnectUrl);
    const links = winRef.document.head.querySelectorAll(
      `link[rel="preconnect"][href="${preconnectUrl}"]`
    );
    expect(links.length).toBe(1);
  });

  it('should insert the preconnect link at the top of the head', () => {
    // Add another element to head first
    const dummy = winRef.document.createElement('meta');
    dummy.setAttribute('name', 'dummy');
    winRef.document.head.appendChild(dummy);

    service.addPreconnectLink(preconnectUrl);

    const firstChild = winRef.document.head.firstChild as HTMLLinkElement;
    expect(firstChild.tagName.toLowerCase()).toBe('link');
    expect(firstChild.rel).toBe('preconnect');
    //URL constructor is used for normalizing href
    expect(new URL(firstChild.href).origin).toBe(preconnectUrl);
  });
});
