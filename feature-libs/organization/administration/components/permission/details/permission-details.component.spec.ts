import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
// import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { ExistGuardDirective } from '../../shared/exist-guard.directive';
import { OrganizationCardTestingModule } from '../../shared/organization-card/organization-card.testing.module';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { MessageTestingModule } from '../../shared/organization-message/message.testing.module';
import { MessageService } from '../../shared/organization-message/services/message.service';
import { PermissionDetailsComponent } from './permission-details.component';

import createSpy = jasmine.createSpy;

const mockCode = 'p1';

class MockPermissionItemService
  implements Partial<OrganizationItemService<Permission>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
}
// const mockState = new BehaviorSubject(null);

// const mockStore: Partial<Store<any>> = {
//   select: () => mockState,
// };

class MockMessageService {
  add() {
    return new Subject();
  }
  close() {}
}

describe('PermissionDetailsComponent', () => {
  let component: PermissionDetailsComponent;
  let fixture: ComponentFixture<PermissionDetailsComponent>;
  let itemService: OrganizationItemService<Permission>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        OrganizationCardTestingModule,
        MessageTestingModule,
      ],
      declarations: [PermissionDetailsComponent, ExistGuardDirective],
      providers: [
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
        {
          provide: OrganizationItemService,
          useClass: MockPermissionItemService,
        },
        // { provide: Store, useValue: mockStore },
        provideMockStore({}),
      ],
    }).compileComponents();

    itemService = TestBed.inject(OrganizationItemService);

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
