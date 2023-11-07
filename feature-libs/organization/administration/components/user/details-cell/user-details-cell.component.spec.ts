import { ComponentFixture, TestBed } from '@angular/core/testing';
import { B2BUser, B2BUserRight, B2BUserRole } from '@spartacus/core';
import { OutletContextData, PopoverDirective } from '@spartacus/storefront';
import { UserDetailsCellComponent } from '..';
import { B2BUserService } from '@spartacus/organization/administration/core';

class MockB2BUserService implements Partial<B2BUserService> {
  getAllRoles() {
    return [
      B2BUserRole.CUSTOMER,
      B2BUserRole.MANAGER,
      B2BUserRole.APPROVER,
      B2BUserRole.ADMIN,
    ];
  }
  getAllRights() {
    return [B2BUserRight.UNITORDERVIEWER];
  }
}

const mockB2BUser: B2BUser = {
  roles: [B2BUserRole.CUSTOMER, B2BUserRight.UNITORDERVIEWER],
};

const mockB2BUserWithoutRight: B2BUser = {
  roles: [B2BUserRole.CUSTOMER],
};

describe('RolesCellComponent', () => {
  let component: UserDetailsCellComponent;
  let fixture: ComponentFixture<UserDetailsCellComponent>;
  let b2bUserService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsCellComponent, PopoverDirective],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context: mockB2BUser,
          },
        },
        { provide: B2BUserService, useClass: MockB2BUserService },
      ],
    }).compileComponents();

    b2bUserService = TestBed.inject(B2BUserService);

    spyOn(b2bUserService, 'getAllRights').and.callThrough();
    spyOn(b2bUserService, 'getAllRoles').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsCellComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load list of rights', () => {
    expect(b2bUserService.getAllRights).toHaveBeenCalled();
  });

  it('should load list of roles', () => {
    expect(b2bUserService.getAllRoles).toHaveBeenCalled();
  });

  it('should check the existence of the right', () => {
    expect(component.hasRight(mockB2BUser)).toBe(true);
  });

  it('should check the non-existence of the right', () => {
    expect(component.hasRight(mockB2BUserWithoutRight)).toBe(false);
  });
});
