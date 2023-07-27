import { Command } from "../../../Interfaces";

export const command: Command =
{
  categorie: "Miscellanous",
  developer: false,
  payload:
  {
    name: "say",
    type: 1,
    description: "Il répète tout ce que tu dis !",
    options: [{
      name: "text",
      description: "La phrase à répéter",
      type: 3,
      required: true
    }]
  },

  async execute( client, interaction )
  {
    const text = interaction.options.getString("text");
    interaction.reply({ content: text });
  }
}
