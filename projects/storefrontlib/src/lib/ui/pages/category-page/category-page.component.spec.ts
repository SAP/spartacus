import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';

import { of, BehaviorSubject } from 'rxjs';

import { CmsService } from '../../../cms/facade/cms.service';

import { CategoryPageComponent } from './category-page.component';
import { Page } from '../../../cms/models/page.model';

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

@Component({
  selector: 'cx-product-list-page-layout',
  template: ''
})
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

@Component({
  selector: 'cx-category-page-layout',
  template: ''
})
export class MockCategoryPageLayoutComponent {
  @Input()
  categoryCode;
}

const mockPage: Page = {
  pageId: 'testPageId',
  name: 'testPage',
  seen: [],
  slots: {}
};

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryPageComponent,
        MockCategoryPageLayoutComponent,
        MockProductListPageLayoutComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: CmsService, useValue: mockCmsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component state when ngOnInit() is called', () => {
    mockCmsService.currentPage$.next(mockPage);
    component.ngOnInit();

    expect(component.categoryCode).toEqual('123');
    expect(component.brandCode).toEqual('456');
    expect(component.query).toEqual('mockQuery');
    component.cmsPage$.subscribe(pageReturned =>
      expect(pageReturned).toBe(mockPage)
    );
  });
});
