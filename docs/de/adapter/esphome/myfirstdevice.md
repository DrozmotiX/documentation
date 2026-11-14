---
order: 4
---

# Mein erstes Gerät

Wenn richtig konfiguriert, siehe Abschnitt [Adapterkonfiguration](./adapterconfig.md), ist das ESPHome Dashboard verfügbar.

<img src="./img/mainscreen.png" width="60%" height="60%" align="center">

## Neues Gerät hinzufügen

1) Geben Sie Ihre Grundeinstellungen an  
   <img src="./img/addnewdevice.png" width="60%" height="60%" align="center">
   ::: tip Erstellte Konfigurationsdateien (>device<.yaml) werden gespeichert unter
   ```/opt/iobroker/node_modules/iobroker.esphome/config/>device<.yaml```
   :::

2) Klicken Sie auf Kompilieren, um Ihr Binary zu erstellen  
   <img src="./img/addedfirstdevice.png" width="60%" height="60%" align="center">
   <img src="./img/compilenewdevice.png" width="60%" height="60%" align="center">

3) Laden Sie das h-Binary herunter und flashen Sie es auf Ihr ESP-Gerät

   <img src="./img/adddevice.png" width="60%" height="60%" align="center">
   
Für Unterstützung bei der Einrichtung der yaml oder der Verbindung wenden Sie sich bitte an die ESPHome-Community, wenn alles gut gegangen ist, wird das Gerät als verbunden angezeigt und Sie können mit der Einrichtung fortfahren

<img src="./img/adddevice.png" width="60%" height="60%" align="center">
   
::: tip Brauchen Sie etwas Inspiration?
Werfen Sie einen Blick auf meine [Beispiel konfigurationen](./configexample.md) oder sehen Sie sich [ESPHome.io](https://esphome.io)an
:::