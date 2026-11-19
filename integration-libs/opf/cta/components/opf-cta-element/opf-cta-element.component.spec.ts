import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { vi } from 'vitest';
import { WindowRef } from '@spartacus/core';
import { OpfDynamicScript } from '@spartacus/opf/base/root';
import { OpfCtaScriptsService } from '../opf-cta-scripts';
import { OpfCtaElementComponent } from './opf-cta-element.component';

describe('OpfCtaButton', () => {
  let component: OpfCtaElementComponent;
  let fixture: ComponentFixture<OpfCtaElementComponent>;
  let domSanitizer: DomSanitizer;
  let opfCtaScriptsServiceMock: any;
  let windowRef: WindowRef;

  const dynamicScriptMock: OpfDynamicScript = {
    html: '<div  style="border-style: solid;text-align:center;border-radius:10px;align-content:center;background-color:yellow;color:black"><h2>Thanks for purchasing our great products</h2><h3>Please use promo code:<b>123abc</b> for your next purchase<h3></div><script>console.log(\'CTA Script #1 is running\')</script>',
    cssUrls: [
      {
        url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.1/adyen.css',
        sri: '',
      },
    ],
    jsUrls: [
      {
        url: 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/4.2.1/adyen.js',
        sri: '',
      },
    ],
  };

  beforeEach(() => {
    opfCtaScriptsServiceMock = {
      removeScriptTags: vi.fn(),
      loadAndRunScript: vi.fn(),
    };

    TestBed.configureTestingModule({
      imports: [OpfCtaElementComponent],
      providers: [
        { provide: OpfCtaScriptsService, useValue: opfCtaScriptsServiceMock },
      ],
    });
    fixture = TestBed.createComponent(OpfCtaElementComponent);
    component = fixture.componentInstance;
    domSanitizer = TestBed.inject(DomSanitizer);
    opfCtaScriptsServiceMock.loadAndRunScript.mockReturnValue(
      Promise.resolve(dynamicScriptMock)
    );
    windowRef = TestBed.inject(WindowRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should renderHtml remove script tags and call bypassSecurityTrustHtml', () => {
    const html =
      '<h1>Test1</h1><script>console.log("script1");</script><h2>Test2</h2><script>console.log("script2");</script>';
    const expectedHtml = '<h1>Test1</h1><h2>Test2</h2>';
    vi.spyOn(domSanitizer, 'bypassSecurityTrustHtml').mockImplementation(
      () => {}
    );
    component.renderHtml(html);

    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(
      expectedHtml
    );
  });

  it('should renderHtml not call bypassSecurityTrustHtml in SSR', () => {
    vi.spyOn(windowRef, 'isBrowser').mockReturnValue(false);
    const html = '<h1>Test</h1><script>console.log("script");</script>';
    vi.spyOn(domSanitizer, 'bypassSecurityTrustHtml').mockImplementation(
      () => {}
    );
    component.renderHtml(html);

    expect(domSanitizer.bypassSecurityTrustHtml).not.toHaveBeenCalledWith(html);
  });

  it('should call loadAndRunScript', () => {
    component.ngAfterViewInit();
    expect(opfCtaScriptsServiceMock.loadAndRunScript).toHaveBeenCalled();
  });
});
