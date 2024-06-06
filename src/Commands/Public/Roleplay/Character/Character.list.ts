import { EmbedBuilder, inlineCode } from "discord.js";
import { Paginator } from "../../../../Utils/Paginator";
import { Character } from "../../../../Database/Models";
import { Subcommand } from "../../../../Interfaces";

export const subcommand: Subcommand =
{
  name: "character.list",
  description: "Liste tous les personnages que tu possèdes.",
  type: 1,
  async execute( client, interaction )
  {
    const characters = await client.service.GetEvery(Character, { user_id: interaction.member.user.id });
    client.paginator = new Paginator(characters, 6);
    const firstCharInstance = client.paginator.GetPage()

    const buttons: any = {
      "type": 1,
      "components": [
      {
        "type": 2,
        "style": 1,
        "label": "⬅️",
        "custom_id": "previous"
      }, {
        "type": 2,
        "style": 1,
        "label": "➡️",
        "custom_id": "next"
      }
    ]}
    const characterList = new EmbedBuilder()

      .setColor(0xee82ee)
      .setDescription(`Page: ${client.paginator.currentPage}/${client.paginator.pageSize / ( client.paginator.pageSize / 2 )}`)
      .setTitle(`personnage.s de ${interaction.member.user.username}`)
      .setFooter({ text: "Un utilisateur a demandé la liste de ses personnages !" })
      .setTimestamp()


      for ( const character of firstCharInstance )
      {

        let img: string = ( character.image ) ? `[Avatar](${character.image})` : "Aucun avatar";

        characterList.addFields(
          { name: character.name, value: `Bracket: ${inlineCode(character.bracket.join(""))}
                                          Avatar: ${img}
                                          Message totaux: ${character.message_count.toString()}`,
                                  inline: true
          }
        )
      }
    if ( characters.length <= 5 ) await interaction.reply({ embeds: [ characterList ], components: [ buttons ] });
    else
    {

      await interaction.reply({ embeds: [ characterList ], components: [ buttons ] });

    }

  }
}
