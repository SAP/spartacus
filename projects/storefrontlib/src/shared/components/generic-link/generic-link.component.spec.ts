import { SimpleChange, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GenericLinkComponent } from './generic-link.component';

/**
 * Helper function to produce simple change for the `url input
 */
function changeUrl(url: string | any[]): SimpleChanges {
  return {
    url: new SimpleChange(null, url, false),
  };
}

describe('GenericLinkComponent', () => {
  let component: GenericLinkComponent;
  let fixture: ComponentFixture<GenericLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [GenericLinkComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
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
      component.url = 'other-protocole://example.com';
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
});
