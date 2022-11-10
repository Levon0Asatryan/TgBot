import TelegramBot, { Message } from "node-telegram-bot-api";
import { messages, callbackQueryEvents, commands } from "./messages";
import { Image, PrismaClient } from "@prisma/client";

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

export const addPhoto = async (
  bot: TelegramBot,
  id: number,
  prisma: PrismaClient
) => {
  await bot.sendMessage(id, messages.addPhoto);

  bot.on("photo", async (msg: Message) => {
    const photoId = msg.photo![0].file_id;

    const photo = await prisma.image.create({
      data: {
        img: photoId,
      },
    });

    return await bot.sendMessage(id, messages.photoAdded(photo.id));
  });
};

export const getPhotoById = async (
  bot: TelegramBot,
  id: number,
  prisma: PrismaClient,
  message: string
) => {
  console.log(message);
  bot.sendMessage(id, messages.getPhoto);

  try {
    bot.on("message", async (msg: Message) => {
      if (!isNaN(+msg.text!)) {
        const photo = await prisma.image.findUnique({
          where: {
            id: +msg.text!,
          },
        });

        if (photo === null)
          return await bot.sendMessage(id, messages.photoNotExist);

        await bot.sendPhoto(id, photo!.img);
        return await bot.sendMessage(id, messages.photoSended);
      }
    });
  } catch (error) {
    return await bot.sendMessage(id, messages.photoNotExist);
  }
};

export const getRandomPhoto = async (
  bot: TelegramBot,
  id: number,
  prisma: PrismaClient
) => {
  const knonMembersEvents = callbackQueryEvents.knowMembers;
  const count = +(await prisma.image.count()) + 20;

  const buttonsMarkup = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Да",
            callback_data: "getMorePhoto",
          },
          {
            text: "Нет",
            callback_data: "dontKnowMembersDetails",
          },
        ],
      ],
    },
  };

  const sendImg = async (): Promise<any> => {
    const randomCount = Math.floor(Math.random() * count);

    const photo = await prisma.image.findUnique({
      where: {
        id: randomCount,
      },
    });

    if (photo === null) return await sendImg();

    await bot.sendPhoto(id, photo.img);
    return await bot.sendMessage(id, "Ещё?", buttonsMarkup);
  };

  sendImg();

  bot.on("callback_query", async (msg) => {
    if (msg.data === knonMembersEvents.no.callback_data)
      await bot.sendMessage(
        msg.message!.chat.id,
        messages.knowMembers.deteils.no
      );
    if (msg.data === "getMorePhoto") {
      await sendImg();
    }
  });
};
