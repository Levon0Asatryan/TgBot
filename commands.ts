import TelegramBot from "node-telegram-bot-api";
import { messages, callbackQueryEvents } from "./messages";

export const start = async (bot: TelegramBot, id: number) => {
  await bot.sendMessage(id, messages.start.member);
};

export const knowMembers = async (bot: TelegramBot, id: number) => {
  const knowMembers = messages.knowMembers;
  const knonMembersEvents = callbackQueryEvents.knowMembers;

  const buttonsMarkup = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            ...knonMembersEvents.yes,
          },
          {
            ...knonMembersEvents.no,
          },
        ],
      ],
    },
  };

  await bot.sendMessage(id, knowMembers.main);
  await bot.sendMessage(id, knowMembers.deteils.main, buttonsMarkup);

  bot.on("callback_query", async (msg) => {
    if (msg.data === knonMembersEvents.no.callback_data)
      await bot.sendMessage(msg.message!.chat.id, knowMembers.deteils.no);
    if (msg.data === knonMembersEvents.yes.callback_data) {
      await bot.sendMessage(msg.message!.chat.id, knowMembers.deteils.yes);
      await bot.sendMessage(
        msg.message!.chat.id,
        "/* (LyovsComment) ha es Arenin shat em sirum */"
      );
    }
  });
};

export const startOf = async (bot: TelegramBot, id: number) => {
  await bot.sendMessage(id, messages.start.of);
};

export const startMember = async (bot: TelegramBot, id: number) => {
  await bot.sendMessage(id, messages.start.standard);
};

export const unknownMessage = async (bot: TelegramBot, id: number) => {
  await bot.sendMessage(id, messages.unknownMessage);
};
