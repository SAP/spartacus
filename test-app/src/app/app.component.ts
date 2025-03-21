/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'test-ng19-performance-improvements';

  // SPIKE CUT TASK
  shouldRender = false;
  ngOnInit() {
    setTimeout(() => {
      this.shouldRender = true;
    }, 0);
  }
}
