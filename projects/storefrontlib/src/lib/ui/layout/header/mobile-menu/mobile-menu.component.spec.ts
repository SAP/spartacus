import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MobileMenuComponent } from './mobile-menu.component';

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
  selector: 'cx-add-to-home-screen-btn',
  template: ''
})
class MockAddToHomeScreenBtnComponent {}

describe('MobileMenuComponent', () => {
  let component: MobileMenuComponent;
  let fixture: ComponentFixture<MobileMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MobileMenuComponent,
        MockDynamicSlotComponent,
        MockLanguageSelectorComponent,
        MockCurrencySelectorComponent,
        MockLoginComponent,
        MockAddToHomeScreenBtnComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UI tests', () => {
    it('should contain the hamburger', () => {
      expect(
        fixture.debugElement.query(By.css('button.cx-hamburger'))
      ).not.toBeNull();
    });

    it('should contain the login status component', () => {
      expect(fixture.debugElement.query(By.css('cx-login'))).not.toBeNull();
    });

    it('should contain the Site Context components', () => {
      expect(
        fixture.debugElement.query(By.css('cx-language-selector'))
      ).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('cx-currency-selector'))
      ).not.toBeNull();
    });

    describe('Dynamic slots', () => {
      it('should contain the NavigationBar', () => {
        expect(
          fixture.debugElement.query(
            By.css('cx-dynamic-slot[position="NavigationBar"]')
          )
        ).not.toBeNull();
      });
    });

    describe('toggleMenu', () => {
      it('should open or close menu', () => {
        component.showMenu = false;
        component.toggleMenu();

        expect(component.showMenu).toBe(true);

        component.toggleMenu();
        expect(component.showMenu).toBe(false);
      });
    });
  });
});
