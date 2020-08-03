import { TestBed } from '@angular/core/testing';
import { BudgetFormService } from './budget-form.service';

describe('BudgetFormService', () => {
  let service: BudgetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetFormService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = service.getForm({});
    expect(form.get('code')).toBeDefined();
    expect(form.get('name')).toBeDefined();
    expect(form.get('currency').get('isocode')).toBeDefined();
    expect(form.get('unit').get('uid')).toBeDefined();
  });

  it('should apply the model', () => {
    const form = service.getForm({ code: 'test' });
    expect(form.get('code')).toBeDefined();
    expect(form.get('code').value).toEqual('test');
  });
});
