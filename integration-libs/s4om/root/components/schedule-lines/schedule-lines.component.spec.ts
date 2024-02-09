import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { LanguageService } from '@spartacus/core';
import { ScheduleLine } from '@spartacus/s4om/root';
import { I18nTestingModule, TranslationService } from 'projects/core/src/i18n';
import { Observable, ReplaySubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ScheduleLinesComponent } from './schedule-lines.component';

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
}

class MockTranslationService implements Partial<TranslationService> {
  translate(): Observable<string> {
    return of('');
  }
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

@Component({
  selector: 'cx-schedule-lines',
  template: '',
})
class MockConfigureScheduleLineComponent {
  @Input() cartEntry: Partial<OrderEntry & Array<ScheduleLine>>;
}

describe('ScheduleLinesCartEntryComponent', () => {
  let component: ScheduleLinesComponent;
  let fixture: ComponentFixture<ScheduleLinesComponent>;
  let htmlElem: HTMLElement;
  let mockCartItemContext: MockCartItemContext;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveFormsModule, I18nTestingModule],
        declarations: [
          ScheduleLinesComponent,
          MockConfigureScheduleLineComponent,
        ],
        providers: [
          { provide: CartItemContext, useClass: MockCartItemContext },
          {
            provide: TranslationService,
            useClass: MockTranslationService,
          },
          { provide: LanguageService, useClass: MockLanguageService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleLinesComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    mockCartItemContext = TestBed.inject(CartItemContext) as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose orderEntry$', (done) => {
    const orderEntry: Partial<OrderEntry & Array<ScheduleLine>> = {
      orderCode: '123',
      scheduleLines: [],
    };
    component.orderEntry$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(orderEntry);
      done();
    });

    mockCartItemContext.item$.next(orderEntry);
  });

  it('should return empty string when no date is provided', () => {
    const date = component.getLongDate();

    expect(date).toEqual('');
  });

  describe('schedule lines', () => {
    it('should not be displayed if model provides empty array', () => {
      mockCartItemContext.item$.next({
        scheduleLines: undefined,
      });

      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-schedule-line-info').length).toBe(
        0
      );
    });

    it('should be displayed if model provides data', () => {
      mockCartItemContext.item$.next({
        scheduleLines: [
          {
            confirmedAt: new Date('2022-05-22T00:00:00+0000'),
            confirmedQuantity: 1,
          },
          {
            confirmedAt: new Date('2022-05-10T00:00:00+0000'),
            confirmedQuantity: 3,
          },
        ],
      });

      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-schedule-line-info').length).toBe(
        2
      );
    });

    describe('Accessibility', () => {
      beforeEach(() => {
        mockCartItemContext.item$.next({
          scheduleLines: [
            {
              confirmedAt: new Date('2022-05-22T00:00:00+0000'),
              confirmedQuantity: 1,
            },
          ],
        });

        fixture.detectChanges();
      });

      it("should contain div element with class name 'cx-visually-hidden' that contains a hidden schedule line info", function () {
        const divElementWithVisuallyHiddenClass = htmlElem.querySelector(
          '.cx-visually-hidden'
        );

        expect(divElementWithVisuallyHiddenClass?.innerHTML).toContain(
          's4omScheduleLines.a11y.scheduleLineEntryInfo'
        );
      });

      it("should contain div element with 'cx-schedule-line-info' and aria-describedby attribute that refers to a corresponding attribute-value pair", () => {
        const divElementWithScheduleLineInfoClass = htmlElem.querySelector(
          '.cx-schedule-line-info'
        );

        expect(
          divElementWithScheduleLineInfoClass?.attributes?.hasOwnProperty(
            'aria-describedby'
          )
        );
        expect(
          divElementWithScheduleLineInfoClass?.getAttribute('aria-describedby')
        ).toEqual('cx-schedule-line-info-0');
      });

      it('should contain div elements for label and value with corresponding content', () => {
        const divElementWithCxLabelClass = htmlElem.querySelector('.cx-label');

        expect(
          divElementWithCxLabelClass?.attributes?.hasOwnProperty('aria-hidden')
        );
        expect(divElementWithCxLabelClass?.ariaHidden).toEqual('true');

        const divElementWithCxValueClasses =
          htmlElem.querySelectorAll('.cx-value');

        expect(
          divElementWithCxValueClasses[0]?.attributes?.hasOwnProperty(
            'aria-hidden'
          )
        );
        expect(divElementWithCxValueClasses[0]?.ariaHidden).toEqual('true');

        expect(
          divElementWithCxValueClasses[1]?.attributes?.hasOwnProperty(
            'aria-hidden'
          )
        );
        expect(divElementWithCxValueClasses[1]?.ariaHidden).toEqual('true');
      });
    });
  });
});
