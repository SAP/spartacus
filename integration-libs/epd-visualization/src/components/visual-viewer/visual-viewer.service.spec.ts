import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ContentType } from './models/content-type';
import { EpdVisualizationConfig } from '../../config/epd-visualization-config';
import { SceneNodeToProductLookupService } from '../../services/scene-node-to-product-lookup/scene-node-to-product-lookup.service';
import { SelectionMode } from './models/selection-mode';
import { VisualizationLookupService } from '../../services/visualization-lookup/visualization-lookup.service';
import { Observable, of } from 'rxjs';
import Core from 'sap/ui/core/Core';
import ViewStateManager from 'sap/ui/vk/ViewStateManager';
import { getValidConfig } from '../../config/epd-visualization-test-config';
import { VisualViewerService } from './visual-viewer.service';
import { NavigationMode } from './models/navigation-mode';

type NodeRef = any;

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
        {
          provide: EpdVisualizationConfig,
          useValue: getValidConfig(),
        },
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

    viewportAdded$ = visualViewerService['viewportAdded$'] as Observable<void>;
    isUi5BootStrapped = visualViewerService['isUi5BootStrapped'];
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

      const getCSSColorSpy = spyOn<any>(visualViewerService, 'getCSSColor');
      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);
      const viewportSetBackgroundColorSpy = spyOn(
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
      expect(viewportSetBackgroundColorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('backgroundBottomColor', () => {
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

      const getCSSColorSpy = spyOn<any>(visualViewerService, 'getCSSColor');
      const getViewportPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'viewport',
        'get'
      ).and.returnValue(mockViewport);
      const viewportSetBackgroundColorSpy = spyOn(
        mockViewport,
        'setBackgroundColorBottom'
      );

      visualViewerService.backgroundBottomColor = '--cx-color-inverse';
      expect(visualViewerService.backgroundBottomColor).toEqual(
        '--cx-color-inverse'
      );

      expect(getCSSColorSpy).toHaveBeenCalledTimes(1);
      expect(executeWhenSceneLoadedSpy).toHaveBeenCalledTimes(1);
      expect(getViewportPropertySpy).toHaveBeenCalledTimes(1);
      expect(viewportSetBackgroundColorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('hotspotSelectionColor', () => {
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
      const selectedNodeIds$NextSpy = spyOn(selectedNodeIds$, 'next');

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
      expect(selectedNodeIds$NextSpy).toHaveBeenCalledTimes(1);
      expect(selectedNodeIds$NextSpy).toHaveBeenCalledWith(sceneNodeIds);
    });
  });

  describe('includedProductCodes', () => {
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

      expect(visualViewerService.animationTotalDuration).toEqual(0);
    });

    it('should return animationPlayer.getTotalDuration() when animationPlayer set', () => {
      const mockAnimationPlayer = {
        getTotalDuration: () => 5,
      };

      const getAnimationPlayerPropertySpy = spyOnProperty<any>(
        visualViewerService,
        'animationPlayer'
      ).and.returnValue(mockAnimationPlayer);
      expect(visualViewerService.animationTotalDuration).toEqual(5);
      expect(getAnimationPlayerPropertySpy).toHaveBeenCalled();
    });
  });

  describe('animationPosition', () => {
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
    it('should not do anything when the value has not changed', () => {
      visualViewerService['_navigationMode'] = NavigationMode.Zoom;
      expect(visualViewerService.navigationMode).toEqual(NavigationMode.Zoom);

      const spyOnExecuteWhenSceneLoaded = spyOn<any>(
        visualViewerService,
        'executeWhenSceneLoaded'
      );
      visualViewerService.navigationMode = NavigationMode.Zoom;

      expect(spyOnExecuteWhenSceneLoaded).toHaveBeenCalledTimes(0);
    });
  });

  describe('onSelectionChanged', () => {
    it('should lookup product codes for selected scene nodes and emit selectedProductCodesChange event', (done) => {
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
