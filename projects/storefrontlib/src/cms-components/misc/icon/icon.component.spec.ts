import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from './icon-loader.service';
import { ICON_TYPE } from './icon.model';
import { IconModule } from './icon.module';

@Component({
  selector: 'cx-icon-test',
  template: '<cx-icon type="CART"></cx-icon>',
})
class MockIconTestComponent {}

@Component({
  selector: 'cx-icon-test-small',
  template: '<cx-icon type="CART" class="small"></cx-icon>',
})
class MockIconSmallTestComponent {}

class MockIconFontLoaderService {
  useSvg(_iconType: ICON_TYPE) {
    return false;
  }
  getStyleClasses(_iconType: ICON_TYPE): string {
    return 'fas fa-shopping-cart';
  }
  addLinkResource() {}
}

class MockSvgIconLoaderService {
  useSvg(_iconType: ICON_TYPE) {
    return true;
  }

  getSvgPath(_type: ICON_TYPE): string {
    return 'icon/path.svg#cart';
  }
  addLinkResource() {}
}

describe('IconComponent', () => {
  let component: MockIconTestComponent;
  let fixture: ComponentFixture<MockIconTestComponent>;

  describe('font based icons', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [IconModule],
        declarations: [MockIconTestComponent],
        providers: [
          { provide: IconLoaderService, useClass: MockIconFontLoaderService },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(MockIconTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should not render an inline svg object', () => {
      const debugElement = fixture.debugElement;
      const element = debugElement.query(By.css('svg'));
      expect(element).toBeFalsy();
    });

    it('should render the symbol classes in the classlist', () => {
      const debugElement = fixture.debugElement;
      const element = debugElement.query(By.css('cx-icon'));
      expect(element.nativeElement.classList).toContain('fas');
      expect(element.nativeElement.classList).toContain('fa-shopping-cart');
    });
  });

  describe('Small icons', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [IconModule],
        declarations: [MockIconSmallTestComponent],
        providers: [
          { provide: IconLoaderService, useClass: MockIconFontLoaderService },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(MockIconSmallTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should render remain the small style class', () => {
      const debugElement = fixture.debugElement;
      const element = debugElement.query(By.css('cx-icon'));
      expect(element.nativeElement.classList).toContain('small');
      expect(element.nativeElement.classList).toContain('fa-shopping-cart');
    });
  });

  describe('SVG based icons', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [IconModule],
        declarations: [MockIconTestComponent],
        providers: [
          { provide: IconLoaderService, useClass: MockSvgIconLoaderService },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(MockIconTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should render an inline svg object', () => {
      const debugElement = fixture.debugElement;
      const element = debugElement.query(By.css('svg'));
      expect(element).toBeTruthy();
    });

    it('should render an svg element that uses a link to an external SVG file', () => {
      const debugElement = fixture.debugElement;
      const element = debugElement.query(By.css('svg use'));
      expect(element.nativeElement.attributes['xlink:href'].value).toBe(
        'icon/path.svg#cart'
      );
    });
  });
});
