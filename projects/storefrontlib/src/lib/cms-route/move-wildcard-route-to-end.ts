import { Router } from '@angular/router';

/**
 * Move the Route with double asterisk (**) to the end of the list.
 * If there are more Routes with **, only the first will be left and other removed.
 *
 * Reason: When some custom Routes are injected after Spartacus' ones,
 *          then the Spartacus' wildcard Route needs being moved to the end -
 *          even after custom Routes - to make custom Routes discoverable.
 *          More than one wildcard Route is a sign of bad config, so redundant copies are removed.
 */
export function moveWildcardRouteToEnd(router: Router) {
  const routes = router.config;
  const firstWildcardRoute = routes.find(route => route.path === '**');
  const newRoutes = Boolean(firstWildcardRoute)
    ? routes.filter(route => route.path !== '**').concat(firstWildcardRoute)
    : routes;
  router.resetConfig(newRoutes);
}
