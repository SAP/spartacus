export abstract class PaginationConfig {
  pagination?: {
    infiniteScroll?: {
      active?: boolean;
      button?: boolean;
      limit?: number;
    };
  };
}
