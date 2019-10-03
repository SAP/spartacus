export abstract class ViewConfig {
  view?: {
    /**
     * Configurations related to the view of the application
     */
    infiniteScroll?: {
      active?: boolean;
      productLimit?: number;
      showMoreButton?: boolean;
    };
  };
}
