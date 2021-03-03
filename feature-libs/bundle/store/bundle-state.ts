export const BUNDLE_FEATURE = 'bundles';
export const BUNDLE_DATA = '[Bundle] Bundle Data';

export interface StateWithBundle {
  [BUNDLE_FEATURE]: BundleState;
}

export interface BundleState {}
