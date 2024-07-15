# **MasterBrainFuck**

Willkommen zu MasterBrainFuck! Ein einfaches (Zahlen/Punkte) Ratespiel basierend auf dem Klassiker "Mastermind".

Das Spiel Mastermind wurde 1970 von Mordechai (Marco) Meirovitz erfunden. Er war ein in Paris lebender israelischer Kommunikationsexperte. Das Spiel wurde von mehreren Spielfirmen abgelehnt und dann stellte er es selber 1971 auf der Nürnberger Spielwarenmesse vor. In Deutschland hieß es erst SuperHirn und später Mastermind. In der DDR wurde es unter LogikTrainer oder SuperCode verkauft.
Weitere Informationen findet ihr unter: https://de.wikipedia.org/wiki/Mastermind_(Spiel)

### **Spielbeschreibung**

MasterBrainFuck ist ein Spiel, bei dem du versuchen musst, einen geheimen 4-stelligen Farbcode in Form von farbigen Punkten zu erraten. Die Farbpunkte bestehen aus Ziffern von 0 bis 5 die jeweils einer Farbe zugeordnet sind. Die Erklärung dazu wird zum Anfang des Spiels auch noch einmal eingeblendet.
Des Weiteren bekommst du Feedback in Form von schwarzen und weißen Punkten:

    Schwarzer Punkt: Eine richtige Farbe an der richtigen Stelle.
    Weißer Punkt: Eine richtige Farbe an der falschen Stelle.

Das Ziel ist es, den Farbcode in möglichst wenigen Versuchen zu erraten!

## **Installation**

Stelle sicher, dass du Node.js auf deinem Computer installiert hast.

Lade das Spiel herunter oder klone es von GitHub:

    git clone git@github.com:Nell21/Masterbrainfuck---Spiel.git cd Masterbrainfuck---Spiel

Installiere die Abhängigkeiten mit npm:

    npm install

### **Spiel starten**

Führe das Spiel mit dem folgenden Befehl aus:

    node masterbrainfuck.mjs

Folge den Anweisungen auf dem Bildschirm, um das Spiel zu spielen.

### **Spielregeln**

    Gib eine 4-stellige Zahl ein, um zu raten.
    Die Zahlen bestehen aus den Ziffern 0 bis 5.
    Mit der Zahleneingabe entstehen farbige Punkte hinter deinem "Tipp" im Terminal.
    Du erhältst Feedback über schwarze (richtige Farbe, richtige Stelle) und weiße Punkte (richtige Farbe, falsche Stelle).
    Versuche, den geheimen Farbcode in möglichst wenigen Versuchen zu erraten!

### **Optionen während des Spiels**

Während des Spiels hast du folgende Optionen:

    J für ein neues Spiel starten
    B um das Spiel zu beenden

### Creator

Nell Stephanie Konersmann
