workflow "API extractor" {
  resolves = ["Breaking change detection bot"]
  on = "push"
}

action "Breaking change detection bot" {
  uses = "./.github/api-extractor-action"
  secrets = ["GITHUB_TOKEN"]
}
