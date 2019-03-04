export type PageTitleResolver = {
  resolveTitle(...args);
};

export type PageDescriptionResolver = {
  resolveDescription(...args);
};

export interface PageRobotsResolver {
  resolveRobots(...args);
}
