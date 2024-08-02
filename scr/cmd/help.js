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
        output += "✿ 𝙰𝙻𝙻 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙻𝙸𝚂𝚃 ✿\n";
        output += "━━━━━━━━━━━━━━━\n";
        commands.forEach(command => {
          output += ` ✿ ➤ ${command.name}\n`;
        });
        output += "━━━━━━━━━━━━━━━\n";
        output += "𝚃𝚘𝚝𝚊𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜: " + commands.length + "\n";
        output += `➤ Type "help [page]" to see commands by page.`;
      } else {
        page = parseInt(text[0], 10) || 1;
        commandsPerPage = 10;
        const totalPages = Math.ceil(commands.length / commandsPerPage);

        if (page < 1 || page > totalPages) return reply("Invalid page number.");

        const startIndex = (page - 1) * commandsPerPage;
        const commandList = commands.slice(startIndex, startIndex + commandsPerPage);

        output += "✿ 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙻𝙸𝚂𝚃 ✿\n";
        output += "━━━━━━━━━━━━━━━\n";
        commandList.forEach(command => {
          output += ` ✿ ➤ ${command.name}\n`;
        });
        output += "━━━━━━━━━━━━━━━\n";
        output += `𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙿𝙰𝙶𝙴 : <${page}/${totalPages}>\n`;
        output += "━━━━━━━━━━━━━━━\n";
        output += `𝚃𝚘𝚝𝚊𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜: ${commands.length}\n`;
        output += `➤ Type "help all" to see all commands.`;
      }

      return reply({ body: output });
    } catch (error) {
      return reply(error.message);
    }
  }
};
                            
