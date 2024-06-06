import { Subcommand } from "../../../../../Interfaces";

export const subcommand: Subcommand =
{
  name: "config.xp",
  description: "Gère le modules d'expérience du serveur",
  type: 2,
  options: [{
    name: "message",
    description: "Les propriétés du message",
    type: 1,
    required: false
  },{
    name: "formula",
    description: "Gère les formules du système d'Xp",
    type: 1,
    required: false
  }]
}

