import { TestBed } from '@angular/core/testing';
import { Occ } from '@spartacus/core';
import { B2BUnitNode } from '@spartacus/organization/administration/core';
import { OccOrgUnitNodeListNormalizer } from './occ-org-unit-node-list-normalizer';

describe('OccOrgUnitNodeListNormalizer', () => {
  let service: OccOrgUnitNodeListNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccOrgUnitNodeListNormalizer],
    });

    service = TestBed.inject(OccOrgUnitNodeListNormalizer);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.B2BUnitNodeList = {
    unitNodes: [{ id: 'unitNode1' }, { id: 'unitNode2' }],
  };

  describe('convert', () => {
    it('convert Occ.B2BUnitNodeList to B2BUnitNode[]', () => {
      let target: B2BUnitNode[];
      target = service.convert(source);

      expect(target.length).toEqual(source.unitNodes.length);
    });
  });
});
