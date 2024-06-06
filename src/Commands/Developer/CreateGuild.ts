import { Command } from "../../Interfaces";
import { Guild } from "../../Database/Models";

export const command: Command =
{
  categorie: "Developer",
  developer: true,
  payload:
  {
    name: "createguild",
    type: 1,
    description: "Créer une guild",
    default_member_permissions: 1 << 3, // ( 0x0000000000000008 )
  },
  async execute(client, interaction)
  {
    await client.service.CreateInfo(Guild, {
      guildID: interaction.guild.id,
      guildName: interaction.guild.name,
      createdAt: interaction.guild.createdAt
    });
  }
}
