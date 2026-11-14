# My Personal setup

**ioBroker** can be hosted in different ways, each of them has their pro & cons meaning there is no "perfect" one-fits-all recommendation.  
I personally prefer a virtualized environment set-up providing me all **flexibility** I need to have a **stable production** system running,  
freedom to **try** updates and patches **without risk** and having multiple applications/processes running **without influencing** each other.


## [Bare Metal](./baremetal) 
  ioBroker will be installed directly on top of the operating system without additional logic layers.
    
* Pro's 
    * A quite easy setup if you already have the operating system (preferable linux) running
    * Except the operating system and ioBroker, no additional knowledge needed to maintain the system
* Con's
    * Not as flexible as visualisation
    * All processes and additional applications run on the same System
    * Security, all applications share the same host in case one is Vulnerable all services/applications are affected

## [Virtualization](./proxmoxlxc)
  ioBroker will be installed within a [virtual machine](./proxmoxvm), [LXC](./proxmoxlxc) or [docker](./docker) and is separated from its host operation system
* Pro's
  * Flexible deployment, backup and snapshot mechanisms
  * ioBroker is separated from all other processes outside his environment
  * Security, issue at one virtual machine (like a website accessible fromm the internet) do not influance other applicaitons/processes
* Con's
  * More difficult to set up
