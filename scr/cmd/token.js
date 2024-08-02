const axios = require("axios");

module["exports"] = class {
  static config = {
    name: "tokengetter",
    version: "1.0.0",
    description: "Get EAAD6V7 and EAAAAU tokens and cookies",
    usage: "[tokengetter <username> | <password>]",
    cooldown: 5,
    accessableby: 0,
    author: "heru",
    prefix: true,
  };

  static async start({ api, event, text, react, reply }) {
    const input = text.join(" ");
    const [username, password] = input.split(" | ");

    if (!username || !password) {
      return reply("Usage: tokengetter <username> | <password>");
    }

    react("⏱️");

    try {
      const response = await axios.get(`https://markdevs-last-api-as2j.onrender.com/api/token&cookie`, {
        params: {
          username,
          password
        }
      });

      const { access_token_eaad6v7, access_token, cookies } = response.data.data;

      const message = `
☘ Generated Tokens and Cookie ☘
━━━━━━━━━━━━━━━━━━━

EAAD6V7 TOKEN:
${access_token_eaad6v7}

━━━━━━━━━━━━━━━━━━━

EAAAAU TOKEN:
${access_token}

━━━━━━━━━━━━━━━━━━━

COOKIE:
${cookies}

━━━━━━━━━━━━━━━━━━━
`;

      react("✅");
      return reply(message);

    } catch (error) {
      console.error('Error:', error);
      react("❌");
      return reply("Error while getting the tokens and cookie.");
    }
  }
};
