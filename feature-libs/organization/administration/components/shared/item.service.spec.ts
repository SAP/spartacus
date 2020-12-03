import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import {
  LoadStatus,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';
import { CurrentItemService } from './current-item.service';
import { FormService } from './form/form.service';
import { ItemService } from './item.service';
import createSpy = jasmine.createSpy;

const mockCode = 'o1';
class MockRoutingService {
  go() {}
}

class MockCurrentItemService {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(false);
}

const mockForm = new FormGroup({});
mockForm.addControl('name', new FormControl('foo bar'));

class MockFormService {
  getForm() {
    return mockForm;
  }
}
const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

@Injectable()
class MockItemService extends ItemService<any> {
  getDetailsRoute() {
    return 'testRoute';
  }
  load(_key: string): Observable<any> {
    return of();
  }
  create(_item): Observable<OrganizationItemStatus<any>> {
    return mockItemStatus;
  }
  update(_code, _item): Observable<OrganizationItemStatus<any>> {
    return mockItemStatus;
  }
}

describe('ItemService', () => {
  let service: MockItemService;
  let formService: FormService<any>;
  let routingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockItemService,
        {
          provide: CurrentItemService,
          useClass: MockCurrentItemService,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: FormService,
          useClass: MockFormService,
        },
      ],
    });

    service = TestBed.inject(MockItemService);
    formService = TestBed.inject(FormService);
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
        expect(service.save(form)).toEqual(mockItemStatus);
        expect(service.create).toHaveBeenCalledWith({
          name: 'foo bar',
        });
        expect(form.disabled).toBeTruthy();
      });

      it('should update existing item', () => {
        spyOn(service, 'update').and.callThrough();
        const form = new FormGroup({});
        form.addControl('name', new FormControl('foo bar'));

        expect(service.save(form, 'existingCode')).toEqual(mockItemStatus);
        expect(service.update).toHaveBeenCalledWith('existingCode', {
          name: 'foo bar',
        });
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

    describe('isInEditMode', () => {
      it('should emit false after component creation', (done) => {
        service.isInEditMode$.subscribe((result) => {
          expect(result).toBe(false);
          done();
        });
      });

      it('when set to true should emit true', (done) => {
        service.setEditMode(true);

        service.isInEditMode$.subscribe((result) => {
          expect(result).toBe(true);
          done();
        });
      });

      it('when set to false should emit false', (done) => {
        service.setEditMode(false);

        service.isInEditMode$.subscribe((result) => {
          expect(result).toBe(false);
          done();
        });
      });
    });
  });
});
