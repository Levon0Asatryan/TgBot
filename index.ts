import TelegramBot, { Message } from "node-telegram-bot-api";
import {
  start,
  knowMembers,
  commands,
  startOf,
  startMember,
  unknownMessage,
} from "./commands";
import { ids } from "./messages";

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

// ________________________________________________________________
// ________________________________________________________________
// ________________________________________________________________

const chats = {};

const gameOptions = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
    ],
  },
};

bot.on("message", async (msg: Message) => {
  const message = msg.text;
  const chatId = msg.chat.id;

  if (message === "/game") {
    const randomNum = Math.floor(Math.random() * 10);
    return await bot.sendMessage(chatId, `1ic 9y tiv gushaki`, gameOptions);
  }
});

bot.on("callback_query", (msg) => {
  bot.sendMessage(msg.message!.chat.id, `you choose ${msg.data}`);
  console.log(msg);
});
