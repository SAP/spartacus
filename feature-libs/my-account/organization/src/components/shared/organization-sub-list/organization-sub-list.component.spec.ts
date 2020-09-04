import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from 'events';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { of } from 'rxjs';
import { CurrentOrganizationItemService } from '../current-organization-item.service';
import { OrganizationCardTestingModule } from '../organization-card/organization-card.testing.module';
import { OrganizationListService } from '../organization-list/organization-list.service';
import { OrganizationMessageTestingModule } from '../organization-message/organization-message.testing.module';
import { OrganizationSubListComponent } from './organization-sub-list.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-table',
  template: '',
})
class MockTableComponent {
  @Input() dataset;
  @Input() currentItem;
  @Output() launch = new EventEmitter();
}

class MockBaseOrganizationListService {
  view = createSpy('view');
  sort = createSpy('sort');
  getTable() {}
  key() {
    return 'code';
  }
}

class MockCurrentOrganizationItemService {
  key$ = of('key');
  launchDetails = createSpy('launchDetails');
}

describe('OrganizationSubListComponent', () => {
  let component: OrganizationSubListComponent;
  let fixture: ComponentFixture<OrganizationSubListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        OrganizationCardTestingModule,
        OrganizationMessageTestingModule,
        PaginationTestingModule,
      ],
      declarations: [OrganizationSubListComponent, MockTableComponent],
      providers: [
        {
          provide: OrganizationListService,
          useClass: MockBaseOrganizationListService,
        },
        {
          provide: CurrentOrganizationItemService,
          useClass: MockCurrentOrganizationItemService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve getRouteParam', () => {
    let result;
    component.getRouteParam().subscribe((param) => (result = param));
    expect(result).toEqual({ code: 'key' });
  });
});
