import { TestBed } from '@angular/core/testing';
import { B2BUnit, Occ } from '@spartacus/core';
import { OccOrgUnitNormalizer } from './occ-org-unit-normalizer';

describe('OccOrgUnitNormalizer', () => {
  let service: OccOrgUnitNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccOrgUnitNormalizer],
    });

    service = TestBed.inject(OccOrgUnitNormalizer);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.B2BUnit = {
    uid: 'unit1',
  };

  describe('convert', () => {
    it('convert Occ.B2BUnit to B2BUnit', () => {
      let target: B2BUnit;
      target = service.convert(source);

      expect(target.uid).toEqual(source.uid);
    });
  });
});
