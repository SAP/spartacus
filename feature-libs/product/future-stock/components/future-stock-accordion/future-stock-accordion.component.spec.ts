import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { of } from 'rxjs';
import { FutureStockAccordionComponent } from './future-stock-accordion.component';

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('FutureStockAccordionComponent', () => {
  let component: FutureStockAccordionComponent;
  let fixture: ComponentFixture<FutureStockAccordionComponent>;

  const mockFutureStocks = {
    futureStocks: [
      {
        formattedDate: '10/11/2020',
        stock: {
          stockLevel: 15,
        },
      },
      {
        formattedDate: '11/11/2020',
        stock: {
          stockLevel: 20,
        },
      },
      {
        formattedDate: '12/11/2020',
        stock: {
          stockLevel: 25,
        },
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [MockCxIconComponent, FutureStockAccordionComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureStockAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('creation', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('toggle', () => {
    it('should change expanded state of accordion', () => {
      expect(component.expanded).toBeFalsy();

      component.toggle();

      expect(component.expanded).toBeTruthy();
    });
  });

  describe('Show Future Stocks', () => {
    it('should show no stocks message', () => {
      component.futureStocks$ = of({});
      fixture.detectChanges();

      let button = fixture.debugElement.query(
        By.css('.cx-future-stock-accordion-header')
      );
      button.triggerEventHandler('click');
      fixture.detectChanges();

      let stocks = fixture.debugElement.query(
        By.css('.cx-future-stock-accordion-content')
      );

      expect(stocks.nativeElement.innerText).toEqual(
        'futureStockDropdown.noFutureStocks'
      );
    });

    it('should show mocked future stocks', () => {
      component.futureStocks$ = of(mockFutureStocks);
      fixture.detectChanges();

      let button = fixture.debugElement.query(
        By.css('.cx-future-stock-accordion-header')
      );
      button.triggerEventHandler('click');
      fixture.detectChanges();

      let stocks = fixture.debugElement.queryAll(
        By.css('.cx-future-stock-accordion-content')
      );

      expect(stocks[0].nativeElement.innerText).toEqual(
        '10/11/2020 - futureStockDropdown.quantity 15'
      );
      expect(stocks[1].nativeElement.innerText).toEqual(
        '11/11/2020 - futureStockDropdown.quantity 20'
      );
      expect(stocks[2].nativeElement.innerText).toEqual(
        '12/11/2020 - futureStockDropdown.quantity 25'
      );
    });
  });
});
