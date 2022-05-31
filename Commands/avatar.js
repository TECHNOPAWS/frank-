module.exports = {
  name: ['av', 'avatar'],
  run: async (client, message, args, Discord) => {
    let mem = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]) || message.member;

    let e = mem.user.tag
    const avatar = new Discord.MessageEmbed()
    .setTitle(`${e}'s avatar`)
    .setImage(mem.displayAvatarURL({size:4096, dynamic:true}))
    .setFooter('requested by' + message.author.username, message.author.displayAvatarURL())
    .setColor("#20a7d4")

    message.channel.send({embeds:[avatar]})
  }
}