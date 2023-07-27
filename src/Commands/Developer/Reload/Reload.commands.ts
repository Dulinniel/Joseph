import { Subcommand } from "../../../Interfaces";

export const subcommand: Subcommand =
{
  name: "reload.commands",
  description: "Reload commands",
  type: 1,
  required: true,
  async execute( client, interaction )
  {
    client.loadCommands();
    interaction.reply({ content: "Reloaded commands" });
  }
}
