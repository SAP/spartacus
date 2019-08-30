export interface NavigationNode {
  title?: string;

  /** The url or route (parts) */
  url?: string | string[];

  target?: string | boolean;

  children?: Array<NavigationNode>;
}
