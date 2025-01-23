/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cx-epd-visualization-viewer-toolbar-button',
  templateUrl: './visual-viewer-toolbar-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VisualViewerToolbarButtonComponent {
  @Input() text = '';
  @Input() iconLibraryClass: string;
  @Input() iconClass: string;
  @Input() disabled = false;
  @Input() checked = false;
}
