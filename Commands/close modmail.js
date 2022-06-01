const { MessageEmbed } = require('discord.js')
module.exports = {
  name: ['close','closemail','close-modmail'],
  description: 'Closes a modmail channel',
  run: async(client,message,args) => {
    const schema = require('../Schema/modmail.js')
    const chnl = message.mentions.channels.first() || message.channel
   
    const channel = await schema.findOne({
      channel: chnl.id
    })
    
if(!channel) return message.channel.send('That channel is not a modmail channel')

   
    client.users.cache.get(channel.userid).send({embeds:[
      new MessageEmbed()
      .setTitle('Modmail Closed')
      .setDescription(`This Modmail has been closed by ${message.author.tag}, use \`f?modmail\` to start a new one!`)
        .setColor('RED')
    ]})
  
        schema.findOneAndDelete({
          chnl: chnl.id
        }).then(() => {
     client.channels.cache.get(chnl.id).delete()
      })
    
   
  }
}