export interface NavigationNode {
  title?: string;
  url?: string;
  target?: string | boolean;
  children?: Array<NavigationNode>;
}
