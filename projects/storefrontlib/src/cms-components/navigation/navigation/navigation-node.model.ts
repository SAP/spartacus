export interface NavigationNode {
  title?: string;

  /** The url or route (parts) */
  url?: string | string[];

  target?: string | boolean;

  children?: Array<NavigationNode>;

  /**
   * Style classes can be added to the navigation nodes to enhance the UX.
   * The style classes are typically derived from the (CMS) backend and should
   * match an existing CSS selector.
   *
   * The styleClasses can contain a "list" of space separated style classes.
   */
  styleClasses?: string;

  /**
   * Style rules can be added to the navigation nodes to enhance the UX.
   * The style attributes are typically derived from the (CMS) backend.
   *
   * The styleAttributes can contain a "list" of semicolon separated style rules.
   */
  styleAttributes?: string;
}
