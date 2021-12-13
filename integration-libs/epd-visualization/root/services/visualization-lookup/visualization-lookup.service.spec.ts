import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ContentType } from '../../models/visualizations/content-type';
import { EpdVisualizationConfig } from '../../config';
import { getTestConfig } from '../../testing/epd-visualization-test-config';
import { UsageId } from '../../models/usage-ids/usage-id';
import { VisualizationInfo } from '../../models/visualizations/visualization-info';
import { VisualizationLookupService } from './visualization-lookup.service';
import { LookupVisualizationsResponse } from '../../connectors/visualization/lookup-visualizations-response';
import { VisualizationAdapter } from '../../connectors/visualization/visualization.adapter';

class MockVisualizationAdapter extends VisualizationAdapter  {
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
    let epdVisualizationConfig: EpdVisualizationConfig;

    it('should filter content types', (done) => {
      epdVisualizationConfig = getTestConfig();

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
          {
            provide: EpdVisualizationConfig,
            useValue: epdVisualizationConfig,
          },
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
