import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CommerceQuotesFacade, Quote } from '@spartacus/commerce-quotes/root';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  ModalService,
  SpinnerModule,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { CommerceQuotesRequestQuoteDialogComponent } from './commerce-quotes-request-quote-dialog.component';
import createSpy = jasmine.createSpy;

const quoteCode = 'quote1';
const mockCreatedQuote: Quote = {
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

class MockModalService implements Partial<ModalService> {
  dismissActiveModal = createSpy();
}

class MockCommerceQuotesFacade implements Partial<CommerceQuotesFacade> {
  createQuote = createSpy().and.returnValue(of(mockCreatedQuote));
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

fdescribe('CommerceQuotesRequestQuoteDialogComponent', () => {
  let component: CommerceQuotesRequestQuoteDialogComponent;
  let fixture: ComponentFixture<CommerceQuotesRequestQuoteDialogComponent>;
  let modalService: ModalService;
  let commerceQuotesService: CommerceQuotesFacade;
  let routingService: RoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommerceQuotesRequestQuoteDialogComponent, MockUrlPipe],
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
          provide: ModalService,
          useClass: MockModalService,
        },
        {
          provide: CommerceQuotesFacade,
          useClass: MockCommerceQuotesFacade,
        },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();

    modalService = TestBed.inject(ModalService);
    commerceQuotesService = TestBed.inject(CommerceQuotesFacade);
    routingService = TestBed.inject(RoutingService);

    spyOn(routingService, 'go').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CommerceQuotesRequestQuoteDialogComponent
    );
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

    expect(commerceQuotesService.createQuote).toHaveBeenCalledWith(
      {
        name: testForm.name,
      },
      {
        text: testForm.comment,
      }
    );
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'quoteEdit',
      params: { quoteId: quoteCode },
    });
    expect(modalService.dismissActiveModal).toHaveBeenCalled();
  });
});
