---
order: 3
adapter: "esphome"
editLink: "https://github.com/DrozmotiX/ioBroker.esphome/edit/main/docs/en/03.referenz/README.md"
---

# Reference

All settings, created states, commands and log messages to look up.

## [Which settings does the adapter have and what do they do?](einstellungen.md)

- [Which reconnect settings exist and what happens when a device goes offline?](einstellungen.md#reconnect-settings-exist-happens-device)
- [What does the option "Show configuration states" do, and what are the info and config folders?](einstellungen.md#show-configuration-states-info-config)

## [How are the datapoints structured and how do I write to them?](datenpunkte.md)

- [Why does the datapoint path contain a number instead of the sensor name?](datenpunkte.md#datapoint-path-contain-number-instead)
- [Where do I find online status, WiFi signal, IP and uptime of a device?](datenpunkte.md#online-status-wifi-signal-ip)
- [When is a command acknowledged (ack) and what happens with an offline device?](datenpunkte.md#command-acknowledged-ack-happens-offline)

## [Which datapoints does an ESPHome light have?](licht.md)

- [Which datapoints does an RGB/RGBW lamp have and which values does it expect?](licht.md#datapoints-rgb-rgbw-lamp-have)
- [How do I set transition length and flash length of a light?](licht.md#transition-length-flash-length-light)
- [How do I select a light effect from ioBroker?](licht.md#select-light-effect-iobroker)

## [How do I control covers, fans, locks and climate devices?](cover-luefter-schloss-klima.md)

- [How do I control covers (including time_based): position, tilt, stop?](cover-luefter-schloss-klima.md#control-covers-including-time-based)
- [How do I control an ESPHome fan (speed, direction, oscillation)?](cover-luefter-schloss-klima.md#control-esphome-fan-speed-direction)
- [How do I operate an ESPHome lock?](cover-luefter-schloss-klima.md#operate-esphome-lock)
- [How do I control a climate device (for example a Midea conversion)?](cover-luefter-schloss-klima.md#control-climate-device-example-midea)

## [Which datapoints do Number, Select, Button and sensors have?](zahlen-auswahl-tasten-sensoren.md)

- [How do I see and write an ESPHome Number (template slider)?](zahlen-auswahl-tasten-sensoren.md#see-write-esphome-number-template)
- [How do I change an ESPHome Select (dropdown)?](zahlen-auswahl-tasten-sensoren.md#change-esphome-select-dropdown)
- [How do I trigger a button, restart or script of a device?](zahlen-auswahl-tasten-sensoren.md#trigger-button-restart-script-device)
- [Why does my binary sensor show no value or only a folder?](zahlen-auswahl-tasten-sensoren.md#binary-sensor-show-no-value)

## [What do the messages in the adapter log mean?](log-meldungen.md)

- [Why is the log full of errors when connections drop and reconnect?](log-meldungen.md#log-full-errors-connections-drop)
- [What do "deserializeBinary", "Assertion failed", "Bad format" and "Invalid wire type" mean?](log-meldungen.md#deserializebinary-assertion-failed-bad-format)
- [Why do I constantly see adapter connections in the device log?](log-meldungen.md#constantly-see-adapter-connections-device)

[Back to the overview](../)
