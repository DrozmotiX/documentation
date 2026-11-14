---
order: 1
---

# First steps

[![NPM version](http://img.shields.io/npm/v/iobroker.esphome.svg)](https://www.npmjs.com/package/iobroker.esphome)
[![Downloads](https://img.shields.io/npm/dm/iobroker.esphome.svg)](https://www.npmjs.com/package/iobroker.esphome)
![Number of Installations (latest)](http://iobroker.live/badges/esphome-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/esphome-stable.svg)
[![Dependency Status](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)](https://david-dm.org/DrozmotiX/iobroker.esphome)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Known Vulnerabilities](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome)

[![NPM](https://nodei.co/npm/iobroker.esphome.png?downloads=true)](https://nodei.co/npm/iobroker.esphome/)

**Tests:** ![Test and Release](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to developers.** For more details and information on how to disable error reporting, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used from js-controller 3.0 onwards.

Control your ESP8266/ESP32 with simple but powerful configuration files created and managed by ESPHome.
Native integration of the ESPHome managed device (including dashboard) through its native API and ensure that all data is synchronized (live event handling, no data polling ! :)

![logo](./img/dashboard.png)

This adapter uses the [esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme) with all credits to @Nafaya to interact with the [ESPHome API](https://esphome.io/components/api.html?highlight=api)!

## Requirements

    * NodeJS >= 12.x
    * Python >= 3.6, <4.0
    * API is enabled in YAML
    * For admin tabs (optional)
        * ESPHome Dashboard IP is provided in instance settings.

### Enable API in YAML
```
api:
  password: 'MyPassword'
```

### Example configuration
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

::: tip Created configuration (>device<.yaml) files will be stored at
```/opt/iobroker/node_modules/iobroker.esphome/config/>device<.yaml```
::: 