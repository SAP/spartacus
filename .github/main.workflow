workflow "API extractor" {
  resolves = ["Breaking change detection bot"]
  on = "pull_request"
}

action "Breaking change detection bot" {
  uses = "./.github/api-extractor-action"
  secrets = ["GITHUB_TOKEN"]
}
