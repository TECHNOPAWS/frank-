module.exports = {
  name: ["cdn", "countdown", "cdn-timer"],
  run: async (client, message, args, Discord) => {

    const time = args[0];

    const notnum = new Discord.MessageEmbed()
      .setDescription("That is not a number")
      .setColor("ORANGE");

    if (!time) return message.channel.send("Tell the time in seconds");

    if (isNaN(time)) return message.channel.send({ embeds: [notnum] });

    let e = Number(time);

    message.channel.send("timer" + ` ${e}`).then((m) => {
      let interval = setInterval(() => {
        e--
        if (e) m.edit(`${e}`);
        else {
          m.edit(`Timer ended.`);
          clearInterval(interval);
        }
      }, 1000);
    });

    message.delete();
  },
};