---
order: 6
---

# ioBroker

ioBroker is an integration platform for the [Internet of Things](http://en.wikipedia.org/wiki/Internet_of_Things),
focused on Building Automation, Smart Metering, Ambient Assisted Living, Process Automation, Visualization and
Data Logging. It like a software f.e. [fhem](http://fhem.de), [OpenHAB](http://www.openhab.org/) or
[the thing system](http://thethingsystem.com/).

## Concept

ioBroker is not just an application, it's more of a a concept, a database schema, and offers a very easy way for systems
to inter-operate. ioBroker defines some common rules for a pair of databases used to exchange data and publish events
between different systems.

![architecture](./img/architecture.png)

### Databases

ioBroker uses "in memory" database to hold the data and saves it on disk with reasonable intervals. There are two types of
storage:
- states (values)
- objects (meta/configuration information)

::: tip
States can be stored in "in memory" or in redis. Objects can be stored only in "in memory" DB.
:::

[Redis](http://redis.io/) is an in-memory key-value data store and also a message broker with publish/subscribe pattern.
It's used to maintain and publish all states of connected systems.

### Adapters

Systems are attached to ioBrokers databases via so called adapters, technically processes running anywhere
in the network and connecting all kinds of systems to ioBrokers databases. A connection to ioBrokers databases can be
implemented in nearly any programming language on nearly any platform and an adapter can run on any host that is able to
reach the databases via ip networking.

A library module for fast and comfortable adapter development exists for Javascript/Node.js until now. Libraries for
adapter development in other languages are planned (python, java, perl, ...).

::: tip
See actual list of adapters on [iobroker.net](http://iobroker.net/#en/adapters)
:::
### Security

ioBroker is designed to be accessed by trusted adapters inside trusted networks. This means that usually it is not a
good idea to expose the ioBroker databases, adapters or any smart home devices directly to the internet or, in general,
to an environment where untrusted clients can directly access these network services. Adapters that offer services
supposed to be exposed to the internet should be handled with care. You should always activate **HTTPS** and use valid
certificates for web, admin if open it for internet or for example use it with additional security measures like VPN,
VLAN and reverse proxies.

## Prerequisites
These installations steps are for Linux only, please do not execute them in your ioBroker-Docker environment or on Windows


[ ] Basic system, like ubuntu or debian, is running and up-to-date  
[ ] NodeJS installed ([see here](./proxmoxlxc.md#NodeJS))

## Install ioBroker
To ensure ioBroker is installed correctly with all dependency's and required settings (like folder ACL and library's) the ioBroker Team created a powerful installation script which ensures a proper installation!  
Just enter ```curl -sLf https://iobroker.net/install.sh | bash -``` and the installer will handle the rest  
After some minutes you should see :
```
Installing prerequisites (1/4)
Creating ioBroker user and directory (2/4)
Installing ioBroker (3/4)
Finalizing installation (4/4)

ioBroker was installed successfully
Open http://xxx.xxx.xxx.xxx:8081 in a browser and start configuring!
```

::: tip IoBroker is ready to be used
Admin is reachable at http://xxx.xxx.xxx.xxx:8081
::: 
Have fun !