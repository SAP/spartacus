/** The element attribute used to store the focus state */
export const FOCUS_ATTR = 'data-cx-focus';
/** The element attribute used to store the focus group state */
export const FOCUS_GROUP_ATTR = 'data-cx-focus-group';

export const enum MOVE_FOCUS {
  NEXT = 1,
  PREV = -1,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseFocusConfig {}

export interface VisibleFocusConfig {
  /**
   * When set to true, the `mouse-focus` class is added to the host element,
   * indicating that the element focus should not be made visible.
   */
  disableMouseFocus?: boolean;
}

export interface BlockFocusConfig extends VisibleFocusConfig {
  block?: boolean;
}

export interface PersistFocusConfig extends BlockFocusConfig {
  /**
   * A key to maintain the focus of an element in case the component is
   * recreated (which often is the case when an `*ngIf` or `*ngFor` is used).
   */
  key?: string;

  /**
   * Optional group identifier that can be used to persist the focus. This allows
   * to have separate persisted focus available when the DOM is partially rebuild.
   */
  group?: string;
}

export interface EscapeFocusConfig extends PersistFocusConfig {
  focusOnEscape?: boolean;
  /**
   * Force an autofocus in case of double-escape
   */
  focusOnDoubleEscape?: boolean;
}

export interface AutoFocusConfig extends EscapeFocusConfig {
  /**
   * Autofocus is enabled by default, and will try to focus an _autofocus_ element.
   * In case the focus is explicitly set to `true`, the first accessible element
   * is focussed in case there is no _autofocus_ element found.
   * If the focus is set to false, autofocus will be disabled completely.
   *
   * If a string value is given, the autofocus will be restored based on the persisted
   * focus group, which is driven by `PersistFocusConfig.key` and `PersistFocusConfig.group`.
   *
   * Defaults to `true`.
   */
  autofocus?: boolean | string;

  /**
   * whenever the focus should be applied based on a specific trigger, you can user
   * the refreshFocus property. This property can be dynamically applied so that the refresh
   * only happens on specific occasions.
   *
   * The refreshFocus token doesn't have a specific format, it acts as a meaning less token that
   * will effect the ngOnChange lifecycle hook of the auto focus logic. Any truthy value will
   * autofocus the element dynamically.
   */
  refreshFocus?: unknown;
}

export interface TabFocusConfig extends AutoFocusConfig {
  tab?: boolean | 'scroll' | string;
}

export enum TrapFocus {
  /**
   * Will trap the focus at the start of the focus group.
   */
  start = 'start',
  /**
   * Will trap the focus only at the end of the focus group.
   */
  end = 'end',
  /**
   * Will not trap the focus in both directions. This is actually not are
   * a great example of focus trap, but it will give the benefit of keyboard
   * tabbing by arrows.
   */
  both = 'both',
}

export type TrapFocusType =
  | boolean
  | TrapFocus.start
  | TrapFocus.end
  | TrapFocus.both;

/**
 * The keyboard navigation (tab, shift-tab and up down keys) is _trapped_
 * for the nested focusable elements. This means that the focus can not
 * "leave" the elements. If the last element is focused, the keyboard will
 * navigate to the first element and visa versa.
 */
export interface TrapFocusConfig extends TabFocusConfig {
  /** traps the focus */
  trap?: TrapFocusType;
}

export interface LockFocusConfig extends TrapFocusConfig {
  /**
   * Indicates that the nested DOM is locked for keyboarding (`TAB`).
   */
  lock?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FocusConfig extends LockFocusConfig {}
