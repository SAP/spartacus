/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
/**
 * Use this pipe when you want to apply a (peferably) pure function (i.e. a function that doesn't use "this")
 * to some arguments directly in a template file.
 *
 * Doing so is more efficient than directly calling the function in the template file because
 * the pipe will know whether or not to re-execute when a new change detection cycle is in progress.
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
 * my-component.html:
 * ```
 *   <div *ngFor="let targetString of targetStrings">
 *    <app-some-component [filteredArray]="filterArrayByString | args: unfilteredArray : filterArrayByString : targetString">
 *    </app-some-component>
 *  </div>
 * ```
 */
@Pipe({ name: 'args' })
export class ArgsPipe implements PipeTransform {
  transform<A extends Array<any>, R>(
    projectionFunction: (...args: A) => R,
    ...args: A
  ): R {
    return projectionFunction(...args);
  }
}
