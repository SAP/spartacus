import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericLinkComponent } from './generic-link.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('GenericLinkComponent', () => {
  let component: GenericLinkComponent;
  let fixture: ComponentFixture<GenericLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [GenericLinkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    it('should return absolute url when url is string', () => {
      component.url = 'local/url';
      expect(component.routerUrl).toBe('/local/url');

      component.url = '/local/url';
      expect(component.routerUrl).toBe('/local/url');
    });
  });

  it('should url when url is array', () => {
    component.url = ['array', 'of', 'url', 'segments'];
    expect(component.routerUrl).toBe(['array', 'of', 'url', 'segments']);

    component.url = ['/array', 'of', 'url', 'segments'];
    expect(component.routerUrl).toBe(['/array', 'of', 'url', 'segments']);
  });
});
