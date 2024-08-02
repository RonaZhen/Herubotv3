const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "anivid",
    description: "Get random anime video",
    usage: "anivid",
    cooldown: 10,
    accessableby: 0,
    category: "Fun",
    prefix: false,
    author: "heru",
  },
  start: async function ({ api, event, react, reply }) {
    react("🕐");

    try {
      const response = await axios.get("https://ani-vid-0kr2.onrender.com/kshitiz");
      const postData = response.data.posts;
      const randomIndex = Math.floor(Math.random() * postData.length);
      const randomPost = postData[randomIndex];

      const videoUrls = randomPost.map(url => url.replace(/\\/g, "/"));
      const selectedUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
      const videoResponse = await axios.get(selectedUrl, { responseType: "stream" });

      const tempVideoPath = path.join(__dirname, "cache", `${Date.now()}.mp4`);
      const writer = fs.createWriteStream(tempVideoPath);
      videoResponse.data.pipe(writer);

      writer.on("finish", async () => {
        const stream = fs.createReadStream(tempVideoPath);
        await api.sendMessage({
          body: `Random anime video.`,
          attachment: stream,
        }, event.threadID, event.messageID);

        react("✅");
        fs.unlink(tempVideoPath, (err) => {
          if (err) console.error(err);
          console.log(`Deleted ${tempVideoPath}`);
        });
      });
    } catch (error) {
      console.error(error);
      reply("Sorry, an error occurred while processing your request.");
    }
  },
  auto: async function ({ api, event, text, reply, User }) {
    // auto is not used in this command
  }
};
                  
