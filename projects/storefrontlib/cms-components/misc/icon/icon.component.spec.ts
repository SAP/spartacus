import { Component, DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
import { DirectionMode } from '../../../layout/direction/config/direction.model';
import { IconLoaderService } from './icon-loader.service';
import { IconComponent } from './icon.component';
import { ICON_TYPE, IconResourceType, IconConfigResource } from './icon.model';
import { IconModule } from './icon.module';

@Component({
  selector: 'cx-icon-test',
  template: `
    <cx-icon type="CART"></cx-icon>
    <button cxIcon="CART"></button>
    <div cxIcon type="CART"></div>
    <p class="original" cxIcon="CART"></p>
  `,
})
class MockIconTestComponent {}

export class MockIconConfigResource implements IconConfigResource {

    constructor(
        public types: string[] | undefined,
        public url: string | undefined,
        public type: string) {}
}

export class MockIconLoaderService {

  getStyleClasses(iconType: ICON_TYPE) {
    return iconType;
  }

  isResourceType() {}

  getSvgPath() {
    return null;
  }

  getSymbol() {
    return null;
  }

  getFlipDirection() {}

  findResource() {}
}

function createIsResourceTypeFake(
    fakeIconType: ICON_TYPE | string,
    fakeResourceType: IconResourceType): (iconType: string, resourceType: IconResourceType) => boolean {
  return (iconType: ICON_TYPE | string, resourceType: IconResourceType) => {
        return iconType === fakeIconType && resourceType === fakeResourceType;
      };
}

function createIsResourceTypeFakeForTypes(
    fakeIconTypes: Array<ICON_TYPE | string>,
    fakeResourceType: IconResourceType): (iconType: string, resourceType: IconResourceType) => boolean {
  return (iconType: ICON_TYPE | string, resourceType: IconResourceType) => {
        return fakeIconTypes.includes(iconType) && resourceType === fakeResourceType;
      };
}

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let service: IconLoaderService;
  let winRef: WindowRef;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [IconComponent],
        providers: [
          { provide: IconLoaderService, useClass: MockIconLoaderService },
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
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.CART,IconResourceType.TEXT));
      spyOn(service, 'getSymbol').and.returnValue('CART');
      expect(component.icon).toBeFalsy();
      component.type = ICON_TYPE.CART;
      expect(component.icon).toEqual('CART');
    });

    it('should create an icon based on cxIcon input', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake('AMEX',IconResourceType.TEXT));
      spyOn(service, 'getSymbol').and.returnValue('AMEX');
      expect(component.icon).toBeFalsy();
      component.cxIcon = ICON_TYPE.AMEX;
      expect(component.icon).toEqual('AMEX');
    });

    it('should create an icon based multiple inputs', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake('AMEX',IconResourceType.TEXT));
      spyOn(service, 'getSymbol').and.returnValue('AMEX');
      expect(component.icon).toBeFalsy();
      component.type = ICON_TYPE.CART;
      component.cxIcon = ICON_TYPE.AMEX;
      expect(component.icon).toEqual('AMEX');
    });

    it('should not create an icon for null value', () => {
      component.type = null;
      expect(component.icon).toBeFalsy();
    });

    it(`should not create an icon for '' value`, () => {
      component.type = <any>'';
      expect(component.icon).toBeFalsy();
    });

    it(`should not have a flip direction by default`, () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake('',IconResourceType.TEXT));
      component.type = <any>'';
      expect(component.flipAtLtr).toBeFalsy();
      expect(component.flipAtRtl).toBeFalsy();
    });

    it(`should store the flip direction for the given icon`, () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.CART,IconResourceType.TEXT));
      spyOn(service, 'getFlipDirection').and.returnValue(DirectionMode.RTL);
      component.type = ICON_TYPE.CART;
      expect(component.flipAtRtl).toBeTruthy();
      expect(component.flipAtLtr).toBeFalsy();
    });
  });

  describe('Linked resources', () => {
    it('should add the font resource', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.EXPAND,IconResourceType.LINK));
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      spyOn(service, 'findResource').and.returnValue(new MockIconConfigResource(['foo'], 'bar', 'baz'));
      component.type = ICON_TYPE.EXPAND;
      fixture.detectChanges();
      expect(service.findResource).toHaveBeenCalledWith(ICON_TYPE.EXPAND, IconResourceType.LINK);
      expect(winRef.document.createElement).toHaveBeenCalledWith('link');
    });

    it('should not add the font resource for the same font icon', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.EXPAND,IconResourceType.LINK));
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      spyOn(service, 'findResource').and.returnValue(new MockIconConfigResource(['foo'], 'bar', 'baz'));
      component.type = ICON_TYPE.EXPAND;
      component.type = ICON_TYPE.EXPAND;
      fixture.detectChanges();
      expect(service.findResource).toHaveBeenCalledWith(ICON_TYPE.EXPAND, IconResourceType.LINK);
      expect(winRef.document.createElement).toHaveBeenCalledTimes(1);
    });

    it('should not add the same font resource for fonts with the same font resource', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFakeForTypes([ICON_TYPE.EXPAND, 'PAYPAL'],IconResourceType.LINK));
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      spyOn(service, 'findResource').and.returnValue(new MockIconConfigResource(['foo'], 'bar', 'baz'));
      component.type = ICON_TYPE.EXPAND;
      fixture.detectChanges();
      expect(service.findResource).toHaveBeenCalledWith(ICON_TYPE.EXPAND, IconResourceType.LINK);
      component.type = 'PAYPAL';
      fixture.detectChanges();
      expect(service.findResource).toHaveBeenCalledWith('PAYPAL', IconResourceType.LINK);
      expect(winRef.document.createElement).toHaveBeenCalledTimes(1);
    });

    it('should add 2 fonts resources for the different fonts', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFakeForTypes([ICON_TYPE.EXPAND, 'MASTERCARD'],IconResourceType.LINK));
      spyOn<any>(winRef.document, 'createElement').and.callThrough();
      spyOn(service, 'findResource').and.returnValues(
        new MockIconConfigResource(['foo'], 'bar1', 'baz'),
        new MockIconConfigResource(['foo'], 'bar2', 'baz'),
        );
      component.type = ICON_TYPE.EXPAND;
      fixture.detectChanges();
      expect(service.findResource).toHaveBeenCalledWith(ICON_TYPE.EXPAND, IconResourceType.LINK);
      component.type = 'MASTERCARD';
      fixture.detectChanges();
      expect(service.findResource).toHaveBeenCalledWith('MASTERCARD', IconResourceType.LINK);
      expect(winRef.document.createElement).toHaveBeenCalledTimes(2);
    });
  });

  describe('UI tests', () => {
    let debugElement: DebugElement;

    beforeEach(() => {
      debugElement = fixture.debugElement;
    });

    it('should add CSS class to host element', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.CART,IconResourceType.TEXT));
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).toContain('cx-icon');
      expect(classList).toContain('CART');
    });

    it('should add multiple CSS classes to host element', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.CART,IconResourceType.TEXT));
      spyOn(service, 'getStyleClasses').and.returnValue('multiple classes');
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).toContain('cx-icon');
      expect(classList).toContain('multiple');
      expect(classList).toContain('classes');
    });

    it('should call findResource', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.CART,IconResourceType.TEXT));
      spyOn(service, 'findResource').and.returnValue(new MockIconConfigResource(['foo'], 'bar', 'baz'));
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      expect(service.findResource).toHaveBeenCalled();
    });

    it('should remove former CSS classes when changing the icon type', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFakeForTypes([ICON_TYPE.EXPAND, ICON_TYPE.COLLAPSE],IconResourceType.LINK));
      component.type = ICON_TYPE.EXPAND;
      component.type = ICON_TYPE.COLLAPSE;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).toContain('cx-icon');
      expect(classList).not.toContain('EXPAND');
      expect(classList).toContain('COLLAPSE');
    });

    it('should have flip-at-rtl class', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.CART,IconResourceType.TEXT));
      spyOn(service, 'getFlipDirection').and.returnValue(DirectionMode.RTL);
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).not.toContain('flip-at-ltr');
      expect(classList).toContain('flip-at-rtl');
    });

    it('should have flip-at-ltr class', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.CART,IconResourceType.TEXT));
      spyOn(service, 'getFlipDirection').and.returnValue(DirectionMode.LTR);
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).not.toContain('flip-at-rtl');
      expect(classList).toContain('flip-at-ltr');
    });

    it('should not have flip-at-ltr and flip-at-rtl class', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.CART,IconResourceType.TEXT));
      spyOn(service, 'getFlipDirection').and.returnValue(undefined);
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).not.toContain('flip-at-rtl');
      expect(classList).not.toContain('flip-at-ltr');
    });

    it('should generate a font icon', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake('HAPPY',IconResourceType.TEXT));
      spyOn(service, 'getSymbol').and.returnValue('😊');
      component.type = 'HAPPY';
      fixture.detectChanges();
      const element = (debugElement.nativeElement as HTMLElement);
      expect(element.textContent).toEqual('😊');
      expect(element.childElementCount).toEqual(0);
    });

    it('should generate a text icon', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.VISA,IconResourceType.TEXT));
      spyOn(service, 'getSymbol').and.returnValue('visa');
      component.type = ICON_TYPE.VISA;
      fixture.detectChanges();
      const element = (debugElement.nativeElement as HTMLElement);
      expect(element.textContent).toEqual('visa');
      expect(element.childElementCount).toEqual(0);
    });

    it('should generate a sprited SVG', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.STAR,IconResourceType.SVG));
      spyOn(service, 'getSvgPath').and.returnValue('./assets/sprite.svg#starSymbol');
      component.type = ICON_TYPE.STAR;
      fixture.detectChanges();
      const element = (debugElement.nativeElement as HTMLElement);
      expect(element.childElementCount).toEqual(1);
      const svgElement = element.children[0];
      expect(svgElement.nodeName).toEqual('svg');
      expect(svgElement.childElementCount).toEqual(1);
      const useElement = svgElement.children[0];
      expect(useElement.nodeName).toEqual('use');
      expect(useElement.getAttribute('xlink:href')).toEqual('./assets/sprite.svg#starSymbol');
    });

    it('should generate non-sprited SVG', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.STAR,IconResourceType.SVG));
      spyOn(service, 'getSvgPath').and.returnValue('#starSymbol');
      component.type = ICON_TYPE.STAR;
      fixture.detectChanges();
      const element = (debugElement.nativeElement as HTMLElement);
      expect(element.childElementCount).toEqual(1);
      const svgElement = element.children[0];
      expect(svgElement.nodeName).toEqual('svg');
      expect(svgElement.childElementCount).toEqual(1);
      const useElement = svgElement.children[0];
      expect(useElement.nodeName).toEqual('use');
      expect(useElement.getAttribute('xlink:href')).toEqual('#starSymbol');
    });

    it('should generate a sprited SVG with a sanitized javascript url', () => {
      spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.STAR,IconResourceType.SVG));
      spyOn(service, 'getSvgPath').and.returnValue('javascript:alert(1)');
      component.type = ICON_TYPE.STAR;
      fixture.detectChanges();
      const element = (debugElement.nativeElement as HTMLElement);
      expect(element.childElementCount).toEqual(1);
      const svgElement = element.children[0];
      expect(svgElement.nodeName).toEqual('svg');
      expect(svgElement.childElementCount).toEqual(1);
      const useElement = svgElement.children[0];
      expect(useElement.nodeName).toEqual('use');
      expect(useElement.getAttribute('xlink:href')).toEqual('unsafe:javascript:alert(1)');
    });
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
          { provide: IconLoaderService, useClass: MockIconLoaderService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    service = TestBed.inject(IconLoaderService);

    spyOn(service, 'isResourceType').and.callFake(createIsResourceTypeFake(ICON_TYPE.CART,IconResourceType.LINK));
    spyOn(service, 'getStyleClasses').and.returnValue('font based');
    spyOn(service, 'findResource').and.callThrough();
    fixture = TestBed.createComponent(MockIconTestComponent);
    hostComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(hostComponent).toBeTruthy();
  });

  describe('font based icons', () => {
    beforeEach(() => {
      fixture.detectChanges();
      debugElement = fixture.debugElement;
      service = TestBed.inject(IconLoaderService);
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
      expect(element.nativeElement.classList).toContain('font');
      expect(element.nativeElement.classList).toContain('based');
    });

    it('should add the symbol classes to a button with cxIcon attribute', () => {
      const element = debugElement.query(By.css('button'));
      expect(element.nativeElement.classList).toContain('cx-icon');
      expect(element.nativeElement.classList).toContain('font');
      expect(element.nativeElement.classList).toContain('based');
    });

    it('should use type attribute as an input for cxIcon directive', () => {
      const element = debugElement.query(By.css('div'));
      expect(element.nativeElement.classList).toContain('cx-icon');
      expect(element.nativeElement.classList).toContain('font');
      expect(element.nativeElement.classList).toContain('based');
    });

    it('should remain existing classes on the host element', () => {
      const element = debugElement.query(By.css('p'));
      expect(element.nativeElement.classList).toContain('cx-icon');
      expect(element.nativeElement.classList).toContain('font');
      expect(element.nativeElement.classList).toContain('based');
      expect(element.nativeElement.classList).toContain('original');
    });
  });
});
