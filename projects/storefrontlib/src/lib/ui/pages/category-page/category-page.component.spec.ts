import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

import { CmsService } from '@spartacus/core';
import { CategoryPageComponent } from './category-page.component';

@Component({ selector: 'cx-product-list-page-layout', template: '' })
export class MockProductListPageLayoutComponent {
  @Input()
  gridMode: String;
  @Input()
  categoryCode;
  @Input()
  brandCode;
  @Input()
  query;
}

@Component({ selector: 'cx-category-page-layout', template: '' })
export class MockCategoryPageLayoutComponent {
  @Input()
  categoryCode;
  @Input()
  query;
}

class MockActivatedRoute {
  params = of({
    categoryCode: '123',
    brandCode: '456',
    query: 'mockQuery'
  });
}

const mockCmsService = {
  currentPage$: new BehaviorSubject(null)
};

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryPageComponent,
        MockProductListPageLayoutComponent,
        MockCategoryPageLayoutComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: CmsService, useValue: mockCmsService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get product list page', () => {
    mockCmsService.currentPage$.next({ template: 'ProductListPageTemplate' });
    component.ngOnInit();
    fixture.detectChanges();

    const childDebugElement = fixture.debugElement.query(
      By.css('cx-product-list-page-layout')
    );
    expect(childDebugElement).toBeTruthy();

    const productListPageComponent = childDebugElement.componentInstance;
    expect(productListPageComponent.gridMode).toEqual('list');
    expect(productListPageComponent.categoryCode).toEqual('123');
    expect(productListPageComponent.brandCode).toEqual('456');
  });

  it('should be able to get product grid page', () => {
    mockCmsService.currentPage$.next({ template: 'ProductGridPageTemplate' });
    component.ngOnInit();
    fixture.detectChanges();

    const childDebugElement = fixture.debugElement.query(
      By.css('cx-product-list-page-layout')
    );
    expect(childDebugElement).toBeTruthy();

    const productListPageComponent = childDebugElement.componentInstance;
    expect(productListPageComponent.gridMode).toEqual('grid');
    expect(productListPageComponent.categoryCode).toEqual('123');
    expect(productListPageComponent.brandCode).toEqual('456');
  });

  it('should be able to get category page', () => {
    mockCmsService.currentPage$.next({ template: 'CategoryPageTemplate' });
    component.ngOnInit();
    fixture.detectChanges();

    const childDebugElement = fixture.debugElement.query(
      By.css('cx-category-page-layout')
    );
    expect(childDebugElement).toBeTruthy();

    const categoryPageComponent = childDebugElement.componentInstance;
    expect(categoryPageComponent.categoryCode).toEqual('123');
  });

  it('should be able to get search result list page', () => {
    mockCmsService.currentPage$.next({
      template: 'SearchResultsListPageTemplate'
    });
    component.ngOnInit();
    fixture.detectChanges();

    const childDebugElement = fixture.debugElement.query(
      By.css('cx-product-list-page-layout')
    );
    expect(childDebugElement).toBeTruthy();

    const productListPageComponent = childDebugElement.componentInstance;
    expect(productListPageComponent.gridMode).toEqual('list');
    expect(productListPageComponent.query).toEqual('mockQuery');
  });
});
