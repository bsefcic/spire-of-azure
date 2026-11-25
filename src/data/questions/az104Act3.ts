import type { ExamQuestion } from '../../types/curriculum';

export const AZ104_ACT3_QUESTIONS: ExamQuestion[] = [
  {
    id: 'az104-a3-001',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Azure Virtual Machine Series & Workload Sizing',
    difficulty: 1,
    format: 'single',
    prompt:
      'You are migrating an enterprise in-memory relational database (SAP HANA / large SQL Server buffer pool) that requires a very high RAM-to-vCPU ratio (`8 GiB` of RAM per vCPU, up to hundreds of GiB of memory), alongside a separate low-traffic internal dev wiki that idles at 5% CPU for 22 hours a day and bursts briefly at 09:00. Which pair of Azure VM SKU families best matches these two workloads?',
    options: [
      '`Fsv2-series` for the in-memory database, and `N-series` for the dev wiki',
      '`Lsv3-series` for the in-memory database, and `H-series` for the dev wiki',
      '**`E-series`** (Memory optimized, e.g., `Eadsv5` / `Edsv5`) for the in-memory database, and **`B-series`** (Burstable CPU credits, e.g., `B2s`) for the dev wiki',
      '`D-series` for the in-memory database, and `M-series` for the dev wiki'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Map AWS EC2 instance letters to Azure VM letters: AWS `R-family` (Memory) -> Azure **`E-series`** (`M-series` for ultra-high multi-TB RAM); AWS `T3/T4g` (Burstable credits) -> Azure **`B-series`**; AWS `C-family` (Compute) -> Azure **`F-series`**; AWS `M-family` (General) -> Azure **`D-series`**!',
    explanation:
      'Know the core AZ-104 VM SKU families: **`B-series`** = Burstable (accumulates CPU credits while idle, lowest cost for spiky dev/web workloads); **`D-series`** = General purpose (`4 GiB` RAM/vCPU); **`E-series`** = Memory optimized (`8 GiB` RAM/vCPU for SQL/in-memory DBs, with `M-series` scaling into multi-TB SAP HANA); **`F-series`** = Compute optimized (`2 GiB` RAM/vCPU); **`L-series`** = Storage optimized (local NVMe); **`N-series`** = GPU (`NC`/`ND`/`NV`).',
    awsComparison:
      'Quick Rosetta Stone: EC2 `T3` ≈ Azure **`B`**; EC2 `M6i` ≈ Azure **`D`**; EC2 `R6i` ≈ Azure **`E`**; EC2 `C6i` ≈ Azure **`F`**; EC2 `I4i` ≈ Azure **`L`**; EC2 `G5/P4d` ≈ Azure **`N`**.'
  },
  {
    id: 'az104-a3-002',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Stopped vs Stopped (Deallocated) Billing State',
    difficulty: 1,
    format: 'single',
    prompt:
      'To save weekend compute costs, a junior administrator connects to 20 Windows Server Virtual Machines via RDP on Friday evening and runs `shutdown /s /t 0` inside the guest operating system. On Monday morning, the FinOps dashboard shows all 20 VMs accrued **100% of their hourly vCPU/RAM compute charges** for the entire weekend! Why, and how should they be stopped instead?',
    options: [
      'Shutting down from inside the guest OS puts the VM in the **`Stopped`** (allocated) state, keeping the physical hypervisor slot reserved and billed; you must stop via Azure Resource Manager (`Stop-AzVM`, `az vm deallocate`, or Azure Portal **Stop** / Auto-Shutdown) to reach **`Stopped (deallocated)`**.',
      'Azure Virtual Machines always charge 24/7 compute fees unless deleted completely.',
      'Managed Disks must be detached before compute billing pauses.',
      'Running `Stop-AzVM -StayProvisioned` is required to pause compute billing.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Major billing gotcha vs AWS EC2! In AWS EC2, running `sudo poweroff` inside EBS-backed Linux automatically transitions the instance to `stopped` and stops compute billing; in Azure, guest OS shutdown leaves the VM **`Stopped` (still billed for compute!)** until ARM **deallocates** it!',
    explanation:
      'Azure distinguishes two stopped states: (1) **`Stopped`** (triggered via guest OS `shutdown` OR `Stop-AzVM -StayProvisioned`) — hardware remains reserved on the host and **hourly VM compute charges continue**! (2) **`Stopped (deallocated)`** (triggered via Azure Portal Stop, VM **Auto-shutdown** schedule, `az vm deallocate`, or `Stop-AzVM` without `-StayProvisioned`) — releases hypervisor compute hardware so **compute billing drops to $0**, while Managed Disk storage and any Static Public IPs continue their standard monthly storage/IP charges.',
    awsComparison:
      'Huge migration gotcha from AWS! On EC2, guest OS `shutdown -h now` halts compute billing automatically. On Azure, guest OS shutdown STILL BILLS YOU FOR COMPUTE until you run `az vm deallocate`!'
  },
  {
    id: 'az104-a3-003',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Azure Spot Virtual Machines & Eviction Policies',
    difficulty: 2,
    format: 'single',
    prompt:
      'You deploy stateless rendering nodes as **Azure Spot Virtual Machines** to achieve deep discounts on unused Azure capacity. You want evicted VMs to have their underlying VM resource and Managed Disks automatically cleaned up rather than sitting around accruing storage fees, AND you want instances evicted **only when Azure needs compute capacity back** (never evicted solely because spot market price rose, up to standard pay-as-you-go pricing). Which Spot configuration achieves this?',
    options: [
      'Eviction type = `Capacity or price`, Eviction policy = `Stop / Deallocate`, Max price = `$0.05`',
      'Eviction type = `Price only`, Eviction policy = `Hibernate`',
      'Spot VMs cannot use the `Delete` eviction policy unless inside an Availability Set.',
      'Eviction type = **`Capacity only`** (`maxPrice = -1`), Eviction policy = **`Delete`** (with NIC/Disk `deleteOption = Delete`), giving a 30-second IMDS Scheduled Events eviction warning before termination'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Matches modern AWS EC2 Spot default behavior (`max-price` omitted = capped at On-Demand price, evicted primarily on capacity reclaim + `InstanceInterruptionBehavior: terminate` + Scheduled Events warning)!',
    explanation:
      'Azure Spot VMs offer two **Eviction types**: **`Capacity only`** (`maxPrice: -1` — caps your hourly rate at standard Pay-As-You-Go and evicts ONLY when Azure reclaims physical capacity) vs **`Price or capacity`** (evicts if spot price exceeds your custom `maxPrice` OR if capacity is needed). They also offer two **Eviction policies**: **`Stop / Deallocate`** (keeps disks so you can restart later) vs **`Delete`** (deletes the VM and cascaded disks/NICs). Guest workloads can poll **Azure Instance Metadata Service (IMDS) Scheduled Events** for a **30-second** pre-eviction notification. Note: `B-series` and Promo sizes cannot be Spot VMs, and Spot VMs carry **no SLA**.',
    awsComparison:
      'AWS EC2 Spot gives a 2-minute interruption notice via IMDSv2/EventBridge; Azure Spot VMs give a **30-second** notice via IMDS Scheduled Events (`169.254.169.254/metadata/scheduledevents`).'
  },
  {
    id: 'az104-a3-004',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Managed Disk Tiers & Live Dynamic IOPS Scaling',
    difficulty: 2,
    format: 'single',
    prompt:
      'A mission-critical OLTP database runs on an Azure Virtual Machine. Every end-of-quarter close, database IOPS demand spikes from `5,000 IOPS` to `60,000 IOPS` for 48 hours without needing any extra GiB of disk capacity. Which Azure Managed Disk types allow you to **dynamically scale provisioned IOPS and throughput (`MB/s`) up and down independently of disk size** while the VM stays online without rebooting or detaching the disk?',
    options: [
      '`Standard HDD` and `Standard SSD`',
      '**`Ultra Disk`** and **`Premium SSD v2`**',
      '`Premium SSD` (v1) and `Standard SSD`',
      'Unmanaged Page Blobs in a `StorageV2` account'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Exact parallel to **AWS EBS `gp3` and `io2` Block Express** (decoupled GiB, IOPS, and MB/s modifiable dynamically via Elastic Volumes) vs legacy `gp2` (where IOPS scaled strictly with GiB size = `Premium SSD v1`)!',
    explanation:
      'In **`Standard HDD`**, **`Standard SSD`**, and **`Premium SSD` (v1)**, baseline IOPS and throughput are tied to fixed disk size tiers (`P10`, `P30`, `P50`—though Premium SSD v1 allows temporary performance tier upgrades without downsizing). **`Premium SSD v2`** and **`Ultra Disk`** completely decouple capacity (`GiB`), `IOPS`, and throughput (`MB/s`), letting you dial IOPS and MB/s up and down dynamically via CLI/Portal **without VM downtime or disk resizing**!',
    awsComparison:
      '`Premium SSD (v1)` ≈ EBS `gp2` (tier-coupled); **`Premium SSD v2`** ≈ **EBS `gp3`** (decoupled GiB/IOPS/MB/s, general production sweet spot); **`Ultra Disk`** ≈ **EBS `io2 Block Express`** (up to 400,000 IOPS, sub-millisecond latency).'
  },
  {
    id: 'az104-a3-005',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Ultra Disk Architectural Constraints',
    difficulty: 3,
    format: 'single',
    prompt:
      'You attempt to attach an **Azure Ultra Disk** to a VM in `East US`, and the deployment fails validation. Assuming the VM series (`Standard_E16ds_v5`) supports Ultra Disks and is pinned to Availability Zone 1, which combination of Ultra Disk rules must your configuration respect?',
    options: [
      'Ultra Disk must be used as the VM’s OS boot disk with `ReadWrite` caching enabled.',
      'Ultra Disk requires Azure Disk Encryption (BitLocker/DM-Crypt) to be enabled first.',
      '`additionalCapabilities.ultraSSDEnabled` (`--ultra-ssd-enabled true`) must be enabled on the VM, **Ultra Disk can ONLY be attached as a Data Disk** (never an OS disk), and **Host Caching MUST be set to `None`**.',
      'Ultra Disk works only inside classic Availability Sets without Availability Zones.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Ultra Disk bypasses the host blob cache completely (`Caching = None`), requires flipping the `ultraSSDEnabled` capability flag on the VM (which adds a small reservation charge if unused!), and is strictly for **Data Disks** inside **Availability Zones**!',
    explanation:
      'Key AZ-104 **Ultra Disk** constraints: (1) Must be deployed in an **Availability Zone**, (2) VM must have **`Enable Ultra Disk compatibility`** (`ultraSSDEnabled: true`) enabled, (3) Supported **ONLY as Data Disks** (can NEVER be an OS boot disk!), (4) **Host Caching must be `None`**, and (5) Does NOT support Azure Disk Encryption (use SSE / CMK instead) or Availability Sets.',
    awsComparison:
      'Similar to **EBS `io2 Block Express`** requiring Nitro-based EC2 instances in the exact same Availability Zone and disallowing legacy instance families.'
  },
  {
    id: 'az104-a3-006',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Managed Disk Resizing & Host Caching Rules',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'You are managing OS and Data Managed Disks attached to production Windows and Linux Virtual Machines. Evaluate each statement.',
    statements: [
      {
        statement:
          'If a `2 TiB` `Premium SSD` data disk is only 10% utilized, you can shrink the disk in place down to `512 GiB` using `az disk update --size-gb 512`.',
        answer: false
      },
      {
        statement:
          'After expanding a Managed Disk from `256 GiB` to `512 GiB` in Azure Resource Manager, you must still extend the partition and filesystem inside the guest operating system (`DiskPart`/`Resize-Partition` on Windows or `growpart` + `resize2fs`/`xfs_growfs` on Linux) before applications see the extra space.',
        answer: true
      },
      {
        statement:
          'For a write-heavy SQL Server transaction log disk, Microsoft recommends setting **Host Caching** to **`ReadWrite`** to maximize transaction durability.',
        answer: false
      }
    ],
    awsBridgeHint:
      'Just like AWS EBS: (1) You can NEVER shrink a block volume in place! (2) Growing the block device in the cloud requires extending the OS partition/filesystem! (3) Host-level `ReadWrite` disk caching risks data corruption on ungraceful power loss for DB write-ahead logs (`None` for logs, `ReadOnly` for DB data files, `ReadWrite` for OS disk)!',
    explanation:
      '1) No: Azure Managed Disks **cannot be shrunk**—to downsize, attach a new smaller disk, copy data inside the guest OS, and delete the oversized disk. 2) Yes: ARM expands the virtual block device boundary, and the guest OS partition table/filesystem must then be extended. 3) No: `ReadWrite` host caching caches uncommitted writes in hypervisor memory—if an app like SQL Server or Active Directory NTDS bypasses OS flush semantics, a physical host crash can corrupt logs! Always set **`None`** on write-heavy DB log disks and **`ReadOnly`** on DB data disks (`ReadWrite` is default on OS disks).',
    awsComparison:
      'Identical to **AWS EBS Elastic Volumes** (grow-only, never shrink + `growpart`/`xfs_growfs` inside OS), plus an Azure-specific **Host Caching** setting (`ReadWrite` / `ReadOnly` / `None`) that AWS EBS handles transparently without user-configured host cache modes.'
  },
  {
    id: 'az104-a3-007',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Encryption at Host vs Azure Disk Encryption (ADE)',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your security team mandates end-to-end encryption of Virtual Machine **OS disks, Data disks, OS/data disk host caches, AND ephemeral Temporary disks** using a Customer-Managed Key, **without** consuming guest VM vCPU cycles or failing on hardened custom Linux kernels that lack DM-Crypt extensions. Should you implement **Encryption at Host** or **Azure Disk Encryption (ADE)**?',
    options: [
      '**Encryption at Host**, because hypervisor-level encryption covers temp disks and disk caches end-to-end with zero guest CPU overhead, supports custom Linux images, and works seamlessly with Customer-Managed Keys.',
      '**Azure Disk Encryption (ADE)**, because ADE requires zero guest OS extensions or CPU overhead.',
      'Enable BOTH Encryption at Host and ADE on the exact same disk simultaneously.',
      'Neither; Managed Disks are unencrypted by default.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Think AWS Nitro hardware hypervisor encryption (zero guest CPU penalty, encrypts ephemeral NVMe instance store + EBS end-to-end) vs running legacy BitLocker/LUKS inside the guest OS!',
    explanation:
      'Default Storage Service Encryption (SSE) encrypts Managed Disks at rest in the storage cluster, NOT the local hypervisor **Temporary Disk** or **Host Cache** while in flight. **Encryption at Host** solves this directly on the physical Azure hypervisor host—encrypting the **Temporary Disk**, **OS/Data disk caches**, and data flowing to storage with **zero guest CPU penalty** and full Linux/Windows compatibility! By contrast, **Azure Disk Encryption (ADE)** runs BitLocker/DM-Crypt *inside* the guest OS (consuming VM CPU, incompatible with Ultra Disks/Premium SSD v2/Basic tier/custom images, and **mutually exclusive** with Encryption at Host on the same disks).',
    awsComparison:
      '**Encryption at Host** mirrors **AWS Nitro EBS + Instance Store hardware encryption** (transparent to the guest OS), whereas **ADE** is legacy guest-level BitLocker/LUKS orchestrated via Key Vault.'
  },
  {
    id: 'az104-a3-008',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Availability Sets: Fault Domains vs Update Domains',
    difficulty: 1,
    format: 'single',
    prompt:
      'You deploy 6 domain controller / web Virtual Machines into a single **Availability Set** configured with **3 Fault Domains (FDs)** and **5 Update Domains (UDs)** in a region without Availability Zones. What specific failures do Fault Domains and Update Domains protect against, and what are their maximum configurable counts?',
    options: [
      'Fault Domains (max 20) protect against regional earthquakes; Update Domains (max 3) protect against guest OS Windows Updates.',
      '**Fault Domains** (max **3**) separate VMs across distinct physical server racks with independent power and top-of-rack network switches (unplanned hardware failure); **Update Domains** (max **20**) stagger VMs into groups rebooted **one group at a time** (with a 30-minute recovery window) during planned Azure host maintenance.',
      'Fault Domains (max 5) encrypt network traffic; Update Domains (max 10) patch SQL Server automatically.',
      'Both Fault Domains and Update Domains have a maximum value of 10.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Compare to **AWS EC2 Spread/Partition Placement Groups** inside one AZ: **Fault Domains (up to 3)** = separate physical rack/power/TOR switch; **Update Domains (up to 20)** = rolling hypervisor maintenance batches!',
    explanation:
      'Inside a single Azure datacenter, an **Availability Set** spreads VMs across up to **3 Fault Domains** (distinct physical racks with independent power supplies and network switches, protecting against unplanned rack/PDU/switch failures) and up to **20 Update Domains** (logical maintenance cohorts—during planned Azure host patching, **at most ONE Update Domain is rebooted at a time** and given 30 minutes to recover before moving to the next UD!). Note: Availability Sets use *Managed* Availability Sets for Managed Disks so storage stamps also align across separate storage fault domains!',
    awsComparison:
      'An **Availability Set** is similar to an **AWS EC2 Spread Placement Group** within a single Availability Zone (max 7 instances per AZ on distinct racks in AWS vs up to 3 Fault Domains & 20 Update Domains in Azure).'
  },
  {
    id: 'az104-a3-009',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Compute Availability SLA Tiers & Availability Set Rules',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'Your architecture review board is evaluating Azure Virtual Machine uptime SLAs and deployment constraints across three designs. Which TWO statements are 100% accurate according to Microsoft’s official SLA and ARM rules?',
    options: [
      'Deploying 2 or more VMs across 2 or more **Availability Zones** provides a **`99.99%`** VM connectivity SLA; 2 or more VMs in an **Availability Set** provides **`99.95%`**; and a **single standalone VM** using **`Premium SSD`** or **`Ultra Disk`** for ALL OS and Data disks provides **`99.9%`**.',
      'You can move a running standalone VM into an existing **Availability Set** on the fly in the Azure Portal without recreating the VM resource.',
      'An Availability Set can only be assigned **when a VM is initially created**—you cannot add an existing VM to an Availability Set after creation without deleting the VM (keeping its disks) and recreating it inside the Availability Set.',
      'A single VM cannot belong to an Availability Set and a Resource Group at the same time.'
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Memorize the exact staircase (`99.9%` Single Premium VM -> `99.95%` Availability Set -> `99.99%` Multi-AZ) AND the golden exam rule: **Availability Set (and Availability Zone) placement is fixed at VM creation time**!',
    explanation:
      '1) Correct: Memorize the AZ-104 SLA ladder! Single VM (`Standard HDD` = `95%`, `Standard SSD` = `99.5%`, **`Premium SSD` / `Ultra Disk` = `99.9%`**) -> **Availability Set (2+ VMs) = `99.95%`** -> **Availability Zones (2+ VMs across 2+ AZs) = `99.99%`**! 3) Correct: Because joining an Availability Set dictates physical rack/cluster placement on hypervisor allocation, ARM **forbids** adding an existing VM to an Availability Set after creation (and the Availability Set must reside in the **same Resource Group** as its member VMs!).',
    awsComparison:
      'Notice Azure actually offers a contractual **`99.9%` Single-Instance SLA** when all disks are Premium SSD/Ultra (higher than AWS’s `99.5%` single-instance EC2 SLA), while matching **`99.99%`** across Multi-AZ!'
  },
  {
    id: 'az104-a3-010',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Recreating a Standalone VM into an Availability Set',
    difficulty: 2,
    format: 'single',
    prompt:
      'A production database VM (`vm-sql-01`) was mistakenly deployed **without** an Availability Set six months ago. It holds 4 TB of live data across Managed Disks and custom OS registry configurations that cannot be rebuilt from scratch. What is the fastest supported procedure to place `vm-sql-01` into a new Availability Set (`avail-sql`) in the same Resource Group?',
    options: [
      'Run `Update-AzVM -AvailabilitySetId $availSet.Id` while `vm-sql-01` is running.',
      'Move `vm-sql-01` to a different Subscription and move it back.',
      'Convert `vm-sql-01` into an Azure Container Instance.',
      'Ensure the Managed OS Disk, Data Disks, and NIC have **`Delete Option = Detach`** (do not cascade-delete), **delete the `vm-sql-01` VM compute wrapper**, and **recreate `vm-sql-01` specifying `avail-sql`** while attaching the existing Managed OS Disk, Data Disks, and NIC.'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Watch out for modern ARM `deleteOption: Delete` defaults set by the Azure Portal! Confirm disks/NICs are set to `Detach` before deleting the VM compute shell, then build the new VM directly off the existing OS Managed Disk!',
    explanation:
      'Because Availability Set membership can ONLY be set at VM creation time, the standard administrative procedure is: (1) Verify all Managed Disks and the NIC have `deleteOption` set to **`Detach`** (because newer Portal VM deployments often default `Delete with VM` to checked!), (2) Delete the VM resource (`Microsoft.Compute/virtualMachines`), and (3) Create a new VM inside `avail-sql` in the **same Resource Group** directly from the preserved Managed OS Disk (**Disk -> Create VM**) and re-attach Data Disks and NIC.',
    awsComparison:
      'Unlike EC2 where you must create an AMI (`CreateImage`) to launch into a new Placement Group/AZ, Azure lets you click **Create VM** directly on an unattached **Managed OS Disk** without waiting to bake an intermediate AMI!'
  },
  {
    id: 'az104-a3-011',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Capturing Generalized Images into Azure Compute Gallery',
    difficulty: 2,
    format: 'sequence',
    prompt:
      'You customized a gold-master Ubuntu 22.04 LTS Virtual Machine (`vm-golden`) with hardened CIS benchmarks and agents, and you need to capture it as a **Generalized** image inside **Azure Compute Gallery** replicated across three Azure regions so teams can provision hundreds of new VMs with unique hostnames and SSH host keys. Put the steps in the exact required order.',
    correctSequence: [
      'SSH into `vm-golden` and run `sudo waagent -deprovision+user` (or `sysprep /oobe /generalize /shutdown` on Windows) to strip machine-specific SIDs/host keys and user accounts.',
      'Deallocate `vm-golden` in Azure (`az vm deallocate`) and mark its ARM state as generalized (`az vm generalize`).',
      'Create an **Azure Compute Gallery** (`Microsoft.Compute/galleries`) and create an **Image Definition** matching Linux, OS generation (`V2`), architecture (`x64`), and **`Generalized`** OS state.',
      'Create an **Image Version** (`1.0.0`) sourced from `vm-golden`, specifying target replication regions, replica counts, and storage account type (leaving `vm-golden` permanently generalized/non-bootable afterward).'
    ],
    awsBridgeHint:
      'Remember two critical facts: (1) Deprovision inside Guest OS -> Deallocate -> `az vm generalize` -> Gallery -> Image Definition -> Image Version, and (2) once generalized, the source VM **`vm-golden` can NEVER be started again**!',
    explanation:
      'Azure Compute Gallery (formerly Shared Image Gallery) uses a three-tier hierarchy: **Gallery** -> **Image Definition** (logical family metadata: Windows/Linux, Gen1/Gen2, `Generalized` vs `Specialized`) -> **Image Version** (`major.minor.patch`, replicated to target regions with configurable replica counts for high concurrent VMSS launches). Note: If you capture a **`Specialized`** image instead, you skip `sysprep`/`waagent -deprovision+user` and the source VM remains usable (ideal for cloning an exact server snapshot retaining its SID/hostname!).',
    awsComparison:
      '`Generalized` Image Version ≈ `sysprep`ed **EC2 AMI** copied via EC2 Image Builder multi-region distribution; `Specialized` Image Version ≈ `CreateImage --no-reboot` clone retaining machine identity.'
  },
  {
    id: 'az104-a3-012',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Proximity Placement Groups (PPGs)',
    difficulty: 2,
    format: 'single',
    prompt:
      'A high-frequency financial trading platform comprises a Virtual Machine Scale Set (`Standard_F16s_v2` app tier) talking to two database VMs (`Standard_M64s` ultra-high-memory tier) in the same region. Network round-trip latency between the app tier and database tier currently fluctuates around `1.8 ms` across separate datacenters in the region, and your SLA requires **`< 0.3 ms`**. What Azure construct physically co-locates these heterogeneous resources inside the same network spine, and in what order should they be deployed to avoid capacity errors?',
    options: [
      'Virtual Network Peering with Gateway Transit',
      'Availability Set spanning multiple regions',
      'A **Proximity Placement Group (PPG)**—deploying the **most hardware-constrained / specialized SKU (`Standard_M64s`) FIRST** so the PPG anchors onto a physical datacenter spine that actually hosts `M-series` hardware before adding the common `F16s_v2` VMSS!',
      'Azure Front Door Premium'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Direct counterpart to an **AWS EC2 Cluster Placement Group**! And remember Microsoft’s classic capacity-anchoring rule: the **first** VM started in a PPG pins the PPG to a physical datacenter cluster—so always deploy rare/large SKUs (`M`/`N`-series) FIRST!',
    explanation:
      'A **Proximity Placement Group (PPG)** is a logical ARM resource (`Microsoft.Compute/proximityPlacementGroups`) that forces standalone VMs, Availability Sets, and VM Scale Sets to land in the **same physical datacenter / low-latency network spine**. Because the **first resource deployed** pins the PPG to a specific hardware cluster, deploying common `D2s_v5` VMs first might pin the PPG to a hall lacking scarce `M-series` or GPU racks (`AllocationFailed` later!). Always deploy the largest/scarcest VM SKU first (or specify **Intent VM sizes** on the PPG!).',
    awsComparison:
      'Exact Azure counterpart to an **AWS EC2 Cluster Placement Group**, including the identical capacity-allocation best practice of launching the rarest/largest instance types first.'
  },
  {
    id: 'az104-a3-013',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'VM Scale Sets: Flexible vs Uniform Orchestration',
    difficulty: 3,
    format: 'yes-no',
    prompt:
      'You are architecting **Azure Virtual Machine Scale Sets (VMSS)** for elastic web and batch clusters. Evaluate each statement comparing **`Flexible`** orchestration mode and **`Uniform`** orchestration mode.',
    statements: [
      {
        statement:
          '**`Flexible`** orchestration mode supports mixing different VM SKU sizes, combining Spot and Pay-As-You-Go VMs in the same scale set, spreading across Fault Domains (`platformFaultDomainCount`), and managing individual instances with standard `az vm` commands.',
        answer: true
      },
      {
        statement:
          'You can convert an existing running VM Scale Set in place from **`Uniform`** orchestration mode to **`Flexible`** orchestration mode using `az vmss update`.',
        answer: false
      },
      {
        statement:
          'When deploying a VM Scale Set across multiple Availability Zones, **`Flexible`** orchestration mode supports up to **1,000 VM instances** with high availability guarantees.',
        answer: true
      }
    ],
    awsBridgeHint:
      '**`Flexible` VMSS** brings Azure Scale Sets on par with modern **AWS EC2 Auto Scaling Groups with Mixed Instances Policies** (standard `Microsoft.Compute/virtualMachines` instances, mixed SKUs + Spot/On-Demand split)—and orchestration mode is **immutable** after creation!',
    explanation:
      '1) Yes: **`Flexible`** is Microsoft’s recommended modern VMSS mode—it creates standard child `Microsoft.Compute/virtualMachines` objects compatible with Azure Backup, Bastion, and `az vm` commands, allows mixing SKUs + Spot/Standard instances via Instance Mix, and isolates across Fault Domains (`platformFaultDomainCount = 1, 2, or 3`). 2) No: `orchestrationMode` (`Uniform` vs `Flexible`) is **permanently fixed at VMSS creation time**. 3) Yes: Both `Uniform` and `Flexible` scale up to **1,000 instances** (up to 600 for custom images on Uniform; up to 1,000 on Flexible!).',
    awsComparison:
      'Legacy `Uniform` VMSS felt alien to AWS engineers because instances weren’t real `EC2` VM objects; modern **`Flexible` VMSS** works just like an **AWS Auto Scaling Group (Mixed Instances Policy)** spawning real first-class VM resources!'
  },
  {
    id: 'az104-a3-014',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'VMSS Autoscale Flapping Calculation',
    difficulty: 3,
    format: 'single',
    prompt:
      'A VM Scale Set currently runs **2 instances** experiencing steady **`76%` average CPU**. An engineer configures Azure Monitor Autoscale with two rules (5-minute cooldown):\n- **Scale Out**: When Average CPU `> 70%` for 5 minutes -> **Increase count by 1**\n- **Scale In**: When Average CPU `< 55%` for 5 minutes -> **Decrease count by 1**\n\nWhat happens when this Autoscale profile runs under steady load, and why?',
    options: [
      'The scale set enters a continuous **flapping** loop (`2 -> 3 -> 2 -> 3` every cooldown cycle) because scaling from 2 to 3 instances drops Average CPU to `~50.7%` (`(2 × 76%) / 3`), which immediately triggers the `< 55%` Scale-In rule!',
      'The scale set stabilizes cleanly at 3 instances running at 50.7% CPU.',
      'Autoscale rejects the profile because Scale-In and Scale-Out must use identical percentage thresholds.',
      'The scale set scales out all the way to its maximum limit of 10 instances.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Do the quickAZ-104 capacity math! Total workload = `2 × 76 = 152 CPU points`. Divide by the post-scale-out instance count (`3`): `152 / 3 = 50.67%`! Since `50.67% < 55%`, Scale-In immediately fires and puts you right back at `76%`!',
    explanation:
      'Azure Monitor’s Autoscale engine tests specifically for **flapping** on the AZ-104 exam! When scaling from `N = 2` to `N + 1 = 3` at `76%` CPU, total load (`2 × 76 = 152`) spreads across 3 VMs: `152 / 3 = 50.67%`. Because the Scale-In threshold was set too high (`< 55%`), `50.67%` immediately trips Scale-In back to 2 VMs (`76%`), triggering Scale-Out again forever! Best practice: ensure `ScaleInThreshold < ScaleOutThreshold × (N / (N + 1))`—here `70% × (2/3) = 46.6%`, so setting Scale-In to **`< 30%` or `< 35%`** eliminates flapping!',
    awsComparison:
      'Exact reason AWS recommends **Target Tracking Scaling Policies** (`TargetValue = 65%`) over raw **Step/Simple Scaling Policies** with poorly spaced CloudWatch high/low alarms!'
  },
  {
    id: 'az104-a3-015',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'VMSS Scale-In Policies & Instance Protection',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your Zone-Redundant VM Scale Set (`AZ 1, 2, 3`) runs stateful worker nodes where older instances hold warmed in-memory caches and newer burst instances were added only 20 minutes ago. When load drops and Autoscale scales in, you want Azure to **keep Availability Zones balanced first**, and within the selected zone, **terminate the most recently created VM** while never terminating node `vmss_0` (which runs a leader coordinator). What should you configure?',
    options: [
      'Scale-in policy = `OldestVM`, and apply a `ReadOnly` Resource Lock to `vmss_0`.',
      'Scale-in policy = **`NewestVM`** (default zone-balancing enabled) AND enable **Instance protection -> `Protect from scale-in`** on `vmss_0`.',
      'Scale-in policy = `Default`, because `Default` always deletes the oldest VM ignoring Availability Zones.',
      'Disable Autoscale and use Custom Script Extension.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Matches **AWS ASG Termination Policies** (`Balance across AZs` first -> `NewestInstance`) + **ASG Instance Scale-In Protection** (`ProtectFromScaleIn`)!',
    explanation:
      'VMSS supports three **Scale-in policies** (all of which **balance across Availability Zones / Fault Domains first** by default unless `forceDeletion` overrides): (1) **`Default`** (deletes VM with highest instance ID inside the largest AZ), (2) **`NewestVM`** (deletes the most recently created VM inside the largest AZ), and (3) **`OldestVM`** (deletes the oldest VM inside the largest AZ). Additionally, **Instance Protection** offers **`Protect from scale-in`** (skips the VM during autoscale/manual scale-in while still allowing model upgrades) vs **`Protect from scale-set actions`** (blocks delete, model upgrades, and reimaging!).',
    awsComparison:
      '1-to-1 match with **AWS EC2 Auto Scaling Termination Policies** (`AllocationStrategy` / `NewestInstance` / `OldestInstance` after AZ balancing) + **Instance Scale-In Protection**.'
  },
  {
    id: 'az104-a3-016',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Emergency Remediation via VM Run Command',
    difficulty: 2,
    format: 'single',
    prompt:
      'An administrator testing Windows Firewall rules inside `vm-app-prod` accidentally enables a local guest firewall rule blocking **ALL** inbound TCP traffic (including RDP 3389 and WinRM 5985/5986). The VM has no Serial Console password configured, yet the **Azure VM Agent (`WindowsAzureGuestAgent`)** is healthy and running. What is the fastest non-disruptive way to reset the guest Windows Firewall without rebooting or detaching the OS disk?',
    options: [
      'Add an Inbound Allow rule with Priority 100 on the Network Security Group (NSG).',
      'Deploy Azure Bastion in `AzureBastionSubnet`.',
      'Redeploy the VM to a new Azure physical host.',
      'Use **`Run Command`** (`Invoke-AzVMRunCommand` / `az vm run-command invoke` / Portal **Operations > Run command > `DisableWindowsFirewall`**), which executes PowerShell as `NT AUTHORITY\SYSTEM` directly over the outbound Azure VM Agent host channel!'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Think **AWS Systems Manager Run Command (`AWS-RunPowerShellScript`)**! An NSG allow rule or Bastion still hits the blocked *guest* Windows Firewall on TCP 3389—whereas **Azure VM `Run Command`** talks through the hypervisor wireserver (`168.63.129.16`) via the VM Agent even when inbound NIC ports are 100% blocked!',
    explanation:
      'Adding an NSG rule or deploying Azure Bastion will NOT help when the **guest OS firewall** itself drops inbound TCP 3389! **`Run Command`** communicates via the **Azure VM Agent** outbound to Azure’s host wireserver (`168.63.129.16`), executing scripts inside the guest as `SYSTEM` (Windows) or `root` (Linux) with zero inbound network dependency—even offering built-in one-click scripts like `DisableWindowsFirewall`, `EnableRemotePS`, and `ResetRDPCert`!',
    awsComparison:
      'Direct Azure equivalent to **AWS Systems Manager (SSM) Run Command** rescuing an EC2 instance whose OS firewall or `sshd_config` broke SSH/RDP!'
  },
  {
    id: 'az104-a3-017',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Custom Script Extension (CSE) Operational Rules',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'You automate post-deployment software installation on Azure Virtual Machines using the **Custom Script Extension (CSE)** declared inside Bicep templates. Which TWO technical constraints govern the Custom Script Extension?',
    options: [
      'A Custom Script Extension execution has a hard **90-minute timeout**—if the script has not exited within 90 minutes, the provisioning state is marked as failed (`Provisioning failed`)! Avoid interactive prompts or unhandled reboots inside the script.',
      'You can attach up to 10 separate Custom Script Extension resource instances simultaneously on the same Virtual Machine.',
      'Only **ONE** instance of the Custom Script Extension can exist on a VM at a time, and scripts hosted in private Azure Blob Storage can be securely downloaded using a **Managed Identity** (`managedIdentity` property in `protectedSettings`) without exposing public URLs.',
      'Custom Script Extension runs before the operating system kernel boots, without needing the Azure VM Agent.'
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Memorize CSE’s two signature AZ-104 rules: **90-minute hard execution limit** + **maximum 1 CSE resource per VM** (pass `managedIdentity` in `protectedSettings` to fetch private Blob scripts cleanly)!',
    explanation:
      'Key **Custom Script Extension** exam facts: (1) Requires the **Azure VM Agent**, (2) Enforces a strict **90-minute execution timeout** (never put interactive prompts or bare reboots inside a single CSE script—use Desired State Configuration / Image Builder for multi-reboot installs!), (3) **At most ONE CSE** per VM (to run a second script later via IaC, update the existing CSE and change `forceUpdateTag`), and (4) `protectedSettings` encrypts secrets/SAS tokens or accepts `managedIdentity` (`{}` for System-Assigned or `clientId`/`objectId` for User-Assigned) to pull scripts from private Azure Storage.',
    awsComparison:
      'Comparable to **EC2 `UserData` + `cfn-init`**, except CSE is a declarative ARM child resource (`Microsoft.Compute/virtualMachines/extensions`) with encrypted `protectedSettings`, Managed Identity blob fetch, and a strict 90-minute provisioning SLA.'
  },
  {
    id: 'az104-a3-018',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Azure Serial Console vs Boot Diagnostics',
    difficulty: 2,
    format: 'single',
    prompt:
      'An engineer adds a malformed UUID entry to `/etc/fstab` on an Ubuntu VM and reboots. On startup, `systemd` halts midway through boot in `emergency mode` **before** `systemd-networkd` or `waagent` starts—so SSH, Bastion, AND `Run Command` all time out! Which built-in Azure troubleshooting tool provides interactive out-of-band `ttyS0` shell access to fix `/etc/fstab` in place, and what prerequisite must be met?',
    options: [
      'Azure Network Watcher IP Flow Verify',
      'Custom Script Extension with `--force-update`',
      '**Azure Serial Console**—which requires **Boot Diagnostics** enabled on the VM (using either a managed or custom storage account) and a local user account configured with a **password** (SSH keys cannot authenticate at a serial `login:` prompt!).',
      'Proximity Placement Group diagnostics'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Exact match to **AWS EC2 Serial Console** (`ttyS0`)! When networking and agents haven’t even booted due to broken `/etc/fstab` or GRUB, only true hypervisor serial port `ttyS0` works—and serial prompts need a local password (or GRUB single-user rescue)!',
    explanation:
      'When a VM hangs at GRUB, `emergency mode` (`/etc/fstab` typo), or Windows Boot Manager (`SAC>` Special Administration Console), neither NIC networking nor the VM Agent is alive—so SSH, RDP, Bastion, and `Run Command` all fail. **Azure Serial Console** connects directly to the virtual `COM1` / `ttyS0` port on the hypervisor! Prerequisites: **Boot Diagnostics** must be enabled on the VM, your user needs `Virtual Machine Contributor` (or higher), and interactive login requires a password-enabled account (if none was set on an SSH-only Linux VM, you can first use `Reset password` extension if agent ever booted, or attach the OS disk as a data disk to a **rescue VM** / `az vm repair`!).',
    awsComparison:
      '**Azure Serial Console** (`ttyS0` / Windows `SAC>`) + **`az vm repair`** (automated rescue VM disk swap) map 1-to-1 to **AWS EC2 Serial Console** + **AWSSupport-ExecuteEC2Rescue**!'
  },
  {
    id: 'az104-a3-019',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Redeploying a VM to a New Host',
    difficulty: 1,
    format: 'single',
    prompt:
      'Microsoft Support suspects degraded physical hypervisor hardware beneath `vm-worker-04` and advises you to click **Help > Redeploy + reapply > Redeploy** in the Azure Portal. When Azure migrates `vm-worker-04` onto a brand-new Azure host and boots it back up, what happens to its disks and IP configurations?',
    options: [
      'All Managed OS and Data Disks are wiped and reformatted.',
      'Managed OS and Data Disks remain completely intact, **all data on the ephemeral Temporary Disk (`D:\` on Windows / `/mnt` on Linux) is permanently lost**, and any **Dynamic** IP addresses are updated if reallocated.',
      'Only the Temporary Disk (`D:\`) is preserved while Managed Disks are detached.',
      'The VM is permanently moved to its paired secondary Azure region.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Moving a VM onto a fresh physical hypervisor server leaves network-attached **Managed Disks** (EBS) untouched, while local host SSD **Temporary Disk** (EC2 Instance Store) stays behind on the old physical server and is wiped!',
    explanation:
      '**Redeploy** (`Set-AzVM -Redeploy` / `az vm redeploy`) cleanly shuts down the VM, migrates it to a **new physical node** inside the same Azure region/zone, and restarts it—resolving underlying host/hypervisor glitches or stubborn RDP hangs. **Managed OS & Data Disks** persist untouched over Azure Storage, whereas **ephemeral Temporary Disk data (`D:\` / `/dev/sdb1`) is permanently wiped** and non-static dynamic public IPs change!',
    awsComparison:
      'Exact same behavior as stopping and starting an EC2 instance to migrate off a degraded Nitro host: EBS volumes survive intact, local NVMe Instance Store volumes are wiped, and non-Elastic public IPs change.'
  },
  {
    id: 'az104-a3-020',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Moving Virtual Machines Across Resource Groups & Subscriptions',
    difficulty: 3,
    format: 'yes-no',
    prompt:
      'You are reorganizing infrastructure by moving Azure Virtual Machines across Resource Groups and across Subscriptions (within the same Microsoft Entra tenant). Evaluate each statement.',
    statements: [
      {
        statement:
          'Moving a running Virtual Machine from `rg-old` to `rg-new` inside the same Subscription requires deallocating the VM first and causes 15 minutes of compute downtime.',
        answer: false
      },
      {
        statement:
          'When moving a Virtual Machine to a **different Subscription**, its attached Network Interface (NIC), Virtual Network, and Managed Disks must also reside in or be moved together into the destination Subscription.',
        answer: true
      },
      {
        statement:
          'If `vm-web-01` is a member of Availability Set `avail-web` (which also contains `vm-web-02`), you can move ONLY `vm-web-01` to a **different Subscription** while leaving `avail-web` and `vm-web-02` in the original Subscription.',
        answer: false
      }
    ],
    awsBridgeHint:
      '(1) Moving a VM in ARM is pure control-plane metadata—ZERO VM downtime! (2) Cross-subscription VM moves require dependent VNet + NIC + Managed Disks to move together! (3) Across subscriptions, an Availability Set and ALL its VMs are an indivisible unit!',
    explanation:
      '1) No: Moving resources in ARM only updates control-plane Resource ID pointers (temporarily locking ARM writes during the move for up to 4 hours), while the **VM continues running with zero data-plane or network downtime**! 2) Yes: A VM and its NIC cannot reference a VNet or Managed Disks in a different subscription—so cross-subscription moves must bundle the VM, Managed Disks, NICs, and VNet (plus ALL other NICs/VMs attached to that VNet!). 3) No: You cannot split an Availability Set across two Subscriptions—you must move `avail-web` AND all its member VMs together!',
    awsComparison:
      'Remarkable difference from AWS: AWS has no native cross-account `MoveInstance` keeping the VM running live (you snapshot/share AMIs and relaunch with downtime), whereas Azure moves running VMs live as long as dependent resources move together!'
  },
  {
    id: 'az104-a3-021',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Azure Bastion Deployment Requirements',
    difficulty: 1,
    format: 'single',
    prompt:
      'Your zero-trust security standard mandates removing all Public IP addresses from every Windows and Linux Virtual Machine while allowing administrators to initiate HTML5 browser-based RDP and SSH sessions over **TLS port 443** directly through the Azure Portal. When deploying **Azure Bastion** (Standard SKU) into `vnet-hub`, what exact subnet name and minimum CIDR prefix size are mandatory?',
    options: [
      'Subnet named **`AzureBastionSubnet`** with a minimum subnet prefix of **`/26`** (or larger, such as `/25` or `/24`)',
      'Subnet named `BastionSubnet` with a `/28` prefix',
      'Subnet named `GatewaySubnet` with a `/27` prefix',
      'Any custom subnet name as long as port 3389 is open to `0.0.0.0/0`'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Azure reserves strict magic subnet names for platform appliances (`GatewaySubnet`, `AzureFirewallSubnet`, `AzureBastionSubnet`)—memorize **`AzureBastionSubnet` + `/26` minimum**!',
    explanation:
      'Deploying Standard/Basic **Azure Bastion** into a VNet requires a dedicated subnet named **case-sensitively `AzureBastionSubnet`** with a **minimum CIDR size of `/26`** (64 addresses, supporting Bastion host horizontal scaling up to 50 instances on Standard/Premium!). Admins connect from their browser to the Azure Portal + Bastion Public IP over **HTTPS TCP 443**, and Bastion connects internally over private IPs (`TCP 3389` / `TCP 22`) to VMs across the local VNet AND peered spoke VNets—zero Public IPs on target VMs! (Note: Bastion *Developer* SKU uses shared pool without a dedicated `/26`, while Standard/Basic exam scenarios always require `AzureBastionSubnet` `/26`.)',
    awsComparison:
      'Comparable to **AWS EC2 Instance Connect Endpoint (EICE)** / **SSM Session Manager Fleet Manager RDP**, providing zero-public-IP browser SSH/RDP over HTTPS 443.'
  },
  {
    id: 'az104-a3-022',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Vertical VM Resizing & Hardware Cluster Limits',
    difficulty: 2,
    format: 'single',
    prompt:
      'While `vm-api-01` is running (`PowerState/running`), you open the **Size** blade in the Azure Portal (or run `az vm list-vm-resize-options`) to scale up from `Standard_D2s_v5` to `Standard_E32ds_v5`, but `Standard_E32ds_v5` appears grayed out / omitted from live resize options even though your subscription has plenty of `Eadsv5/Edsv5` regional vCPU quota! What must you do so `Standard_E32ds_v5` becomes selectable?',
    options: [
      'Delete `vm-api-01` and rebuild from an ISO.',
      'Convert the OS disk from `Premium SSD` to `Standard HDD`.',
      'Remove the VM from its Virtual Network.',
      '**Deallocate** `vm-api-01` (`az vm deallocate` / Portal **Stop**)—while a VM is running, Azure can only resize to SKUs physically hosted on its **current hardware cluster**; deallocating releases the cluster lease so Azure can re-provision it onto an `Edsv5`-capable cluster!'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'On EC2 you *always* have to `StopInstances` before `ModifyInstanceAttribute --instance-type`; on Azure, resizing within the current rack triggers a quick reboot, whereas switching hardware families not on the current rack requires **Deallocating** first!',
    explanation:
      'While a VM is allocated (`Running` or `Stopped` without deallocation), `az vm list-vm-resize-options` returns ONLY VM sizes supported by the **physical hardware cluster** currently hosting the VM (and resizing to one of those triggers a guest reboot). If the desired SKU family (`E32ds_v5`, `Lsv3`, GPU) is hosted on a different physical cluster in that region, **deallocating** (`Stop-AzVM` / `az vm deallocate`) frees the VM from the old cluster and unlocks every SKU supported in the region/Availability Set! (Warning: if inside an Availability Set, *ALL* VMs in that Availability Set must be deallocated together if jumping hardware clusters!).',
    awsComparison:
      'Good bonus tip: remember that if a VM is in an **Availability Set** and needs a SKU not on that cluster, **every VM in the Availability Set** must be deallocated simultaneously so the whole set can relocate to a compatible hardware cluster!'
  },
  {
    id: 'az104-a3-023',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Azure App Service Plans: Billing, OS & Scaling',
    difficulty: 1,
    format: 'single',
    prompt:
      'An App Service Plan (`asp-prod-win`, `Premium P1v3` scaled out to **3 instances**) currently hosts **4 Windows .NET Web Apps** and **1 Function App**. You add a 5th Windows Web App into `asp-prod-win`, and later a developer asks to deploy a Linux Docker Compose app into `asp-prod-win` as well. How does adding the 5th Windows app affect your fixed App Service Plan compute bill, and can the Linux container app join `asp-prod-win`?',
    options: [
      'Adding the 5th Windows app multiplies your `P1v3` compute bill by 5, and Linux apps can share `asp-prod-win`.',
      'Adding the 5th Windows app adds **$0 in extra App Service Plan compute charges** (all apps inside an App Service Plan share the underlying `3 × P1v3` VM instances!), and **NO—a Windows App Service Plan CANNOT host Linux apps** (OS is immutable per App Service Plan, requiring a separate Linux App Service Plan).',
      'Each Web App gets its own dedicated `3 × P1v3` fleet free of charge, and OS can be toggled per Web App.',
      'An App Service Plan can host at most 1 Web App.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Think of an **App Service Plan** as a managed **ECS EC2 Capacity Provider / Elastic Beanstalk instance pool**: you pay for the `N` underlying VM instances in the Plan regardless of how many apps you bin-pack onto them—and Windows vs Linux workers can NEVER mix in one Plan!',
    explanation:
      'An **App Service Plan** defines the **Region**, **Operating System (`Windows` or `Linux` — permanently fixed at creation!)**, **SKU Tier** (`Free F1`, `Shared D1`, `Basic B1-B3`, `Standard S1-S3`, `Premium P0v3-P5mv3`, `Isolated I1v2-I6v2`), and **Instance Count** (`Scale Out`). Every Web App, API App, or Function App assigned to that Plan runs concurrently on **all `N` instances** of the Plan at **no extra compute charge** (sharing CPU/RAM—so noisy neighbors can contend for memory!).',
    awsComparison:
      'Whereas AWS App Runner bills per individual service, **Azure App Service Plans** let you bin-pack dozens of low-traffic microservices onto a single fixed-cost `P1v3` cluster (just keep Windows and Linux in separate Plans!).'
  },
  {
    id: 'az104-a3-024',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'App Service Deployment Slots & Slot-Sticky Settings',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'You want zero-downtime blue/green releases on an Azure Web App (`app-checkout`) using **Deployment Slots** (`production` and `staging`). `app-checkout` currently runs on a `Basic B2` App Service Plan, and `production` uses a `SqlConnStr` connection string pointing to the live SQL database while `staging` uses `SqlConnStr` pointing to a test SQL database. Which TWO actions are required so swapping `staging` into `production` works with zero cold-start downtime and NEVER points live users at the test SQL database?',
    options: [
      '**Scale Up** the App Service Plan from `Basic B2` to at least **`Standard S1`** (or `Premium` / `Isolated`), because Deployment Slots are NOT supported on `Free`, `Shared`, or `Basic` tiers.',
      'Scale Out `Basic B2` from 1 instance to 3 instances to unlock Deployment Slots.',
      'Check the **"Deployment slot setting"** checkbox on `SqlConnStr` in BOTH `production` and `staging` so each connection string stays **sticky** to its respective slot across swaps, while Azure warms up `staging` against the `production` DB before flipping traffic!',
      'Stop the `production` slot for 5 minutes during every swap so file locks release.'
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Two classic AZ-104 Deployment Slot checkpoints: (1) Minimum tier for Slots = **`Standard`** (up to 5 slots; `Premium` = up to 20 slots!), and (2) **"Deployment slot setting" (sticky)** keeps environment-specific DB strings pinned to the slot while app code swaps underneath!',
    explanation:
      '1) Correct: Deployment Slots unlock starting at **`Standard`** tier (5 slots), **`Premium`** (20 slots), and **`Isolated`** (20 slots). 3) Correct: During a Slot Swap, **non-sticky** settings travel *with the code*, whereas settings marked **"Deployment slot setting"** stay **pinned to the slot**! Before flipping the front-end router, Azure applies `production`’s sticky settings onto the `staging` worker process, restarts/warms up `staging` (hitting `WEBSITE_SWAP_WARMUP_PING_PATH` if configured), and then swaps VIP routing instantaneously with **zero downtime**! (Note: Custom Domain bindings, Managed Identities, and Scale settings NEVER swap—they always stay pinned to the slot!).',
    awsComparison:
      'Deployment Slots are cleaner than Elastic Beanstalk `SwapEnvironmentCNAMEs` because the public hostname, TLS bindings, and sticky production secrets never move—Azure warms the staging container against prod config and flips internal L7 routing atomically!'
  },
  {
    id: 'az104-a3-025',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Rolling Back a Bad Deployment Slot Swap & Auto-Swap',
    difficulty: 1,
    format: 'single',
    prompt:
      'Your CI/CD pipeline deploys v2.4 of a Windows Web App to the `staging` Deployment Slot, which has **Auto-swap** configured to swap automatically into `production` after warm-up. Ten minutes after v2.4 goes live in `production`, error telemetry spikes due to a logic bug! What happens to v2.3 during the initial swap, and what is the **fastest** way to roll `production` back to v2.3?',
    options: [
      'v2.3 moved into the `staging` slot when the swap occurred—so simply **perform another Swap between `staging` and `production`** to immediately route live traffic back to v2.3!',
      'v2.3 was overwritten and deleted; you must restore last night’s Storage Account backup.',
      'Delete the `staging` slot to revert `production`.',
      'Scale down the App Service Plan to `Free F1`.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'A Slot Swap is a true bidirectional pointer swap: `staging (v2.4) <-> production (v2.3)` leaves `v2.3` sitting intact inside `staging`! Swapping a second time rolls back in seconds!',
    explanation:
      'Because a Deployment Slot Swap exchanges the two worker environments (`staging` becomes `production`, and the prior `production` build moves into `staging`), the known-good `v2.3` artifacts remain intact in `staging`! Performing an immediate **second Swap** restores `v2.3` to `production` in seconds (note: if **Auto-swap** is enabled on `staging`, remember to disable Auto-swap first or swap cleanly from Portal/CLI so it doesn’t immediately re-swap!).',
    awsComparison:
      'Instant blue/green pointer flip rollback, similar to shifting an AWS ALB Listener weighted target group back from `Green (100%)` to `Blue (100%)`.'
  },
  {
    id: 'az104-a3-026',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'App Service VNet Integration (Outbound) vs Private Endpoint (Inbound)',
    difficulty: 3,
    format: 'single',
    prompt:
      'You are securing a multi-tier internal HR portal hosted on **Azure App Service** (`Premium P1v3`):\n- **Inbound requirement**: Only employees on the corporate network (connected via ExpressRoute to `vnet-corp`) may reach the Web App over private `10.x.x.x` IP addresses; public internet inbound access must be completely blocked.\n- **Outbound requirement**: The Web App backend code must connect privately over `10.x.x.x` IPs to a backend Redis cluster and internal API running inside `vnet-corp/snet-backend`.\n\nWhich combination of App Service networking features is required?',
    options: [
      'A single **Private Endpoint** handles BOTH inbound requests to the Web App AND outbound calls from the Web App into `vnet-corp`.',
      '**Regional VNet Integration** alone blocks public inbound traffic and gives the Web App a private inbound IP.',
      'Configure an **Azure Private Endpoint** (inbound only, in `snet-pe` with `privatelink.azurewebsites.net`) to lock down **inbound** traffic to the Web App, AND configure **Regional VNet Integration** (delegating a dedicated empty subnet `snet-app-out` to `Microsoft.Web/serverFarms`) for **outbound** calls from the Web App into `vnet-corp`!',
      'Deploy an Availability Set inside `vnet-corp`.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'TOP-5 AZ-104 EXAM FAVORITE! Memorize the directional split on PaaS App Service/Functions: **Private Endpoint = INBOUND ONLY** (`Client -> Web App`); **Regional VNet Integration = OUTBOUND ONLY** (`Web App -> VNet DB/Redis`)!',
    explanation:
      'Do NOT fall for the trap that a Private Endpoint gives bidirectional VNet presence! (1) **Private Endpoint** (`privatelink.azurewebsites.net`) is strictly **one-way INBOUND** (`vnet-corp -> Web App`) and blocks public internet access. (2) **Regional VNet Integration** (requires a dedicated subnet delegated exclusively to `Microsoft.Web/serverFarms`) is strictly **one-way OUTBOUND** (`Web App -> vnet-corp` / ExpressRoute / NAT Gateway)! When an enterprise app needs both private inbound AND private backend outbound, you MUST configure **both** on separate subnets!',
    awsComparison:
      'Identical to **AWS App Runner / Lambda**: **VPC Ingress Connection (Interface Endpoint)** handles private *inbound* calls to the service, whereas a **VPC Connector** (hyperplane ENIs in a subnet) handles *outbound* calls from the service into private RDS/ElastiCache!'
  },
  {
    id: 'az104-a3-027',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'App Service Automated Backups Limits & Prerequisites',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'You are configuring **Custom / Scheduled Backups** directly inside **Azure App Service** to back up web app files, configuration, and a linked Azure SQL Database to an Azure Storage Account container. Evaluate each statement.',
    statements: [
      {
        statement:
          'Custom scheduled App Service Backups are supported starting at the **`Standard`** tier (as well as `Premium` and `Isolated`), and are NOT available on `Free`, `Shared`, or `Basic` tiers.',
        answer: true
      },
      {
        statement:
          'A single custom App Service Backup (app filesystem content PLUS linked database backup combined) has a maximum size limit of **`10 GB`**.',
        answer: true
      },
      {
        statement:
          'TLS/SSL private certificates bound to custom domains are only included in the backup if they were uploaded directly to App Service rather than imported from Azure Key Vault, AND files inside `/home/LogFiles` can be excluded using a **`_backup.filter`** file in `D:\home\site\wwwroot`.',
        answer: true
      }
    ],
    awsBridgeHint:
      'Know the classic App Service Backup numbers: **`Standard`+ tier**, **`10 GB` max total size (app + DB!)**, and **`_backup.filter`** in `wwwroot` to exclude bulky cache/temp folders so you stay under the `10 GB` ceiling!',
    explanation:
      'All three statements highlight official Microsoft Learn AZ-104 App Service Backup rules! (1) Scheduled/custom backups require **`Standard`**, **`Premium`**, or **`Isolated`** plans. (2) Custom backups enforce a strict **`10 GB` combined ceiling** across app files + any linked SQL/MySQL/PostgreSQL dump (automatic platform backups without DBs capture up to 30 GB, whereas custom backups with storage container + DBs cap at **10 GB**!). (3) Placing a plain-text **`_backup.filter`** file inside `\site\wwwroot` listing folder/file paths excludes temp/cache assets to keep backups fast and under `10 GB`.',
    awsComparison:
      'Because App Service runs on managed PaaS storage (`wwwroot` share), built-in custom backups dump a `.zip` + `.bacpac` straight into your Blob container—just watch that strict **`10 GB`** ceiling if developers dump media uploads onto local `wwwroot` instead of Blob Storage!'
  },
  {
    id: 'az104-a3-028',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'App Service Custom Domains & SNI vs IP-Based SSL',
    difficulty: 2,
    format: 'single',
    prompt:
      'You want to map the root apex domain `contoso.com` AND `shop.contoso.com` to an Azure Web App (`app-store.azurewebsites.net`) with HTTPS TLS certificates at the lowest cost while keeping `contoso.com` live on its old host until zero-downtime DNS cutover. How do you pre-verify domain ownership without changing live `A`/`CNAME` traffic first, and which TLS binding type avoids extra dedicated IP fees?',
    options: [
      'Create an `MX` record for `contoso.com` and select `IP-based SSL`.',
      'Create a **`TXT` record** named **`asuid`** (for `contoso.com`) and **`asuid.shop`** (for `shop.contoso.com`) containing the Web App’s **Custom Domain Verification ID**, bind certificates using **`SNI SSL`** (no extra cost, `Basic`+ tier), and then cut over the apex `A` / `ALIAS` record and `shop` `CNAME` record.',
      'Custom apex domains (`contoso.com`) are unsupported on Azure App Service.',
      'Move `contoso.com` to `Free F1` tier and enable App Service Managed Certificates.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Memorize **`asuid` TXT record** = Azure App Service’s zero-downtime pre-verification DNS token! And **`SNI SSL`** (`Server Name Indication`) is free on `Basic`+, whereas legacy `IP SSL` requires `Standard`+ and bills per dedicated IP!',
    explanation:
      'Every Azure Web App exposes a unique **Custom Domain Verification ID**. Creating DNS **`TXT` records at `asuid.<subdomain>`** (or `asuid` at the `@` zone apex) proves domain ownership to Azure App Service *before* repointing live `CNAME` (`shop.contoso.com -> app-store.azurewebsites.net`) or `A` records (`contoso.com -> inbound IP`), preventing subdomain takeover and enabling zero-downtime migration! **`SNI SSL`** allows multiple HTTPS domains to share the plan’s shared inbound VIP (`Basic`+ tier; free **App Service Managed Certificates** also support apex + subdomains on `Basic`+!).',
    awsComparison:
      '`SNI SSL` matches modern **AWS ALB / CloudFront SNI** (default, free), while `asuid` TXT pre-validation prevents dangling-DNS subdomain takeovers prior to cutover.'
  },
  {
    id: 'az104-a3-029',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'App Service Canary Traffic Splitting Across Slots',
    difficulty: 1,
    format: 'single',
    prompt:
      'Before performing a full swap of your `canary` Deployment Slot into `production` on an Azure Web App (`https://portal.fabrikam.com`), product managers want **10% of randomly selected live users** visiting `https://portal.fabrikam.com` to be served transparently by the `canary` slot (pinned via an `x-ms-routing-name` session cookie), while 90% stay on `production`. What native App Service feature accomplishes this with zero external load balancer?',
    options: [
      'Azure Traffic Manager Geographic routing',
      'App Service Access Restrictions',
      'App Service Auto-Swap',
      '**Deployment Slots `Traffic %` routing** (Testing in Production), setting `canary` Traffic % to `10%` and leaving `production` at `90%`'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Built right into the **Deployment Slots** blade: the **`Traffic %`** column splits incoming requests on the production hostname and drops an `x-ms-routing-name` cookie so a user stays on the same version throughout their session!',
    explanation:
      'In the **Deployment slots** blade of an Azure Web App, adjusting the **`Traffic %`** column (Testing in Production) instructs App Service’s front-end load balancers to route the specified percentage (`10%`) of live `production` domain requests to the `canary` slot, setting an `x-ms-routing-name=canary` cookie for client session affinity (and allowing QA testers to opt in/out explicitly via `?x-ms-routing-name=canary` or `?x-ms-routing-name=self`!).',
    awsComparison:
      'Works just like **AWS Lambda Alias Traffic Shifting** or **CloudFront Continuous Deployment staging distributions** (`aws-cf-cd-*` sticky cookie), built natively into App Service Slots.'
  },
  {
    id: 'az104-a3-030',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'App Service Swap with Preview Workflow',
    difficulty: 2,
    format: 'sequence',
    prompt:
      'Your fintech team requires manual verification of a release running against production App Settings and connection strings **before** live customer traffic hits the new worker processes. Arrange the **Swap with Preview** (multi-phase swap) workflow on Azure App Service in chronological order.',
    correctSequence: [
      'Ensure environment-specific `production` App Settings and database Connection Strings are marked as **Deployment slot settings** (sticky to `production`), and deploy the new release build to the `staging` slot.',
      'Select **Swap** -> check **Perform swap with preview** -> click **Start Swap** (Phase 1 applies `production`’s sticky configuration values onto the `staging` slot and restarts/warms up `staging` worker processes).',
      'Browse and run automated smoke tests directly against the `staging` slot URL (`https://<app>-staging.azurewebsites.net`) while `100%` of live users remain undisturbed on `production`.',
      'Click **Complete Swap** to instantaneously route live `production` traffic to the pre-warmed `staging` workers (or click **Cancel Swap** to strip production settings off `staging` without touching `production`!).'
    ],
    awsBridgeHint:
      '**Swap with Preview** breaks a normal atomic Slot Swap right in half between "apply prod sticky settings + warm up staging" (Phase 1) and "flip the live VIP router" (Phase 2)—with a safe **Cancel Swap** escape hatch!',
    explanation:
      '**Swap with Preview** solves the classic worry *"What if the new code crashes only when handed the real production feature flags/DB schema?"* Phase 1 (**Start Swap**) injects `production` slot-sticky settings into `staging` and restarts `staging` while keeping live customer traffic on `production`. Once QA validates `https://<app>-staging.azurewebsites.net`, Phase 2 (**Complete Swap**) switches routing instantly—or **Cancel Swap** cleanly reverts `staging`’s config!',
    awsComparison:
      'Analogous to **AWS CodeDeploy Blue/Green ECS deployments** pausing at the `AfterAllowTestTraffic` lifecycle hook on a test listener port before shifting the live production ALB listener!'
  },
  {
    id: 'az104-a3-031',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Azure Container Instances (ACI) Multi-Container Groups',
    difficulty: 2,
    format: 'single',
    prompt:
      'You deploy an **Azure Container Instances (ACI) Container Group** via YAML containing two containers: an `nginx` reverse-proxy container exposing external TCP port `443` and an internal `python-api` backend container listening on port `8000` (with a third Fluent Bit log-forwarder sidecar). How do containers inside the same Container Group communicate, and which guest OS constraint applies to multi-container groups?',
    options: [
      'All containers in the Container Group share a **single network namespace (`localhost` / `127.0.0.1`), IP address, port space, lifecycle, and mounted volumes**—so `nginx` proxies directly to `http://localhost:8000`, and multi-container groups are supported **ONLY on Linux containers**.',
      'Each container receives its own separate public IPv4 address and can mix Windows Server Core and Ubuntu sidecars in the same Container Group.',
      'Containers in a Container Group must communicate across an external Azure Load Balancer.',
      'Two containers inside the same Container Group can both bind to `0.0.0.0:443` simultaneously.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'An **ACI Container Group** works 100% like a **Kubernetes Pod** or an **AWS ECS Fargate Task (`awsvpc` mode)**: shared `localhost` loopback, shared IP/port namespace (no duplicate port bindings!), shared storage volumes, and Linux-only for multi-container sidecars!',
    explanation:
      'In Azure Container Instances, the top-level ARM resource is a **Container Group** (`Microsoft.ContainerInstance/containerGroups`), conceptually identical to a Kubernetes Pod: (1) Co-scheduled on the same physical host sharing lifecycle, CPU/RAM pool, and storage volumes, (2) Share ONE network namespace (`localhost`—so `nginx` calls `127.0.0.1:8000` without exposing port `8000` externally, and two containers CANNOT bind the same port!), and (3) **Multi-container groups currently require Linux containers** (Windows ACI supports single-container instances).',
    awsComparison:
      'ACI **Container Group** ≈ **AWS Fargate Task** (one ENI, shared `127.0.0.1` loopback across sidecars, per-second vCPU/GB-s serverless container billing).'
  },
  {
    id: 'az104-a3-032',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'ACI Restart Policies & Per-Second Billing',
    difficulty: 1,
    format: 'single',
    prompt:
      'You run a nightly financial reconciliation container in **Azure Container Instances (ACI)** that processes records for 12 minutes and exits with code `0` upon success—or exits with non-zero code `1` if a downstream API transiently times out. You want ACI to automatically retry crashed runs (`exit != 0`) while **stopping the container and halting per-second vCPU/memory charges immediately** once it exits cleanly (`exit == 0`). Which ACI `restartPolicy` should you set?',
    options: [
      '`Always` (the default)',
      '**`OnFailure`**',
      '`Never`',
      '`UntilStopped`'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Watch out for ACI’s default (`Always`)! If you leave `Always` on a run-to-completion batch job, ACI restarts your finished batch container in an infinite loop forever and bills you 24/7!',
    explanation:
      'ACI Container Groups support exactly three `restartPolicy` settings: (1) **`Always`** (default—ideal for long-running web servers; restarts the container even after `exit 0`, so billing NEVER stops!), (2) **`OnFailure`** (ideal for idempotent batch jobs—restarts ONLY on non-zero exit code, and transitions to `Succeeded` / **stops billing** as soon as the container exits with `0`!), and (3) **`Never`** (runs at most once; stops billing upon exit regardless of exit code).',
    awsComparison:
      'Equivalent to Kubernetes Job `restartPolicy: OnFailure` vs Deployment `Always`—critical for stopping per-second serverless container billing on batch jobs!'
  },
  {
    id: 'az104-a3-033',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'ACI Persistent Volume Mounts via Azure Files',
    difficulty: 2,
    format: 'single',
    prompt:
      'Because container filesystems in **Azure Container Instances (ACI)** are stateless and ephemeral across container restarts, your team wants to mount persistent Azure Storage directly into an ACI container at `/mnt/invoices`. Which storage service and container configuration are supported for persistent volume mounts in ACI?',
    options: [
      'Mounting an **Azure Blob Storage** container directly on either Windows or Linux containers.',
      'Mounting an **Azure Managed Ultra Disk** on Windows Server Core ACI containers.',
      'Mounting an **Azure Files SMB share** (`azureFile` volume)—supported **ONLY on Linux containers**, requiring the container process to run as **`root`**, and limited to CIFS/SMB shares.',
      'Mounting an **Azure Queue Storage** endpoint as a POSIX character device.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Memorize all three ACI persistent storage exam constraints: (1) **Azure Files SMB ONLY** (NEVER Blob Storage or Managed Disks!), (2) **Linux containers ONLY** (NOT Windows ACI!), and (3) container must run as **`root`**!',
    explanation:
      'Azure Container Instances supports persistent external storage mounts **exclusively via Azure Files SMB shares** (plus ephemeral `emptyDir`, `secret` RAM volumes, and `gitRepo` clones). Official AZ-104 limitations for `azureFile` mounts in ACI: (1) **Linux containers ONLY** (Windows containers cannot mount Azure Files in ACI!), (2) Container must run as **`root`**, (3) Limited to CIFS/SMB protocol, and (4) **Azure Blob Storage cannot be mounted** natively as an ACI volume.',
    awsComparison:
      'Just like **AWS Fargate Tasks** mount **Amazon EFS** file shares rather than EBS volumes or raw S3 buckets—with the specific Azure exam twist that ACI `azureFile` mounts require **Linux + root**!'
  },
  {
    id: 'az104-a3-034',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'ACI Networking, Secret Volumes & VNet Delegation',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'You are reviewing security and networking specifications for **Azure Container Instances (ACI)** deployments. Evaluate each statement.',
    statements: [
      {
        statement:
          'Two sidecar containers running inside the same ACI Container Group can both bind and listen on `0.0.0.0:8080` at the same time.',
        answer: false
      },
      {
        statement:
          'Mounting a **`secret` volume** in an ACI Container Group stores sensitive certificates/keys in memory-backed `tmpfs` storage so secret files are never written to persistent disk.',
        answer: true
      },
      {
        statement:
          'Deploying an ACI Container Group with a private IP inside an Azure Virtual Network requires placing it in a dedicated subnet **delegated exclusively** to `Microsoft.ContainerInstance/containerGroups`.',
        answer: true
      }
    ],
    awsBridgeHint:
      '(1) Shared pod loopback = port collision if two containers bind `:8080`! (2) `secret` volume = RAM-only `tmpfs`! (3) VNet-injected ACI requires subnet delegation to `Microsoft.ContainerInstance/containerGroups` (and remember: VNet-injected ACI cannot simultaneously get a direct ACI Public IP—front it with App Gateway / NAT Gateway if needed)!',
    explanation:
      '1) No: Because all containers in a Container Group share one network namespace, port mappings cannot collide. 2) Yes: ACI `secret` volumes decode Base64 secret payloads into an in-memory `tmpfs` mount readable by containers in the group without touching disk. 3) Yes: VNet-deployed Container Groups require a subnet delegated to `Microsoft.ContainerInstance/containerGroups` containing no other resource types.',
    awsComparison:
      'Unlike AWS Fargate where tasks can coexist in the same subnet as EC2 instances and ALBs, Azure PaaS VNet injection (App Service, ACI, Container Apps) frequently uses **Subnet Delegation** dedicating a CIDR slice to one resource provider.'
  },
  {
    id: 'az104-a3-035',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Azure Container Apps (ACA) Revision Modes & Traffic Splitting',
    difficulty: 2,
    format: 'single',
    prompt:
      'You host a containerized checkout API on **Azure Container Apps (ACA)**. Whenever your team deploys a new container image tag (`v2`), you want `v1` to remain warm and active alongside `v2` so you can split live HTTPS ingress **`85%` to `v1` and `15%` to `v2`** before promoting `v2` to `100%`. Which Container App setting must be enabled?',
    options: [
      'Container Restart Policy = `OnFailure`',
      'Active Revision Mode = `Single`',
      'AKS `System` Node Pool Taint',
      'Active Revision Mode = **`Multiple`** (configuring weighted HTTP ingress traffic splitting across active revisions)'
    ],
    correctIndices: [3],
    awsBridgeHint:
      '**Azure Container Apps** (built on serverless Kubernetes + Envoy + KEDA + Dapr) has two Revision Modes: `Single` (auto-retires old revision upon rollout) vs **`Multiple`** (keeps multiple revisions live for Envoy weighted canary/blue-green traffic splitting, just like AWS App Runner / Lambda Aliases)!',
    explanation:
      'Every update to a template section (`image`, `env`, `resources`, `scale`) in **Azure Container Apps** creates an immutable **Revision**. In **`Single` revision mode** (default), ACA spins up the new revision and automatically deactivates the old revision once healthy. Switching to **`Multiple` revision mode** lets multiple revisions stay active simultaneously and unlocks Envoy-powered **Traffic Splitting** by percentage (`85% / 15%`) or revision label URLs!',
    awsComparison:
      '**Azure Container Apps** sits right between **AWS App Runner** and **EKS Fargate**—giving you Envoy revision traffic splitting, KEDA event-driven scale-to-zero, and Dapr microservices APIs with zero Kubernetes cluster management.'
  },
  {
    id: 'az104-a3-036',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'ACA KEDA Scaling Rules & Scale-to-Zero Limitation',
    difficulty: 3,
    format: 'single',
    prompt:
      'To minimize dev/staging cloud bills, you want your **Azure Container Apps (ACA)** services to **scale all the way down to `0` replicas (`minReplicas: 0`)** overnight when completely idle, waking up automatically when work arrives. You test three KEDA scale rules: (1) an **HTTP** concurrent requests rule, (2) an **Azure Service Bus Queue** message-count rule, and (3) a **CPU Utilization (`70%`)** custom rule. What happens when you try to set `minReplicas: 0` across all three?',
    options: [
      '**HTTP** and **Event-driven (Azure Queue / Service Bus / Kafka)** rules support **`minReplicas: 0` (scale-to-zero)**, whereas **CPU and Memory** scaling rules **CANNOT scale to zero** (forcing `minReplicas >= 1` because a 0-replica app emits zero CPU/RAM metrics to wake itself back up!).',
      'All three rules (HTTP, Service Bus, and CPU) scale down to `0` replicas.',
      'Only CPU rules support `minReplicas: 0`, while HTTP rules require `minReplicas >= 2`.',
      'Azure Container Apps never supports scaling below `1` replica.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Think physics of telemetry! Envoy proxy can observe an incoming HTTP request (`0 -> 1`) and KEDA can poll a non-empty SQS/Service Bus queue (`0 -> 1`), whereas **0 running containers emit NO CPU or Memory utilization**, so CPU/Memory scalers ALWAYS mandate `minReplicas >= 1`!',
    explanation:
      'Classic AZ-104 Container Apps exam distinction! ACA uses **KEDA (Kubernetes Event-Driven Autoscaling)** under the hood: **HTTP** rules (concurrent requests) and **Event-driven** KEDA scalers (Azure Storage Queues, Service Bus, Event Hubs, Kafka, Cron) support **`minReplicas: 0`** (true serverless scale-to-zero!). By contrast, **CPU** and **Memory** KEDA scalers (`cpu` / `memory`) strictly require **`minReplicas >= 1`**.',
    awsComparison:
      'Huge win over **AWS App Runner** (which always bills idle provisioned memory on minimum 1 instance and never scales to true 0 instances) and **ECS Service Auto Scaling** on CPU target tracking!'
  },
  {
    id: 'az104-a3-037',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'ACA Container Apps Environment & Ingress Visibility',
    difficulty: 2,
    format: 'single',
    prompt:
      'Inside a single VNet-integrated **Azure Container Apps Environment (`cae-prod`)**, you deploy three microservices: `frontend-ui` (called by public internet browsers over HTTPS), `orders-grpc` (called ONLY over HTTP/2 by `frontend-ui` inside `cae-prod` and private VNet peers), and `invoice-worker` (which only pulls messages outbound from Azure Queue Storage and exposes zero network ports). How should **Ingress** be configured on each Container App?',
    options: [
      'Enable `External` ingress on all three apps and filter with `robots.txt`.',
      '`frontend-ui`: **Ingress Enabled (`External` / Accepting traffic from anywhere)**; `orders-grpc`: **Ingress Enabled (`Internal` / Limited to Container Apps Environment & VNet)**; `invoice-worker`: **Ingress Disabled**.',
      '`frontend-ui`: Ingress Disabled; `orders-grpc`: External; `invoice-worker`: Internal.',
      'Deploy three separate Container Apps Environments because External and Internal apps cannot share an Environment.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'A **Container Apps Environment** is the shared security/VNet/Log Analytics boundary (like an ECS Cluster + Service Connect namespace), where each individual app independently picks `External`, `Internal`, or `Disabled` ingress!',
    explanation:
      'All Container Apps inside the same **Container Apps Environment** share the same virtual network boundary, Dapr service discovery mesh, and observability destination, while configuring **Ingress** per app: **`External`** (`external: true` — public FQDN with managed TLS), **`Internal`** (`external: false` — private FQDN reachable ONLY from fellow apps in the Environment or connected VNet clients), or **Ingress Disabled** (zero inbound ports—pure background queue/stream workers!).',
    awsComparison:
      'Cleaner than juggling public ALBs, internal ALBs, and ALB-less ECS Fargate services separately—ACA toggles `External`, `Internal`, and `Disabled` ingress per service inside one Environment.'
  },
  {
    id: 'az104-a3-038',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Passwordless Image Pulls from Azure Container Registry (ACR)',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'Your security team disabled the legacy **Admin user** (`adminUserEnabled: false`) on your private **Azure Container Registry (`acrcontoso.azurecr.io`)** to eliminate shared static passwords. You need both an **Azure Container App** and an **Azure Kubernetes Service (AKS)** cluster in the same tenant to pull container images seamlessly from `acrcontoso`. Which TWO practices follow Microsoft’s recommended passwordless architecture?',
    options: [
      'Assign a **User-Assigned (or System-Assigned) Managed Identity** to the Azure Container App and grant that identity the built-in **`AcrPull`** RBAC role scoped to `acrcontoso`.',
      'Make `acrcontoso` an anonymous public registry so no credentials are needed.',
      'Link AKS to `acrcontoso` via **`az aks update --name aks-prod --resource-group rg-aks --attach-acr acrcontoso`** (which grants the AKS cluster’s **`kubelet` Managed Identity** the **`AcrPull`** RBAC role on `acrcontoso`).',
      'Store a `Global Administrator` password inside a Kubernetes `ConfigMap`.'
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Zero `imagePullSecrets` needed! Granting **`AcrPull`** to ACA’s Managed Identity and AKS’s **`kubelet` Managed Identity** (`--attach-acr`) works just like an **ECS Task Execution Role / EKS Node IAM Role** having `ecr:GetDownloadUrlForLayer`!',
    explanation:
      'Disabling the ACR Admin account (`adminUserEnabled: false`) is a core security best practice. Both **Azure Container Apps** (via `--registry-identity` + **`AcrPull`**) and **AKS** (via `az aks create/update --attach-acr <acrName>`, which assigns **`AcrPull`** to the AKS **`kubelet` identity**—note: `kubelet` identity pulls images on nodes, NOT the cluster control-plane identity!) pull private images via short-lived Microsoft Entra Managed Identity tokens without static Kubernetes `docker-registry` secrets!',
    awsComparison:
      'Watch the subtle AKS identity split if tested: AKS has TWO Managed Identities—the **Cluster (Control Plane) Identity** (manages Load Balancers/Disks) and the **`kubelet` Identity** (runs on nodes and needs **`AcrPull`** to pull images from ACR, just like the EKS Worker Node IAM Role pulling from ECR!).'
  },
  {
    id: 'az104-a3-039',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'AKS System Node Pools vs User Node Pools',
    difficulty: 2,
    format: 'single',
    prompt:
      'You manage a hybrid Windows/Linux **Azure Kubernetes Service (AKS)** cluster running `.NET Framework` Windows Server containers during business hours (`08:00–18:00`) that must scale down to **`0` Windows nodes** overnight to save licensing/compute costs. Which statement accurately distinguishes AKS **`System` node pools** from **`User` node pools**?',
    options: [
      'A `System` node pool can run Windows Server 2022 and scale down to `0` nodes overnight.',
      'AKS clusters do not require a `System` node pool if `User` node pools are present.',
      'Every AKS cluster requires **at least one `System` node pool** running **Linux** with **at least 1 active node** (hosting critical cluster pods like `coredns`, `metrics-server`, and `konnectivity-agent`), whereas **`User` node pools** support **Linux OR Windows Server** and **CAN scale down to `0` nodes**!',
      'Both `System` and `User` node pools require a minimum of 3 running nodes at all times.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Just like **Amazon EKS Windows support** ALWAYS requires at least one **Linux** node to run `coredns` / cluster add-ons while Windows managed node groups can scale `0 <-> N`, AKS mandates **`System` pool = Linux ONLY (`minCount >= 1`)** and **`User` pool = Linux or Windows (`minCount >= 0`)**!',
    explanation:
      'Memorize this AZ-104 AKS node pool table: **`System` node pools** host essential `kube-system` pods (`coredns`, `konnectivity`, `metrics-server`), MUST run **Linux** (never Windows!), and must keep **at least 1 node** across the cluster (2+ recommended for production SLA). **`User` node pools** run your business workloads, support **Linux or Windows**, and support scaling down to **`0` nodes** (`--enable-cluster-autoscaler --min-count 0`)!',
    awsComparison:
      '100% identical to **Amazon EKS**: Linux system node group (`>= 1` for CoreDNS) + Windows/GPU application node groups scaling cleanly down to `0`.'
  },
  {
    id: 'az104-a3-040',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Isolating AKS System Node Pools with Taints',
    difficulty: 2,
    format: 'single',
    prompt:
      'Memory-hungry developer pods keep getting scheduled by `kube-scheduler` onto your AKS **`System` node pool**, causing Out-Of-Memory (`OOMKilled`) evictions of `coredns` and cluster-wide DNS outages! Which built-in AKS node pool configuration blocks application pods from scheduling onto the `System` node pool while allowing critical system add-on pods to run normally?',
    options: [
      'Delete the `System` node pool after cluster creation.',
      'Place a `ReadOnly` Azure Resource Lock on the `MC_` node resource group.',
      'Switch the cluster network plugin to `Kubenet`.',
      'Apply the **`CriticalAddonsOnly=true:NoSchedule`** node taint to the `System` node pool (`--node-taints CriticalAddonsOnly=true:NoSchedule`) while ensuring at least one `User` node pool exists for application pods.'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Standard Kubernetes taint/toleration hygiene promoted to a first-class AKS flag: system add-ons (`coredns`) already ship with a built-in toleration for **`CriticalAddonsOnly=true:NoSchedule`**, whereas regular app pods lack that toleration and land cleanly on `User` node pools!',
    explanation:
      'By default, AKS schedules application pods onto a `System` node pool if untainted (so single-pool dev clusters work out of the box). In production clusters with dedicated `User` node pools, setting **`--node-taints CriticalAddonsOnly=true:NoSchedule`** on the `System` node pool repels all untolerated application pods while built-in `kube-system` critical pods automatically tolerate `CriticalAddonsOnly`!',
    awsComparison:
      'Matches the exact Kubernetes `CriticalAddonsOnly=true:NoSchedule` taint pattern used on dedicated system node groups in **Amazon EKS**.'
  },
  {
    id: 'az104-a3-041',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'AKS Networking: Azure CNI vs Azure CNI Overlay vs Kubenet',
    difficulty: 3,
    format: 'yes-no',
    prompt:
      'Your networking team only has a small **`/26`** IPv4 subnet (`64` total IPs, `59` usable IPs in Azure!) left in `vnet-spoke`, yet your new **Azure Kubernetes Service (AKS)** cluster needs to run **20 nodes and 600 Pods** (including **Windows Server** containers!). Evaluate each AKS networking statement.',
    statements: [
      {
        statement:
          'Traditional flat **`Azure CNI`** assigns a real Azure Virtual Network subnet IPv4 address to **every Pod** (pre-allocating/consuming VNet IPs per node/pod), which would immediately exhaust a `/26` subnet when scaling to 600 Pods.',
        answer: true
      },
      {
        statement:
          '**`Azure CNI Overlay`** assigns VNet subnet IPs **ONLY to the AKS Nodes** (`20` IPs, fitting comfortably inside a `/26`!) while allocating all 600 Pod IPs from an isolated private overlay CIDR (e.g., `10.244.0.0/16`) that can be reused across multiple AKS clusters.',
        answer: true
      },
      {
        statement:
          'Choosing legacy **`Kubenet`** networking allows you to add **Windows Server** node pools to the AKS cluster.',
        answer: false
      }
    ],
    awsBridgeHint:
      'Compare **AWS EKS VPC CNI** (consumes real VPC subnet IPs per Pod -> IP exhaustion in small `/26` subnets!) vs **EKS VPC CNI Custom Networking / Cilium Overlay** (**`Azure CNI Overlay`**!)—and remember **`Kubenet` NEVER supports Windows Server nodes**!',
    explanation:
      '1) Yes: Traditional **Azure CNI** gives every Pod a first-class routable VNet IP—great for direct Pod IP addressability, terrible for tight RFC1918 VNet IP budgets! 2) Yes: **`Azure CNI Overlay`** (Microsoft’s modern recommended default!) gives VNet subnet IPs *only* to VM nodes while routing Pod IPs (`10.244.0.0/16` overlay) across Azure’s SDN fabric without UDR route-table limits—and supports **Windows node pools**! 3) No: Legacy **`Kubenet`** relies on Linux bridge + Azure Route Table UDRs (capping around 400 routes/nodes) and **does NOT support Windows Server node pools**.',
    awsComparison:
      'Every AWS Solutions Architect who has fought **EKS `aws-node` VPC CNI IPv4 subnet exhaustion** on `/24` subnets will instantly appreciate why **`Azure CNI Overlay`** vs flat **`Azure CNI`** is tested heavily on AZ-104!'
  },
  {
    id: 'az104-a3-042',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'AKS Horizontal Pod Autoscaler (HPA) vs Cluster Autoscaler',
    difficulty: 2,
    format: 'single',
    prompt:
      'During a flash sale on your **AKS** cluster, traffic triples. First, the **Horizontal Pod Autoscaler (HPA)** increases your `checkout-api` Deployment from `4` Pods to `24` Pods, and `14` of those new Pods remain stuck in **`Pending`** state with `0/3 nodes are available: Insufficient cpu`. Which component detects those **`Pending`** unschedulable Pods and automatically adds new VM instances to the underlying AKS node pool—and what signal triggers it?',
    options: [
      'The **AKS Cluster Autoscaler**—which is triggered specifically by **unschedulable `Pending` Pod resource requests** (`requests.cpu` / `requests.memory`), **NOT** by raw host VM CPU percentage!',
      'Azure Monitor VMSS CPU Autoscale—which you should enable simultaneously on the `MC_` VMSS alongside Cluster Autoscaler.',
      'The Horizontal Pod Autoscaler (HPA) directly creates new Azure Virtual Machines.',
      'Azure Traffic Manager.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Exact same rule as **Kubernetes Cluster Autoscaler / Karpenter on EKS**: HPA scales **Pods** based on metrics; **Cluster Autoscaler** scales **Nodes** based strictly on **unschedulable `Pending` Pod `requests`**—and NEVER enable separate Azure Monitor VMSS Autoscale alongside AKS Cluster Autoscaler (they fight each other)!',
    explanation:
      'In AKS, autoscaling operates at two coordinated layers: (1) **Horizontal Pod Autoscaler (HPA)** (or KEDA) watches Pod CPU/memory/custom metrics and adjusts Deployment replica counts; (2) **Cluster Autoscaler** (`--enable-cluster-autoscaler --min-count 3 --max-count 15`) watches the Kubernetes API scheduler for **`Pending` Pods** that cannot fit on existing nodes based on Pod `resources.requests`, adding VMSS nodes to fit them and cordoning/draining underutilized nodes later. Warning: **Never** configure standalone Azure Monitor VMSS Autoscale rules on an AKS-managed `MC_` VMSS!',
    awsComparison:
      'Identical to **EKS HPA + Kubernetes Cluster Autoscaler**: `Pending` pods drive node scale-out, and modifying the backing ASG scaling policies directly outside Cluster Autoscaler causes race conditions.'
  },
  {
    id: 'az104-a3-043',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Fetching AKS Kubeconfig Credentials via Azure CLI',
    difficulty: 1,
    format: 'single',
    prompt:
      'You just provisioned a new **Azure Kubernetes Service (AKS)** cluster named `aks-payments` in resource group `rg-containers`. Which Azure CLI command downloads the cluster connection certificate/token configuration and merges it into your local `~/.kube/config` file so `kubectl get nodes` works immediately?',
    options: [
      '`az aks connect --name aks-payments --resource-group rg-containers`',
      '**`az aks get-credentials --resource-group rg-containers --name aks-payments`**',
      '`az vm run-command invoke --name aks-payments --command-id GetKubeConfig`',
      '`kubectl config create-context aks-payments`'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Azure CLI’s exact counterpart to `aws eks update-kubeconfig --name <cluster> --region <region>` is **`az aks get-credentials -g <rg> -n <cluster>`**!',
    explanation:
      'Running **`az aks get-credentials --resource-group rg-containers --name aks-payments`** fetches the cluster API server endpoint and Entra/certificate credentials via ARM and merges the context into `~/.kube/config` (pass `--admin` only for break-glass local cluster-admin certificate access when local accounts aren’t disabled).',
    awsComparison:
      '`aws eks update-kubeconfig --name aks-payments` (AWS) <-> **`az aks get-credentials -g rg-containers -n aks-payments`** (Azure)!'
  },
  {
    id: 'az104-a3-044',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'AKS PersistentVolumeClaims: Azure Disk (RWO) vs Azure Files (RWX)',
    difficulty: 2,
    format: 'single',
    prompt:
      'A CMS Deployment running **6 replicas spread across 3 Availability Zones** inside **AKS** requires all 6 Pods to mount and write to the **exact same shared persistent directory simultaneously** (`accessModes: [ReadWriteMany]`). When a developer specifies `storageClassName: managed-csi` (Azure Managed Disks), Pods on nodes 2 and 3 fail to start with `Multi-Attach error for volume`! Why, and which built-in AKS StorageClass solves this?',
    options: [
      'Azure Managed Disks must be formatted as FAT32 for multi-node mounts.',
      'Switch to `managed-csi-premium` so Azure Disks mount across 3 AZs simultaneously.',
      'Standard **Azure Managed Disks (`managed-csi` / `disk.csi.azure.com`)** are block devices supporting **`ReadWriteOnce (RWO)`** (mounted on one node in one AZ); concurrent multi-node/multi-AZ **`ReadWriteMany (RWX)`** requires **`azurefile-csi`** or **`azurefile-csi-premium`** (**Azure Files** SMB / NFS 4.1)!',
      'Kubernetes does not support `ReadWriteMany` volumes in Azure.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Exact same storage physics as **EKS EBS CSI Driver (`ReadWriteOnce` single-node/single-AZ) vs EFS CSI Driver (`ReadWriteMany` multi-node/multi-AZ)**! In AKS: **`managed-csi` (Azure Disk) = `RWO`**; **`azurefile-csi` (Azure Files) = `RWX`**!',
    explanation:
      'Know the two primary built-in CSI drivers in AKS: (1) **`managed-csi` / `managed-csi-premium`** (`disk.csi.azure.com` — Azure Managed Disks) provides low-latency block storage mounted as **`ReadWriteOnce (RWO)`** to a single AKS node; (2) **`azurefile-csi` / `azurefile-csi-premium`** (`file.csi.azure.com` — Azure Files over SMB or NFS 4.1) provides shared network file storage supporting **`ReadWriteMany (RWX)`** concurrently across many nodes and Availability Zones!',
    awsComparison:
      '1-to-1 match: **EBS CSI (`gp3` `RWO`)** ≈ **`managed-csi` (Azure Disk `RWO`)**; **EFS / FSx CSI (`RWX`)** ≈ **`azurefile-csi` (Azure Files `RWX`)**.'
  },
  {
    id: 'az104-a3-045',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'ARM Template JSON Top-Level Schema & Mandatory Elements',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'You are reviewing a raw **Azure Resource Manager (ARM) JSON template** generated for an audit repository. Which TWO statements accurately describe top-level ARM JSON structure (`$schema`, `contentVersion`, `parameters`, `variables`, `functions`, `resources`, `outputs`)?',
    options: [
      'The **three mandatory** top-level properties required in every valid ARM JSON template are **`$schema`**, **`contentVersion`**, and **`resources`** (while `parameters`, `variables`, `functions`, and `outputs` are optional).',
      '`contentVersion` must strictly match the official Azure REST API release date (such as `"2024-03-01"`) or Azure Resource Manager rejects the deployment.',
      '`contentVersion` is an arbitrary **author-defined version string** (such as `"1.0.0.0"` or `"2.1.0"`) used by template authors to track template revisions and validate linked template versions—ARM accepts any valid string format!',
      'Secret values returned inside the `outputs` section are automatically redacted from the Azure Portal Deployment History.'
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Two classic AZ-104 ARM JSON exam facts: (1) Mandatory skeleton = **`$schema` + `contentVersion` + `resources`**, and (2) `contentVersion` (`"1.0.0.0"`) is YOUR template revision string (individual resources have their own `apiVersion: "2023-09-01"`!), AND **NEVER put secrets in `outputs`** because ARM logs `outputs` in cleartext!',
    explanation:
      '1) Correct: Minimal valid ARM JSON requires only `$schema`, `contentVersion`, and `resources: []`. 3) Correct: Unlike each resource’s `apiVersion` (which must match an actual Azure Resource Provider API date like `"2023-05-01"`), top-level **`contentVersion`** is completely controlled by you (e.g., `"1.0.0.0"`) so parent deployments can assert they are calling the expected version of a linked template. Also remember: **never** emit connection strings or keys in `outputs`, as anyone with `Reader` on the deployment can read cleartext `outputs`!',
    awsComparison:
      '`$schema` + `contentVersion` ≈ CloudFormation `AWSTemplateFormatVersion: "2010-09-09"`, except ARM requires `contentVersion` while CloudFormation only strictly requires `Resources`.'
  },
  {
    id: 'az104-a3-046',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'ARM / Bicep Deployment Modes: Incremental vs Complete',
    difficulty: 2,
    format: 'single',
    prompt:
      'Resource Group `rg-ecommerce` currently contains three live production resources: `vnet-shop`, `sql-shop`, and `stshopmedia` (none of which have Resource Locks). A developer writes a small Bicep file (`redis.bicep`) declaring **ONLY** a new Azure Cache for Redis (`redis-shop`), and runs:\n`az deployment group create --resource-group rg-ecommerce --template-file redis.bicep --mode Complete`\nWhat is the immediate result in `rg-ecommerce`?',
    options: [
      '`redis-shop` is added alongside `vnet-shop`, `sql-shop`, and `stshopmedia` without touching existing resources.',
      'The command fails because `--mode Complete` is only valid at the Subscription scope.',
      '`redis-shop` is previewed in dry-run mode without modifying `rg-ecommerce`.',
      '`redis-shop` is created, AND **`vnet-shop`, `sql-shop`, and `stshopmedia` are PERMANENTLY DELETED** because **`Complete` mode** deletes every resource in the target Resource Group that is not declared in the template!'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'CRITICAL AZ-104 WARNING! Unlike CloudFormation (which tracks stack membership individually so two small stacks in one account never delete each other), an ARM Resource Group deployment in **`Complete` mode** treats the **entire Resource Group** as the desired-state boundary and **wipes every unlisted resource in that RG**!',
    explanation:
      'Memorize this high-stakes AZ-104 difference: (1) **`Incremental` mode** (the **default** whenever `--mode` is omitted!) adds new resources and updates properties of existing resources declared in the template while leaving unlisted resources in the Resource Group **untouched**; (2) **`Complete` mode** makes the template the authoritative source of truth for the **entire Resource Group**—**deleting any existing resource in that RG omitted from the template** (unless blocked by a `CanNotDelete` or `ReadOnly` lock)! Note: For modern stack-level lifecycle tracking without nuking unrelated RG peers, Microsoft introduced **Azure Deployment Stacks** (`az stack group create`).',
    awsComparison:
      'Massive migration trap for AWS engineers! In AWS, a CloudFormation stack only deletes resources removed *from that specific stack*; in Azure, `az deployment group create --mode Complete` deletes **everything else in the entire Resource Group**!'
  },
  {
    id: 'az104-a3-047',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Validating Infrastructure Changes with Deployment What-If',
    difficulty: 1,
    format: 'sequence',
    prompt:
      'Your SRE change-control board requires previewing exact resource additions, property mutations, and potential deletions (`Create`, `Modify`, `Delete`, `NoChange`, `Ignore`) against live Azure state **before** executing a Bicep deployment to `rg-core`. Put the deployment workflow steps in the correct sequence.',
    correctSequence: [
      'Author the declarative Bicep template (`main.bicep`) and environment parameter file (`prod.bicepparam` or `prod.parameters.json`).',
      'Run **`az deployment group what-if --resource-group rg-core --template-file main.bicep --parameters prod.bicepparam`** (or `New-AzResourceGroupDeployment -WhatIf`).',
      'Review the color-coded `what-if` diff report in pull-request review to verify only intended `Create` / `Modify` changes appear and zero unexpected `Delete` actions occur.',
      'Execute **`az deployment group create --resource-group rg-core --template-file main.bicep --parameters prod.bicepparam`** to apply the validated changes.'
    ],
    awsBridgeHint:
      '`az deployment group what-if` (`-WhatIf`) is Azure’s direct built-in equivalent to `terraform plan` or **AWS CloudFormation Change Sets**!',
    explanation:
      'Unlike simple static syntax linting (`az bicep build` or `az deployment group validate`), **`what-if`** (`az deployment group what-if` / `New-AzResourceGroupDeployment -WhatIf`) compares your compiled template against **live Azure Resource Manager state** and prints a color-coded preview (`+ Create`, `~ Modify`, `- Delete`, `= NoChange`, `* Ignore`) in either `Incremental` or `Complete` mode without mutating any resources!',
    awsComparison:
      '`az deployment group validate` ≈ `aws cloudformation validate-template` (syntax/API check); **`az deployment group what-if`** ≈ **CloudFormation Change Set / `terraform plan`** (live state diff).'
  },
  {
    id: 'az104-a3-048',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Bicep Symbolic References, Implicit dependsOn & existing Keyword',
    difficulty: 2,
    format: 'single',
    prompt:
      'In a Bicep file (`app.bicep`), you need to look up an **already-deployed** Virtual Network (`vnet-shared`) located in **another Resource Group (`rg-network`)** without recreating or modifying it, and attach a brand-new Network Interface (`nic-01`) to its `snet-app` subnet in the right provisioning order. Which Bicep syntax features handle both cleanly?',
    options: [
      'Declare `resource vnet \'Microsoft.Network/virtualNetworks@2023-09-01\' existing = { name: \'vnet-shared\', scope: resourceGroup(\'rg-network\') }`, and reference `vnet`’s subnet symbolically inside `nic-01`—Bicep automatically generates **implicit `dependsOn`** ordering whenever one resource references another’s symbolic name!',
      'Hardcode raw subscription GUID strings and write manual `[resourceId(...)]` brackets inside `dependsOn` arrays because Bicep lacks symbolic names.',
      'Use `--mode Complete` on `rg-network` so `vnet-shared` is imported.',
      'Bicep cannot reference resources outside the current Resource Group.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Two superpowers that make **Bicep** feel like **Terraform (`data` sources + implicit graph dependencies)** instead of verbose ARM JSON: the **`existing`** keyword (`data` lookup!) + **symbolic resource names** generating automatic `dependsOn`!',
    explanation:
      'Bicep eliminates two of raw ARM JSON’s biggest headaches: (1) The **`existing`** keyword (`resource kv \'Microsoft.KeyVault/vaults@2023-07-01\' existing = { name: \'kv-01\', scope: resourceGroup(\'rg-sec\') }`) performs a read-only lookup of a pre-existing resource (even across Resource Groups via `scope:`!), and (2) referencing `myVnet.properties.subnets[0].id` via its **symbolic name** automatically builds the **implicit `dependsOn`** graph in compiled ARM JSON—so manual `dependsOn: [...]` arrays are only needed when no property reference exists!',
    awsComparison:
      'Bicep **`existing`** ≈ Terraform **`data "aws_vpc" "shared"`** / CloudFormation `Fn::ImportValue`; Bicep **symbolic name implicit dependency** ≈ Terraform resource graph inference!'
  },
  {
    id: 'az104-a3-049',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Bicep @secure() Decorator, Modules & CLI Decompilation',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Your platform team is migrating legacy ARM JSON templates to **Bicep** modules. Evaluate each of the following statements.',
    statements: [
      {
        statement:
          'Marking a Bicep parameter with the **`@secure()`** decorator (`@secure() param adminPassword string`) prevents Azure Resource Manager from logging or returning the parameter value in Deployment History or terminal output.',
        answer: true
      },
      {
        statement:
          'A Bicep **`module`** (`module web \'./modules/webapp.bicep\' = { name: \'deployWeb\', scope: resourceGroup(\'rg-spoke\'), params: { ... } }`) compiles into a nested ARM deployment (`Microsoft.Resources/deployments`) and can deploy resources into a different Resource Group or Subscription via `scope:`.',
        answer: true
      },
      {
        statement:
          'Azure Resource Manager requires you to install a separate state-file database (like a `.tfstate` blob container) before `az deployment group create --template-file main.bicep` can run.',
        answer: false
      }
    ],
    awsBridgeHint:
      '(1) `@secure()` = CloudFormation `NoEcho: true` (`secureString` / `secureObject`)! (2) Bicep `module` = reusable nested stack supporting cross-RG/cross-Sub `scope:`! (3) Like CloudFormation (and UNLIKE Terraform!), Bicep has **ZERO external `.tfstate` file**—Azure Resource Manager itself is the live state engine!',
    explanation:
      '1) Yes: `@secure()` compiles to ARM `"type": "secureString"` (or `"secureObject"`), masking secrets everywhere in ARM logs (and can dynamically pull secrets straight from Key Vault inside a parameter file via `getSecret()`!). 2) Yes: Bicep **`module`** files encapsulate reusable patterns and compile cleanly into standard ARM nested `Microsoft.Resources/deployments`, supporting `scope: subscription(...)` or `scope: resourceGroup(...)`. 3) No: Azure CLI (`az`) includes the Bicep compiler natively, transpiling `.bicep` to ARM JSON in memory and submitting directly to ARM with **zero client state file** to lock or corrupt!',
    awsComparison:
      'Huge operational perk of **Bicep** over Terraform: Terraform syntax ergonomics (`param`, `var`, `resource`, `module`, `existing`) + CloudFormation’s **zero-state-file** server-side ARM execution!'
  },
  {
    id: 'az104-a3-050',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Sharing Governed Templates via Azure Template Specs',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your Cloud Center of Excellence maintains golden, compliance-approved ARM/Bicep templates (`1.0`, `1.1`, `2.0`) and wants product teams across 25 subscriptions to deploy them via `az deployment group create --template-spec <id>` gated strictly by **Azure RBAC (`Reader`)**—without hosting public GitHub URLs or managing expiring Storage Account SAS tokens for linked templates. Which native Azure Resource Manager resource is built for this?',
    options: [
      'Azure Compute Gallery',
      '**Azure Template Specs** (`Microsoft.Resources/templateSpecs`)',
      'Custom Script Extension',
      'Azure App Configuration'
    ],
    correctIndices: [1],
    awsBridgeHint:
      '**Azure Template Specs** (and Bicep Private Module Registries in ACR) are Azure’s direct counterpart to **AWS Service Catalog / CloudFormation Private Registry Modules**!',
    explanation:
      'An **Azure Template Spec** (`az ts create` / `New-AzTemplateSpec`) packages a main ARM/Bicep template **plus any linked child templates/modules** into a versioned first-class Azure resource (`Microsoft.Resources/templateSpecs/versions`) stored directly inside Azure! Because it is a real ARM resource, you share it across subscriptions simply by granting teams standard **`Reader`** Azure RBAC—eliminating Storage Account SAS token management completely!',
    awsComparison:
      'Direct counterpart to **AWS Service Catalog Products / CloudFormation Modules**, governed natively by cloud RBAC.'
  },
  {
    id: 'az104-a3-051',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Deterministic Naming with uniqueString()',
    difficulty: 2,
    format: 'single',
    prompt:
      'Because Azure Storage Account names must be globally unique (`3–24` lowercase alphanumeric chars), a developer writes a Bicep template using `var stgName = \'st${uniqueString(resourceGroup().id)}\'` and runs `az deployment group create` **three times in a row** against `rg-analytics`. How many Storage Accounts exist in `rg-analytics` after the third run?',
    options: [
      '3 Storage Accounts, because `uniqueString()` generates a random UUID on every run.',
      '0 Storage Accounts, because `uniqueString()` contains uppercase letters and hyphens.',
      '**1 Storage Account**—`uniqueString(resourceGroup().id)` is a **deterministic** 13-character lowercase alphanumeric hash of its input string, returning the **exact same name** on every deployment to `rg-analytics` for true idempotency!',
      'The second run fails with a duplicate name error.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Don’t let the name `uniqueString()` fool you into thinking "random"! `uniqueString(seed)` is a **deterministic hash** (13 lowercase letters/numbers—perfect for Storage Account naming!) so redeploying the template updates the *same* storage account idempotently instead of creating duplicates!',
    explanation:
      'Classic AZ-104 IaC question! **`uniqueString(resourceGroup().id)`** computes a **deterministic 13-character hash** (lowercase letters and digits, zero hyphens!) from its seed inputs. Re-running the template against the same `resourceGroup().id` produces the **exact same `stgName`**, allowing ARM to idempotently update that single Storage Account rather than creating a brand-new Storage Account on every CI/CD run (which happens if someone misuses `newGuid()` / `utcNow()`!). Note: `uniqueString` is NOT cryptographically collision-proof on its own, so prefixing `st` (`15` chars total) is standard practice.',
    awsComparison:
      'Cleaner than CloudFormation auto-generated random physical IDs when you need predictable, repeatable resource names across idempotent CI/CD pipeline runs.'
  },
  {
    id: 'az104-a3-052',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Declarative Resource Loops in ARM & Bicep',
    difficulty: 1,
    format: 'single',
    prompt:
      'You want a single resource declaration block to dynamically provision `count` identical Managed Data Disks (`disk-0`, `disk-1`, `disk-2`, `disk-3`) based on an integer parameter `diskCount = 4`. Which construct achieves this in raw **ARM JSON** templates versus **Bicep**?',
    options: [
      'A `while` loop inside `variables` in ARM JSON, and `goto` labels in Bicep.',
      'Writing 4 separate hardcoded resource blocks is the only supported approach.',
      'Using `DeployIfNotExists` inside `outputs`.',
      'Adding a **`"copy"` object** (`"copy": { "name": "diskCopy", "count": "[parameters(\'diskCount\')]" }` with `copyIndex()`) on the resource in **ARM JSON**, or using a **`[for i in range(0, diskCount): { ... }]`** loop expression in **Bicep**!'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Whereas classic CloudFormation required `AWS::LanguageExtensions` / Macros (`Fn::ForEach`) just to loop `N` resources, ARM JSON natively provides **`"copy"` + `copyIndex()`** and Bicep provides clean **`[for i in range(0, count): { ... }]`** list comprehensions!',
    explanation:
      'In **ARM JSON**, adding a `"copy"` property (`name`, `count`, optional `"mode": "Serial"` + `"batchSize": 1` if sequential creation is required instead of default parallel!) alongside `[copyIndex()]` stamps out `N` instances of a resource, property, variable, or output. In **Bicep**, **`[for i in range(0, diskCount): { ... }]`** (or `[for item in items: { ... }]` with `@batchSize(1)` decorator for serial deployment) compiles directly down to ARM `"copy"`!',
    awsComparison:
      'Bicep `[for item in list: { ... }]` + `@batchSize(1)` feels just as natural as Terraform `count` / `for_each`, compiling cleanly to native server-side ARM `copy` loops.'
  },
  {
    id: 'az104-a3-053',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Exporting ARM Templates: Live Resource State vs Deployment History',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'A colleague manually clicked through the Azure Portal to build a prototype VM and Key Vault in `rg-proto`, while another Resource Group `rg-cicd` was deployed via a parameterized ARM template last week. You compare **Automation > Export template** on `rg-proto` versus **Deployments > Deployment History > Template** on `rg-cicd`. Which TWO statements are true?',
    options: [
      'Exporting a live Resource Group via **Automation > Export template** generates a verbose snapshot of current live resource properties, **cannot export resource types lacking export schemas or secret/password values**, and typically requires refactoring hardcoded dependencies/parameters before reuse across environments.',
      '**Automation > Export template** exports plaintext VM administrator passwords and Key Vault secret values directly inside `parameters.json`.',
      'Downloading the template from **Deployments > `<deployment-name>` > Template** retrieves the **exact original clean ARM template structure** that was submitted when that deployment ran (prior to manual portal drift).',
      'Exporting a template automatically places a `ReadOnly` lock on the Resource Group.'
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Live **Export template** ≈ **AWS IaC Generator** (reverse-engineers current live API state into verbose JSON, omits plaintext secrets, needs human cleanup!); **Deployment History > Template** = exact original submitted template!',
    explanation:
      '1) Correct: **Automation > Export template** (`Export-AzResourceGroup`) reverse-engineers current resource state from Resource Providers—meaning secrets/passwords are omitted for security, child/default properties are overly verbose, and some resource types don’t support export. (Tip: you can run `az bicep decompile` afterward to refactor it into clean Bicep!). 3) Correct: Inspecting **Deployments** on the RG/Subscription retains up to **800 deployment history entries** (ARM auto-prunes older history entries as you approach the 800-deployment limit per scope!) containing the exact submitted template.',
    awsComparison:
      'Bonus AZ-104 limit worth knowing: ARM caps deployment history at **800 deployments per Resource Group** (newer deployments automatically prune oldest history records once enabled, or used to fail at 800 before auto-deletion!).'
  },
  {
    id: 'az104-a3-054',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'App Service Environment v3 (Isolated v2 Tier)',
    difficulty: 2,
    format: 'single',
    prompt:
      'A national central bank rejects multi-tenant Azure App Service (`Basic`, `Standard`, and `Premium v3`) even with Private Endpoints + Regional VNet Integration, citing a strict regulatory mandate that **all underlying Web App compute hosts and front-end load balancers must run on single-tenant hardware dedicated to the bank and deployed directly inside a subnet of the bank’s own Azure Virtual Network**. Which App Service offering satisfies this?',
    options: [
      '**App Service Environment v3 (ASEv3)** running on the **`Isolated v2` (`I1v2–I6v2`)** App Service Plan tier',
      '`Premium P3mv3` scaled out to 30 instances',
      'Azure Static Web Apps Enterprise',
      '`Shared D1` App Service Plan with IP SSL'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Remember the top rung of the App Service Plan tier ladder (`Free/Shared` -> `Basic` -> `Standard` -> `Premium v3` -> **`Isolated v2` = App Service Environment v3**): single-tenant dedicated PaaS deployed right inside YOUR VNet!',
    explanation:
      'Standard/Premium App Service Plans run worker VMs on shared multi-tenant App Service stamps (connecting into your VNet via Private Endpoints + VNet Integration). **App Service Environment v3 (ASEv3)** (`Isolated v2` SKU: `I1v2`–`I6v2`) deploys a **single-tenant dedicated App Service stamp directly inside a subnet of your own Virtual Network**, supporting up to **200 total App Service Plan instances**, Zone Redundancy, and zero public internet endpoints if configured with an internal VIP!',
    awsComparison:
      'Think **ECS on Dedicated Instances / Single-Tenant VPC PaaS**, giving full App Service developer PaaS ergonomics inside a completely single-tenant VNet boundary.'
  },
  {
    id: 'az104-a3-055',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'App Service Diagnostic Logs: Filesystem Auto-Off vs Blob Storage',
    difficulty: 2,
    format: 'single',
    prompt:
      'To troubleshoot sporadic `500 Internal Server Error` traces on a Windows Web App, an operator turns on **Application logging (Filesystem)** under **Monitoring > App Service logs** on Friday afternoon. By Sunday morning when another `500` error occurs, **no new application trace logs are being written**! Why did logging stop, and what should have been enabled for multi-week log retention?',
    options: [
      'Application logs are deleted whenever Deployment Slots are created.',
      '**Application logging (Filesystem)** is designed purely for temporary live log-streaming (`az webapp log tail`) and **automatically turns itself OFF after 12 hours**; long-term retention requires enabling **Application logging (Blob)** (or streaming Diagnostic Settings to **Log Analytics**)!',
      'Windows Web Apps only log `404` errors, never `500` errors.',
      'Filesystem logs require an Ultra Disk attached to the Web App.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Classic AZ-104 number trap! **Application logging (Filesystem)** auto-disables itself after **exactly 12 hours** so verbose debug logs don’t fill up your `D:\home` quota—always pick **Application logging (Blob)** or **Diagnostic Settings -> Log Analytics** for persistent retention!',
    explanation:
      'Memorize this classic AZ-104 App Service operational detail: **Application logging (Filesystem)** writes to the shared App Service `LogFiles` disk purely to feed real-time **Log stream** debugging and **automatically switches back to `Off` after 12 hours**! To retain application logs indefinitely or enforce a custom retention period (in days), enable **Application logging (Blob)** pointed at an Azure Storage container (or route `AppServiceConsoleLogs` / `AppServiceHTTPLogs` via **Diagnostic Settings** to a **Log Analytics workspace**).',
    awsComparison:
      'Unlike CloudWatch Logs where log groups retain forever by default unless you set a retention policy, App Service `Filesystem` debug logging has a built-in **12-hour safety shutoff**.'
  },
  {
    id: 'az104-a3-056',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Compute Platform Capabilities & Deployment Stacks',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Evaluate each statement comparing Azure container platforms and modern Infrastructure-as-Code lifecycle management.',
    statements: [
      {
        statement:
          'A **Linux** Azure App Service Plan can run **Web App for Containers**, pulling custom single-container Docker images (or multi-container Docker Compose definitions) from Azure Container Registry or Docker Hub.',
        answer: true
      },
      {
        statement:
          '**Azure Container Instances (ACI)** includes a native built-in KEDA horizontal autoscaler that automatically scales 1 Container Group out to 50 Container Groups based on HTTP concurrency.',
        answer: false
      },
      {
        statement:
          '**Azure Deployment Stacks** (`az stack group create`) track a collection of Bicep/ARM-deployed resources across lifecycles—capable of deleting detached ("unmanaged") resources safely WITHOUT wiping unrelated resources in the Resource Group AND applying **Deny Settings** (`denyDelete` / `denyWriteAndDelete`) to block manual drift.',
        answer: true
      }
    ],
    awsBridgeHint:
      '(1) App Service supports custom containers! (2) **ACI has NO native horizontal autoscaler** (that’s **Azure Container Apps** or **AKS**)! (3) **Deployment Stacks** finally bring true **CloudFormation Stack** lifecycle + drift-blocking **Deny Settings** to Bicep/ARM without the danger of `--mode Complete`!',
    explanation:
      '1) Yes: **Web App for Containers** runs custom Docker images right on App Service Plans (with Slots, VNet Integration, and Managed Identity ACR pull!). 2) No: **ACI** is a low-level burst pod primitive—it does **NOT** autoscale horizontally on its own (you must use **Azure Container Apps** or **AKS Virtual Nodes** for elastic container scaling!). 3) Yes: **Azure Deployment Stacks** replace legacy Azure Blueprints and solve `--mode Complete`’s blast radius by tracking stack-owned resources (`actionOnUnmanage: deleteResources | detachResources`) and enforcing **Deny Assignments** against unauthorized manual edits!',
    awsComparison:
      '**Azure Deployment Stacks** (`az stack group/sub/mg create`) bridge the exact gap AWS engineers missed from **CloudFormation Stacks + Stack Policies**—safe stack-scoped pruning + drift lockouts!'
  },
  {
    id: 'az104-a3-057',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Bootstrapping Linux VMs with cloud-init',
    difficulty: 1,
    format: 'single',
    prompt:
      'You want to pass a portable `#cloud-config` YAML file (`packages: [nginx, jq]`, `runcmd`, `write_files`) into a new Ubuntu 24.04 LTS Virtual Machine during `az vm create` so the VM installs `nginx` automatically on its **very first boot** without adding separate ARM `Microsoft.Compute/virtualMachines/extensions` resources. Which `az vm create` parameter accepts the `cloud-init` file?',
    options: [
      '**`--custom-data cloud-init.yaml`** (or `osProfile.customData` Base64-encoded in ARM/Bicep)',
      '`--boot-diagnostics-storage cloud-init.yaml`',
      '`--availability-set cloud-init.yaml`',
      '`--tags cloud-init.yaml`'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'AWS EC2 `--user-data file://cloud-init.yaml` <-> Azure CLI **`--custom-data cloud-init.yaml`** (and modern Azure also supports `--user-data` exposed via IMDS)!',
    explanation:
      'Passing a `#cloud-config` YAML (or `#!/bin/bash` script) via **`--custom-data`** (`osProfile.customData`, max 64 KB Base64-encoded) feeds directly into Linux’s pre-installed **`cloud-init`** engine during initial VM provisioning (**first boot only**). Because `cloud-init` is cloud-agnostic across Ubuntu/RHEL/Debian images, your bootstrap YAML works identically across clouds without Azure-specific extension schemas!',
    awsComparison:
      '`az vm create --custom-data cloud-init.yaml` works just like `aws ec2 run-instances --user-data file://cloud-init.yaml` (note: Azure also added `userData` as a mutable IMDS property readable inside the guest via `169.254.169.254`, while `customData` triggers first-boot `cloud-init`!).'
  },
  {
    id: 'az104-a3-058',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Zero-Downtime AKS Cluster Kubernetes Version Upgrade',
    difficulty: 2,
    format: 'sequence',
    prompt:
      'Your production **Azure Kubernetes Service (AKS)** cluster (`aks-core`) is running Kubernetes `1.29` and needs an in-place upgrade to a newer supported minor version with zero application downtime. Put the standard AKS upgrade workflow steps in the correct sequence.',
    correctSequence: [
      'Run **`az aks get-upgrades --resource-group rg-aks --name aks-core --output table`** to verify which target Kubernetes versions are available in your region.',
      'Confirm multi-replica Deployments have **`PodDisruptionBudgets (PDBs)`** configured and verify node pool **`maxSurge`** (`--max-surge 33%`) has enough VNet subnet IP and regional vCPU quota for temporary surge nodes.',
      'Execute **`az aks upgrade --resource-group rg-aks --name aks-core --kubernetes-version <target-version>`**—AKS upgrades the managed control plane first, then provisions surge nodes, **cordons and drains** old nodes one batch at a time, and replaces them.',
      'Verify cluster health using `kubectl get nodes` and `kubectl get pods -A` to confirm all nodes report `Ready` on the upgraded `kubelet` version.'
    ],
    awsBridgeHint:
      'Watch Step 2—an absolute classic AKS real-world & exam gotcha! Unlike in-place OS yum updates, AKS upgrades **surge new VMSS nodes (`maxSurge`, default 1 or 33%), cordon + drain pods off old nodes, and delete old nodes**—so if your VNet subnet has 0 free IPs or vCPU quota is full, `az aks upgrade` stalls!',
    explanation:
      '`az aks get-upgrades` lists supported upgrade hops (Kubernetes does NOT allow skipping minor versions—e.g. `1.28 -> 1.29 -> 1.30`, unless using supported rapid upgrade paths). During **`az aks upgrade`**, AKS upgrades the free managed API control plane, then performs a rolling **surge-cordon-drain-reimage** across each node pool—respecting `PodDisruptionBudgets` and requiring headroom in **subnet IP addresses** (especially on flat Azure CNI!) and **subscription vCPU quota** for `--max-surge` nodes!',
    awsComparison:
      'One nice edge over **Amazon EKS** (where `aws eks update-cluster-version` upgrades ONLY the control plane and forces a separate `update-nodegroup-version` step): `az aks upgrade` upgrades **both** control plane AND node pools in one orchestrated command (unless you pass `--control-plane-only`)!'
  },
  {
    id: 'az104-a3-059',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Azure Dedicated Hosts',
    difficulty: 2,
    format: 'single',
    prompt:
      'A government healthcare agency must run Windows Server and SQL Server Virtual Machines on **physical hypervisor server blades that are NOT shared with any other Azure customer**, requires visibility into hardware socket/physical core counts for **Azure Hybrid Benefit per-physical-core BYOL licensing**, and wants manual control over scheduling Azure platform host maintenance within a **35-day rolling window**. What Azure compute offering meets all three requirements?',
    options: [
      'Proximity Placement Groups',
      'Availability Sets with 3 Fault Domains',
      '**Azure Dedicated Host** (organized inside a **Host Group** pinned to an Availability Zone and Fault Domain)',
      'Azure Spot Virtual Machines'
    ],
    correctIndices: [2],
    awsBridgeHint:
      '100% identical in name and purpose to **AWS EC2 Dedicated Hosts**: physical server hardware isolation + socket/core visibility for Windows Server Datacenter / SQL Server Enterprise BYOL + Maintenance Configurations!',
    explanation:
      '**Azure Dedicated Host** provisions entire physical servers (for a specific VM SKU family like `Dadsv5-Type1` or `Eadsv5-Type1`) inside a **Host Group**, guaranteeing zero multi-tenant neighbor VMs on that physical blade, unlocking **physical-core licensing** benefits via Azure Hybrid Benefit (e.g., licensing all physical cores with Windows Server Datacenter Software Assurance gives unlimited Windows VMs on that host!), and letting you schedule platform updates via **Maintenance Configurations** inside a **35-day window**.',
    awsComparison:
      'Direct 1:1 counterpart to **AWS EC2 Dedicated Hosts** + AWS License Manager physical-core tracking.'
  },
  {
    id: 'az104-a3-060',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    subtopic: 'Enterprise Compute & Container Architecture Synthesis',
    difficulty: 3,
    format: 'single',
    prompt:
      'Your architecture team is selecting the optimal Azure compute platform for a new event-driven document-OCR platform with four requirements:\n1. Runs custom Python/C++ Linux container images stored in a private **Azure Container Registry (`acrdoc01`)** with admin credentials disabled.\n2. Scales horizontally from **0 running replicas (`$0` active compute cost)** at night up to **40 replicas** within seconds based on **Azure Service Bus Queue** backlog depth, PLUS splits HTTP API traffic **`90% / 10%`** across `v1` and `v2` revisions.\n3. Exposes its API **exclusively** inside corporate Virtual Network `vnet-internal` with zero public internet endpoints.\n4. Zero Kubernetes node pool patching, `kubeconfig` cluster upgrades, or CSI driver maintenance.\n\nWhich architecture meets EVERY requirement with the least operational overhead?',
    options: [
      'Azure Container Instances (ACI) with Restart Policy `OnFailure` and `Standard` Load Balancer.',
      'Azure Kubernetes Service (AKS) with Kubenet, System Node Pool scaled to `0`, and Manual HPA.',
      'Windows App Service Plan (`Basic B1`) with Deployment Slots and Auto-Swap.',
      '**Azure Container Apps (ACA)** deployed in a VNet-integrated **Container Apps Environment**, configured with **Multiple Revision Mode** (`90% / 10%` traffic split), **KEDA Service Bus & HTTP scale rules (`minReplicas: 0`, `maxReplicas: 40`)**, **`Internal` Ingress**, and a **User-Assigned Managed Identity** assigned **`AcrPull`** on `acrdoc01`!'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Check why the distractors fail: ACI has NO horizontal autoscaling or traffic splitting; AKS adds cluster/node-pool patching overhead (and System pools can’t scale to `0`!); `Basic B1` Windows App Service lacks Slots, Linux support, and scale-to-zero—leaving **Azure Container Apps** as the textbook fit!',
    explanation:
      '**Azure Container Apps (ACA)** hits every requirement cleanly without managing Kubernetes infrastructure: (1) Passwordless ACR image pulls via Managed Identity + **`AcrPull`**, (2) Native **KEDA** Service Bus & HTTP scalers supporting **`minReplicas: 0` -> `40`** plus **Multiple Revision Mode** for `90% / 10%` canary HTTP splitting, (3) VNet-injected Container Apps Environment with **`Internal` ingress**, and (4) 100% fully managed serverless container control plane & OS patching!',
    awsComparison:
      'Think of **Azure Container Apps** here as combining the best of **AWS App Runner** (zero-ops Envoy traffic splitting) + **Lambda/KEDA** (true queue-driven scale-to-zero!) + **Private VPC Ingress** in one serverless container service.'
  }
];

