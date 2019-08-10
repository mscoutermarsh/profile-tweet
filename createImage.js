require("request");
const request = require("request-promise");
const generateHTML = require("./generateHTML");

const { HCTI_API_ID: hctiApiID, HCTI_API_SECRET: hctiApiSecret } = process.env;

// Define your HTML/CSS

async function createTweetImage(id) {
  const data = {
    html: generateHTML(id),
    google_fonts: "Roboto"
  };

  console.log(data);

  const image = await request
    .post({ url: "https://hcti.io/v1/image", form: data })
    .auth(hctiApiID, hctiApiSecret);

  const { url } = JSON.parse(image);
  return url;
}

module.exports = createTweetImage;
