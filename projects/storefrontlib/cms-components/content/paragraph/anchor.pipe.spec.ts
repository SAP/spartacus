import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RoutingService } from '@spartacus/core';
import { AnchorPipe } from './anchor.pipe';
import createSpy = jasmine.createSpy;

const mockUrl = '/electronics-spa/en/USD/faq';

class MockRoutingService implements Partial<RoutingService> {
  getUrl = createSpy('getUrl').and.returnValue(mockUrl);
}

const mockRenderer2 = {
  createElement: createSpy('createElement').and.callFake((type: string) =>
    document.createElement(type)
  ),
  setProperty: createSpy('setProperty').and.callFake(
    (el: HTMLAnchorElement, prop: string, val: string) => (el[prop] = val)
  ),
};

class MockSanitizer implements Partial<DomSanitizer> {
  bypassSecurityTrustHtml = createSpy('bypassSecurityTrustHtml').and.callFake(
    (html: string) => html as SafeHtml
  );
}

const mockHtml = `<ul>
  <li><a href="#head1">link1</a></li>
  <li><a>link2</a></li>
  <li><a href="http://external.route.com">link3</a></li>
  <li><a href="http://external.route.com#anchor">link4</a></li>
  <h1 id="head1">head1</h1>
</ul>`;

const expectedHtml = `<ul>
  <li><a href="${mockUrl}#head1">link1</a></li>
  <li><a>link2</a></li>
  <li><a href="http://external.route.com">link3</a></li>
  <li><a href="http://external.route.com#anchor">link4</a></li>
  <h1 id="head1">head1</h1>
</ul>`;

fdescribe('AnchorPipe', () => {
  let pipe: AnchorPipe;
  let renderer: Renderer2;
  let sanitizer: DomSanitizer;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: Renderer2, useValue: mockRenderer2 },
        { provide: DomSanitizer, useClass: MockSanitizer },
        AnchorPipe,
      ],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    renderer = TestBed.inject(Renderer2);
    routingService = TestBed.inject(RoutingService);
    pipe = TestBed.inject(AnchorPipe);
  });

  describe('transform', () => {
    it('should return html with proper anchors', () => {
      const mockLink = document.createElement('a');
      mockLink.href = `${mockUrl}#head1`;
      mockLink.innerText = `link1`;
      expect(pipe.transform(mockHtml)).toBe(expectedHtml);
      expect(renderer.createElement).toHaveBeenCalledWith('template');
      expect(renderer.setProperty).toHaveBeenCalledTimes(1);
      expect(renderer.setProperty).toHaveBeenCalledWith(
        mockLink,
        'href',
        `${mockUrl}#head1`
      );
      expect(routingService.getUrl).toHaveBeenCalledWith({});
      expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(
        expectedHtml
      );
    });
  });
});
