---
order: 7
---

# Flashen per USB

Das Flashen einer *.binary auf einen ESP-Chipsatz ist recht einfach, wenn Sie die richtigen Tools verwenden.
Es gibt mehrere Möglichkeiten, ich persönlich empfehle die Verwendung des esptool flasher.

## Linux
::: tip Offizieller Download und Anleitung
[espressif/esptool](https://github.com/espressif/esptool)
:::

## Mac
::: tip Verwenden Sie brew, um die Abhängigkeiten zu erhalten
[Brew holen und installieren](https://brew.sh)
Installieren Sie python ```brew install python``  
Installieren Sie esptool ```brew install esptool``  
Siehe für weitere Informationen [Homebrew Dokumentation](https://docs.brew.sh/Homebrew-and-Python)
:::

## Windows
::: tip esptool.exe ist im ESPEasy-Paket enthalten
Holen Sie es sich von [lets control it](https://github.com/letscontrolit/ESPEasy/files/5566286/esp32tool-initial-flashing.zip)  
Eine alternative recht gute Anleitung finden Sie bei [cyberblogspot](https://cyberblogspot.com/how-to-install-esptool-on-windows-10/)
:::

## Flash-Befehle
Der Befehl esptool.py flasht den Speicher eines ESP8266:

```esptool.py --port [serial-port-of-ESP8266] write_flash -fm dio -fs detect 0x00000 >nodemcu-firmware<.bin```

## ESP32-Bootloader
Für ESP32 müssen Sie das Flash löschen, das Binary UND den Bootloader laden!

::: tip
Ge die benötigten Dateien aus [lets control it](https://github.com/letscontrolit/ESPEasy/files/5566286/esp32tool-initial-flashing.zip)
:::

1) Löschen Sie das Flash
```
esptool.py--chip esp32 --port COM8 --baud 256000 --before default_reset --after hard_reset erase_flash
```

2) Flashen der Binärdatei
```
esptool.py --chip esp32 --port COM8 --baud 256000 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 80m --flash_size detect 0x10000 >binaryName<.bin
```

3) Flash-Bootloader und Partitionen
```
esptool.py --chip esp32 --port COM8 --baud 256000 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 80m --flash_size detect 0x8000 ./initial-images/partitions2.bin 0xe000 ./initial-images/boot_app0.bin 0x1000 ./initial-images/bootloader.bin
```

::: tip
Ersetzen Sie esptool.py durch die richtige ausführbare Datei, z.B. esptool.exe (Windows) oder esp32tool.py/exe bei Verwendung von [lets control it librarys](https://github.com/letscontrolit/ESPEasy/files/5566286/esp32tool-initial-flashing.zip)
:::
