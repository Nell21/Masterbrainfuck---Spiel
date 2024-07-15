// Zentralisierte Farbdefinitionen und Funktionen
const farben = {
  blue: chalk.blue,
  red: chalk.red,
  yellow: chalk.yellow,
  green: chalk.green,
  orange: chalk.hex('#FFA500'),
  purple: chalk.hex('#800080'),
};

function farbigerPunkt(zahl) {
  switch (zahl) {
    case '0':
      return farben.blue('\u25CF');
    case '1':
      return farben.red('\u25CF');
    case '2':
      return farben.yellow('\u25CF');
    case '3':
      return farben.green('\u25CF');
    case '4':
      return farben.orange('\u25CF');
    case '5':
      return farben.purple('\u25CF');
    default:
      return '\u25CF'; // Standardpunkt für ungültige Zahlen
  }
}

function spielNachricht(meldung) {
  console.log(chalk.bgWhite(chalk.black(meldung)));
}

function punktErklärung(zahl, farbe, punkt) {
  spielNachricht(
    `Zahl ${farben[zahl](zahl)} ergibt einen ${farbe} Punkt ${farben[zahl](
      punkt
    )}`
  );
}

function dasSpielStarten() {
  const spielerName = frageNachNamen(); // Spieler*innenname abfragen
  const geheimeNummer = generiereGeheimeZahl();

  spielNachricht(
    chalk.bold.yellow.underline(`MASTERBRAINFUCK\n`) +
      chalk.bgWhite(
        chalk.black(
          chalk.bold.magenta(
            `Eine geheime Farbcombi wurde generiert. Versuch sie zu erraten!\n`
          ) +
            chalk.bgBlack(
              chalk.white(
                `Die schwarzen Punkte ${chalk.inverse(
                  farbigerPunkt('0')
                )} bedeuten, du hast eine oder mehrere Farben an der richtigen Stelle.\n`
              )
            ) +
            `Die weißen Punkte ${chalk.inverse(
              farbigerPunkt('0')
            )} bedeuten, du hast eine oder mehrere Farben richtig, aber an der falschen Stelle.\n` +
            chalk.bgBlack(
              chalk.white(
                'Zahl ' +
                  farben.blue('0') +
                  ' ergibt einen ' +
                  'blauen Punkt' +
                  farben.blue(' ' + farbigerPunkt('0')) + // blauen Punkt als Unicode-Zeichen anzeigen
                  '\n' +
                  'Zahl ' +
                  farben.red('1') +
                  ' ergibt einen ' +
                  'roten Punkt' +
                  farben.red(' ' + farbigerPunkt('1')) + // roten Punkt anzeigen
                  '\n' +
                  'Zahl ' +
                  farben.yellow('2') +
                  ' ergibt einen ' +
                  'gelben Punkt' +
                  farben.yellow(' ' + farbigerPunkt('2')) + // gelben Punkt anzeigen
                  '\n' +
                  'Zahl ' +
                  farben.green('3') +
                  ' ergibt einen ' +
                  'grünen Punkt' +
                  farben.green(' ' + farbigerPunkt('3')) + // grünen Punkt anzeigen
                  '\n' +
                  'Zahl ' +
                  farben.orange('4') +
                  ' ergibt einen ' +
                  'orangefarbenen Punkt' +
                  farben.orange(' ' + farbigerPunkt('4')) + // orangen Punkt anzeigen
                  '\n' +
                  'Zahl ' +
                  farben.purple('5') +
                  ' ergibt einen ' +
                  'lila Punkt' +
                  farben.purple(' ' + farbigerPunkt('5')) // lila Punkt anzeigen
              )
            )
        )
      )
  );

  chalkAnimation.rainbow(`Verstanden? Los geht's!`).start();

  let tipp;
  let versuche = 0;

  while (true) {
    tipp = eingabe('Gib eine 4-stellige Zahl ein (Ziffern 0-5): ');
    if (!gueltigeVermutung(tipp)) {
      console.log(
        chalk.bold.red(
          'Ungültige Eingabe! Stelle sicher, dass es eine 4-stellige Zahl mit Ziffern von 0-5 ist.'
        )
      );
      continue;
    }

    versuche++;
    const { schwarzePunkte, weißePunkte } = schwarzWeißZähler(
      geheimeNummer,
      tipp
    );
    console.log(`Dein Tipp: ${zahlInFarben(tipp)}`);
    if (schwarzePunkte === 4) {
      console.log(
        chalk.bgMagenta(`Herzlichen Glückwunsch, ${spielerName}!`) +
          ' ' +
          chalk.yellow(`Du hast die Farben`) +
          chalk.blue(' ' + zahlInFarben(geheimeNummer)) +
          chalk.yellow(` in `) +
          chalk.blue(versuche) +
          chalk.yellow(` Versuchen erraten.`)
      );

      // Hier wird ein weiteres Spiel gestartet
      console.log(
        chalk.blue.bold(
          '\n Gut gemacht! Lust auf ein weiteres Spiel...?\n Auf gehts!'
        )
      );
      dasSpielStarten();
      break;
    } else if (schwarzePunkte === 0 && weißePunkte === 0) {
      const nachrichtIndex = Math.floor(
        Math.random() * zufälligeNachrichten.length
      );
      const zufälligeNachricht = zufälligeNachrichten[nachrichtIndex];
      chalkAnimation.rainbow(zufälligeNachricht).start();
    } else {
      let schwarzePunkteAnzeige =
        schwarzePunkte > 0
          ? chalk.bgWhite(
              chalk.black(
                schwarzePunkte === 1
                  ? farbigerPunkt('0')
                  : (farbigerPunkt('0') + ' ').repeat(schwarzePunkte).trim()
              )
            )
          : '';
      let weißePunkteAnzeige =
        weißePunkte > 0
          ? chalk.bgBlack(
              chalk.white(
                weißePunkte === 1
                  ? farbigerPunkt('0')
                  : (farbigerPunkt('0') + ' ').repeat(weißePunkte).trim()
              )
            )
          : '';

      if (schwarzePunkte > 0 && weißePunkte > 0) {
        console.log(`${schwarzePunkteAnzeige}`);
        console.log(`${weißePunkteAnzeige}`);
      } else {
        console.log(`${schwarzePunkteAnzeige}${weißePunkteAnzeige}`);
      }
    }
  }
}

// Das Spiel starten
dasSpielStarten();
