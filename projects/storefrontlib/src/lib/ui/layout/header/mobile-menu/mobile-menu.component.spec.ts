import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MobileMenuComponent } from './mobile-menu.component';
import { Component } from '@angular/core';

@Component({
  selector: 'cx-login',
  template: ''
})
export class MockLoginComponent {}

@Component({
  selector: 'cx-dynamic-slot',
  template: ''
})
export class MockDynamicSlotComponent {}

@Component({
  selector: 'cx-add-to-home-screen-btn',
  template: ''
})
export class MockAddToHomeScreenBtnComponent {}

@Component({
  selector: 'cx-language-selector',
  template: ''
})
export class MockLanguageSelectorComponent {}

@Component({
  selector: 'cx-currency-selector',
  template: ''
})
export class MockCurrencySelectorComponent {}

describe('MobileMenuComponent', () => {
  let component: MobileMenuComponent;
  let fixture: ComponentFixture<MobileMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        MobileMenuComponent,
        MockLoginComponent,
        MockDynamicSlotComponent,
        MockAddToHomeScreenBtnComponent,
        MockCurrencySelectorComponent,
        MockLanguageSelectorComponent
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
        fixture.debugElement.query(By.css('button.hamburger'))
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
