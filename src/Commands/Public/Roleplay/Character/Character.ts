import { Command } from "../../../../Interfaces";

export const command: Command =
{
  categorie: "Roleplay",
  developer: false,
  payload:
  {
    name: "character",
    type: 1,
    description: "Permet de gérer ses personnages",
    options: [{
      name: "create",
      description: "Créer un nouveau personnage",
      type: 1,
      options: [{
        name: "name",
        description: "Le nom du personnage",
        type: 3,
        required: true
      },{
        name: "bracket",
        description: "Le bracket qui fera réagir le personnage",
        type: 3,
        required: true
      }],
      },{
        name: "remove",
        description: "Supprime un personnage existant",
        type: 1,
        options: [{
          name: "name",
          description: "Le nom du personnage",
          type: 3,
          required: true
        }]
      },{
        name: "manage",
        description: "Permet de paramétrer divers choses sur ses personnages",
        type: 2,
        options: [{
          name: "avatar",
          description: "Modifie l'avatar du personnage",
          type: 1,
          options: [{
            name: "name",
            description: "Le nom du personnage",
            type: 3,
            required: true
          }, {
            name: "avatar",
            description: "L'image de votre avatar",
            type: 11,
            required: true
          }]
        }, {
          name: "name",
          description: "Modifie le nom du personnage",
          type: 1,
          options: [{
            name: "name",
            description: "Le nom du personnage",
            type: 3,
            required: true
        }, {
          name: "new_name",
          description: "Le nouveau nom de votre personnage",
          type: 3,
          required: true
        }]
        },{
          name: "bracket",
          description: "Modifie le bracket du personnage",
          type: 1,
          options: [{
            name: "name",
            description: "Le nom du personnage",
            type: 3,
            required: true
          }, {
            name: "new_bracket",
            description: "Les nouveaux brackets de votre personnage",
            type: 3,
            required: true
          }]
        }]
    },{
      name: "list",
      description: "Liste les personnages d'un utilisateur",
      type: 1
    }]
  }
}
