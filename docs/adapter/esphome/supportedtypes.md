---
order: 2
---

# Supported types

### The adapter currently supports the following sensor types

| Type | Functionality | more information |
| - | - | - |
| BinarySensor | You can use different types of binary sensors. These are automatically displayed in ioBroker and have several configuration options. | [Binary Sensor Component](https://esphome.io/components/binary_sensor/index.html#binary-sensor-component) |
| Climate | ESPHome supports air conditioners. Air conditioners can represent different types of hardware, but the crucial factor is that air conditioners have an adjustable target temperature and can be switched to different modes such as HEAT, COOL, AUTO or OFF. | [Climate Component](https://esphome.io/components/climate/index.html) |
| Sensor | ESPHome supports many sensors. Each of them is a platform of the sensor domain, and each sensor has several basic configuration options. | [Sensor Component](https://esphome.io/components/sensor/index.html) |
| TextSensor | Text sensors are very similar to normal sensors. However, if the "normal" sensors only represent sensors that output numbers, this component can represent any text. | [Text Sensor Component](https://esphome.io/components/text_sensor/index.html) |
| Switch | The GPIO switch platform allows you to use any pin on your node as a switch. For example, you can connect a relay to a GPIO pin and use it through this platform. | [GPIO Switch](https://esphome.io/components/switch/gpio.html) |