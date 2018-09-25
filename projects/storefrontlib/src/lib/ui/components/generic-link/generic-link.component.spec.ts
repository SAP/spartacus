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

  describe('isAbsoluteUrl', () => {
    it('should return true when url starts with http:// or https://', () => {
      expect(component.isAbsoluteUrl('https://example.com')).toBeTruthy();
      expect(component.isAbsoluteUrl('http://example.com')).toBeTruthy();
      expect(component.isAbsoluteUrl('http://')).toBeTruthy();
      expect(component.isAbsoluteUrl('https://')).toBeTruthy();
    });

    it('should return false when url does not start with http:// or https://', () => {
      expect(
        component.isAbsoluteUrl('other-protocole://example.com')
      ).toBeFalsy();
      expect(component.isAbsoluteUrl('://example.com')).toBeFalsy();
      expect(component.isAbsoluteUrl('example.com')).toBeFalsy();
      expect(component.isAbsoluteUrl('./relative/url')).toBeFalsy();
      expect(component.isAbsoluteUrl('/relative/url')).toBeFalsy();
      expect(component.isAbsoluteUrl('relative/url')).toBeFalsy();
    });
  });
});
