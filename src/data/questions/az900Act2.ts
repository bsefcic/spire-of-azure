import type { ExamQuestion } from '../../types/curriculum';

export const AZ900_ACT2_QUESTIONS: ExamQuestion[] = [
  {
    id: 'az900-a2-001',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Regions',
    difficulty: 1,
    format: 'single',
    prompt: 'How does Microsoft define an Azure Region?',
    options: [
      'A geographical area containing one or more datacenters connected via a dedicated low-latency regional network within a latency-defined perimeter',
      'A single physical server rack inside a customer colocation facility with dual power supplies',
      'A global content delivery edge node that caches only static CSS and JavaScript assets',
      'A logical billing container used to group invoices across corporate departments'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think of a geographic cluster of datacenters interconnected by high-speed fiber within a strict round-trip latency envelope.',
    explanation: 'An Azure Region is a set of datacenters deployed within a latency-defined perimeter and connected through a dedicated regional low-latency network. Server racks are fault domains, edge cache nodes belong to CDN/Front Door, and billing containers are subscriptions.',
    awsComparison: 'Conceptually matches an AWS Region, EXCEPT an AWS Region always has 3+ Availability Zones, whereas some smaller Azure Regions do NOT have Availability Zones!'
  },
  {
    id: 'az900-a2-002',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Availability Zones',
    difficulty: 1,
    format: 'single',
    prompt: 'What is the MINIMUM number of physically separate Availability Zones present in any Azure Region that supports Availability Zones?',
    options: [
      'Two Availability Zones',
      'Three Availability Zones',
      'Five Availability Zones',
      'Twenty Availability Zones'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Quorum-safe multi-zone architectures require at least this many independent power, cooling, and network zones in a zone-enabled region.',
    explanation: 'Every Availability Zone-enabled Azure Region has a minimum of three separate Availability Zones, each comprising one or more datacenters equipped with independent power, cooling, and networking. Five and twenty correspond to classic Fault Domain / Update Domain counts rather than Availability Zones.',
    awsComparison: 'Matches AWS’s modern standard of 3+ Availability Zones per Region—just remember the AZ-900 rule that NOT every Azure region has Availability Zones enabled.'
  },
  {
    id: 'az900-a2-003',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Region Pairs',
    difficulty: 2,
    format: 'single',
    prompt: 'Which operational safeguard is provided natively by Azure Region Pairs during planned Azure platform updates?',
    options: [
      'Both paired regions are taken offline simultaneously for thirty minutes to ensure identical firmware versions',
      'Virtual machines are automatically converted into serverless functions across both regions',
      'Microsoft rolls out planned platform updates sequentially to only one region in a pair at a time to prevent simultaneous update-induced outages',
      'All public IP addresses in both paired regions merge into a single layer-2 broadcast subnet'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Azure pairs regions (usually 300+ miles apart in the same geography) specifically to serialize platform maintenance and prioritize disaster recovery.',
    explanation: 'For Azure Region Pairs, Microsoft staggers planned Azure system updates sequentially so only one region in each pair is updated at a time, minimizing the risk of a bad update impacting both primary and disaster recovery regions. In a wide-scale outage, at least one region in every pair is also prioritized for recovery.',
    awsComparison: 'Major Azure-specific concept: AWS has no native "Region Pair" construct—on AWS you choose any secondary region yourself, whereas Azure GRS storage replicates strictly to its predefined Paired Region.'
  },
  {
    id: 'az900-a2-004',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Sovereign Regions — China 21Vianet',
    difficulty: 2,
    format: 'single',
    prompt: 'How is the Azure China sovereign cloud operated differently from standard commercial Azure regions?',
    options: [
      'It shares physical network switches with West US and East US commercial regions',
      'It is operated directly by United States Department of Defense personnel',
      'It supports only Software as a Service (SaaS) webmail and prohibits virtual machines',
      'It is a physically separated instance of cloud services located in China and operated independently by 21Vianet rather than directly by Microsoft'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Think of how foreign cloud providers comply with Chinese telecommunications regulations via an independent licensed local operator.',
    explanation: 'Microsoft Azure operated by 21Vianet (Azure China) is a physically separated instance of cloud services located in mainland China, independently operated and transacted by Shanghai Blue Cloud Technology (21Vianet) under license from Microsoft. US federal personnel operate Azure Government, not Azure China.',
    awsComparison: 'Directly analogous to AWS China Regions being operated by local Chinese partners Sinnet (Beijing) and NWCD (Ningxia) rather than Amazon directly.'
  },
  {
    id: 'az900-a2-005',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Sovereign Regions — Azure Government',
    difficulty: 2,
    format: 'single',
    prompt: 'Which organization type is eligible to deploy workloads into Azure Government sovereign regions (such as US Gov Virginia and US DoD Central)?',
    options: [
      'US federal, state, local, or tribal government entities and their qualifying solution partners handling regulated government data',
      'Any multinational e-commerce retailer seeking lower latency to East Coast shoppers',
      'Anonymous open-source developers using free personal student accounts',
      'European banking institutions subject exclusively to GDPR privacy mandates'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Physically isolated sovereign US cloud datacenters staffed by screened US citizens for public-sector and defense compliance.',
    explanation: 'Azure Government is a physically and network-isolated sovereign cloud built exclusively for US federal, state, local, and tribal government agencies and their authorized defense/solution contractors, staffed by screened US persons.',
    awsComparison: 'Directly equivalent to AWS GovCloud (US-East and US-West).'
  },
  {
    id: 'az900-a2-006',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Availability Zones & Region Facts',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure Regions, Availability Zones, and Region Pairs.',
    statements: [
      {
        statement: 'Every single Azure Region worldwide contains at least three Availability Zones.',
        answer: false
      },
      {
        statement: 'Each Availability Zone has independent power, cooling, and networking infrastructure to isolate datacenter-level failures.',
        answer: true
      },
      {
        statement: 'Most Azure Region Pairs reside within the same geography (for example, North America or Europe) to satisfy data residency requirements, with Brazil South paired outside its geography as a notable exception.',
        answer: true
      }
    ],
    awsBridgeHint: 'Watch out for two classic AZ-900 exam facts: not all Azure regions have AZs, and Brazil South pairs with South Central US!',
    explanation: 'While Microsoft continues expanding Availability Zone support, NOT every Azure region supports Availability Zones. Where supported, each AZ has independent power, cooling, and networking. Region pairs stay within the same geography for tax/data residency, except Brazil South which is paired with South Central US.',
    awsComparison: 'Big trap for AWS architects: on AWS every standard Region has 3+ AZs, so don’t assume every Azure Region has AZs on AZ-900!'
  },
  {
    id: 'az900-a2-007',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Resource Groups — Core Rules',
    difficulty: 1,
    format: 'single',
    prompt: 'A cloud administrator deploys a virtual machine named VM-Prod-01 into Resource Group RG-Core. The security team also wants VM-Prod-01 to appear inside Resource Group RG-SecOps simultaneously. What happens when the administrator attempts this?',
    options: [
      'VM-Prod-01 is linked to both resource groups and splits its monthly cost 50/50',
      'The action is impossible because every Azure resource must exist in one—and only one—resource group at a time',
      'RG-SecOps can be nested as a child resource group inside RG-Core',
      'VM-Prod-01 is cloned automatically whenever a second resource group references its name'
    ],
    correctIndices: [1],
    awsBridgeHint: 'In Azure Resource Manager, every resource has a strict 1:1 parent Resource Group in its resource URI—no multi-homing and no nested RGs.',
    explanation: 'Every Azure resource must belong to exactly one Resource Group at any given time (though many resources can be moved from one RG to another), and Resource Groups cannot be nested inside other Resource Groups.',
    awsComparison: 'Major mental shift from AWS: AWS Resource Groups are optional tag-based saved queries where one EC2 instance can match 10 groups, whereas an Azure Resource Group is a mandatory, exclusive parent lifecycle container!'
  },
  {
    id: 'az900-a2-008',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Resource Groups — Region Metadata',
    difficulty: 2,
    format: 'single',
    prompt: 'Why must you specify an Azure Region when creating a Resource Group, even though the Resource Group can hold resources deployed in completely different regions?',
    options: [
      'The Resource Group region forces all virtual networks inside it to tunnel traffic through that region',
      'The Resource Group region determines which currency appears on the customer’s monthly invoice',
      'The Resource Group stores metadata about the resources it contains, and compliance rules may dictate which region holds that metadata',
      'Resources placed in a different region from their Resource Group are automatically deleted after 30 days'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Control-plane deployment records and resource inventory JSON have to live physically somewhere—and if that region’s control plane goes down, ARM updates to the RG pause.',
    explanation: 'A Resource Group requires a location because Azure Resource Manager stores the deployment and resource metadata for that group in the chosen region. Even though child resources can live in any region, compliance rules may require metadata to stay in a specific country, and a regional control-plane outage in the RG’s region can temporarily block ARM updates to those resources.',
    awsComparison: 'Similar to choosing which AWS Region hosts an AWS CloudFormation stack’s state/metadata.'
  },
  {
    id: 'az900-a2-009',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Resource Groups — Deletion & Lifecycle',
    difficulty: 1,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure Resource Groups.',
    statements: [
      {
        statement: 'A Resource Group configured in East US can contain a Virtual Machine in West Europe and a Storage Account in Japan East.',
        answer: true
      },
      {
        statement: 'Deleting a Resource Group deletes the logical folder only and moves its child Virtual Machines into a default unassigned pool.',
        answer: false
      },
      {
        statement: 'Role-Based Access Control (RBAC) permissions assigned at the Resource Group scope are inherited by all resources within that Resource Group.',
        answer: true
      }
    ],
    awsBridgeHint: 'RGs can hold multi-region resources, RBAC flows downward, and deleting an RG nukes every single child resource inside it!',
    explanation: 'Resources inside a Resource Group can span multiple regions, and RBAC assignments at the RG level cascade down to all child resources. Deleting a Resource Group permanently deletes every resource inside it—there is no "unassigned" resource pool in Azure.',
    awsComparison: 'Deleting an Azure Resource Group behaves like deleting an AWS CloudFormation stack with `DeletionPolicy: Delete` on every resource inside it!'
  },
  {
    id: 'az900-a2-010',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Subscriptions',
    difficulty: 2,
    format: 'multi',
    prompt: 'An organization already has one Microsoft Entra tenant and one Azure Subscription, and is considering creating additional Azure Subscriptions. Which TWO requirements are valid architectural reasons to create multiple subscriptions? (Select 2)',
    options: [
      'Isolating production environments from development/testing environments with separate access boundaries and billing invoices',
      'Bypassing the need to place virtual machines inside Resource Groups',
      'Scaling beyond per-subscription resource quota limits (such as maximum virtual network or core limits per subscription)',
      'Allowing a single virtual machine to belong to three Resource Groups simultaneously'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'Think of the exact same reasons you create multiple AWS Accounts inside an AWS Organization: blast-radius/billing separation and scaling past account-level service quotas.',
    explanation: 'Azure Subscriptions serve as both a billing/invoicing boundary and an administrative/quota scale unit. Organizations create multiple subscriptions to separate dev/test/prod environments, isolate departmental billing, and scale past per-subscription quota limits. Every resource still requires a single Resource Group.',
    awsComparison: 'An Azure Subscription is the direct architectural equivalent of an AWS Account (billing boundary + quota boundary + IAM/RBAC scope), all trusting a central Microsoft Entra tenant.'
  },
  {
    id: 'az900-a2-011',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Management Groups Depth & Rules',
    difficulty: 2,
    format: 'single',
    prompt: 'What is the maximum number of levels of Management Groups supported in a hierarchy, EXCLUDING the Root Management Group and the Subscription level?',
    options: [
      'Two levels',
      'Four levels',
      'Ten levels',
      'Six levels'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Memorize this exact AZ-900 governance integer: 6 tree levels of custom Management Groups beneath Root and above Subscriptions.',
    explanation: 'Azure Management Groups support up to 10,000 management groups in a single directory arranged in a hierarchy up to six levels deep—explicitly excluding the Root Management Group level and the Subscription level.',
    awsComparison: 'Equivalent to Organizational Units (OUs) in AWS Organizations (AWS allows 5 nested OU levels beneath Root; Azure allows 6 Management Group levels beneath Root).'
  },
  {
    id: 'az900-a2-012',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Governance Scope Hierarchy',
    difficulty: 1,
    format: 'sequence',
    prompt: 'Order the four levels of Azure scope hierarchy from the BROADEST / highest governance scope (top) to the NARROWEST / most granular scope (bottom).',
    correctSequence: [
      'Management Groups',
      'Subscriptions',
      'Resource Groups',
      'Resources'
    ],
    awsBridgeHint: 'Trace policy and RBAC inheritance downward from enterprise org folders -> billing accounts -> lifecycle containers -> individual services.',
    explanation: 'Azure applies governance (Azure Policy, Azure RBAC, budgets) across four hierarchical scopes from top to bottom: Management Groups -> Subscriptions -> Resource Groups -> Resources. Settings applied at any parent scope inherit automatically down to child scopes.',
    awsComparison: 'Maps to AWS Organizations OUs -> AWS Accounts -> [Azure-unique Resource Group layer] -> Individual Resources.'
  },
  {
    id: 'az900-a2-013',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Availability Sets — Fault vs Update Domains',
    difficulty: 2,
    format: 'single',
    prompt: 'Within an Azure Availability Set in a single datacenter, what do Fault Domains protect virtual machines against?',
    options: [
      'Unplanned localized hardware failures such as a physical server rack losing its top-of-rack network switch or power distribution unit',
      'Simultaneous reboots caused by scheduled Microsoft host operating system patching',
      'A natural disaster flooding the entire Azure Region across a 50-mile radius',
      'Accidental deletion of a Resource Group by a subscription Owner'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Fault = rack power/switch hardware failure (up to 3 racks); Update = scheduled host maintenance reboots (up to 20 groups).',
    explanation: 'Fault Domains (up to 3 per Availability Set) distribute VMs across separate physical server racks with independent power units and network switches inside a datacenter, protecting against unplanned rack-level hardware failures. Update Domains handle planned maintenance reboots, while Availability Zones/Region Pairs handle building or regional disasters.',
    awsComparison: 'Equivalent to an Amazon EC2 Spread/Partition Placement Group spreading instances across distinct physical racks inside one AZ.'
  },
  {
    id: 'az900-a2-014',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Availability Sets — Update Domains',
    difficulty: 2,
    format: 'single',
    prompt: 'An Availability Set is configured with 3 Fault Domains and 5 Update Domains and contains 10 virtual machines hosting a web cluster. During planned Azure host maintenance that requires rebooting underlying physical hosts, how are Update Domains processed?',
    options: [
      'All 5 Update Domains reboot simultaneously to complete maintenance in under five minutes',
      'Only one Update Domain is rebooted at a time, and each rebooted Update Domain is given 30 minutes to recover before maintenance proceeds to the next',
      'Update Domains migrate VMs across Region Pairs over the public internet',
      'Update Domains permanently disable guest OS Windows Update services'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Planned platform updates roll one logical group at a time so at least 80% of a 5-UD fleet stays online.',
    explanation: 'Update Domains (up to 20 per Availability Set) group VMs that can undergo planned host maintenance simultaneously. Azure reboots at most one Update Domain at a time and grants a 30-minute recovery window before moving to the next Update Domain.',
    awsComparison: 'Unique explicit Azure construct: AWS abstracts host maintenance scheduling behind EC2 live migration/scheduled events rather than exposing user-configurable Update Domain counts.'
  },
  {
    id: 'az900-a2-015',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Virtual Machine Scale Sets (VMSS)',
    difficulty: 1,
    format: 'single',
    prompt: 'Which Azure compute service lets you automatically deploy, load-balance, and horizontally autoscale hundreds of identical virtual machines based on CPU demand or a recurring schedule?',
    options: [
      'Azure Availability Set',
      'Azure Container Instances',
      'Azure Virtual Machine Scale Sets',
      'Azure Virtual Desktop personal host pool'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Think of the direct Azure counterpart to an EC2 Auto Scaling Group.',
    explanation: 'Azure Virtual Machine Scale Sets (VMSS) let you create and manage a group of load-balanced VMs that automatically increase or decrease instance counts in response to demand metrics or defined schedules (scaling up to 1,000 Marketplace VMs or 600 custom-image VMs). An Availability Set only places manually created VMs across racks without autoscaling.',
    awsComparison: 'Directly equivalent to Amazon EC2 Auto Scaling Groups (ASG).'
  },
  {
    id: 'az900-a2-016',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Virtual Desktop (AVD)',
    difficulty: 2,
    format: 'single',
    prompt: 'What unique licensing and compute capability distinguishes Azure Virtual Desktop (AVD) from traditional on-premises Remote Desktop Session Host deployments?',
    options: [
      'Running macOS Sonoma desktops natively on ARM server racks',
      'Eliminating the need for Microsoft Entra ID user authentication',
      'Providing offline air-gapped desktop hardware shipped to employee homes',
      'Supporting multi-session Windows 10 and Windows 11 Enterprise virtual desktops where multiple concurrent users share a single client OS VM'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Traditionally, multi-user RDS required Windows Server OS; only Azure’s native VDI service legally and technically runs multi-user client Windows 10/11!',
    explanation: 'Azure Virtual Desktop (AVD) is a cloud desktop and application virtualization service that uniquely enables Windows 10 and Windows 11 Enterprise multi-session—allowing multiple concurrent users to log into a single Windows client OS VM for full client app compatibility at dramatically lower compute cost.',
    awsComparison: 'Compares to Amazon WorkSpaces / AppStream 2.0, with a major Microsoft licensing trump card: Windows 11 multi-session is exclusive to Azure Virtual Desktop!'
  },
  {
    id: 'az900-a2-017',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure App Service',
    difficulty: 1,
    format: 'single',
    prompt: 'A team wants a fully managed Platform as a Service (PaaS) offering with built-in staging deployment slots, custom TLS certificates, integrated authentication, and continuous deployment from GitHub to host a production Node.js REST API. Which Azure service should they choose?',
    options: [
      'Azure App Service',
      'Azure Virtual Machines',
      'Azure Container Instances',
      'Azure CycleCloud'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Azure’s flagship managed web/API PaaS with zero OS patching and zero-downtime blue/green deployment slots.',
    explanation: 'Azure App Service is an HTTP-based PaaS for hosting web applications, REST APIs, and mobile backends in .NET, Java, Node.js, Python, PHP, or containers, complete with deployment slots, autoscale, TLS management, and CI/CD integration.',
    awsComparison: 'Combines the best of AWS Elastic Beanstalk and AWS App Runner, with first-class blue/green Deployment Slots built right in.'
  },
  {
    id: 'az900-a2-018',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Container Services — ACI vs ACA vs AKS',
    difficulty: 2,
    format: 'single',
    prompt: 'A developer needs the fastest, simplest way to run a single Docker container in Azure to process an ad-hoc data transformation task with per-second billing, without provisioning virtual machines or configuring any container orchestration platform. Which service should be used?',
    options: [
      'Azure Kubernetes Service (AKS)',
      'Azure Container Instances (ACI)',
      'Azure Virtual Machine Scale Sets',
      'Azure Dedicated Host'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Single standalone container-as-a-service with zero cluster, zero task-definition boilerplate, and per-second billing.',
    explanation: 'Azure Container Instances (ACI) is a PaaS offering that runs isolated containers or container groups on demand in seconds with per-second billing and no virtual machine or orchestrator management. AKS is a full Kubernetes orchestrator for complex multi-container clusters.',
    awsComparison: 'Think of ACI as standalone AWS Fargate without needing to create an ECS Cluster or EKS control plane first.'
  },
  {
    id: 'az900-a2-019',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Container Services — Azure Container Apps',
    difficulty: 3,
    format: 'single',
    prompt: 'An engineering team is building twelve containerized microservices that communicate via Dapr, split HTTP traffic across revisions, and autoscale dynamically down to zero based on message queue depth (KEDA)—but the team wants zero Kubernetes cluster control-plane administration. Which service is purpose-built for this?',
    options: [
      'Azure Container Instances (ACI)',
      'Azure Virtual Machines with Docker Engine',
      'Azure Container Apps (ACA)',
      'Azure Availability Sets'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Serverless microservices container platform sitting right between simple single-container ACI and full cluster-managed AKS.',
    explanation: 'Azure Container Apps (ACA) is a serverless PaaS for containerized microservices powered underneath by Kubernetes, KEDA (event-driven scale-to-zero), Envoy ingress/traffic splitting, and Dapr—abstracting away all Kubernetes cluster API and node management.',
    awsComparison: 'Sits alongside AWS App Runner and ECS on AWS Fargate, adding native KEDA scale-to-zero on queue/event triggers out of the box.'
  },
  {
    id: 'az900-a2-020',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Container Services — Azure Kubernetes Service (AKS)',
    difficulty: 2,
    format: 'single',
    prompt: 'When should a cloud architect recommend Azure Kubernetes Service (AKS) over Azure Container Instances (ACI) or Azure Container Apps (ACA)?',
    options: [
      'When running a single 30-second nightly bash script with zero dependencies',
      'When hosting a static HTML brochure website with no backend logic',
      'When migrating desktop Microsoft Office suites for call-center agents',
      'When workloads require full access to the Kubernetes API, custom operators/CRDs, granular node-pool sizing, and complex cluster networking'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Choose managed Kubernetes only when you need direct control over Kubernetes primitives, DaemonSets, custom CNI networking, or GPU node pools.',
    explanation: 'Azure Kubernetes Service (AKS) provides a managed Kubernetes control plane while giving platform teams full access to Kubernetes APIs, Custom Resource Definitions (CRDs), DaemonSets, custom networking, and heterogeneous node pools.',
    awsComparison: 'Directly equivalent to Amazon EKS (note: AKS offers a Free tier control plane option for dev/test, whereas EKS always charges $0.10/hr per cluster).'
  },
  {
    id: 'az900-a2-021',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Functions Hosting Plans',
    difficulty: 3,
    format: 'single',
    prompt: 'A financial trading team runs latency-sensitive C# Azure Functions that must integrate privately with an Azure Virtual Network, eliminate cold-start delays using pre-warmed instances, and execute for up to 45 minutes per trigger. Which Azure Functions hosting plan meets ALL of these requirements?',
    options: [
      'Functions Premium plan',
      'Functions Consumption plan',
      'Azure Static Web Apps Free tier',
      'Azure Queue Storage standard tier'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think AWS Lambda Provisioned Concurrency + VPC networking + extended timeouts rolled into an enhanced serverless plan.',
    explanation: 'The Azure Functions Premium plan provides perpetually warm instances to eliminate cold starts, native Virtual Network connectivity, and extended/unbounded execution durations while still autoscaling dynamically on events. The standard Consumption plan scales to zero (incurring cold starts) and enforces a 10-minute maximum timeout.',
    awsComparison: 'Comparable to AWS Lambda with Provisioned Concurrency + VPC ENIs, EXCEPT Functions Premium also lifts Lambda’s hard 15-minute execution ceiling!'
  },
  {
    id: 'az900-a2-022',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Compute Resiliency Spectrum',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order these Azure Virtual Machine deployment configurations from the LOWEST infrastructure failure protection / SLA (top) to the HIGHEST geographic failure protection (bottom).',
    correctSequence: [
      'Single Virtual Machine using Standard SSD Managed Disks in one datacenter',
      'Multiple Virtual Machines deployed in an Availability Set across Fault and Update Domains in one datacenter',
      'Multiple Virtual Machines deployed across three Availability Zones within a single Azure Region',
      'Multiple Virtual Machines deployed across Paired Azure Regions hundreds of miles apart with global traffic routing'
    ],
    awsBridgeHint: 'Step outward in blast radius: Single VM -> Rack-level HA (Availability Set) -> Datacenter-level HA (Availability Zones) -> Regional DR/HA (Region Pair).',
    explanation: 'Azure VM resiliency scales monotonically outward: a single VM (99.9% with Standard SSD) protects against neither rack nor datacenter failure; an Availability Set (99.95%) protects against rack/switch failure; Availability Zones (99.99%) protect against entire datacenter failures; and Multi-Region deployments protect against regional catastrophes.',
    awsComparison: 'Azure’s classic 4-rung VM SLA ladder: Single VM (99.5%-99.9%) -> Availability Set (99.95%) -> Multi-AZ (99.99%) -> Multi-Region.'
  },
  {
    id: 'az900-a2-023',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Compute Service Selection Matrix',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure compute offerings.',
    statements: [
      {
        statement: 'Azure Functions in the Consumption plan automatically scales down to zero instances when no events are triggered.',
        answer: true
      },
      {
        statement: 'An Availability Set protects virtual machines if a severe flood destroys the entire datacenter building.',
        answer: false
      },
      {
        statement: 'Azure App Service is classified as a Platform as a Service (PaaS) compute offering.',
        answer: true
      }
    ],
    awsBridgeHint: 'Remember: Availability Sets live inside ONE datacenter building (racks only), whereas Availability Zones span separate buildings!',
    explanation: 'Functions Consumption scales to zero when idle, and App Service is a core PaaS service. An Availability Set only distributes VMs across racks (Fault Domains) within the SAME datacenter—surviving a datacenter building flood requires Availability Zones or Geo-Redundancy.',
    awsComparison: 'Never confuse Availability Set (rack-level inside 1 AZ) with Availability Zones (separate datacenters)—one of the top 3 exam traps on AZ-900!'
  },
  {
    id: 'az900-a2-024',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Virtual Network (VNet) Scope',
    difficulty: 2,
    format: 'single',
    prompt: 'What is the geographic scope of a single Azure Virtual Network (VNet)?',
    options: [
      'Restricted to a single Availability Zone inside one datacenter',
      'Scoped to a single Azure Region, automatically spanning all Availability Zones within that region',
      'Global across all commercial and sovereign Azure Regions simultaneously',
      'Restricted to a single physical server rack (Fault Domain)'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Just like an AWS VPC, a VNet lives inside one Region and spans across the AZs of that Region.',
    explanation: 'A single Azure Virtual Network (VNet) is scoped to one Azure Region and spans all Availability Zones in that region. Connecting workloads across different regions requires Global VNet Peering or VPN gateways.',
    awsComparison: 'Matches Amazon VPC’s exact regional scope—and bonus Azure perk: subnets inside an Azure VNet can also be zonal OR span all AZs in the region by default (unlike AWS where every subnet is pinned to 1 AZ)!'
  },
  {
    id: 'az900-a2-025',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Subnet Reserved IP Addresses',
    difficulty: 3,
    format: 'single',
    prompt: 'An administrator creates a subnet with the CIDR block 10.0.1.0/24 inside an Azure Virtual Network. How many IP addresses does Azure reserve internally in EVERY subnet for protocol conformance, default gateway, and Azure DNS?',
    options: [
      'Two IP addresses',
      'Four IP addresses',
      'Five IP addresses',
      'Sixteen IP addresses'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Just like AWS VPC subnets, Azure takes the first four addresses (`.0`, `.1`, `.2`, `.3`) plus the final broadcast address (`.255`).',
    explanation: 'Azure reserves 5 IP addresses in every subnet: the first four addresses and the last address (e.g., `.0` network address, `.1` default gateway, `.2` and `.3` mapped to Azure DNS IPs, and `.255` network broadcast). Thus a `/24` subnet yields `256 - 5 = 251` usable host IPs.',
    awsComparison: 'Identical count (5 reserved IPs per subnet) to Amazon VPC!'
  },
  {
    id: 'az900-a2-026',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'VNet Peering Transitivity',
    difficulty: 3,
    format: 'single',
    prompt: 'VNet-A is peered with VNet-B, and VNet-B is peered with VNet-C. No network virtual appliances, VPN gateways, or direct peering between VNet-A and VNet-C are configured. Can a virtual machine in VNet-A communicate directly with a virtual machine in VNet-C?',
    options: [
      'Yes, because VNet Peering automatically builds a full-mesh transitive routing table across all connected VNets',
      'Yes, provided all three VNets reside in the same Resource Group',
      'Yes, as long as all three VNets share overlapping 10.0.0.0/16 IPv4 CIDR blocks',
      'No, because VNet Peering is non-transitive by default; VNet-A requires either direct peering with VNet-C or hub gateway/NVA transit routing'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Peering links work strictly pairwise (1-to-1) without transitive hop-through unless you configure a hub router/gateway.',
    explanation: 'VNet Peering connections are non-transitive: peering A->B and B->C does NOT allow A to talk to C unless you explicitly create an A->C peering or configure gateway transit / a hub Network Virtual Appliance (such as Azure Firewall). Additionally, peered VNets must never have overlapping IP spaces.',
    awsComparison: 'Exact same non-transitive rule and non-overlapping CIDR requirement as AWS VPC Peering!'
  },
  {
    id: 'az900-a2-027',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Point-to-Site vs Site-to-Site VPN',
    difficulty: 1,
    format: 'single',
    prompt: 'A remote software engineer working from a hotel Wi-Fi network needs to establish an encrypted tunnel directly from their individual laptop into an Azure Virtual Network. Which connectivity option is designed for this scenario?',
    options: [
      'Point-to-Site (P2S) VPN',
      'Site-to-Site (S2S) VPN',
      'Azure ExpressRoute circuit with BGP',
      'Regional VNet Peering'
    ],
    correctIndices: [0],
    awsBridgeHint: 'One individual remote client endpoint connecting over the internet into a cloud VNet.',
    explanation: 'A Point-to-Site (P2S) VPN gateway connection lets an individual client computer (such as a remote worker’s laptop) connect securely to an Azure VNet over OpenVPN, SSTP, or IKEv2. Site-to-Site (S2S) connects an entire corporate office network via an on-premises VPN appliance.',
    awsComparison: 'Point-to-Site VPN = AWS Client VPN; Site-to-Site VPN = AWS Site-to-Site VPN.'
  },
  {
    id: 'az900-a2-028',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Site-to-Site VPN vs ExpressRoute',
    difficulty: 2,
    format: 'single',
    prompt: 'A global bank requires a dedicated, private, high-throughput (10 Gbps) network connection between its corporate headquarters datacenter and Azure that NEVER traverses the public internet and provides predictable low latency. Which Azure service meets this requirement?',
    options: [
      'Azure VPN Gateway (Site-to-Site IPsec VPN)',
      'Azure ExpressRoute',
      'Azure Bastion',
      'Azure Public Load Balancer'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Dedicated private circuit via a connectivity exchange partner bypassing the public internet entirely.',
    explanation: 'Azure ExpressRoute establishes private, dedicated Layer-3 connections between on-premises infrastructure and Microsoft datacenters through a connectivity provider. Traffic never crosses the public internet, offering higher bandwidth (up to 100 Gbps), lower predictable latency, and connection SLAs. VPN Gateway sends encrypted traffic over the public internet.',
    awsComparison: 'Directly equivalent to AWS Direct Connect (note: like Direct Connect, ExpressRoute is private dedicated fiber—not encrypted at MACsec/IPsec by default unless configured).'
  },
  {
    id: 'az900-a2-029',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Public vs Private Endpoints',
    difficulty: 2,
    format: 'single',
    prompt: 'A security architect wants virtual machines in an internal subnet to access an Azure Storage Account exclusively over a private IP address assigned from their own Virtual Network, disabling all public internet access to the storage account. Which feature accomplishes this?',
    options: [
      'Azure DNS Public Zone',
      'Point-to-Site VPN',
      'Azure Private Endpoint (powered by Azure Private Link)',
      'Azure Content Delivery Network (CDN)'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Drops a virtual NIC with a private RFC-1918 IP from your subnet directly in front of a PaaS resource.',
    explanation: 'An Azure Private Endpoint is a network interface that uses a private IP address from your Virtual Network to connect you privately and securely to a service powered by Azure Private Link (such as Azure Storage, Azure SQL Database, or Key Vault), keeping traffic entirely on the Microsoft backbone and preventing data exfiltration.',
    awsComparison: 'Directly equivalent to AWS PrivateLink Interface VPC Endpoints.'
  },
  {
    id: 'az900-a2-030',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure DNS Capabilities & Limits',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure DNS.',
    statements: [
      {
        statement: 'Azure DNS hosts public DNS zones on Microsoft’s global anycast network of name servers for fast, highly available name resolution.',
        answer: true
      },
      {
        statement: 'Customers can purchase and register brand-new top-level domain names (such as contoso.com) directly inside the Azure DNS service.',
        answer: false
      },
      {
        statement: 'Azure Private DNS enables internal domain name resolution for virtual machines within and across linked Virtual Networks without deploying custom DNS servers.',
        answer: true
      }
    ],
    awsBridgeHint: 'Careful! Unlike Amazon Route 53 which is ALSO a domain registrar, Azure DNS only hosts zones—you must buy the domain from a third-party registrar!',
    explanation: 'Azure DNS provides authoritative hosting for public DNS domains via global anycast and internal resolution via Azure Private DNS zones. However, Azure DNS is NOT a domain registrar—you cannot buy a domain name in Azure DNS; you purchase it through a third-party registrar and delegate NS records to Azure DNS.',
    awsComparison: 'Huge AZ-900 exam favorite for AWS folks: Route 53 lets you register domains AND host zones; Azure DNS ONLY hosts zones (no domain registration)!'
  },
  {
    id: 'az900-a2-031',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Management Group & Subscription Inheritance',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Management Groups and Subscriptions in Azure.',
    statements: [
      {
        statement: 'Every Microsoft Entra directory is given a single top-level Root Management Group under which all subscriptions and other management groups fold.',
        answer: true
      },
      {
        statement: 'An Azure Policy assigned to a parent Management Group can be bypassed simply by creating a new Resource Group inside a child Subscription.',
        answer: false
      },
      {
        statement: 'Multiple Azure Subscriptions can trust the same Microsoft Entra tenant for centralized identity and access management.',
        answer: true
      }
    ],
    awsBridgeHint: 'One Root Management Group per tenant, mandatory top-down policy inheritance, and many Subscriptions trusting one Entra directory.',
    explanation: 'Each directory has a single Root Management Group for global governance; policies assigned to a Management Group enforce automatically down through child Subscriptions, Resource Groups, and Resources (creating a new RG never bypasses parent policy); and an enterprise commonly links dozens of Subscriptions to a single Microsoft Entra tenant.',
    awsComparison: 'Matches AWS Organizations Root -> SCP inheritance -> multiple AWS Accounts federated to a single IAM Identity Center.'
  },
  {
    id: 'az900-a2-032',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Hybrid Connectivity Selection',
    difficulty: 2,
    format: 'multi',
    prompt: 'Compare Azure VPN Gateway and Azure ExpressRoute for hybrid networking. Which TWO statements are accurate? (Select 2)',
    options: [
      'A Site-to-Site VPN Gateway is faster to deploy and lower cost than ExpressRoute, making it a common backup path for an ExpressRoute circuit',
      'Azure ExpressRoute sends unencrypted traffic across the public internet by default to minimize router CPU usage',
      'Azure ExpressRoute connects through a connectivity partner onto the Microsoft private backbone without traversing the public internet',
      'Point-to-Site VPN requires leasing dedicated physical dark fiber to every employee’s living room'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'Site-to-Site IPsec VPN over internet is quick/inexpensive (great failover backup for dedicated private ExpressRoute circuits).',
    explanation: 'Site-to-Site VPN encrypts traffic over the public internet at low cost and fast setup—making it ideal for smaller offices or as a resilient failover backup to ExpressRoute. ExpressRoute uses private partner circuits directly into Microsoft’s network and never traverses the public internet.',
    awsComparison: 'Identical to pairing AWS Direct Connect (primary private link) with AWS Site-to-Site VPN (encrypted internet backup).'
  },
  {
    id: 'az900-a2-033',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Global VNet Peering',
    difficulty: 2,
    format: 'single',
    prompt: 'An organization wants virtual machines in an East US Virtual Network to communicate privately over low-latency Microsoft backbone fiber with virtual machines in a West Europe Virtual Network without deploying VPN Gateways. Which feature enables this directly?',
    options: [
      'Availability Set Fault Domains',
      'Point-to-Site VPN',
      'Azure File Sync',
      'Global VNet Peering'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Peering two virtual networks across different geographic cloud regions over the provider’s private backbone.',
    explanation: 'Global VNet Peering connects Virtual Networks across different Azure Regions directly over the private Microsoft global network backbone without traversing the public internet or requiring VPN Gateways. Regional VNet Peering connects VNets within the same region.',
    awsComparison: 'Directly equivalent to AWS Inter-Region VPC Peering.'
  },
  {
    id: 'az900-a2-034',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Network Security Groups (NSGs)',
    difficulty: 2,
    format: 'single',
    prompt: 'Which Azure networking resource filters inbound and outbound traffic to subnets and virtual machine network interfaces using prioritized 5-tuple allow and deny rules (source IP, source port, destination IP, destination port, and protocol)?',
    options: [
      'Network Security Group (NSG)',
      'Azure DNS Zone',
      'Azure Content Delivery Network',
      'Azure ExpressRoute Global Reach'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Stateful Layer-4 traffic filter attachable to both subnets and VM NICs—unlike AWS Security Groups, it supports explicit Deny rules and priority numbers!',
    explanation: 'A Network Security Group (NSG) contains prioritized security rules that allow or deny inbound and outbound network traffic to Azure resources based on source/destination IP, port, and protocol. NSGs can be associated with subnets, individual VM NICs, or both.',
    awsComparison: 'Blends AWS Security Groups and NACLs: NSGs are stateful like Security Groups, attach to both subnets and NICs, AND support explicit priority-ordered Deny rules like NACLs!'
  },
  {
    id: 'az900-a2-035',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'ExpressRoute Global Reach',
    difficulty: 3,
    format: 'single',
    prompt: 'A multinational manufacturer has an ExpressRoute circuit in Tokyo and another ExpressRoute circuit in Frankfurt. Which ExpressRoute add-on allows their Tokyo and Frankfurt on-premises offices to route traffic directly to each other across Microsoft’s global network?',
    options: [
      'Point-to-Site SSTP Tunneling',
      'ExpressRoute Global Reach',
      'Azure Private DNS',
      'Azure Bastion Developer SKU'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Links your own ExpressRoute circuits together so Microsoft’s global fiber acts as your corporate WAN between branch offices.',
    explanation: 'ExpressRoute Global Reach links multiple ExpressRoute circuits together so on-premises datacenters in different parts of the world can exchange data directly over the Microsoft global network backbone.',
    awsComparison: 'Directly equivalent to AWS Direct Connect SiteLink.'
  },
  {
    id: 'az900-a2-036',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Blob Storage',
    difficulty: 1,
    format: 'single',
    prompt: 'Which Azure Storage service is purpose-built for storing massive amounts of unstructured object data such as video streams, medical imagery, backup archives, and raw log files accessed over HTTP/HTTPS?',
    options: [
      'Azure Queue Storage',
      'Azure Table Storage',
      'Azure Blob Storage',
      'Azure Managed Lustre'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Azure’s core object storage service ("Binary Large Objects").',
    explanation: 'Azure Blob Storage is Microsoft’s massively scalable object storage solution for unstructured text or binary data, accessible globally via HTTP/HTTPS REST APIs, SDKs, or Data Lake Storage Gen2.',
    awsComparison: 'Directly equivalent to Amazon S3 (where a Storage Account + Container corresponds roughly to an S3 Bucket namespace).'
  },
  {
    id: 'az900-a2-037',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Files',
    difficulty: 1,
    format: 'single',
    prompt: 'A legacy Windows and Linux application requires a shared network drive mounted simultaneously across ten virtual machines using standard Server Message Block (SMB) or NFS protocols without managing a file server VM. Which Azure Storage service provides this?',
    options: [
      'Azure Blob Archive tier',
      'Azure Queue Storage',
      'Azure Table Storage',
      'Azure Files'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Fully managed cloud file shares mountable via SMB 3.0 and NFS 4.1.',
    explanation: 'Azure Files offers fully managed file shares in the cloud accessible via industry-standard SMB and NFS protocols. Shares can be mounted concurrently by cloud VMs and on-premises Windows, Linux, and macOS clients.',
    awsComparison: 'Combines capabilities of Amazon FSx for Windows File Server (SMB) and Amazon EFS (NFS) inside a standard Azure Storage Account.'
  },
  {
    id: 'az900-a2-038',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Queue Storage vs Table Storage',
    difficulty: 2,
    format: 'single',
    prompt: 'A web frontend needs to decouple order processing from backend worker services by placing lightweight 16 KB order tasks into a durable asynchronous backlog so workers can process them at their own pace. Which Azure Storage Account service fits this pattern?',
    options: [
      'Azure Queue Storage',
      'Azure Table Storage',
      'Azure Files',
      'Azure Archive Blob Storage'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Simple asynchronous message queue built right into an Azure Storage Account (up to 64 KB per message).',
    explanation: 'Azure Queue Storage stores millions of messages (up to 64 KB each) accessed via HTTP/HTTPS to decouple application components asynchronously. Azure Table Storage is a schemaless key-attribute NoSQL store rather than a message queue.',
    awsComparison: 'Azure Queue Storage maps to basic Amazon SQS Standard queues (whereas enterprise pub/sub and FIFO ordering live in Azure Service Bus).'
  },
  {
    id: 'az900-a2-039',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Blob Storage Access Tiers Ordering',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order the four Azure Blob Storage access tiers from the HIGHEST per-GB monthly storage price / lowest data read cost (top) to the LOWEST per-GB monthly storage price / highest data retrieval cost and latency (bottom).',
    correctSequence: [
      'Hot tier',
      'Cool tier',
      'Cold tier',
      'Archive tier'
    ],
    awsBridgeHint: 'Remember Azure added an online "Cold" tier (90-day min) between Cool (30-day min) and offline Archive (180-day min)!',
    explanation: 'As you move from Hot -> Cool -> Cold -> Archive, per-GB monthly storage capacity prices drop progressively while per-GB read/retrieval and transaction charges increase. Hot, Cool, and Cold are online tiers (immediate millisecond access), whereas Archive is offline.',
    awsComparison: 'Maps closely to S3 Standard (Hot) -> S3 Standard-IA (Cool, 30d) -> S3 Glacier Instant Retrieval (Cold, 90d) -> S3 Glacier Deep Archive (Archive, 180d).'
  },
  {
    id: 'az900-a2-040',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Blob Archive Tier Rehydration',
    difficulty: 2,
    format: 'single',
    prompt: 'Compliance auditors request an immediate copy of a seven-year-old PDF contract stored in the Azure Blob Storage Archive tier. What must happen before an application or user can read the contents of that archived blob?',
    options: [
      'Nothing; blobs in the Archive tier stream immediately with single-digit millisecond latency',
      'The blob must first be rehydrated (or copied) to an online tier such as Hot or Cool, which can take hours depending on rehydration priority',
      'The entire Storage Account must be deleted and restored from Azure Migrate',
      'Microsoft must ship a physical Azure Data Box disk containing the PDF'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Archive is an OFFLINE tier—you can read blob metadata, but reading the payload requires asynchronous restoration first.',
    explanation: 'The Archive tier is an offline storage tier with the lowest storage cost and highest retrieval latency. While a blob is in Archive, its data cannot be read or modified until it is rehydrated to an online tier (Hot or Cool) via Standard (up to 15 hours) or High priority rehydration.',
    awsComparison: 'Identical to restoring an object from Amazon S3 Glacier Flexible Retrieval / Deep Archive before downloading it.'
  },
  {
    id: 'az900-a2-041',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Blob Access Tiers Retention Rules',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure Blob Storage access tiers and minimum retention periods.',
    statements: [
      {
        statement: 'The Cool tier is an online tier optimized for data stored for a minimum of 30 days, while the Cold tier is an online tier optimized for a minimum of 90 days.',
        answer: true
      },
      {
        statement: 'The Archive tier can be set as the default account-level access tier for newly uploaded blobs on a Storage Account, and requires a minimum 180-day retention window to avoid early deletion fees.',
        answer: false
      },
      {
        statement: 'Deleting or overwriting a blob in the Archive tier after only 10 days incurs an early deletion penalty prorated for the remaining 170 days.',
        answer: true
      }
    ],
    awsBridgeHint: 'Check statement 2 carefully: Archive has a 180-day minimum, yes, but can Archive be set as the default *account-level* tier? Only Hot, Cool, and Cold can—Archive is blob-level only!',
    explanation: 'Cool (30 days) and Cold (90 days) are online tiers that—along with Hot—can be configured as the Storage Account default tier. Archive (180-day minimum retention with prorated early-deletion fees) can ONLY be set at the individual blob level or via lifecycle policies, never as the account-wide default tier.',
    awsComparison: 'Subtle Azure detail: Hot/Cool/Cold work at account default or blob level; Archive is strictly per-blob (or lifecycle rule) with a 180-day minimum.'
  },
  {
    id: 'az900-a2-042',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Storage Redundancy — LRS',
    difficulty: 1,
    format: 'single',
    prompt: 'How does Locally Redundant Storage (LRS) replicate your data, and what durability SLA does it offer over a given year?',
    options: [
      'Replicates data synchronously across three Availability Zones for 12 nines of durability',
      'Replicates data asynchronously to a paired secondary region for 16 nines of durability',
      'Replicates data three times synchronously within a single physical datacenter in the primary region for 11 nines (99.999999999%) of durability',
      'Stores a single un-replicated copy on a temporary local SSD with 3 nines of durability'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Lowest-cost Azure storage redundancy: 3 copies inside ONE building = 11 nines (watch out—unlike standard S3, LRS does NOT span multiple AZs!).',
    explanation: 'Locally Redundant Storage (LRS) maintains three synchronous copies of data within a single physical datacenter in the primary region, delivering at least 99.999999999% (11 nines) durability. Because all three copies sit in one datacenter, LRS does not protect against a datacenter-wide fire or flood.',
    awsComparison: 'CRITICAL AWS GOTCHA: Amazon S3 Standard gives 11 nines across >=3 AZs, whereas Azure LRS gives 11 nines inside ONE single datacenter (more like S3 One Zone-IA)!'
  },
  {
    id: 'az900-a2-043',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Storage Redundancy — ZRS',
    difficulty: 2,
    format: 'single',
    prompt: 'An application requires synchronous storage replication across three physically separate Availability Zones within a single Azure Region, delivering at least 99.9999999999% (12 nines) durability without replicating data outside that region. Which redundancy option should be configured?',
    options: [
      'Locally Redundant Storage (LRS)',
      'Geo-Redundant Storage (GRS)',
      'Read-Access Geo-Redundant Storage (RA-GRS)',
      'Zone-Redundant Storage (ZRS)'
    ],
    correctIndices: [3],
    awsBridgeHint: '3 synchronous copies across 3 AZs inside the primary region = 12 nines in Azure.',
    explanation: 'Zone-Redundant Storage (ZRS) copies data synchronously across three Azure Availability Zones in the primary region, achieving 12 nines of object durability while keeping all data strictly inside a single region. GRS and RA-GRS replicate outside the primary region to the paired secondary region.',
    awsComparison: 'Architecturally matches Amazon S3 Standard’s multi-AZ topology, while Azure credits ZRS with 12 nines of durability.'
  },
  {
    id: 'az900-a2-044',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Storage Redundancy — GRS vs RA-GRS',
    difficulty: 3,
    format: 'single',
    prompt: 'A company configures Geo-Redundant Storage (GRS) on its primary Storage Account without enabling the Read-Access (RA) option. Under what condition can applications read data from the secondary paired region?',
    options: [
      'Only after Microsoft or the customer initiates a storage account failover from the primary region to the secondary region',
      'At any time by appending "-secondary" to the blob service endpoint hostname',
      'Whenever CPU utilization on web servers exceeds 70% in the primary region',
      'Never; GRS deletes secondary copies unless Archive tier is enabled'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Standard GRS keeps the secondary region dark/opaque until failover; immediate `-secondary` endpoint reads require the RA- variant!',
    explanation: 'With standard GRS or GZRS (16 nines durability), data is replicated asynchronously to the paired secondary region, but that secondary copy is NOT accessible for reads unless Microsoft or the customer triggers a storage failover. Enabling Read-Access (RA-GRS or RA-GZRS) exposes a read-only `-secondary` endpoint at all times.',
    awsComparison: 'Major AZ-900 exam trap: unlike AWS S3 Cross-Region Replication where destination buckets are immediately readable, Azure GRS/GZRS secondary data is unreadable unless you select RA-GRS or RA-GZRS!'
  },
  {
    id: 'az900-a2-045',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Storage Redundancy — GZRS',
    difficulty: 2,
    format: 'single',
    prompt: 'Which Azure Storage redundancy option combines synchronous replication across three Availability Zones in the primary region with asynchronous LRS replication to the paired secondary region for 16 nines (99.99999999999999%) of durability?',
    options: [
      'Zone-Redundant Storage (ZRS)',
      'Geo-Zone-Redundant Storage (GZRS)',
      'Locally Redundant Storage (LRS)',
      'Premium Page Blob LRS'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Combines multi-AZ resiliency in Region 1 (ZRS) + paired cross-region disaster recovery in Region 2 (GRS).',
    explanation: 'Geo-Zone-Redundant Storage (GZRS) copies data synchronously across three Availability Zones in the primary region AND asynchronously replicates to the paired secondary region (where three LRS copies are kept), delivering 16 nines of durability and maximum protection against both datacenter and regional disasters.',
    awsComparison: 'Equivalent to Amazon S3 Standard (Multi-AZ) combined with S3 Cross-Region Replication (CRR) to a second AWS Region.'
  },
  {
    id: 'az900-a2-046',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Storage Redundancy Ordering',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order these Azure Storage redundancy configurations from the SMALLEST failure-isolation footprint / lowest cost (top) to the MOST comprehensive availability and read-access footprint (bottom).',
    correctSequence: [
      'Locally Redundant Storage (LRS) — 3 synchronous copies in a single datacenter (11 nines)',
      'Zone-Redundant Storage (ZRS) — 3 synchronous copies across 3 Availability Zones in one region (12 nines)',
      'Geo-Zone-Redundant Storage (GZRS) — 3 AZs in primary region plus async LRS in paired region, readable only on failover (16 nines)',
      'Read-Access Geo-Zone-Redundant Storage (RA-GZRS) — GZRS plus continuous read-only endpoint access in the secondary region (16 nines)'
    ],
    awsBridgeHint: 'Progress from 1 datacenter (LRS) -> 3 AZs (ZRS) -> 3 AZs + dark secondary region (GZRS) -> 3 AZs + live read-only secondary region (RA-GZRS).',
    explanation: 'Storage redundancy expands step-by-step: LRS protects against rack failures in one building (11 nines); ZRS protects against datacenter failures across 3 AZs (12 nines); GZRS adds regional catastrophe protection (16 nines); and RA-GZRS adds immediate read access to the secondary region without waiting for failover.',
    awsComparison: 'Memorize the nines progression for AZ-900: LRS = 11 nines, ZRS = 12 nines, GRS / RA-GRS / GZRS / RA-GZRS = 16 nines!'
  },
  {
    id: 'az900-a2-047',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Storage Redundancy Copy Counts & Async RPO',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding how Azure Storage replicates data across regions.',
    statements: [
      {
        statement: 'Geo-Redundant Storage (GRS) maintains a total of six copies of your data: three synchronous LRS copies in the primary region and three LRS copies in the paired secondary region.',
        answer: true
      },
      {
        statement: 'Replication from the primary region to the secondary paired region in GRS and GZRS is synchronous, guaranteeing a strict zero-second Recovery Point Objective (RPO) during sudden regional disasters.',
        answer: false
      },
      {
        statement: 'Enabling Read-Access Geo-Redundant Storage (RA-GRS) provides a separate secondary endpoint for read operations, though reads from the secondary endpoint are eventually consistent due to asynchronous replication.',
        answer: true
      }
    ],
    awsBridgeHint: 'Cross-region replication hundreds of miles apart is ALWAYS asynchronous (typically <15 min RPO), never synchronous!',
    explanation: 'GRS maintains 6 total copies (3 in primary + 3 in secondary). Because paired regions sit hundreds of miles apart, cross-region replication in GRS/GZRS/RA-GRS/RA-GZRS is asynchronous (typically RPO < 15 minutes, not synchronous zero-RPO), meaning RA-GRS secondary reads are eventually consistent.',
    awsComparison: 'Same physics and consistency behavior as AWS S3 Cross-Region Replication (asynchronous replication with eventual consistency on the replica).'
  },
  {
    id: 'az900-a2-048',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Data Movement — AzCopy',
    difficulty: 1,
    format: 'single',
    prompt: 'A DevOps engineer wants to write an automated bash script that uploads nightly database backups and static build artifacts at high concurrency into Azure Blob Storage using Shared Access Signatures or Microsoft Entra ID authentication. Which lightweight command-line tool is purpose-built for this?',
    options: [
      'Azure Storage Explorer',
      'Azure Migrate',
      'AzCopy',
      'Azure File Sync'
    ],
    correctIndices: [2],
    awsBridgeHint: 'High-performance standalone command-line binary built specifically for scripted transfers to/from/between Azure Storage Accounts.',
    explanation: 'AzCopy is a high-performance command-line utility for copying blobs or files to, from, or between Azure Storage accounts with optimal concurrency and retry support. Storage Explorer is a graphical desktop app, File Sync syncs Windows Servers, and Azure Migrate assesses/migrates full workloads.',
    awsComparison: 'Think `aws s3 sync` / `aws s3 cp` supercharged into a dedicated standalone Go binary (`azcopy copy`).'
  },
  {
    id: 'az900-a2-049',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Data Movement — Azure Storage Explorer',
    difficulty: 1,
    format: 'single',
    prompt: 'A business analyst working on macOS prefers a standalone graphical desktop application to visually browse containers, preview queues and tables, and drag-and-drop files into Azure Storage without writing CLI commands. Which Microsoft tool should they install?',
    options: [
      'AzCopy',
      'Azure Data Box Heavy',
      'Azure Bastion',
      'Azure Storage Explorer'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Cross-platform GUI desktop client (Windows, macOS, Linux) for visually managing blobs, files, queues, and tables.',
    explanation: 'Azure Storage Explorer is a free, standalone graphical desktop app for Windows, macOS, and Linux that lets users visually connect to and manage Azure Storage blobs, files, queues, and tables. (Under the hood, it even uses AzCopy as its transfer engine!)',
    awsComparison: 'Comparable to third-party GUI S3 browsers like Cyberduck, except Microsoft builds and ships Azure Storage Explorer as an official first-party desktop app.'
  },
  {
    id: 'az900-a2-050',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Hybrid Storage — Azure File Sync',
    difficulty: 2,
    format: 'single',
    prompt: 'An architecture firm wants to centralize 40 TB of CAD files in Azure Files while keeping an on-premises Windows Server in each branch office as a fast local cache that automatically tiers cold files out to the cloud when local disk free space runs low. Which service enables this?',
    options: [
      'Azure File Sync',
      'AzCopy',
      'Azure Queue Storage',
      'Azure Cosmos DB'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Turns on-premises Windows Servers into synchronized local caches backed by Azure Files with automatic cloud tiering.',
    explanation: 'Azure File Sync centralizes an organization’s file shares in Azure Files while preserving local SMB speed, ACL permissions, and compatibility on on-premises Windows Server machines—including optional Cloud Tiering to keep only frequently accessed files cached on local disks.',
    awsComparison: 'Directly equivalent to AWS Storage Gateway — File Gateway (Amazon FSx File Gateway / S3 File Gateway).'
  },
  {
    id: 'az900-a2-051',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Migration Tools — Azure Migrate',
    difficulty: 1,
    format: 'single',
    prompt: 'An enterprise CIO wants a single unified Azure hub to discover 400 on-premises VMware virtual machines and SQL databases, map network dependencies, estimate post-migration Azure monthly costs, and orchestrate server replication into Azure. Which service provides this end-to-end hub?',
    options: [
      'Azure Storage Explorer',
      'Azure Migrate',
      'Azure File Sync',
      'AzCopy'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Unified discovery, dependency mapping, TCO/right-sizing assessment, and server/database migration hub.',
    explanation: 'Azure Migrate provides a centralized hub to discover, assess readiness, map dependencies, estimate costs, and execute migrations of on-premises VMware, Hyper-V, physical servers, databases, web apps, and virtual desktops to Azure.',
    awsComparison: 'Combines AWS Migration Hub + AWS Application Discovery Service + AWS Application Migration Service (MGN) under one umbrella.'
  },
  {
    id: 'az900-a2-052',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Offline Migration — Azure Data Box',
    difficulty: 1,
    format: 'single',
    prompt: 'A genomics institute needs to migrate 80 TB of sequencing data to Azure from a rural research facility that only has a shared 50 Mbps internet link. Uploading over the network would take months. Which Azure solution solves this bottleneck?',
    options: [
      'AzCopy over Point-to-Site VPN',
      'Azure Storage Explorer drag-and-drop',
      'Azure Data Box',
      'Azure Queue Storage'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Never underestimate the bandwidth of a ruggedized AES-256 encrypted storage appliance shipped via courier!',
    explanation: 'Azure Data Box provides ruggedized, tamper-resistant, encrypted physical storage appliances (such as Data Box 80 TB or Data Box Heavy 1 PB) shipped by Microsoft to your datacenter so you copy bulk data locally over high-speed LAN and ship the appliance back to an Azure datacenter for ingestion.',
    awsComparison: 'Directly equivalent to the AWS Snowball Edge Storage Optimized family.'
  },
  {
    id: 'az900-a2-053',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Storage & Migration Tool Matching',
    difficulty: 2,
    format: 'multi',
    prompt: 'Which TWO pairings accurately match an Azure tool to its intended operational scenario? (Select 2)',
    options: [
      'Azure File Sync — Multi-site synchronization of Windows Server file shares through a central Azure Files share',
      'Azure Data Box — Real-time millisecond replication of live SQL transactions over public Wi-Fi',
      'Azure Migrate — Agentless discovery, dependency visualization, and right-sizing assessments of on-premises Hyper-V and VMware estates',
      'AzCopy — Graphical desktop dashboard for designing Management Group hierarchies'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'Match File Sync to multi-site Windows Server SMB caching and Azure Migrate to VMware/Hyper-V discovery & right-sizing.',
    explanation: 'Azure File Sync synchronizes multiple on-premises Windows Servers via Azure Files, and Azure Migrate handles discovery, dependency mapping, and migration assessments for Hyper-V/VMware/physical servers. Data Box is for offline physical shipping (not real-time SQL replication), and AzCopy is a CLI storage transfer tool.',
    awsComparison: 'Cleanly separates Storage Gateway (File Sync), Snowball (Data Box), Migration Hub (Azure Migrate), and S3 CLI (AzCopy).'
  },
  {
    id: 'az900-a2-054',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Storage Account Naming Rules',
    difficulty: 2,
    format: 'single',
    prompt: 'A developer attempts to create an Azure Storage Account named `Contoso-Prod-Logs_01`, and deployment fails with a naming validation error. Which naming rule applies to Azure Storage Accounts?',
    options: [
      'Names must be 1 to 64 characters and include at least one uppercase letter and hyphen',
      'Names need only be unique inside the chosen Resource Group',
      'Names must end with `.blob.local` and include underscores',
      'Names must be 3 to 24 characters long, contain ONLY lowercase letters and numbers, and be globally unique across all of Azure'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Even stricter than S3 bucket names: NO hyphens, NO underscores, NO uppercase—3 to 24 lowercase alphanumeric characters globally!',
    explanation: 'Because the Storage Account name forms part of public DNS endpoints (such as `<account>.blob.core.windows.net`), it must be globally unique across Azure, between 3 and 24 characters in length, and contain ONLY lowercase letters (`a-z`) and numbers (`0-9`)—no hyphens or underscores.',
    awsComparison: 'Classic gotcha for AWS engineers: S3 bucket names allow hyphens (`my-prod-bucket`), whereas Azure Storage Account names forbid hyphens (`myprodbucket01` only)!'
  },
  {
    id: 'az900-a2-055',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Cosmos DB',
    difficulty: 1,
    format: 'single',
    prompt: 'Which fully managed Azure database service provides turnkey global distribution, multi-region active-active writes, single-digit millisecond read and write latencies at the 99th percentile, and multiple NoSQL APIs (including MongoDB, Cassandra, Gremlin, and NoSQL JSON)?',
    options: [
      'Azure Cosmos DB',
      'Azure SQL Server on Virtual Machines',
      'Azure Table Storage standard tier',
      'Azure Blob Cold tier'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Azure’s flagship planet-scale, multi-model, low-latency distributed database.',
    explanation: 'Azure Cosmos DB is Microsoft’s fully managed NoSQL (and distributed relational) database engineered for single-digit millisecond response times, instant elastic scalability, 99.999% multi-region availability SLAs, multi-region writes, and wire-compatible APIs for JSON documents, MongoDB, Apache Cassandra, Apache Gremlin (graph), and Table.',
    awsComparison: 'Maps to Amazon DynamoDB Global Tables—plus wire-protocol APIs comparable to Amazon DocumentDB, Keyspaces, and Neptune rolled into one service!'
  },
  {
    id: 'az900-a2-056',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure SQL Managed Instance',
    difficulty: 2,
    format: 'single',
    prompt: 'An enterprise wants to migrate an on-premises SQL Server instance to a fully managed PaaS offering (eliminating OS patching) while retaining near-100% instance-level compatibility for SQL Server Agent jobs, cross-database queries, and native `.bak` database restores. Which Azure SQL option is best?',
    options: [
      'Azure SQL Database (Single Database)',
      'Azure SQL Managed Instance',
      'SQL Server on Azure Virtual Machines',
      'Azure Table Storage'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Sits right in the sweet spot between Single DB PaaS (no cross-DB queries/SQL Agent) and IaaS SQL-on-VM (full OS patching burden).',
    explanation: 'Azure SQL Managed Instance is a PaaS deployment option offering near-100% surface-area compatibility with the latest SQL Server Enterprise Edition engine—supporting SQL Server Agent, cross-database queries, CLR, and native `.bak` restores inside an isolated VNet—while Microsoft handles all OS and DB patching and HA.',
    awsComparison: 'Closest AWS analogue is Amazon RDS Custom / Amazon RDS for SQL Server (instance-scoped features like SQL Agent without managing EC2 OS patches).'
  },
  {
    id: 'az900-a2-057',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'SQL Server on Azure Virtual Machines',
    difficulty: 2,
    format: 'single',
    prompt: 'A legacy accounting system requires SQL Server 2014 pinned to a specific build version alongside third-party COM+ binaries installed directly on the same Windows Server operating system. Which Azure SQL deployment option is required?',
    options: [
      'Azure SQL Database Serverless',
      'Azure Cosmos DB for NoSQL',
      'SQL Server on Azure Virtual Machines (IaaS)',
      'Azure SQL Managed Instance'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Pinned legacy database engine versions and third-party guest OS binaries force an IaaS deployment.',
    explanation: 'SQL Server on Azure Virtual Machines is an IaaS offering granting 100% control over the Windows/Linux operating system and exact SQL Server version, making it mandatory when legacy apps require older SQL builds or co-located OS-level third-party software.',
    awsComparison: 'Equivalent to self-managing Microsoft SQL Server on Amazon EC2.'
  },
  {
    id: 'az900-a2-058',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure SQL Database (PaaS)',
    difficulty: 2,
    format: 'single',
    prompt: 'A SaaS team is building a modern cloud-native multi-tenant application with hundreds of isolated per-customer databases whose usage spikes unpredictably during the day and drops to zero overnight. Which PaaS offering supports Elastic Pools and an auto-pausing Serverless compute tier?',
    options: [
      'SQL Server on Azure Virtual Machines',
      'Azure Files Premium SMB',
      'Azure Data Box Disk',
      'Azure SQL Database'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Modern database-scoped PaaS with shared resource Elastic Pools for multi-tenant SaaS and auto-pause Serverless compute.',
    explanation: 'Azure SQL Database is a modern PaaS relational database ideal for cloud-born applications, offering Single Databases (including a Serverless compute tier that auto-scales and auto-pauses during inactivity), Elastic Pools for sharing resources across multi-tenant SaaS databases, and Hyperscale up to 100 TB.',
    awsComparison: 'Combines capabilities similar to Amazon Aurora Serverless v2 (auto-scaling/auto-pause relational PaaS) using the Microsoft SQL engine.'
  },
  {
    id: 'az900-a2-059',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Database Offerings Evaluation',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure relational and non-relational database services.',
    statements: [
      {
        statement: 'Azure Cosmos DB supports configuring multiple write regions so global users can write data locally to their nearest region.',
        answer: true
      },
      {
        statement: 'In SQL Server on Azure Virtual Machines (IaaS), Microsoft completely locks customers out of Remote Desktop / SSH access to the host operating system.',
        answer: false
      },
      {
        statement: 'Azure also provides fully managed PaaS open-source relational databases including Azure Database for PostgreSQL and Azure Database for MySQL.',
        answer: true
      }
    ],
    awsBridgeHint: 'Cosmos DB does multi-region active-active writes, IaaS VMs always give full RDP/SSH OS access, and managed Postgres/MySQL are first-class PaaS services.',
    explanation: 'Cosmos DB offers turnkey multi-region writes; SQL Server on Azure VMs is IaaS so customers retain full OS-level RDP/SSH control; and Azure provides fully managed Flexible Server PaaS offerings for PostgreSQL and MySQL.',
    awsComparison: 'Azure Database for PostgreSQL / MySQL Flexible Server maps directly to Amazon RDS for PostgreSQL / MySQL.'
  },
  {
    id: 'az900-a2-060',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Virtual Machine Disks & Sizing',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure Virtual Machines and their attached storage.',
    statements: [
      {
        statement: 'Data stored on a virtual machine’s local Temporary Disk (such as the D: drive on Windows or /dev/sdb1 on Linux) is ephemeral and can be permanently lost when the VM is deallocated, resized, or moved to a new host.',
        answer: true
      },
      {
        statement: 'Persisted operating system files and production database files should be stored on Azure Managed Disks rather than the Temporary Disk.',
        answer: true
      },
      {
        statement: 'Once an Azure Virtual Machine is created, its VM size (SKU) is permanently locked and can never be scaled vertically.',
        answer: false
      }
    ],
    awsBridgeHint: 'Azure’s Temporary Disk behaves just like EC2 Instance Store (ephemeral swap/pagefile only!), while Managed Disks behave like Amazon EBS.',
    explanation: 'Many Azure VM sizes include a local Temporary Disk intended strictly for pagefiles, swap files, or disposable cache—any data on it is lost during host failure, resizing, or deallocation. Persistent data belongs on Azure Managed Disks (Standard HDD, Standard SSD, Premium SSD, Ultra Disk), and VMs can be resized vertically as needed.',
    awsComparison: 'Temporary Disk = EC2 Instance Store (ephemeral); Azure Managed Disk = Amazon EBS (persistent).'
  },
  {
    id: 'az900-a2-061',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Compute & Container Comparison',
    difficulty: 2,
    format: 'multi',
    prompt: 'An architect is matching workloads to Azure compute services. Which TWO recommendations follow Microsoft architectural best practices? (Select 2)',
    options: [
      'Use Azure Container Instances (ACI) for quick, isolated, single-container task execution without managing cluster infrastructure',
      'Use an Availability Set across two racks in one building to guarantee zero data loss if a meteor destroys the entire city',
      'Use Azure Virtual Machine Scale Sets (VMSS) to automatically scale a fleet of identical Linux VMs out and in behind a load balancer',
      'Use Azure Functions Consumption plan to host a stateful Windows 11 desktop GUI session for graphic designers'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'ACI fits simple standalone containers and VMSS fits autoscaled VM fleets; Availability Sets never survive city-wide disasters and Functions never host VDI desktops.',
    explanation: 'ACI is ideal for fast, serverless single-container execution, and VMSS automates horizontal scaling for identical VM fleets. Availability Sets only protect against rack failures inside one datacenter, and Windows 11 GUI sessions belong on Azure Virtual Desktop (AVD).',
    awsComparison: 'ACI -> standalone Fargate task; VMSS -> EC2 Auto Scaling Group; AVD -> Amazon WorkSpaces.'
  },
  {
    id: 'az900-a2-062',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Virtual Networking Rules',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure Virtual Networks (VNets) and connectivity.',
    statements: [
      {
        statement: 'Two Azure Virtual Networks with overlapping IPv4 CIDR address spaces (both using 10.10.0.0/16) can be connected directly via VNet Peering.',
        answer: false
      },
      {
        statement: 'By default, resources placed in different subnets within the SAME Azure Virtual Network can route traffic to one another unless blocked by a Network Security Group or custom route table.',
        answer: true
      },
      {
        statement: 'An Azure Private Endpoint allows VNet workloads to reach supported PaaS resources over a private IP address without exposing the PaaS resource to the public internet.',
        answer: true
      }
    ],
    awsBridgeHint: 'Overlapping CIDRs break VNet Peering, intra-VNet system routes connect all subnets in the same VNet automatically, and Private Endpoints use RFC-1918 private IPs.',
    explanation: 'Peered VNets must have strictly non-overlapping IP address spaces. Within a single VNet, Azure automatically populates system routes so all subnets in that VNet can communicate unless filtered by NSGs or User-Defined Routes (UDRs). Private Endpoints map PaaS services into your VNet’s private IP space.',
    awsComparison: 'Identical to Amazon VPC: intra-VPC local route allows all subnets to communicate by default, and VPC Peering forbids overlapping CIDRs.'
  },
  {
    id: 'az900-a2-063',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Blob Lifecycle Management',
    difficulty: 2,
    format: 'multi',
    prompt: 'A media platform uploads thousands of daily livestream recordings to Azure Blob Storage. Recordings are watched heavily for 7 days, rarely viewed between day 8 and day 180, kept offline for legal compliance for 3 years, and then purged. Which TWO capabilities of Azure Blob Storage Lifecycle Management policies automate this without custom code? (Select 2)',
    options: [
      'Automatically transitioning blobs from Hot to Cool/Cold and then to Archive based on days since last modification or last access',
      'Automatically converting unstructured MP4 video blobs into relational SQL Managed Instance tables after 30 days',
      'Automatically deleting expired blobs at the end of their 3-year retention lifecycle',
      'Automatically upgrading LRS storage accounts to ExpressRoute circuits every weekend'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'Rule-based automated tiering downward (Hot -> Cool -> Cold -> Archive) and automated expiration deletion.',
    explanation: 'Azure Blob Storage Lifecycle Management lets you define rule-based policies to automatically transition blobs to cooler/archive storage tiers as they age (or based on last-access tracking) and automatically delete blobs at the end of their retention period.',
    awsComparison: 'Directly equivalent to Amazon S3 Lifecycle Configuration rules (Transition actions + Expiration actions).'
  },
  {
    id: 'az900-a2-064',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Core Storage Account Data Services',
    difficulty: 1,
    format: 'multi',
    prompt: 'A standard general-purpose v2 Azure Storage Account unites four core cloud data services under a single account resource. Which THREE services below are native components of an Azure Storage Account? (Select 3)',
    options: [
      'Azure Files (managed SMB and NFS file shares)',
      'Azure Queue Storage (asynchronous message queuing)',
      'Azure Table Storage (schemaless key-attribute NoSQL store)',
      'Azure SQL Managed Instance (enterprise relational engine)',
      'Azure Kubernetes Service (managed container control plane)'
    ],
    selectCount: 3,
    correctIndices: [0, 1, 2],
    awsBridgeHint: 'Remember the 4 pillars inside one Azure Storage Account: Blobs, Files, Queues, and Tables!',
    explanation: 'Every general-purpose v2 Azure Storage Account encompasses four data services: Azure Blobs, Azure Files, Azure Queues, and Azure Tables. Azure SQL Managed Instance and AKS are standalone database and compute services outside Storage Accounts.',
    awsComparison: 'Unlike AWS where S3, FSx/EFS, SQS, and DynamoDB are completely separate top-level services, an Azure Storage Account bundles Blobs + Files + Queues + Tables under one roof!'
  },
  {
    id: 'az900-a2-065',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Microsoft Entra ID Overview',
    difficulty: 1,
    format: 'single',
    prompt: 'Which cloud-based identity and access management service provides centralized authentication, Single Sign-On (SSO), application registration, and device identity management across Azure, Microsoft 365, and thousands of third-party SaaS applications?',
    options: [
      'Microsoft Entra ID',
      'Azure Network Security Groups',
      'Azure Key Vault Hardware Security Modules',
      'Azure Dedicated Host'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Microsoft’s flagship multi-tenant cloud directory and identity provider for workforce and workload identities.',
    explanation: 'Microsoft Entra ID is Microsoft’s cloud-based identity and access management service, authenticating users, workloads, and devices via modern web protocols (OAuth 2.0, OpenID Connect, SAML, WS-Federation) across Azure, Microsoft 365, and third-party SaaS applications.',
    awsComparison: 'Combines the roles of AWS IAM Identity Center (SSO) and an enterprise IdP like Okta—note that every Azure Subscription trusts a Microsoft Entra tenant for control-plane authentication!'
  },
  {
    id: 'az900-a2-066',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Microsoft Entra ID vs Windows Server AD',
    difficulty: 2,
    format: 'single',
    prompt: 'How does Microsoft Entra ID differ architecturally from traditional on-premises Windows Server Active Directory Domain Services (AD DS)?',
    options: [
      'Microsoft Entra ID authenticates exclusively via legacy NTLM challenges over UDP port 137',
      'Microsoft Entra ID is a flat, internet-native identity service using HTTPS protocols (SAML, OAuth 2.0, OIDC) without Organizational Units (OUs) or Group Policy Objects (GPOs)',
      'Microsoft Entra ID requires customers to deploy at least two Windows Server domain controller virtual machines per subnet',
      'Microsoft Entra ID cannot synchronize identities from an existing on-premises directory'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Cloud-native HTTP/REST identity directory vs. legacy Kerberos/LDAP/GPO domain controllers.',
    explanation: 'Microsoft Entra ID was designed for cloud and web applications using HTTP/HTTPS-based protocols (OAuth 2.0, OIDC, SAML) rather than Kerberos or LDAP, and uses a flat tenant structure without Organizational Units (OUs) or Windows Group Policy Objects (GPOs). Hybrid organizations can synchronize on-premises AD DS to Entra ID via Microsoft Entra Connect.',
    awsComparison: 'Same architectural contrast as AWS IAM Identity Center (modern SAML/OIDC) vs. self-managed Active Directory on EC2.'
  },
  {
    id: 'az900-a2-067',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Microsoft Entra Domain Services',
    difficulty: 2,
    format: 'single',
    prompt: 'An organization lifts-and-shifts twenty legacy Windows and Linux applications to Azure Virtual Machines. The applications require traditional domain join, LDAP directory binds, Kerberos/NTLM authentication, and Group Policy—but the IT team does NOT want to deploy or patch domain controller VMs. Which service solves this?',
    options: [
      'Microsoft Entra External ID (B2C)',
      'Azure Role-Based Access Control (RBAC)',
      'Microsoft Entra Domain Services',
      'Azure Bastion'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Fully managed Active Directory-compatible domain controllers injected into your VNet as a managed service.',
    explanation: 'Microsoft Entra Domain Services provides managed domain services—including Windows domain join, Group Policy, LDAP, and Kerberos/NTLM authentication—directly inside an Azure Virtual Network while synchronizing automatically with your Microsoft Entra ID tenant, with zero domain controller VMs to patch.',
    awsComparison: 'Directly equivalent to AWS Directory Service for Microsoft Active Directory (AWS Managed Microsoft AD).'
  },
  {
    id: 'az900-a2-068',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Authentication vs Authorization',
    difficulty: 1,
    format: 'single',
    prompt: 'In identity and security architecture, what is the exact difference between authentication (AuthN) and authorization (AuthZ)?',
    options: [
      'Authentication encrypts hard drives at rest, whereas authorization configures firewall ports',
      'Authentication assigns subscription budgets, whereas authorization resets forgotten user passwords',
      'Authentication applies only to external guests, whereas authorization applies only to global administrators',
      'Authentication verifies that a user, service, or device is who they claim to be, whereas authorization determines which resources and actions that verified identity is permitted to access'
    ],
    correctIndices: [3],
    awsBridgeHint: 'AuthN = proving your identity (passport check); AuthZ = checking your permissions/role (boarding pass seat class).',
    explanation: 'Authentication establishes identity ("Who are you?") through credentials, MFA, or certificates in Microsoft Entra ID. Authorization ("What are you allowed to do?") evaluates permissions—such as Azure RBAC roles—to grant or deny specific operations on data and resources.',
    awsComparison: 'Identical AuthN (IAM/IdP sign-in) vs. AuthZ (IAM Policy evaluation) distinction in AWS.'
  },
  {
    id: 'az900-a2-069',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Single Sign-On (SSO)',
    difficulty: 1,
    format: 'single',
    prompt: 'What is the primary security and productivity benefit of configuring Single Sign-On (SSO) with Microsoft Entra ID across an enterprise’s SaaS and internal applications?',
    options: [
      'Users authenticate once with one strong corporate identity to access all authorized apps, reducing password reuse and enabling instant centralized access revocation when an employee departs',
      'Every SaaS application creates its own separate local password database that never expires',
      'Multi-Factor Authentication and Conditional Access policies are bypassed for all integrated apps',
      'Users no longer need corporate accounts to view confidential payroll portals'
    ],
    correctIndices: [0],
    awsBridgeHint: 'One central identity means one place to enforce MFA and one switch to flip when someone leaves the company.',
    explanation: 'Single Sign-On (SSO) enables users to remember a single credential and sign in once to access multiple applications, lowering helpdesk password-reset load, discouraging insecure password reuse, and ensuring that disabling a single Microsoft Entra account immediately cuts off access across all federated apps.',
    awsComparison: 'Matches centralized workforce federation via AWS IAM Identity Center.'
  },
  {
    id: 'az900-a2-070',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Multi-Factor Authentication (MFA)',
    difficulty: 1,
    format: 'single',
    prompt: 'A login portal requires a user to enter both an alphanumeric password AND a secret mother’s maiden name answer before signing in. Does this satisfy true Multi-Factor Authentication (MFA)?',
    options: [
      'Yes, because two separate text prompts were completed during login',
      'No, because both prompts represent "something you know"; true MFA requires two or more distinct categories among something you know, something you have, and something you are',
      'Yes, provided the password is at least twelve characters long',
      'No, because true MFA requires disabling all passwords and biometrics simultaneously'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Two knowledge secrets still equal one factor category! True MFA mixes Knowledge + Possession + Inherence.',
    explanation: 'Multi-Factor Authentication (MFA) requires at least two DIFFERENT factor categories: something you know (password/PIN), something you have (hardware security key, phone with Authenticator app), and something you are (fingerprint or facial biometric). Asking for two memorized secrets remains single-factor authentication.',
    awsComparison: 'Classic security fundamentals question shared across AZ-900 and AWS security exams.'
  },
  {
    id: 'az900-a2-071',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Passwordless Authentication Methods',
    difficulty: 2,
    format: 'multi',
    prompt: 'Microsoft recommends replacing phishable passwords with passwordless authentication methods backed by public-key cryptography and biometrics/PINs. Which THREE technologies are Microsoft’s core supported passwordless authentication options in Microsoft Entra ID? (Select 3)',
    options: [
      'Windows Hello for Business',
      'Microsoft Authenticator app (number matching / push notification with biometric or PIN)',
      'FIDO2-compliant hardware security keys',
      'Unencrypted HTTP Basic Authentication headers',
      'Shared team spreadsheet passwords rotated monthly'
    ],
    selectCount: 3,
    correctIndices: [0, 1, 2],
    awsBridgeHint: 'Memorize Microsoft’s Big Three passwordless options: OS biometric/PIN bound to TPM, mobile Authenticator app, and FIDO2 keys!',
    explanation: 'Microsoft Entra ID highlights three primary passwordless authentication methods: Windows Hello for Business (biometric/PIN tied to PC TPM hardware), the Microsoft Authenticator app (turning iOS/Android phones into cryptographic MFA credentials), and FIDO2 security keys (phishing-resistant USB/NFC hardware tokens).',
    awsComparison: 'AZ-900 explicitly tests naming all three Microsoft passwordless methods (Windows Hello for Business, Microsoft Authenticator, FIDO2 keys).'
  },
  {
    id: 'az900-a2-072',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Passwordless & MFA Concepts',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Multi-Factor Authentication (MFA) and Passwordless sign-in.',
    statements: [
      {
        statement: 'Signing in with Windows Hello for Business or a FIDO2 security key plus a local biometric/PIN inherently satisfies Multi-Factor Authentication because it combines device possession ("something you have") with biometric/PIN ("something you are" or "know").',
        answer: true
      },
      {
        statement: 'Passwordless authentication is less secure than a traditional static password because no characters are sent over the network.',
        answer: false
      },
      {
        statement: 'If an attacker steals an employee’s corporate password via a phishing email, enforced MFA prevents account takeover unless the attacker also compromises the second factor.',
        answer: true
      }
    ],
    awsBridgeHint: 'Cryptographic private keys never leave the device in passwordless auth, making it stronger—not weaker—than phishable passwords!',
    explanation: 'Passwordless credentials bind a private cryptographic key inside hardware (TPM, phone Secure Enclave, or FIDO2 token) unlocked locally by biometric or PIN—delivering strong phishing-resistant MFA without ever transmitting a shared secret over the network. Enforcing MFA blocks >99% of bulk credential-stuffing and password-theft attacks.',
    awsComparison: 'Aligns with AWS IAM passkeys / FIDO2 security key best practices.'
  },
  {
    id: 'az900-a2-073',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'External Identities — B2B Collaboration',
    difficulty: 2,
    format: 'single',
    prompt: 'Contoso hires external legal consultants from Fabrikam LLP to review documents in an internal SharePoint site and view specific Azure Resource Groups. Contoso wants the consultants to sign in using their existing `@fabrikam.com` corporate credentials without creating new employee mailboxes in Contoso’s directory. Which Microsoft Entra capability should Contoso use?',
    options: [
      'Microsoft Entra Domain Services',
      'Customer Identity and Access Management (B2C consumer tenant)',
      'Microsoft Entra External ID — B2B Collaboration (guest users)',
      'Azure Anonymous Public Blob Access'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Partner/vendor/contractor guest access into your workforce tenant using their own home identity.',
    explanation: 'B2B (Business-to-Business) collaboration in Microsoft Entra External ID lets you invite external partners, vendors, and contractors as guest users into your workforce directory so they sign in with their own existing organizational or social identities while governed by your Conditional Access and RBAC rules.',
    awsComparison: 'Analogous to cross-account/external IdP workforce federation in AWS, except Entra B2B natively invites external email guests directly into your tenant.'
  },
  {
    id: 'az900-a2-074',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'External Identities — Customer CIAM (B2C)',
    difficulty: 2,
    format: 'single',
    prompt: 'A retail brand is launching a mobile loyalty app for five million everyday shoppers. Shoppers must be able to self-register and sign in using Google, Facebook, Apple, or personal email accounts on fully custom-branded login screens, completely isolated from the retailer’s internal employee directory. Which identity solution fits this scenario?',
    options: [
      'Microsoft Entra Domain Services with LDAP',
      'Azure Role-Based Access Control Owner assignments',
      'Windows Hello for Business corporate domain join',
      'Microsoft Entra External ID for customers (Customer Identity and Access Management / B2C)'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Consumer-scale customer identity and access management (millions of shoppers, social logins, custom white-label UI) isolated from internal staff.',
    explanation: 'Microsoft Entra External ID in an external customer configuration (B2C) provides Customer Identity and Access Management (CIAM) built for millions of consumers, offering self-service registration, social identity providers, and white-labeled sign-in flows isolated in a separate directory from internal employees.',
    awsComparison: 'Directly equivalent to Amazon Cognito User Pools.'
  },
  {
    id: 'az900-a2-075',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Conditional Access Architecture',
    difficulty: 2,
    format: 'single',
    prompt: 'A security policy states: "If a member of the Finance group attempts to sign in to the payroll portal from an unrecognized country, require phishing-resistant MFA and a compliant Intune-managed laptop; if sign-in risk is High, block access immediately." Which Microsoft Entra capability enforces this policy?',
    options: [
      'Microsoft Entra Conditional Access',
      'Azure DNS Private Zones',
      'Availability Set Update Domains',
      'Azure Storage Shared Key rotation'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Microsoft Entra’s Zero Trust "if-then" policy engine combining Signals -> Decision -> Enforcement.',
    explanation: 'Conditional Access is Microsoft Entra ID’s Zero Trust policy engine. It brings together real-time signals (user/group membership, IP location, device compliance state, client app, and sign-in risk) to make an automated decision (allow or block) and enforce controls such as requiring MFA or a compliant device.',
    awsComparison: 'Much richer identity-layer context engine than standard AWS IAM condition keys—similar to Okta Adaptive MFA / AWS Verified Access device-trust policies.'
  },
  {
    id: 'az900-a2-076',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Conditional Access Evaluation Sequence',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order the stages of a Microsoft Entra Conditional Access sign-in evaluation from initial login attempt (top) to session access (bottom).',
    correctSequence: [
      'Gather sign-in signals including user/group identity, IP geographic location, device health/compliance, target application, and real-time risk score',
      'Match all active Conditional Access policies scoped to that user, application, and sign-in context',
      'Determine the access decision (Block access immediately if a block condition matches, or Grant access subject to controls)',
      'Enforce required grant controls (such as completing Multi-Factor Authentication or verifying device compliance) before issuing the access token'
    ],
    awsBridgeHint: 'Remember Microsoft’s exact 3-part Conditional Access formula: Signals -> Decision -> Enforcement!',
    explanation: 'Conditional Access operates as an if-then pipeline: first collecting identity, network, device, and risk signals; matching applicable policies; determining Block vs. Grant (Block always wins); and finally enforcing required Grant controls like MFA before minting tokens.',
    awsComparison: 'Memorize "Signals + Decision + Enforcement" verbatim—it appears directly in Microsoft Learn AZ-900 diagrams!'
  },
  {
    id: 'az900-a2-077',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure RBAC Core Built-in Roles',
    difficulty: 2,
    format: 'single',
    prompt: 'A cloud engineer needs permission to create, modify, resize, and delete all resources inside Resource Group `RG-App-Prod`, but MUST NOT be allowed to grant or modify RBAC permissions for other users. Which built-in Azure RBAC role follows least privilege for this engineer?',
    options: [
      'Owner',
      'Contributor',
      'Reader',
      'User Access Administrator'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Full create/update/delete power over Azure resources MINUS the ability to change IAM/RBAC role assignments!',
    explanation: 'The built-in `Contributor` role grants permissions to create and manage all types of Azure resources within the assigned scope, but explicitly excludes granting access to others in Azure RBAC. `Owner` includes full access PLUS role delegation, `Reader` is view-only, and `User Access Administrator` manages role assignments without creating workload resources.',
    awsComparison: 'Similar to AWS’s managed `PowerUserAccess` policy (full resource admin except IAM user/role delegation) vs. `AdministratorAccess` (`Owner`).'
  },
  {
    id: 'az900-a2-078',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure RBAC vs Microsoft Entra Roles',
    difficulty: 3,
    format: 'single',
    prompt: 'What is the scope boundary distinction between Azure RBAC roles (such as Contributor) and Microsoft Entra roles (such as User Administrator or Global Administrator)?',
    options: [
      'Azure RBAC manages Microsoft 365 mailboxes, whereas Microsoft Entra roles manage virtual machine disk IOPS',
      'Both systems are identical and assign permissions exclusively at the physical server rack level',
      'Azure RBAC controls access to Azure resources across ARM scopes (Management Groups, Subscriptions, Resource Groups, Resources), whereas Microsoft Entra roles control access to directory objects such as users, groups, licenses, and enterprise applications',
      'Azure RBAC works only on-premises, whereas Microsoft Entra roles work only in sovereign clouds'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Separate Tenant/Directory IAM (users, groups, M365 licenses) from Cloud Resource Control-Plane IAM (subscriptions, RGs, VMs, storage).',
    explanation: 'Azure separates identity governance into two distinct RBAC planes: Microsoft Entra roles govern tenant-level directory objects (creating users, resetting passwords, managing groups and SaaS apps), whereas Azure RBAC governs Azure Resource Manager (ARM) resources across Management Groups, Subscriptions, Resource Groups, and Resources.',
    awsComparison: 'Crucial Azure distinction: in AWS, IAM handles both IAM users and EC2 permissions inside one account; in Azure, Entra Roles manage the tenant directory while Azure RBAC manages subscription resources!'
  },
  {
    id: 'az900-a2-079',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure RBAC Evaluation Rules',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding how Azure Role-Based Access Control (Azure RBAC) permissions are evaluated.',
    statements: [
      {
        statement: 'If a user is assigned the Reader role at the Subscription scope and the Contributor role on one specific Resource Group, their effective permission on that Resource Group is the union (Reader + Contributor) because Azure RBAC is additive.',
        answer: true
      },
      {
        statement: 'An Azure RBAC role assigned at a parent Management Group or Subscription is inherited automatically by child Resource Groups and Resources.',
        answer: true
      },
      {
        statement: 'Assigning the Reader role on a child Resource Group revokes and overrides an Owner role inherited from the parent Subscription.',
        answer: false
      }
    ],
    awsBridgeHint: 'Additive permissions flow top-down: adding a narrower role at a child scope NEVER subtracts broader permissions inherited from a parent scope!',
    explanation: 'Azure RBAC uses an additive model with top-down scope inheritance: effective permissions equal the union of all role assignments across parent and child scopes (unless an explicit Azure Blueprint/Deployment Stack Deny Assignment exists). Adding `Reader` on a child RG never revokes `Owner` inherited from the Subscription.',
    awsComparison: 'Just like AWS IAM Allow statements being additive—to restrict someone on one RG only, grant `Owner`/`Contributor` ONLY on the RGs they need rather than at the whole Subscription!'
  },
  {
    id: 'az900-a2-080',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Zero Trust Guiding Principles',
    difficulty: 1,
    format: 'multi',
    prompt: 'Instead of trusting devices simply because they sit behind a corporate office firewall, the Microsoft Zero Trust security model rests on THREE explicit guiding principles. Select all THREE principles. (Select 3)',
    options: [
      'Verify explicitly (authenticate and authorize using all available data points including identity, location, device health, and risk)',
      'Use least privilege access (limit access with Just-In-Time and Just-Enough-Access, adaptive policies, and data protection)',
      'Assume breach (minimize blast radius, segment networks, verify end-to-end encryption, and use analytics for threat detection)',
      'Trust internal corporate LAN subnets implicitly without authentication',
      'Disable encryption inside private virtual networks to speed up packet inspection'
    ],
    selectCount: 3,
    correctIndices: [0, 1, 2],
    awsBridgeHint: 'Memorize Microsoft’s exact 3 Zero Trust pillars verbatim: Verify explicitly, Use least privilege access, Assume breach!',
    explanation: 'Microsoft’s Zero Trust architecture is anchored on three explicit principles: (1) Verify explicitly, (2) Use least privilege access (JIT/JEA), and (3) Assume breach. Implicit trust of internal corporate networks is the exact legacy perimeter mindset Zero Trust replaces.',
    awsComparison: 'Heavily tested verbatim trio on AZ-900—expect at least one question directly asking for Verify explicitly, Least privilege, and Assume breach!'
  },
  {
    id: 'az900-a2-081',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Zero Trust — Assume Breach',
    difficulty: 2,
    format: 'single',
    prompt: 'A cloud security architect segments workloads into isolated subnets with strict east-west Network Security Group rules, enforces TLS encryption between internal microservices, and streams logs to automated anomaly detection—operating as if an attacker has already compromised one internal node. Which Zero Trust principle is being applied?',
    options: [
      'Implicit perimeter trust',
      'Consumption-based elasticity',
      'Single Sign-On federation',
      'Assume breach'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Design internal controls assuming an adversary is already inside your network so lateral movement hits brick walls.',
    explanation: 'The "Assume breach" Zero Trust principle drives engineers to minimize blast radius via network micro-segmentation, enforce end-to-end encryption even on internal traffic, and deploy continuous behavioral analytics to detect and contain threats rapidly.',
    awsComparison: 'Matches AWS Security Pillar micro-segmentation and zero-trust east-west TLS practices.'
  },
  {
    id: 'az900-a2-082',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Zero Trust — Least Privilege (JIT/JEA)',
    difficulty: 2,
    format: 'single',
    prompt: 'Rather than granting administrators permanent 24/7 standing `Owner` permissions, an enterprise requires admins to request temporary, approval-gated elevation for two hours only when performing a change ticket. Which Zero Trust principle does this Just-In-Time (JIT) practice implement?',
    options: [
      'Use least privilege access',
      'Geo-distribution',
      'Horizontal scaling',
      'Unauthenticated guest collaboration'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Grant only the exact permissions needed (JEA) for only the exact time window needed (JIT).',
    explanation: 'Just-In-Time (JIT) and Just-Enough-Access (JEA) directly implement the Zero Trust principle "Use least privilege access" (operationalized in Microsoft Entra Privileged Identity Management and Defender for Cloud JIT VM access), shrinking the window during which stolen admin credentials could be abused.',
    awsComparison: 'Comparable to temporary STS role assumption / IAM Identity Center time-bound elevated permission sets.'
  },
  {
    id: 'az900-a2-083',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Defense-in-Depth Layered Order',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Microsoft’s Defense-in-Depth model uses seven concentric layers: Physical Security, Identity & Access, Perimeter, Network, Compute, Application, and Data. Order the four layers below from the OUTERMOST layer (top) to the INNERMOST core asset layer (bottom).',
    correctSequence: [
      'Physical Security (datacenter biometric access, CCTV, rack locks)',
      'Perimeter (DDoS protection and edge firewalls filtering volumetric attacks)',
      'Compute (hardening virtual machines, patching operating systems, closing management ports)',
      'Data (encrypting databases, blobs, and disks at rest and in transit at the core)'
    ],
    awsBridgeHint: 'Walk inward from the datacenter fence -> edge perimeter -> network -> VM compute -> app code -> core business Data!',
    explanation: 'Defense-in-Depth protects Data at the very center with six surrounding layers in exact inward order: Physical Security -> Identity & Access -> Perimeter -> Network -> Compute -> Application -> Data. If any outer control fails, inner layers block attackers from reaching sensitive data.',
    awsComparison: 'Memorize the exact 7-layer order for AZ-900: Physical -> Identity & Access -> Perimeter -> Network -> Compute -> Application -> Data!'
  },
  {
    id: 'az900-a2-084',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Defense-in-Depth — Perimeter Layer',
    difficulty: 2,
    format: 'single',
    prompt: 'Within Microsoft’s seven-layer Defense-in-Depth security model, at which layer do Distributed Denial of Service (DDoS) Protection and edge perimeter firewalls operate to absorb large-scale volumetric internet attacks?',
    options: [
      'Application layer',
      'Perimeter layer',
      'Compute layer',
      'Physical Security layer'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Sits right between Identity & Access and internal Network segmentation to scrub volumetric edge attacks.',
    explanation: 'In Microsoft’s Defense-in-Depth model, the Perimeter layer sits at the cloud network boundary and uses Azure DDoS Protection and perimeter firewalls to identify and mitigate large-scale volumetric attacks before they impact internal Network, Compute, or Application resources.',
    awsComparison: 'Azure DDoS Protection at the Perimeter layer maps directly to AWS Shield / AWS Shield Advanced.'
  },
  {
    id: 'az900-a2-085',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Defense-in-Depth — Application Layer',
    difficulty: 2,
    format: 'single',
    prompt: 'Storing API secrets in Azure Key Vault instead of hardcoding them in source code, validating user inputs against SQL injection, and patching open-source library vulnerabilities belong primarily to which Defense-in-Depth layer?',
    options: [
      'Physical Security layer',
      'Perimeter layer',
      'Application layer',
      'Identity and Access layer'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Secure coding practices, OWASP input sanitization, and removing hardcoded secrets protect the software layer directly surrounding Data.',
    explanation: 'The Application layer ensures applications are designed and coded securely—eliminating hardcoded secrets, preventing injection flaws, enforcing TLS, and scanning software dependencies—forming the final ring immediately outside the Data layer.',
    awsComparison: 'Same OWASP / AWS Secrets Manager / secure SDLC controls at the application tier.'
  },
  {
    id: 'az900-a2-086',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Microsoft Defender for Cloud — CSPM',
    difficulty: 2,
    format: 'single',
    prompt: 'Which native security service continuously assesses your Azure, hybrid, and multicloud resources for security misconfigurations, aggregates findings into an actionable Secure Score, and tracks compliance against standards such as CIS, PCI DSS, and ISO 27001?',
    options: [
      'Azure Migrate',
      'Azure Monitor Application Insights',
      'Azure Storage Explorer',
      'Microsoft Defender for Cloud'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Combines Cloud Security Posture Management (CSPM) + Cloud Workload Protection Platform (CWPP) under one service.',
    explanation: 'Microsoft Defender for Cloud provides Cloud Security Posture Management (CSPM)—evaluating resource configurations continuously to generate a Secure Score, hardening recommendations, and a Regulatory Compliance dashboard—alongside Cloud Workload Protection (CWPP) threat defense.',
    awsComparison: 'Unifies AWS Security Hub (CSPM Secure Score & compliance standards) + Amazon GuardDuty / Inspector (CWPP threat detection) into one console!'
  },
  {
    id: 'az900-a2-087',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Microsoft Defender for Cloud — CWPP',
    difficulty: 2,
    format: 'single',
    prompt: 'Beyond posture recommendations, a security operations team wants real-time behavioral threat alerts when suspicious PowerShell brute-force commands execute on virtual machines, malware lands in Azure Blob Storage, or anomalous SQL injection patterns hit Azure SQL Databases. Which capability provides these workload-specific protections?',
    options: [
      'Microsoft Defender for Cloud enhanced workload protection plans (Defender for Servers, Storage, SQL, and Containers)',
      'Azure Availability Set Fault Domains',
      'Azure Reserved Virtual Machine Instances',
      'Azure DNS CNAME record aliasing'
    ],
    correctIndices: [0],
    awsBridgeHint: 'The CWPP half of Defender for Cloud: active runtime threat detection and Just-In-Time VM port locking across servers, DBs, containers, and storage.',
    explanation: 'Enabling enhanced workload protection plans in Microsoft Defender for Cloud activates Cloud Workload Protection Platform (CWPP) capabilities—delivering real-time threat alerts, vulnerability scanning, adaptive application controls, and Just-In-Time (JIT) VM access across servers, containers, storage, and databases.',
    awsComparison: 'Maps directly to Amazon GuardDuty runtime protection plans (S3 Protection, RDS Protection, EKS Protection, Runtime Monitoring).'
  },
  {
    id: 'az900-a2-088',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Microsoft Defender for Cloud Scope',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Microsoft Defender for Cloud.',
    statements: [
      {
        statement: 'Foundational Cloud Security Posture Management (CSPM) including Secure Score recommendations is available for Azure subscriptions to surface security misconfigurations.',
        answer: true
      },
      {
        statement: 'Microsoft Defender for Cloud is strictly limited to native Azure resources and can never assess on-premises servers or multicloud environments.',
        answer: false
      },
      {
        statement: 'Just-In-Time (JIT) virtual machine access in Defender for Cloud reduces attack surface by locking down inbound RDP/SSH ports in Network Security Groups until an authorized user requests time-limited access from specific IPs.',
        answer: true
      }
    ],
    awsBridgeHint: 'Defender for Cloud extends cleanly to on-premises via Azure Arc and to other public clouds via native multicloud connectors!',
    explanation: 'Defender for Cloud provides foundational CSPM Secure Score out of the box, supports JIT VM port locking via NSG/Firewall rules, and extends across on-premises servers (via Azure Arc) and multicloud accounts via native connectors.',
    awsComparison: 'Notice how strongly Microsoft emphasizes multicloud + hybrid reach in Defender for Cloud—expect "Azure only" statements to be False on AZ-900!'
  },
  {
    id: 'az900-a2-089',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Table Storage vs Cosmos DB',
    difficulty: 2,
    format: 'single',
    prompt: 'An IoT prototype needs an ultra-low-cost, schemaless key-attribute store inside an existing Azure Storage Account to log millions of simple device status rows keyed by `PartitionKey` and `RowKey`, without needing multi-region active-active writes or secondary indexes. Which service fits best?',
    options: [
      'Azure Files SMB share',
      'Azure Table Storage',
      'Azure SQL Managed Instance',
      'Azure Queue Storage'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Simple key-attribute NoSQL table inside a Storage Account (and when you later outgrow it, Cosmos DB for Table offers a drop-in premium upgrade path).',
    explanation: 'Azure Table Storage stores large amounts of structured, non-relational (schemaless) data using `PartitionKey` and `RowKey` lookups at very low cost inside a standard Storage Account. When global multi-region distribution, secondary indexes, or single-digit millisecond SLAs are required, Azure Cosmos DB for Table provides wire-compatible scaling.',
    awsComparison: 'Think of Azure Table Storage as a budget single-region lite version of DynamoDB, while Cosmos DB is full DynamoDB Global Tables.'
  },
  {
    id: 'az900-a2-090',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Load Balancer vs Application Gateway',
    difficulty: 3,
    format: 'single',
    prompt: 'An architect needs to route `https://contoso.com/images/*` to an image-rendering VM pool and `https://contoso.com/video/*` to a video-streaming VM pool while inspecting HTTP headers with an integrated Web Application Firewall (WAF). Why should they choose Azure Application Gateway instead of Azure Load Balancer?',
    options: [
      'Azure Load Balancer cannot distribute TCP or UDP packets within an Azure Region',
      'Azure Application Gateway operates at Layer 2 using MAC address broadcast tables',
      'Azure Application Gateway operates at OSI Layer 7 (HTTP/HTTPS), supporting URL path-based routing, TLS termination, and WAF, whereas Azure Load Balancer operates at OSI Layer 4 (TCP/UDP)',
      'Azure Load Balancer works only with on-premises physical mainframes'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Layer-7 HTTP URL-path routing + WAF vs. ultra-low-latency Layer-4 TCP/UDP packet load balancing.',
    explanation: 'Azure Application Gateway is a Layer-7 (Application layer) web traffic load balancer supporting URL path-based routing, host-based routing, cookie session affinity, SSL/TLS termination, and integrated Web Application Firewall (WAF). Azure Load Balancer operates at Layer 4 (Transport layer: TCP/UDP) without inspecting HTTP URL paths.',
    awsComparison: 'Azure Load Balancer = AWS Network Load Balancer (NLB, Layer 4); Azure Application Gateway = AWS Application Load Balancer (ALB + AWS WAF, Layer 7).'
  },
  {
    id: 'az900-a2-091',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Content Delivery & Edge Caching',
    difficulty: 1,
    format: 'single',
    prompt: 'A news website hosted in East US wants static images, stylesheets, and video clips cached at global Point-of-Presence (PoP) edge servers so readers in Sydney, Mumbai, and São Paulo download assets with minimal round-trip latency. Which capability achieves this?',
    options: [
      'Availability Set Update Domains',
      'Azure Data Box offline shipping',
      'Azure File Sync cloud tiering',
      'Content Delivery Network (CDN) / Azure Front Door edge caching'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Global edge Points of Presence (PoPs) caching static assets close to end users worldwide.',
    explanation: 'A Content Delivery Network (such as Azure Front Door with global CDN edge caching) caches static web content at strategically placed Point-of-Presence (PoP) edge nodes worldwide, minimizing latency for distant users and offloading origin web servers.',
    awsComparison: 'Directly equivalent to Amazon CloudFront.'
  },
  {
    id: 'az900-a2-092',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Azure Bastion Secure VM Access',
    difficulty: 2,
    format: 'single',
    prompt: 'Security policy forbids assigning public IP addresses to any Virtual Machine and forbids opening ports 3389 (RDP) or 22 (SSH) to the internet. Which managed PaaS service deploys inside your Virtual Network to provide seamless RDP and SSH sessions directly in the Azure portal browser over TLS port 443?',
    options: [
      'Azure Bastion',
      'AzCopy',
      'Azure Queue Storage',
      'Microsoft Entra B2C'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Managed jump-box-as-a-service delivering HTML5 RDP/SSH over port 443 through the Azure portal with zero public IPs on target VMs.',
    explanation: 'Azure Bastion is a fully managed PaaS service deployed in your VNet (`AzureBastionSubnet`) that provides secure, seamless RDP and SSH connectivity to virtual machines over private IPs directly from the Azure portal over TLS (port 443), eliminating public VM IPs and port-scanning exposure.',
    awsComparison: 'Solves the same problem as AWS Systems Manager Session Manager / EC2 Instance Connect Endpoint (managed private SSH/RDP without public jump-box VMs).'
  },
  {
    id: 'az900-a2-093',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Resource Group Inheritance Nuances',
    difficulty: 3,
    format: 'multi',
    prompt: 'A governance administrator applies both an Azure RBAC `Reader` role assignment AND a `CostCenter=FinOps` metadata tag directly onto Resource Group `RG-Analytics`. Ten virtual machines already exist inside `RG-Analytics`, and no Azure Policy tag-inheritance rules are configured. Which TWO statements accurately describe the immediate outcome? (Select 2)',
    options: [
      'All ten virtual machines inside `RG-Analytics` automatically inherit the `Reader` RBAC role assignment',
      'All ten virtual machines inside `RG-Analytics` automatically inherit the `CostCenter=FinOps` tag by default',
      'None of the ten virtual machines automatically inherit the `CostCenter=FinOps` tag because tags applied to a Resource Group or Subscription are NOT inherited by child resources by default',
      'Deleting `RG-Analytics` preserves the ten virtual machines as long as they have tags'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'Classic Azure governance trap: RBAC and Azure Policy DO inherit down scopes automatically, whereas Resource Tags do NOT inherit unless pushed by an Azure Policy!',
    explanation: 'In Azure Resource Manager, RBAC permissions and Azure Policies inherit automatically from Management Group -> Subscription -> Resource Group -> Resource. However, metadata Tags applied to a Subscription or Resource Group are NOT inherited by child resources by default (you must use an Azure Policy `Inherit a tag from the resource group` rule to copy them).',
    awsComparison: 'Major Azure exam trap—never assume Resource Group tags cascade down automatically to child VMs/disks!'
  },
  {
    id: 'az900-a2-094',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Architecture & Security Synthesis',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each architectural statement across compute, storage, and identity services in Azure.',
    statements: [
      {
        statement: 'Deploying stateless web VMs in a Virtual Machine Scale Set across three Availability Zones combined with Zone-Redundant Storage (ZRS) keeps the application online if a single datacenter building loses power.',
        answer: true
      },
      {
        statement: 'Configuring Locally Redundant Storage (LRS) and a single-datacenter Availability Set protects an application if a wildfire takes an entire Azure Region offline.',
        answer: false
      },
      {
        statement: 'Combining Microsoft Entra ID Single Sign-On, Conditional Access risk signals, and FIDO2 passwordless keys directly supports the Zero Trust principle "Verify explicitly."',
        answer: true
      }
    ],
    awsBridgeHint: 'Multi-AZ VMSS + ZRS survives a datacenter outage; LRS + Availability Set lives in ONE building; and Entra Conditional Access + FIDO2 is textbook Zero Trust.',
    explanation: 'Multi-zone VMSS + ZRS isolates datacenter failures cleanly, and Entra SSO + Conditional Access + FIDO2 enforces explicit verification. LRS and Availability Sets both reside inside a single datacenter—surviving a regional catastrophe requires cross-region architecture (e.g., GZRS/RA-GZRS + paired region compute).',
    awsComparison: 'Ties together Multi-AZ HA, Multi-Region DR, and Zero Trust IAM into one architectural check.'
  },
  {
    id: 'az900-a2-095',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    subtopic: 'Enterprise Migration Case Study',
    difficulty: 3,
    format: 'multi',
    prompt: 'A healthcare enterprise is migrating an on-premises clinical system to Azure. Requirements: (1) private dedicated 10 Gbps hybrid network connectivity that never crosses the public internet, (2) managed PaaS SQL hosting that supports existing SQL Server Agent jobs and cross-database queries without OS patching, and (3) blob storage for medical images that survives both an Availability Zone outage in the primary region and a full regional disaster while allowing read-only secondary access at any time. Which TWO architectural choices below are part of the optimal design? (Select 2)',
    options: [
      'Connect the hospital datacenter via Azure ExpressRoute and host the relational tier on Azure SQL Managed Instance',
      'Connect the hospital datacenter via Point-to-Site VPN and host the relational tier on Azure Table Storage',
      'Configure the medical imaging Storage Account with Read-Access Geo-Zone-Redundant Storage (RA-GZRS)',
      'Configure the medical imaging Storage Account with Locally Redundant Storage (LRS) in the Archive tier'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'Combine private dedicated fiber (ExpressRoute) + SQL Agent-compatible PaaS (SQL Managed Instance) + 3-AZ + readable paired-region storage (RA-GZRS).',
    explanation: 'Azure ExpressRoute delivers dedicated private connectivity bypassing the public internet; Azure SQL Managed Instance provides PaaS SQL hosting with SQL Agent and cross-database query compatibility; and Read-Access Geo-Zone-Redundant Storage (RA-GZRS) protects against both zone and regional outages (16 nines) while exposing a continuous read-only secondary endpoint.',
    awsComparison: 'Full-stack enterprise equivalent of AWS Direct Connect + Amazon RDS for SQL Server + Multi-AZ S3 with Cross-Region Read Replica.'
  }
];
