---
order: 8
---

# YAML Vorlagen

Um euch den einstieg in ESPHome zu erleichtern findet ihr hier, mit grossen dank an fleissiegen Helfern, einige Beispiele fuer weit verbreitete geraete. 

::: danger Achtung
Es *extrem* wichtig die Einstellungen zu überprüfen, wenn man etwas in der eigentlichen YAML-Konfiguration vergisst, kann es leider passieren das man sich erst einmal vom Gerät ausschließt.
:::

## SECRETS.YAML

Die "SECRETS.YAML" ermöglicht es dir, oft genutzte Konfigurationen schnell und effizient zu hinterlegen.
Die meisten Einstellungen wiederholen sich für die meisten Module, z.B. WLAN SSID, WLAN Passwörter, API Zugang etc.
Darum sollten die wichtigsten Einstellungen direkt dort hinterlegt werden, so läuft man nicht direkt Gefahr etwas vergessen zu haben.

::: tip Kann ich die Einstellungen nicht auch in der YAML-Konfiguration direkt vornehmen?
Selbstverständlich! - ABER: Du musst dann in jeder Konfiguration die richtigen Einstellungen immer und immer wieder eintragen.  
Ist es nicht schöner einfach ein paar grundsätzliche Sachen schnell per Copy+Paste in der Konfiguration einzufügen?
:::

<details><summary> SECRETS.YAML Vorlage anzeigen
</summary>

::: danger
Folgende Punkte *SOLLTEN* auf jeden Fall in eurer SECRETS.YAML vor dem flashen zu finden sein:
:::

    # Over The Air
    ota_password: "esphomeota"          # Passwort um per "Over-the-Air" ein Update durchführen zu können
    
    # API Access
    api_password: "esphomeapi"              # Passwort zum aktivieren der ESPHome API, zur Steuerung z.b. über IOBroker, Logging etc.
    
    # WiFi
    wifi_ssid:        "SSID eures WLANs"                    # Damit verbinden sich eure ESP Home Devices beim Reboot
    wifi_password:    "PASSWORT eures WLANs"    # das Passwort gehört zur gewünschten SSID
    ip_gateway:       192.168.0.254                        # Falls ihr manuelle IPs vergeben wollt, können hier die grundlegenden
    ip_netmask:       255.255.255.0                           # Konfigurationen vorgenommen werden. Diese stehen dann in den Configs
    ip_dns_1:         8.8.8.8                                       # als Platzhalter zur Verfügung.
    ip_dns_2:         192.168.0.254                            
    ip_domain:        .local

::: tip OPTIONAL
In einigen der Vorlagen findet Ihr Informationen für die manuelle IP Vergabe.
An dieser Stelle wird eine kurze Übersicht gezeigt, wie man sich schnell und übersichtlich seine Geräte einpflegen kann.
Es müssen bei der Verwendung dann nur minimale Änderungen in der eigentlichen YAML-Konfiguration vorgenommen werden.
:::

    # Device-List Gosund SP1
    IP-Konfiguration            IP                     # Device-Name           Kommentar
    ip_gosund_sp1_1:      192.168.0.41   # Gosund_SP1_1      - Laserdrucker
    ip_gosund_sp1_2:      192.168.0.42   # Gosund_SP1_2      - 3D Drucker
    ip_gosund_sp1_3:      192.168.0.43   # Gosund_SP1_3      - Reserve #3
    ip_gosund_sp1_4:      192.168.0.44   # Gosund_SP1_4      - Reserve #4
    
    # Device-List Gosund SP112
    ip_gosund_sp112_1:    192.168.0.40   # Gosund_SP112_1    - PC/USV
    ip_gosund_sp112_2:    192.168.0.45   # Gosund_SP112_2    - Reserve
    
    # Device-List Blitzwolf SHP7
    ip_blitzwolf_shp7_1:  192.168.0.31   # Blitzwolf_SHP7_1  - Reserve
    ip_blitzwolf_shp7_2:  192.168.0.32   # Blitzwolf_SHP7_2  - Reserve

::: tip OPTIONAL
An erster Stelle ist der Platzhalter für die Konfiguration, dann folgt die manuelle IP-Zuweisung für das Gerät.
Zur Vereinfachung nutzen wir das # - Zeichen als Kommentar und tragen dort ggf. noch den Friendly-Name des Moduls sowie eine sinnvolle Bezeichnung ein.
:::

</details>

## FAQ

### api: 
Eine der wichtigsten Einstellungen überhaupt. Diese ermöglicht den Zugriff auf das Modul zur Steuerung, ohne diese interne Modul-API macht das ESPHome keinen Sinn.

### ota:  
Ebenfalls eine sehr wichtige Einstellung. Diese ermöglicht den Zugriff auf das Modul zum updaten "Over-The-Air (OTA)". Das Modul erlaubt das ändern der Konfiguration (Updates, neue Features etc.) über einen direkten Upload zum Modul.

### substitutions
device_id - Das ist die sogenannte "Unique-ID", ein einmaliges Erkennungszeichen für das Modul. Nur Kleinschreibung, keine Sonderzeichen (außer _ Unterstrich) !
device_name - Der Name der in diversen Kategorien erscheint (z.b. IoBroker). Nur Kleinschreibung, keine Sonderzeichen (außer _ Unterstrich)!
friendly_name - Der Name für das Modul zur schnellen Identifizierung - Hier ist Groß- und Kleinschreibung, sowie _ Unterstrich und - Minus erlaubt :-)

Unter Substitutions finden sich manchmal auch current_res und voltage_div?  
- current_res:  
  Die Faktor-Berechnung für den Stromverbrauch im Watt Bereich. Die Kalibrierung ist individuell für jedes Modul anzupassen. Die Werte weichen bei jedem Modul mitunter massiv ab, es gibt keine groben Richtwerte.
  Wenn eure Watt-Werte zu hoch sind, dann ist der Wert nach oben (!) zu korrigieren (Beispiel: 10 Watt werden genutzt, die Messung zeigt 15 Watt an, dann den Wert nach oben korrigieren)
  Wenn eure Watt-Werte zu niedrig sind, dann ist der Wert nach unten (!) zu korrigieren. (Beispiel: 10 Watt werden genutzt, die Messung zeigt 8 Watt an, dann den Wert nach unten korrigieren)

- voltage_div:
  Die Faktor-Berechnung für die Spannungmessung.
  Wenn eure Volt-Werte zu hoch sind, dann ist der Wert nach oben zu korrigieren (Beispiel: 226V an der Steckdose, die Messung zeigt 240V, dann den Wert nach unten korrigieren)
  Wenn eure Volt-Werte zu niedrig sind, dann ist der Wert nach unten zu korrigieren (Beispiel: 226V an der Steckdose, die Messung zeigt 220V, dann den Wert nach oben korrigieren)


::: tip Kalibrierung
Eine 100%-tige Kalibrierung ist sehr aufwendig und mit herkömmlichen Messgeräten kaum zu ermitteln. Dennoch lassen sich die Module auf einen relativ genauen Wert justieren.
Dazu einfach mit einem Wert anfangen (z.b. "current_res") und euer Modul per Upload neu flashen. Zur Ermittlung sollte man ein adequates Messgerät benutzen und ein Gerät was eine relativ konstante Leistung abgibt (z.b 60 Watt Glühbirne oder ähnliches).
Danach auf die gleiche Weise mit (z.b. "voltage_div") vorgehen.
Immer daran denken - es kann und wird im Leistungsbereich immer mal Abweichungen geben. Die Messungen erfolgen nicht in Echtzeit in den Modulen und es gibt immer Toleranzen in den Chips.
:::

::: warning ADVANCED USERS
Ein englisches Tutorial findet ihr unter:
Calibrate Power Source: https://frenck.dev/calibrating-an-esphome-flashed-power-plug/
:::

## BLITZWOLF

### SHP7
<details><summary> Vorlage anzeigen
</summary>

    ####
    #
    # Configuration File for BLITZWOLF SHP7 (Dual Plug)
    # - If you switch from Tasmota - check if you have HLW8012 in your template then this config can be used.
    #
    # Notices:
    # ========
    # - There are different versions of SP112 / SHP5, they differ with other GPIO-Pinouts and other sensor platforms!
    # - You have to create a "SECRETS.YAML" first (!) and VALIDATE (!) this configuration before uploading to plug!!!
    #
    # Useful Links:
    # ========
    # Calibrate Power Source: https://frenck.dev/calibrating-an-esphome-flashed-power-plug/
    # To finetune your wattage/voltage measurement, check the substitutions "current_res / voltage_div"
    #
    # Builddate: 14.04.2021 by X-R4Y
    #
    ####
    substitutions:
    device_id:      blitzwolf_shp7  # Device-ID Unique (only lowercase!)
    device_name:    blitzwolf_shp7  # Device-Type for Category (only lowercase!)
    friendly_name:  blitzwolf_shp7  # Device-Name for Channel (Lower-/Uppercase allowed)
    current_res:    '0.001906'        # Higher value gives lower watt readout (Default 0.001906)
    voltage_div:    '912'             # Lower value gives lower voltage readout (Default 912 ~ 226V)
    
    esphome:
    name: $device_name
    platform: ESP8266
    arduino_version: 2.5.1
    board: esp8285
    
    wifi:
    ssid:         !secret wifi_ssid
    password:     !secret wifi_password
    fast_connect: on                  # Useful if WIFI-SSID is hidden
    
    # Optional manual IP
    #  manual_ip:
    #    static_ip:  !secret ip_blitzwolf_shp7
    #    gateway:    !secret ip_gateway
    #    subnet:     !secret ip_netmask
    #    dns1:       !secret ip_dns_1
    domain:       !secret ip_domain
    
    # Enable fallback hotspot (captive portal) in case wifi connection fails
    #  ap:
    #    ssid: $device_name_Hotspot_Fallback
    #    password: "fallback"
    
    # Enable if you wish to have a minimalistic web-interface for your device
    #web_server:
    #  port: 80
    
    logger:
    baud_rate: 0
    
    api:
    password: !secret api_password
    
    ota:
    password: !secret ota_password
    
    sensor:
    - platform: hlw8012
      sel_pin:
      number: GPIO03
      inverted: true
      cf_pin: GPIO04
      cf1_pin: GPIO05
      current_resistor: ${current_res}
      voltage_divider: ${voltage_div}
    
      current:
      id: current
      name: ${friendly_name}_Current
      unit_of_measurement: 'A'
      accuracy_decimals: 3
    
      voltage:
      id: voltage
      name: ${friendly_name}_Voltage
      unit_of_measurement: 'V'
      accuracy_decimals: 1
    
      power:
      id: wattage
      name: ${friendly_name}_Power
      unit_of_measurement: W
      accuracy_decimals: 2
      filters:
      - lambda: return (x / 2.2);
      change_mode_every: 4
      update_interval: 10s
    
      energy:
      name: ${friendly_name}_Energy
      unit_of_measurement: "Wh"
    
    - platform: total_daily_energy
      power_id: wattage
      name: ${friendly_name}_Daily_Energy
      unit_of_measurement: kWh
      filters:
      # Multiplication factor from W to kW is 0.001
      - multiply: 0.001
    
    - platform: wifi_signal
      name: ${friendly_name}_WiFi_Information
      update_interval: 60s
    
    - platform: uptime
      id: uptime_sensor
      name: ${friendly_name}_Uptime_Information
      update_interval: 60s
      on_raw_value:
      then:
      - text_sensor.template.publish:
      id: uptime_readable
      state: !lambda |-
      int seconds = round(id(uptime_sensor).raw_state);
      int days = seconds / (24 * 3600);
      seconds = seconds % (24 * 3600);
      int hours = seconds / 3600;
      seconds = seconds % 3600;
      int minutes = seconds /  60;
      seconds = seconds % 60;
      return (
      (days ? String(days) + "d " : "") +
      (hours ? String(hours) + "h " : "") +
      (minutes ? String(minutes) + "m " : "") +
      (String(seconds) + "s")
      ).c_str();
    
    binary_sensor:
    - platform: gpio
      id: hw_button1
      name: hw_button1
      internal: true
      pin:
      number: GPIO0
      mode: INPUT_PULLUP
      inverted: true
      on_press:
      - switch.toggle: relay1
    
    - platform: gpio
      id: hw_button2
      name: hw_button2
      internal: true
      pin:
      number: GPIO12
      mode: INPUT_PULLUP
      inverted: true
      on_press:
      - switch.toggle: relay2
    
    output:
    - platform: esp8266_pwm
      id: red_led1
      pin:
      number: GPIO13
      inverted: true
    - platform: esp8266_pwm
      id: red_led2
      pin:
      number: GPIO2
      inverted: true
    
    switch:
    - platform: gpio
      pin: GPIO14
      id: relay1
      name: ${friendly_name}_Relay_1
      on_turn_on:
      - output.turn_on: red_led1
        on_turn_off:
      - output.turn_off: red_led1
    - platform: gpio
      pin: GPIO16
      id: relay2
      name: ${friendly_name}_Relay_2
      on_turn_on:
      - output.turn_on: red_led2
        on_turn_off:
      - output.turn_off: red_led2
    
    - platform: template
      id: relay_combined
      name: ${friendly_name}_Combined_Relay
      optimistic: true
      turn_off_action:
      - output.turn_off: red_led1
      - output.turn_off: red_led2
      - switch.turn_off: relay1
      - switch.turn_off: relay2
        turn_on_action:
      - output.turn_on: red_led1
      - output.turn_on: red_led2
      - switch.turn_on: relay1
      - switch.turn_on: relay2
    
    # ==============
    # !!! Notice !!!
    # ==============
    # If enabled, the Blue LED will flash while transmitting data (Power Measuring, Statusmessages and such stuff)
    # If disabled, you wont get any error flashings on the LED from the plug. (Default)
    # To enable the status LED feature put # in front of the following 4 lines
    #status_led:
    #  pin:
    #    number: GPIO01
    #    inverted: true
    
    # Enable time component to reset energy at midnight
    time:
    - platform: sntp                        # Uses NTP protocol for time information
      id: my_time                           # Uses my local time from compiling
    
    text_sensor:
    - platform: template
      name: ${friendly_name}_Uptime         # Enable Uptime-Sensor in readable format    
      id: uptime_readable
      icon: mdi:clock-start
    - platform: version
      name: ${friendly_name}_version        # Show module Version in structure
    - platform: wifi_info
      ip_address:
      name: ${friendly_name}_ip           # Show WIFI IP-address in structure
      ssid:
      name: ${friendly_name}_ssid         # Show WIFI SSID in structure
      bssid:
      name: ${friendly_name}_bssid        # Show WIFI BSSID in structure
</details>

## Gosund

### SP1
<details><summary> Vorlage anzeigen
</summary>

    ####
    #
    # Configuration File for GOSUND SP1
    # - If you switch from Tasmota - check if you have HLW8012 in your template then this config can be used.
    #
    # Notices:
    # ========
    # - There are different versions of SP1, they differ with other GPIO-Pinouts and other sensor platforms!
    # - You have to create a "SECRETS.YAML" first (!) and VALIDATE (!) this configuration before uploading to plug!!!
    #
    # Useful Links:
    # ========
    # Calibrate Power Source: https://frenck.dev/calibrating-an-esphome-flashed-power-plug/
    # To finetune your wattage/voltage measurement, check the substitutions "current_res / voltage_div"
    #
    # Builddate: 14.04.2021 by X-R4Y
    #
    ####
    substitutions:
    device_id:      gosund_sp1      # Device-ID Unique
    device_name:    gosund_sp1  # Device-Type for Category
    friendly_name:  gosund_sp1 # Device-Name for Channel
    current_res:    '0.001906'        # Higher value gives lower watt readout (Default 0.001906)
    voltage_div:    '960'             # Lower value gives lower voltage readout
    
    esphome:
    name: $device_name
    platform: ESP8266
    board: esp8285
    
    wifi:
    ssid:         !secret wifi_ssid
    password:     !secret wifi_password
    fast_connect: on
    
    # Optional manual IP
    #  manual_ip:
    #    static_ip:  !secret ip_gosund_sp1
    #    gateway:    !secret ip_gateway
    #    subnet:     !secret ip_netmask
    #    dns1:       !secret ip_dns_1
    domain:       !secret ip_domain
    
    # Enable fallback hotspot (captive portal) in case wifi connection fails
    #  ap:
    #    ssid: $device_name_Hotspot_Fallback
    #    password: "fallback"
    
    # Enable if you wish to have a minimalistic web-interface for your device
    #web_server:
    #  port: 80
    
    logger:
    # https://esphome.io/components/logger
    
    api:
    password: !secret api_password
    
    ota:
    password: !secret ota_password
    
    sensor:
    - platform: hlw8012
      # https://esphome.io/components/sensor/hlw8012.html
      # current, power, voltage can all use sensor options https://esphome.io/components/sensor/#config-sensor
      sel_pin:
      number: GPIO12
      inverted: True
      cf_pin: GPIO5
      cf1_pin: GPIO14
    
      current:
      name: ${friendly_name}_Current
      unit_of_measurement: A
      accuracy_decimals: 3
    
      power:
      name: ${friendly_name}_Power
      id: power_monitor_value
      unit_of_measurement: W
      accuracy_decimals: 2
      filters:
      - lambda: return (x / 2.2);
    
      voltage:
      name: ${friendly_name}_Voltage
      unit_of_measurement: V
      accuracy_decimals: 2
      current_resistor: $current_res
      voltage_divider: $voltage_div
      change_mode_every: 5            # default 8
      update_interval: 15s            # default 60s
    
      energy:
      name: ${friendly_name}_Energy
      unit_of_measurement: "Wh"
    
    - platform: total_daily_energy
      name: ${friendly_name}_Total_Daily_Energy
      power_id: power_monitor_value
      filters:
      - multiply: 0.001         # convert Wh to kWh
        unit_of_measurement: kWh
    
    - platform: wifi_signal
      name: ${friendly_name}_WiFi_Information
      update_interval: 60s
    
    - platform: uptime
      name: ${friendly_name}_Uptime_Information
      id: uptime_sensor
      update_interval: 60s
      on_raw_value:
      then:
      - text_sensor.template.publish:
      id: uptime_readable
      state: !lambda |-
      int seconds = round(id(uptime_sensor).raw_state);
      int days = seconds / (24 * 3600);
      seconds = seconds % (24 * 3600);
      int hours = seconds / 3600;
      seconds = seconds % 3600;
      int minutes = seconds /  60;
      seconds = seconds % 60;
      return (
      (days ? String(days) + "d " : "") +
      (hours ? String(hours) + "h " : "") +
      (minutes ? String(minutes) + "m " : "") +
      (String(seconds) + "s")
      ).c_str();
    
    binary_sensor:
    # Hardware Button at plug to turn on/off relay manually
    - platform: gpio
      pin:
      number: GPIO13
      id: button
      name: ${friendly_name}_Button
      on_press:
      - switch.toggle: relay_template
        internal: True
    
    output:
    # Hardware LEDs: Blue and Red, triggering on different states
    - platform: gpio
      id: red_led_output    # Status LED RED
      pin:
      number: GPIO0
      inverted: True
    
    - platform: gpio
      id: blue_led_output   # Status LED BLUE
      pin:
      number: GPIO2
      inverted: True
    
    switch:
    # Hardware Relay: Relay that triggers the output plug
    - platform: gpio
      pin: GPIO15
      id: relay
    
    - platform: template
      name: ${friendly_name}_Relay
      id: relay_template
      lambda: |-
      if (id(relay).state) {
      return true;
      } else {
      return false;
      }
      turn_on_action:
      - output.turn_on: blue_led_output   # Turns on blue LED while relay on
      - output.turn_off: red_led_output   # Turns off red LED while relay on
      - switch.turn_on: relay             # Turns relay on
        turn_off_action:
      - output.turn_off: blue_led_output  # Turns off blue LED while relay off
      - output.turn_on: red_led_output    # Turns on red LED while relay off
      - switch.turn_off: relay            # Turns relay off
    
    # ==============
    # !!! Notice !!!
    # ==============
    # If enabled, the Red LED will not light up while relay is in off-state!
    # To disable the status LED feature put # in front of the following 4 lines
    # If disabled, you wont get any error flashings on the LED from the plug.
    #status_led:
    #  pin:
    #    number: GPIO0                         # Default: RED GPIO0 / BLUE GPIO2
    #    inverted: true
    
    # Enable time component to reset energy at midnight
    time:
    - platform: sntp                        # Uses NTP protocol for time information
      id: my_time                           # Uses my local time from compiling
    
    text_sensor:
    - platform: template
      name: ${friendly_name}_Uptime         # Enable Uptime-Sensor in readable format    
      id: uptime_readable
      icon: mdi:clock-start
    - platform: version
      name: ${friendly_name}_version        # Show module Version in structure
    - platform: wifi_info
      ip_address:
      name: ${friendly_name}_ip           # Show WIFI IP-address in structure
      ssid:
      name: ${friendly_name}_ssid         # Show WIFI SSID in structure
      bssid:
      name: ${friendly_name}_bssid        # Show WIFI BSSID in structure
</details>

### SP111

<details><summary> Vorlage anzeigen
</summary>

    ####
    #
    # Configuration File for GOSUND SP111
    #
    # Notices:
    # ========
    # - You have to create a "SECRETS.YAML" first (!) and VALIDATE (!) this configuration before uploading to plug!!!
    #
    # Useful Links:
    # ========
    # Calibrate Power Source: https://frenck.dev/calibrating-an-esphome-flashed-power-plug/
    # To finetune your wattage/voltage measurement, check the substitutions "current_res / voltage_div"
    #
    # Builddate: 14.04.2021 by X-R4Y
    #
    ####
    substitutions:
    device_id:      gosund_sp111      # Device-ID Unique
    device_name:    gosund_sp111      # Device-Type for Category
    friendly_name:  gosund_sp111      # Device-Name for Channel
    current_res:    '0.0012'          # Higher value gives lower watt readout (Default 0.0012)
    voltage_div:    '777'             # Lower value gives lower voltage readout
    
    esphome:
    name: $device_name
    platform: ESP8266
    board: esp8285
    
    wifi:
    ssid:         !secret wifi_ssid
    password:     !secret wifi_password
    fast_connect: on
    
    # Optional manual IP
    #  manual_ip:
    #    static_ip:  !secret ip_gosund_sp1_1
    #    gateway:    !secret ip_gateway
    #    subnet:     !secret ip_netmask
    #    dns1:       !secret ip_dns_1
    domain:       !secret ip_domain
    
    # Enable fallback hotspot (captive portal) in case wifi connection fails
    #  ap:
    #    ssid: $device_name_Hotspot_Fallback
    #    password: "fallback"
    
    # Enable if you wish to have a minimalistic web-interface for your device
    #web_server:
    #  port: 80
    
    logger:
    # https://esphome.io/components/logger
    
    api:
    password: !secret api_password
    
    ota:
    password: !secret ota_password
    
    sensor:
    - platform: hlw8012
      # https://esphome.io/components/sensor/hlw8012.html
      # current, power, voltage can all use sensor options https://esphome.io/components/sensor/#config-sensor
      sel_pin:
      number: GPIO12
      inverted: True
      cf_pin: GPIO5
      cf1_pin: GPIO14
    
      current:
      name: ${friendly_name}_Current
      unit_of_measurement: A
      accuracy_decimals: 3
    
      power:
      name: ${friendly_name}_Power
      id: power_monitor_value
      unit_of_measurement: W
      accuracy_decimals: 2
    #      filters:
    #      - multiply: 0.5
          filters:
            - lambda: return (x / 2.2);
    
        voltage:
          name: ${friendly_name}_Voltage
          unit_of_measurement: V
          accuracy_decimals: 2
        current_resistor: $current_res
        voltage_divider: $voltage_div
        change_mode_every: 3            # default 10
        update_interval: 10s            # default 60s
    
        energy:
          name: ${friendly_name}_Energy
          unit_of_measurement: "Wh"
    
    - platform: total_daily_energy
      name: ${friendly_name}_Total_Daily_Energy
      power_id: power_monitor_value
      filters:
      - multiply: 0.001         # convert Wh to kWh
        unit_of_measurement: kWh
    
    - platform: wifi_signal
      name: ${friendly_name}_WiFi_Information
      update_interval: 60s
    
    - platform: uptime
      name: ${friendly_name}_Uptime_Information
      id: uptime_sensor
      update_interval: 60s
      on_raw_value:
      then:
      - text_sensor.template.publish:
      id: uptime_readable
      state: !lambda |-
      int seconds = round(id(uptime_sensor).raw_state);
      int days = seconds / (24 * 3600);
      seconds = seconds % (24 * 3600);
      int hours = seconds / 3600;
      seconds = seconds % 3600;
      int minutes = seconds /  60;
      seconds = seconds % 60;
      return (
      (days ? String(days) + "d " : "") +
      (hours ? String(hours) + "h " : "") +
      (minutes ? String(minutes) + "m " : "") +
      (String(seconds) + "s")
      ).c_str();
    
    binary_sensor:
    # Hardware Button at plug to turn on/off relay manually
    - platform: gpio
      pin:
      number: GPIO13
      inverted: true
      id: button
      name: ${friendly_name}_Button
      on_press:
      - switch.toggle: relay_template
        internal: True
    
    output:
    # Relay state led
    - platform: esp8266_pwm
      id: state_led
      pin:
      number: GPIO2
      inverted: true
    
    light:
    # Relay state light
    - platform: monochromatic
      output: state_led
      id: led
    
    switch:
    # Hardware Relay: Relay that triggers the output plug
    - platform: gpio
      pin: GPIO15
      id: relay
    
    - platform: template
      name: ${friendly_name}_Relay
      id: relay_template
      lambda: |-
      if (id(relay).state) {
      return true;
      } else {
      return false;
      }
      turn_on_action:
      - light.turn_on: led      # Turns on blue LED while relay on
      - switch.turn_on: relay   # Turns relay on
        turn_off_action:
      - light.turn_off: led     # Turns off blue LED while relay off
      - switch.turn_off: relay  # Turns relay off
    
    # ==============
    # !!! Notice !!!
    # ==============
    # To disable the status LED feature put # in front of the following 4 lines
    # If disabled, you wont get any error flashings on the LED from the plug.
    status_led:
    pin:
    number: GPIO0                         # Default: RED GPIO0 / BLUE GPIO2
    inverted: true
    
    # Enable time component to reset energy at midnight
    time:
    - platform: sntp                        # Uses NTP protocol for time information
      id: my_time                           # Uses my local time from compiling
    
    text_sensor:
    - platform: template
      name: ${friendly_name}_Uptime         # Enable Uptime-Sensor in readable format    
      id: uptime_readable
      icon: mdi:clock-start
    - platform: version
      name: ${friendly_name}_version        # Show module Version in structure
    - platform: wifi_info
      ip_address:
      name: ${friendly_name}_ip           # Show WIFI IP-address in structure
      ssid:
      name: ${friendly_name}_ssid         # Show WIFI SSID in structure
      bssid:
      name: ${friendly_name}_bssid        # Show WIFI BSSID in structure
</details>

### SP112 BL0937 

<details><summary> Vorlage anzeigen
</summary>

    ####
    #
    # Configuration File for GOSUND SP112 / BLITZWOLF SHP5
    # - If you switch from Tasmota - check if you have BL0937 on GPIO5, then this config can be used.
    #
    # Notices:
    # ========
    # - There are different versions of SP112 / SHP5, they differ with other GPIO-Pinouts and other sensor platforms!
    # - You have to create a "SECRETS.YAML" first (!) and VALIDATE (!) this configuration before uploading to plug!!!
    #
    # Useful Links:
    # ========
    # Calibrate Power Source: https://frenck.dev/calibrating-an-esphome-flashed-power-plug/
    #
    # Builddate: 14.04.2021 by X-R4Y
    #
    ####
    
    substitutions:
    device_id:      gosund_sp112  # Device-ID Unique (only lowercase!)
    device_name:    gosund_sp112  # Device-Type for Category (only lowercase!)
    friendly_name:  gosund_sp112  # Device-Name for Channel (Lower-/Uppercase allowed)
    
    esphome:
    name: $device_name
    platform: ESP8266
    arduino_version: 2.5.1
    board: esp01_1m
    
    wifi:
    ssid:         !secret wifi_ssid
    password:     !secret wifi_password
    fast_connect: on
    
    # Optional manual IP
    #  manual_ip:
    #    static_ip:  !secret ip_gosund_sp112_1
    #    gateway:    !secret ip_gateway
    #    subnet:     !secret ip_netmask
    #    dns1:       !secret ip_dns_1
    domain:       !secret ip_domain
    
    # Enable fallback hotspot (captive portal) in case wifi connection fails
    #  ap:
    #    ssid: $device_name_Hotspot_Fallback
    #    password: "fallback"
    
    # Enable if you wish to have a minimalistic web-interface for your device
    #web_server:
    #  port: 80
    
    api:
    password: !secret api_password
    
    ota:
    password: !secret ota_password
    
    logger:           # Reduce log level as otherwise logs would be flooded with analog sensor readings
    logs:
    sensor: ERROR # Options INFO / WARN / ERROR
    adc: ERROR    # Options INFO / WARN / ERROR
    
    sensor:
    - platform: adc
      id: button_adc
      pin: A0
      update_interval: .1s
    - platform: hlw8012
      sel_pin:
      number: GPIO12
      inverted: True
      cf_pin: GPIO05
      cf1_pin: GPIO04
      current:
      id: current
      name: ${friendly_name}_Current
      unit_of_measurement: A
      accuracy_decimals: 3
    
      voltage:
      id: voltage
      name: ${friendly_name}_Voltage
      unit_of_measurement: V
      accuracy_decimals: 1
    
      power:
      id: wattage
      name: ${friendly_name}_Power
      unit_of_measurement: W
      accuracy_decimals: 2
      filters:
      - lambda: return (x / 2.2);
    
    - platform: total_daily_energy
      power_id: wattage
      name: ${friendly_name}_Daily_Energy
      unit_of_measurement: kWh
      filters:
      # Multiplication factor from W to kW is 0.001
      - multiply: 0.001
    
    - platform: wifi_signal
      name: ${friendly_name}_WiFi_Information
      update_interval: 60s
    
    - platform: uptime
      id: uptime_sensor
      name: ${friendly_name}_Uptime_Information
      update_interval: 60s
      on_raw_value:
      then:
      - text_sensor.template.publish:
      id: uptime_readable
      state: !lambda |-
      int seconds = round(id(uptime_sensor).raw_state);
      int days = seconds / (24 * 3600);
      seconds = seconds % (24 * 3600);
      int hours = seconds / 3600;
      seconds = seconds % 3600;
      int minutes = seconds /  60;
      seconds = seconds % 60;
      return (
      (days ? String(days) + "d " : "") +
      (hours ? String(hours) + "h " : "") +
      (minutes ? String(minutes) + "m " : "") +
      (String(seconds) + "s")
      ).c_str();
    
    binary_sensor:
    - platform: template
      id: hardwarebutton
      # read analog sensor and convert it's value to binary state
      lambda: return (id(button_adc).state < .5);
      on_click:
      - min_length: 10ms        # short button press toggles mains (< 250ms)
        max_length: 250ms
        then:
        - switch.toggle: switch_voltage
      - min_length: 500ms       # long button press toggles USB (> 500ms up to 2 seconds)
        max_length: 2000ms
        then:
        - switch.toggle: switch_usb
    
    output:
    - platform: gpio
      id: red_led_output            # Red LED
      pin:
      number: GPIO00
      inverted: true
    
    - platform: gpio
      id: blue_led_output           # Blue LED
      pin:
      number: GPIO02
      inverted: true
    
    switch:
    - platform: gpio
      name: ${friendly_name}_Relay_Voltage
      id: switch_voltage
      pin: GPIO14
      #inverted: true               # Some devices need this to be enabled
      on_turn_on:
      output.turn_on: red_led_output
      on_turn_off:
      output.turn_off: red_led_output
    
    - platform: gpio
      name: ${friendly_name}_Relay_USB
      id: switch_usb
      pin: GPIO13
      inverted:  true
      on_turn_on:
      output.turn_on: blue_led_output
      on_turn_off:
      output.turn_off: blue_led_output
    
    # ==============
    # !!! Notice !!!
    # ==============
    # Enabled: the Red LED will not light up while relay is in off-state!
    # Disabled: you wont get any error flashings on the LED from the plug.
    # To disable the status LED feature put # in front of the following 4 lines
    status_led:
    pin:
    number: GPIO2                         # Default: RED GPIO0 / BLUE GPIO2
    inverted: true
    
    # Enable time component to reset energy at midnight
    time:
    - platform: sntp                        # Uses NTP protocol for time information
      id: my_time                           # Uses my local time from compiling
    
    text_sensor:
    - platform: template
      name: ${friendly_name}_Uptime         # Enable Uptime-Sensor in readable format    
      id: uptime_readable
      icon: mdi:clock-start
    - platform: version
      name: ${friendly_name}_version        # Show module Version in structure
    - platform: wifi_info
      ip_address:
      name: ${friendly_name}_ip           # Show WIFI IP-address in structure
      ssid:
      name: ${friendly_name}_ssid         # Show WIFI SSID in structure
      bssid:
      name: ${friendly_name}_bssid        # Show WIFI BSSID in structure
</details>

### SP112 CSE7766

<details><summary> Vorlage anzeigen
</summary>

    ####
    #
    # Configuration File for GOSUND SP112 / BLITZWOLF SHP5
    # - If you switch from Tasmota - check if you have CSE7766 in your template then this config can be used.
    #
    # Notices:
    # ========
    # - There are different versions of SP112 / SHP5, they differ with other GPIO-Pinouts and other sensor platforms!
    # - You have to create a "SECRETS.YAML" first (!) and VALIDATE (!) this configuration before uploading to plug!!!
    #
    # Useful Links:
    # ========
    # Calibrate Power Source: https://frenck.dev/calibrating-an-esphome-flashed-power-plug/
    #
    # Builddate: 14.04.2021 by X-R4Y
    #
    ####
    
    substitutions:
    device_id:      gosund_sp112    # Device-ID Unique (only lowercase)
    device_name:    gosund_sp112    # Device-Type for Category (only lowercase!)
    friendly_name:  gosund_sp112    # Device-Name for Channel (Lower-/Uppercase allowed)
    
    esphome:
    name: $device_name
    platform: ESP8266
    board: esp8285
    
    wifi:
    ssid:         !secret wifi_ssid
    password:     !secret wifi_password
    fast_connect: on
    
    # Optional manual IP
    #  manual_ip:
    #    static_ip:  !secret ip_gosund_sp112_1
    #    gateway:    !secret ip_gateway
    #    subnet:     !secret ip_netmask
    #    dns1:       !secret ip_dns_1
    domain:       !secret ip_domain
    
    # Enable fallback hotspot (captive portal) in case wifi connection fails
    #  ap:
    #    ssid: $device_name_Hotspot_Fallback
    #    password: "fallback"
    
    # Enable if you wish to have a minimalistic web-interface for your device
    #web_server:
    #  port: 80
    
    api:
    password: !secret api_password
    
    ota:
    password: !secret ota_password
    
    logger:           # Reduce log level as otherwise logs would be flooded with analog sensor readings
    logs:
    sensor: ERROR # Options INFO / WARN / ERROR
    adc: ERROR    # Options INFO / WARN / ERROR
    
    uart:
    rx_pin: RX
    baud_rate: 4800
    
    sensor:
    - platform: cse7766
      current:
      id: current
      name: ${friendly_name}_Current
      unit_of_measurement: A
      accuracy_decimals: 3
    
      voltage:
      id: voltage
      name: ${friendly_name}_Voltage
      unit_of_measurement: V
      accuracy_decimals: 1
    
      power:
      id: wattage
      name: ${friendly_name}_Power
      unit_of_measurement: W
      accuracy_decimals: 2
      filters:
      - lambda: return (x / 2.2);
    
    - platform: total_daily_energy
      power_id: wattage
      name: ${friendly_name}_Daily_Energy
      unit_of_measurement: kWh
      filters:
      # Multiplication factor from W to kW is 0.001
      - multiply: 0.001
    
    - platform: wifi_signal
      name: ${friendly_name}_WiFi_Information
      update_interval: 60s
    
    - platform: uptime
      id: uptime_sensor
      name: ${friendly_name}_Uptime_Information
      update_interval: 60s
      on_raw_value:
      then:
      - text_sensor.template.publish:
      id: uptime_readable
      state: !lambda |-
      int seconds = round(id(uptime_sensor).raw_state);
      int days = seconds / (24 * 3600);
      seconds = seconds % (24 * 3600);
      int hours = seconds / 3600;
      seconds = seconds % 3600;
      int minutes = seconds /  60;
      seconds = seconds % 60;
      return (
      (days ? String(days) + "d " : "") +
      (hours ? String(hours) + "h " : "") +
      (minutes ? String(minutes) + "m " : "") +
      (String(seconds) + "s")
      ).c_str();
    
    binary_sensor:
    # Binary sensor for the hardware button press
    - platform: gpio
      name: ${friendly_name}_button
      id: relay
      pin:
      number: GPIO16
      inverted: true
      internal: True
      on_press:
      - switch.toggle: switch_usb
      - switch.toggle: switch_voltage
    
    output:
    - platform: gpio
      id: red_led_output            # Red LED
      pin:
      number: GPIO00
      inverted: true
    
    - platform: gpio
      id: blue_led_output           # Blue LED
      pin:
      number: GPIO02
      inverted: true
    
    switch:
    - platform: gpio
      name: ${friendly_name}_Relay_Voltage
      id: switch_voltage
      pin:
      number: GPIO14
    #    inverted: true
    on_turn_on:
    output.turn_on: red_led_output
    on_turn_off:
    output.turn_off: red_led_output
    
    - platform: gpio
      name: ${friendly_name}_Relay_USB
      id: switch_usb
      pin: GPIO5
      #inverted:  true
      on_turn_on:
      output.turn_on: blue_led_output
      on_turn_off:
      output.turn_off: blue_led_output
    
    # ==============
    # !!! Notice !!!
    # ==============
    # Enabled: the Red LED will not light up while relay is in off-state!
    # Disabled: you wont get any error flashings on the LED from the plug.
    # To disable the status LED feature put # in front of the following 4 lines
    status_led:
    pin:
    number: GPIO2                         # Default: RED GPIO0 / BLUE GPIO2
    inverted: true
    
    # Enable time component to reset energy at midnight
    time:
    - platform: sntp                        # Uses NTP protocol for time information
      id: my_time                           # Uses my local time from compiling
    
    text_sensor:
    - platform: template
      name: ${friendly_name}_Uptime         # Enable Uptime-Sensor in readable format    
      id: uptime_readable
      icon: mdi:clock-start
    - platform: version
      name: ${friendly_name}_version        # Show module Version in structure
    - platform: wifi_info
      ip_address:
      name: ${friendly_name}_ip           # Show WIFI IP-address in structure
      ssid:
      name: ${friendly_name}_ssid         # Show WIFI SSID in structure
      bssid:
      name: ${friendly_name}_bssid        # Show WIFI BSSID in structure
</details>

## Teckin 

### SP10

<details><summary> Vorlage anzeigen
</summary>

    ####
    #
    # Configuration File for TECKIN-SP10
    #
    # Notices:
    # ========
    # - You have to create a "SECRETS.YAML" first (!) and VALIDATE (!) this configuration before uploading to plug!!!
    #
    # Builddate: 14.04.2021 by X-R4Y
    #
    ####
    substitutions:
    device_id:      teckin_sp10   # Device-ID Unique
    device_name:    teckin_sp10   # Device-Type for Category
    friendly_name:  teckin_sp10   # Device-Name for Channel
    
    esphome:
    name: $device_name
    platform: ESP8266
    board: esp01_1m
    esp8266_restore_from_flash: true
    
    wifi:
    ssid:         !secret wifi_ssid
    password:     !secret wifi_password
    fast_connect: on
    
    # Optional manual IP
    #  manual_ip:
    #    static_ip:  !secret ip_gosund_sp1
    #    gateway:    !secret ip_gateway
    #    subnet:     !secret ip_netmask
    #    dns1:       !secret ip_dns_1
    domain:       !secret ip_domain
    
    # Enable fallback hotspot (captive portal) in case wifi connection fails
    #  ap:
    #    ssid: $device_name_Hotspot_Fallback
    #    password: "fallback"
    
    # Enable if you wish to have a minimalistic web-interface for your device
    #web_server:
    #  port: 80
    
    logger:
    # https://esphome.io/components/logger
    
    api:
    password: !secret api_password
    
    ota:
    password: !secret ota_password
    
    sensor:
    - platform: wifi_signal
      name: ${friendly_name}_WiFi_Information
      update_interval: 60s
    
    - platform: uptime
      name: ${friendly_name}_Uptime_Information
      id: uptime_sensor
      update_interval: 60s
      on_raw_value:
      then:
      - text_sensor.template.publish:
      id: uptime_readable
      state: !lambda |-
      int seconds = round(id(uptime_sensor).raw_state);
      int days = seconds / (24 * 3600);
      seconds = seconds % (24 * 3600);
      int hours = seconds / 3600;
      seconds = seconds % 3600;
      int minutes = seconds /  60;
      seconds = seconds % 60;
      return (
      (days ? String(days) + "d " : "") +
      (hours ? String(hours) + "h " : "") +
      (minutes ? String(minutes) + "m " : "") +
      (String(seconds) + "s")
      ).c_str();
    
    binary_sensor:
    # Hardware Button at plug to turn on/off relay manually
    - platform: gpio
      pin:
      number: GPIO13
      id: button
      name: ${friendly_name}_Button
      on_press:
      - switch.toggle: relay_template
        internal: True
    
    output:
    # https://esphome.io/components/output/esp8266_pwm.html
    - platform: esp8266_pwm
      id: blue_led_output
      pin:
      number: GPIO2
      inverted: True
    
    light:
    # https://esphome.io/components/light/monochromatic.html
    - platform: monochromatic
      name: blue_led
      output: blue_led_output
      id: blue_led
      default_transition_length: 1ms # default 1s
      internal: True
    
    switch:
    # Hardware Relay: Relay that triggers the output plug
    - platform: gpio
      pin: GPIO15
      id: relay
    
    - platform: template
      name: ${friendly_name}_Relay
      id: relay_template
      lambda: |-
      if (id(relay).state) {
      return true;
      } else {
      return false;
      }
      turn_on_action:
      - light.turn_on: blue_led   # Turns on blue LED while relay on
      - switch.turn_on: relay     # Turns relay on
        turn_off_action:
      - light.turn_off: blue_led  # Turns off blue LED while relay off
      - switch.turn_off: relay    # Turns relay off
    
    # ==============
    # !!! Notice !!!
    # ==============
    # If enabled, the Red LED will not light up while relay is in off-state!
    # To disable the status LED feature put # in front of the following 4 lines
    # If disabled, you wont get any error flashings on the LED from the plug.
    status_led:
    pin:
    number: GPIO0                         # Default: RED GPIO0 / BLUE GPIO2
    inverted: true
    
    text_sensor:
    - platform: template
      name: ${friendly_name}_Uptime         # Enable Uptime-Sensor in readable format    
      id: uptime_readable
      icon: mdi:clock-start
    - platform: version
      name: ${friendly_name}_version        # Show module Version in structure
    - platform: wifi_info
      ip_address:
      name: ${friendly_name}_ip           # Show WIFI IP-address in structure
      ssid:
      name: ${friendly_name}_ssid         # Show WIFI SSID in structure
      bssid:
      name: ${friendly_name}_bssid        # Show WIFI BSSID in structure
</details>

### SP20

<details><summary> Vorlage anzeigen
</summary>

    ####
    #
    # Configuration File for TECKIN-SP20
    # - If you switch from Tasmota - check if you have HLW8012 in your template then this config can be used.
    #
    # Notices:
    # ========
    # - You have to create a "SECRETS.YAML" first (!) and VALIDATE (!) this configuration before uploading to plug!!!
    #
    # Useful Links:
    # ========
    # Calibrate Power Source: https://frenck.dev/calibrating-an-esphome-flashed-power-plug/
    # To finetune your wattage/voltage measurement, check the substitutions "current_res / voltage_div"
    #
    # Builddate: 14.04.2021 by X-R4Y
    #
    ####
    substitutions:
    device_id:      teckin_sp20       # Device-ID Unique
    device_name:    teckin_sp20       # Device-Type for Category
    friendly_name:  Teckin_SP20       # Device-Name for Channel
    current_res:    '0.001906'        # Higher value gives lower watt readout (Default 0.001906)
    voltage_div:    '950'             # Lower value gives lower voltage readout
    
    esphome:
    name: $device_name
    platform: ESP8266
    board: esp01_1m
    esp8266_restore_from_flash: true
    
    wifi:
    ssid:         !secret wifi_ssid
    password:     !secret wifi_password
    fast_connect: on
    
    # Optional manual IP
    #  manual_ip:
    #    static_ip:  !secret ip_gosund_sp1_1
    #    gateway:    !secret ip_gateway
    #    subnet:     !secret ip_netmask
    #    dns1:       !secret ip_dns_1
    domain:       !secret ip_domain
    
    # Enable fallback hotspot (captive portal) in case wifi connection fails
    #  ap:
    #    ssid: $device_name_Hotspot_Fallback
    #    password: "fallback"
    
    # Enable if you wish to have a minimalistic web-interface for your device
    #web_server:
    #  port: 80
    
    logger:
    # https://esphome.io/components/logger
    
    api:
    password: !secret api_password
    
    ota:
    password: !secret ota_password
    
    sensor:
    - platform: hlw8012
      # https://esphome.io/components/sensor/hlw8012.html
      # current, power, voltage can all use sensor options https://esphome.io/components/sensor/#config-sensor
      sel_pin:
      number: GPIO12
      inverted: True
      cf_pin: GPIO5
      cf1_pin: GPIO14
    
      current:
      name: ${friendly_name}_Current
      unit_of_measurement: A
      accuracy_decimals: 3
    
      power:
      name: ${friendly_name}_Power
      id: power_monitor_value
      unit_of_measurement: W
      accuracy_decimals: 2
      filters:
      - lambda: return (x / 2.2);
    
      voltage:
      name: ${friendly_name}_Voltage
      unit_of_measurement: V
      accuracy_decimals: 2
      current_resistor: $current_res
      voltage_divider: $voltage_div
      change_mode_every: 5            # default 8
      update_interval: 15s            # default 60s
    
      energy:
      name: ${friendly_name}_Energy
      unit_of_measurement: "Wh"
    
    - platform: total_daily_energy
      name: ${friendly_name}_Total_Daily_Energy
      power_id: power_monitor_value
      filters:
      - multiply: 0.001         # convert Wh to kWh
        unit_of_measurement: kWh
    
    - platform: wifi_signal
      name: ${friendly_name}_WiFi_Information
      update_interval: 60s
    
    - platform: uptime
      name: ${friendly_name}_Uptime_Information
      id: uptime_sensor
      update_interval: 60s
      on_raw_value:
      then:
      - text_sensor.template.publish:
      id: uptime_readable
      state: !lambda |-
      int seconds = round(id(uptime_sensor).raw_state);
      int days = seconds / (24 * 3600);
      seconds = seconds % (24 * 3600);
      int hours = seconds / 3600;
      seconds = seconds % 3600;
      int minutes = seconds /  60;
      seconds = seconds % 60;
      return (
      (days ? String(days) + "d " : "") +
      (hours ? String(hours) + "h " : "") +
      (minutes ? String(minutes) + "m " : "") +
      (String(seconds) + "s")
      ).c_str();
    
    binary_sensor:
    # Hardware Button at plug to turn on/off relay manually
    - platform: gpio
      pin:
      number: GPIO13
      id: button
      name: ${friendly_name}_Button
      on_press:
      - switch.toggle: relay_template
        internal: True
    
    output:
    # Hardware LEDs: Blue and Red, triggering on different states
    - platform: gpio
      id: red_led_output    # Status LED RED
      pin:
      number: GPIO0
      inverted: True
    
    - platform: gpio
      id: blue_led_output   # Status LED BLUE
      pin:
      number: GPIO2
      inverted: True
    
    switch:
    # Hardware Relay: Relay that triggers the output plug
    - platform: gpio
      pin: GPIO4
      id: relay
    
    - platform: template
      name: ${friendly_name}_Relay
      id: relay_template
      lambda: |-
      if (id(relay).state) {
      return true;
      } else {
      return false;
      }
      turn_on_action:
      - output.turn_on: blue_led_output   # Turns on blue LED while relay on
      - output.turn_off: red_led_output   # Turns off red LED while relay on
      - switch.turn_on: relay             # Turns relay on
        turn_off_action:
      - output.turn_off: blue_led_output  # Turns off blue LED while relay off
      - output.turn_on: red_led_output    # Turns on red LED while relay off
      - switch.turn_off: relay            # Turns relay off
    
    # ==============
    # !!! Notice !!!
    # ==============
    # If enabled, the Red LED will not light up while relay is in off-state!
    # To disable the status LED feature put # in front of the following 4 lines
    # If disabled, you wont get any error flashings on the LED from the plug.
    #status_led:
    #  pin:
    #    number: GPIO0                         # Default: RED GPIO0 / BLUE GPIO2
    #    inverted: true
    
    # Enable time component to reset energy at midnight
    time:
    - platform: sntp                        # Uses NTP protocol for time information
      id: my_time                           # Uses my local time from compiling
    
    text_sensor:
    - platform: template
      name: ${friendly_name}_Uptime         # Enable Uptime-Sensor in readable format    
      id: uptime_readable
      icon: mdi:clock-start
    - platform: version
      name: ${friendly_name}_version        # Show module Version in structure
    - platform: wifi_info
      ip_address:
      name: ${friendly_name}_ip           # Show WIFI IP-address in structure
      ssid:
      name: ${friendly_name}_ssid         # Show WIFI SSID in structure
      bssid:
      name: ${friendly_name}_bssid        # Show WIFI BSSID in structure
</details>

## Sonoff

>ToDo<

## Shelly

>ToDo<

## Vansware

### VANSWARE Plug (with LED Ring)
<details><summary> Vorlage anzeigen
</summary>

    ####
    #
    # Configuration File for VANSWARE Plug (with LED Ring)
    # - If you switch from Tasmota - check if you have BL0937 on GPIO5, then this config can be used.
    #
    # Notices:
    # ========
    # - You have to create a "SECRETS.YAML" first (!) and VALIDATE (!) this configuration before uploading to plug!!!
    #
    # Useful Links:
    # ========
    # Calibrate Power Source: https://frenck.dev/calibrating-an-esphome-flashed-power-plug/
    #
    # Builddate: 15.04.2021 by X-R4Y (alias V!P3R_76 @ Discord)
    #
    ####
    
    substitutions:
    device_id:      vansware    # Device-ID Unique (only lowercase!)
    device_name:    vansware    # Device-Type for Category (only lowercase!)
    friendly_name:  vansware    # Device-Name for Channel (Lower-/Uppercase allowed)
    current_res:    '0.001906'  # Higher value gives lower watt readout (Default 0.001906)
    voltage_div:    '912'       # Lower value gives lower voltage readout (Default 912 ~ 226V)
    
    esphome:
    name: $device_name
    platform: ESP8266
    arduino_version: 2.5.1
    board: esp8285
    
    wifi:
    ssid:         !secret wifi_ssid
    password:     !secret wifi_password
    fast_connect: on
    
    # Optional manual IP
    #  manual_ip:
    #    static_ip:  !secret ip_vansware
    #    gateway:    !secret ip_gateway
    #    subnet:     !secret ip_netmask
    #    dns1:       !secret ip_dns_1
    domain:       !secret ip_domain
    
    # Enable fallback hotspot (captive portal) in case wifi connection fails
    #  ap:
    #    ssid: $device_name_Hotspot_Fallback
    #    password: "fallback"
    
    # Enable if you wish to have a minimalistic web-interface for your device
    web_server:
    port: 80
    
    api:
    password: !secret api_password
    
    ota:
    password: !secret ota_password
    
    logger:           # Reduce log level as otherwise logs would be flooded with analog sensor readings
    logs:
    sensor: ERROR # Options INFO / WARN / ERROR
    adc: ERROR    # Options INFO / WARN / ERROR
    
    sensor:
    - platform: hlw8012
      # https://esphome.io/components/sensor/hlw8012.html
      # current, power, voltage can all use sensor options https://esphome.io/components/sensor/#config-sensor
      sel_pin:
      number: GPIO12
      inverted: True
      cf_pin: GPIO5
      cf1_pin: GPIO14
    
      current:
      name: ${friendly_name}_Current
      unit_of_measurement: A
      accuracy_decimals: 3
    
      power:
      name: ${friendly_name}_Power
      id: power_monitor_value
      unit_of_measurement: W
      accuracy_decimals: 2
      filters:
      - lambda: return (x / 2.2);
    
      voltage:
      name: ${friendly_name}_Voltage
      unit_of_measurement: V
      accuracy_decimals: 2
      current_resistor: $current_res  # default 0.001
      voltage_divider: $voltage_div   # default 2351
      change_mode_every: 3            # default 8
      update_interval: 10s            # default 60s
    
      energy:
      name: ${friendly_name}_Energy
      unit_of_measurement: "Wh"
    
    - platform: total_daily_energy
      name: ${friendly_name}_Total_Daily_Energy
      power_id: power_monitor_value
      filters:
      - multiply: 0.001         # convert Wh to kWh
        unit_of_measurement: kWh
    
    - platform: wifi_signal
      name: ${friendly_name}_WiFi_Information
      update_interval: 60s
    
    - platform: uptime
      name: ${friendly_name}_Uptime_Information
      id: uptime_sensor
      update_interval: 60s
      on_raw_value:
      then:
      - text_sensor.template.publish:
      id: uptime_readable
      state: !lambda |-
      int seconds = round(id(uptime_sensor).raw_state);
      int days = seconds / (24 * 3600);
      seconds = seconds % (24 * 3600);
      int hours = seconds / 3600;
      seconds = seconds % 3600;
      int minutes = seconds /  60;
      seconds = seconds % 60;
      return (
      (days ? String(days) + "d " : "") +
      (hours ? String(hours) + "h " : "") +
      (minutes ? String(minutes) + "m " : "") +
      (String(seconds) + "s")
      ).c_str();
    
    binary_sensor:
    # Hardware Button at plug to turn on/off relay manually
    - platform: gpio
      pin:
      number: GPIO13
      id: button
      name: ${friendly_name}_Button
      on_press:
      - switch.toggle: relay_template
        internal: True
    
    output:
    # Hardware LEDs: Blue and Red, triggering on different states
    - platform: esp8266_pwm
      id: red_led
      pin:
      number: GPIO0
      inverted: true
    - platform: esp8266_pwm
      id: green_led
      pin:
      number: GPIO4
      inverted: true
    - platform: esp8266_pwm
      id: blue_led
      pin:
      number: GPIO2
      inverted: true
    
    light:
    - platform: monochromatic
      id: light1
      output: red_led
      name: ${friendly_name}_LED1_Red
    - platform: monochromatic
      id: light2
      output: green_led
      name: ${friendly_name}_LED2_Green
    - platform: monochromatic
      id: light3
      output: blue_led
      name: ${friendly_name}_LED3_Blue
    
    switch:
    # Hardware Relay: Relay that triggers the output plug
    - platform: gpio
      pin: GPIO15
      id: relay
    
    - platform: template
      name: ${friendly_name}_Relay
      id: relay_template
      lambda: |-
      if (id(relay).state) {
      return true;
      } else {
      return false;
      }
      turn_on_action:
      - output.turn_on: red_led           # Turns on blue LED while relay on
      - output.turn_off: green_led        # Turns off red LED while relay on
      - switch.turn_on: relay             # Turns relay on
        turn_off_action:
      - output.turn_off: red_led          # Turns off blue LED while relay off
      - output.turn_on: green_led         # Turns on red LED while relay off
      - switch.turn_off: relay            # Turns relay off
    
    # ==============
    # !!! Notice !!!
    # ==============
    # To disable the status LED feature put # in front of the following 4 lines
    # If disabled, you wont get any error flashings on the LED from the plug.
    status_led:
    pin:
    number: GPIO2                         # Default: RED GPIO0 / GREEN GPIO4 / BLUE GPIO2
    inverted: true
    
    # Enable time component to reset energy at midnight
    time:
    - platform: sntp                        # Uses NTP protocol for time information
      id: my_time                           # Uses my local time from compiling
    
    text_sensor:
    - platform: template
      name: ${friendly_name}_Uptime         # Enable Uptime-Sensor in readable format    
      id: uptime_readable
      icon: mdi:clock-start
    - platform: version
      name: ${friendly_name}_version        # Show module Version in structure
    - platform: wifi_info
      ip_address:
      name: ${friendly_name}_ip           # Show WIFI IP-address in structure
      ssid:
      name: ${friendly_name}_ssid         # Show WIFI SSID in structure
      bssid:
      name: ${friendly_name}_bssid        # Show WIFI BSSID in structure
</details>

>ToDo<