import Client from "../Client";
import { Achievement } from "../Interfaces";
import { ClientEvents, GuildMember } from "discord.js";

interface AchievementEvents extends ClientEvents
{
  achievementCreate: [ achievement: Achievement ],
  achievementDelete: [ achievement: Achievement ],
  achievementUpdate: [ oldAchievement: Achievement, newAchievement: Achievement ],
  achievementFulfill: [ member: GuildMember, achievement: Achievement ],

}

interface execute
{
  ( client: Client, ...args: Array<any> )
}

export interface Event
{
  name: keyof ClientEvents;
  once: boolean,
  execute: execute
}
