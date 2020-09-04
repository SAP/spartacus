import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ViewComponent } from '@spartacus/storefront';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { CurrentOrganizationItemService } from '../current-organization-item.service';
import { OrganizationCardComponent } from './organization-card.component';
import createSpy = jasmine.createSpy;

class MockCurrentOrganizationItemService {
  key$ = of('key');
  launchDetails = createSpy('launchDetails');
}

fdescribe('OrganizationCardComponent', () => {
  let component: OrganizationCardComponent<any>;
  let fixture: ComponentFixture<OrganizationCardComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SplitViewTestingModule,
        IconTestingModule,
        I18nTestingModule,
        RouterTestingModule,
      ],
      declarations: [OrganizationCardComponent],
      providers: [
        {
          provide: CurrentOrganizationItemService,
          useClass: MockCurrentOrganizationItemService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the view ', () => {
    const ev = {
      stopPropagation: () => {},
    };
    const view = {
      toggle: (_force?: boolean) => {},
    };
    spyOn(view, 'toggle');
    component.closeView(view as ViewComponent, ev as MouseEvent);
    expect(view.toggle).toHaveBeenCalledWith(true);
  });

  // TODO: UI tests
});
