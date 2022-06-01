const schema = require('../Schema/modmail.js')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
client.on('messageCreate', async message => {
 const db = await schema.findOne({
   userid: message.author.id,
   })  

  if (message.channel.type !== 'DM') return;
  if (message.content.startsWith('f?') && message.content !== 'f?end') {
  
    if(db != null && db.sent === true) return message.channel.send(`You are already in a modmail,type \`f?end\` to stop your current session!`) 
    
    const requestembed = new MessageEmbed()
      .setTitle('Ticket')
      .setDescription(`You are about to start a ticket in \`Eeveelution Squad Community\`! Would you like to continue? `)
    .setColor('RANDOM')
    const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
          .setLabel('Yes')
          .setStyle('SUCCESS')
          .setCustomId('yes'),

        new MessageButton()
          .setLabel('No')
          .setStyle('DANGER')
          .setCustomId('no')
      ])
    const msg = await message.channel.send({ embeds: [requestembed], components: [row] })

    const icollector = await msg.createMessageComponentCollector({
      time: 30000,
      type: 'BUTTON'
    })

    icollector.on('collect', async interaction => {
      if (interaction.customId === `yes`) {


        const accepted = new MessageEmbed()
          .setTitle('Started')
          .setDescription('A modmail channel has been created in `Eeveelution Squad Community`!')
          .setColor('GREEN')
          .setFooter({ text: `${interaction.user.username}`, icon: interaction.user.displayAvatarURL() })

        row.components[0].disabled = true;
        row.components[1].disabled = true;
        row.components[1].style = "SECONDARY";

        await interaction.update({ embeds: [accepted], components: [row] }).then(async () => {
          await interaction.channel.send({
            embeds: [
              new MessageEmbed()
                .setTitle('Channel created')
                .setDescription('Any message that u send here from now on will be recorded and sent to your modmail channel for the mods to see! You can type `f?end` at anytime to close this modmail')
                .setColor("BLURPLE")
            ]
          })
        })

       //--LOGGING-START-- 
      client.channels.cache.get('981556607592845332').send({
        embeds:[
          new MessageEmbed()
          .setTitle('Modmail Created')
          .setDescription(`A new modmail has been created by ${message.author}`)
          .setColor('GREEN')
        ]
      })
       //--LOGGING-END--
        const e = await client.guilds.cache.get('935343999517081660').channels.create(`${message.author.tag}`)

        e.setParent('981133633530241034')
        e.send({embeds:[
          new MessageEmbed()
          .setTitle('New Modmail')
          .setDescription(`${message.author} has started a new modmail!`)
          .setColor('BLUE')
        ],
        content: `<@&981554475330338836>`
          })
        const database = await schema.findOne({
          userid: message.author.id
        })

        if(!database){
          await schema.create({
            userid: message.author.id,
            channel: e.id,
            sent: true,
            created: true
          })
        }

        const authorDb = await schema.findOne({
          userid: message.author.id
        })
        
const chnl = client.channels.cache.get(authorDb.channel)
       const msgChannel =  chnl.createMessageCollector() 
        
        msgChannel.on('collect', async collected => {
          if(collected.content === 'f?close') return;
          if(collected.author.bot) return;
          const sent = new MessageEmbed()
            .setTitle('Message Sent')
            .setColor('YELLOW')

          const recieved = new MessageEmbed()
              .setTitle('Message Recieved')
              .setColor('GREEN')
          
          if(collected.content.length >= 1 && collected.content.length <= 1046){
              sent.addFields(
              {name: `Message`,value: `${collected.content}`},
              {name: `Author`, value: `${collected.author}`},
              ) 
              recieved.addFields(
                {name: `Message`,value: `${collected.content}`},
                {name: `Author`, value: `${collected.author}`},
              )
          }

          if(collected.attachments.size >= 1){
            sent.addField(`Attachments`, `${collected.attachments.map(e => e.url)}`)
            recieved.addField(`Attachments`, `${collected.attachments.map(e => e.url)}`)
          }
             try {     
           client.channels.cache.get(authorDb.channel).send({embeds:[sent]})
    
          
            client.users.cache.get(authorDb.userid).send({embeds:[recieved]})

       } catch (err){
             console.log(err)
             }
          
          collected.delete()
        
        })
        const dmCollector = msg.channel.createMessageCollector()

        dmCollector.on('collect', async collected => {
              if(collected.author.bot) return;
          if(collected.content.startsWith('f?') && collected.content !== 'f?end') return;
          
          if(collected.content === 'f?end'){
           dmCollector.stop()
            msgChannel.stop()
            client.users.cache.get(authorDb.userid).send({
             embeds: [
               new MessageEmbed()
               .setTitle('Ended')
               .setDescription('This Modmail has successfully ended')
               .setColor('DARK_GREEN')
             ] 
            })
            await schema.findOneAndUpdate({
            },{
              $unset:{
              sent: ""
            }
            })
          client.channels.cache.get(authorDb.channel).send({embeds:[
            new MessageEmbed()
            .setTitle('Ended')
            .setDescription('The ModMail user has ended this session! Use `f?close` to delete this channel!')
            .setColor('BLUE')
            
          ]})

            client.channels.cache.get('981556607592845332').send({
              embeds:[
                new MessageEmbed()
                .setTitle('Modmail Ended')
                .setDescription(`<@${authorDb.userid}> has ended his ModMail`)
                .setColor('ORANGE')
              ]
            })
        
            
          } else {
          const sent = new MessageEmbed()
            .setTitle('Message Sent')
              .setColor('YELLOW')

          const recieved = new MessageEmbed()
              .setTitle('Message Recieved')
              .setColor('GREEN')
          
          if(collected.content.length >= 1 && collected.content.length <= 1046){
              recieved.addFields(
                {name: `Message`,value: `${collected.content}`},
                {name: `Author`, value: `${collected.author}`},
              )
          sent.addFields(
              {name: `Message`,value: `${collected.content}`},
              {name: `Author`, value: `${collected.author}`},
              ) 
          }

          if(collected.attachments.size >= 1){
            sent.addField(`Attachments`, `${collected.attachments.map(e => e.url)}`)
            recieved.addField(`Attachments`, `${collected.attachments.map(e => e.url)}`) 
          }
             try {     
           client.channels.cache.get(authorDb.channel).send({embeds:[recieved]})
    
          
            client.users.cache.get(authorDb.userid).send({embeds:[sent]})

       } catch (err){
             console.log(err)
             }
          }
        })
        icollector.stop()
        
      }

      if (interaction.customId === `no`) {
        const declined = new MessageEmbed()
          .setTitle('Stopped')
          .setDescription('Woah! nice save, that was a close one!')
          .setColor('RED')
          .setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })


        row.components[0].disabled = true;
        row.components[0].style = "SECONDARY";
        row.components[1].disabled = true;

        await interaction.update({ embeds: [declined], components: [row] })
        icollector.stop()
      }
    })

    icollector.on('end', async (collected, reason) => {
      row.components[0].disabled = true;
      row.components[1].disabled = true;
      if (reason === 'time') {
        await msg.edit(
          {
            embeds: [
              new MessageEmbed()
                .setTitle('Timed Out')
                .setDescription('This message has timed out! You can no longer interact with this message! type `f?ticket` to start a new ticket')
                .setColor('YELLOW')
            ],
            components: [row]
          }
        )
      }
    })
  }
})