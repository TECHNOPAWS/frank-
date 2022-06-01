const config = require("../config.json")
const { MessageEmbed } = require("discord.js") 
module.exports = {
  name: "eval",
  run: async (client,message,args) => {

    const notowner = new MessageEmbed()
    .setDescription("Only the owner of this bot can use this command!")
    .setColor("RED");
    
    if(!config.devings.includes(message.author.id)) return message.channel.send({ embeds: [notowner] });

    const clean = async (text) => {
      let regex = new RegExp(process.env.token, `g`)
      if (typeof text === "string")
        return (
          text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(regex, "[Something Important]")
        );
      else return text;
    };
    let code = args.join(" ");
    if (!code) {
      return message.channel.send("You didnt add anything for me to eval with ;-;");
    }
    if(code.includes('token')) return message.channel.send("You cant make me leak my token ")
    if(code.includes('process.exit') && message.author.id != '800985072014196756') return message.channel.send("No!")
    let regex = new RegExp(process.env.token, `g`)
    code = code.replace(regex, "[Something Important]");

    try {
      let evalCode = code.includes(`await`)
        ? `;(async () => { ${code} })().then(output => output)`
        : code;
      let evaled = await clean(eval(evalCode));
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      let output;
      if (evaled !== undefined) {
        output = `\`\`\`js\n` + evaled + `\n\`\`\``;
      } else {
        output = `\`\`\`fix\nNo Output To Show.\n\`\`\``;
      }
      output = output.length > 1024 ? "```fix\nLarge Output\n```" : output;
      
      output = output.replace(
        new RegExp(client.token, "g"),
        "[Something Important]"
      );
      const embed = new MessageEmbed()
        .setAuthor({ name: "Eval", iconURL: message.author.avatarURL() })
        .addField("Input", `\`\`\`js\n${code}\n\`\`\``)
        .addField("Output", output)
        .setColor("#00ffee")
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      const errorEmb = new MessageEmbed()
        .setAuthor({ name: "Eval", iconURL: message.author.avatarURL() })
        .setColor(`#ff0000`)
        .addField("Input", `\`\`\`js\n${code}\n\`\`\``)
        .addField("Error", `\`\`\`js\n${err}\n\`\`\``);
      
      message.author.send({ embeds: [errorEmb] });
    }
 
  }
}