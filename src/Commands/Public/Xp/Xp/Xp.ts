import { Command } from "../../../../Interfaces";

export const command: Command =
{
  categorie: "Xp",
  developer: false,
  payload:
  {
    name: "xp",
    type: 1,
    description: "Permet de gérer l'Xp des membres",
    default_member_permissions: 1 << 3, //0x0000000000000008 -> ADMINISTRATOR
    options: [{
      name: "add",
      type: 1,
      description: "Ajoute de l'Xp à un membre",
      options: [{
        name: "user",
        type: 6,
        description: "L'utilisateur à qui il faut ajouter de l'Xp",
        required: true
      },{
        name: "amount",
        type: 4,
        description: "Le nombre de point d'Xp qu'il faut ajouter",
        required: true
      }]
    },{
      name: "remove",
      type: 1,
      description: "Retire de l'Xp à un membre",
      options: [{
        name: "user",
        type: 6,
        description: "L'utilisateur à qui il faut retirer de l'Xp",
        required: true
      },{
        name: "amount",
        type: 4,
        description: "Le nombre de point d'Xp qu'il faut retirer",
        required: true
      }]
    }]
  }
}
