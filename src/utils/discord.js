const { EmbedBuilder, WebhookClient } = require("discord.js");

/**
 * Function to send a notification to Discord about a new contributor request
 * @param {String} name the name of the contributor  
 * @param {String} role the role of the contributor (student, professor, ...) 
 * @param {String} description the description of the contributors work
 */
exports.sendContributorWebhook = (name, role, description) => {
  // Webhook setup
  const webhookClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK_URL,
  });

  // Create embed 
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

  // Send embed to Discord
  webhookClient.send({
    username: "E-Mobility Dashboard",
    avatarURL: "https://i.imgur.com/gCHlpoX.jpg",
    embeds: [embed],
    content: "<@&1146438551655944296>",
  });
};

/**
 * Function to send a notification to Discord about a new onboarding request
 * @param {String} name the name of the user requesting onboarding
 */
exports.sendOnboardingRequestWebhook = (name) => {
  // Webhook setup
  const webhookClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK_URL,
  });

  // Create embed
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

  // Send embed to Discord
  webhookClient.send({
    username: "E-Mobility Dashboard",
    avatarURL: "https://i.imgur.com/gCHlpoX.jpg",
    embeds: [embed],
    content: "<@&1146438551655944296>",
  });
};

/**
 * Function to send a notification to Discord about a new file upload
 * @param {String} name the name of the user uploading the file
 * @param {String} filename the name of the file
 * @param {String} description the description of the file
 */
exports.sendUploadWebhook = (name, filename, description) => {
  // Webhook setup
  const webhookClient = new WebhookClient({
    url: process.env.DISCORD_WEBHOOK_URL,
  });

  // Create embed
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

  // Send embed to Discord
  webhookClient.send({
    username: "E-Mobility Dashboard",
    avatarURL: "https://i.imgur.com/gCHlpoX.jpg",
    embeds: [embed],
    content: "<@&1146438551655944296>",
  });
};

/**
 * Function to send a notification to Discord about a new bug report
 * @param {String} bugname the name of the bug
 * @param {String} description the description of the bug
 * @param {String} contact the contact information of the reporter
 */
exports.sendBugReportWebhook = (bugname, description, contact) => {
    // Webhook setup
    const webhookClient = new WebhookClient({
      url: process.env.DISCORD_WEBHOOK_URL,
    });
  
    // Create embed
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
  
    // Send embed to Discord
    webhookClient.send({
      username: "E-Mobility Dashboard",
      avatarURL: "https://i.imgur.com/gCHlpoX.jpg",
      embeds: [embed],
      content: "<@&1146438551655944296>",
    });
  };

  /**
   * Function to send a notification to Discord about a new meeting
   * @param {String} title the title of the meeting
   * @param {String} date the date of the meeting
   * @param {String} time the time of the meeting
   */
  exports.sendMeetingWebhook = (title, date, time) => {
    // Webhook setup
    const webhookClient = new WebhookClient({
      url: process.env.DISCORD_MEETING_WEBHOOK_URL,
    });
  
    // Create embed
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
  
    // Send embed to Discord
    webhookClient.send({
      username: "E-Mobility Dashboard",
      avatarURL: "https://i.imgur.com/gCHlpoX.jpg",
      embeds: [embed],
      content: "@everyone",
    });
  };