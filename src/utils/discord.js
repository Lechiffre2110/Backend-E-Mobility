const { EmbedBuilder, WebhookClient } = require("discord.js");

exports.sendContributorWebhook = (name, role, description) => {
  // Webhook setup
  const webhookClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK_URL,
  });

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("🌟 New Contributor Request 🌟")
    .setURL("https://e-mobility.vercel.app/datahub")
    .setAuthor({
      name: "E-Mobility",
      iconURL: "https://i.imgur.com/gCHlpoX.jpg",
      url: "https://e-mobility.vercel.app/datahub",
    })
    .setDescription(`**${name}** has requested to become a contributor!`)
    .addFields(
      { name: "👤  Name", value: name },
      { name: "🏢  Role", value: role },
      { name: "📝  Description", value: description }
    )
    .setTimestamp()
    .setFooter({
      text: "Please review and take appropriate action.",
      iconURL: "https://i.imgur.com/gCHlpoX.jpg",
    });

  webhookClient.send({
    username: "E-Mobility Dashboard",
    avatarURL: "https://i.imgur.com/gCHlpoX.jpg",
    embeds: [embed],
    content: "<@&1146438551655944296>",
  });
};

exports.sendOnboardingRequestWebhook = (name) => {
  // Webhook setup
  const webhookClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK_URL,
  });

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("📋 New Onboarding Request 📋")
    .setURL("https://e-mobility.vercel.app/datahub")
    .setAuthor({
      name: "E-Mobility",
      iconURL: "https://i.imgur.com/gCHlpoX.jpg",
      url: "https://e-mobility.vercel.app/datahub",
    })
    .setDescription(`**${name}** has requested to be onboarded 📋`)
    .addFields({ name: "👤  Name", value: name })
    .setTimestamp()
    .setFooter({
      text: "Please review and take appropriate action.",
      iconURL: "https://i.imgur.com/gCHlpoX.jpg",
    });

  webhookClient.send({
    username: "E-Mobility Dashboard",
    avatarURL: "https://i.imgur.com/gCHlpoX.jpg",
    embeds: [embed],
    content: "<@&1146438551655944296>",
  });
};

exports.sendUploadWebhook = (name, filename, description) => {
  // Webhook setup
  const webhookClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK_URL,
  });

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("🚀 New File Upload 🚀")
    .setURL("https://e-mobility.vercel.app/datahub")
    .setAuthor({
      name: "E-Mobility",
      iconURL: "https://i.imgur.com/gCHlpoX.jpg",
      url: "https://e-mobility.vercel.app/datahub",
    })
    .setDescription(`**${name}** has uploaded a new file! 🚀`)
    .addFields(
      { name: "👤  Name", value: name },
      { name: "📁  Filename", value: filename },
      { name: "📝  Description", value: description }
    )
    .setTimestamp()
    .setFooter({
      text: "Please review and take appropriate action.",
      iconURL: "https://i.imgur.com/gCHlpoX.jpg",
    });

  webhookClient.send({
    username: "E-Mobility Dashboard",
    avatarURL: "https://i.imgur.com/gCHlpoX.jpg",
    embeds: [embed],
    content: "<@&1146438551655944296>",
  });
};

exports.sendBugReportWebhook = (bugname, description, contact) => {
    // Webhook setup
    const webhookClient = new WebhookClient({
      url: process.env.DISCORD_WEBHOOK_URL,
    });
  
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("⚠️ A new bug report has been submitted ⚠️")
      .setURL("https://e-mobility.vercel.app/datahub")
      .setAuthor({
        name: "E-Mobility",
        iconURL: "https://i.imgur.com/gCHlpoX.jpg",
        url: "https://e-mobility.vercel.app/datahub",
      })
      .setDescription(`A new bug was reported!`)
      .addFields(
        { name: "⚠️  Name", value: bugname },
        { name: "📝  Description", value: description },
        { name: "📧  Contact", value: contact }
      )
      .setTimestamp()
      .setFooter({
        text: "Please review and take appropriate action.",
        iconURL: "https://i.imgur.com/gCHlpoX.jpg",
      });
  
    webhookClient.send({
      username: "E-Mobility Dashboard",
      avatarURL: "https://i.imgur.com/gCHlpoX.jpg",
      embeds: [embed],
      content: "<@&1146438551655944296>",
    });
  };

  exports.sendMeetingWebhook = (title, date, time) => {
    // Webhook setup
    const webhookClient = new WebhookClient({
      url: process.env.DISCORD_MEETING_WEBHOOK_URL,
    });
  
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("📅 Neues Meeting 📅")
      .setURL("https://e-mobility.vercel.app/datahub")
      .setAuthor({
        name: "E-Mobility",
        iconURL: "https://i.imgur.com/gCHlpoX.jpg",
        url: "https://e-mobility.vercel.app/datahub",
      })
      .setDescription(`Ein neues Meeting wurde geplant!`)
      .addFields(
        { name: "📝  Titel", value: title },
        { name: "📅  Datum", value: date },
        { name: "🕒  Uhrzeit", value: time }
      )
      .setTimestamp()
  
    webhookClient.send({
      username: "E-Mobility Dashboard",
      avatarURL: "https://i.imgur.com/gCHlpoX.jpg",
      embeds: [embed],
      content: "@everyone",
    });
  };