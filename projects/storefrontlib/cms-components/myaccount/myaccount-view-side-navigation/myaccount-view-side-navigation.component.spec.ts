import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyaccountViewSideNavigationComponent } from './myaccount-view-side-navigation.component';
import { CmsComponentData, NavigationService } from '@spartacus/storefront';
import { CmsNavigationComponent,  } from '@spartacus/core';
import { of } from 'rxjs';
// import { DebugElement } from '@angular/core';

import createSpy = jasmine.createSpy;

describe('MyaccountViewSideNavigationComponent', () => {
  let component: MyaccountViewSideNavigationComponent;
  let fixture: ComponentFixture<MyaccountViewSideNavigationComponent>;
  // let element: DebugElement;

  const mockCmsComponentData = <CmsNavigationComponent>{
    styleClass: 'footer-styling',
  };

  const MockCmsNavigationComponent = <CmsComponentData<any>>{
    data$: of(mockCmsComponentData),
  };

  const mockNavigationService = {
    createNavigation: createSpy().and.returnValue(of(null)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            {
              provide: NavigationService,
              useValue: mockNavigationService,
            },
            {
              provide: CmsComponentData,
              useValue: MockCmsNavigationComponent,
            },
          ],
      declarations: [MyaccountViewSideNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyaccountViewSideNavigationComponent);
    component = fixture.componentInstance;
    // element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
