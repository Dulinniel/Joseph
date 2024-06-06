import { Subcommand } from "../../../../Interfaces"
import { Modules } from "../../../../Database/Models";

export const subcommand: Subcommand =
{
  name: "config.stateof",
  description: "Active ou désactive le module désigné.",
  type: 1,
  options: [{
    name: "module",
    type: 3,
    description: "Le nom du module",
    choices: [
      { name: "Roleplay", value: "Roleplay" },
      { name: "Xp", value: "Xp" }
    ],
    required: true
  }, {
    name: "état",
    type: 4,
    description: "L'état du module",
    choices: [
      { name: "on", value: 1 },
      { name: "off", value: 0 }
    ],
    required: true
  }],
  async execute( client, interaction )
  {

    const moduleName = interaction.options.getString("module");
    const state = interaction.options.getInteger("état");

    const module = await client.service.GetInfo(Modules, { guild_id: interaction.guild.id, name: moduleName });

    if ( module.state !== state )
    {

      await client.service.UpdateInfo(Modules, {
        state: state
      },
      {
        guild_id: interaction.guild.id,
        name: moduleName
      });
      await interaction.reply({ content: `Le module ${moduleName} a été ${(state > 0 ) ? " activé" : " désactivé" }` });
    } else await interaction.reply({ content: `Le module ${moduleName} a déjà été ${(state > 0 ) ? " activé" : "désactivé" }`});

  }
}
