import { Component, DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
import { IconModule } from './icon.module';
import { ICON_TYPE, IconConfig, IconResourceType } from './icon.model';
import { IconLoaderService } from './icon-loader.service';
import { IconComponent } from './icon.component';
import { MockIconConfig } from './icon-loader.service.spec';

@Component({
  selector: 'cx-icon-test',
  template: `
    <cx-icon type="VISA"></cx-icon>
    <button cxIcon="VISA"></button>
    <div cxIcon type="VISA"></div>
    <p class="original" cxIcon="VISA"></p>
  `,
})
class MockIconTestComponent {}

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;
  let service: IconLoaderService;
  let winRef: WindowRef;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [IconComponent],
        providers: [
          { provide: IconConfig, useValue: MockIconConfig },
          { provide: IconLoaderService, useClass: IconLoaderService }
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(IconLoaderService);
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
      expect(component.icon).toEqual('😊');
    });

    it('should create an icon based on cxIcon input', () => {
      expect(component.icon).toBeFalsy();
      component.cxIcon = 'HAPPY';
      expect(component.icon).toEqual('😊');
    });

    it('should create an icon based multiple inputs', () => {
      expect(component.icon).toBeFalsy();
      component.type = ICON_TYPE.CART;
      component.cxIcon = 'HAPPY';
      expect(component.icon).toEqual('😊');
    });

    it('should not create an icon for null value', () => {
      component.type = null;
      expect(component.icon).toBeFalsy();
    });

    it('should not create an icon for \'\' value', () => {
      component.type = <any>'';
      expect(component.icon).toBeFalsy();
    });

    it('should not have a flip direction by default', () => {
      component.type = <any>'';
      expect(component.flipAtLtr).toBeFalsy();
      expect(component.flipAtRtl).toBeFalsy();
    });

    it('should store the flip direction for the given icon', () => {
      component.type = 'CARET_RIGHT';
      expect(component.flipAtRtl).toBeTruthy();
      expect(component.flipAtLtr).toBeFalsy();
    });
  });

  describe('linked resources', () => {

    it('should call findResource', () => {
      spyOn(service, 'findResource').and.callThrough();
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      expect(service.findResource).toHaveBeenCalled();
    });

    it('should add the font resource', () => {
      spyOn(service, 'isResourceType').and.callThrough();
      spyOn(service, 'findResource').and.callThrough();
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      component.type = 'PAYPAL';
      fixture.detectChanges();
      expect(service.findResource).toHaveBeenCalledWith('PAYPAL', IconResourceType.LINK);
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
        expect(hostClassList.length).toEqual(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('infoSymbol');
      });

      it('should not have flip-at-ltr and flip-at-rtl class', () => {
        component.type = ICON_TYPE.CART;
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toEqual(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('cartSymbol');
        expect(hostClassList).not.toContain('flip-at-rtl');
        expect(hostClassList).not.toContain('flip-at-ltr');
      });

      it('should generate non-sprited SVG', () => {
        component.type = ICON_TYPE.INFO;
        fixture.detectChanges();

        expect(nativeDebugElement.childElementCount).toEqual(1);

        const svgElement = nativeDebugElement.children[0];
        expect(svgElement.nodeName).toEqual('svg');
        expect(svgElement.attributes.length).toEqual(0);
        expect(svgElement.childElementCount).toEqual(1);

        const useElement = svgElement.children[0];
        expect(useElement.nodeName).toEqual('use');
        expect(useElement.attributes.length).toEqual(1);
        expect(useElement.getAttribute('xlink:href')).toEqual('#infoSymbol');
        expect(useElement.childElementCount).toEqual(0);
      });

      it('should generate sprited SVG', () => {
       component.type = ICON_TYPE.CART;
        fixture.detectChanges();

        expect(nativeDebugElement.childElementCount).toEqual(1);

        const svgElement = nativeDebugElement.children[0];
        expect(svgElement.nodeName).toEqual('svg');
        expect(svgElement.attributes.length).toEqual(0);
        expect(svgElement.childElementCount).toEqual(1);

        const useElement = svgElement.children[0];
        expect(useElement.nodeName).toEqual('use');
        expect(useElement.attributes.length).toEqual(1);
        expect(useElement.getAttribute('xlink:href')).toEqual('./assets/sprite.svg#cartSymbol');
        expect(useElement.childElementCount).toEqual(0);
      });

      it('should generate a sprited SVG with a sanitized javascript: url', () => {
        component.type = 'BAD_SVG';
        fixture.detectChanges();

        expect(nativeDebugElement.childElementCount).toEqual(1);

        const svgElement = nativeDebugElement.children[0];
        expect(svgElement.nodeName).toEqual('svg');
        expect(svgElement.attributes.length).toEqual(0);
        expect(svgElement.childElementCount).toEqual(1);

        const useElement = svgElement.children[0];
        expect(useElement.nodeName).toEqual('use');
        expect(useElement.attributes.length).toEqual(1);
        expect(useElement.getAttribute('xlink:href')).toEqual('unsafe:javascript:alert(1)#badSvg');
        expect(useElement.childElementCount).toEqual(0);
      });
    });

    describe('TEXT icons', () => {

      it('should contain font symbol', () => {
        component.type = 'HAPPY';
        fixture.detectChanges();

        expect(nativeDebugElement.textContent).toEqual('😊');
        expect(nativeDebugElement.childElementCount).toEqual(0);

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toEqual(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('😊');
        expect(hostClassList).not.toContain('HAPPY');
      });

      it('should generate a text', () => {
        // XXX what is the difference between a text icon and a font icon?
        component.type = 'HAPPY';
        fixture.detectChanges();

        expect(nativeDebugElement.textContent).toEqual('😊');
        expect(nativeDebugElement.childElementCount).toEqual(0);

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toEqual(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('😊');
        expect(hostClassList).not.toContain('HAPPY');
      });
    });

    describe('LINK icons', () => {

      it('should add multiple CSS classes to host element and be empty', () => {
        component.type = ICON_TYPE.VISA;
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        expect(hostClassList.length).toEqual(3);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('fab');
        expect(hostClassList).toContain('fa-cc-visa');

        expect(nativeDebugElement.children.length).toEqual(0);
      });

      it('should remove former CSS classes when changing the icon type', () => {
        component.type = ICON_TYPE.AMEX;
        fixture.detectChanges();

        const hostClassList1 = nativeDebugElement.classList;
        const hostChildren1 = nativeDebugElement.children;
        expect(hostClassList1.length).toEqual(3);
        expect(hostClassList1).toContain('cx-icon');
        expect(hostClassList1).toContain('fa-amex');
        expect(hostClassList1).toContain('fab');
        expect(hostClassList1).not.toContain('fas'); 
        expect(hostClassList1).not.toContain('fa-search');
        expect(hostChildren1.length).toEqual(0);

        component.type = ICON_TYPE.SEARCH;
        fixture.detectChanges();

        const hostClassList2 = nativeDebugElement.classList;
        const hostChildren2 = nativeDebugElement.children;
        expect(hostClassList2.length).toEqual(3);
        expect(hostClassList2).toContain('cx-icon');
        expect(hostClassList2).toContain('fas'); 
        expect(hostClassList2).toContain('fa-search');
        expect(hostClassList2).not.toContain('fa-amex');
        expect(hostClassList2).not.toContain('fab');
        expect(hostChildren2.length).toEqual(0);
      });

      it('should have flip-at-rtl class', () => {
        component.type = 'CARET_RIGHT';
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        const hostChildren = nativeDebugElement.children;
        expect(hostClassList.length).toEqual(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('flip-at-rtl');
        expect(hostClassList).not.toContain('flip-at-ltr');
        expect(hostChildren.length).toEqual(0);
      });

      it('should have flip-at-ltr class', () => {
        component.type = 'CARET_LEFT';
        fixture.detectChanges();

        const hostClassList = nativeDebugElement.classList;
        const hostChildren = nativeDebugElement.children;
        expect(hostClassList.length).toEqual(2);
        expect(hostClassList).toContain('cx-icon');
        expect(hostClassList).toContain('flip-at-rtl');
        expect(hostClassList).not.toContain('flip-at-ltr');
        expect(hostChildren.length).toEqual(0);
      });
    });

    // TODO test XSS attack payload in css classes

    // TODO check interactions between LTR/RTL classes, icon style classes, and original host element classes
  });
});

describe('host icon components', () => {
  let hostComponent: MockIconTestComponent;
  let service: IconLoaderService;
  let fixture: ComponentFixture<MockIconTestComponent>;
  let debugElement;

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
    fixture = TestBed.createComponent(IconComponent);
    service = TestBed.inject(IconLoaderService);

    spyOn(service, 'findResource').and.callThrough();
    fixture = TestBed.createComponent(MockIconTestComponent);
    hostComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(hostComponent).toBeTruthy();
  });

  describe('font based icons', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should not render an inline svg object', () => {
      const element = debugElement.query(By.css('svg'));
      expect(element).toBeFalsy();
    });

    it('should add resource for all icons (4 times)', () => {
      expect(service.findResource).toHaveBeenCalledTimes(4);
    });

    it('should add the symbol classes for the icon component classlist', () => {
      const element = debugElement.query(By.css('cx-icon'));
      expect(element.nativeElement.classList.length).toEqual(3);
      expect(element.nativeElement.classList).toContain('cx-icon');
      expect(element.nativeElement.classList).toContain('fab');
      expect(element.nativeElement.classList).toContain('fa-cc-visa');
    });

    it('should add the symbol classes to a button with cxIcon attribute', () => {
      const element = debugElement.query(By.css('button'));
      expect(element.nativeElement.classList.length).toEqual(3);
      expect(element.nativeElement.classList).toContain('cx-icon');
      expect(element.nativeElement.classList).toContain('fab');
      expect(element.nativeElement.classList).toContain('fa-cc-visa');
    });

    it('should use type attribute as an input for cxIcon directive', () => {
      const element = debugElement.query(By.css('div'));
      expect(element.nativeElement.classList.length).toEqual(3);
      expect(element.nativeElement.classList).toContain('cx-icon');
      expect(element.nativeElement.classList).toContain('fab');
      expect(element.nativeElement.classList).toContain('fa-cc-visa');
    });

    it('should remain existing classes on the host element', () => {
      const element = debugElement.query(By.css('p'));
      expect(element.nativeElement.classList.length).toEqual(4);
      expect(element.nativeElement.classList).toContain('cx-icon');
      expect(element.nativeElement.classList).toContain('fab');
      expect(element.nativeElement.classList).toContain('fa-cc-visa');
      expect(element.nativeElement.classList).toContain('original');
    });

      // TODO check icon component with projection, that is nested elements
  });
});
