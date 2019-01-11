import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsBreadcrumbsComponent, Component, CmsConfig } from '@spartacus/core';
import { of } from 'rxjs';

const UseCmsModuleConfig: CmsConfig = {
  cmsComponents: {
    CMSLinkComponent: { selector: 'BreadcrumbsComponent' }
  }
};

xdescribe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  const componentData: CmsBreadcrumbsComponent = {
    container: 'false'
  };

  const MockCmsComponentData = <CmsComponentData<Component>>{
    data$: of(componentData)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      providers: [
        { provide: CmsConfig, useValue: UseCmsModuleConfig },
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
