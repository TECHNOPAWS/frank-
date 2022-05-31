const express = require("express");
const app = express()
const Discord = require("discord.js")
const client = (global.client =  new Discord.Client({
  intents: 32767,
  allowedMentions: ["users"],
  disabledMentions: ['roles'],
  partials:['MESSAGE','CHANNEL']
}))

const fs = require("fs")
client.commands = new Discord.Collection()
const prefix = "f?"
const db = require("quick.db")


app.listen("3000", () =>{
console.log("hi") 
})

app.get("/", (req, res) => {
  res.send("bot is ready")
})

client.on("ready", () => {


client.user.setActivity({
  name:'Eeveelution Squad',
  type: 'WATCHING'
})


})

client.events = new Discord.Collection();
fs.readdirSync('./Events/').forEach((file) => {
  const events = fs.readdirSync('./Events/').filter((file) =>
    file.endsWith('.js')
  );
  for (let file of events) {
    let pull = require(`./Events/${file}`);
    if (pull.name) {
      client.events.set(pull.name, pull);
    }
  }
})


client.commands = new Discord.Collection()
const commandHandler = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'))

for(file of commandHandler){
  const commandName = file.split(".")[0]
  const command = require(`./Commands/${commandName}`)
  client.commands.set(command.name, command)
}

client.on("messageCreate", async message => {



  if(message.content.toLowerCase().startsWith(prefix)){
    if(message.channel.type === 'DM') return;
const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift()
    const command = client.commands.find(cmd => cmd.name.includes(commandName))
    if(!command) return ;
    command.run(client, message, args, Discord)
  }
 

let badwords = ['penis', 'cunt', 'adolf hitler', 'nazi'];
//-----------------------------------------------------
  badwords.forEach(word => {
     const blacklist = new Discord.MessageEmbed()
  .setTitle("Warning")
  .setDescription("this is an automated warning carried out for you using a blacklisted word")
  .addField(
    `Word`,
    word,
    false
  )
  .setColor("BLUE")
//----------------------------------------------------
    const blacklist2 = new Discord.MessageEmbed()
    .setTitle("Warning")
    .setDescription("this is an automated warning carried out for you using a blacklisted word")
  .setColor("BLUE")
//--------------------------------------------------
    if(message.content.toLowerCase().includes(word)) {
    message.delete().then(() => {
    message.author.send({embeds:[blacklist]}).catch(() => {
    blacklist2.setFooter("I couldnt dm you")    
      message.channel.send({content:`${message.author}`, embeds:[blacklist2]})
      })
    })
    }
  })



  let dodo = ['nigga','nigger']

  dodo.forEach(async d => {
         
    
  const blacklist3 = new Discord.MessageEmbed()
  .setTitle("Warning")
  .setDescription("this is an automated warning carried out for you using a blacklisted word, if you continue to do this action, you will be banned!")
  .addField(
    `Word`,
    d,
    false
  )
  .setColor("BLUE")

    const blacklist4 = new Discord.MessageEmbed()
    .setTitle("Warning")
    .setDescription("this is an automated warning carried out for you using a blacklisted word, if you continue to do this action, you will be banned!")
  .setColor("BLUE")
    
if(message.content.toLowerCase().includes(d)){
    let value = await db.get(`bl_${message.author.id}`) || 0
    value++
    message.delete().then(() => {
      db.set(`bl_${message.author.id}`, value)
      if(value == 1){
      message.author.send({embeds:[blacklist3]})
        .catch(() => {
          blacklist4.setFooter("I couldnt dm you")    
          message.channel.send({content:`${message.author}`, embeds:[blacklist4]})
        })
      }
})
    if(value >= 2) {
   try{   
        message.member.ban().then(() => {
          blacklist4.setTitle("BANNED")
          blacklist4.setDescription(`Successfully banned ${message.author}`)
          blacklist4.setColor("GREEN")
          blacklist.setFooter()
          message.channel.send({embeds:[blacklist4]})
        })
   }catch(err){
     message.channel.send("An error occured")
   }
      }
    }
  })

  
})

client.on("messageCreate", async message => {
  
    if(message.content.toLowerCase() === "hey" || message.content.toLowerCase() === "hello" || message.content.toLowerCase() === "heyo"){
    message.channel.send("Hi, how are ya?")
     // console.log("g")
  }
/*   if(message.member.id === "811909591125983253"){
    message.reply("Hello son!").then(m => {
      setTimeout(() => {
        m.delete()
      },3000)
    })
  } */
})


  client.on("messageDelete", msg => {
    if(msg.member.id === "964575822713331722") return;
  const dlt = new Discord.MessageEmbed()
  .setTitle('Message Deleted')
  .setDescription(`A [message](https://discord.com/channels/935343999517081660/${msg.channel.id}) has been deleted in ${msg.channel}`)
  .addField('Message', `\`${msg.content}\` by \`${msg.author.tag}\``)

    client.channels.cache.get('968912002120552499').send({embeds:[dlt]})
})

client.on('ready', () => {

})



client.on('guildMemberRemove', async member => {
  if(member.guild.id === "935343999517081660"){
    client.channels.cache.get('935343999517081663').send(`${member} took the next boat home....`)
  }
})

client.on('interactionCreate', async interaction => {
  if(!interaction.isButton()) return;

  if(interaction.customId === "leav"){
    
 if(interaction.member.permissions.has("ADMINISTRATOR")) return await  interaction.reply({content:'You are too powerful to leave!',ephemeral:true})
    
      interaction.user?.send({content:'You have left in the most epic way possible'}).then(async () => {
      await interaction.member.kick().then(async () => {
             await interaction.channel.send(`${interaction.user} left in the most epic way possible`)
      
      }).catch(err => console.log(err))
      })

  }
})
 
    client.on('ready', async () => {

     const e =  client.channels.cache.get('976769794151964693')
 
  
/* client.guilds.cache.get('935343999517081660').members.unban('800985072014196756');  */  
       /* client.guilds.cache.get('935343999517081660').channels.cache.get('964954826964344922').createInvite().then(e => console.log(e.url))   */ 

 /* client.guilds.cache.get('935343999517081660').channels.create('MODMAILS',{type:'GUILD_CATEGORY'}).then(e => {
    e.setPosition(1) 
   console.log(e.id) 
 })  */
  
    
    
})


 client.on('guildMemberAdd', async member => {
   if(member.guild.id === '935343999517081660'){
  
  await member.roles.add('980192595055620196')
   }
 })




client.login(process.env.token)