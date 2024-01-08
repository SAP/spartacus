/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
/**
 * Use this pipe when you want to apply a (preferably) pure function (i.e. a function that doesn't use "this")
 *
 * Doing so is more efficient than directly calling the function in the template file because
 * the pipe will re-execute during a detection cycle only when the arguments have changed.
 *
 * ex:
 *
 * my-component.component.ts:
 * ```
 *   unfilteredArray = ['a', 'b', 'c', 'd', 'e']
 *   targetStrings = ['a', 'b', 'c'];
 *
 *    filterArrayByString(array: Array<string>, targetString: string): Array<string> {
 *     return array.filter((element) => element === targetString);
 *   }
 * ```
 *
 * my-component.component.html:
 * ```
 *   <div *ngFor="let targetString of targetStrings">
 *     <app-some-component [filteredArray]="filterArrayByString | cxArgs: unfilteredArray : targetString">
 *  </div>
 * ```
 */
@Pipe({ name: 'cxArgs' })
export class ArgsPipe implements PipeTransform {
  transform<A extends Array<any>, R>(
    projectionFunction: (...arglist: A) => R,
    ...args: A
  ): R {
    return projectionFunction(...args);
  }
}
