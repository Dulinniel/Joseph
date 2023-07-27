import { Command } from "../../../Interfaces";

export const command: Command =
{
  categorie: "Developer",
  developer: true,
  payload:
  {
    name: "reload",
    type: 1,
    description: "reload commands",
    default_member_permissions: 1 << 3, // ( 0x0000000000000008 )
    options: [{
      name: "events",
      description: "Reload an event",
      type: 1
    },{
      name: "commands",
      description: "Reload commands",
      type: 1
    }]
  }
}
