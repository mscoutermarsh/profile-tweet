workflow "Update gist with latest tweet" {
  resolves = ["update-gist"]
  on = "push"
}

action "update-gist" {
  uses = "mscoutermarsh/bird-box@master"
  env = {
    TWITTER_USER = "mscoutermarsh"
    GIST_ID = "4a48fa97b93b6097509a89255a73cf4d"
  }
  secrets = [
    "TWITTER_CONSUMER_KEY",
    "TWITTER_CONSUMER_SECRET",
    "TWITTER_ACCESS_TOKEN_KEY",
    "TWITTER_ACCESS_TOKEN_SECRET",
    "GITHUB_TOKEN",
  ]
}
