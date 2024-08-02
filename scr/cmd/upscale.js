module.exports = {
  config: {
    name: "upscale",
    description: "Ehhance image",
    prefix: false,
    usage: "[url, reply to image]",
    accessableby: 0,
  },
  start: async function ({ text, reply, event }) {
    const axios = require("axios");
    const fs = require("fs");
    let url,
      path = __dirname + "/cache/ok.png";
    if (event.type == "message_reply") {
      if (event.messageReply.attachments[0]?.type == "photo") {
        url = encodeURIComponent(event.messageReply.attachments[0].url);
        const res = (
          await axios.get(
            "https://api.lolhuman.xyz/api/upscale?apikey=GataDios&img=" + url,
            { responseType: "arraybuffer" },
          )
        ).data;
        fs.writeFileSync(path, Buffer.from(res, "utf-8"));
        return reply({ attachment: fs.createReadStream(path) });
      } else {
        return reply("Please reply to an image");
      }
    }
    if (!text[0]) return reply("Missing image URL");
    url = encodeURIComponent(text[0]);
    if (!url.startsWith("htt")) return reply("Invalid image url");
    const res = (
      await axios.get(
        "https://api.lolhuman.xyz/api/upscale?apikey=GataDios&img=" + url,
        { responseType: "arraybuffer" },
      )
    ).data;
    fs.writeFileSync(path, Buffer.from(res, "utf-8"));
    return reply({ attachment: fs.createReadStream(path) });
  },
};
