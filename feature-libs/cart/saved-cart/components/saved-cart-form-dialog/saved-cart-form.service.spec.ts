import { TestBed } from '@angular/core/testing';
import { SavedCartFormService } from './saved-cart-form.service';

const mockNameMaxLength = 50;
const mockDescriptionMaxLength = 50;

describe('SavedCartFormService', () => {
  let service: SavedCartFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedCartFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = service.getForm(mockNameMaxLength, mockDescriptionMaxLength);
    expect(form.get('name')).not.toBeNull();
    expect(form.get('description')).not.toBeNull();
  });

  it('should apply the values', () => {
    const form = service.getForm(mockNameMaxLength, mockDescriptionMaxLength, {
      name: 'testName',
      description: 'testDescription',
    });
    expect(form.get('name')).not.toBeNull();
    expect(form.get('name').value).toEqual('testName');
    expect(form.get('description')).not.toBeNull();
    expect(form.get('description').value).toEqual('testDescription');
  });
});
