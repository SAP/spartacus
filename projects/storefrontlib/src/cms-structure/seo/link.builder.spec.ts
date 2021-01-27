import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { LinkBuilder } from './link.builder';

describe('LinkBuilder', () => {
  let linkBuilder: LinkBuilder;
  let winRef: WindowRef;

  const pageUrl = 'https://www.myurl.com/en/USD';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRef],
    });

    linkBuilder = TestBed.inject(LinkBuilder);
    winRef = TestBed.inject(WindowRef);
  });

  it('should inject service', () => {
    expect(linkBuilder).toBeTruthy();
  });

  it('should add canonical link', () => {
    linkBuilder.addCanonicalLink(pageUrl);
    const linkElement: HTMLLinkElement = winRef.document.getElementById(
      'cxCanonical'
    ) as HTMLLinkElement;
    expect(linkElement.href).toEqual(pageUrl);
  });

  it('should update existing canonical link', () => {
    linkBuilder.addCanonicalLink('https://www.myurl.com/first/');
    linkBuilder.addCanonicalLink('https://www.myurl.com/2nd/');
    const linkElement: HTMLLinkElement = winRef.document.getElementById(
      'cxCanonical'
    ) as HTMLLinkElement;
    expect(linkElement.href).toEqual('https://www.myurl.com/2nd/');
  });

  it('should remove existing canonical link', () => {
    linkBuilder.addCanonicalLink(pageUrl);
    linkBuilder.addCanonicalLink(undefined);
    const linkElement: HTMLLinkElement = winRef.document.getElementById(
      'cxCanonical'
    ) as HTMLLinkElement;
    expect(linkElement).toBeNull();
  });
});
