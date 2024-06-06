import { inlineCode } from "discord.js";
import { Character } from "../../../../Database/Models";
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

    const deletedState = await client.service.RemoveInfo(Character, { name: name, user_id: interaction.member.user.id });
    if ( deletedState )
    {
      interaction.reply({ content: "Ton personnage a été supprimé" });
    } else interaction.reply({ content: `Le personnage: ${name} n'existe pas` });
  }
}
