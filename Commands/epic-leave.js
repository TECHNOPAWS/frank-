module.exports = {
  name: 'el',
  run: (client,message,args, Discord) => {
    if(message.author.id != '800985072014196756') return;

    const btn = new Discord.MessageButton()
    .setLabel('Leave')
    .setStyle('DANGER')
    .setCustomId('leav')

    const row = new Discord.MessageActionRow()
    .addComponents(btn)

    const embed = new Discord.MessageEmbed()
    .setTitle('Epic Leave')
    .setDescription('Ever wanted to leave, but in the most epic way possible?, well now u can... Click the button down below and leave the server in the most epic way possible')
    .setColor("PURPLE")

    message.channel.send({embeds:[embed],components:[row]})
  }
}