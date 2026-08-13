/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeBaseComponent } from './configurator-attribute-base.component';

/**
 * Common base for attribute types that offer selectable values (single- and
 * multi-selection). It owns the component level `loading$` flag and takes care
 * of resetting it once a configuration update round trip has finished.
 *
 * This behavior is intentionally not placed on `ConfiguratorAttributeBaseComponent`,
 * as several of its other children (e.g. the input field, header, footer or
 * read-only component) neither maintain a `loading$` flag nor rely on this reset.
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class ConfiguratorAttributeSelectionBaseComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnDestroy
{
  loading$ = new BehaviorSubject<boolean>(false);

  protected subscription = new Subscription();

  protected configuratorCommonsService = inject(ConfiguratorCommonsService);
  protected attributeComponentContext = inject(
    ConfiguratorAttributeCompositionContext
  );

  constructor() {
    super();
    this.resetLoadingOnConfigurationUpdate();
  }

  /**
   * Resets the loading state once the configuration update round trip has
   * finished, regardless of whether the attribute content actually changed.
   * This is required because the attribute component is only re-created (which
   * would reset `loading$`) when its content changes. With CPQ API V2 a round
   * trip might not change the attribute, leaving action buttons disabled.
   */
  protected resetLoadingOnConfigurationUpdate(): void {
    this.subscription.add(
      this.configuratorCommonsService
        .isConfigurationLoading(this.attributeComponentContext.owner)
        .pipe(filter((loading) => !loading))
        .subscribe(() => this.loading$.next(false))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
