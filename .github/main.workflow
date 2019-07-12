workflow "API extractor" {
  resolves = ["Hello World"]
  on = "pull_request"
}

action "Hello World" {
  uses = "./.github/api-extractor-action"
  secrets = ["GITHUB_TOKEN"]
}
