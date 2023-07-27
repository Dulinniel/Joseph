import { inlineCode } from "discord.js";

import { Subcommand } from "../../../../Interfaces";

export const subcommand: Subcommand =
{
  name: "character.remove",
  description: "Supprime un personnage existant",
  type: 1,
  options: [{
    name: "name",
    description: "Le nom du personnage",
    type: 3,
    required: true
  }],
  async execute( client, interaction )
  {
    const name = interaction.options.getString("name");

    const deletedState = await client.service.RemoveUserInfo({ name: name, userID: interaction.member.user.id }, 1);
    if ( deletedState == 0 )
    {
      interaction.reply({ content: "Ton personnage a été supprimé" });
    } else interaction.reply({ content: `Le personnage: ${name} n'existe pas` });
  }
}
