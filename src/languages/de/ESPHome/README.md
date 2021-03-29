![Logo](admin/esphome.png)

![Basic configuration](./img/esphome.png)

[![NPM version](http://img.shields.io/npm/v/iobroker.esphome.svg)](https://www.npmjs.com/package/iobroker.esphome)
[![Downloads](https://img.shields.io/npm/dm/iobroker.esphome.svg)](https://www.npmjs.com/package/iobroker.esphome)
![Number of Installations (latest)](http://iobroker.live/badges/esphome-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/esphome-stable.svg)
[![Dependency Status](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)](https://david-dm.org/DrozmotiX/iobroker.esphome)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Known Vulnerabilities](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome)

[![NPM](https://nodei.co/npm/iobroker.esphome.png?downloads=true)](https://nodei.co/npm/iobroker.esphome/)

**Tests:** ![Test and Release](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in der [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Reporting wird ab js-controller 3.0 verwendet.

Steuern Sie Ihre ESP8266/ESP32 mit einfachen, aber leistungsfähigen Konfigurationsdateien, die von ESPHome erstellt und verwaltet werden.
Native Integration des von ESPHome verwalteten Geräts (inklusive Dashboard) durch dessen native API und Sicherstellung, dass alle Daten synchronisiert werden (Live-Event-Handling, kein Daten-Polling ! :)

![Logo](./img/dashboard.png)

Dieser Adapter verwendet die [esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme) mit allen Credits an @Nafaya zur Interaktion mit der [ESPHome API](https://esphome.io/components/api.html?highlight=api)!

## Voraussetzungen

    * NodeJS >= 12.x
    * Python >= 3.6, <4.0
    * API wird in YAML aktiviert
    * Für Admin-Tabs (optional)
        * ESPHome Dashboard IP wird in den Instanzeinstellungen bereitgestellt

### API in YAML aktivieren
```
api:
  password: 'MyPassword'
```

### Beispielkonfiguration

```
esphome:
  name: sensor_badkamer
  platform: ESP32
  board: esp-wrover-kit

wifi:
  use_address: 192.168.10.122
  ssid: "xxxxx"
  password: "xxxxxx"
          
# Enable ESPHome API
api:
    password: 'MyPassword'
# Activate i2c bus  
i2c:
  sda: 21
  scl: 22
  scan: True
  id: bus_a
  
# Example configuration for bh1750
sensor:
  - platform: bh1750
    name: "Hal_Illuminance"
    address: 0x23
    measurement_time: 69
    update_interval: 10s
    
# Example configuration for an GPIO output    
output:
  - platform: gpio
    pin: 12
    inverted: true
    id: gpio_12
    
# Example configuration linking a switch to the previous defined output
switch:
  - platform: output
    name: "Generic Output"
    output: 'gpio_12'
    
```

Die Konfigurationsdateien "YAML" können auch manuell zum Dashboard hinzugefügt werden.

```
opt/iobroker/node_modules/iobroker.esphome/config/

```

Die Datei müssen unter diesem Pfad abgelegt werden.
