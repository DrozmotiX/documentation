---
order: 3
adapter: "esphome"
editLink: "https://github.com/DrozmotiX/ioBroker.esphome/edit/main/docs/de/03.referenz/README.md"
---

# Referenz

Alle Einstellungen, erzeugten States, Befehle und Log-Meldungen zum Nachschlagen.

## [Welche Einstellungen hat der Adapter und was bewirken sie?](einstellungen.md)

- [Welche Reconnect-Einstellungen gibt es und was passiert, wenn ein Gerät offline geht?](einstellungen.md#reconnect-settings-exist-happens-device)
- [Was bewirkt die Option "Konfigurationszustände anzeigen" und was sind die Ordner info und config?](einstellungen.md#show-configuration-states-info-config)

## [Wie sind die Datenpunkte aufgebaut und wie schreibe ich sie?](datenpunkte.md)

- [Warum steht im Datenpunkt-Pfad eine Zahl statt des Sensornamens?](datenpunkte.md#datapoint-path-contain-number-instead)
- [Wo finde ich Online-Status, WLAN-Signal, IP und Laufzeit eines Geräts?](datenpunkte.md#online-status-wifi-signal-ip)
- [Wann gilt ein Befehl als bestätigt (ack) und was passiert bei einem Offline-Gerät?](datenpunkte.md#command-acknowledged-ack-happens-offline)

## [Welche Datenpunkte hat eine ESPHome-Lampe?](licht.md)

- [Welche Datenpunkte hat eine RGB/RGBW-Lampe und welche Werte erwartet sie?](licht.md#datapoints-rgb-rgbw-lamp-have)
- [Wie setze ich Übergangsdauer und Flash-Länge einer Lampe?](licht.md#transition-length-flash-length-light)
- [Wie wähle ich einen Lichteffekt aus ioBroker aus?](licht.md#select-light-effect-iobroker)

## [Wie steuere ich Rollläden, Lüfter, Schlösser und Klimageräte?](cover-luefter-schloss-klima.md)

- [Wie steuere ich Rollläden und Covers (auch time_based): Position, Neigung, Stopp?](cover-luefter-schloss-klima.md#control-covers-including-time-based)
- [Wie steuere ich einen ESPHome-Lüfter (Geschwindigkeit, Richtung, Oszillation)?](cover-luefter-schloss-klima.md#control-esphome-fan-speed-direction)
- [Wie bediene ich ein ESPHome-Schloss (Lock)?](cover-luefter-schloss-klima.md#operate-esphome-lock)
- [Wie steuere ich ein Klimagerät (z. B. Midea-Umbau)?](cover-luefter-schloss-klima.md#control-climate-device-example-midea)

## [Welche Datenpunkte haben Number, Select, Button und Sensoren?](zahlen-auswahl-tasten-sensoren.md)

- [Wie sehe und schreibe ich einen ESPHome-Number (Template-Slider)?](zahlen-auswahl-tasten-sensoren.md#see-write-esphome-number-template)
- [Wie ändere ich einen ESPHome-Select (Auswahlliste)?](zahlen-auswahl-tasten-sensoren.md#change-esphome-select-dropdown)
- [Wie löse ich einen Button, Neustart oder ein Skript eines Geräts aus?](zahlen-auswahl-tasten-sensoren.md#trigger-button-restart-script-device)
- [Warum zeigt mein Binärsensor keinen Wert oder nur einen Ordner?](zahlen-auswahl-tasten-sensoren.md#binary-sensor-show-no-value)

## [Was bedeuten die Meldungen im Adapter-Log?](log-meldungen.md)

- [Warum ist das Log voll mit Fehlern bei Verbindungsabbrüchen und Reconnects?](log-meldungen.md#log-full-errors-connections-drop)
- [Was bedeuten "deserializeBinary", "Assertion failed", "Bad format" und "Invalid wire type"?](log-meldungen.md#deserializebinary-assertion-failed-bad-format)
- [Warum sehe ich im Geräte-Log ständig Verbindungen des Adapters?](log-meldungen.md#constantly-see-adapter-connections-device)

[Zurück zur Übersicht](../)
