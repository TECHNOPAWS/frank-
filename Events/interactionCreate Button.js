const { MessageEmbed } = require('discord.js')

client.on('interactionCreate', async interaction => {
  if(!interaction?.isButton()) return;

/*   if(interaction.customId === `yes`){
    const accepted = new MessageEmbed()
    .setTitle('Started')
    .setDescription('A modmail channel has been created in `Eeveelution Squad Community`!')
    .setColor('GREEN')
    .setFooter({text: `${interaction.user.username}`, icon: interaction.user.displayAvatarURL()})
      const row = interaction.message.components[0]

    row.components[0].disabled = true;
    row.components[1].disabled = true;
    row.components[1].style = "SECONDARY";
    
    await interaction.update({embeds:[accepted],components:[row]})
    
  }
  
   if(interaction.customId === `no`){
    const declined = new MessageEmbed()
    .setTitle('Stopped')
    .setDescription('Woah! nice save, that was a close one!')
    .setColor('RED')
    .setFooter({text: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
     
      const row = interaction.message.components[0]

    row.components[0].disabled = true;
    row.components[0].style = "SECONDARY";
    row.components[1].disabled = true;
    
    await interaction.update({embeds:[declined],components:[row]})
  } */
})