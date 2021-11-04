import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { SupplementHashAnchorsPipe } from './supplement-hash-anchors.pipe';
import createSpy = jasmine.createSpy;

const pathname = '/electronics-spa/en/USD/faq';
const search = '?query=param&and=other';
const currentUrlWithoutFragment = `https://domain.com${pathname}${search}`;

const mockWindowRef = {
  location: {
    href: currentUrlWithoutFragment,
    pathname,
    search,
  },
};

const mockRenderer2 = {
  createElement: createSpy('createElement').and.callFake((type: string) =>
    document.createElement(type)
  ),
  setProperty: createSpy('setProperty').and.callFake(
    (el: HTMLElement, prop: string, val: string) => (el[prop] = val)
  ),
};

const mockHtml = `<ul>
  <li><a href="#head1">link1</a></li>
  <li><a>link2</a></li>
  <li><a href="http://external.route.com">link3</a></li>
  <li><a href="http://external.route.com#anchor">link4</a></li>
  <li><a href="#head5">link5</a></li>
  <li><a href="#">link6</a></li>
  <li><a href="/other-route/#head7">link7</a></li>
  <h1 id="head1">head1</h1>
</ul>`;

const expectedHtml = `<ul>
  <li><a href="https://domain.com${pathname}?query=param&amp;and=other#head1">link1</a></li>
  <li><a>link2</a></li>
  <li><a href="http://external.route.com">link3</a></li>
  <li><a href="http://external.route.com#anchor">link4</a></li>
  <li><a href="https://domain.com${pathname}?query=param&amp;and=other#head5">link5</a></li>
  <li><a href="https://domain.com${pathname}?query=param&amp;and=other#">link6</a></li>
  <li><a href="/other-route/#head7">link7</a></li>
  <h1 id="head1">head1</h1>
</ul>`;

describe('AnchorPipe', () => {
  let pipe: SupplementHashAnchorsPipe;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useValue: mockWindowRef },
        { provide: Renderer2, useValue: mockRenderer2 },
        SupplementHashAnchorsPipe,
      ],
    });
    renderer = TestBed.inject(Renderer2);
    pipe = TestBed.inject(SupplementHashAnchorsPipe);
  });

  describe('transform', () => {
    it('should return html with proper anchors', () => {
      const mockLink1 = document.createElement('a');
      const mockLink5 = document.createElement('a');
      const mockLink6 = document.createElement('a');
      mockLink1.href = `${currentUrlWithoutFragment}#head1`;
      mockLink5.href = `${currentUrlWithoutFragment}#head5`;
      mockLink6.href = `${currentUrlWithoutFragment}#`;
      mockLink1.innerText = `link1`;
      mockLink5.innerText = `link5`;
      mockLink6.innerText = `link6`;

      expect(pipe.transform(mockHtml)).toBe(expectedHtml);
      expect(renderer.createElement).toHaveBeenCalledWith('template');
      expect(renderer.setProperty).toHaveBeenCalledTimes(3);

      expect(renderer.setProperty).toHaveBeenCalledWith(
        mockLink1,
        'href',
        `${currentUrlWithoutFragment}#head1`
      );
      expect(renderer.setProperty).toHaveBeenCalledWith(
        mockLink5,
        'href',
        `${currentUrlWithoutFragment}#head5`
      );
      expect(renderer.setProperty).toHaveBeenCalledWith(
        mockLink6,
        'href',
        `${currentUrlWithoutFragment}#`
      );
    });
  });
});
