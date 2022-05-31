module.exports = {
  name:['roleav', 'rav'],
  run: async(client,message,args,Discord) => {
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!role) return message.channel.send("role pls")
   const config = require('../config.json')
    if(!config.devings.includes(message.member.id)) return message.channel.send("Permissions go brr")

    role.members.forEach(c => {
      const h = c.displayAvatarURL({size:4096,dynamic:true})

      const embed = new Discord.MessageEmbed()
      .setTitle(`${c.user.tag}`)
      .setImage(h)
      .setColor("BLUE")
      
      message.channel.send({embeds:[embed]})
    })


  }
}