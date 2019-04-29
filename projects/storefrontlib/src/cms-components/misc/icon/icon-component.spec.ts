import { Component, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconLoaderService } from './icon-loader.service';
import { IconModule } from './icon.module';

@Component({
  selector: 'cx-icon-test',
  template: '<cx-icon type="shopping-cart"></cx-icon>',
})
export class MockIconTestComponent {}

export class MockIconFontLoaderService {
  useSvg() {
    return false;
  }
  getStyleClasses(iconType) {
    return [iconType];
  }
}

export class MockSvgIconLoaderService {
  useSvg() {
    return true;
  }

  getSvgPath(type: string) {
    return 'icon/path.svg#' + type;
  }
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
          Renderer2,
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

    it('should render the icon type in the classlist', () => {
      const debugElement = fixture.debugElement;
      const element = debugElement.query(By.css('cx-icon'));
      expect(element.nativeElement.classList[0]).toEqual('shopping-cart');
    });
  });
});

describe('IconComponent', () => {
  let component: MockIconTestComponent;
  let fixture: ComponentFixture<MockIconTestComponent>;

  describe('SVG based icons', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [IconModule],
        declarations: [MockIconTestComponent],
        providers: [
          Renderer2,
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
        'icon/path.svg#shopping-cart'
      );
    });
  });
});
