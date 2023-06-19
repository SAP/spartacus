import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  QuoteFacade,
  Quote,
  QuoteActionType,
} from 'feature-libs/quote/root/public_api';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  LaunchDialogService,
  SpinnerModule,
} from '@spartacus/storefront';
import { EMPTY, of } from 'rxjs';
import { QuoteRequestQuoteDialogComponent } from './quote-request-quote-dialog.component';
import createSpy = jasmine.createSpy;

const quoteCode = 'quote1';
const mockCreatedQuote: Quote = {
  allowedActions: [],
  code: quoteCode,
};
const testForm = {
  name: 'test name',
  comment: 'test comment',
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog = createSpy();
}

class MockQuoteFacade implements Partial<QuoteFacade> {
  createQuote = createSpy().and.returnValue(of(mockCreatedQuote));
  performQuoteAction = createSpy().and.returnValue(of(EMPTY));
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('QuoteRequestQuoteDialogComponent', () => {
  let component: QuoteRequestQuoteDialogComponent;
  let fixture: ComponentFixture<QuoteRequestQuoteDialogComponent>;
  let launchDialogService: LaunchDialogService;
  let quoteFacade: QuoteFacade;
  let routingService: RoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteRequestQuoteDialogComponent, MockUrlPipe],
      imports: [
        RouterTestingModule,
        SpinnerModule,
        I18nTestingModule,
        ReactiveFormsModule,
        FormErrorsModule,
        KeyboardFocusModule,
        IconModule,
      ],
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: QuoteFacade,
          useClass: MockQuoteFacade,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();

    launchDialogService = TestBed.inject(LaunchDialogService);
    quoteFacade = TestBed.inject(QuoteFacade);
    routingService = TestBed.inject(RoutingService);

    spyOn(routingService, 'go').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteRequestQuoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prompt form errors due to invalid form values', () => {
    fixture.debugElement
      .query(By.css('button.btn-primary'))
      .nativeElement.click();

    fixture.detectChanges();

    const formErrors = fixture.debugElement.queryAll(
      By.css('cx-form-errors > p')
    );

    expect(component.form.valid).toEqual(false);
    expect(formErrors.length).toEqual(2);
  });

  it('should validate form with valid values', () => {
    const input = fixture.debugElement.queryAll(By.css('form input'))[0]
      .nativeElement;
    const textarea = fixture.debugElement.query(
      By.css('form textarea')
    ).nativeElement;

    input.value = 'test name';
    input.dispatchEvent(new Event('input'));

    textarea.value = 'test comment';
    textarea.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('button.btn-primary'))
      .nativeElement.click();

    const formErrors = fixture.debugElement.queryAll(
      By.css('cx-form-errors > p')
    );

    expect(component.form.valid).toEqual(true);
    expect(formErrors.length).toEqual(0);
  });

  it('should redirect to quote details page on successful quote request', () => {
    const input = fixture.debugElement.queryAll(By.css('form input'))[0]
      .nativeElement;
    const textarea = fixture.debugElement.query(
      By.css('form textarea')
    ).nativeElement;

    input.value = testForm.name;
    input.dispatchEvent(new Event('input'));

    textarea.value = testForm.comment;
    textarea.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('button.btn-action'))
      .nativeElement.click();

    expect(quoteFacade.createQuote).toHaveBeenCalledWith(
      {
        name: testForm.name,
      },
      {
        text: testForm.comment,
      }
    );
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'quoteDetails',
      params: { quoteId: quoteCode },
    });
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('success');
  });

  it('should submit quote', () => {
    const input = fixture.debugElement.queryAll(By.css('form input'))[0]
      .nativeElement;
    const textarea = fixture.debugElement.query(
      By.css('form textarea')
    ).nativeElement;

    input.value = testForm.name;
    input.dispatchEvent(new Event('input'));

    textarea.value = testForm.comment;
    textarea.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('button.btn-primary'))
      .nativeElement.click();

    expect(quoteFacade.createQuote).toHaveBeenCalledWith(
      {
        name: testForm.name,
      },
      {
        text: testForm.comment,
      }
    );

    expect(quoteFacade.performQuoteAction).toHaveBeenCalledWith(
      quoteCode,
      QuoteActionType.SUBMIT
    );
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('success');
  });
});
