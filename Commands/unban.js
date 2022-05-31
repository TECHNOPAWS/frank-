module.exports = {
  name:["unban","unb"],
  run:async(client,message,args,Discord) => {
    const user = args[0]

    const nanny = new Discord.MessageEmbed()
    .setDescription("That is not a user id")
    .setColor("RED")

    const fail = new Discord.MessageEmbed()
    .setTitle("Fail")
    .setDescription("failed to unban that user, make sure he is banned or the id is correct")
    .setColor("RED")
//--------------------------------------------------
    if(!user) {
      nanny.setDescription("Please provide a user id")
     return message.channel.send({embeds:[nanny]})
    }
    if(isNaN(user)) return message.channel.send({embeds:[nanny]})

    message.guild.members.unban(user).then(() => {
      nanny.setTitle("Success")
      nanny.setColor("GREEN")
      nanny.setDescription(`successfully unbanned <@${user}>`)
      message.channel.send({embeds:[nanny]})
    }).catch(() => {
      message.channel.send({embeds:[fail]})
    })
  }
}