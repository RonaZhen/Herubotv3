const axios = require("axios");

module.exports = {
  config: {
    name: "bot",
    version: "1.0.0",
    role: 0,
    aliases: ["bot"],
    credits: "cliff | convert by heru", //api by mark
    description: "Talk to sim",
    usage: "[message]",
    cooldown: 0,
    accessableby: 0,
    category: "General",
    prefix: false
  },
  start: async function({ api, event, text, react, reply }) {
    const { messageID, threadID } = event;
    const content = encodeURIComponent(text.join(" "));
    if (!text[0]) return reply("Please type a message...");

    try {
      const res = await axios.get(`https://mighty-taiga-33992-6547d84cd219.herokuapp.com/sim?q=${content}`);
      const respond = res.data.response;
      if (res.data.error) {
        reply(`Error: ${res.data.error}`);
      } else {
        reply(respond);
      }
    } catch (error) {
      console.error(error);
      reply("An error occurred while fetching the data.");
    }
  },
  handleEvent: async function({ api, event, react, reply }) {
    const messageContent = event.body.trim().toLowerCase();

    if ((event.messageReply && event.messageReply.senderID === api.getCurrentUserID()) || (messageContent.startsWith("sim") && event.senderID !== api.getCurrentUserID())) {
      const input = messageContent.replace(/^sim\s*/, "").trim();
      const content = encodeURIComponent(input);

      try {
        const res = await axios.get(`https://mighty-taiga-33992-6547d84cd219.herokuapp.com/sim?q=${content}`);
        const respond = res.data.response;
        if (res.data.error) {
          reply(`Error: ${res.data.error}`);
        } else {
          reply(respond);
        }
      } catch (error) {
        console.error("Error in handleEvent:", error.message);
        reply("An error occurred while processing your request.");
      }
    }
  }
};
