const { MessageEmbed, MessageButton } = require("discord.js")

module.exports = {
  name: "ban",
  description: "bans a user",
  run: async(client, message, args, Discord) => {
//---------------------------------------------------------------------
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

//---------------------------------------------------------------------
  
    const reason = message.content.split(" ").slice(2).join(" ")
//---------------------------------------------------------------------

  /*const mentionedPosition = member.roles.highest.position
    
  const memberPosition = message.member.roles.highest.position 
    
  const botPosition = message.guild.me.roles.highest.position */
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
    .setDescription("I could not ban that user, make sure that my role has permissions to do so or my role is higher than theirs!")
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
    .setDescription(`Successfully banned ${member}`)
    .setColor("GREEN")
    .setFooter(message.author.username, message.author.displayAvatarURL())
//---------------------------------------------------------------------
    
    const neutral = new MessageEmbed()
    .setTitle("Ban command")
    .setDescription("f?ban @user\nf?ban @user reason")
    .addField('Examples','f?ban @TECHNOPAWS#6969\nf?ban @TECHNOPAWS#6969 bad')
    .setColor("YELLOW")
    .setFooter(message.author.username, message.author.displayAvatarURL())
//---------------------------------------------------------------------

    const ded = new MessageEmbed()
    .setDescription("They seem to be a mod/admin, I cannot do that action on them")
    .setColor("RED")
    .setFooter(message.author.username, message.author.displayAvatarURL())
//---------------------------------------------------------------------
    
    if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({embeds:[noperms]})
    
    if (!member) return message.channel.send({embeds:[neutral]})

    if (member.permissions.has("BAN_MEMBERS")) return message.channel.send({embeds:[ded]})

    if(reason) success.addField('Reason', reason, false)

    
      member.ban({reason:`${reason}`}).then(() => {
        message.channel.send({embeds:[success]})
      }).catch(err => {
      message.channel.send({embeds:[fail]})
    })
    
}
}