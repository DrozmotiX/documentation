---
order: 3
---

# Adapter configuration

## ESPHome Dashboard

<img src="./img/dashboardsettings.png" width="80%" height="80%" align="center">

Here you can enable / disable the ESPHome dashboard hosted by ioBroker. A separate installation of ESPHome is not needed :-)

* enable / disable the ESPHome dashboard
* ESPHome Dashboard IP (For admin tabs optional)

### Admin tab

<img src="./img/dashboard.png" width="80%" height="80%" align="center">

  - If the tab is not visible, enable ESPHome-tab at the topper left corner !
  - IP Address must be provided in adapter settings

## Adding devices
ESPHome devices are automatically detected. If not, you can use the ADD Device button ...

<img src="./img/basicsettings.png" width="80%" height="80%" align="center">
  
### Discovery settings
* Reconnection interval
  Time in seconds The adapter tries to reconnect the devices if the connection is interrupted

* Default Password  
  Password used for autodiscovery

* Automatic detection enabled
  Uses MDNS to search for devices when the adapter starts up and new devices join the network.
  If the automatic detection fails, you can add the device manually using the ADD DEVICE button.

### Device overview
The online status shows whether there is an active connection to the device (s).
Any IP or password changes could be made with the pencil,

<img src="./img/devicetable.png" width="80%" height="80%" align="center">

### Adding devices manually
The ADD device button activates a popup,
This enables a connection to be established with the device by entering the IP address and password.

<img src="./img/adddevice.png" width="60%" height="60%" align="center">