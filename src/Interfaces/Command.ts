import { ChatInputCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";
import Client from "../Client";

interface Run
{
  ( client: Client, interaction: ChatInputCommandInteraction )
};

interface RunUserCommand
{
  ( client: Client, interaction: UserContextMenuCommandInteraction )
};

export interface Command
{
  categorie: string,
  developer?: boolean,
  payload: {
    name: string,
    type: number,
    description?: string,
    default_member_permissions?: any,
    options?: Array<Subcommand>
  },
  execute?: Run,
  executeUserCommand?: RunUserCommand
}

export interface Subcommand
{
  name: string,
  description: string,
  type: number,
  required?: boolean,
  options?: any,
  choices?: Array<{
    name: string,
    value: string | number | boolean
  }>,
  autocomplete?: boolean
  execute?: Run
}
