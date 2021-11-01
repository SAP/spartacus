import { VisualizationInfo } from '../../../models/visualizations/visualization-info';

export enum VisualizationLoadResult {
  Success,
  NoMatchFound,
  MultipleMatchesFound,
  UnexpectedError,
}

/**
 * Information relating to an attempt to resolve and load a visualization.
 */
export interface VisualizationLoadInfo {
  result: VisualizationLoadResult;
  matches?: VisualizationInfo[];
  visualization?: VisualizationInfo;
  errorMessage?: string;
}
