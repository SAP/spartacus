import { Component, DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
import { IconModule } from './icon.module';
import { ICON_TYPE, IconConfig } from './icon.model';
import { IconLoaderService } from './icon-loader.service';
import { IconComponent } from './icon.component';
import { MockIconConfig } from './icon-loader.service.spec';

@Component({
  selector: 'cx-icon-test',
  template: `
    <cx-icon type="VISA">projected content</cx-icon>
    <button name="test" type="submit" cxIcon="CART"></button>
    <div cxIcon type="HAPPY" class="hostClass">more <em>content</em></div>
    <p class="original and another one" cxIcon="LEFT"></p>
  `,
})
class MockIconTestComponent {}

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;
  let winRef: WindowRef;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [IconComponent],
        providers: [
          { provide: IconConfig, useValue: MockIconConfig },
          { provide: IconLoaderService, useClass: IconLoaderService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    winRef = TestBed.inject(WindowRef);
  });

  describe('controller', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should not have a default icon', () => {
      expect(component.icon).toBeFalsy();
    });

    it('should create an icon based on type input', () => {
      expect(component.icon).toBeFalsy();
      component.type = 'HAPPY';
      expect(component.icon).toBe('😊');
    });

    it('should create an icon based on cxIcon input', () => {
      expect(component.icon).toBeFalsy();
      component.cxIcon = 'HAPPY';
      expect(component.icon).toBe('😊');
    });

    it('should create an icon based multiple inputs', () => {
      expect(component.icon).toBeFalsy();
      component.type = ICON_TYPE.CART;
      component.cxIcon = 'HAPPY';
      expect(component.icon).toBe('😊');
    });

    it('should not create an icon for null value', () => {
      component.type = null;
      expect(component.icon).toBeFalsy();
    });

    it("should not create an icon for '' value", () => {
      component.type = <any>'';
      expect(component.icon).toBeFalsy();
    });

    it('should not have a flip direction by default', () => {
      component.type = <any>'';
      expect(component.styleClasses).not.toContain('flip-at-rtl');
      expect(component.styleClasses).not.toContain('flip-at-ltr');
    });

    it('should store the flip direction for the given icon', () => {
      component.type = 'CARET_RIGHT';
      expect(component.styleClasses).toContain('flip-at-rtl');
      expect(component.styleClasses).not.toContain('flip-at-ltr');
    });
  });

  describe('linked resources', () => {
    it('should add the font resource', () => {
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      component.type = 'PAYPAL';
      fixture.detectChanges();
      expect(winRef.document.createElement).toHaveBeenCalledWith('link');
    });

    it('should not add the font resource for the same font icon', () => {
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      component.type = ICON_TYPE.VISA;
      fixture.detectChanges();
      component.type = ICON_TYPE.VISA;
      fixture.detectChanges();
      expect(winRef.document.createElement).toHaveBeenCalledWith('link');
      expect(winRef.document.createElement).toHaveBeenCalledTimes(1);
    });

    it('should not add the same font resource for fonts with the same font resource', () => {
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      component.type = ICON_TYPE.VISA;
      fixture.detectChanges();
      component.type = 'PAYPAL';
      fixture.detectChanges();
      expect(winRef.document.createElement).toHaveBeenCalledWith('link');
      expect(winRef.document.createElement).toHaveBeenCalledTimes(1);
    });

    it('should add 2 fonts resources for the different fonts', () => {
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      component.type = ICON_TYPE.VISA;
      fixture.detectChanges();
      component.type = 'MASTERCARD';
      fixture.detectChanges();
      expect(winRef.document.createElement).toHaveBeenCalledWith('link');
      expect(winRef.document.createElement).toHaveBeenCalledTimes(2);
    });
  });

  describe('UI tests', () => {
    let debugElement: DebugElement;
    let nativeDebugElement: HTMLElement;

    beforeEach(() => {
      debugElement = fixture.debugElement;
      nativeDebugElement = debugElement.nativeElement;
    });

    describe('SVG icons', () => {
      it('should add CSS class to host element', () => {
        component.type = ICON_TYPE.INFO;
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toBe(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('infoSymbol');
      });

      it('should not have flip-at-ltr and flip-at-rtl class', () => {
        component.type = ICON_TYPE.CART;
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toBe(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('cartSymbol');
        expect(hostClassList).not.toContain('flip-at-rtl');
        expect(hostClassList).not.toContain('flip-at-ltr');
      });

      it('should generate non-sprited SVG', () => {
        component.type = ICON_TYPE.INFO;
        fixture.detectChanges();

        expect(nativeDebugElement.childElementCount).toBe(1);

        const svgElement = nativeDebugElement.children[0];
        expect(svgElement.nodeName).toBe('svg');
        expect(svgElement.attributes.length).toBe(0);
        expect(svgElement.childElementCount).toBe(1);

        const useElement = svgElement.children[0];
        expect(useElement.nodeName).toBe('use');
        expect(useElement.attributes.length).toBe(1);
        expect(useElement.getAttribute('xlink:href')).toBe('#infoSymbol');
        expect(useElement.childElementCount).toBe(0);
      });

      it('should generate sprited SVG', () => {
        component.type = ICON_TYPE.CART;
        fixture.detectChanges();

        expect(nativeDebugElement.childElementCount).toBe(1);

        const svgElement = nativeDebugElement.children[0];
        expect(svgElement.nodeName).toBe('svg');
        expect(svgElement.attributes.length).toBe(0);
        expect(svgElement.childElementCount).toBe(1);

        const useElement = svgElement.children[0];
        expect(useElement.nodeName).toBe('use');
        expect(useElement.attributes.length).toBe(1);
        expect(useElement.getAttribute('xlink:href')).toBe(
          './assets/sprite.svg#cartSymbol'
        );
        expect(useElement.childElementCount).toBe(0);
      });

      it('should generate a sprited SVG with a sanitized javascript: url', () => {
        component.type = 'BAD_SVG';
        fixture.detectChanges();

        expect(nativeDebugElement.childElementCount).toBe(1);

        const svgElement = nativeDebugElement.children[0];
        expect(svgElement.nodeName).toBe('svg');
        expect(svgElement.attributes.length).toBe(0);
        expect(svgElement.childElementCount).toBe(1);

        const useElement = svgElement.children[0];
        expect(useElement.nodeName).toBe('use');
        expect(useElement.attributes.length).toBe(1);
        expect(useElement.getAttribute('xlink:href')).toBe(
          'unsafe:javascript:alert(1)#<img src="." onerror="alert(5)">'
        );
        expect(useElement.childElementCount).toBe(0);
      });
    });

    describe('TEXT icons', () => {
      it('should contain a font symbol', () => {
        component.type = 'HAPPY';
        fixture.detectChanges();

        expect(nativeDebugElement.textContent).toBe('😊');
        expect(nativeDebugElement.childElementCount).toBe(0);

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toBe(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('😊');
        expect(hostClassList).not.toContain('HAPPY');
      });

      it('should contain a text', () => {
        component.type = 'SAD';
        fixture.detectChanges();

        expect(nativeDebugElement.textContent).toBe(':-(');
        expect(nativeDebugElement.childElementCount).toBe(0);

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toBe(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain(':-(');
        expect(hostClassList).not.toContain('SAD');
      });

      it('should not contain dangerous child elements', () => {
        component.type = 'BAD_TEXT';
        fixture.detectChanges();

        expect(nativeDebugElement.textContent).toBe(
          '<img src="." onerror="alert(4)">'
        );
        expect(nativeDebugElement.childElementCount).toBe(0);

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toBe(4);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('<img');
        expect(hostClassList).toContain('src="."');
        expect(hostClassList).toContain('onerror="alert(4)">');
      });
    });

    describe('LINK icons', () => {
      it('should add multiple CSS classes to host element and add stylesheet', () => {
        component.type = ICON_TYPE.VISA;
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toBe(3);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('fab');
        expect(hostClassList).toContain('fa-cc-visa');
        expect(nativeDebugElement.children.length).toBe(0);
        const styleSheetLinkElement = winRef.document.head.lastElementChild;
        expect(styleSheetLinkElement).not.toBeNull();
        expect(styleSheetLinkElement?.localName).toBe('link');
        expect(styleSheetLinkElement?.nodeName).toBe('LINK');
        expect(styleSheetLinkElement?.attributes.length).toBe(3);
        expect(styleSheetLinkElement?.getAttribute('rel')).toBe('stylesheet');
        expect(styleSheetLinkElement?.getAttribute('type')).toBe('text/css');
        expect(styleSheetLinkElement?.getAttribute('href')).toBe(
          'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
        );
        expect(styleSheetLinkElement?.childElementCount).toBe(0);
      });

      it('should remove former CSS classes when changing the icon type and add same stylesheet only once', () => {
        component.type = ICON_TYPE.AMEX;
        fixture.detectChanges();

        const hostClassList1 = nativeDebugElement.classList;
        expect(hostClassList1.length).toBe(3);
        expect(hostClassList1).toContain('cx-icon');
        expect(hostClassList1).toContain('fa-amex');
        expect(hostClassList1).toContain('fab');
        expect(hostClassList1).not.toContain('fas');
        expect(hostClassList1).not.toContain('fa-search');
        expect(nativeDebugElement.children.length).toBe(0);
        const styleSheetLinkElement1 = winRef.document.head.lastElementChild;

        component.type = ICON_TYPE.SEARCH;
        fixture.detectChanges();

        const hostClassList2 = nativeDebugElement.classList;
        expect(hostClassList2.length).toBe(3);
        expect(hostClassList2).toContain('cx-icon');
        expect(hostClassList2).toContain('fas');
        expect(hostClassList2).toContain('fa-search');
        expect(hostClassList2).not.toContain('fa-amex');
        expect(hostClassList2).not.toContain('fab');
        expect(nativeDebugElement.children.length).toBe(0);
        const styleSheetLinkElement2 = winRef.document.head.lastElementChild;

        expect(styleSheetLinkElement2).toBe(styleSheetLinkElement1);
        expect(styleSheetLinkElement2).not.toBeNull();
        expect(styleSheetLinkElement2?.localName).toBe('link');
        expect(styleSheetLinkElement2?.nodeName).toBe('LINK');
        expect(styleSheetLinkElement2?.attributes.length).toBe(3);
        expect(styleSheetLinkElement2?.getAttribute('rel')).toBe('stylesheet');
        expect(styleSheetLinkElement2?.getAttribute('type')).toBe('text/css');
        expect(styleSheetLinkElement2?.getAttribute('href')).toBe(
          'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
        );
        expect(styleSheetLinkElement2?.childElementCount).toBe(0);
      });

      it('should have flip-at-rtl class', () => {
        component.type = 'CARET_RIGHT';
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toBe(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('flip-at-rtl');
        expect(hostClassList).not.toContain('flip-at-ltr');
        expect(nativeDebugElement.children.length).toBe(0);
      });

      it('should have flip-at-ltr class', () => {
        component.type = 'CARET_LEFT';
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toBe(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('flip-at-ltr');
        expect(hostClassList).not.toContain('flip-at-rtl');
        expect(nativeDebugElement.children.length).toBe(0);
      });

      it('should change flip direction when changing the icon type and add same stylesheet', () => {
        component.type = 'LEFT';
        fixture.detectChanges();

        const hostClassList1 = nativeDebugElement.classList;
        expect(hostClassList1.length).toBe(4);
        expect(hostClassList1).toContain('cx-icon');
        expect(hostClassList1).toContain('someLeft');
        expect(hostClassList1).toContain('otherLeft');
        expect(hostClassList1).toContain('flip-at-ltr');
        expect(nativeDebugElement.children.length).toBe(0);
        const styleSheetLinkElement1 = winRef.document.head.lastElementChild;

        component.type = 'RIGHT';
        fixture.detectChanges();

        const hostClassList2 = nativeDebugElement.classList;
        expect(hostClassList2.length).toBe(4);
        expect(hostClassList2).toContain('cx-icon');
        expect(hostClassList2).toContain('someRight');
        expect(hostClassList2).toContain('otherRight');
        expect(hostClassList2).toContain('flip-at-rtl');
        expect(nativeDebugElement.children.length).toBe(0);
        const styleSheetLinkElement2 = winRef.document.head.lastElementChild;

        component.type = 'PAYPAL';
        fixture.detectChanges();

        const hostClassList3 = nativeDebugElement.classList;
        expect(hostClassList3.length).toBe(3);
        expect(hostClassList3).toContain('cx-icon');
        expect(hostClassList3).toContain('fab');
        expect(hostClassList3).toContain('fa-paypal');
        expect(hostClassList3).not.toContain('flip-at-rtl');
        expect(hostClassList3).not.toContain('flip-at-ltr');
        expect(nativeDebugElement.children.length).toBe(0);
        const styleSheetLinkElement3 = winRef.document.head.lastElementChild;

        expect(styleSheetLinkElement3).toBe(styleSheetLinkElement1);
        expect(styleSheetLinkElement3).toBe(styleSheetLinkElement2);
        expect(styleSheetLinkElement3).not.toBeNull();
        expect(styleSheetLinkElement3?.localName).toBe('link');
        expect(styleSheetLinkElement3?.nodeName).toBe('LINK');
        expect(styleSheetLinkElement3?.attributes.length).toBe(3);
        expect(styleSheetLinkElement3?.getAttribute('rel')).toBe('stylesheet');
        expect(styleSheetLinkElement3?.getAttribute('type')).toBe('text/css');
        expect(styleSheetLinkElement3?.getAttribute('href')).toBe(
          'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
        );
        expect(styleSheetLinkElement3?.childElementCount).toBe(0);
      });

      it('should generate safe class attribute for bogus classes', () => {
        component.type = 'BAD_CLASS';
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        expect(nativeDebugElement.getAttribute('class')).toBeTruthy();
        expect(nativeDebugElement.getAttribute('onmouseover')).toBeNull();
        expect(nativeDebugElement.getAttribute('data-foo')).toBeNull();
        expect(hostClassList.length).toBe(4);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('"');
        expect(hostClassList).toContain('onmouseover="alert(0)"');
        expect(hostClassList).toContain('data-foo="');
        expect(nativeDebugElement.children.length).toBe(0);
      });

      it('should generate safe stylesheet link with sanitized URL', () => {
        component.type = 'BAD_STYLESHEET';
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toBe(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('badStylesheet');
        expect(nativeDebugElement.children.length).toBe(0);
        const styleSheetLinkElement = winRef.document.head.lastElementChild;
        expect(styleSheetLinkElement).not.toBeNull();
        expect(styleSheetLinkElement?.localName).toBe('link');
        expect(styleSheetLinkElement?.nodeName).toBe('LINK');
        expect(styleSheetLinkElement?.attributes.length).toBe(3);
        expect(styleSheetLinkElement?.getAttribute('rel')).toBe('stylesheet');
        expect(styleSheetLinkElement?.getAttribute('type')).toBe('text/css');
        expect(styleSheetLinkElement?.getAttribute('href')).toBe(
          'unsafe:javascript:alert(2)'
        );
        expect(styleSheetLinkElement?.childElementCount).toBe(0);
      });
    });
  });
});

describe('host icon components', () => {
  let hostComponent: MockIconTestComponent;
  let service: IconLoaderService;
  let fixture: ComponentFixture<MockIconTestComponent>;
  let debugElement: DebugElement;
  let winRef: WindowRef;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IconModule],
        declarations: [MockIconTestComponent],
        providers: [
          { provide: IconConfig, useValue: MockIconConfig },
          { provide: IconLoaderService, useClass: IconLoaderService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    winRef = TestBed.inject(WindowRef);
    service = TestBed.inject(IconLoaderService);
    spyOn(service, 'addLinkResource').and.callThrough();

    fixture = TestBed.createComponent(MockIconTestComponent);
    hostComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(hostComponent).toBeTruthy();
  });

  describe('icons', () => {
    it('should add resource for all icons', () => {
      // it's actually just 4 icons, but due to a name clash between the type attribute
      // of cxIcon and button setIcon gets called twice for one of them
      expect(service.addLinkResource).toHaveBeenCalledTimes(5);
    });

    it('should add the symbol classes for the icon component classlist', () => {
      const hostElement = debugElement.query(By.css('cx-icon'));
      const hostNativeElement = hostElement.nativeElement;

      const hostClassList = hostNativeElement.classList;
      expect(hostClassList.length).toBe(3);
      expect(hostClassList).toContain('cx-icon');
      expect(hostClassList).toContain('fab');
      expect(hostClassList).toContain('fa-cc-visa');
      expect(hostNativeElement.childElementCount).toBe(0);
      expect(hostNativeElement.textContent).toBe('projected content');
    });

    it('should add the symbol classes to a button with cxIcon attribute', () => {
      const hostElement = debugElement.query(By.css('button'));
      const hostNativeElement = hostElement.nativeElement;

      expect(hostNativeElement.getAttribute('name')).toBe('test');
      expect(hostNativeElement.getAttribute('type')).toBe('submit');
      expect(hostNativeElement.getAttribute('cxIcon')).toBe('CART');
      expect(hostNativeElement.getAttribute('class')).toBeTruthy();

      const hostClassList = hostNativeElement.classList;
      expect(hostClassList.length).toBe(2);
      expect(hostClassList).toContain('cx-icon');
      expect(hostClassList).toContain('cartSymbol');

      expect(hostNativeElement.textContent).toBe('');
      expect(hostNativeElement.childElementCount).toBe(1);
      const svgElement = hostNativeElement.children[0];
      expect(svgElement.nodeName).toBe('svg');
      expect(svgElement.attributes.length).toBe(0);
      expect(svgElement.childElementCount).toBe(1);
      const useElement = svgElement.children[0];
      expect(useElement.nodeName).toBe('use');
      expect(useElement.attributes.length).toBe(1);
      expect(useElement.getAttribute('xlink:href')).toBe(
        './assets/sprite.svg#cartSymbol'
      );
      expect(useElement.childElementCount).toBe(0);
    });

    it('should use type attribute as an input for cxIcon directive', () => {
      const hostElement = debugElement.query(By.css('div'));
      const hostNativeElement = hostElement.nativeElement;

      const hostClassList = hostNativeElement.classList;
      expect(hostClassList.length).toBe(3);
      expect(hostClassList).toContain('cx-icon');
      expect(hostClassList).toContain('😊');
      expect(hostClassList).toContain('hostClass');

      expect(hostNativeElement.textContent).toBe('😊more content');
      expect(hostNativeElement.childElementCount).toBe(1);
      const emElement = hostNativeElement.children[0];
      expect(emElement.localName).toBe('em');
      expect(emElement.attributes.length).toBe(0);
      expect(emElement.childElementCount).toBe(0);
      expect(emElement.textContent).toBe('content');
    });

    it('should retain existing classes on the host element', () => {
      const hostElement = debugElement.query(By.css('p'));
      const hostNativeElement = hostElement.nativeElement;

      const hostClassList = hostNativeElement.classList;
      expect(hostClassList.length).toBe(8);
      expect(hostClassList).toContain('cx-icon');
      expect(hostClassList).toContain('original');
      expect(hostClassList).toContain('and');
      expect(hostClassList).toContain('another');
      expect(hostClassList).toContain('one');
      expect(hostClassList).toContain('someLeft');
      expect(hostClassList).toContain('otherLeft');
      expect(hostClassList).toContain('flip-at-ltr');
    });

    it('should add LINK icon stylesheet', () => {
      const styleSheetLinkElement = winRef.document.head.lastElementChild;

      expect(styleSheetLinkElement).not.toBeNull();
      expect(styleSheetLinkElement?.localName).toBe('link');
      expect(styleSheetLinkElement?.nodeName).toBe('LINK');
      expect(styleSheetLinkElement?.attributes.length).toBe(3);
      expect(styleSheetLinkElement?.getAttribute('rel')).toBe('stylesheet');
      expect(styleSheetLinkElement?.getAttribute('type')).toBe('text/css');
      expect(styleSheetLinkElement?.getAttribute('href')).toBe(
        'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
      );
      expect(styleSheetLinkElement?.childElementCount).toBe(0);
    });
  });
});
