import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HamburgerMenuService } from '../../../layout/header/hamburger-menu/hamburger-menu.service';
import { BehaviorSubject } from 'rxjs';
import { GenericLinkComponent } from './generic-link.component';

/**
 * Helper function to produce simple change for the `url` `@Input`
 */
function changeUrl(url: string | any[]): SimpleChanges {
  return {
    url: new SimpleChange(null, url, false),
  };
}

class MockHamburgerMenuService implements Partial<HamburgerMenuService> {
  toggle(): void {}
  isExpanded: BehaviorSubject<boolean> = new BehaviorSubject(true);
}

describe('GenericLinkComponent', () => {
  let component: GenericLinkComponent;
  let fixture: ComponentFixture<GenericLinkComponent>;
  let hamburgerMenuService: HamburgerMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [GenericLinkComponent],
      providers: [
        { provide: HamburgerMenuService, useClass: MockHamburgerMenuService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericLinkComponent);
    component = fixture.componentInstance;

    hamburgerMenuService = TestBed.inject(HamburgerMenuService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isExternalUrl', () => {
    it('should return true when url starts with http:// or https://', () => {
      component.url = 'https://example.com';
      expect(component.isExternalUrl()).toBeTruthy();

      component.url = 'http://example.com';
      expect(component.isExternalUrl()).toBeTruthy();

      component.url = 'http://';
      expect(component.isExternalUrl()).toBeTruthy();

      component.url = 'https://';
      expect(component.isExternalUrl()).toBeTruthy();
    });

    it('should return false when url does not start with http:// or https://', () => {
      component.url = 'other-protocol://example.com';
      expect(component.isExternalUrl()).toBeFalsy();

      component.url = '://example.com';
      expect(component.isExternalUrl()).toBeFalsy();

      component.url = 'example.com';
      expect(component.isExternalUrl()).toBeFalsy();

      component.url = './local/url';
      expect(component.isExternalUrl()).toBeFalsy();

      component.url = '/local/url';
      expect(component.isExternalUrl()).toBeFalsy();

      component.url = 'local/url';
      expect(component.isExternalUrl()).toBeFalsy();
    });

    describe('styling', () => {
      it('should not have any style classes', () => {
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.classList.length).toEqual(0);
      });

      it('should have style classes', () => {
        component.class = 'first-class';
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.classList).toContain('first-class');
        expect(el.classList.length).toEqual(1);
      });

      it('should have multiple style classes', () => {
        component.class = 'first-class second-class';
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.classList).toContain('first-class');
        expect(el.classList).toContain('second-class');
        expect(el.classList.length).toEqual(2);
      });

      it('should not have any style attributes', () => {
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.style.length).toEqual(0);
      });

      it('should have style attributes', () => {
        component.style = 'color: red;';
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.style.color).toEqual('red');
      });

      it('should have multiple style attributes', () => {
        component.style =
          'color: red;border: solid 1px var(--cx-color-primary)';
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.style.color).toEqual('red');
        expect(el.style.border).toEqual('solid 1px var(--cx-color-primary)');
      });
    });
  });

  describe('routerUrl', () => {
    it('should return absolute url wrapped in array when url is string', () => {
      component.ngOnChanges(changeUrl('local/url1'));
      expect(component.routerUrl).toEqual(['/local/url1']);

      component.ngOnChanges(changeUrl('/local/url2'));
      expect(component.routerUrl).toEqual(['/local/url2']);

      component.ngOnChanges(changeUrl('/local/url3?foo=bar#anchor'));
      expect(component.routerUrl).toEqual(['/local/url3']);
    });

    it('should original url when url is array', () => {
      component.ngOnChanges(changeUrl(['url', 'segments', 'array', '1']));
      expect(component.routerUrl).toEqual(['url', 'segments', 'array', '1']);

      component.ngOnChanges(changeUrl(['/url', 'segments', 'array', '2']));
      expect(component.routerUrl).toEqual(['/url', 'segments', 'array', '2']);
    });

    describe('styling', () => {
      it('should not have any style classes', () => {
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.classList.length).toEqual(0);
      });

      it('should have style classes', () => {
        component.class = 'first-class';
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.classList).toContain('first-class');
        expect(el.classList.length).toEqual(1);
      });

      it('should have multiple style classes', () => {
        component.class = 'first-class second-class';
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.classList).toContain('first-class');
        expect(el.classList).toContain('second-class');
        expect(el.classList.length).toEqual(2);
      });

      it('should not have any style attributes', () => {
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.style.length).toEqual(0);
      });

      it('should have style attributes', () => {
        component.style = 'color: red;';
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.style.color).toEqual('red');
      });

      it('should have multiple style attributes', () => {
        component.style =
          'color: red;border: solid 1px var(--cx-color-primary)';
        fixture.detectChanges();
        const el: HTMLElement = fixture.debugElement.query(
          By.css('a')
        ).nativeElement;
        expect(el.style.color).toEqual('red');
        expect(el.style.border).toEqual('solid 1px var(--cx-color-primary)');
      });
    });
  });

  describe('queryParams', () => {
    it('should return query params of the string url', () => {
      component.ngOnChanges(changeUrl('?foo=1&bar=10'));
      expect(component.queryParams).toEqual({ foo: '1', bar: '10' });

      component.ngOnChanges(changeUrl('local/url?foo=2&bar=20'));
      expect(component.queryParams).toEqual({ foo: '2', bar: '20' });

      component.ngOnChanges(changeUrl('/local/url?foo=3&bar=30#anchor'));
      expect(component.queryParams).toEqual({ foo: '3', bar: '30' });
    });
  });

  describe('fragment', () => {
    it('should return query params of the string url', () => {
      component.ngOnChanges(changeUrl('#anchor1'));
      expect(component.fragment).toEqual('anchor1');

      component.ngOnChanges(changeUrl('local/url#anchor2'));
      expect(component.fragment).toEqual('anchor2');

      component.ngOnChanges(changeUrl('/local/url?foo=bar#anchor3'));
      expect(component.fragment).toEqual('anchor3');
    });
  });

  describe('oc trigger click', () => {
    beforeEach(() => {
      spyOn(hamburgerMenuService, 'toggle').and.callThrough();
    });

    describe('should check if link is from navigation', () => {
      it('and trigger toogle hamburger if it is', () => {
        component.isNavLink = true;
        component.triggerLink();
        expect(hamburgerMenuService.toggle).toHaveBeenCalled();
      });

      it('and do not trigger toogle hamburger if it is not', () => {
        component.isNavLink = false;
        component.triggerLink();
        expect(hamburgerMenuService.toggle).not.toHaveBeenCalled();
      });
    });

    describe('should check if hamburger menu is expanded', () => {
      beforeEach(() => {
        component.isNavLink = true;
      });

      it('and trigger toogle hamburger if it is', () => {
        component.triggerLink();
        expect(hamburgerMenuService.toggle).toHaveBeenCalled();
      });

      it('and do not trigger toogle hamburger if it is not', () => {
        hamburgerMenuService.isExpanded.next(false);
        component.triggerLink();
        expect(hamburgerMenuService.toggle).not.toHaveBeenCalled();
      });
    });
  });
});
