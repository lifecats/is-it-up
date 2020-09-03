const TG = require("telegram-bot-api");
const axios = require("axios");

const api = new TG({
  token: "1333754475:AAHHbwoGYMjm-DGRP4BNP67zZ-EQL7BXyno",
});
// Define your message provider
const mp = new TG.GetUpdateMessageProvider();

// Set message provider and start API
api.setMessageProvider(mp);
api
  .start()
  .then(() => {
    console.log("API is started");
  })
  .catch(console.err);

// Receive messages via event callback
api.on("update", (update) => {
  if (update.message.text == "/start") {
    console.log(update.message.text);
    api.sendMessage({
      chat_id: update.message.chat.id,
      text:
        "Hi, " +
        update.message.from.first_name +
        ", send me any url and i will check it for you!",
    });
  } else if (update.message.text.startsWith("http")) {
    let url = update.message.text;
    axios
      .get(url)
      .then(function (response) {
        api.sendMessage({
          chat_id: update.message.chat.id,
          text:
            "Yup, " +
          url +
            " is avaliable. Congrats!",
        });
        console.log(response);
      })
      .catch(function (error) {
        api.sendMessage({
          chat_id: update.message.chat.id,
          text:
            "Uh oh, " +
           url+
            " is not avaliable...",
        });
        console.log(error);
      });
  } else {
    api.sendMessage({
      chat_id: update.message.chat.id,
      text:
        "Looks like it is not valid url",
    });
  }
});
