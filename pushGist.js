const USER = "mscoutermarsh";
const PASS = process.env.GH_TOKEN;
const REPO = `gist.github.com/${process.env.GIST_ID}`;

const git = require("simple-git/promise");
const remote = `https://${USER}:${PASS}@${REPO}`;
const fs = require("fs-extra");

require("request");
const request = require("request-promise");
const download = require("image-downloader");

async function pushGist(url, filename) {
  await fs.remove("./working_dir");
  await git()
    .silent(true)
    .clone(remote, "./working_dir");

  const options = {
    url: url,
    dest: `./working_dir/${filename}.png`
  };

  await download.image(options);

  let repo = git("./working_dir");

  await repo.rm("./*");
  await repo.commit("remove old file");
  await repo.add("./*");
  await repo.commit("update tweet");
  await repo.push();
}

module.exports = pushGist;
