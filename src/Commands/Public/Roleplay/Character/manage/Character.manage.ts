import { Subcommand } from "../../../../../Interfaces";

export const subcommand: Subcommand =
{
  name: "character.manage",
  description: "Supprime un personnage existant",
  type: 2,
  options: [{
    name: "avatar",
    description: "Modifie l'avatar du personnage",
    type: 1
  }, {
    name: "name",
    description: "Modifie le nom du personnage",
    type: 1
  }],
}
