const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

client.on('messageCreate', async message => {
  
  if(message.channel.type !== 'DM') return;
  if(message.content.startsWith('f?')){

     const requestembed = new MessageEmbed()
    .setTitle('Ticket')
    .setDescription(`You are about to start a ticket in \`Eeveelution Squad Community\`! Would you like to continue? `)
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
  const msg = await message.channel.send({embeds:[requestembed],components:[row]})

    const icollector = await msg.createMessageComponentCollector({
      time: 30000,
      type: 'BUTTON'
    })

    icollector.on('collect', async interaction => {
        if(interaction.customId === `yes`){

          
    const accepted = new MessageEmbed()
    .setTitle('Started')
    .setDescription('A modmail channel has been created in `Eeveelution Squad Community`!')
    .setColor('GREEN')
    .setFooter({text: `${interaction.user.username}`, icon: interaction.user.displayAvatarURL()})

    row.components[0].disabled = true;
    row.components[1].disabled = true;
    row.components[1].style = "SECONDARY";
    
    await interaction.update({embeds:[accepted],components:[row]}).then(async () => {
      await interaction.channel.send({
      embeds:[
        new MessageEmbed()
        .setTitle('Channel created')
        .setDescription('Any message that u send here from now on will be recorded and sent to your modmail channel for the mods to see!')
        .setColor("BLURPLE")
      ]
    })
    })

      client.guilds.cache.get('935343999517081660').channels.create(`${message.author.tag}`).then(e => e.setParent('981133633530241034')
  )
         icollector.stop()
    
  }
  
   if(interaction.customId === `no`){
    const declined = new MessageEmbed()
    .setTitle('Stopped')
    .setDescription('Woah! nice save, that was a close one!')
    .setColor('RED')
    .setFooter({text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
     

    row.components[0].disabled = true;
    row.components[0].style = "SECONDARY";
    row.components[1].disabled = true;
    
    await interaction.update({embeds:[declined],components:[row]})
     icollector.stop()
  }
    })

    icollector.on('end', async (collected,reason) => {
   row.components[0].disabled = true;
    row.components[1].disabled = true;
      if(reason === 'time'){
        await msg.edit(
          {
          embeds:[
          new MessageEmbed()
          .setTitle('Timed Out')
          .setDescription('This message has timed out! You can no longer interact with this message! type `f?ticket` to start a new ticket')
          .setColor('YELLOW')
        ],
        components:[row]
        }
        )
      }
    })
  }
})