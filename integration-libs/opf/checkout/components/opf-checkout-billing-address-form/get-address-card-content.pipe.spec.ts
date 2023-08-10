import { TestBed } from '@angular/core/testing';
import { Address } from '@spartacus/core';
import { GetAddressCardContent } from './get-address-card-content.pipe';

describe('GetAddressCardContentPipe', () => {
  let pipe: GetAddressCardContent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAddressCardContent],
    });

    pipe = TestBed.inject(GetAddressCardContent);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform address to card content', () => {
    const address = {
      firstName: 'John',
      lastName: 'Doe',
      line1: '123 Main St',
      line2: 'Apt 4B',
      town: 'Cityville',
      region: { isocode: 'CA' },
      country: { isocode: 'US' },
      postalCode: '12345',
      phone: '555-1234',
    };

    const result = pipe.transform(address);

    expect(result).toEqual({
      textBold: 'John Doe',
      text: ['123 Main St', 'Apt 4B', 'Cityville, CA, US', '12345', '555-1234'],
    });
  });

  it('should handle missing address', () => {
    const result = pipe.transform(null as unknown as Address);

    expect(result).toEqual({});
  });

  it('should handle missing region and country', () => {
    const address = {
      firstName: 'Jane',
      lastName: 'Smith',
      line1: '456 Elm St',
      town: 'Townsville',
      postalCode: '67890',
      phone: '555-5678',
    };

    const result = pipe.transform(address);
    console.log(result);
    expect(result).toEqual({
      textBold: 'Jane Smith',
      text: ['456 Elm St', undefined, 'Townsville', '67890', '555-5678'],
    });
  });
});
