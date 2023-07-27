import { Command } from "../../../Interfaces";
import { EmbedBuilder, bold, GuildMember } from "discord.js";

export const command: Command =
{
  categorie: "Miscellanous",
  developer: false,
  payload:
  {
    name: "ping",
    type: 1,
    description: "Bring the holy pong"
  },

  async execute( client, interaction )
  {
    const username = interaction.member as ( GuildMember )
    const pingEmbed = new EmbedBuilder()

    .setColor(0x9db86)
    .setTitle("Pinging...")
    .setTimestamp()

    await interaction.reply({ embeds: [ pingEmbed ]}).then(async int => {

      const pingAPI = int.createdTimestamp - interaction.createdTimestamp;
      const pingWebSocket = client.ws.ping;

      const editPingEmbed = new EmbedBuilder()

      .setColor(0x9db86)
      .setTitle(`Pong ${username.displayName}`)
      .addFields( [{ name: "WebSocket latency:", value: `${bold(pingWebSocket.toString())}ms` },
                  { name: "API latency:", value: `${bold(pingAPI.toString())}ms` }] )
      .setThumbnail(interaction.user.avatarURL())
      .setFooter({ text: `${username.displayName} asked the ping `})
      .setTimestamp()

      await interaction.editReply({embeds: [editPingEmbed]});

    }).catch(console.error);
  }
}
