import { EmbedBuilder } from "discord.js";
import { Command } from "../../../Interfaces";
import { Experience } from "../../../Database/Models";

export const command: Command =
{
  categorie: "Xp",
  developer: false,
  payload:
  {
    name: "leaderboard",
    type: 1,
    description: "Donne le classement global du serveur",
  },

  async execute( client, interaction )
  {
    const EveryMember = await client.service.GetEvery(Experience, { guild_id: interaction.guild.id });

    EveryMember.sort(( a,b ) => {
      if ( a.level == b.level ) return b.experience - a.experience;
      else return b.level - a.level;
    });

    const LeaderBoardEmbed = new EmbedBuilder()
      .setColor(0x1EADE4)
      .setTitle(`leaderboard du serveur : ${interaction.guild.name}`)
      .setFooter({ text: "Quelqu'un a demandé le classement général" })
      .setTimestamp()

    for ( let i = 0; i < EveryMember.length; i++ )
    {
      LeaderBoardEmbed.addFields({ name: `#${i+1} - ${EveryMember[i].username}`, value: `Level: ${EveryMember[i].level}\n${EveryMember[i].experience}xp`});
    }

    interaction.reply({ embeds: [ LeaderBoardEmbed ] });

  }
}
