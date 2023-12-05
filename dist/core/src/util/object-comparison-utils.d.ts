export declare class ObjectComparisonUtils {
    static shallowEqualObjects(objA: object, objB: object): boolean;
    static deepEqualObjects(objA: object, objB: object): boolean;
    protected static compareObjectProperties(objA: object, objB: object): boolean;
    static countOfDeepEqualObjects(obj: any, arr: Array<any>): number;
    static indexOfFirstOccurrence(obj: any, arr: Array<any>): number | undefined;
}
