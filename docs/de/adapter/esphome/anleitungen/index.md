---
order: 2
adapter: "esphome"
editLink: "https://github.com/DrozmotiX/ioBroker.esphome/edit/main/docs/de/02.anleitungen/README.md"
---

# Anleitungen

Anleitungen nach Aufgaben: Geräte verbinden, das Dashboard nutzen, Geräte steuern, mit Skripten und VIS arbeiten.

## [Wie lasse ich Geräte automatisch finden und wie steuere ich, welche gelistet werden?](geraete-entdecken.md)

- [Warum meldet die Auto-Discovery Router oder fremde Geräte als ESPHome und wie schließe ich eine IP aus?](geraete-entdecken.md#auto-discovery-report-routers-foreign)
- [Kann ich die Netzwerkschnittstelle für die Geräte-Erkennung wählen?](geraete-entdecken.md#choose-network-interface-device-discovery)
- [Wie finde ich Geräte in einem anderen VLAN oder wenn ioBroker in Docker läuft?](geraete-entdecken.md#devices-another-vlan-iobroker-runs)
- [Unterstützt der Adapter ioBroker.discovery?](geraete-entdecken.md#adapter-support-iobroker-discovery)

## [Wie lösche ich Geräte und räume alte Datenpunkte auf?](geraete-verwalten.md)

- [Wie lösche ich ein Gerät komplett und warum kommen die Objekte zurück?](geraete-verwalten.md#delete-device-completely-objects-come)
- [Wie räume ich nicht mehr vorhandene Geräte und alte Datenpunkte auf?](geraete-verwalten.md#clean-up-devices-datapoints-no)
- [Wie finde ich das gespeicherte (maskierte) API-Passwort oder den Schlüssel wieder?](geraete-verwalten.md#recover-stored-masked-api-password)

## [Wie wähle ich Version und Zugriffsweg des Dashboards?](dashboard-nutzen.md)

- [Wie wähle oder aktualisiere ich die ESPHome-Dashboard-Version, auch ältere?](dashboard-nutzen.md#choose-update-esphome-dashboard-version)
- [Wie nutze ich ein externes ESPHome-Dashboard statt des integrierten?](dashboard-nutzen.md#use-external-esphome-dashboard-instead)
- [Wie zeige ich das Dashboard im Admin-Tab bei HTTPS an?](dashboard-nutzen.md#show-dashboard-admin-tab-using)

## [Wie verwalte ich YAML-Dateien, Zusatzdateien und Backups?](yaml-dateien.md)

- [Wie lade ich YAML-Dateien hoch, sehe sie an oder lösche sie?](yaml-dateien.md#upload-view-delete-yaml-files)
- [Wohin gehören Schriften, Bilder, Include-Dateien und lokale external_components?](yaml-dateien.md#fonts-images-include-files-local)
- [Was gehört in die secrets.yaml und was passiert ohne sie?](yaml-dateien.md#goes-into-secrets-yaml-happens)
- [Wie bekomme ich meine Geräte nach Neuinstallation oder Umzug wieder ins Dashboard?](yaml-dateien.md#devices-back-into-dashboard-after)
- [Wie sichere und stelle ich die ESPHome-Dateien wieder her?](yaml-dateien.md#back-up-restore-esphome-files)

## [Wie nutze ich ESPHome-Datenpunkte in Skripten, VIS, Aliasen und mit Alexa?](automatisieren.md)

- [Wie zeige ich Geräte in VIS an, setze Zeiten und liste alle Geräte im Skript auf?](automatisieren.md#show-devices-vis-times-list)
- [Wie verwende ich ESPHome-Datenpunkte in Aliasen, Alexa oder dem IoT-Adapter?](automatisieren.md#use-esphome-datapoints-aliases-alexa)
- [Wie schicke ich Text oder Werte auf ein ESPHome-Display?](automatisieren.md#send-text-values-esphome-display)
- [Wie steuere ich einen Servo oder Ausgang eines ESPHome-Geräts?](automatisieren.md#control-servo-output-esphome-device)
- [Wie erkenne ich Anwesenheit per Bluetooth-Beacon oder Smartwatch?](automatisieren.md#detect-presence-via-bluetooth-beacon)
- [Wie nutze ich bei einer RGBW-Lampe den Weißkanal automatisch?](automatisieren.md#use-white-channel-rgbw-lamp)

[Zurück zur Übersicht](../)
