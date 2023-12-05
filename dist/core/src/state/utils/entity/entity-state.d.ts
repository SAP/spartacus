export interface EntityState<T> {
    entities: {
        [id: string]: T;
    };
}
