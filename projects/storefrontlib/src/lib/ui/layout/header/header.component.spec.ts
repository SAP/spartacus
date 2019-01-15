import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderSkipperComponent } from './header-skipper/header-skipper.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'cx-language-selector',
  template: ''
})
class MockLanguageSelectorComponent {}

@Component({
  selector: 'cx-currency-selector',
  template: ''
})
class MockCurrencySelectorComponent {}

@Component({
  selector: 'cx-dynamic-slot',
  template: ''
})
class MockDynamicSlotComponent {
  @Input()
  position: string;
}

@Component({
  selector: 'cx-login',
  template: ''
})
class MockLoginComponent {}

@Component({
  selector: 'cx-mobile-menu',
  template: ''
})
class MockMobileMenuComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        HeaderComponent,
        MockDynamicSlotComponent,
        MockLanguageSelectorComponent,
        MockCurrencySelectorComponent,
        MockLoginComponent,
        MockMobileMenuComponent,
        HeaderSkipperComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // UI TEST
  describe('UI tests', () => {
    it('should contain the header skipper component', () => {
      expect(
        fixture.debugElement.query(By.css('cx-header-skipper'))
      ).not.toBeNull();
    });

    it('should contain the Site Context Selectors', () => {
      expect(
        fixture.debugElement.query(
          By.css(
            'div.cx-content__slot:not(#cx-mobile-menu) cx-language-selector'
          )
        )
      ).not.toBeNull();

      expect(
        fixture.debugElement.query(
          By.css(
            'div.cx-content__slot:not(#cx-mobile-menu) cx-currency-selector'
          )
        )
      ).not.toBeNull();
    });

    it('should contain the login status component', () => {
      expect(
        fixture.debugElement.query(
          By.css('div.cx-content__slot:not(#cx-mobile-menu) cx-login')
        )
      ).not.toBeNull();
    });

    it('should contain the mobile menu component', () => {
      expect(
        fixture.debugElement.query(By.css('cx-mobile-menu'))
      ).not.toBeNull();
    });

    describe('Dynamic slots', () => {
      it('should contain site logo', () => {
        expect(
          fixture.debugElement.query(
            By.css('cx-dynamic-slot[position="SiteLogo"]')
          )
        ).not.toBeNull();
      });

      it('should contain the searchbox', () => {
        expect(
          fixture.debugElement.query(
            By.css('cx-dynamic-slot[position="SearchBox"]')
          )
        ).not.toBeNull();
      });

      it('should contain the mini cart', () => {
        expect(
          fixture.debugElement.query(
            By.css('cx-dynamic-slot[position="MiniCart"]')
          )
        ).not.toBeNull();
      });

      it('should contain the navigation bar', () => {
        expect(
          fixture.debugElement.query(
            By.css(
              'div.cx-content__slot:not(#cx-mobile-menu) cx-dynamic-slot[position="NavigationBar"]'
            )
          )
        ).not.toBeNull();
      });
    });
  });
});
