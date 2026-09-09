import { vi } from 'vitest';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import {
  LoadStatus,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { EMPTY, firstValueFrom, Observable, of } from 'rxjs';
import { CurrentItemService } from './current-item.service';
import { FormService } from './form/form.service';
import { ItemService } from './item.service';

const mockCode = 'o1';
class MockRoutingService {
  go() {}
}

class MockCurrentItemService {
  key$ = of(mockCode);
  load = vi.fn().mockReturnValue(EMPTY);
  error$ = of(false);
}

const mockForm = new UntypedFormGroup({});
mockForm.addControl('name', new UntypedFormControl('foo bar'));

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
    return EMPTY;
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

    vi.spyOn(routingService, 'go');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return form', () => {
    vi.spyOn(formService, 'getForm');
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
        vi.spyOn(service, 'create');
        const form = new UntypedFormGroup({});
        form.addControl('name', new UntypedFormControl('foo bar'));
        expect(service.save(form)).toEqual(mockItemStatus);
        expect(service.create).toHaveBeenCalledWith({
          name: 'foo bar',
        });
        expect(form.disabled).toBeTruthy();
      });

      it('should update existing item', () => {
        vi.spyOn(service, 'update');
        const form = new UntypedFormGroup({});
        form.addControl('name', new UntypedFormControl('foo bar'));

        expect(service.save(form, 'existingCode')).toEqual(mockItemStatus);
        expect(service.update).toHaveBeenCalledWith('existingCode', {
          name: 'foo bar',
        });
        expect(form.disabled).toBeTruthy();
      });
    });

    describe('handle invalid form data', () => {
      it('should not create invalid existing item', () => {
        vi.spyOn(service, 'create');
        const form = new UntypedFormGroup({});
        form.addControl(
          undefined,
          new UntypedFormControl(undefined, Validators.required)
        );
        service.save(form);
        expect(service.create).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
        expect(form.disabled).toBeFalsy();
      });

      it('should not update invalid existing item', () => {
        vi.spyOn(service, 'update');
        const form = new UntypedFormGroup({});
        form.addControl(
          'name',
          new UntypedFormControl(undefined, Validators.required)
        );
        service.save(form, 'existingCode');
        expect(service.update).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
        expect(form.disabled).toBeFalsy();
      });
    });

    describe('isInEditMode', () => {
      it('should emit false after component creation', async () => {
        const result = await firstValueFrom(service.isInEditMode$);
        expect(result).toBe(false);
      });

      it('when set to true should emit true', async () => {
        service.setEditMode(true);
        const result = await firstValueFrom(service.isInEditMode$);
        expect(result).toBe(true);
      });

      it('when set to false should emit false', async () => {
        service.setEditMode(false);
        const result = await firstValueFrom(service.isInEditMode$);
        expect(result).toBe(false);
      });
    });
  });
});
