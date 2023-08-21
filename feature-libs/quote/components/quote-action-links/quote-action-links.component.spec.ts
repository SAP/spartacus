import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { QuoteActionLinksComponent } from './quote-action-links.component';
import { CartUtilsService } from '@spartacus/quote/core';
import createSpy = jasmine.createSpy;
import { CommonQuoteTestUtilsService } from '../testing/common-quote-test-utils.service';

class MockActionLinksService implements Partial<CartUtilsService> {
  goToNewCart = createSpy();
}

const mockRoutes = [{ path: 'cxRoute:quotes', component: {} }] as Routes;

describe('QuoteActionLinksComponent', () => {
  let fixture: ComponentFixture<QuoteActionLinksComponent>;
  let htmlElem: HTMLElement;
  let component: QuoteActionLinksComponent;
  let actionLinksService: CartUtilsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        RouterTestingModule.withRoutes(mockRoutes),
        UrlTestingModule,
      ],
      declarations: [QuoteActionLinksComponent],
      providers: [
        {
          provide: CartUtilsService,
          useClass: MockActionLinksService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteActionLinksComponent);
    htmlElem = fixture.nativeElement;
    actionLinksService = TestBed.inject(CartUtilsService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render action links', () => {
    CommonQuoteTestUtilsService.expectNumberOfElementsPresent(
      expect,
      htmlElem,
      'button.link',
      2
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'button.link',
      'quote.links.newCart',
      0
    );

    CommonQuoteTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      'button.link',
      'quote.links.quotes',
      1
    );
  });

  it('should fire `goToNewCart()` when "New Cart" button was clicked', () => {
    spyOn(component, 'goToNewCart').and.callThrough();
    const links = fixture.debugElement.queryAll(By.css('button.link'));

    links[0].nativeElement.click();

    expect(component.goToNewCart).toHaveBeenCalled();
    expect(actionLinksService.goToNewCart).toHaveBeenCalled();
  });

  it('should redirect to Quotes list when "Quotes" button was clicked', fakeAsync(() => {
    const links = fixture.debugElement.queryAll(By.css('button.link'));
    fixture.detectChanges();

    links[1].nativeElement.click();
    tick();

    expect(router.url).toBe('/cxRoute:quotes');
  }));
});
