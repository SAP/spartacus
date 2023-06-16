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
import { QuoteActionLinksService } from './quote-action-links.service';
import createSpy = jasmine.createSpy;

class MockActionLinksService implements Partial<QuoteActionLinksService> {
  goToNewCart = createSpy();
}

const mockRoutes = [{ path: 'cxRoute:quotes', component: {} }] as Routes;

describe('QuoteActionLinksComponent', () => {
  let fixture: ComponentFixture<QuoteActionLinksComponent>;
  let component: QuoteActionLinksComponent;
  let actionLinksService: QuoteActionLinksService;
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
          provide: QuoteActionLinksService,
          useClass: MockActionLinksService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteActionLinksComponent);
    actionLinksService = TestBed.inject(QuoteActionLinksService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render action links', () => {
    const links = fixture.debugElement.queryAll(By.css('button.link'));

    fixture.detectChanges();

    expect(links[0].nativeElement.innerText).toContain('links.newCart');
    expect(links[1].nativeElement.innerText).toContain('links.quotes');
    expect(links.length).toEqual(2);
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
