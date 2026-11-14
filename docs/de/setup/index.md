# Mein persönliches Setup

**ioBroker** kann auf verschiedene Arten gehostet werden, jede davon hat ihre Vor- und Nachteile, was bedeutet, dass es keine "perfekte" Eins-zu-alle-Empfehlung gibt.  
Ich persönlich bevorzuge eine virtualisierte Umgebung, die mir alle **Flexibilität** bietet, die ich brauche, um ein **stabiles Produktionssystem** zu betreiben,  
die Freiheit, Updates und Patches **ohne Risiko** auszuprobieren und mehrere Anwendungen/Prozesse laufen zu lassen, **ohne sich gegenseitig zu beeinflussen**.


## [Bare Metal](./baremetal)
ioBroker wird direkt auf dem Betriebssystem installiert, ohne zusätzliche logische Schichten.

* Pro's
    * Ein recht einfaches Setup, wenn Sie das Betriebssystem (vorzugsweise Linux) bereits am Laufen haben
    * Außer dem Betriebssystem und ioBroker sind keine weiteren Kenntnisse zur Wartung des Systems erforderlich
* Nachteile
    * Nicht so flexibel wie die Visualisierung
    * Alle Prozesse und zusätzlichen Anwendungen laufen auf demselben System
    * Sicherheit, alle Anwendungen teilen sich denselben Host, falls eine angreifbar ist, sind alle Dienste/Anwendungen betroffen

## [Virtualisierung](./proxmoxlxc)
ioBroker wird innerhalb einer [virtuellen Maschine](./proxmoxvm), [LXC](./proxmoxlxc) oder [Docker](./docker) installiert und ist von seinem Host-Betriebssystem getrennt
* Pro's
    * Flexible Deployment-, Backup- und Snapshot-Mechanismen
    * ioBroker ist von allen anderen Prozessen außerhalb seiner Umgebung getrennt
    * Sicherheit, Probleme auf einer virtuellen Maschine (z.B. eine aus dem Internet erreichbare Website) haben keinen Einfluss auf andere Anwendungen/Prozesse
* Nachteile
    * Schwieriger einzurichten
