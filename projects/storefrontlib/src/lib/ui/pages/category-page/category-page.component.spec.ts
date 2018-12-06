import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';

import { CmsService } from '../../../cms/facade/cms.service';
import { Page } from '../../../cms/models/page.model';
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

class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of();
  }
}

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;
  let cmsService: CmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryPageComponent,
        MockProductListPageLayoutComponent,
        MockCategoryPageLayoutComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: CmsService, useClass: MockCmsService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    cmsService = TestBed.get(CmsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get product list page', () => {
    spyOn(cmsService, 'getCurrentPage').and.returnValue(
      of({ template: 'ProductListPageTemplate' })
    );
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
    spyOn(cmsService, 'getCurrentPage').and.returnValue(
      of({ template: 'ProductGridPageTemplate' })
    );
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
    spyOn(cmsService, 'getCurrentPage').and.returnValue(
      of({ template: 'CategoryPageTemplate' })
    );
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
    spyOn(cmsService, 'getCurrentPage').and.returnValue(
      of({ template: 'SearchResultsListPageTemplate' })
    );
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
