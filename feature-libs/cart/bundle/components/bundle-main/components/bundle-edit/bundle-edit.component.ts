/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'cx-bundle-edit',
  templateUrl: './bundle-edit.component.html',
})
export class BundleEditComponent implements OnInit {

  ngOnInit(): void {
    console.log("this is bunle edit");
  }
}
