import { Event } from "../../Interfaces";
import { EmbedBuilder, ButtonInteraction, inlineCode } from "discord.js";

export const event: Event = {
  name: 'interactionCreate',
  once: false,
  execute: async ( client, interaction: ButtonInteraction ) => {
    if ( !interaction.isButton() ) return;

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
      ]};

    const characterList = new EmbedBuilder()

      .setColor(0xee82ee)
      .setDescription(`Page: ${client.paginator.currentPage}/${client.paginator.pageSize / ( client.paginator.pageSize / 2 )}`)
      .setTitle(`Personnage.s de ${interaction.member.user.username}`)
      .setFooter({ text: "Un utilisateur a demandé la liste de ses personnages !" })
      .setTimestamp()

    if ( interaction.customId == "previous" )
    {
      let previousContent = client.paginator.Previous();

      characterList.setDescription(`Page: ${client.paginator.currentPage}/${client.paginator.pageSize / ( client.paginator.pageSize / 2 )}`);

      for ( const character of previousContent )
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

      interaction.deferUpdate()
      await interaction.message.edit({ embeds: [ characterList ], components: [ buttons ] });

    }
    if ( interaction.customId == "next" )
    {
      let nextContent = client.paginator.Next();

      characterList.setDescription(`Page: ${client.paginator.currentPage}/${client.paginator.pageSize / ( client.paginator.pageSize / 2 )}`)

      for ( const character of nextContent )
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

      interaction.deferUpdate()
      await interaction.message.edit({ embeds: [ characterList ], components: [ buttons ] });

    }

  }
}
