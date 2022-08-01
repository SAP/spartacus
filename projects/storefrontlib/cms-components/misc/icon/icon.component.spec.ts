import { Component, DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DirectionMode } from '../../../layout/direction/config/direction.model';
import { IconLoaderService } from './icon-loader.service';
import { IconComponent } from './icon.component';
import { ICON_TYPE, IconResourceType } from './icon.model';
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

export class MockIconLoaderService {

  getStyleClasses(iconType: ICON_TYPE) {
    return iconType;
  }

  isResourceType(iconType: ICON_TYPE | string, resourceType: IconResourceType): boolean {
    if (iconType === ICON_TYPE.STAR && resourceType === IconResourceType.SVG) {
        return true;
    };
    if (iconType === ICON_TYPE.EXPAND && resourceType === IconResourceType.LINK) {
        return true;
    };
    if (iconType === ICON_TYPE.COLLAPSE && resourceType === IconResourceType.LINK) {
        return true;
    };
    if (iconType === ICON_TYPE.CART && resourceType === IconResourceType.TEXT) {
        return true;
    };
    if (iconType === ICON_TYPE.VISA && resourceType === IconResourceType.TEXT) {
        return true;
    };
    if (iconType === ICON_TYPE.AMEX && resourceType === IconResourceType.TEXT) {
        return true;
    };
    if (iconType === 'HAPPY' && resourceType === IconResourceType.TEXT) {
        return true;
    };
    return false;
  }

  getSvgPath() {
    return null;
  }

  getSymbol() {
    return null;
  }

  addLinkResource() {}

  getFlipDirection() {
    return;
  }
}

fdescribe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let service: IconLoaderService;

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
    spyOn(service, 'addLinkResource').and.callThrough();
  });

  describe('controller', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should not have a default icon', () => {
      expect(component.icon).toBeFalsy();
    });

    it('should create an icon based on type input', () => {
      spyOn(service, 'getSymbol').and.returnValue('CART');
      expect(component.icon).toBeFalsy();
      component.type = ICON_TYPE.CART;
      expect(component.icon).toEqual('CART');
    });

    it('should create an icon based on cxIcon input', () => {
      spyOn(service, 'getSymbol').and.returnValue('AMEX');
      expect(component.icon).toBeFalsy();
      component.cxIcon = ICON_TYPE.AMEX;
      expect(component.icon).toEqual('AMEX');
    });

    it('should create an icon based multiple inputs', () => {
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
      component.type = <any>'';
      expect(component.flipAtLtr).toBeFalsy();
      expect(component.flipAtRtl).toBeFalsy();
    });

    it(`should store the flip direction for the given icon`, () => {
      spyOn(service, 'getFlipDirection').and.returnValue(DirectionMode.RTL);
      component.type = ICON_TYPE.CART;
      expect(component.flipAtRtl).toBeTruthy();
      expect(component.flipAtLtr).toBeFalsy();
    });
  });

  describe('UI tests', () => {
    let debugElement: DebugElement;

    beforeEach(() => {
      debugElement = fixture.debugElement;
    });

    it('should add CSS class to host element', () => {
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).toContain('cx-icon');
      expect(classList).toContain('CART');
    });

    it('should add multiple CSS classes to host element', () => {
      spyOn(service, 'getStyleClasses').and.returnValue('multiple classes');
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).toContain('cx-icon');
      expect(classList).toContain('multiple');
      expect(classList).toContain('classes');
    });

    it('should call addLinkResource', () => {
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      expect(service.addLinkResource).toHaveBeenCalled();
    });

    it('should remove former CSS classes when changing the icon type', () => {
      component.type = ICON_TYPE.EXPAND;
      component.type = ICON_TYPE.COLLAPSE;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).toContain('cx-icon');
      expect(classList).not.toContain('EXPAND');
      expect(classList).toContain('COLLAPSE');
    });

    it('should have flip-at-rtl class', () => {
      spyOn(service, 'getFlipDirection').and.returnValue(DirectionMode.RTL);
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).not.toContain('flip-at-ltr');
      expect(classList).toContain('flip-at-rtl');
    });

    it('should have flip-at-ltr class', () => {
      spyOn(service, 'getFlipDirection').and.returnValue(DirectionMode.LTR);
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).not.toContain('flip-at-rtl');
      expect(classList).toContain('flip-at-ltr');
    });

    it('should not have flip-at-ltr and flip-at-rtl class', () => {
      spyOn(service, 'getFlipDirection').and.returnValue(undefined);
      component.type = ICON_TYPE.CART;
      fixture.detectChanges();
      const classList = (debugElement.nativeElement as HTMLElement).classList;
      expect(classList).not.toContain('flip-at-rtl');
      expect(classList).not.toContain('flip-at-ltr');
    });

    it('should generate a font icon', () => {
      spyOn(service, 'getSymbol').and.returnValue('😊');
      component.type = 'HAPPY';
      fixture.detectChanges();
      const element = (debugElement.nativeElement as HTMLElement);
      expect(element.textContent).toEqual('😊');
      expect(element.childElementCount).toEqual(0);
    });

    it('should generate a text icon', () => {
      spyOn(service, 'getSymbol').and.returnValue('visa');
      component.type = ICON_TYPE.VISA;
      fixture.detectChanges();
      const element = (debugElement.nativeElement as HTMLElement);
      expect(element.textContent).toEqual('visa');
      expect(element.childElementCount).toEqual(0);
    });

    it('should generate a sprited SVG', () => {
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

fdescribe('host icon components', () => {
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

    spyOn(service, 'getStyleClasses').and.returnValue('font based');
    spyOn(service, 'addLinkResource').and.callThrough();
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
      expect(service.addLinkResource).toHaveBeenCalledTimes(4);
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
