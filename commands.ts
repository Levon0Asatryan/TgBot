import TelegramBot from "node-telegram-bot-api";
import { messages } from "./messages";

export const commands = {
  start: { command: "/start", description: "начать" },
  knowMembers: {
    command: "/members",
    description: "узнать кто состоит в Гачалке",
  },
};

export const start = async (bot: TelegramBot, id: number) => {
  await bot.sendMessage(id, messages.start.member);
};

export const knowMembers = async (bot: TelegramBot, id: number) => {
  await bot.sendMessage(id, messages.knowMemebers);
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
