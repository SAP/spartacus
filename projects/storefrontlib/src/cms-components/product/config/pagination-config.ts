export abstract class PaginationConfig {
  pagination?: {
    infiniteScroll?: {
      active?: boolean;
      showMoreButton?: boolean;
      limit?: number;
    };
  };
}
