---
order: 7
---

# Flash by USB

Flashing an *.bin binary to an ESP-Chipset is quite simple, if you use the proper tools.
There are several ways how to do it, personally  recommend using the esptool flasher.

## Linux
::: tip Official download and Instruction
[espressif/esptool](https://github.com/espressif/esptool)
:::

## Mac
::: tip Use brew to get the dependencies
[Get and install  Brew](https://brew.sh)
Install python ```brew install python```  
Install esptool ```brew install esptool```  
See for more information [Homebrew documentation](https://docs.brew.sh/Homebrew-and-Python)
:::

## Windows
::: tip esptool.exe is included in the ESPEasy package
Get it from [lets control it](https://github.com/letscontrolit/ESPEasy/files/5566286/esp32tool-initial-flashing.zip)  
An alternative quite good instruction can be found at [cyberblogspot](https://cyberblogspot.com/how-to-install-esptool-on-windows-10/)
:::

## Flash commands
The esptool.py command flash memory of an ESP8266:

```esptool.py --port [serial-port-of-ESP8266] write_flash -fm dio -fs detect 0x00000 >nodemcu-firmware<.bin```

## ESP32 bootloader
For ESP32 you need to erase the flash, load the binary AND bootloader!

::: tip
Ge the required files from [lets control it](https://github.com/letscontrolit/ESPEasy/files/5566286/esp32tool-initial-flashing.zip)
:::

1) Erase the flash  
```
esptool.py--chip esp32 --port COM8 --baud 256000 --before default_reset --after hard_reset erase_flash
```

2) Flash the binary
```
esptool.py --chip esp32 --port COM8 --baud 256000 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 80m --flash_size detect 0x10000 >binaryName<.bin
```

3) Flash bootloader and partitions
```
esptool.py --chip esp32 --port COM8 --baud 256000 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 80m --flash_size detect 0x8000 ./initial-images/partitions2.bin 0xe000 ./initial-images/boot_app0.bin 0x1000 ./initial-images/bootloader.bin
```

::: tip
Replace esptool.py with the proper executable, like esptool.exe (Windows) or esp32tool.py/exe when using [lets control it librarys](https://github.com/letscontrolit/ESPEasy/files/5566286/esp32tool-initial-flashing.zip) 
:::