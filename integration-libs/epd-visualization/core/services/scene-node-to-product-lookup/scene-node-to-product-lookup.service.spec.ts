import { TestBed } from '@angular/core/testing';
import {
  provideConfigFactory,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { getEpdVisualizationDefaultConfig } from '@spartacus/epd-visualization/root';
import { Observable, of } from 'rxjs';
import { getTestConfig } from '../../../root/testing/epd-visualization-test-config';
import {
  MetadatumValueType,
  NodesResponse,
} from '../../connectors/scene/nodes-response';
import { SceneAdapter } from '../../connectors/scene/scene.adapter';
import { SceneNodeToProductLookupService } from './scene-node-to-product-lookup.service';

class MockSceneAdapter extends SceneAdapter {
  getNodesFunc: (
    _sceneId: string,
    _nodeIds?: string[],
    _expand?: string[],
    _filter?: string[],
    _contentType?: string
  ) => Observable<NodesResponse>;

  getNodes(
    sceneId: string,
    nodeIds?: string[],
    expand?: string[],
    filter?: string[],
    contentType?: string
  ): Observable<NodesResponse> {
    return this.getNodesFunc(sceneId, nodeIds, expand, filter, contentType);
  }
}

const nodesResponseOneProductCodePerSceneNode: NodesResponse = {
  nodes: [
    {
      sid: 'sceneNode1',
      metadata: [
        {
          source: 'CommerceCloud',
          category: 'SpareParts',
          tag: 'ProductCode',
          value: 'productCode1',
          valueType: MetadatumValueType.string,
        },
      ],
    },
    {
      sid: 'sceneNode2',
      metadata: [
        {
          source: 'CommerceCloud',
          category: 'SpareParts',
          tag: 'ProductCode',
          value: 'productCode2',
          valueType: MetadatumValueType.string,
        },
      ],
    },
    {
      sid: 'sceneNode3',
      metadata: [
        {
          source: 'CommerceCloud',
          category: 'SpareParts',
          tag: 'ProductCode',
          value: 'productCode3',
          valueType: MetadatumValueType.string,
        },
      ],
    },
  ],
};

const nodesResponseMultipleProductCodesPerSceneNode: NodesResponse = {
  nodes: [
    {
      sid: 'sceneNode1',
      metadata: [
        {
          source: 'CommerceCloud',
          category: 'SpareParts',
          tag: 'ProductCode',
          value: 'productCodeA',
          valueType: MetadatumValueType.string,
        },
      ],
    },
    {
      sid: 'sceneNode2',
      metadata: [
        {
          source: 'CommerceCloud',
          category: 'SpareParts',
          tag: 'ProductCode',
          value: 'productCodeA',
          valueType: MetadatumValueType.string,
        },
      ],
    },
    {
      sid: 'sceneNode3',
      metadata: [
        {
          source: 'CommerceCloud',
          category: 'SpareParts',
          tag: 'ProductCode',
          value: 'productCodeB',
          valueType: MetadatumValueType.string,
        },
      ],
    },
  ],
};

const validateGetNodesParameters = (
  sceneId: string,
  nodeIds?: string[],
  expand?: string[],
  filter?: string[],
  contentType?: string
) => {
  expect(sceneId).toBe('some scene id');
  expect(nodeIds).toBeUndefined(), expect(expand).toBeTruthy();
  if (expand) {
    expect(expand.length).toBe(2);
    expect(expand[0]).toBe('hotspot');
    expect(expand[1]).toBe('metadata[CommerceCloud].SpareParts.ProductCode');
  }
  expect(filter).toBeTruthy();
  if (filter) {
    expect(filter.length).toBe(1);
    expect(filter[0]).toBe('metadata[CommerceCloud].SpareParts.ProductCode');
  }
  expect(contentType).toBe('*');
};

const getNodesOneProductCodePerSceneNode = (
  sceneId: string,
  nodeIds?: string[],
  expand?: string[],
  filter?: string[],
  contentType?: string
): Observable<NodesResponse> => {
  validateGetNodesParameters(sceneId, nodeIds, expand, filter, contentType);
  return of(nodesResponseOneProductCodePerSceneNode);
};

const getNodesMultipleProductCodesPerSceneNode = (
  sceneId: string,
  nodeIds?: string[],
  expand?: string[],
  filter?: string[],
  contentType?: string
): Observable<NodesResponse> => {
  validateGetNodesParameters(sceneId, nodeIds, expand, filter, contentType);
  return of(nodesResponseMultipleProductCodesPerSceneNode);
};

describe('SceneNodeToProductLookupService', () => {
  const mockSceneAdapter = new MockSceneAdapter();

  let sceneNodeToProductLookupService: SceneNodeToProductLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideConfigFactory(getTestConfig),
        provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
        {
          provide: SceneAdapter,
          useValue: mockSceneAdapter,
        },
      ],
    });

    sceneNodeToProductLookupService = TestBed.inject(
      SceneNodeToProductLookupService
    );
  });

  describe('lookupNodeIds', () => {
    it('should lookup node ids for given product codes', (done) => {
      mockSceneAdapter.getNodesFunc = getNodesOneProductCodePerSceneNode;

      const sceneNodeIdsBeforeMapPopulated =
        sceneNodeToProductLookupService.syncLookupNodeIds([
          'productCode2',
          'productCode3',
          'notPresent',
        ]);
      expect(sceneNodeIdsBeforeMapPopulated).toBeTruthy();
      expect(sceneNodeIdsBeforeMapPopulated.length).toBe(0);

      sceneNodeToProductLookupService.populateMapsForScene('some scene id');

      sceneNodeToProductLookupService
        .lookupNodeIds(['productCode2', 'productCode3', 'notPresent'])
        .subscribe((sceneNodeIds: string[]) => {
          expect(sceneNodeIds).toBeTruthy();
          expect(sceneNodeIds.length).toBe(2);
          expect(sceneNodeIds[0]).toBe('sceneNode2');
          expect(sceneNodeIds[1]).toBe('sceneNode3');

          // The synchronous version should produce the same results at this point in time.
          const sceneNodeIdsSync =
            sceneNodeToProductLookupService.syncLookupNodeIds([
              'productCode2',
              'productCode3',
              'notPresent',
            ]);
          expect(sceneNodeIdsSync).toBeTruthy();
          expect(sceneNodeIdsSync.length).toBe(2);
          expect(sceneNodeIdsSync[0]).toBe('sceneNode2');
          expect(sceneNodeIdsSync[1]).toBe('sceneNode3');

          done();
        });
    });

    it('should allow for multiple scene nodes with same product code', (done) => {
      mockSceneAdapter.getNodesFunc = getNodesMultipleProductCodesPerSceneNode;

      const sceneNodeIdsBeforeMapPopulated =
        sceneNodeToProductLookupService.syncLookupProductCodes([
          'productCodeA',
          'productCodeB',
          'notPresent',
        ]);
      expect(sceneNodeIdsBeforeMapPopulated).toBeTruthy();
      expect(sceneNodeIdsBeforeMapPopulated.length).toBe(0);

      sceneNodeToProductLookupService.populateMapsForScene('some scene id');

      sceneNodeToProductLookupService
        .lookupNodeIds(['productCodeA'])
        .subscribe((sceneNodeIds: string[]) => {
          expect(sceneNodeIds).toBeTruthy();
          expect(sceneNodeIds.length).toBe(2);
          expect(sceneNodeIds[0]).toBe('sceneNode1');
          expect(sceneNodeIds[1]).toBe('sceneNode2');

          // The synchronous version should produce the same results at this point in time.
          const sceneNodeIdsSync =
            sceneNodeToProductLookupService.syncLookupNodeIds(['productCodeA']);
          expect(sceneNodeIdsSync).toBeTruthy();
          expect(sceneNodeIdsSync.length).toBe(2);
          expect(sceneNodeIdsSync[0]).toBe('sceneNode1');
          expect(sceneNodeIdsSync[1]).toBe('sceneNode2');

          done();
        });
    });
  });

  describe('lookupProductCodes', () => {
    it('should lookup product codes for given scene node ids', (done) => {
      mockSceneAdapter.getNodesFunc = getNodesOneProductCodePerSceneNode;

      const sceneNodeToProductLookupService: SceneNodeToProductLookupService =
        TestBed.inject(SceneNodeToProductLookupService);

      const productCodesBeforeMapPopulated =
        sceneNodeToProductLookupService.syncLookupProductCodes([
          'sceneNode2',
          'sceneNode3',
          'notPresent',
        ]);
      expect(productCodesBeforeMapPopulated).toBeTruthy();
      expect(productCodesBeforeMapPopulated.length).toBe(0);

      sceneNodeToProductLookupService.populateMapsForScene('some scene id');

      sceneNodeToProductLookupService
        .lookupProductCodes(['sceneNode2', 'sceneNode3', 'notPresent'])
        .subscribe((productCodes: string[]) => {
          expect(productCodes).toBeTruthy();
          expect(productCodes.length).toBe(2);
          expect(productCodes[0]).toBe('productCode2');
          expect(productCodes[1]).toBe('productCode3');

          // The synchronous version should produce the same results at this point in time.
          const productCodesSync =
            sceneNodeToProductLookupService.syncLookupProductCodes([
              'sceneNode2',
              'sceneNode3',
              'notPresent',
            ]);
          expect(productCodesSync).toBeTruthy();
          expect(productCodesSync.length).toBe(2);
          expect(productCodesSync[0]).toBe('productCode2');
          expect(productCodesSync[1]).toBe('productCode3');

          done();
        });
    });

    it('should allow for multiple scene nodes with same product code', (done) => {
      mockSceneAdapter.getNodesFunc = getNodesMultipleProductCodesPerSceneNode;

      const sceneNodeToProductLookupService: SceneNodeToProductLookupService =
        TestBed.inject(SceneNodeToProductLookupService);

      const productCodesBeforeMapPopulated =
        sceneNodeToProductLookupService.syncLookupProductCodes([
          'sceneNode1',
          'sceneNode2',
          'sceneNode3',
          'notPresent',
        ]);
      expect(productCodesBeforeMapPopulated).toBeTruthy();
      expect(productCodesBeforeMapPopulated.length).toBe(0);

      sceneNodeToProductLookupService.populateMapsForScene('some scene id');

      sceneNodeToProductLookupService
        .lookupProductCodes([
          'sceneNode1',
          'sceneNode2',
          'sceneNode3',
          'notPresent',
        ])
        .subscribe((productCodes: string[]) => {
          expect(productCodes).toBeTruthy();
          expect(productCodes.length).toBe(2);
          expect(productCodes[0]).toBe('productCodeA');
          expect(productCodes[1]).toBe('productCodeB');

          // The synchronous version should produce the same results at this point in time.
          const productCodesSync =
            sceneNodeToProductLookupService.syncLookupProductCodes([
              'sceneNode1',
              'sceneNode2',
              'sceneNode3',
              'notPresent',
            ]);
          expect(productCodesSync).toBeTruthy();
          expect(productCodesSync.length).toBe(2);
          expect(productCodesSync[0]).toBe('productCodeA');
          expect(productCodesSync[1]).toBe('productCodeB');

          done();
        });
    });
  });
});
