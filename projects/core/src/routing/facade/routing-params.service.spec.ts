import { Component, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingParamsService } from './routing-params.service';

@Component({
  selector: 'cx-mock',
  template: '',
})
export class MockComponent {}

describe('RoutingParamsService', () => {
  let service: RoutingParamsService;

  let router;
  let zone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: MockComponent,
          },
          {
            path: 'budgets',
            component: MockComponent,
            children: [
              {
                path: ':budgetCode',
                component: MockComponent,
                children: [
                  {
                    path: 'children/:childCode',
                    component: MockComponent,
                  },
                ],
              },
            ],
          },
        ]),
      ],
      declarations: [MockComponent],
      providers: [RoutingParamsService],
    });
    service = TestBed.inject(RoutingParamsService);
    router = TestBed.inject(Router);

    zone = TestBed.inject(NgZone);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not have any params for /budgets', async () => {
    let result;
    await zone.run(() => router.navigateByUrl('/budgets'));
    service.getParams().subscribe((params) => (result = params));
    expect(result).toEqual({});
  });

  it('should have param for /budgets/1234', async () => {
    let result;
    await zone.run(() => router.navigateByUrl('/budgets/1234'));
    service.getParams().subscribe((params) => (result = params));
    expect(result).toEqual({ budgetCode: '1234' });
  });

  it('should have params for /budgets/1234/children/5678', async () => {
    let result;
    await zone.run(() => router.navigateByUrl('/budgets/1234/children/5678'));
    service.getParams().subscribe((params) => (result = params));
    expect(result.budgetCode).toEqual('1234');
    expect(result.childCode).toEqual('5678');
  });

  it('should share child params', async () => {
    let result1;
    let result2;
    await zone.run(() => router.navigateByUrl('/budgets/1234'));

    service.getParams().subscribe((params) => (result1 = params));

    expect(result1.budgetCode).toEqual('1234');

    await zone.run(() => router.navigateByUrl('/budgets/1234/children/5678'));
    service.getParams().subscribe((params) => (result2 = params));

    expect(result1.budgetCode).toEqual('1234');
    expect(result2.childCode).toEqual('5678');
  });

  it('should clear all params', async () => {
    let result;
    await zone.run(() => router.navigateByUrl('/budgets/1234'));
    await zone.run(() => router.navigateByUrl('/budgets'));
    service.getParams().subscribe((params) => (result = params));
    expect(result).toEqual({});
  });
});
