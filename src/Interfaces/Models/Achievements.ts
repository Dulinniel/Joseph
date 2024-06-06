export interface IAchievements {
  _id: string,
  guild_id: string,
  username: string,
  achievements: Array<{
    name: string,
    condition: string | number | boolean,
    progression: string | number | boolean,
    done: boolean
  }>
};
