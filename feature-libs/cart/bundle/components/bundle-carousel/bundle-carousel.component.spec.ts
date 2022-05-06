import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Product, RoutingService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { BundleCarouselComponent } from './bundle-carousel.component';

const mockProduct: Product = {
  bundleTemplates: [
    {
      name: 'templateA',
      rootBundleTemplateName: 'rootTemplateA',
      id: 'tmpA',
    },
    {
      name: 'templateB',
      rootBundleTemplateName: 'rootTemplateB',
      id: 'tmpB',
    },
  ],
};
class MockCurrentProductService implements Partial<CurrentProductService> {
  getProduct() {
    return of({ bundleTemplates: [] });
  }
}
class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

fdescribe('BundleCarouselComponent', () => {
  let component: BundleCarouselComponent;
  let fixture: ComponentFixture<BundleCarouselComponent>;
  let currentProductService: CurrentProductService;
  let routingService: RoutingService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [BundleCarouselComponent],
      providers: [
        { provide: CurrentProductService, useClass: MockCurrentProductService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BundleCarouselComponent);
    component = fixture.componentInstance;
    currentProductService = TestBed.inject(CurrentProductService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display bundle templates when not set', () => {
    fixture.detectChanges();
    el = fixture.debugElement;

    const bundleRows = el.queryAll(By.css('.template-row'));
    expect(bundleRows.length).toEqual(0);
  });

  it('should display bundle templates when product input is set', () => {
    component.product$ = of(mockProduct);
    fixture.detectChanges();
    el = fixture.debugElement;

    const bundleRows = el.queryAll(By.css('.template-row'));
    expect(bundleRows.length).toEqual(2);
  });

  it('should display bundle templates when current product returned by service', () => {
    spyOn(currentProductService, 'getProduct').and.returnValue(of(mockProduct));
    fixture = TestBed.createComponent(BundleCarouselComponent);
    fixture.detectChanges();
    el = fixture.debugElement;

    const bundleRows = el.queryAll(By.css('.template-row'));
    expect(bundleRows.length).toEqual(2);
  });

  it('should go to bundle start route', () => {
    component.product$ = of(mockProduct);
    fixture.detectChanges();
    el = fixture.debugElement;

    const startBundleBtn = el.query(By.css('.btn'));
    spyOn(routingService, 'go').and.callThrough();
    startBundleBtn.nativeElement.click();
    expect(routingService.go).toHaveBeenCalledWith('start-bundle', {
      queryParams: { template: mockProduct.bundleTemplates?.[0].id },
    });
  });
});
