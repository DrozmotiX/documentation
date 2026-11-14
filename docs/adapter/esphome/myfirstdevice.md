---
order: 4
---

# My First Device

If proper configured, see section [Adapter configuration](./adapterconfig.md), ESPHome Dashboard will be available.

<img src="./img/mainscreen.png" width="60%" height="60%" align="center">

## Add new device

1) Provide your basic settings  
   <img src="./img/addnewdevice.png" width="60%" height="60%" align="center">
   ::: tip Created configuration (>device<.yaml) files will be stored at
   ```/opt/iobroker/node_modules/iobroker.esphome/config/>device<.yaml```
   ::: 
2) Klick on compile  to create your binary  
   <img src="./img/addedfirstdevice.png" width="60%" height="60%" align="center">
   <img src="./img/compilenewdevice.png" width="60%" height="60%" align="center">
   
3) Download the binary and flash it to your ESP-Device  
   <img src="./img/adddevice.png" width="60%" height="60%" align="center">
   
For support setting up the yaml or connection issue please sse the ESPHome community, if all went well the device will be shown connected and you can continue your setup 

<img src="./img/adddevice.png" width="60%" height="60%" align="center">
   
::: tip Need some inspiration ?
Have a look at my [Example Configuration](./configexample.md) or see [ESPHome.io](https://esphome.io)
:::