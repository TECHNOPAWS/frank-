module.exports = {
  name: "ping",
  run: async(client, message, args, Discord) => {

    message.channel.send("pong").then(m => {
      setTimeout(() => {
        m.edit(`pong ${client.ws.ping}ms latency`)
      }, 500)
    })
  }
}