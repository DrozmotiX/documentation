---
order: 5
---

# Configuration Example

## Enable API

Please make sure that the API is activated! A password can optionally be defined.

```
api:
  password: 'MyPassword'
```

The adapter automatically detects devices managed by ESPHome and synchronizes their data with ioBroker [See ESPHome API refference](https://esphome.io/components/api.html?highlight=api)

## Example configuration
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

## ioBroker states

![ioBroker state Exaples](./img/stateexample.png)