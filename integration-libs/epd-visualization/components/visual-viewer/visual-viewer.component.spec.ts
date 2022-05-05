import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Component, ElementRef, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  LanguageService,
  provideConfigFactory,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  SceneAdapter,
  VisualizationAdapter,
} from '@spartacus/epd-visualization/core';
import { getEpdVisualizationDefaultConfig } from '@spartacus/epd-visualization/root';
import { SpinnerModule } from '@spartacus/storefront';
import { Observable, of, Subject } from 'rxjs';
import { StorageV1Adapter } from '../../epd-visualization-api/adapters/storage-v1/storage-v1.adapter';
import { VisualizationV1Adapter } from '../../epd-visualization-api/adapters/visualization-v1/visualization-v1.adapter';
import { getTestConfig } from '../../root/testing/epd-visualization-test-config';
import { NavigationMode } from './models/navigation-mode';
import { SceneLoadInfo } from './models/scene-load-info';
import {
  VisualizationLoadInfo,
  VisualizationLoadStatus,
  VisualizationLookupResult,
} from './models/visualization-load-info';
import { VisualViewerAnimationSliderComponent } from './toolbar/visual-viewer-animation-slider/visual-viewer-animation-slider.component';
import { VisualViewerAnimationSliderModule } from './toolbar/visual-viewer-animation-slider/visual-viewer-animation-slider.module';
import { VisualViewerToolbarButtonModule } from './toolbar/visual-viewer-toolbar-button/visual-viewer-toolbar-button.module';
import { VisualViewerComponent } from './visual-viewer.component';
import { VisualViewerService } from './visual-viewer.service';

class MockVisualViewerService {
  set backgroundTopColor(backgroundTopColor: string) {
    this._backgroundTopColor = backgroundTopColor;
  }
  get backgroundTopColor() {
    return this._backgroundTopColor;
  }
  private _backgroundTopColor: string;

  set backgroundBottomColor(backgroundBottomColor: string) {
    this._backgroundBottomColor = backgroundBottomColor;
  }
  get backgroundBottomColor(): string {
    return this._backgroundBottomColor;
  }
  private _backgroundBottomColor: string;

  set hotspotSelectionColor(hotspotSelectionColor: string) {
    this._hotspotSelectionColor = hotspotSelectionColor;
  }
  get hotspotSelectionColor(): string {
    return this._hotspotSelectionColor;
  }
  private _hotspotSelectionColor: string;

  set showAllHotspotsEnabled(showAllHotspotsEnabled: boolean) {
    this._showAllHotspotsEnabled = showAllHotspotsEnabled;
  }
  get showAllHotspotsEnabled(): boolean {
    return this._showAllHotspotsEnabled;
  }
  private _showAllHotspotsEnabled: boolean;

  set showAllHotspotsColor(showAllHotspotsColor: string) {
    this._showAllHotspotsColor = showAllHotspotsColor;
  }
  get showAllHotspotsColor(): string {
    return this._showAllHotspotsColor;
  }
  private _showAllHotspotsColor: string;

  set outlineColor(outlineColor: string) {
    this._outlineColor = outlineColor;
  }
  get outlineColor(): string {
    return this._outlineColor;
  }
  private _outlineColor: string;

  set outlineWidth(outlineWidth: number) {
    this._outlineWidth = outlineWidth;
  }
  get outlineWidth(): number {
    return this._outlineWidth;
  }
  private _outlineWidth: number;

  set selectionMode(selectionMode: SelectionMode) {
    this._selectionMode = selectionMode;
  }
  get selectionMode(): SelectionMode {
    return this._selectionMode;
  }
  private _selectionMode: SelectionMode;

  set selectedProductCodes(selectedProductCodes: string[]) {
    this._selectedProductCodes = selectedProductCodes;
  }
  get selectedProductCodes(): string[] {
    return this._selectedProductCodes;
  }
  private _selectedProductCodes: string[];
  selectedProductCodesChange = new EventEmitter<string[]>();

  set includedProductCodes(includedProductCodes: string[]) {
    this._includedProductCodes = includedProductCodes;
  }
  get includedProductCodes(): string[] {
    return this._includedProductCodes;
  }
  private _includedProductCodes: string[];

  set excludedOpacity(excludedOpacity: number) {
    this._excludedOpacity = excludedOpacity;
  }
  get excludedOpacity(): number {
    return this._excludedOpacity;
  }
  private _excludedOpacity = 0.2;

  set animationTime(animationTime: number) {
    this._animationTime = animationTime;
  }
  get animationTime(): number {
    return this._animationTime;
  }
  private _animationTime: number;
  animationTimeChange = new EventEmitter<number>();

  get animationTotalDuration(): number {
    return 0;
  }

  set animationPosition(position: number) {
    this._animationPosition = position;
  }
  get animationPosition() {
    return this._animationPosition;
  }
  private _animationPosition = 0;
  animationPositionChange = new EventEmitter<number>();

  set animationPlaying(animationPlaying: boolean) {
    this._animationPlaying = animationPlaying;
  }
  get animationPlaying(): boolean {
    return this._animationPlaying;
  }
  private _animationPlaying = false;
  animationPlayingChange = new EventEmitter<boolean>();

  set navigationMode(navigationMode: NavigationMode) {
    this._navigationMode = navigationMode;
  }
  get navigationMode(): NavigationMode {
    return this._navigationMode;
  }
  private _navigationMode: NavigationMode;

  set isolateModeEnabled(isolateModeEnabled: boolean) {
    this._isolateModeEnabled = isolateModeEnabled;
  }
  get isolateModeEnabled(): boolean {
    return this._isolateModeEnabled;
  }
  private _isolateModeEnabled = false;
  isolateModeEnabledChange = new EventEmitter<boolean>();

  get is2D(): boolean {
    return this._is2D;
  }
  setIs2D(is2D: boolean) {
    this._is2D = is2D;
  }
  private _is2D = false;

  setViewportReady(viewportReady: boolean) {
    this._viewportReady = viewportReady;
  }
  get viewportReady(): boolean {
    return this._viewportReady;
  }
  private _viewportReady = false;
  viewportReadyChange = new EventEmitter<boolean>();

  public activateHomeView() {}

  public playAnimation(): void {}

  public pauseAnimation(): void {}

  public loadVisualization(
    _productCode: string
  ): Observable<VisualizationLoadInfo> {
    return of({
      lookupResult: VisualizationLookupResult.UniqueMatchFound,
      loadStatus: VisualizationLoadStatus.Loaded,
    });
  }

  public sceneLoadInfo$ = new Subject<SceneLoadInfo>();
}

@Component({
  selector: 'cx-epd-visualization-animation-slider',
  template: '',
})
export class MockVisualViewerAnimationSliderComponent {
  set value(value: number) {
    this._value = value;
  }
  get value(): number {
    return this._value;
  }
  _value = 0;
  valueChange = new EventEmitter<boolean>();

  get position(): number {
    return this._position;
  }
  _position = 0;
  positionChange = new EventEmitter<number>();

  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  _disabled = false;

  get initialized(): boolean {
    return this._initialized;
  }
  _initialized = false;
  initializedChange = new EventEmitter<boolean>();

  set barElement(_barElement: ElementRef) {}

  set handleElement(_handleElement: ElementRef) {}
}

describe('VisualViewerComponent', () => {
  let visualViewerComponent: VisualViewerComponent;
  let fixture: ComponentFixture<VisualViewerComponent>;
  let mockLanguageService: any;
  describe('Component', () => {
    it('should create visual viewer component', () => {
      mockLanguageService = {
        getAll: () => of([]),
        getActive: jasmine.createSpy().and.returnValue(of('en')),
        setActive: jasmine.createSpy(),
      };

      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          I18nTestingModule,
          VisualViewerToolbarButtonModule,
          VisualViewerAnimationSliderModule,
          SpinnerModule,
        ],
        declarations: [VisualViewerComponent],
        providers: [
          provideConfigFactory(getTestConfig),
          provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
          {
            provide: LanguageService,
            useValue: mockLanguageService,
          },
          {
            provide: VisualizationAdapter,
            useClass: VisualizationV1Adapter,
          },
          {
            provide: SceneAdapter,
            useClass: StorageV1Adapter,
          },
        ],
      }).compileComponents();

      TestBed.inject(HttpTestingController);

      fixture = TestBed.createComponent(VisualViewerComponent);
      visualViewerComponent = fixture.componentInstance;
      fixture.detectChanges();

      expect(visualViewerComponent).toBeTruthy();
    });
  });

  describe('API', () => {
    let visualViewerService: VisualViewerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [VisualViewerComponent],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          I18nTestingModule,
          VisualViewerToolbarButtonModule,
          VisualViewerAnimationSliderModule,
        ],
        providers: [
          provideConfigFactory(getTestConfig),
          provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
          {
            provide: LanguageService,
            useValue: mockLanguageService,
          },
          {
            provide: VisualViewerAnimationSliderComponent,
            useClass: MockVisualViewerAnimationSliderComponent,
          },
        ],
      }).overrideComponent(VisualViewerComponent, {
        set: {
          providers: [
            {
              provide: VisualViewerService,
              useClass: MockVisualViewerService,
            },
            {
              provide: LanguageService,
              useValue: mockLanguageService,
            },
          ],
        },
      });

      fixture = TestBed.createComponent(VisualViewerComponent);
      visualViewerComponent = fixture.componentInstance;
      visualViewerService = visualViewerComponent['visualViewerService'];
    });

    const getGetter = (property: keyof VisualViewerService) =>
      spyOnProperty(visualViewerService, property, 'get').and.callThrough();

    const getSetter = (property: keyof VisualViewerService) =>
      spyOnProperty(visualViewerService, property, 'set').and.callThrough();

    describe('backgroundTopColor', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('backgroundTopColor');
        const getterSpy = getGetter('backgroundTopColor');
        visualViewerComponent.backgroundTopColor =
          visualViewerComponent.backgroundTopColor;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('backgroundBottomColor', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('backgroundBottomColor');
        const getterSpy = getGetter('backgroundBottomColor');
        visualViewerComponent.backgroundBottomColor =
          visualViewerComponent.backgroundBottomColor;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('hotspotSelectionColor', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('hotspotSelectionColor');
        const getterSpy = getGetter('hotspotSelectionColor');
        visualViewerComponent.hotspotSelectionColor =
          visualViewerComponent.hotspotSelectionColor;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('showAllHotspotsEnabled', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('showAllHotspotsEnabled');
        const getterSpy = getGetter('showAllHotspotsEnabled');
        visualViewerComponent.showAllHotspotsEnabled =
          visualViewerComponent.showAllHotspotsEnabled;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('showAllHotspotsColor', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('showAllHotspotsColor');
        const getterSpy = getGetter('showAllHotspotsColor');
        visualViewerComponent.showAllHotspotsColor =
          visualViewerComponent.showAllHotspotsColor;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('outlineColor', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('outlineColor');
        const getterSpy = getGetter('outlineColor');
        visualViewerComponent.outlineColor = visualViewerComponent.outlineColor;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('outlineWidth', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('outlineWidth');
        const getterSpy = getGetter('outlineWidth');
        visualViewerComponent.outlineWidth = visualViewerComponent.outlineWidth;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('selectionMode', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('selectionMode');
        const getterSpy = getGetter('selectionMode');
        visualViewerComponent.selectionMode =
          visualViewerComponent.selectionMode;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('selectedProductCodes', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('selectedProductCodes');
        const getterSpy = getGetter('selectedProductCodes');
        visualViewerComponent.selectedProductCodes =
          visualViewerComponent.selectedProductCodes;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('includedProductCodes', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('includedProductCodes');
        const getterSpy = getGetter('includedProductCodes');
        visualViewerComponent.includedProductCodes =
          visualViewerComponent.includedProductCodes;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('excludedOpacity', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('excludedOpacity');
        const getterSpy = getGetter('excludedOpacity');
        visualViewerComponent.excludedOpacity =
          visualViewerComponent.excludedOpacity;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('animationTime', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('animationTime');
        const getterSpy = getGetter('animationTime');
        visualViewerComponent.animationTime =
          visualViewerComponent.animationTime;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('animationTotalDuration', () => {
      it('should delegate to VisualViewerService', () => {
        const getterSpy = getGetter('animationTotalDuration');
        const animationTotalDuration =
          visualViewerComponent.animationTotalDuration;
        expect(animationTotalDuration).toBeDefined();
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('animationPosition', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('animationPosition');
        const getterSpy = getGetter('animationPosition');
        visualViewerComponent.animationPosition =
          visualViewerComponent.animationPosition;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('animationPlaying', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('animationPlaying');
        const getterSpy = getGetter('animationPlaying');
        visualViewerComponent.animationPlaying =
          visualViewerComponent.animationPlaying;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('navigationMode', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('navigationMode');
        const getterSpy = getGetter('navigationMode');
        visualViewerComponent.navigationMode =
          visualViewerComponent.navigationMode;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('isolateModeEnabled', () => {
      it('should delegate to VisualViewerService', () => {
        const setterSpy = getSetter('isolateModeEnabled');
        const getterSpy = getGetter('isolateModeEnabled');
        visualViewerComponent.isolateModeEnabled =
          visualViewerComponent.isolateModeEnabled;
        expect(setterSpy).toHaveBeenCalledTimes(1);
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('is2D', () => {
      it('should delegate to VisualViewerService', () => {
        const getterSpy = getGetter('is2D');
        const is2D = visualViewerComponent.is2D;
        expect(is2D).toBeDefined();
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('viewportReady', () => {
      it('should delegate to VisualViewerService', () => {
        const getterSpy = getGetter('viewportReady');
        const viewportReady = visualViewerComponent.viewportReady;
        expect(viewportReady).toBeDefined();
        expect(getterSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('activateHomeView', () => {
      it('should delegate to VisualViewerService', () => {
        const spy = spyOn(visualViewerService, 'activateHomeView');
        visualViewerComponent.activateHomeView();
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('playAnimation', () => {
      it('should delegate to VisualViewerService', () => {
        const spy = spyOn(visualViewerService, 'playAnimation');
        visualViewerComponent.playAnimation();
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('pauseAnimation', () => {
      it('should delegate to VisualViewerService', () => {
        const spy = spyOn(visualViewerService, 'pauseAnimation');
        visualViewerComponent.pauseAnimation();
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });

    describe('loadVisualization', () => {
      it('should delegate to VisualViewerService', () => {
        const spy = spyOn(visualViewerService, 'loadVisualization');
        visualViewerComponent.loadVisualization('a product code');
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
