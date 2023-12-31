/**
 * Template for the onboarding email
 * @param {String} name name of the other that is being onboarded
 */
exports.onboardingTemplate = (name) => {
  return `
  <div
      style="
        background-color: #390099;
        padding: 3%;
        color: #fff;
        text-align: center;
        border-radius: 10px;
      "
    >
      <h1
        style="font-family: Arial, sans-serif; color: #ffb20f; font-size: 24px;"
      >
        Hallo ${name}
      </h1>
      <p style="font-family: Arial, sans-serif; font-size: 16px;">
        Herzlich willkommen bei Projekt E-Mobility!
      </p>
      <p
        style="
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 28px;
        "
      >
        Um Dir deinen Einstieg ins Projekt zu erleichtern, findest du
        nachfolgend ein Paar nützliche Links, um dich in die Themen
        einzuarbeiten:
      </p>
      <div>
        <p
          style="
            font-family: Arial, sans-serif;
            font-size: 16px;
            font-weight: bold;
          "
        >
          Einführung in das CAN Interface
        </p>

        <a
          href="https://circuitstate.com/tutorials/what-is-can-bus-how-to-use-can-interface-with-esp32-and-arduino/"
          style="font-family: Arial, sans-serif; color: white; cursor: pointer;"
          >CAN Intro</a
        >
        <p
          style="
            font-family: Arial, sans-serif;
            font-size: 16px;
            font-weight: bold;
          "
        >
          Einführung Raspberry Pi
        </p>
        <div>
          <a
            href="https://www.youtube.com/watch?v=eZ74x6dVYes"
            style="
              font-family: Arial, sans-serif;
              color: white;
              cursor: pointer;
            "
            >Was ist ein Raspberry Pi</a
          >
        </div>
        <div style="margin-top: 20px;">
          <a
            href="https://www.youtube.com/watch?v=EKPobkb1N6o"
            style="
              font-family: Arial, sans-serif;
              color: white;
              cursor: pointer;
            "
            >Arbeiten mit Raspberry Pi</a
          >
        </div>
        <p
          style="
            font-family: Arial, sans-serif;
            font-size: 16px;
            font-weight: bold;
          "
        >
          Allgemeine Grundlage für das Projekt
        </p>
        <a
          href="https://discord.com/channels/1146071831753789490/1146072161522553003/1152884482500739133"
          style="font-family: Arial, sans-serif; color: white; cursor: pointer;"
          >Bachelorarbeit (im Discord Server)</a
        >
      </div>
      <p
        style="
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 28px;
        "
      >
        Wenn Du mehr über das Projekt und seine Ziele erfahren möchtest, schau
        gerne auf unserer Website vorbei.
      </p>
      <button
        style="
          background-color: #ffb20f;
          color: white;
          border: none;
          padding: 15px 32px;
          text-align: center;
          font-size: 15px;
          font-weight: bold;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 5px;
          "
      >
      <a style="color: white;" href="https://e-mobility.vercel.app/">
        Zur Website
        </a>
      </button>

      <p
        style="
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 28px;
        "
      >
        Wenn Du als Mitwirkender des Projekts aufgeführt werden möchtest, kannst
        du dies im Datahub unter dem Menüpunkt „Mitwirkung beantragen“ gerne
        tun.
      </p>

      <p
        style="
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 28px;
        "
      >
        Um dem Projekt Discord Server beizutreten, klicke auf den nachfolgenden
        Button. Alle wichtigen Informationen findest du im #Onboarding Channel
        zusammengetragen.
      </p>
      <button
        style="
          background-color: #ffb20f;
          color: white;
          border: none;
          padding: 15px 32px;
          text-align: center;
          font-size: 15px;
          font-weight: bold;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 5px;
        "
      >
      <a style="color: white;" href="https://discord.gg/ZVVHR3eWpG">
        Discord Server
        </a>
      </button>
    </div>
`;
};
