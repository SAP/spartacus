export abstract class PaginationConfig {
  pagination?: {
    infiniteScroll?: {
      isActive: boolean;
      limit: number;
    };
  };
}
