import promptSync from 'prompt-sync';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

const eingabe = promptSync({ sigint: true });
const blackDot = '\u25CF';
const whiteDot = '\u25CF'; // Unicode für weißen Punkt geändert für Unterscheidung
const blueDot = '\u25CF';
const redDot = '\u25CF';
const yellowDot = '\u25CF';
const greenDot = '\u25CF';
const orangeDot = '\u25CF';
const purpleDot = '\u25CF';

// Eine Funktion um den Namen des Spielers/der Spielerin abzufragen.
function frageNachNamen() {
  const name =
    eingabe(
      'Bitte gib deinen Namen ein (oder drücke Enter für Spieler*in): '
    ) || 'Spieler*in';
  return name.trim();
}

// Funktion, um eine Zufallszahl mit 4 Ziffern (0-5) zu generieren, wobei Ziffern doppelt vorkommen können
function generiereGeheimeZahl() {
  let ziffern = [];
  for (let i = 0; i < 4; i++) {
    let ziffer = Math.floor(Math.random() * 6);
    ziffern.push(ziffer);
  }
  return ziffern.join('');
}

// Funktion, um die Eingabe des Spielers zu validieren
function gueltigeVermutung(tipp) {
  return /^[0-5]{4}$/.test(tipp);
}

/* mit for Schleife 
function überprüfeDenTipp(tipp) {
    // Überprüfen, ob die Länge des Strings genau 4 ist
    if (tipp.length !== 4) {
        return false;
    }
    
    // Überprüfen, ob jedes Zeichen im Bereich von '0' bis '5' liegt
    for (let i = 0; i < tipp.length; i++) {
        let zahl = tipp.charAt(i);
        if (zahl < '0' || zahl > '5') {
            return false;
        }
    }
    
    // Rückgabe true, wenn alle Bedingungen erfüllt sind
    return true;
} */

// Funktion, um schwarze und weiße Punkte zu vergeben:
// schwarz = richtige Zahl an der richtigen Stelle, weiß = richtige Zahl an der falschen Stelle
function schwarzWeißZähler(geheimnis, tipp) {
  let schwarzePunkte = 0;
  let weißePunkte = 0;
  let geheimnisArray = geheimnis.split('');
  let tippArray = tipp.split('');

  for (let i = 0; i < 4; i++) {
    if (tippArray[i] === geheimnisArray[i]) {
      schwarzePunkte++;
      geheimnisArray[i] = null; // Markieren, damit diese Position nicht für weiße Punkte verwendet wird
      tippArray[i] = null; // Ebenso markieren
    }
  }

  for (let i = 0; i < 4; i++) {
    if (tippArray[i] !== null && geheimnisArray.includes(tippArray[i])) {
      weißePunkte++;
      let index = geheimnisArray.indexOf(tippArray[i]);
      geheimnisArray[index] = null; // Markieren, damit diese Position nicht doppelt gezählt wird
    }
  }

  return { schwarzePunkte, weißePunkte };
}

// Funktion, um Ziffern in farbige Punkte umzuwandeln (Objekt- const farbigePunkte in einer Funktion)

/*function zifferInFarbigenPunkt(ziffer) {
  const farbigePunkte = {
    0: chalk.blue,
    1: chalk.red,
    2: chalk.yellow,
    3: chalk.green,
    4: chalk.hex('#FFA500'), // Orange
    5: chalk.hex('#800080'), // Lila
  };

  return farbigePunkte[ziffer] ? farbigePunkte[ziffer](ziffer) : blackDot;
}       
  
             //->>das ergibt nur farbige Zahlen aber keine Punkte
*/

/*function zifferInFarbigenPunkt(ziffer) {
  const farbigePunkte = {
    0: () => chalk.blue('\u25CF'),
    1: () => chalk.red('\u25CF'),
    2: () => chalk.yellow('\u25CF'),
    3: () => chalk.green('\u25CF'),
    4: () => chalk.hex('#FFA500')('\u25CF'), // Orange
    5: () => chalk.hex('#800080')('\u25CF'), // Lila
  };

  return farbigePunkte[ziffer]
    ? farbigePunkte[ziffer]()
    : chalk.white('\u25CF');
}
*/

function zifferInFarbigenPunkt(ziffer) {
  switch (ziffer) {
    case '0':
      return chalk.blue(blueDot);
    case '1':
      return chalk.red(redDot);
    case '2':
      return chalk.yellow(yellowDot);
    case '3':
      return chalk.green(greenDot);
    case '4':
      return chalk.hex('#FFA500')(orangeDot); // Orange
    case '5':
      return chalk.hex('#800080')(purpleDot); // Lila
    default:
      return blackDot;
  }
}

// Funktion, um Zahlen in einer Reihe in farbige Punkte umzuwandeln
function zahlInFarben(zahl) {
  return zahl.split('').map(zifferInFarbigenPunkt).join(' ');
}

// Liste zufälliger Nachrichten
const zufälligeNachrichten = [
  'Nicht aufgeben!',
  'Neuer Versuch - neues Glück!',
  'Der Weg ist das Ziel!',
  'Pech im Spiel ... ;)!',
  'Glücksspiele brauchen Glück - weiter so dann kommt es auch zu dir!',
  'Jeder neue Versuch ist eine neue Chance!',
  'Niederlagen sind nur Etappen auf dem Weg zum Ziel!',
  'Auch der längste Weg beginnt mit dem ersten Versuch!',
  'Erfolg ist kein Ziel, sondern eine Reise. Gib niemals auf!',
];

// Funktion, um das Spiel neu zu starten oder zu beenden
function spielNeuStartenBeenden() {
  while (true) {
    const entscheidung = eingabe(
      'Möchtest du ein neues Spiel starten oder beenden? (neues Spiel: J/beenden: N): '
    ).toUpperCase();
    if (entscheidung === 'J') {
      console.log(
        chalk.green('Juchhu, ') +
          chalk.blue('eine ') +
          chalk.red('weitere ') +
          chalk.magenta('Runde ') +
          chalk.hex('#FFA500')('kann ') +
          chalk.yellow('beginnen!')
      );
      dasSpielStarten();
      break;
    } else if (entscheidung === 'N') {
      console.log(chalk.green.bold('Danke fürs Spielen!'));
      process.exit(0);
    } else {
      console.log(
        chalk.red.bold(
          'Ungültige Eingabe. Bitte gib "neues Spiel" oder "beenden" ein.'
        )
      );
    }
  }
}

/* Funktion, um das Spiel neu zu starten
function starteNeuesSpiel() {
  const naechstesSpielStarten = chalkAnimation.rainbow(
    '\n Gut gemacht! Lust auf ein weiteres Spiel...?\n Auf gehts!'
  );

  console.log(naechstesSpielStarten);
  dasSpielStarten(); // Spiel erneut starten
}
*/

// Hauptfunktion des Spiels
function dasSpielStarten() {
  const spielerName = frageNachNamen(); // Spieler*innenname abfragen
  const geheimeNummer = generiereGeheimeZahl();

  console.log(
    chalk.bold.yellow.underline(`MASTERBRAINFUCK\n`) +
      chalk.bgWhite(
        chalk.black(
          chalk.bold.magenta(
            `Eine geheime Farbcombi wurde generiert. Versuch sie zu erraten!\n`
          ) +
            chalk.bgBlack(
              chalk.white(
                `Die schwarzen Punkte ${chalk.inverse(
                  blackDot
                )} bedeuten, du hast eine oder mehrere Farben an der richtigen Stelle.\n`
              )
            ) +
            `Die weißen Punkte ${chalk.inverse(
              whiteDot
            )} bedeuten, du hast eine oder mehrere Farben richtig, aber an der falschen Stelle.\n` +
            chalk.bgBlack(
              chalk.white(
                'Zahl ' +
                  chalk.blue('0') +
                  ' ergibt einen ' +
                  'blauen Punkt' +
                  chalk.blue(' ' + blueDot) + // blauen Punkt als Unicode-Zeichen anzeigen
                  '\n' +
                  'Zahl ' +
                  chalk.red('1') +
                  ' ergibt einen ' +
                  'roten Punkt' +
                  chalk.red(' ' + redDot) + // roten Punkt anzeigen
                  '\n' +
                  'Zahl ' +
                  chalk.yellow('2') +
                  ' ergibt einen ' +
                  'gelben Punkt' +
                  chalk.yellow(' ' + yellowDot) + // gelben Punkt anzeigen
                  '\n' +
                  'Zahl ' +
                  chalk.green('3') +
                  ' ergibt einen ' +
                  'grünen Punkt' +
                  chalk.green(' ' + greenDot) + // grünen Punkt anzeigen
                  '\n' +
                  'Zahl ' +
                  chalk.hex('#FFA500')('4') +
                  ' ergibt einen ' +
                  'orangefarbenen Punkt' +
                  chalk.hex('#FFA500')(' ' + orangeDot) + // orangen Punkt anzeigen
                  '\n' +
                  'Zahl ' +
                  chalk.hex('#800080')('5') +
                  ' ergibt einen ' +
                  'lila Punkt' +
                  chalk.hex('#800080')(' ' + purpleDot) // lila Punkt anzeigen
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

      /* Hier wird ein weiteres Spiel gestartet
      console.log(
        chalk.blue.bold(
          '\n Gut gemacht! Lust auf ein weiteres Spiel...?\n Auf gehts!'
        )
      ); */

      spielNeuStartenBeenden();
      break;
    } else if (schwarzePunkte === 0 && weißePunkte === 0) {
      const nachrichtIndex = Math.floor(
        Math.random() * zufälligeNachrichten.length
      );
      const zufälligeNachricht = zufälligeNachrichten[nachrichtIndex];
      // console.log(chalkAnimation.neon(zufälligeNachricht).render()); // animierte Nachricht mit Neon-Effekt wird durch .render in Form eines Strings ausgegeben
      chalkAnimation.rainbow(zufälligeNachricht).start();
    } else {
      let schwarzePunkteAnzeige =
        schwarzePunkte > 0
          ? chalk.bgWhite(
              chalk.black(
                schwarzePunkte === 1
                  ? blackDot
                  : (blackDot + ' ').repeat(schwarzePunkte).trim()
              )
            )
          : '';
      let weißePunkteAnzeige =
        weißePunkte > 0
          ? chalk.bgBlack(
              chalk.white(
                weißePunkte === 1
                  ? whiteDot
                  : (whiteDot + ' ').repeat(weißePunkte).trim()
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
