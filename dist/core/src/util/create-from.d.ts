import { Type } from '@angular/core';
/**
 * Creates an instance of the given class and fills its properties with the given data.
 *
 * @param type reference to the class
 * @param data object with properties to be copied to the class
 */
export declare function createFrom<T extends object>(type: Type<T>, data: T): T;
