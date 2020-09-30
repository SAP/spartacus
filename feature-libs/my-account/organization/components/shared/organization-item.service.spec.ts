import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentOrganizationItemService } from './current-organization-item.service';
import { OrganizationFormService } from './organization-form/organization-form.service';
import { OrganizationItemService } from './organization-item.service';
import { OrganizationItemStatus, LoadStatus } from '@spartacus/my-account/organization/core';

class MockRoutingService {
  go() {}
}

class MockCurrentOrganizationItemService {}

const mockForm = new FormGroup({});
mockForm.addControl('name', new FormControl('foo bar'));

class MockOrganizationFormService {
  getForm() {
    return mockForm;
  }
}

@Injectable()
class MockItemService extends OrganizationItemService<any> {
  getDetailsRoute() {
    return 'testRoute';
  }
  load(_key: string): Observable<any> {
    return of();
  }
  create(_item) {}
  update(_code, _item): Observable<OrganizationItemStatus<any>> {
    return of({ status: LoadStatus.SUCCESS, value: {} });
  }
}

describe('OrganizationItemService', () => {
  let service: MockItemService;
  let formService: OrganizationFormService<any>;
  let routingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockItemService,
        {
          provide: CurrentOrganizationItemService,
          useClass: MockCurrentOrganizationItemService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: OrganizationFormService,
          useClass: MockOrganizationFormService,
        },
      ],
    });

    service = TestBed.inject(MockItemService);
    formService = TestBed.inject(OrganizationFormService);
    routingService = TestBed.inject(RoutingService);

    spyOn(routingService, 'go').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return form', () => {
    spyOn(formService, 'getForm').and.callThrough();
    expect(service.getForm()).toEqual(mockForm);
  });

  describe('launch', () => {
    it('should launch detailed route', () => {
      service.launchDetails({ name: 'foo bar' });
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'testRoute',
        params: { name: 'foo bar' },
      });
    });
  });

  describe('save()', () => {
    describe('handle valid form data', () => {
      it('should create new item', () => {
        spyOn(service, 'create').and.callThrough();
        const form = new FormGroup({});
        form.addControl('name', new FormControl('foo bar'));
        service.save(form);
        expect(service.create).toHaveBeenCalledWith({
          name: 'foo bar',
        });
        expect(routingService.go).toHaveBeenCalled();
        expect(form.disabled).toBeTruthy();
      });

      it('should update existing item', () => {
        spyOn(service, 'update').and.callThrough();
        const form = new FormGroup({});
        form.addControl('name', new FormControl('foo bar'));
        service.save(form, 'existingCode');
        expect(service.update).toHaveBeenCalledWith('existingCode', {
          name: 'foo bar',
        });
        expect(routingService.go).toHaveBeenCalled();
        expect(form.disabled).toBeTruthy();
      });
    });

    describe('handle invalid form data', () => {
      it('should not create invalid existing item', () => {
        spyOn(service, 'create').and.callThrough();
        const form = new FormGroup({});
        form.addControl(
          undefined,
          new FormControl(undefined, Validators.required)
        );
        service.save(form);
        expect(service.create).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
        expect(form.disabled).toBeFalsy();
      });

      it('should not update invalid existing item', () => {
        spyOn(service, 'update').and.callThrough();
        const form = new FormGroup({});
        form.addControl(
          'name',
          new FormControl(undefined, Validators.required)
        );
        service.save(form, 'existingCode');
        expect(service.update).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
        expect(form.disabled).toBeFalsy();
      });
    });
  });
});
