import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';

import { CmsService } from '../../../cms/facade/cms.service';
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
  cmsPage$: new BehaviorSubject(null)
};

fdescribe('CategoryPageComponent', () => {
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

  /*it('should call ngOnInit()', () => {
    spyOnProperty(NgrxStore, 'select').and.returnValue(() => () =>
      of('cartPage')
    );
    component.ngOnInit();

    expect(component.categoryCode).toEqual('123');
    expect(component.brandCode).toEqual('456');
    expect(component.query).toEqual('mockQuery');
    component.cmsPage$.subscribe(page => expect(page).toEqual('cartPage'));
  });*/
});
