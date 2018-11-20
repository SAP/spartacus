import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';

import { of } from 'rxjs';

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

class MockCmsService {
  getLatestPage() {}
}

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
  let cmsService: CmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryPageComponent,
        MockCategoryPageLayoutComponent,
        MockProductListPageLayoutComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: CmsService, useClass: MockCmsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cmsService = TestBed.get(CmsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component state when ngOnInit() is called', () => {
    spyOn(cmsService, 'getLatestPage').and.returnValue(of(mockPage));

    component.ngOnInit();

    expect(component.categoryCode).toEqual('123');
    expect(component.brandCode).toEqual('456');
    expect(component.query).toEqual('mockQuery');
    component.cmsPage$.subscribe(pageReturned =>
      expect(pageReturned).toBe(mockPage)
    );
  });
});
