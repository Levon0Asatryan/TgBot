export const ids = {
  GachalkaIds: [854268019, 773894648, 1180497571, 1667218206, 1047907355],
  OfelID: 1373225153,
};

export const members = ["Levon", "Pargev", "Rudolf", "Aren"];

export const messages = {
  start: {
    of: "Я знаю кто вы такая, но даже вам сюда нельзя!",
    standard: "Вон отсюда, вы не учасник",
    member: "Добро пожаловать уважаемый участник Гачалки",
  },
  knowMembers: {
    main: `На данный момент ${ids.GachalkaIds.length} человека`,
    deteils: {
      main: "Хотите узнать поподробнее ?",
      no: "Ну иди тогда на хуй",
      yes: "Lyov - admin Tg\nPqo - admin insta\nRudo - admin ds\nAren - naxuy idi",
    },
  },
  unknownMessage: "Я вас не понимаю",
  addPhoto: "Отправьте мне фото которое хотите сохранить",
  photoAdded: (id: number) => `Фото добавлено, фото id:${id}`,
  getPhoto: "Отправьте id фото которое хотие",
  photoNotExist: "Фото по такому id нет",
  photoSended: "Фото отпрвлено",
};

export const callbackQueryEvents = {
  knowMembers: {
    yes: {
      text: "Да",
      callback_data: "knowMembersDetails",
    },
    no: {
      text: "Нет",
      callback_data: "dontKnowMembersDetails",
    },
  },
};

export const commands = {
  start: { command: "/start", description: "начать" },
  knowMembers: {
    command: "/members",
    description: "узнать кто состоит в Гачалке",
  },
  addPhoto: {
    command: "/addphoto",
    description: "добавить фото",
  },
  getPhotoById: {
    command: "/getphotobyid",
    description: "получить фото по id",
  },
  getRandomPhoto: {
    command: "/getrandomphoto",
    description: "получить рандомное фото",
  },
};
