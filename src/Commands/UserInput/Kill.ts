import { Command } from "../../Interfaces";
import { EmbedBuilder } from "discord.js";

export const command: Command =
{
  categorie: "UserInput",
  developer: false,
  payload:
  {
    name: "kill",
    type: 2
  },

  async executeUserCommand( client, interaction )
  {
    const req = await fetch("https://api.tenor.com/v1/random?q=wasted-anime&key=6BCDWZTZ8A07&limit=1");
    const body = await req.json();
    let gif = body["results"][0]["media"][0]["gif"]["url"];

    const userInteractionEmbed = new EmbedBuilder()

    .setColor("#009A1C")
    .setTitle(`${interaction.member.user.username} a tué ${interaction.targetMember?.user.username}`)
    .setImage(gif)
    .setTimestamp()
    .setFooter({ text: "Quelqu'un s'est fait tuer !"})

    await interaction.reply({ embeds: [ userInteractionEmbed ] })
  }
}
