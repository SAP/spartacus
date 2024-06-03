import { TestBed } from '@angular/core/testing';
import {
  provideConfigFactory,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  ContentType,
  getEpdVisualizationDefaultConfig,
  UsageId,
  VisualizationInfo,
} from '@spartacus/epd-visualization/root';
import { Observable, of } from 'rxjs';
import { getTestConfig } from '../../../root/testing/epd-visualization-test-config';
import { LookupVisualizationsResponse } from '../../connectors/visualization/lookup-visualizations-response';
import { VisualizationAdapter } from '../../connectors/visualization/visualization.adapter';
import { VisualizationLookupService } from './visualization-lookup.service';

class MockVisualizationAdapter extends VisualizationAdapter {
  constructor(protected visualizationInfos: VisualizationInfo[]) {
    super();
  }

  lookupVisualization(
    _visualizationUsageId: UsageId,
    _folderUsageId: UsageId
  ): Observable<LookupVisualizationsResponse> {
    return of({
      visualizations: this.visualizationInfos,
    });
  }
}

describe('VisualizationLookupService', () => {
  describe('findMatchingVisualizations', () => {
    it('should filter content types', (done) => {
      const vis2DDrawing = {
        visualizationId: '2DDrawingVis',
        contentType: ContentType.Drawing2D,
        version: 'v1',
        sceneId: 'irrelevant value',
        folderId: 'irrelevant value',
        category: 'irrelevant value',
      };

      const vis3DModel = {
        visualizationId: '3DModelVis',
        contentType: ContentType.Model3D,
        version: 'v1',
        sceneId: 'irrelevant value',
        folderId: 'irrelevant value',
        category: 'irrelevant value',
      };

      const vis2DImage = {
        visualizationId: '2DImageVis',
        contentType: '2DImage' as ContentType,
        version: 'v1',
        sceneId: 'irrelevant value',
        folderId: 'irrelevant value',
        category: 'irrelevant value',
      };

      const visNavigation = {
        visualizationId: 'NavigationVis',
        contentType: 'Navigation' as ContentType,
        version: 'v1',
        sceneId: 'irrelevant value',
        folderId: 'irrelevant value',
        category: 'irrelevant value',
      };

      const visualizationAdapter = new MockVisualizationAdapter([
        vis2DImage,
        vis2DDrawing,
        vis3DModel,
        visNavigation,
      ]);

      TestBed.configureTestingModule({
        providers: [
          provideConfigFactory(getTestConfig),
          provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
          {
            provide: VisualizationAdapter,
            useValue: visualizationAdapter,
          },
        ],
      });

      const visualizationLookupService: VisualizationLookupService =
        TestBed.inject(VisualizationLookupService);

      visualizationLookupService
        .findMatchingVisualizations('irrelevant value')
        .subscribe((matchingVisualizations) => {
          expect(matchingVisualizations).toBeTruthy();
          expect(matchingVisualizations.length).toEqual(2);
          expect(matchingVisualizations[0]).toBe(vis2DDrawing);
          expect(matchingVisualizations[1]).toBe(vis3DModel);
          done();
        });
    });
  });
});
