import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { SupplementHashAnchorsPipe } from './supplement-hash-anchors.pipe';
import createSpy = jasmine.createSpy;

const pathname = '/electronics-spa/en/USD/faq';
const search = '?query=param&and=other';

const mockWindowRef = {
  location: {
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
  <h1 id="head1">head1</h1>
</ul>`;

const expectedHtml = `<ul>
  <li><a href="/electronics-spa/en/USD/faq?query=param&amp;and=other#head1">link1</a></li>
  <li><a>link2</a></li>
  <li><a href="http://external.route.com">link3</a></li>
  <li><a href="http://external.route.com#anchor">link4</a></li>
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
      const mockLink = document.createElement('a');
      mockLink.href = `${pathname}${search}#head1`;
      mockLink.innerText = `link1`;
      expect(pipe.transform(mockHtml)).toBe(expectedHtml);
      expect(renderer.createElement).toHaveBeenCalledWith('template');
      expect(renderer.setProperty).toHaveBeenCalledTimes(1);
      expect(renderer.setProperty).toHaveBeenCalledWith(
        mockLink,
        'href',
        `${pathname}${search}#head1`
      );
    });
  });
});
