import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  provideConfigFactory,
  provideDefaultConfigFactory,
  WindowRef,
} from '@spartacus/core';
import {
  SceneNodeToProductLookupService,
  VisualizationLookupService,
} from '@spartacus/epd-visualization/core';
import {
  ContentType,
  getEpdVisualizationDefaultConfig,
} from '@spartacus/epd-visualization/root';
import { from, Observable, of } from 'rxjs';
import Core from 'sap/ui/core/Core';
import ViewStateManager from 'sap/ui/vk/ViewStateManager';
import VisibilityMode from 'sap/ui/vk/VisibilityMode';
import { getTestConfig } from '../../root/testing/epd-visualization-test-config';
import { NavigationMode } from './models/navigation-mode';
import { NodeContentType } from './models/node-content-type';
import { LoadedSceneInfo, SceneLoadInfo } from './models/scene-load-info';
import { SceneLoadState } from './models/scene-load-state';
import { SelectionMode } from './models/selection-mode';
import { ZoomTo } from './models/zoom-to';
import { VisualViewerService } from './visual-viewer.service';

type NodeRef = any;

interface FakeNodeRef {
  id: string;
  children: FakeNodeRef[];
  closed: boolean;
  contentType: NodeContentType;
}

class MockSceneNodeToProductLookupService {
  lookupProductCodes$: Observable<string[]>;

  lookupProductCodes = (_nodeIds: string[]): Observable<string[]> => {
    return this.lookupProductCodes$;
  };
}

class MockVisualizationLookupService {}

const visualViewerContainerId = 'visualViewerContainer';

class MockElementRef {
  get nativeElement() {
    let containerDiv = document.getElementById(visualViewerContainerId);
    if (!containerDiv) {
      containerDiv = document.createElement('div');
      containerDiv.id = visualViewerContainerId;
      document.body.appendChild(containerDiv);
    }
    return containerDiv;
  }
}

class MockChangeDetectorRef {}

describe('VisualViewerService', () => {
  let mockSceneNodeToProductLookupService =
    new MockSceneNodeToProductLookupService();
  let mockVisualizationLookupService = new MockVisualizationLookupService();
  let mockElementRef = new MockElementRef();
  let mockChangeDetectorRef = new MockChangeDetectorRef();
  let windowRef: WindowRef;

  let visualViewerService: VisualViewerService;

  let viewportAdded$: Observable<void>;

  let originalTimeout: number;
  let isUi5BootStrapped: () => boolean;
  let getCore: () => Core;
  let containerDiv: HTMLDivElement;

  beforeAll(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });

  afterAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideConfigFactory(getTestConfig),
        provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
        {
          provide: SceneNodeToProductLookupService,
          useValue: mockSceneNodeToProductLookupService,
        },
        {
          provide: VisualizationLookupService,
          useValue: mockVisualizationLookupService,
        },
        {
          provide: ElementRef,
          useValue: mockElementRef,
        },
        {
          provide: ChangeDetectorRef,
          useValue: mockChangeDetectorRef,
        },
      ],
    });

    visualViewerService = TestBed.inject(VisualViewerService);
    windowRef = TestBed.inject(WindowRef);

    viewportAdded$ = visualViewerService['viewportAdded$'] as Observable<void>;
    isUi5BootStrapped =
      visualViewerService['isUi5BootStrapped'].bind(visualViewerService);
    getCore = visualViewerService['getCore'];
    containerDiv = mockElementRef.nativeElement as HTMLDivElement;
  });

  describe('constructor', () => {
    it('should bootstrap UI5, load libraries, add UIArea and add viewport', (done) => {
      viewportAdded$.subscribe(() => {
        expect(isUi5BootStrapped()).toEqual(true);
        expect(getCore()).toBeTruthy();

        expect(getCore().getLoadedLibraries()).toBeTruthy();
        [
          'sap.m',
          'sap.ui.layout',
          'sap.ui.vk',
          'sap.ui.richtexteditor',
        ].forEach((libraryName) =>
          expect(getCore().getLoadedLibraries()[libraryName]).toBeTruthy()
        );

        expect(containerDiv.getAttribute('data-sap-ui-area')).toEqual(
          visualViewerContainerId
        );

        done();
      });
    });
  });

  describe('backgroundTopColor', () => {
    it('should do nothing when not running in browser', () => {
      visualViewerService['_backgroundTopColor'] = 'red';
      expect(visualViewerService.backgroundTopColor).toEqual('red');
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );

      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.backgroundTopColor = 'blue';
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.backgroundTopColor).toEqual('red');
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when value has not changed', () => {
      visualViewerService['_backgroundTopColor'] = 'red';
      expect(visualViewerService.backgroundTopColor).toEqual('red');
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      visualViewerService.backgroundTopColor = 'red';
      expect(visualViewerService.backgroundTopColor).toEqual('red');
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should call setBackgroundColorTop on viewport (after scene has loaded) when value has changed', () => {
      visualViewerService['_backgroundTopColor'] = 'red';
      expect(visualViewerService.backgroundTopColor).toEqual('red');

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockViewport = {
        setBackgroundColorTop: (_color: string) => {},
      };

      const getCSSColorSpy = spyOn<any>(
        visualViewerService,
        'getCSSColor'
      ).and.returnValue('#ffffff');
      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);
      const viewportSetBackgroundColorTopSpy = spyOn(
        mockViewport,
        'setBackgroundColorTop'
      );

      visualViewerService.backgroundTopColor = '--cx-color-inverse';

      expect(visualViewerService.backgroundTopColor).toEqual(
        '--cx-color-inverse'
      );
      expect(getCSSColorSpy).toHaveBeenCalledTimes(1);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(viewportSetBackgroundColorTopSpy).toHaveBeenCalledWith('#ffffff');
      expect(viewportSetBackgroundColorTopSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('backgroundBottomColor', () => {
    it('should do nothing when not running in browser', () => {
      visualViewerService['_backgroundBottomColor'] = 'red';
      expect(visualViewerService.backgroundBottomColor).toEqual('red');
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );

      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.backgroundBottomColor = 'blue';
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.backgroundBottomColor).toEqual('red');
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when value has not changed', () => {
      visualViewerService['_backgroundBottomColor'] = 'red';
      expect(visualViewerService.backgroundBottomColor).toEqual('red');
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      visualViewerService.backgroundBottomColor = 'red';
      expect(visualViewerService.backgroundBottomColor).toEqual('red');
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should call setBackgroundColorBottom on viewport (after scene has loaded) when value has changed', () => {
      visualViewerService['_backgroundBottomColor'] = 'red';
      expect(visualViewerService.backgroundBottomColor).toEqual('red');

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockViewport = {
        setBackgroundColorBottom: (_color: string) => {},
      };

      const getCSSColorSpy = spyOn<any>(
        visualViewerService,
        'getCSSColor'
      ).and.returnValue('#ffffff');
      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);
      const viewportSetBackgroundColorBottomSpy = spyOn(
        mockViewport,
        'setBackgroundColorBottom'
      );

      visualViewerService.backgroundBottomColor = '--cx-color-inverse';

      expect(visualViewerService.backgroundBottomColor).toEqual(
        '--cx-color-inverse'
      );
      expect(getCSSColorSpy).toHaveBeenCalledTimes(1);
      expect(getCSSColorSpy).toHaveBeenCalledWith('--cx-color-inverse');
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(viewportSetBackgroundColorBottomSpy).toHaveBeenCalledTimes(1);
      expect(viewportSetBackgroundColorBottomSpy).toHaveBeenCalledWith(
        '#ffffff'
      );
    });
  });

  describe('hotspotSelectionColor', () => {
    it('should do nothing when not running in browser', () => {
      visualViewerService['_hotspotSelectionColor'] = 'red';
      expect(visualViewerService.hotspotSelectionColor).toEqual('red');
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );

      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.hotspotSelectionColor = 'blue';
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.hotspotSelectionColor).toEqual('red');
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when value has not changed', () => {
      visualViewerService['_hotspotSelectionColor'] = 'red';
      expect(visualViewerService.hotspotSelectionColor).toEqual('red');

      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      visualViewerService.hotspotSelectionColor = 'red';
      expect(visualViewerService.hotspotSelectionColor).toEqual('red');

      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should call setHighlightColor on viewStateManager (after scene has loaded) when value has changed', () => {
      visualViewerService['_hotspotSelectionColor'] = 'red';
      expect(visualViewerService.hotspotSelectionColor).toEqual('red');

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockViewStateManager = {
        setHighlightColor: (_color: string) => {},
      };

      const getCSSColorSpy = spyOn<any>(visualViewerService, 'getCSSColor');
      const getViewStateManagerPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewStateManager',
        'get'
      ).and.returnValue(mockViewStateManager);
      const viewStateManagerSetHighlightColorSpy = spyOn(
        mockViewStateManager,
        'setHighlightColor'
      );

      visualViewerService.hotspotSelectionColor = '--cx-color-inverse';

      expect(visualViewerService.hotspotSelectionColor).toEqual(
        '--cx-color-inverse'
      );
      expect(getCSSColorSpy).toHaveBeenCalledTimes(1);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewStateManagerPropertySpy).toHaveBeenCalledTimes(1);
      expect(viewStateManagerSetHighlightColorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('showAllHotspotsEnabled', () => {
    it('should do nothing when not running in browser', () => {
      visualViewerService['_showAllHotspotsEnabled'] = false;
      expect(visualViewerService.showAllHotspotsEnabled).toEqual(false);
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.showAllHotspotsEnabled = true;
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.showAllHotspotsEnabled).toEqual(false);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when value has not changed', () => {
      visualViewerService['_showAllHotspotsEnabled'] = false;
      expect(visualViewerService.showAllHotspotsEnabled).toEqual(false);
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      visualViewerService.showAllHotspotsEnabled = false;
      expect(visualViewerService.showAllHotspotsEnabled).toEqual(false);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should call applyInclusionStyle (after scene has loaded) when value has changed', () => {
      visualViewerService['_showAllHotspotsEnabled'] = false;
      expect(visualViewerService.showAllHotspotsEnabled).toEqual(false);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const applyInclusionStyleSpy = spyOn<any>(
        visualViewerService,
        'applyInclusionStyle'
      );

      visualViewerService.showAllHotspotsEnabled = true;

      expect(visualViewerService.showAllHotspotsEnabled).toEqual(true);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(applyInclusionStyleSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('showAllHotspotsColor', () => {
    it('should do nothing when not running in browser', () => {
      visualViewerService['_showAllHotspotsColor'] = 'red';
      expect(visualViewerService.showAllHotspotsColor).toEqual('red');
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.showAllHotspotsColor = 'blue';
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.showAllHotspotsColor).toEqual('red');
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when value has not changed', () => {
      visualViewerService['_showAllHotspotsColor'] = 'red';
      expect(visualViewerService.showAllHotspotsColor).toEqual('red');
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      visualViewerService.showAllHotspotsColor = 'red';
      expect(visualViewerService.showAllHotspotsColor).toEqual('red');
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should call setShowAllHotspotsTintColor on viewport when value has changed', () => {
      visualViewerService['_showAllHotspotsColor'] = 'red';
      expect(visualViewerService.showAllHotspotsColor).toEqual('red');

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockViewport = {
        setShowAllHotspotsTintColor: (_color: string) => {},
      };

      const getCSSColorSpy = spyOn<any>(visualViewerService, 'getCSSColor');
      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);
      const viewportSetShowAllHotspotsTintColorSpy = spyOn(
        mockViewport,
        'setShowAllHotspotsTintColor'
      );

      visualViewerService.showAllHotspotsColor = '--cx-color-inverse';

      expect(visualViewerService.showAllHotspotsColor).toEqual(
        '--cx-color-inverse'
      );
      expect(getCSSColorSpy).toHaveBeenCalledTimes(1);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(viewportSetShowAllHotspotsTintColorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('outlineColor', () => {
    it('should do nothing when not running in browser', () => {
      visualViewerService['_outlineColor'] = 'red';
      expect(visualViewerService.outlineColor).toEqual('red');
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.outlineColor = 'blue';
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.outlineColor).toEqual('red');
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when value has not changed', () => {
      visualViewerService['_outlineColor'] = 'red';
      expect(visualViewerService.outlineColor).toEqual('red');
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      visualViewerService.outlineColor = 'red';
      expect(visualViewerService.outlineColor).toEqual('red');
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should call setOutlineColor (after scene has loaded) when value has changed', () => {
      visualViewerService['_outlineColor'] = 'red';
      expect(visualViewerService.outlineColor).toEqual('red');

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockViewStateManager = {
        setOutlineColor: (_color: string) => {},
      };

      const getCSSColorSpy = spyOn<any>(visualViewerService, 'getCSSColor');
      const getViewStateManagerPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewStateManager',
        'get'
      ).and.returnValue(mockViewStateManager);
      const viewStateManagerSetOutlineColorSpy = spyOn(
        mockViewStateManager,
        'setOutlineColor'
      );

      visualViewerService.outlineColor = '--cx-color-inverse';

      expect(visualViewerService.outlineColor).toEqual('--cx-color-inverse');
      expect(getCSSColorSpy).toHaveBeenCalledTimes(1);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewStateManagerPropertySpy).toHaveBeenCalledTimes(1);
      expect(viewStateManagerSetOutlineColorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('outlineWidth', () => {
    it('should do nothing when not running in browser', () => {
      visualViewerService['_outlineWidth'] = 4;
      expect(visualViewerService.outlineWidth).toEqual(4);
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.outlineWidth = 8;
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.outlineWidth).toEqual(4);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when value has not changed', () => {
      visualViewerService['_outlineWidth'] = 4;
      expect(visualViewerService.outlineWidth).toEqual(4);
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );

      visualViewerService.outlineWidth = 4;

      expect(visualViewerService.outlineWidth).toEqual(4);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should call setOutlineWidth on viewStateManager (after scene has loaded) when value has changed', () => {
      visualViewerService['_outlineWidth'] = 4;
      expect(visualViewerService.outlineWidth).toEqual(4);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockViewStateManager = {
        setOutlineWidth: (_outlineWidth: number) => {},
      };

      const getViewStateManagerPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewStateManager',
        'get'
      ).and.returnValue(mockViewStateManager);
      const viewStateManagerSetOutlineWidthSpy = spyOn(
        mockViewStateManager,
        'setOutlineWidth'
      );

      visualViewerService.outlineWidth = 10;

      expect(visualViewerService.outlineWidth).toEqual(10);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewStateManagerPropertySpy).toHaveBeenCalledTimes(1);
      expect(viewStateManagerSetOutlineWidthSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('selectionMode', () => {
    it('should do nothing when not running in browser', () => {
      visualViewerService['_selectionMode'] = SelectionMode.Exclusive;
      expect(visualViewerService.selectionMode).toEqual(
        SelectionMode.Exclusive
      );
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.selectionMode = SelectionMode.Sticky;
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.selectionMode).toEqual(
        SelectionMode.Exclusive
      );
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when value has not changed', () => {
      visualViewerService['_selectionMode'] = SelectionMode.Exclusive;
      expect(visualViewerService.selectionMode).toEqual(
        SelectionMode.Exclusive
      );
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      visualViewerService.selectionMode = SelectionMode.Exclusive;
      expect(visualViewerService.selectionMode).toEqual(
        SelectionMode.Exclusive
      );
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should call setSelectionMode on viewport (after scene has loaded) when value has changed', () => {
      visualViewerService['_selectionMode'] = SelectionMode.Exclusive;
      expect(visualViewerService.selectionMode).toEqual(
        SelectionMode.Exclusive
      );

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockViewPort = {
        setSelectionMode: (_selectionMode: SelectionMode) => {},
      };

      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewPort);
      const viewportSetSelectionModeSpy = spyOn(
        mockViewPort,
        'setSelectionMode'
      );

      visualViewerService.selectionMode = SelectionMode.Sticky;

      expect(visualViewerService.selectionMode).toEqual(SelectionMode.Sticky);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(viewportSetSelectionModeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('selectedProductCodes', () => {
    it('should get scene node ids for selected product codes and produce next selectedNodeIds$ value', () => {
      visualViewerService['_selectedProductCodes'] = [];
      expect(visualViewerService.selectedProductCodes).toEqual([]);

      const sceneNodeIds = ['sceneNode1', 'sceneNode2'];
      const lookupNodeIdsReturnValue = of(sceneNodeIds);

      const mockSceneNodeToProductLookupService = {
        lookupNodeIds: (_productCodes: string[]) => lookupNodeIdsReturnValue,
      };
      const sceneNodeToProductLookupServicePropertySpy = spyOnProperty<any>(
        visualViewerService,
        'sceneNodeToProductLookupService',
        'get'
      ).and.returnValue(mockSceneNodeToProductLookupService);

      const lookupNodeIdsSpy = spyOn(
        mockSceneNodeToProductLookupService,
        'lookupNodeIds'
      ).and.callThrough();

      const selectedNodeIds$ = visualViewerService['selectedNodeIds$'];
      const selectedNodeIdsNextSpy = spyOn(selectedNodeIds$, 'next');

      visualViewerService.selectedProductCodes = [
        'productCode1',
        'productCode2',
      ];

      expect(visualViewerService.selectedProductCodes).toEqual([
        'productCode1',
        'productCode2',
      ]);
      expect(sceneNodeToProductLookupServicePropertySpy).toHaveBeenCalledTimes(
        1
      );
      expect(lookupNodeIdsSpy).toHaveBeenCalledTimes(1);
      expect(selectedNodeIdsNextSpy).toHaveBeenCalledTimes(1);
      expect(selectedNodeIdsNextSpy).toHaveBeenCalledWith(sceneNodeIds);
    });

    it('should do nothing when not running in browser', () => {
      visualViewerService['_selectedProductCodes'] = [];
      expect(visualViewerService.selectedProductCodes).toEqual([]);

      const sceneNodeIds = ['sceneNode1', 'sceneNode2'];
      const lookupNodeIdsReturnValue = of(sceneNodeIds);

      const mockSceneNodeToProductLookupService = {
        lookupNodeIds: (_productCodes: string[]) => lookupNodeIdsReturnValue,
      };
      const sceneNodeToProductLookupServicePropertySpy = spyOnProperty<any>(
        visualViewerService,
        'sceneNodeToProductLookupService',
        'get'
      ).and.returnValue(mockSceneNodeToProductLookupService);

      const lookupNodeIdsSpy = spyOn(
        mockSceneNodeToProductLookupService,
        'lookupNodeIds'
      ).and.callThrough();

      const selectedNodeIds$ = visualViewerService['selectedNodeIds$'];
      const selectedNodeIdsNextSpy = spyOn(selectedNodeIds$, 'next');

      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);

      visualViewerService.selectedProductCodes = [
        'productCode1',
        'productCode2',
      ];

      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.selectedProductCodes).toEqual([]);
      expect(sceneNodeToProductLookupServicePropertySpy).toHaveBeenCalledTimes(
        0
      );
      expect(lookupNodeIdsSpy).toHaveBeenCalledTimes(0);
      expect(selectedNodeIdsNextSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('includedProductCodes', () => {
    it('should do nothing when not running in browser', () => {
      visualViewerService['_includedProductCodes'] = [];
      expect(visualViewerService.includedProductCodes).toEqual([]);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const applyInclusionStyleSpy = spyOn<any>(
        visualViewerService,
        'applyInclusionStyle'
      );

      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.includedProductCodes = [
        'productCode1',
        'productCode2',
      ];
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.includedProductCodes).toEqual([]);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
      expect(applyInclusionStyleSpy).toHaveBeenCalledTimes(0);
    });

    it('should call applyInclusionStyle (after scene has loaded)', () => {
      visualViewerService['_includedProductCodes'] = [];
      expect(visualViewerService.includedProductCodes).toEqual([]);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const applyInclusionStyleSpy = spyOn<any>(
        visualViewerService,
        'applyInclusionStyle'
      );

      visualViewerService.includedProductCodes = [
        'productCode1',
        'productCode2',
      ];

      expect(visualViewerService.includedProductCodes).toEqual([
        'productCode1',
        'productCode2',
      ]);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(applyInclusionStyleSpy).toHaveBeenCalledTimes(1);
    });

    it('should call applyInclusionStyle (after scene has loaded)', () => {
      visualViewerService['_includedProductCodes'] = [];
      expect(visualViewerService.includedProductCodes).toEqual([]);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const applyInclusionStyleSpy = spyOn<any>(
        visualViewerService,
        'applyInclusionStyle'
      );

      visualViewerService.includedProductCodes = [
        'productCode1',
        'productCode2',
      ];

      expect(visualViewerService.includedProductCodes).toEqual([
        'productCode1',
        'productCode2',
      ]);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(applyInclusionStyleSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('excludedOpacity', () => {
    it('should store passed value in private field', () => {
      expect(visualViewerService.excludedOpacity).toEqual(
        visualViewerService['DEFAULT_EXCLUDED_OPACITY']
      );
      visualViewerService.excludedOpacity = 0.75;
      expect(visualViewerService.excludedOpacity).toEqual(0.75);
    });
  });

  describe('animationTotalDuration', () => {
    it('should return 0 when animationPlayer not set', () => {
      const animationPlayer = visualViewerService['animationPlayer'];
      expect(animationPlayer).toEqual(undefined); // does not get populated until a scene is loaded

      const animationTotalDuration = visualViewerService.animationTotalDuration;

      expect(animationTotalDuration).toEqual(0);
    });

    it('should return animationPlayer.getTotalDuration() when animationPlayer set', () => {
      const mockAnimationPlayer = {
        getTotalDuration: () => 5,
      };

      const getAnimationPlayerPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'animationPlayer'
      ).and.returnValue(mockAnimationPlayer);

      const animationTotalDuration = visualViewerService.animationTotalDuration;

      expect(animationTotalDuration).toEqual(5);
      expect(getAnimationPlayerPropertySpy).toHaveBeenCalled();
    });
  });

  describe('animationPosition', () => {
    it('should do nothing when not running in browser', () => {
      expect(visualViewerService.animationPosition).toEqual(0);

      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.animationPosition = 1;
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.animationPosition).toEqual(0);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should not do anything when value has not changed', () => {
      expect(visualViewerService.animationPosition).toEqual(0);

      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );

      visualViewerService.animationPosition = 0;

      expect(visualViewerService.animationPosition).toEqual(0);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should calculate time from position and total duration and call animationPlayerSetTime (after scene has loaded) when value has changed', () => {
      expect(visualViewerService.animationPosition).toEqual(0);

      const mockAnimationPlayer = {
        getTotalDuration: () => 5,
      };
      const animationPlayerPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'animationPlayer',
        'get'
      ).and.returnValue(mockAnimationPlayer);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const animationPlayerSetTimeSpy = spyOn<any>(
        visualViewerService,
        'animationPlayerSetTime'
      );

      visualViewerService.animationPosition = 0.5;
      expect(visualViewerService.animationPosition).toEqual(0.5);

      expect(animationPlayerPropertySpy).toHaveBeenCalledTimes(1);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(animationPlayerSetTimeSpy).toHaveBeenCalledTimes(1);
      expect(animationPlayerSetTimeSpy).toHaveBeenCalledWith(2.5, false);
    });
  });

  describe('animationPlaying', () => {
    it('should do nothing when not running in browser', () => {
      expect(visualViewerService.animationPlaying).toEqual(false);

      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.animationPlaying = true;
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService.animationPlaying).toEqual(false);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('should not do anything when the value has not changed', () => {
      expect(visualViewerService.animationPlaying).toEqual(false);

      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );

      visualViewerService.animationPlaying = false;

      expect(visualViewerService.animationPlaying).toEqual(false);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(0);
    });

    it('when the value is being set to true and the animation position is at end of animation, play from the beginning', () => {
      expect(visualViewerService.animationPlaying).toEqual(false);
      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const getAnimationPositionPropertySpy = spyOnProperty(
        visualViewerService,
        'animationPosition',
        'get'
      ).and.returnValue(1); // at end position

      const getAnimationPlayerSetTimeSpy = spyOn<any>(
        visualViewerService,
        'animationPlayerSetTime'
      );

      const mockAnimationPlayer = {
        play: () => {},
        stop: () => {},
      };

      const getAnimationPlayerProperty = spyOnProperty<any>(
        visualViewerService,
        'animationPlayer',
        'get'
      ).and.returnValue(mockAnimationPlayer);

      const playSpy = spyOn(mockAnimationPlayer, 'play');
      const stopSpy = spyOn(mockAnimationPlayer, 'stop');

      const animationPlayingChangeEmitSpy = spyOn(
        visualViewerService.animationPlayingChange,
        'emit'
      );

      visualViewerService.animationPlaying = true;

      expect(visualViewerService.animationPlaying).toEqual(true);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getAnimationPositionPropertySpy).toHaveBeenCalledTimes(1);
      expect(getAnimationPlayerProperty).toHaveBeenCalled();
      expect(getAnimationPlayerSetTimeSpy).toHaveBeenCalledTimes(1);
      expect(getAnimationPlayerSetTimeSpy).toHaveBeenCalledWith(0, false); // Set to start position
      expect(playSpy).toHaveBeenCalledTimes(1);
      expect(stopSpy).toHaveBeenCalledTimes(0);
      expect(animationPlayingChangeEmitSpy).toHaveBeenCalledTimes(1);
      expect(animationPlayingChangeEmitSpy).toHaveBeenCalledWith(true);
    });

    it('when the value is being set to true and the animation position is not at end of animation, play from the current position', () => {
      expect(visualViewerService.animationPlaying).toEqual(false);
      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const getAnimationPositionPropertySpy = spyOnProperty(
        visualViewerService,
        'animationPosition',
        'get'
      ).and.returnValue(0.75);

      const getAnimationPlayerSetTimeSpy = spyOn<any>(
        visualViewerService,
        'animationPlayerSetTime'
      );

      const mockAnimationPlayer = {
        play: () => {},
        stop: () => {},
      };

      const getAnimationPlayerProperty = spyOnProperty<any>(
        visualViewerService,
        'animationPlayer',
        'get'
      ).and.returnValue(mockAnimationPlayer);

      const playSpy = spyOn(mockAnimationPlayer, 'play');
      const stopSpy = spyOn(mockAnimationPlayer, 'stop');

      const animationPlayingChangeEmitSpy = spyOn(
        visualViewerService.animationPlayingChange,
        'emit'
      );

      visualViewerService.animationPlaying = true;

      expect(visualViewerService.animationPlaying).toEqual(true);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getAnimationPositionPropertySpy).toHaveBeenCalledTimes(1);
      expect(getAnimationPlayerProperty).toHaveBeenCalled();
      expect(getAnimationPlayerSetTimeSpy).toHaveBeenCalledTimes(0);
      expect(playSpy).toHaveBeenCalledTimes(1);
      expect(stopSpy).toHaveBeenCalledTimes(0);
      expect(animationPlayingChangeEmitSpy).toHaveBeenCalledTimes(1);
      expect(animationPlayingChangeEmitSpy).toHaveBeenCalledWith(true);
    });

    it('when the value is being set to false, pause the animation playback', () => {
      visualViewerService['_animationPlaying'] = true;
      expect(visualViewerService.animationPlaying).toEqual(true);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const getAnimationPositionPropertySpy = spyOnProperty(
        visualViewerService,
        'animationPosition',
        'get'
      ).and.returnValue(0.75);

      const getAnimationPlayerSetTimeSpy = spyOn<any>(
        visualViewerService,
        'animationPlayerSetTime'
      );

      const mockAnimationPlayer = {
        play: () => {},
        stop: () => {},
      };

      const getAnimationPlayerProperty = spyOnProperty<any>(
        visualViewerService,
        'animationPlayer',
        'get'
      ).and.returnValue(mockAnimationPlayer);

      const playSpy = spyOn(mockAnimationPlayer, 'play');
      const stopSpy = spyOn(mockAnimationPlayer, 'stop');

      const animationPlayingChangeEmitSpy = spyOn(
        visualViewerService.animationPlayingChange,
        'emit'
      );

      visualViewerService.animationPlaying = false;

      expect(visualViewerService.animationPlaying).toEqual(false);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getAnimationPositionPropertySpy).toHaveBeenCalledTimes(0);
      expect(getAnimationPlayerProperty).toHaveBeenCalled();
      expect(getAnimationPlayerSetTimeSpy).toHaveBeenCalledTimes(0);
      expect(playSpy).toHaveBeenCalledTimes(0);
      expect(stopSpy).toHaveBeenCalledTimes(1);
      expect(animationPlayingChangeEmitSpy).toHaveBeenCalledTimes(1);
      expect(animationPlayingChangeEmitSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('navigationMode', () => {
    it('should do nothing when not running in browser', () => {
      visualViewerService['_navigationMode'] = NavigationMode.Zoom;
      expect(visualViewerService.navigationMode).toEqual(NavigationMode.Zoom);

      const spyOnExecuteWhenSceneLoaded = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.navigationMode = NavigationMode.Pan;
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerService['_navigationMode']).toEqual(
        NavigationMode.Zoom
      );
      expect(spyOnExecuteWhenSceneLoaded).toHaveBeenCalledTimes(0);
    });

    it('should not do anything when the value has not changed', () => {
      visualViewerService['_navigationMode'] = NavigationMode.Zoom;
      expect(visualViewerService.navigationMode).toEqual(NavigationMode.Zoom);

      const spyOnExecuteWhenSceneLoaded = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      visualViewerService.navigationMode = NavigationMode.Zoom;
      expect(visualViewerService.navigationMode).toEqual(NavigationMode.Zoom);
      expect(spyOnExecuteWhenSceneLoaded).toHaveBeenCalledTimes(0);
    });

    it('should set navigation mode when value has changed', () => {
      // sap.ui.vk library will have a public API to set the navigation mode in a future UI5 version
      visualViewerService['_navigationMode'] = NavigationMode.Zoom;
      expect(visualViewerService.navigationMode).toEqual(NavigationMode.Zoom);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockDrawerToolbar = {
        _activateGesture: (
          _viewport: any,
          _navigationMode: NavigationMode
        ) => {},
      };

      const mockViewportImplementation = {};
      const mockViewport = {
        getImplementation: () => {
          return mockViewportImplementation;
        },
      };

      const getDrawerToolbarPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'drawerToolbar',
        'get'
      ).and.returnValue(mockDrawerToolbar);

      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);

      const mockDrawerToolbar_activateGestureSpy = spyOn(
        mockDrawerToolbar,
        '_activateGesture'
      );

      visualViewerService.navigationMode = NavigationMode.Pan;

      expect(visualViewerService.navigationMode).toEqual(NavigationMode.Pan);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getDrawerToolbarPropertySpy).toHaveBeenCalled();
      expect(getViewportPropertySpy).toHaveBeenCalled();
      expect(mockDrawerToolbar_activateGestureSpy).toHaveBeenCalledTimes(1);
      expect(mockDrawerToolbar_activateGestureSpy).toHaveBeenCalledWith(
        mockViewportImplementation,
        NavigationMode.Pan
      );
    });
  });

  describe('isolateModeEnabled', () => {
    it('should do nothing when not running in browser', () => {
      expect(visualViewerService.isolateModeEnabled).toEqual(false);

      const visualViewerServiceExecuteWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );

      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.isolateModeEnabled = true;
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);

      expect(visualViewerService.isolateModeEnabled).toEqual(false);
      expect(
        visualViewerServiceExecuteWhenSceneLoadedSpy
      ).toHaveBeenCalledTimes(0);
    });

    it('should do nothing when value has not changed', () => {
      expect(visualViewerService.isolateModeEnabled).toEqual(false);

      const visualViewerServiceExecuteWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );

      visualViewerService.isolateModeEnabled = false;

      expect(visualViewerService.isolateModeEnabled).toEqual(false);
      expect(
        visualViewerServiceExecuteWhenSceneLoadedSpy
      ).toHaveBeenCalledTimes(0);
    });

    it('should save view info, call isolateNodes, passing selected nodes and emit isolateModeEnabledChange if isolate mode being enabled when in 2D mode', () => {
      expect(visualViewerService.isolateModeEnabled).toEqual(false);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockViewInfo = {};
      const mockViewport = {
        getViewInfo: (query?: {
          camera?:
            | boolean
            | {
                matrices?: boolean;
                useTransitionCamera?: boolean;
              };

          animation?: boolean;

          visibility?:
            | boolean
            | {
                mode?: VisibilityMode;
              };
          selection?: boolean | object;
        }) => {
          expect(query).toBeTruthy();
          expect(query?.camera).toEqual(true);
          expect(query?.visibility).toEqual(true);
          expect(query?.animation).toBeUndefined();
          expect(query?.selection).toBeUndefined();
          return mockViewInfo;
        },
      };

      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);

      const getViewInfoSpy = spyOn(
        mockViewport,
        'getViewInfo'
      ).and.callThrough();

      const setVisualViewerServiceViewPriorToIsolateViewInfoSpy =
        spyOnProperty<any>(
          visualViewerService,
          'viewPriorToIsolateViewInfo',
          'set'
        );

      const is2DPropertySpy = spyOnProperty(
        visualViewerService,
        'is2D',
        'get'
      ).and.returnValue(true);

      const mockNodeRef1 = {};
      const mockNodeRef2 = {};
      const selectedNodeRefs = [mockNodeRef1, mockNodeRef2];

      const mockViewStateManager = {
        enumerateSelection: (callback: (nodeRef: NodeRef) => void): void => {
          selectedNodeRefs.forEach(callback);
        },
      };

      const isolateNodesSpy = spyOn<any>(visualViewerService, 'isolateNodes');

      const getViewStateManagerPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewStateManager',
        'get'
      ).and.returnValue(mockViewStateManager);

      const isolateModeEnabledChangeEmitSpy = spyOn(
        visualViewerService['isolateModeEnabledChange'],
        'emit'
      );

      visualViewerService.isolateModeEnabled = true;

      expect(visualViewerService.isolateModeEnabled).toEqual(true);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(getViewInfoSpy).toHaveBeenCalledTimes(1);
      expect(
        setVisualViewerServiceViewPriorToIsolateViewInfoSpy
      ).toHaveBeenCalledTimes(1);
      expect(
        setVisualViewerServiceViewPriorToIsolateViewInfoSpy
      ).toHaveBeenCalledWith(mockViewInfo);
      expect(is2DPropertySpy).toHaveBeenCalledTimes(1);
      expect(getViewStateManagerPropertySpy).toHaveBeenCalledTimes(1);
      expect(isolateNodesSpy).toHaveBeenCalledTimes(1);
      expect(isolateNodesSpy).toHaveBeenCalledWith(selectedNodeRefs);
      expect(isolateModeEnabledChangeEmitSpy).toHaveBeenCalledTimes(1);
    });

    it('should save view info, call isolateNodes, passing outlined nodes and emit isolateModeEnabledChange if isolate mode being enabled when in 3D mode', () => {
      expect(visualViewerService.isolateModeEnabled).toEqual(false);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockViewInfo = {};
      const mockViewport = {
        getViewInfo: (query?: {
          camera?:
            | boolean
            | {
                matrices?: boolean;
                useTransitionCamera?: boolean;
              };

          animation?: boolean;

          visibility?:
            | boolean
            | {
                mode?: VisibilityMode;
              };
          selection?: boolean | object;
        }) => {
          expect(query).toBeTruthy();
          expect(query?.camera).toEqual(true);
          expect(query?.visibility).toEqual(true);
          expect(query?.animation).toBeUndefined();
          expect(query?.selection).toBeUndefined();
          return mockViewInfo;
        },
      };

      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);

      const getViewInfoSpy = spyOn(
        mockViewport,
        'getViewInfo'
      ).and.callThrough();

      const setVisualViewerServiceViewPriorToIsolateViewInfoSpy =
        spyOnProperty<any>(
          visualViewerService,
          'viewPriorToIsolateViewInfo',
          'set'
        );

      const is2DPropertySpy = spyOnProperty(
        visualViewerService,
        'is2D',
        'get'
      ).and.returnValue(false);

      const mockNodeRef1 = {};
      const mockNodeRef2 = {};
      const outlinedNodeRefs = [mockNodeRef1, mockNodeRef2];

      const mockViewStateManager = {
        enumerateOutlinedNodes: (
          callback: (nodeRef: NodeRef) => void
        ): void => {
          outlinedNodeRefs.forEach(callback);
        },
      };

      const isolateNodesSpy = spyOn<any>(visualViewerService, 'isolateNodes');

      const getViewStateManagerPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewStateManager',
        'get'
      ).and.returnValue(mockViewStateManager);

      const isolateModeEnabledChangeEmitSpy = spyOn(
        visualViewerService['isolateModeEnabledChange'],
        'emit'
      );

      visualViewerService.isolateModeEnabled = true;

      expect(visualViewerService.isolateModeEnabled).toEqual(true);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(getViewInfoSpy).toHaveBeenCalledTimes(1);
      expect(
        setVisualViewerServiceViewPriorToIsolateViewInfoSpy
      ).toHaveBeenCalledTimes(1);
      expect(
        setVisualViewerServiceViewPriorToIsolateViewInfoSpy
      ).toHaveBeenCalledWith(mockViewInfo);
      expect(is2DPropertySpy).toHaveBeenCalledTimes(1);
      expect(getViewStateManagerPropertySpy).toHaveBeenCalledTimes(1);
      expect(isolateNodesSpy).toHaveBeenCalledTimes(1);
      expect(isolateNodesSpy).toHaveBeenCalledWith(outlinedNodeRefs);
      expect(isolateModeEnabledChangeEmitSpy).toHaveBeenCalledTimes(1);
    });

    it('should restore view info that was saved on entering isolate mode and emit isolateModeEnabledChange if isolate mode being exited', () => {
      visualViewerService['_isolateModeEnabled'] = true;
      expect(visualViewerService.isolateModeEnabled).toEqual(true);

      const mockExecuteWhenSceneLoaded = (callback: () => void) => {
        callback();
      };
      const executeWhenSceneLoadedSpy = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      ).and.callFake(mockExecuteWhenSceneLoaded);

      const mockViewInfo = {};

      const mockViewport = {
        setViewInfo: (_viewInfo: any, _flyToDuration: number) => {},
      };

      const setViewInfoSpy = spyOn(mockViewport, 'setViewInfo');

      const getViewPriorToIsolateViewInfoPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewPriorToIsolateViewInfo',
        'get'
      ).and.returnValue(mockViewInfo);

      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);

      const isolateModeEnabledChangeEmitSpy = spyOn(
        visualViewerService['isolateModeEnabledChange'],
        'emit'
      );

      visualViewerService.isolateModeEnabled = false;

      expect(visualViewerService.isolateModeEnabled).toEqual(false);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(getViewPriorToIsolateViewInfoPropertySpy).toHaveBeenCalledTimes(1);
      expect(setViewInfoSpy).toHaveBeenCalledTimes(1);
      expect(setViewInfoSpy).toHaveBeenCalledWith(
        mockViewInfo,
        visualViewerService['DEFAULT_FLY_TO_DURATION']
      );
      expect(isolateModeEnabledChangeEmitSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('is2D', () => {
    it('should return value set by setIs2D', () => {
      const setIs2D = visualViewerService['setIs2D'].bind(visualViewerService);

      setIs2D(true);
      expect(visualViewerService.is2D).toEqual(true);

      setIs2D(false);
      expect(visualViewerService.is2D).toEqual(false);
    });
  });

  describe('viewportReady', () => {
    it('should return value set by setViewportReady', () => {
      expect(visualViewerService.viewportReady).toEqual(false);

      const setViewportReady =
        visualViewerService['setViewportReady'].bind(visualViewerService);

      setViewportReady(true);
      expect(visualViewerService.viewportReady).toEqual(true);

      setViewportReady(false);
      expect(visualViewerService.viewportReady).toEqual(false);
    });
  });

  describe('setViewportReady', () => {
    it('should not do anything if value has not changed', () => {
      expect(visualViewerService.viewportReady).toEqual(false);

      const setViewportReady =
        visualViewerService['setViewportReady'].bind(visualViewerService);

      const viewportReadyChangeEmitSpy = spyOn(
        visualViewerService.viewportReadyChange,
        'emit'
      );
      setViewportReady(false);

      expect(viewportReadyChangeEmitSpy).toHaveBeenCalledTimes(0);
    });

    it('should emit viewportReadyChange when value has changed', () => {
      expect(visualViewerService.viewportReady).toEqual(false);

      const setViewportReady =
        visualViewerService['setViewportReady'].bind(visualViewerService);

      const viewportReadyChangeEmitSpy = spyOn(
        visualViewerService.viewportReadyChange,
        'emit'
      );
      setViewportReady(true);

      expect(viewportReadyChangeEmitSpy).toHaveBeenCalledTimes(1);
      expect(viewportReadyChangeEmitSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('activateHomeView', () => {
    it('should do nothing when not running in browser', () => {
      const getIs2DPropertySpy = spyOnProperty(
        visualViewerService,
        'is2D',
        'get'
      ).and.returnValue(true);

      const mockViewport = {
        zoomTo: (
          what: ZoomTo | ZoomTo[],
          nodeRef: any,
          crossFadeSeconds: float,
          margin: float
        ) => {
          expect(what).toEqual(ZoomTo.All);
          expect(nodeRef).toEqual(null);
          expect(crossFadeSeconds).toEqual(
            visualViewerService['flyToDurationInSeconds']
          );
          expect(margin).toEqual(visualViewerService['zoomToMargin']);
        },
      };

      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);

      const zoomToSpy = spyOn(mockViewport, 'zoomTo').and.callThrough();

      const getIsolateModeEnabledPropertySpy = spyOnProperty(
        visualViewerService,
        'isolateModeEnabled',
        'get'
      ).and.returnValue(false);

      const isolateModeEnabledChange =
        visualViewerService['isolateModeEnabledChange'];
      const isolateModeEnabledChangeEmitSpy = spyOn(
        isolateModeEnabledChange,
        'emit'
      );

      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.activateHomeView();
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);

      expect(getIs2DPropertySpy).toHaveBeenCalledTimes(0);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(0);
      expect(zoomToSpy).toHaveBeenCalledTimes(0);
      expect(getIsolateModeEnabledPropertySpy).toHaveBeenCalledTimes(0);
      expect(isolateModeEnabledChangeEmitSpy).toHaveBeenCalledTimes(0);
    });

    it('should zoom to all if in 2D mode', () => {
      const getIs2DPropertySpy = spyOnProperty(
        visualViewerService,
        'is2D',
        'get'
      ).and.returnValue(true);

      const mockViewport = {
        zoomTo: (
          what: ZoomTo | ZoomTo[],
          nodeRef: any,
          crossFadeSeconds: float,
          margin: float
        ) => {
          expect(what).toEqual(ZoomTo.All);
          expect(nodeRef).toEqual(null);
          expect(crossFadeSeconds).toEqual(
            visualViewerService['flyToDurationInSeconds']
          );
          expect(margin).toEqual(visualViewerService['zoomToMargin']);
        },
      };

      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);

      const zoomToSpy = spyOn(mockViewport, 'zoomTo').and.callThrough();

      // We don't support isolate mode in 2D
      const getIsolateModeEnabledPropertySpy = spyOnProperty(
        visualViewerService,
        'isolateModeEnabled',
        'get'
      ).and.returnValue(false);

      const isolateModeEnabledChange =
        visualViewerService['isolateModeEnabledChange'];
      const isolateModeEnabledChangeEmitSpy = spyOn(
        isolateModeEnabledChange,
        'emit'
      );

      visualViewerService.activateHomeView();

      expect(getIs2DPropertySpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(zoomToSpy).toHaveBeenCalledTimes(1);
      expect(getIsolateModeEnabledPropertySpy).toHaveBeenCalledTimes(1);
      expect(isolateModeEnabledChangeEmitSpy).toHaveBeenCalledTimes(0);
    });

    it('should call setViewInfo using saved initial view info if in 3D mode and not in isolate mode', () => {
      const getIs2DPropertySpy = spyOnProperty(
        visualViewerService,
        'is2D',
        'get'
      ).and.returnValue(false);

      const mockViewport = {
        setViewInfo: (_viewInfo: any, _flyToDuration: number) => {},
      };

      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);

      const mockInitialViewInfo = {};
      const getInitialViewInfoPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'initialViewInfo'
      ).and.returnValue(mockInitialViewInfo);
      const getFlyToDurationInSecondsPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'flyToDurationInSeconds',
        'get'
      ).and.callThrough();

      const setViewInfoSpy = spyOn(mockViewport, 'setViewInfo');

      const getIsolateModeEnabledPropertySpy = spyOnProperty(
        visualViewerService,
        'isolateModeEnabled',
        'get'
      ).and.returnValue(false);

      const isolateModeEnabledChange =
        visualViewerService['isolateModeEnabledChange'];
      const isolateModeEnabledChangeEmitSpy = spyOn(
        isolateModeEnabledChange,
        'emit'
      );

      visualViewerService.activateHomeView();

      expect(getIs2DPropertySpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(getInitialViewInfoPropertySpy).toHaveBeenCalledTimes(1);
      expect(getFlyToDurationInSecondsPropertySpy).toHaveBeenCalledTimes(1);
      expect(setViewInfoSpy).toHaveBeenCalledTimes(1);
      expect(getIsolateModeEnabledPropertySpy).toHaveBeenCalledTimes(1);
      expect(isolateModeEnabledChangeEmitSpy).toHaveBeenCalledTimes(0);
    });

    it('should call setViewInfo using saved initial view info if in 3D mode and exit out of isolate mode if in isolate mode', () => {
      const getIs2DPropertySpy = spyOnProperty(
        visualViewerService,
        'is2D',
        'get'
      ).and.returnValue(false);

      const mockViewport = {
        setViewInfo: (_viewInfo: any, _flyToDuration: number) => {},
      };

      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);

      const mockInitialViewInfo = {};
      const getInitialViewInfoPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'initialViewInfo'
      ).and.returnValue(mockInitialViewInfo);
      const getFlyToDurationInSecondsPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'flyToDurationInSeconds'
      ).and.callThrough();

      const setViewInfoSpy = spyOn(mockViewport, 'setViewInfo');

      const getIsolateModeEnabledPropertySpy = spyOnProperty(
        visualViewerService,
        'isolateModeEnabled',
        'get'
      ).and.returnValue(true);

      const isolateModeEnabledChange =
        visualViewerService['isolateModeEnabledChange'];
      const isolateModeEnabledChangeEmitSpy = spyOn(
        isolateModeEnabledChange,
        'emit'
      );

      visualViewerService.activateHomeView();

      expect(getIs2DPropertySpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(getInitialViewInfoPropertySpy).toHaveBeenCalledTimes(1);
      expect(getFlyToDurationInSecondsPropertySpy).toHaveBeenCalledTimes(1);
      expect(setViewInfoSpy).toHaveBeenCalledTimes(1);
      expect(getIsolateModeEnabledPropertySpy).toHaveBeenCalledTimes(1);
      expect(isolateModeEnabledChangeEmitSpy).toHaveBeenCalledTimes(1);
      expect(isolateModeEnabledChangeEmitSpy).toHaveBeenCalledWith(false);
      expect(visualViewerService['_isolateModeEnabled']).toEqual(false);
    });
  });

  describe('playAnimation', () => {
    it('should do nothing when not running in browser', () => {
      const setAnimationPlayingPropertySpy = spyOnProperty(
        visualViewerService,
        'animationPlaying',
        'set'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.playAnimation();
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(setAnimationPlayingPropertySpy).toHaveBeenCalledTimes(0);
    });

    it('should set animationPlaying property to true', () => {
      const setAnimationPlayingPropertySpy = spyOnProperty(
        visualViewerService,
        'animationPlaying',
        'set'
      );

      visualViewerService.playAnimation();

      expect(setAnimationPlayingPropertySpy).toHaveBeenCalledTimes(1);
      expect(setAnimationPlayingPropertySpy).toHaveBeenCalledWith(true);
    });
  });

  describe('pauseAnimation', () => {
    it('should do nothing when not running in browser', () => {
      const setAnimationPlayingPropertySpy = spyOnProperty(
        visualViewerService,
        'animationPlaying',
        'set'
      );
      const isBrowserSpy = spyOn(windowRef, 'isBrowser').and.returnValue(false);
      visualViewerService.pauseAnimation();
      expect(isBrowserSpy).toHaveBeenCalledTimes(1);
      expect(setAnimationPlayingPropertySpy).toHaveBeenCalledTimes(0);
    });

    it('should set animationPlaying property to false', () => {
      const setAnimationPlayingPropertySpy = spyOnProperty(
        visualViewerService,
        'animationPlaying',
        'set'
      );

      visualViewerService.pauseAnimation();

      expect(setAnimationPlayingPropertySpy).toHaveBeenCalledTimes(1);
      expect(setAnimationPlayingPropertySpy).toHaveBeenCalledWith(false);
    });
  });

  describe('setInitialProperties', () => {
    it('should set initial values when values have not been set', () => {
      expect(visualViewerService.backgroundTopColor).toBeUndefined();
      expect(visualViewerService.backgroundBottomColor).toBeUndefined();
      expect(visualViewerService.hotspotSelectionColor).toBeUndefined();
      expect(visualViewerService.showAllHotspotsColor).toBeUndefined();
      expect(visualViewerService.outlineColor).toBeUndefined();
      expect(visualViewerService.outlineWidth).toBeUndefined();
      expect(visualViewerService.selectionMode).toBeUndefined();
      expect(visualViewerService.showAllHotspotsEnabled).toBeUndefined();
      expect(visualViewerService.navigationMode).toBeUndefined();
      expect(visualViewerService.selectedProductCodes).toBeUndefined();

      spyOnProperty(visualViewerService, 'is2D', 'get').and.returnValue(false);

      const setVisualViewerServiceBackgroundTopColorPropertySpy = spyOnProperty(
        visualViewerService,
        'backgroundTopColor',
        'set'
      );
      const setVisualViewerServiceBackgroundBottomColorPropertySpy =
        spyOnProperty(visualViewerService, 'backgroundBottomColor', 'set');
      const setVisualViewerServiceHotspotSelectionColorPropertySpy =
        spyOnProperty(visualViewerService, 'hotspotSelectionColor', 'set');
      const setVisualViewerServiceShowAllHotspotsColorPropertySpy =
        spyOnProperty(visualViewerService, 'showAllHotspotsColor', 'set');
      const setVisualViewerServiceOutlineColorPropertySpy = spyOnProperty(
        visualViewerService,
        'outlineColor',
        'set'
      );
      const setVisualViewerServiceOutlineWidthPropertySpy = spyOnProperty(
        visualViewerService,
        'outlineWidth',
        'set'
      );
      const setVisualViewerServiceSelectionModePropertySpy = spyOnProperty(
        visualViewerService,
        'selectionMode',
        'set'
      );
      const setVisualViewerServiceShowAllHotspotsEnabledPropertySpy =
        spyOnProperty(visualViewerService, 'showAllHotspotsEnabled', 'set');
      const setVisualViewerServiceNavigationModePropertySpy = spyOnProperty(
        visualViewerService,
        'navigationMode',
        'set'
      );
      const setVisualViewerServiceSelectedProductCodesPropertySpy =
        spyOnProperty(visualViewerService, 'selectedProductCodes', 'set');

      const setInitialPropertyValues =
        visualViewerService['setInitialPropertyValues'].bind(
          visualViewerService
        );

      setInitialPropertyValues();

      expect(
        setVisualViewerServiceBackgroundTopColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_BACKGROUND_TOP_COLOR']
      );
      expect(
        setVisualViewerServiceBackgroundBottomColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_BACKGROUND_BOTTOM_COLOR']
      );
      expect(
        setVisualViewerServiceHotspotSelectionColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_HOTSPOT_SELECTION_HIGHLIGHT_COLOR']
      );
      expect(
        setVisualViewerServiceShowAllHotspotsColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_SHOW_ALL_HOTSPOTS_COLOR']
      );
      expect(
        setVisualViewerServiceOutlineColorPropertySpy
      ).toHaveBeenCalledWith(visualViewerService['DEFAULT_OUTLINE_COLOR']);
      expect(
        setVisualViewerServiceOutlineWidthPropertySpy
      ).toHaveBeenCalledWith(visualViewerService['DEFAULT_OUTLINE_WIDTH']);
      expect(
        setVisualViewerServiceSelectionModePropertySpy
      ).toHaveBeenCalledWith(visualViewerService['DEFAULT_SELECTION_MODE']);
      expect(
        setVisualViewerServiceShowAllHotspotsEnabledPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_SHOW_ALL_HOTSPOTS_ENABLED']
      );
      expect(
        setVisualViewerServiceNavigationModePropertySpy
      ).toHaveBeenCalledWith(NavigationMode.Turntable);
      expect(
        setVisualViewerServiceSelectedProductCodesPropertySpy
      ).toHaveBeenCalledWith([]);
    });

    it('should default to Pan navigation mode in 2D mode if a navigation mode has not been set', () => {
      visualViewerService.navigationMode = NavigationMode.Turntable; // Not usable in 2D mode

      spyOnProperty(visualViewerService, 'is2D', 'get').and.returnValue(true);

      const setVisualViewerServiceBackgroundTopColorPropertySpy = spyOnProperty(
        visualViewerService,
        'backgroundTopColor',
        'set'
      );
      const setVisualViewerServiceBackgroundBottomColorPropertySpy =
        spyOnProperty(visualViewerService, 'backgroundBottomColor', 'set');
      const setVisualViewerServiceHotspotSelectionColorPropertySpy =
        spyOnProperty(visualViewerService, 'hotspotSelectionColor', 'set');
      const setVisualViewerServiceShowAllHotspotsColorPropertySpy =
        spyOnProperty(visualViewerService, 'showAllHotspotsColor', 'set');
      const setVisualViewerServiceOutlineColorPropertySpy = spyOnProperty(
        visualViewerService,
        'outlineColor',
        'set'
      );
      const setVisualViewerServiceOutlineWidthPropertySpy = spyOnProperty(
        visualViewerService,
        'outlineWidth',
        'set'
      );
      const setVisualViewerServiceSelectionModePropertySpy = spyOnProperty(
        visualViewerService,
        'selectionMode',
        'set'
      );
      const setVisualViewerServiceShowAllHotspotsEnabledPropertySpy =
        spyOnProperty(visualViewerService, 'showAllHotspotsEnabled', 'set');
      const setVisualViewerServiceNavigationModePropertySpy = spyOnProperty(
        visualViewerService,
        'navigationMode',
        'set'
      );
      const setVisualViewerServiceSelectedProductCodesPropertySpy =
        spyOnProperty(visualViewerService, 'selectedProductCodes', 'set');

      const setInitialPropertyValues =
        visualViewerService['setInitialPropertyValues'].bind(
          visualViewerService
        );

      setInitialPropertyValues();

      expect(
        setVisualViewerServiceBackgroundTopColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_BACKGROUND_TOP_COLOR']
      );
      expect(
        setVisualViewerServiceBackgroundBottomColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_BACKGROUND_BOTTOM_COLOR']
      );
      expect(
        setVisualViewerServiceHotspotSelectionColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_HOTSPOT_SELECTION_HIGHLIGHT_COLOR']
      );
      expect(
        setVisualViewerServiceShowAllHotspotsColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_SHOW_ALL_HOTSPOTS_COLOR']
      );
      expect(
        setVisualViewerServiceOutlineColorPropertySpy
      ).toHaveBeenCalledWith(visualViewerService['DEFAULT_OUTLINE_COLOR']);
      expect(
        setVisualViewerServiceOutlineWidthPropertySpy
      ).toHaveBeenCalledWith(visualViewerService['DEFAULT_OUTLINE_WIDTH']);
      expect(
        setVisualViewerServiceSelectionModePropertySpy
      ).toHaveBeenCalledWith(visualViewerService['DEFAULT_SELECTION_MODE']);
      expect(
        setVisualViewerServiceShowAllHotspotsEnabledPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_SHOW_ALL_HOTSPOTS_ENABLED']
      );
      expect(
        setVisualViewerServiceNavigationModePropertySpy
      ).toHaveBeenCalledWith(NavigationMode.Pan);
      expect(
        setVisualViewerServiceSelectedProductCodesPropertySpy
      ).toHaveBeenCalledWith([]);
    });

    it('should default to Pan navigation mode in 2D mode if a navigation mode that is not supported in 2D mode has been set', () => {
      expect(visualViewerService.navigationMode).toBeUndefined();

      spyOnProperty(visualViewerService, 'is2D', 'get').and.returnValue(true);

      const setVisualViewerServiceBackgroundTopColorPropertySpy = spyOnProperty(
        visualViewerService,
        'backgroundTopColor',
        'set'
      );
      const setVisualViewerServiceBackgroundBottomColorPropertySpy =
        spyOnProperty(visualViewerService, 'backgroundBottomColor', 'set');
      const setVisualViewerServiceHotspotSelectionColorPropertySpy =
        spyOnProperty(visualViewerService, 'hotspotSelectionColor', 'set');
      const setVisualViewerServiceShowAllHotspotsColorPropertySpy =
        spyOnProperty(visualViewerService, 'showAllHotspotsColor', 'set');
      const setVisualViewerServiceOutlineColorPropertySpy = spyOnProperty(
        visualViewerService,
        'outlineColor',
        'set'
      );
      const setVisualViewerServiceOutlineWidthPropertySpy = spyOnProperty(
        visualViewerService,
        'outlineWidth',
        'set'
      );
      const setVisualViewerServiceSelectionModePropertySpy = spyOnProperty(
        visualViewerService,
        'selectionMode',
        'set'
      );
      const setVisualViewerServiceShowAllHotspotsEnabledPropertySpy =
        spyOnProperty(visualViewerService, 'showAllHotspotsEnabled', 'set');
      const setVisualViewerServiceNavigationModePropertySpy = spyOnProperty(
        visualViewerService,
        'navigationMode',
        'set'
      );
      const setVisualViewerServiceSelectedProductCodesPropertySpy =
        spyOnProperty(visualViewerService, 'selectedProductCodes', 'set');

      const setInitialPropertyValues =
        visualViewerService['setInitialPropertyValues'].bind(
          visualViewerService
        );

      setInitialPropertyValues();

      expect(
        setVisualViewerServiceBackgroundTopColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_BACKGROUND_TOP_COLOR']
      );
      expect(
        setVisualViewerServiceBackgroundBottomColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_BACKGROUND_BOTTOM_COLOR']
      );
      expect(
        setVisualViewerServiceHotspotSelectionColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_HOTSPOT_SELECTION_HIGHLIGHT_COLOR']
      );
      expect(
        setVisualViewerServiceShowAllHotspotsColorPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_SHOW_ALL_HOTSPOTS_COLOR']
      );
      expect(
        setVisualViewerServiceOutlineColorPropertySpy
      ).toHaveBeenCalledWith(visualViewerService['DEFAULT_OUTLINE_COLOR']);
      expect(
        setVisualViewerServiceOutlineWidthPropertySpy
      ).toHaveBeenCalledWith(visualViewerService['DEFAULT_OUTLINE_WIDTH']);
      expect(
        setVisualViewerServiceSelectionModePropertySpy
      ).toHaveBeenCalledWith(visualViewerService['DEFAULT_SELECTION_MODE']);
      expect(
        setVisualViewerServiceShowAllHotspotsEnabledPropertySpy
      ).toHaveBeenCalledWith(
        visualViewerService['DEFAULT_SHOW_ALL_HOTSPOTS_ENABLED']
      );
      expect(
        setVisualViewerServiceNavigationModePropertySpy
      ).toHaveBeenCalledWith(NavigationMode.Pan);
      expect(
        setVisualViewerServiceSelectedProductCodesPropertySpy
      ).toHaveBeenCalledWith([]);
    });

    it('should not modify existing valid values', () => {
      visualViewerService.backgroundTopColor = 'red';
      visualViewerService.backgroundBottomColor = 'green';
      visualViewerService.hotspotSelectionColor = 'blue';
      visualViewerService.showAllHotspotsColor = 'yellow';
      visualViewerService.outlineColor = 'black';
      visualViewerService.outlineWidth = 7;
      visualViewerService.selectionMode = SelectionMode.Sticky;
      visualViewerService.showAllHotspotsEnabled = true;
      visualViewerService.navigationMode = NavigationMode.Turntable;
      visualViewerService['_selectedProductCodes'] = ['p1'];

      spyOnProperty(visualViewerService, 'is2D', 'get').and.returnValue(false);

      const setVisualViewerServiceBackgroundTopColorPropertySpy = spyOnProperty(
        visualViewerService,
        'backgroundTopColor',
        'set'
      );
      const setVisualViewerServiceBackgroundBottomColorPropertySpy =
        spyOnProperty(visualViewerService, 'backgroundBottomColor', 'set');
      const setVisualViewerServiceHotspotSelectionColorPropertySpy =
        spyOnProperty(visualViewerService, 'hotspotSelectionColor', 'set');
      const setVisualViewerServiceShowAllHotspotsColorPropertySpy =
        spyOnProperty(visualViewerService, 'showAllHotspotsColor', 'set');
      const setVisualViewerServiceOutlineColorPropertySpy = spyOnProperty(
        visualViewerService,
        'outlineColor',
        'set'
      );
      const setVisualViewerServiceOutlineWidthPropertySpy = spyOnProperty(
        visualViewerService,
        'outlineWidth',
        'set'
      );
      const setVisualViewerServiceSelectionModePropertySpy = spyOnProperty(
        visualViewerService,
        'selectionMode',
        'set'
      );
      const setVisualViewerServiceShowAllHotspotsEnabledPropertySpy =
        spyOnProperty(visualViewerService, 'showAllHotspotsEnabled', 'set');
      const setVisualViewerServiceNavigationModePropertySpy = spyOnProperty(
        visualViewerService,
        'navigationMode',
        'set'
      );
      const setVisualViewerServiceSelectedProductCodesPropertySpy =
        spyOnProperty(visualViewerService, 'selectedProductCodes', 'set');

      const setInitialPropertyValues =
        visualViewerService['setInitialPropertyValues'].bind(
          visualViewerService
        );

      setInitialPropertyValues();

      expect(
        setVisualViewerServiceBackgroundTopColorPropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(
        setVisualViewerServiceBackgroundBottomColorPropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(
        setVisualViewerServiceHotspotSelectionColorPropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(
        setVisualViewerServiceShowAllHotspotsColorPropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(
        setVisualViewerServiceOutlineColorPropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(
        setVisualViewerServiceOutlineWidthPropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(
        setVisualViewerServiceSelectionModePropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(
        setVisualViewerServiceShowAllHotspotsEnabledPropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(
        setVisualViewerServiceNavigationModePropertySpy
      ).toHaveBeenCalledTimes(0);
      expect(
        setVisualViewerServiceSelectedProductCodesPropertySpy
      ).toHaveBeenCalledTimes(0);
    });
  });

  describe('executeWhenSceneLoaded', () => {
    it('should invoke callback when sceneLoadInfo$ produces a SceneLoadInfo with a sceneLoadState of SceneLoadState.Loaded', (done) => {
      const notStartedSceneLoadInfo = <SceneLoadInfo>{
        sceneLoadState: SceneLoadState.NotStarted,
      };
      const loadingSceneLoadInfo = <SceneLoadInfo>{
        sceneLoadState: SceneLoadState.Loading,
      };
      const loadedSceneLoadInfo = <SceneLoadInfo>{
        sceneLoadState: SceneLoadState.Loaded,
        loadedSceneInfo: <LoadedSceneInfo>{
          sceneId: 'sceneId',
          contentType: ContentType.Model3D,
        },
      };
      const sceneLoadInfos = [
        notStartedSceneLoadInfo,
        loadingSceneLoadInfo,
        loadedSceneLoadInfo,
      ];
      const getSceneLoadInfoPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'sceneLoadInfo$',
        'get'
      ).and.returnValue(from(sceneLoadInfos));

      visualViewerService['executeWhenSceneLoaded'](
        (loadedSceneLoadInfo: LoadedSceneInfo) => {
          expect(loadedSceneLoadInfo).toEqual(loadedSceneLoadInfo);
          done();
        }
      );

      expect(getSceneLoadInfoPropertySpy).toHaveBeenCalledTimes(1);
    });

    it('should not invoke callback when sceneLoadInfo$ does not produce a SceneLoadInfo with a sceneLoadState of SceneLoadState.Loaded', () => {
      const notStartedSceneLoadInfo = <SceneLoadInfo>{
        sceneLoadState: SceneLoadState.NotStarted,
      };
      const loadingSceneLoadInfo = <SceneLoadInfo>{
        sceneLoadState: SceneLoadState.Loading,
      };
      const loadedSceneLoadInfo = <SceneLoadInfo>{
        sceneLoadState: SceneLoadState.Failed,
        errorMessage: 'something went wrong',
      };
      const sceneLoadInfos = [
        notStartedSceneLoadInfo,
        loadingSceneLoadInfo,
        loadedSceneLoadInfo,
      ];
      const getSceneLoadInfoPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'sceneLoadInfo$',
        'get'
      ).and.returnValue(from(sceneLoadInfos));

      visualViewerService['executeWhenSceneLoaded'](
        (_loadedSceneLoadInfo: LoadedSceneInfo) => {
          fail('not expecting callback to be invoked');
        }
      );

      expect(getSceneLoadInfoPropertySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getLeafDescendants', () => {
    it('should return leaf level descendant NodeRefs (treating closed nodes as nodes without children)', () => {
      const mockNodeRef: FakeNodeRef = {
        id: 'a',
        closed: false,
        contentType: NodeContentType.Regular,
        children: [
          {
            id: 'b',
            closed: false,
            contentType: NodeContentType.Regular,
            children: [
              {
                id: 'c',
                closed: true,
                contentType: NodeContentType.Regular,
                children: [
                  {
                    id: 'f',
                    closed: false,
                    contentType: NodeContentType.Regular,
                    children: [],
                  },
                ],
              },
              {
                id: 'd',
                closed: false,
                contentType: NodeContentType.Regular,
                children: [],
              },
            ],
          },
          {
            id: 'e',
            contentType: NodeContentType.Regular,
            closed: false,
            children: [],
          },
        ],
      };

      const mockNodeHierarchy = {
        getChildren: (nodeRef: FakeNodeRef, stepIntoClosedNodes: boolean) => {
          return stepIntoClosedNodes || !nodeRef.closed
            ? nodeRef.children.slice()
            : [];
        },
        getNodeContentType: (nodeRef: FakeNodeRef) => nodeRef.contentType,
      };

      spyOnProperty<any>(
        visualViewerService,
        'nodeHierarchy',
        'get'
      ).and.returnValue(mockNodeHierarchy);

      const leafNodeRefs: FakeNodeRef[] = [];
      const descendentLeafNodesRefs = visualViewerService['getLeafDescendants'](
        mockNodeRef,
        leafNodeRefs
      );

      expect(descendentLeafNodesRefs).toEqual(leafNodeRefs);
      expect(descendentLeafNodesRefs.length).toEqual(3);
      expect(descendentLeafNodesRefs[0].id).toEqual('c');
      expect(descendentLeafNodesRefs[1].id).toEqual('d');
      expect(descendentLeafNodesRefs[2].id).toEqual('e');
    });

    it('should exclude reference nodes', () => {
      const mockNodeRef: FakeNodeRef = {
        id: 'a',
        closed: false,
        contentType: NodeContentType.Regular,
        children: [
          {
            id: 'b',
            closed: false,
            contentType: NodeContentType.Regular,
            children: [
              {
                id: 'c',
                closed: true,
                contentType: NodeContentType.Regular,
                children: [
                  {
                    id: 'f',
                    closed: false,
                    contentType: NodeContentType.Reference,
                    children: [],
                  },
                ],
              },
              {
                id: 'd',
                closed: false,
                contentType: NodeContentType.Reference,
                children: [],
              },
            ],
          },
          {
            id: 'e',
            contentType: NodeContentType.Regular,
            closed: false,
            children: [],
          },
        ],
      };

      const mockNodeHierarchy = {
        getChildren: (nodeRef: FakeNodeRef, stepIntoClosedNodes: boolean) => {
          return stepIntoClosedNodes || !nodeRef.closed
            ? nodeRef.children.slice()
            : [];
        },
        getNodeContentType: (nodeRef: FakeNodeRef) => nodeRef.contentType,
      };

      spyOnProperty<any>(
        visualViewerService,
        'nodeHierarchy',
        'get'
      ).and.returnValue(mockNodeHierarchy);

      const leafNodeRefs: FakeNodeRef[] = [];
      const descendentLeafNodesRefs = visualViewerService['getLeafDescendants'](
        mockNodeRef,
        leafNodeRefs
      );

      expect(descendentLeafNodesRefs).toEqual(leafNodeRefs);
      expect(descendentLeafNodesRefs.length).toEqual(2);
      expect(descendentLeafNodesRefs[0].id).toEqual('c');
      expect(descendentLeafNodesRefs[1].id).toEqual('e');
    });
  });

  describe('getAllLeafNodeRefs', () => {
    it('should get all leaf level descendant NodeRefs (treating closed nodes as nodes without children) for a node hierarchy', () => {
      const mockNodeRef: FakeNodeRef = {
        id: 'a',
        closed: false,
        contentType: NodeContentType.Regular,
        children: [
          {
            id: 'b',
            closed: false,
            contentType: NodeContentType.Regular,
            children: [
              {
                id: 'c',
                closed: true,
                contentType: NodeContentType.Regular,
                children: [
                  {
                    id: 'f',
                    closed: false,
                    contentType: NodeContentType.Regular,
                    children: [],
                  },
                ],
              },
              {
                id: 'd',
                closed: false,
                contentType: NodeContentType.Regular,
                children: [],
              },
            ],
          },
          {
            id: 'e',
            closed: false,
            contentType: NodeContentType.Regular,
            children: [],
          },
        ],
      };

      const mockNodeHierarchy = {
        getChildren: (nodeRef: FakeNodeRef, stepIntoClosedNodes: boolean) => {
          if (nodeRef === undefined) {
            nodeRef = mockNodeRef;
          }
          if (stepIntoClosedNodes === undefined) {
            stepIntoClosedNodes = false;
          }

          return stepIntoClosedNodes || !nodeRef.closed
            ? nodeRef.children.slice()
            : [];
        },
        getNodeContentType: (nodeRef: FakeNodeRef) => nodeRef.contentType,
      };

      spyOnProperty<any>(
        visualViewerService,
        'nodeHierarchy',
        'get'
      ).and.returnValue(mockNodeHierarchy);

      const descendentLeafNodesRefs =
        visualViewerService['getAllLeafNodeRefs']();

      expect(descendentLeafNodesRefs.length).toEqual(3);
      expect(descendentLeafNodesRefs[0].id).toEqual('c');
      expect(descendentLeafNodesRefs[1].id).toEqual('d');
      expect(descendentLeafNodesRefs[2].id).toEqual('e');
    });
  });

  describe('persistentIdToNodeRef', () => {
    it('should invoke persistentIdToNodeRef on scene', () => {
      const mockScene = {
        persistentIdToNodeRef: (
          _nodeIds: string | string[]
        ): NodeRef | NodeRef[] => {
          return [];
        },
      };

      const nodeRefs = [{}, {}];
      const sceneIds = ['nodeId1', 'nodeId2'];

      const getScenePropertySpy = spyOnProperty<any>(
        visualViewerService,
        'scene',
        'get'
      ).and.returnValue(mockScene);
      const persistentIdToNodeRefSpy = spyOn(
        mockScene,
        'persistentIdToNodeRef'
      ).and.returnValue(nodeRefs);

      const persistentIdToNodeRef = visualViewerService[
        'persistentIdToNodeRef'
      ].bind(visualViewerService) as (
        nodeRefs: string | string[]
      ) => NodeRef | NodeRef[];

      const nodeRefsReturned = persistentIdToNodeRef(sceneIds);

      expect(nodeRefsReturned).toEqual(nodeRefs);
      expect(getScenePropertySpy).toHaveBeenCalledTimes(1);
      expect(persistentIdToNodeRefSpy).toHaveBeenCalledTimes(1);
      expect(persistentIdToNodeRefSpy).toHaveBeenCalledWith(sceneIds);
    });
  });

  describe('nodeRefToPersistentId', () => {
    it('should invoke nodeRefToPersistentId on scene', () => {
      const mockScene = {
        nodeRefToPersistentId: (
          _nodeRefs: NodeRef | NodeRef[]
        ): string | string[] => {
          return [];
        },
      };

      const nodeRefs = [{}, {}];
      const sceneIds = ['nodeId1', 'nodeId2'];

      const getScenePropertySpy = spyOnProperty<any>(
        visualViewerService,
        'scene',
        'get'
      ).and.returnValue(mockScene);
      const nodeRefToPersistentIdSpy = spyOn(
        mockScene,
        'nodeRefToPersistentId'
      ).and.returnValue(sceneIds);

      const nodeRefToPersistentId = visualViewerService[
        'nodeRefToPersistentId'
      ].bind(visualViewerService) as (
        nodeRefs: NodeRef | NodeRef[]
      ) => string | string[];

      const nodeIds = nodeRefToPersistentId(nodeRefs);

      expect(nodeIds).toEqual(sceneIds);
      expect(getScenePropertySpy).toHaveBeenCalledTimes(1);
      expect(nodeRefToPersistentIdSpy).toHaveBeenCalledTimes(1);
      expect(nodeRefToPersistentIdSpy).toHaveBeenCalledWith(nodeRefs);
    });
  });

  describe('getViewStateManagerImplementation', () => {
    it('should invoke viewStateManager getImplementation', () => {
      const mockViewStateManager = {
        getImplementation: () => {
          return {};
        },
      };

      const getViewStateManagerPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewStateManager'
      ).and.returnValue(mockViewStateManager);

      const viewStateManagerGetImplementationSpy = spyOn(
        mockViewStateManager,
        'getImplementation'
      );

      const getViewStateManagerImplementation = visualViewerService[
        'getViewStateManagerImplementation'
      ].bind(visualViewerService) as () => any;
      getViewStateManagerImplementation();

      expect(getViewStateManagerPropertySpy).toHaveBeenCalledTimes(1);
      expect(viewStateManagerGetImplementationSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleSelectedNodeIds', () => {
    it('should call handleSelectedNodes2D and trigger frame render when in 2D mode', () => {
      const nodeRef1 = {};
      const nodeRef2 = {};

      const selectedNodeRefs = [nodeRef1, nodeRef2];

      const visualViewerServicePersistentIdToNodeRefSpy = spyOn<any>(
        visualViewerService,
        'persistentIdToNodeRef'
      ).and.returnValue(selectedNodeRefs);

      spyOnProperty(visualViewerService, 'is2D').and.returnValue(true);

      const visualViewerServiceHandleSelectedNodes2D = spyOn<any>(
        visualViewerService,
        'handleSelectedNodes2D'
      );

      const visualViewerServiceHandleSelectedNodes3D = spyOn<any>(
        visualViewerService,
        'handleSelectedNodes3D'
      );

      const visualViewerServiceSetShouldRenderFrame = spyOn<any>(
        visualViewerService,
        'setShouldRenderFrame'
      );

      const visualViewerServiceIsolateModeEnabled = spyOnProperty<any>(
        visualViewerService,
        'isolateModeEnabled'
      ).and.returnValue(false);

      const visualViewerServiceIsolateNodesSpy = spyOn<any>(
        visualViewerService,
        'isolateNodes'
      );

      const handleSelectedNodeIds = visualViewerService[
        'handleSelectedNodeIds'
      ].bind(visualViewerService) as (nodeIds: string[]) => void;

      handleSelectedNodeIds(['nodeId1', 'nodeId2']);

      expect(visualViewerServicePersistentIdToNodeRefSpy).toHaveBeenCalledTimes(
        1
      );
      expect(visualViewerServiceHandleSelectedNodes2D).toHaveBeenCalledTimes(1);
      expect(visualViewerServiceHandleSelectedNodes2D).toHaveBeenCalledWith(
        selectedNodeRefs
      );
      expect(visualViewerServiceHandleSelectedNodes3D).toHaveBeenCalledTimes(0);
      expect(visualViewerServiceIsolateModeEnabled).toHaveBeenCalledTimes(1);
      expect(visualViewerServiceIsolateNodesSpy).toHaveBeenCalledTimes(0);
      expect(visualViewerServiceIsolateNodesSpy).toHaveBeenCalledTimes(0);
      expect(visualViewerServiceSetShouldRenderFrame).toHaveBeenCalledTimes(1);
    });

    it('should call handleSelectedNodes3D and trigger frame render when in 3D mode and not in isolate mode', () => {
      const nodeRef1 = {};
      const nodeRef2 = {};

      const selectedNodeRefs = [nodeRef1, nodeRef2];

      const visualViewerServicePersistentIdToNodeRefSpy = spyOn<any>(
        visualViewerService,
        'persistentIdToNodeRef'
      ).and.returnValue(selectedNodeRefs);

      spyOnProperty(visualViewerService, 'is2D').and.returnValue(false);

      const visualViewerServiceHandleSelectedNodes2D = spyOn<any>(
        visualViewerService,
        'handleSelectedNodes2D'
      );

      const visualViewerServiceHandleSelectedNodes3D = spyOn<any>(
        visualViewerService,
        'handleSelectedNodes3D'
      );

      const visualViewerServiceSetShouldRenderFrame = spyOn<any>(
        visualViewerService,
        'setShouldRenderFrame'
      );

      const visualViewerServiceIsolateModeEnabledSpy = spyOnProperty<any>(
        visualViewerService,
        'isolateModeEnabled'
      ).and.returnValue(false);

      const visualViewerServiceIsolateNodesSpy = spyOn<any>(
        visualViewerService,
        'isolateNodes'
      );

      const handleSelectedNodeIds = visualViewerService[
        'handleSelectedNodeIds'
      ].bind(visualViewerService) as (nodeIds: string[]) => void;

      handleSelectedNodeIds(['nodeId1', 'nodeId2']);

      expect(visualViewerServicePersistentIdToNodeRefSpy).toHaveBeenCalledTimes(
        1
      );
      expect(visualViewerServiceHandleSelectedNodes2D).toHaveBeenCalledTimes(0);
      expect(visualViewerServiceHandleSelectedNodes3D).toHaveBeenCalledTimes(1);
      expect(visualViewerServiceHandleSelectedNodes3D).toHaveBeenCalledWith(
        selectedNodeRefs
      );
      expect(visualViewerServiceIsolateModeEnabledSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerServiceIsolateNodesSpy).toHaveBeenCalledTimes(0);
      expect(visualViewerServiceSetShouldRenderFrame).toHaveBeenCalledTimes(1);
    });

    it('should call handleSelectedNodes3D and trigger frame render when in 3D mode and in isolate mode but no nodes selected', () => {
      const selectedNodeRefs: NodeRef[] = [];

      const visualViewerServicePersistentIdToNodeRefSpy = spyOn<any>(
        visualViewerService,
        'persistentIdToNodeRef'
      ).and.returnValue(selectedNodeRefs);

      spyOnProperty(visualViewerService, 'is2D').and.returnValue(false);

      const visualViewerServiceHandleSelectedNodes2D = spyOn<any>(
        visualViewerService,
        'handleSelectedNodes2D'
      );

      const visualViewerServiceHandleSelectedNodes3D = spyOn<any>(
        visualViewerService,
        'handleSelectedNodes3D'
      );

      const visualViewerServiceSetShouldRenderFrame = spyOn<any>(
        visualViewerService,
        'setShouldRenderFrame'
      );

      const visualViewerServiceIsolateModeEnabled = spyOnProperty<any>(
        visualViewerService,
        'isolateModeEnabled'
      ).and.returnValue(true);

      const visualViewerServiceIsolateNodesSpy = spyOn<any>(
        visualViewerService,
        'isolateNodes'
      );

      const handleSelectedNodeIds = visualViewerService[
        'handleSelectedNodeIds'
      ].bind(visualViewerService) as (nodeIds: string[]) => void;

      handleSelectedNodeIds(['nodeId1', 'nodeId2']);

      expect(visualViewerServicePersistentIdToNodeRefSpy).toHaveBeenCalledTimes(
        1
      );
      expect(visualViewerServiceHandleSelectedNodes2D).toHaveBeenCalledTimes(0);
      expect(visualViewerServiceHandleSelectedNodes3D).toHaveBeenCalledTimes(1);
      expect(visualViewerServiceHandleSelectedNodes3D).toHaveBeenCalledWith(
        selectedNodeRefs
      );
      expect(visualViewerServiceIsolateModeEnabled).toHaveBeenCalledTimes(1);
      expect(visualViewerServiceIsolateNodesSpy).toHaveBeenCalledTimes(0);
      expect(visualViewerServiceSetShouldRenderFrame).toHaveBeenCalledTimes(1);
    });

    it('should call handleSelectedNodes3D then call isolateNodes when in 3D mode and in isolate mode and nodes selected', () => {
      const nodeRef1 = {};
      const nodeRef2 = {};

      const selectedNodeRefs = [nodeRef1, nodeRef2];

      const visualViewerServicePersistentIdToNodeRefSpy = spyOn<any>(
        visualViewerService,
        'persistentIdToNodeRef'
      ).and.returnValue(selectedNodeRefs);

      spyOnProperty(visualViewerService, 'is2D').and.returnValue(false);

      const visualViewerServiceHandleSelectedNodes2D = spyOn<any>(
        visualViewerService,
        'handleSelectedNodes2D'
      );

      const visualViewerServiceHandleSelectedNodes3D = spyOn<any>(
        visualViewerService,
        'handleSelectedNodes3D'
      );

      const visualViewerServiceSetShouldRenderFrame = spyOn<any>(
        visualViewerService,
        'setShouldRenderFrame'
      );

      const visualViewerServiceIsolateModeEnabled = spyOnProperty<any>(
        visualViewerService,
        'isolateModeEnabled'
      ).and.returnValue(true);

      const visualViewerServiceIsolateNodesSpy = spyOn<any>(
        visualViewerService,
        'isolateNodes'
      );

      const handleSelectedNodeIds = visualViewerService[
        'handleSelectedNodeIds'
      ].bind(visualViewerService) as (nodeIds: string[]) => void;

      handleSelectedNodeIds(['nodeId1', 'nodeId2']);

      expect(visualViewerServicePersistentIdToNodeRefSpy).toHaveBeenCalledTimes(
        1
      );
      expect(visualViewerServiceHandleSelectedNodes2D).toHaveBeenCalledTimes(0);
      expect(visualViewerServiceHandleSelectedNodes3D).toHaveBeenCalledTimes(1);
      expect(visualViewerServiceHandleSelectedNodes3D).toHaveBeenCalledWith(
        selectedNodeRefs
      );
      expect(visualViewerServiceIsolateModeEnabled).toHaveBeenCalledTimes(1);
      expect(visualViewerServiceIsolateNodesSpy).toHaveBeenCalledTimes(1);
      expect(visualViewerServiceSetShouldRenderFrame).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleSelectedNodes2D', () => {
    it('should clear selection of any currently selected hotspots and select hotspots relating to selected products', () => {
      const nodeRef1 = {};
      const nodeRef2 = {};
      const nodeRef3 = {};
      const nodeRef4 = {};

      const previouslySelectedNodeRefs = [nodeRef1, nodeRef2, nodeRef4];

      const selectedNodeRefs = [nodeRef1, nodeRef2, nodeRef3, nodeRef4];

      const viewStateManager = {
        enumerateSelection: (callback: (nodeRef: NodeRef) => void): void => {
          previouslySelectedNodeRefs.forEach(callback);
        },

        setSelectionStates: (
          _nodeRefsToAdd: NodeRef[],
          _nodeRefsToRemove: NodeRef[],
          _recursive: boolean,
          _blockEvents: boolean
        ) => {},
      };

      const getVisualViewerServiceViewStateManagerPropertySpy =
        spyOnProperty<any>(
          visualViewerService,
          'viewStateManager'
        ).and.returnValue(viewStateManager);

      const viewStateManagerSetSelectionStatesSpy = spyOn(
        viewStateManager,
        'setSelectionStates'
      );

      const handleSelectedNodes2D = visualViewerService[
        'handleSelectedNodes2D'
      ].bind(visualViewerService) as (selectedNodes: NodeRef[]) => void;

      handleSelectedNodes2D(selectedNodeRefs);

      expect(
        getVisualViewerServiceViewStateManagerPropertySpy
      ).toHaveBeenCalled();
      const recursive = false;
      const blockEvents = true;
      expect(viewStateManagerSetSelectionStatesSpy).toHaveBeenCalledTimes(2);
      expect(viewStateManagerSetSelectionStatesSpy).toHaveBeenCalledWith(
        [],
        previouslySelectedNodeRefs,
        recursive,
        blockEvents
      );
      expect(viewStateManagerSetSelectionStatesSpy).toHaveBeenCalledWith(
        selectedNodeRefs,
        [],
        recursive,
        blockEvents
      );
    });
  });

  describe('handleSelectedNodes3D', () => {
    it('should clear outlining in any currently outlined nodes and set outlining on nodes relating to selected products', () => {
      const nodeRef1 = {};
      const nodeRef2 = {};
      const nodeRef3 = {};
      const nodeRef4 = {};

      const previouslyOutlinedNodeRefs = [nodeRef1, nodeRef2, nodeRef4];
      const selectedNodeRefs = [nodeRef1, nodeRef2, nodeRef3, nodeRef4];

      const viewStateManager = {
        enumerateOutlinedNodes: (
          callback: (nodeRef: NodeRef) => void
        ): void => {
          previouslyOutlinedNodeRefs.forEach(
            (previouslyOutlinedNodeRef: NodeRef) =>
              callback(previouslyOutlinedNodeRef)
          );
        },

        setOutliningStates: (
          _nodeRefsToAdd: NodeRef[],
          _nodeRefsToRemove: NodeRef[],
          _recursive: boolean,
          _blockEvents: boolean
        ) => {},
      };

      const getVisualViewerServiceViewStateManagerPropertySpy =
        spyOnProperty<any>(
          visualViewerService,
          'viewStateManager'
        ).and.returnValue(viewStateManager);
      const visualViewerServiceGetViewStateManagerImplementationSpy =
        spyOn<any>(
          visualViewerService,
          'getViewStateManagerImplementation'
        ).and.returnValue(viewStateManager);

      const viewStateManagerSetOutliningStatesSpy = spyOn(
        viewStateManager,
        'setOutliningStates'
      );

      const handleSelectedNodes3D = visualViewerService[
        'handleSelectedNodes3D'
      ].bind(visualViewerService) as (selectedNodes: NodeRef[]) => void;

      handleSelectedNodes3D(selectedNodeRefs);

      expect(
        getVisualViewerServiceViewStateManagerPropertySpy
      ).toHaveBeenCalled();
      expect(
        visualViewerServiceGetViewStateManagerImplementationSpy
      ).toHaveBeenCalled();
      const recursive = false;
      const blockEvents = true;
      expect(viewStateManagerSetOutliningStatesSpy).toHaveBeenCalledTimes(2);
      expect(viewStateManagerSetOutliningStatesSpy).toHaveBeenCalledWith(
        [],
        previouslyOutlinedNodeRefs,
        recursive,
        blockEvents
      );
      expect(viewStateManagerSetOutliningStatesSpy).toHaveBeenCalledWith(
        selectedNodeRefs,
        [],
        recursive,
        blockEvents
      );
    });
  });

  describe('setShouldRenderFrame', () => {
    it('should call setShouldRenderFrame on viewport', () => {
      const mockViewport = {
        setShouldRenderFrame: () => {},
      };
      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport'
      ).and.returnValue(mockViewport);
      const viewportSetShouldRenderFrameSpy = spyOn<any>(
        mockViewport,
        'setShouldRenderFrame'
      );

      const setShouldRenderFrame = visualViewerService[
        'setShouldRenderFrame'
      ].bind(visualViewerService) as () => void;

      setShouldRenderFrame();

      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(viewportSetShouldRenderFrameSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('is2DContentType', () => {
    it('should return true for "2DDrawing"', () => {
      const is2DContentType = visualViewerService['is2DContentType'].bind(
        this
      ) as (contentType: ContentType) => boolean;
      expect(is2DContentType(ContentType.Drawing2D)).toEqual(true);
    });

    it('should return false for "3DModel"', () => {
      const is2DContentType = visualViewerService['is2DContentType'].bind(
        this
      ) as (contentType: ContentType) => boolean;
      expect(is2DContentType(ContentType.Model3D)).toEqual(false);
    });
  });

  describe('onSelectionChanged', () => {
    it('should lookup product codes for outlined scene nodes and emit selectedProductCodesChange event', (done) => {
      const fakeNodeRefs = [{}, {}];
      const fakeNodeSids = ['nodeId1', 'nodeId2'];
      const fakeProductCodes = ['productCode1', 'productCode2'];
      const fakeProductCodesObservable = of(fakeProductCodes);

      const viewStateManager = <ViewStateManager>{
        enumerateSelection: (callback: (nodeRef: NodeRef) => void): void => {
          fakeNodeRefs.forEach((fakeNodeRef: NodeRef) => callback(fakeNodeRef));
        },
      };

      visualViewerService['viewStateManager'] = viewStateManager;

      const sceneNodeToProductLookupService =
        visualViewerService['sceneNodeToProductLookupService'];

      const selectedProductCodesChange = visualViewerService[
        'selectedProductCodesChange'
      ] as EventEmitter<string[]>;

      const nodeRefToPersistentIdSpy = spyOn<any>(
        visualViewerService,
        'nodeRefToPersistentId'
      ).and.returnValue(fakeNodeSids);

      mockSceneNodeToProductLookupService.lookupProductCodes$ =
        fakeProductCodesObservable;

      const lookupProductCodesSpy = spyOn(
        sceneNodeToProductLookupService,
        'lookupProductCodes'
      ).and.callThrough();

      const selectedProductCodesChangeEmitSpy = spyOn(
        selectedProductCodesChange,
        'emit'
      ).and.callThrough();

      selectedProductCodesChange.subscribe((productCodes: string[]) => {
        expect(selectedProductCodesChangeEmitSpy).toHaveBeenCalledTimes(1);
        expect(selectedProductCodesChangeEmitSpy).toHaveBeenCalledWith(
          productCodes
        );
        done();
      });

      const onSelectionChanged = visualViewerService['onSelectionChanged'].bind(
        visualViewerService
      ) as () => void;

      onSelectionChanged();

      expect(nodeRefToPersistentIdSpy).toHaveBeenCalledTimes(1);
      expect(lookupProductCodesSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onOutliningChanged', () => {
    it('should lookup product codes for outlined scene nodes and emit selectedProductCodesChange event', (done) => {
      const fakeNodeRefs = [{}, {}];
      const fakeNodeSids = ['nodeId1', 'nodeId2'];
      const fakeProductCodes = ['productCode1', 'productCode2'];
      const fakeProductCodesObservable = of(fakeProductCodes);

      const viewStateManager = <ViewStateManager>{
        enumerateOutlinedNodes: (
          callback: (nodeRef: NodeRef) => void
        ): void => {
          fakeNodeRefs.forEach((fakeNodeRef: NodeRef) => callback(fakeNodeRef));
        },
      };

      visualViewerService['viewStateManager'] = viewStateManager;

      const sceneNodeToProductLookupService =
        visualViewerService['sceneNodeToProductLookupService'];

      const selectedProductCodesChange = visualViewerService[
        'selectedProductCodesChange'
      ] as EventEmitter<string[]>;

      const nodeRefToPersistentIdSpy = spyOn<any>(
        visualViewerService,
        'nodeRefToPersistentId'
      ).and.returnValue(fakeNodeSids);

      mockSceneNodeToProductLookupService.lookupProductCodes$ =
        fakeProductCodesObservable;

      const lookupProductCodesSpy = spyOn(
        sceneNodeToProductLookupService,
        'lookupProductCodes'
      ).and.callThrough();

      const selectedProductCodesChangeEmitSpy = spyOn(
        selectedProductCodesChange,
        'emit'
      ).and.callThrough();

      selectedProductCodesChange.subscribe((productCodes: string[]) => {
        expect(selectedProductCodesChangeEmitSpy).toHaveBeenCalledTimes(1);
        expect(selectedProductCodesChangeEmitSpy).toHaveBeenCalledWith(
          productCodes
        );
        done();
      });

      const onOutliningChanged = visualViewerService['onOutliningChanged'].bind(
        visualViewerService
      ) as () => void;

      onOutliningChanged();

      expect(nodeRefToPersistentIdSpy).toHaveBeenCalledTimes(1);
      expect(lookupProductCodesSpy).toHaveBeenCalledTimes(1);
    });
  });
});
