import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Budget } from '@spartacus/my-account/organization/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { OrganizationCardTestingModule } from '../../shared/organization-card/organization-card.testing.module';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { OrganizationMessageTestingModule } from '../../shared/organization-message/organization-message.testing.module';
import { UserDetailsComponent } from './user-details.component';
import createSpy = jasmine.createSpy;

const mockCode = 'c1';

class MockUserItemService implements Partial<OrganizationItemService<Budget>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let itemService: OrganizationItemService<Budget>;

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
      declarations: [UserDetailsComponent],
      providers: [
        { provide: OrganizationItemService, useClass: MockUserItemService },
      ],
    }).compileComponents();

    itemService = TestBed.inject(OrganizationItemService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
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
