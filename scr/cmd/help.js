const fs = require("fs");

module.exports = {
  config: {
    name: "help",
    accessableby: 0,
    usage: "[page]",
    prefix: false
  },
  start: async function ({ text, reply }) {
    try {
      const path = process.cwd() + "/scr/cmd";
      const files = fs.readdirSync(path);
      const commands = files
        .filter(file => file.endsWith(".js"))
        .map(file => require(`${path}/${file}`).config);

      let page;
      let commandsPerPage;
      let output = "";

      if (text[0] === "all") {
        output += "─────✧･ﾟ: *✧･\n";
        output += "»{ 𝗔𝗹𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁 }«「 Heru Bot」\n";
        output += "「 𝗣𝗥𝗘𝗙𝗜𝗫 : [➭ - « ]\n\n";
        commands.forEach((command, index) => {
          output += `➭ ${index + 1} ]prefix${command.name}\n`;
        });
        output += "\n𝓟𝓪𝓰𝓮 (1/1)\n";
        output += "»𝐇𝐄𝐑𝐔𝐁𝐎𝐓«\n";
        output += "•.:°❀×═══════════════×❀°:.•";
      } else {
        page = parseInt(text[0], 10) || 1;
        commandsPerPage = 10;
        const totalPages = Math.ceil(commands.length / commandsPerPage);

        if (page < 1 || page > totalPages) return reply("Invalid page number.");

        const startIndex = (page - 1) * commandsPerPage;
        const commandList = commands.slice(startIndex, startIndex + commandsPerPage);

        output += "─────✧･ﾟ: *✧･\n";
        output += "»{ 𝗔𝗹𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁 }«「 Heru Bot」\n";
        output += "「 𝗣𝗥𝗘𝗙𝗜𝗫 : [➭ - « ]\n\n";
        commandList.forEach((command, index) => {
          output += `➭ ${startIndex + index + 1} ]prefix${command.name}\n`;
        });
        output += `\n𝓟𝓪𝓰𝓮 (${page}/${totalPages})\n`;
        output += "»𝐇𝐄𝐑𝐔𝐁𝐎𝐓«\n";
        output += "•.:°❀×═══════════════×❀°:.•";
      }

      return reply({ body: output });
    } catch (error) {
      return reply(error.message);
    }
  }
};
