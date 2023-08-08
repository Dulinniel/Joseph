import dotenv from "dotenv";

dotenv.config({ path: "./src/.env", debug: true });

export default {
  GUILD_ID: process.env.GUILD_ID,
  TOKEN: process.env.TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
  MONGO_URI: process.env.MONGO_URI
}
