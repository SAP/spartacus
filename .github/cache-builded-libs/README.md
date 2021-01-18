# Cache builded libs

This action should be ran on branches that are often merge base.

It install dependencies, builds libraries (not the app!) and then caches the `dist` directory.
You can access cache with key: `dist-<sha of commit from the base branch>`.

It is useful, if you need to compare state of head branch in comparison to base branch (eg. public API, size of the libs).
When you have cache hit you don't need to build the libs from scratch and can save few minutes of action execution time.
