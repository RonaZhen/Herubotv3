const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "gore",
    description: "Send a random gore video",
    usage: "[randomgore]",
    cooldown: 5,
    accessableby: 0, // Accessible by everyone
    category: "Entertainment",
    prefix: false,
    author: "heru",
  },
  start: async function({ api, event, react, reply }) {
    const allowedUserID = '100077070762554';

    // Check if the user ID matches the allowed user
    if (event.senderID !== allowedUserID) {
      return reply("You do not have permission to use this command.");
    }

    try {
      react("⏱️");
      const ronapretty = await new Promise(resolve => {
        api.sendMessage('Fetching a random gore video, please wait...', event.threadID, (err, info) => {
          resolve(info);
        });
      });

      const ronadev = await axios.get('https://joshweb.click/api/randgre');
      const heru = ronadev.data.result;

      if (!heru || heru.length === 0) {
        await api.editMessage('No gore videos found.', ronapretty.messageID);
        return;
      }

      const { title, source, view, comment, vote, video1: videoUrl } = heru;

      if (!videoUrl) {
        await api.editMessage('No valid gore video found.', ronapretty.messageID);
        return;
      }

      const message = `Title: ${title}\nSource: ${source}\nViews: ${view}\nComments: ${comment}\nVotes: ${vote}`;

      const filePath = path.join(__dirname, '/cache/gore_video.mp4');
      const writer = fs.createWriteStream(filePath);

      const videoResponse = await axios({
        method: 'get',
        url: videoUrl,
        responseType: 'stream'
      });

      videoResponse.data.pipe(writer);

      writer.on('finish', async () => {
        react("✅");
        await api.sendMessage(
          { body: message, attachment: fs.createReadStream(filePath) },
          event.threadID,
          () => fs.unlinkSync(filePath)
        );
        await api.editMessage('Here is your random gore video!', ronapretty.messageID);
      });

      writer.on('error', async () => {
        react("❌");
        await api.editMessage('An error occurred while downloading the video.', ronapretty.messageID);
      });

    } catch (error) {
      console.error('Error:', error);
      react("❌");
      await api.editMessage('An error occurred while processing the request.', ronapretty.messageID);
    }
  }
};
          
