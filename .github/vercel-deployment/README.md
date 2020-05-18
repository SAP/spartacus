# Vercel Deployment

> Vercel is a cloud platform for static sites and Serverless Functions

This action make a Vercel deployment with github actions. 

- [x] Deploy to Vercel.
- [ ] Comment on pull request.
- [ ] Comment on commit.
- [ ] Create Deployment on github.

## Inputs

### `vercel-token`

**required** Vercel now token.

### `vercel-team-id`

This is required if your deployment is made on team project. example: `team_asdf1234`

### `github-token`

**required** This is required to comment on pull request.

### `now-args`

This is optional args for `now` cli. Example: `--prod`

## Outputs

### `preview-url`

The url of deployment preview.

## Example Usage

This is a complete `.github/workflow/deploy.yml` example.

```yaml
name: deploy website
on: [pull_request]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: ./.github/vercel-deployment
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-team-id: team_XXXXXXXXXXX
          now-args: '--prod'
```
