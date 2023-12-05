import * as i0 from "@angular/core";
import * as i1 from "./split/split-view.component";
import * as i2 from "./view/view.component";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
/**
 * The split-view component supports an unlimited number of nested views. Nested views are rendered
 * next to each other. The views can be rendered next to each other, but the max number of visible
 * views can be limisted as well. This is configurable in the CSS layer, so that the max number of views
 * per split-view can be different for each component.
 *
 * The basic structure of the split-view component is shown below:
 *
 *
 * ```
 * <cx-split-view>
 * </cx-split-view>
 * ```
 *
 * The UX pattern used for the split-view is driven by an initial view, which gets splitted into
 * more views as soon as the user starts interacting with the initial and subsequantial views.
 * The views can be driven by routes, which means that you can navigate through the splitted views
 * by using the browser history as well as share or bookmark splitted views.
 *
 * The UI is implemented in the style layer, with only a few generic style rules. Most of the split
 * view style is driven by CSS properties, so that alternative split-view styles can be introduced
 * per page or component.
 *
 * The max number of views per split-view on mobile is limited to 1 by default, where as on tablet
 * (and higher) it is set to 2. Spartacus has a pretty narrow layout, which is why 2 is maximum,
 * but customers could alter the layout to bring in more views in the same split-view at the time.
 *
 */
export declare class SplitViewModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SplitViewModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SplitViewModule, [typeof i1.SplitViewComponent, typeof i2.ViewComponent], [typeof i3.CommonModule, typeof i4.RouterModule], [typeof i1.SplitViewComponent, typeof i2.ViewComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SplitViewModule>;
}
