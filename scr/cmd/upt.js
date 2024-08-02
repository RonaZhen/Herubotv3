module.exports.start = async function ({ text, reply }) {
  const axios = require("axios");
  const time = process.uptime();
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);
  const id = text[0] || "4";
  const gh = "miyamura";
  const insta = "heru_09";
  const fb = "Jay Mar";
  const bname = global.deku.BOTNAME;
  const res = (
    await axios.get(
      global.deku.ENDPOINT +
        `/canvas/uptime?id=${id}&instag=${insta}&ghub=${gh}&fb=${fb}&hours=${hours}&minutes=${minutes}&seconds=${seconds}&botname=${bname}`,
      {
        responseType: "stream",
      },
    )
  ).data;
  return reply({
    body:
      "⌛:" +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      "\nCharacter ID: " +
      id +
      "\nBot Name: " +
      bname,
    attachment: res,
  });
};
module.exports.config = {
  name: "upt",
  prefix: false,
  accessibleby: 0,
  description: "Upt",
  credits: "Deku",
  category: "system",
};
