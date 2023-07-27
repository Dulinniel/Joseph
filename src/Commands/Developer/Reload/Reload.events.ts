import { Subcommand } from "../../../Interfaces";

export const subcommand: Subcommand =
{
  name: "reload.events",
  description: "Reload events",
  type: 1,
  required: true,
  async execute( client, interaction )
  {
    interaction.reply({ content: "Un jour peut-être" });
  }
}
