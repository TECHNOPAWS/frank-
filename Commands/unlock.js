module.exports = {
  name:"unlock",
  run:async(client,message,args,Discord) => {
if (!message.member.permissions.has("MANAGE_MESSAGES")) return 
    
const chnl = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.channel
//-----------------------------------------------------
    
const joe = new Discord.MessageEmbed()
    .setDescription(`This channel is not locked`)
    .setColor("#bf00ff")
//-----------------------------------------------------
    
    const success = new Discord.MessageEmbed()
    .setTitle("SUCCESS")
    .setDescription(`successfully unlocked ${chnl}!`)
    .setColor("BLUE")
    .setFooter(message.author.username, message.author.displayAvatarURL)
//-----------------------------------------------------

    const fail = new Discord.MessageEmbed()
    .setTitle("FAIL")
    .setDescription("failed to unlock the channel. Make sure my role has permissions to do so")
    .setColor("RED")
    .setFooter( message.author.username + message.author.displayAvatarURL())
//-----------------------------------------------------
 let x = chnl.permissionOverwrites.cache.get(message.guild.id)
if(x.deny.has('SEND_MESSAGES') == false) return        message.reply({ embeds: [joe]})
      
chnl.permissionOverwrites.edit(message.guild.roles.everyone, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
        READ_MESSAGE_HISTORY: true,
    }).then(() => {
      message.channel.send({embeds:[success]}).catch(() => {
        message.channel.send({embeds:[fail]})
      })
    })
  }
}
    
  
