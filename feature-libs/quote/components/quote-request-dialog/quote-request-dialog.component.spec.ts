import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { Quote, QuoteActionType, QuoteFacade } from '@spartacus/quote/root';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  LaunchDialogService,
  SpinnerModule,
} from '@spartacus/storefront';
import { EMPTY, of } from 'rxjs';
import { createEmptyQuote } from '../../core/testing/quote-test-utils';
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';
import { QuoteRequestDialogComponent } from './quote-request-dialog.component';
import createSpy = jasmine.createSpy;

const quoteCode = 'quote1';
const mockCreatedQuote: Quote = {
  ...createEmptyQuote(),
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

function prepareTestData(
  fixture: ComponentFixture<QuoteRequestDialogComponent>,
  htmlElem: HTMLElement,
  querySelectorBtn: string,
  inputValue: string,
  textAreaValue: string
) {
  const input = CommonQuoteTestUtilsService.getHTMLElement(
    htmlElem,
    'form input',
    0
  ) as HTMLInputElement;
  const textarea = CommonQuoteTestUtilsService.getHTMLElement(
    htmlElem,
    'form textarea'
  ) as HTMLInputElement;

  input.value = inputValue;
  input.dispatchEvent(new Event('input'));

  textarea.value = textAreaValue;
  textarea.dispatchEvent(new Event('input'));
  fixture.detectChanges();

  const button = CommonQuoteTestUtilsService.getHTMLElement(
    htmlElem,
    querySelectorBtn
  );
  button?.click();
  fixture.detectChanges();
}

describe('QuoteRequestDialogComponent', () => {
  let component: QuoteRequestDialogComponent;
  let fixture: ComponentFixture<QuoteRequestDialogComponent>;
  let htmlElem: HTMLElement;
  let launchDialogService: LaunchDialogService;
  let quoteFacade: QuoteFacade;
  let routingService: RoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteRequestDialogComponent, MockUrlPipe],
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
    fixture = TestBed.createComponent(QuoteRequestDialogComponent);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prompt form errors due to invalid form values', () => {
    const primaryButton = CommonQuoteTestUtilsService.getHTMLElement(
      htmlElem,
      'button.btn-primary'
    );
    primaryButton?.click();
    fixture.detectChanges();

    expect(component.form.valid).toEqual(false);
    CommonQuoteTestUtilsService.expectNumberOfElements(
      expect,
      htmlElem,
      'cx-form-errors > p',
      2
    );
  });

  it('should validate form with valid values', () => {
    prepareTestData(
      fixture,
      htmlElem,
      'button.btn-primary',
      'test name',
      'test comment'
    );
    expect(component.form.valid).toEqual(true);
    CommonQuoteTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-form-errors > p'
    );
  });

  it('should redirect to quote details page on successful quote request', () => {
    prepareTestData(
      fixture,
      htmlElem,
      'button.btn-action',
      testForm.name,
      testForm.comment
    );
    expect(quoteFacade.createQuote).toHaveBeenCalledWith({
      name: testForm.name,
    });
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'quoteDetails',
      params: { quoteId: quoteCode },
    });
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('success');
  });

  it('should submit quote', () => {
    prepareTestData(
      fixture,
      htmlElem,
      'button.btn-primary',
      testForm.name,
      testForm.comment
    );
    expect(quoteFacade.createQuote).toHaveBeenCalledWith({
      name: testForm.name,
    });

    expect(quoteFacade.performQuoteAction).toHaveBeenCalledWith(
      quoteCode,
      QuoteActionType.SUBMIT
    );
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith('success');
  });
});
