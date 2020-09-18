import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Permission } from '@spartacus/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { OrganizationCardTestingModule } from '../../shared/organization-card/organization-card.testing.module';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { OrganizationMessageTestingModule } from '../../shared/organization-message/organization-message.testing.module';
import { PermissionDetailsComponent } from './permission-details.component';

import createSpy = jasmine.createSpy;

const mockCode = 'p1';

class MockPermissionItemService
  implements Partial<OrganizationItemService<Permission>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
}

describe('PermissionDetailsComponent', () => {
  let component: PermissionDetailsComponent;
  let fixture: ComponentFixture<PermissionDetailsComponent>;
  let itemService: OrganizationItemService<Permission>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        OrganizationCardTestingModule,
        OrganizationMessageTestingModule,
      ],
      declarations: [PermissionDetailsComponent],
      providers: [
        {
          provide: OrganizationItemService,
          useClass: MockPermissionItemService,
        },
      ],
    }).compileComponents();

    itemService = TestBed.inject(OrganizationItemService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger reload of model on each code change', () => {
    expect(itemService.load).toHaveBeenCalledWith(mockCode);
  });
});
