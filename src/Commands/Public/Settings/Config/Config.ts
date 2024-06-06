import { Command } from "../../../../Interfaces";

export const command: Command =
{
  categorie: "Settings",
  developer: false,
  payload: {
    name: "config",
    type: 1,
    description: "Toute les options de configuration du bot",
    options: [{
      name: "xp",
      description: "Gère le modules d'expérience du serveur",
      type: 2,
      options: [{
        name: "message",
        description: "Les propriétés du message",
        type: 1,
        options: [{
          name: "channel",
          description: "Le salon dans lequel le message devra s'envoyer",
          type: 7,
          required: true
        }, {
          name: "title",
          description: "Le titre de l'embed",
          type: 3,
          required: true
        }, {
          name: "description",
          description: "La description de l'embed",
          type: 3,
          required: true
        }, {
          name: "couleur",
          description: "La couleur de l'embed",
          type: 10,
          choices: [
            { name: "Rouge", value: 0xDC143C },
            { name: "Orange", value: 0xFFA500 },
            { name: "Jaune", value: 0xFFFF00 },
            { name: "Vert", value: 0x008000 },
            { name: "Bleu", value: 0x0000FF },
            { name: "Cyan", value: 0x00FFFF },
            { name: "Violet", value: 0x800080 },
            { name: "Rose", value: 0xFFC0CB },
            { name: "Fuschia", value: 0xFF00FF },
            { name: "Gris", value: 0x808080 },
            { name: "Marron", value: 0xA52A2A },
            { name: "Blanc", value: 0xFFFFFF },
            { name: "Noir", value: 0x000000 }
          ],
          required: true
        }, {
          name: "date",
          description: "Afficher le temps écoulé depuis que la personne a gagné son niveau ?",
          type: 5,
          required: true
        }, {
          name: "avatar",
          description: "Faire apparaître l'avatar de la personne qui monte de niveau ?",
          type: 5,
          required: true
        }, {
          name: "image",
          description: "Ajoute une image complémentaire à l'embed",
          type: 3,
          required: false
        }]
      },
      {
        name: "formula",
        description: "Gère les formules du système d'Xp",
        type: 1,
        options: [{
          name: "level",
          description: "La formule à utiliser pour la monté de niveau",
          type: 3,
          required: true
        },{
          name: 'xp',
          description: "La formule à utiliser pour gagner de l'Xp",
          type: 3,
          required: false
        },{
          name: 'rate',
          description: "La formule à utiliser pour gérer le taux d'xp nécessaire à la monté de niveau",
          type: 3,
          required: false
        }]
      }]
     }, {
      name: "modules",
      description: "La liste de tous les modules dispo, ainsi que leur état.",
      type: 1
    }, {
      name: "stateof",
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
          { name: "off", value: 0 }],
        required: true
      }]
    }
  ]}
}
