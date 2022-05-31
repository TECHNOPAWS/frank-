const { MessageEmbed, MessageButton } = require("discord.js")

module.exports = {
  name: "kick",
  description: "kicks a user",
  run: async(client, message, args, Discord) => {
//---------------------------------------------------------------------
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if(member === message.member) return message.channel.send("you cannot kick yourself")

//---------------------------------------------------------------------
  
    const reason = args[1]
//---------------------------------------------------------------------

/*const mentionedPosition = member.roles.highest.position
    
  const memberPosition = message.member.roles.highest.position 
    
  const botPosition = message.guild.me.roles.highest.position*/ 
//---------------------------------------------------------------------
    
  const kickErr = new MessageEmbed()
  .setDescription('You cannot kick this member because their role is higher/equal to yours!')
  .setColor("RED")
//---------------------------------------------------------------------
    
  const kickErr1 = new MessageEmbed()
  .setDescription('I cannot kick this member because their role is higher/equal to mine!')
  .setColor("RED")
//---------------------------------------------------------------------
    
 /*  if(memberPosition <= mentionedPosition) { return message.channel.send({ embeds: [kickErr] })
   
   } else if (botPosition <= mentionedPosition) {
     return message.channel.send({ embeds: [kickErr1] })
  } */
   
    const fail = new MessageEmbed()
    .setTitle("Fail")
    .setDescription("I could not kick that user, make sure that my role has permissions to do so or my role is higher than theirs!")
    .setColor("RED")
    .setFooter(message.author.username, message.author.displayAvatarURL())
//----------------------------------------------------------------------

    const noperms = new MessageEmbed()
    .setDescription("You dont have permissions to do that")
    .setColor("RED")
    .setFooter(message.author.username, message.author.displayAvatarURL())
//----------------------------------------------------------------------

    const success = new MessageEmbed()
    .setTitle("Success")
    .setDescription(`Successfully kicked ${member}`)
    .setColor("GREEN")
    .setFooter(message.author.username, message.author.displayAvatarURL())
//---------------------------------------------------------------------
    
    const neutral = new MessageEmbed()
    .setTitle("Kick command")
    .setDescription("f?kick @user\nf?kick @user reason")
    .addField('Examples','f?kick @TECHNOPAWS#6969\nf?kick @TECHNOPAWS#6969 bad')
    .setColor("YELLOW")
    .setFooter(message.author.username, message.author.displayAvatarURL())
//---------------------------------------------------------------------

    const ded = new MessageEmbed()
    .setDescription("They seem to be a mod/admin, I cannot do that action on them")
    .setColor("RED")
    .setFooter(message.author.username, message.author.displayAvatarURL())
//---------------------------------------------------------------------
    
    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send({embeds:[noperms]})
    
    if (!member) return message.channel.send({embeds:[neutral]})

    if (member.permissions.has("KICK_MEMBERS")) return message.channel.send({embeds:[ded]})

    if(reason) success.addField('Reason', reason, false)

    
      member.kick({reason:reason}).then(() => {
        message.channel.send({embeds:[success]})
      }).catch(err => {
      message.channel.send({embeds:[fail]})
    })
    
}
}