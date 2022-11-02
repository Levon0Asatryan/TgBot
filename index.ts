import TelegramBot, { Message } from "node-telegram-bot-api";
import {
  start,
  knowMembers,
  startOf,
  startMember,
  unknownMessage,
} from "./commands";
import { ids, commands } from "./messages";

require("dotenv").config();

const bot = new TelegramBot(process.env.TOKEN!, { polling: true });

// Pqo 854268019
// Lyov 773894648
// Aren 1180497571
// Rudo 1667218206

bot.setMyCommands(Object.values(commands));

bot.on("message", async (msg: Message) => {
  const message = msg.text;
  const chatId = msg.chat.id;

  const isMemberOfGachalka = ids.GachalkaIds.includes(chatId);
  const isOfel = chatId === ids.OfelID;

  console.log(msg);

  if (isOfel) return await startOf(bot, chatId);

  if (!isOfel && !isMemberOfGachalka) return await startMember(bot, chatId);

  if (isMemberOfGachalka) {
    if (message === commands.start.command) return await start(bot, chatId);
    if (message === commands.knowMembers.command)
      return await knowMembers(bot, chatId);

    return await unknownMessage(bot, chatId);
  }
});
