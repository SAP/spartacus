import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule, UrlTree } from '@angular/router';
import { LanguageService } from '@spartacus/core';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericLinkComponent } from './generic-link.component';

const mockLanguage$ = new BehaviorSubject<string>('en');

class MockLanguageService {
  getActive(): Observable<string> {
    return mockLanguage$.asObservable();
  }
}

/**
 * Helper function to produce simple change for the `url` `@Input`
 */
function changeUrl(url: string | any[]): SimpleChanges {
  return {
    url: new SimpleChange(null, url, false),
  };
}

describe('GenericLinkComponent', () => {
  let component: GenericLinkComponent;
  let fixture: ComponentFixture<GenericLinkComponent>;

  function configureTestBed(fixLanguageContextLinks: boolean) {
    mockLanguage$.next('en');

    TestBed.configureTestingModule({
      imports: [GenericLinkComponent, RouterModule.forRoot([])],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        provideMockFeatureToggles({ fixLanguageContextLinks }),
      ],
    }).compileComponents();
  }

  describe('fixLanguageContextLinks OFF (default behavior)', () => {
    beforeEach(() => {
      configureTestBed(false);

      fixture = TestBed.createComponent(GenericLinkComponent);
      component = fixture.componentInstance;
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

      it('should return true when url starts with mailto: or tel:', () => {
        component.url = 'tel:123456789';
        expect(component.isExternalUrl()).toBeTruthy();

        component.url = 'mailto:test@example.com';
        expect(component.isExternalUrl()).toBeTruthy();

        component.url = 'tel:';
        expect(component.isExternalUrl()).toBeTruthy();

        component.url = 'mailto:';
        expect(component.isExternalUrl()).toBeTruthy();
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

      it('should return original url when url is array', () => {
        component.ngOnChanges(changeUrl(['url', 'segments', 'array', '1']));
        expect(component.routerUrl).toEqual(['url', 'segments', 'array', '1']);

        component.ngOnChanges(changeUrl(['/url', 'segments', 'array', '2']));
        expect(component.routerUrl).toEqual(['/url', 'segments', 'array', '2']);
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
      it('should return fragment of the string url', () => {
        component.ngOnChanges(changeUrl('#anchor1'));
        expect(component.fragment).toEqual('anchor1');

        component.ngOnChanges(changeUrl('local/url#anchor2'));
        expect(component.fragment).toEqual('anchor2');

        component.ngOnChanges(changeUrl('/local/url?foo=bar#anchor3'));
        expect(component.fragment).toEqual('anchor3');
      });
    });

    describe('language change', () => {
      it('should NOT update routerUrl when language changes', () => {
        component.url = '/my-account';
        component.ngOnChanges(changeUrl('/my-account'));
        fixture.detectChanges();
        const originalUrl = component.routerUrl;

        mockLanguage$.next('ja');
        fixture.detectChanges();

        expect(component.routerUrl).toBe(originalUrl);
      });
    });
  });

  describe('fixLanguageContextLinks ON', () => {
    beforeEach(() => {
      configureTestBed(true);

      fixture = TestBed.createComponent(GenericLinkComponent);
      component = fixture.componentInstance;
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

      it('should return true when url starts with mailto: or tel:', () => {
        component.url = 'tel:123456789';
        expect(component.isExternalUrl()).toBeTruthy();

        component.url = 'mailto:test@example.com';
        expect(component.isExternalUrl()).toBeTruthy();

        component.url = 'tel:';
        expect(component.isExternalUrl()).toBeTruthy();

        component.url = 'mailto:';
        expect(component.isExternalUrl()).toBeTruthy();
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
      it('should return a UrlTree when url is a string', () => {
        component.ngOnChanges(changeUrl('local/url1'));
        expect(component.routerUrl).toBeInstanceOf(UrlTree);

        component.ngOnChanges(changeUrl('/local/url2'));
        expect(component.routerUrl).toBeInstanceOf(UrlTree);

        component.ngOnChanges(changeUrl('/local/url3?foo=bar#anchor'));
        expect(component.routerUrl).toBeInstanceOf(UrlTree);
      });

      it('should return original url when url is array', () => {
        component.ngOnChanges(changeUrl(['url', 'segments', 'array', '1']));
        expect(component.routerUrl).toEqual(['url', 'segments', 'array', '1']);

        component.ngOnChanges(changeUrl(['/url', 'segments', 'array', '2']));
        expect(component.routerUrl).toEqual(['/url', 'segments', 'array', '2']);
      });
    });

    describe('queryParams', () => {
      it('should return undefined for string url (params are embedded in UrlTree)', () => {
        component.ngOnChanges(changeUrl('?foo=1&bar=10'));
        expect(component.queryParams).toBeUndefined();

        component.ngOnChanges(changeUrl('local/url?foo=2&bar=20'));
        expect(component.queryParams).toBeUndefined();

        component.ngOnChanges(changeUrl('/local/url?foo=3&bar=30#anchor'));
        expect(component.queryParams).toBeUndefined();
      });
    });

    describe('fragment', () => {
      it('should return undefined for string url (fragment is embedded in UrlTree)', () => {
        component.ngOnChanges(changeUrl('#anchor1'));
        expect(component.fragment).toBeUndefined();

        component.ngOnChanges(changeUrl('local/url#anchor2'));
        expect(component.fragment).toBeUndefined();

        component.ngOnChanges(changeUrl('/local/url?foo=bar#anchor3'));
        expect(component.fragment).toBeUndefined();
      });
    });

    describe('language change', () => {
      it('should update routerUrl when language changes', () => {
        component.url = '/my-account';
        component.ngOnChanges(changeUrl('/my-account'));
        fixture.detectChanges();
        const originalUrl = component.routerUrl;

        mockLanguage$.next('ja');
        fixture.detectChanges();

        expect(component.routerUrl).not.toBe(originalUrl);
        expect(component.routerUrl).toBeInstanceOf(UrlTree);
      });

      it('should not update routerUrl for external urls on language change', () => {
        component.url = 'https://example.com';
        component.ngOnChanges(changeUrl('https://example.com'));
        fixture.detectChanges();
        const originalUrl = component.routerUrl;

        mockLanguage$.next('ja');
        fixture.detectChanges();

        expect(component.routerUrl).toBe(originalUrl);
      });

      it('should update routerUrl for array url when language changes', () => {
        component.url = ['/cart'];
        component.ngOnChanges(changeUrl(['/cart']));
        fixture.detectChanges();
        const originalUrl = component.routerUrl;

        mockLanguage$.next('ja');
        fixture.detectChanges();

        expect(component.routerUrl).not.toBe(originalUrl);
        expect(component.routerUrl).toBeInstanceOf(UrlTree);
      });
    });
  });
});
