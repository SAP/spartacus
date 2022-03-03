import { ContentType } from './content-type';

/**
 * Information about a visualization stored in an EPD Visualization service.
 */
export interface VisualizationInfo {
  /**
   * The visualization ID.
   */
  visualizationId: string;
  /**
   * The visualization version.
   */
  version: string;
  /**
   * The scene ID.
   */
  sceneId: string;
  /**
   *  The content type of the visualization.
   */
  contentType: ContentType;
  /**
   * The visualization category.
   */
  category: string;
  /**
   * The folderId of the folder containing the visualization. This is intended for debugging purposes only.
   */
  folderId: string;
}
