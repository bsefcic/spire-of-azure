import type { ExamQuestion } from '../../types/curriculum';

export const AZ900_ACT1_QUESTIONS: ExamQuestion[] = [
  {
    id: 'az900-a1-001',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Computing Definition',
    difficulty: 1,
    format: 'single',
    prompt: 'Which statement best defines cloud computing according to Microsoft cloud fundamentals?',
    options: [
      'The delivery of computing services—including compute, storage, networking, and analytics—over the internet using a pay-as-you-go pricing model',
      'The exclusive hosting of virtualized servers inside a company-owned datacenter to eliminate external network traffic',
      'The replacement of all client endpoint devices with local mainframe terminals connected via fiber channel',
      'The upfront purchase of multi-year hardware leases that remain dedicated to a single workstation'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think of the foundational NIST and cloud-provider definition: on-demand IT resources delivered over the network with utility-style metering.',
    explanation: 'Cloud computing is the on-demand delivery of compute, storage, databases, networking, and software over the internet (the cloud) with consumption-based pricing. Company-owned datacenters describe traditional on-premises infrastructure, and upfront hardware leases represent legacy procurement rather than utility cloud delivery.',
    awsComparison: 'Identical to the AWS Cloud Practitioners definition of on-demand delivery of IT resources over the internet with pay-as-you-go pricing.'
  },
  {
    id: 'az900-a1-002',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Shared Responsibility Model',
    difficulty: 1,
    format: 'single',
    prompt: 'Under the Microsoft Shared Responsibility Model, which three areas are ALWAYS retained solely by the customer regardless of whether a workload uses IaaS, PaaS, or SaaS?',
    options: [
      'Operating systems, network controls, and physical hosts',
      'Information and data, devices (mobile and PCs), and accounts and identities',
      'Applications, directory infrastructure, and physical network routers',
      'Datacenter biometric access, hypervisor patching, and storage rack redundancy'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Even when consuming fully managed turnkey software, the provider never decides who your employees are, which laptops they use, or what business data they upload.',
    explanation: 'In the Microsoft Shared Responsibility Model, the customer is always responsible for information and data, client endpoints/devices, and accounts and identities across SaaS, PaaS, IaaS, and on-premises. Operating systems, applications, and network controls shift partially or fully to Microsoft in PaaS and SaaS, while physical datacenter security is always Microsoft’s responsibility in the cloud.',
    awsComparison: 'Maps to "Security IN the Cloud" on AWS, though AZ-900 tests an explicit 3-row matrix rule: Data, Endpoints, and Accounts/Identities are 100% customer-owned even in SaaS.'
  },
  {
    id: 'az900-a1-003',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Shared Responsibility Model',
    difficulty: 2,
    format: 'single',
    prompt: 'A company migrates an on-premises database server to an Infrastructure as a Service (IaaS) virtual machine in Azure. Which maintenance task transitions from the customer to Microsoft after this migration?',
    options: [
      'Installing security patches on the guest Windows Server operating system',
      'Configuring database user permissions and encrypting sensitive table columns',
      'Replacing failed solid-state drives in the underlying physical server rack',
      'Updating connection strings inside the customer’s middle-tier web application'
    ],
    correctIndices: [2],
    awsBridgeHint: 'In raw virtual machine hosting, the provider stops at the hypervisor and physical hardware boundary; everything inside the guest OS stays on your plate.',
    explanation: 'In IaaS, Microsoft manages physical datacenter security, physical network hardware, and physical hosts (including replacing failed physical disks). The customer remains responsible for patching the guest OS, securing database permissions and data, and maintaining application code.',
    awsComparison: 'Identical to running self-managed SQL on Amazon EC2: AWS replaces dead host hardware, while you patch the guest OS and manage database engines.'
  },
  {
    id: 'az900-a1-004',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Shared Responsibility Model',
    difficulty: 2,
    format: 'single',
    prompt: 'In the Microsoft Shared Responsibility Model, which cloud service type involves a shared split of responsibility between Microsoft and the customer for network controls, applications, and identity and directory infrastructure?',
    options: [
      'On-premises datacenter',
      'Infrastructure as a Service (IaaS)',
      'Software as a Service (SaaS)',
      'Platform as a Service (PaaS)'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Look at the middle tier of the responsibility chart where the provider runs the OS and runtime platform, yet you still deploy your own code and configure platform-level firewall rules.',
    explanation: 'Microsoft’s official Shared Responsibility diagram specifically marks Identity & directory infrastructure, Applications, and Network controls as shared responsibilities in PaaS (and Identity & directory infrastructure as shared in SaaS as well). In IaaS and on-premises, all three of those layers belong entirely to the customer.',
    awsComparison: 'AZ-900 explicitly tests the half-blue/half-gray cells of Microsoft’s Shared Responsibility chart—memorize that PaaS splits Network Controls, Applications, and Directory Infrastructure.'
  },
  {
    id: 'az900-a1-005',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Shared Responsibility Model',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding the Microsoft Shared Responsibility Model.',
    statements: [
      {
        statement: 'When an organization adopts Software as a Service (SaaS), Microsoft assumes responsibility for securing the customer’s corporate mobile devices.',
        answer: false
      },
      {
        statement: 'In a Platform as a Service (PaaS) deployment, Microsoft is responsible for patching the underlying operating system.',
        answer: true
      },
      {
        statement: 'Infrastructure as a Service (IaaS) places the highest operational management responsibility on the customer among the three cloud service models.',
        answer: true
      }
    ],
    awsBridgeHint: 'Endpoint devices never belong to the cloud vendor, managed platforms abstract OS patching, and virtual machines require the most customer administration in the cloud.',
    explanation: 'Client endpoints (mobile devices and PCs) remain strictly the customer’s responsibility across all models, including SaaS. In PaaS, Microsoft patches and maintains the underlying OS so developers can focus on code. Among IaaS, PaaS, and SaaS, IaaS requires the customer to manage the OS, middleware, runtime, and applications.',
    awsComparison: 'Just like AWS MDM/endpoint boundaries, SaaS (e.g., Microsoft 365) never relieves customers from securing employee laptops and phones.'
  },
  {
    id: 'az900-a1-006',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Service Types Hierarchy',
    difficulty: 1,
    format: 'sequence',
    prompt: 'Order the hosting models from the HIGHEST level of customer management responsibility (top) to the LOWEST level of customer management responsibility (bottom).',
    correctSequence: [
      'On-premises',
      'Infrastructure as a Service (IaaS)',
      'Platform as a Service (PaaS)',
      'Software as a Service (SaaS)'
    ],
    awsBridgeHint: 'Start where you own the building and power generators, then step progressively up the abstraction stack until you only configure users and consume finished software.',
    explanation: 'On-premises gives the customer 100% responsibility from physical facilities up to data. Moving to IaaS offloads physical hardware and facilities; PaaS additionally offloads the OS and runtime; and SaaS offloads the application software itself, leaving the least customer overhead.',
    awsComparison: 'Matches the standard On-Prem -> EC2 (IaaS) -> Elastic Beanstalk/RDS (PaaS) -> WorkMail/Chime (SaaS) responsibility spectrum.'
  },
  {
    id: 'az900-a1-007',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Deployment Models',
    difficulty: 1,
    format: 'single',
    prompt: 'A financial institution operates sensitive legacy mainframes in its own datacenter to satisfy strict local regulations, while bursting seasonal customer portal traffic into Azure public regions over an encrypted connection. Which cloud deployment model does this architecture represent?',
    options: [
      'Hybrid cloud',
      'Public cloud',
      'Private cloud',
      'Community cloud'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Bridging an owned on-premises environment with a public cloud provider so workloads span both is the textbook definition of this model.',
    explanation: 'A hybrid cloud combines a private cloud (on-premises infrastructure) with a public cloud, allowing data and applications to interoperate across both environments. Pure public cloud has no private datacenter footprint, while pure private cloud does not burst into shared public cloud infrastructure.',
    awsComparison: 'Equivalent to an AWS Hybrid Cloud architecture connecting an on-premises datacenter to AWS via Direct Connect or Site-to-Site VPN.'
  },
  {
    id: 'az900-a1-008',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Deployment Models',
    difficulty: 2,
    format: 'single',
    prompt: 'Following an acquisition, an enterprise intentionally runs its retail e-commerce microservices on Azure while keeping its machine learning analytics pipeline on a second third-party public cloud provider. Which cloud deployment model is the enterprise using?',
    options: [
      'Hybrid cloud',
      'Multi-cloud',
      'Private cloud',
      'Sovereign cloud'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Notice there is no mention of a private on-premises datacenter—only workloads distributed across more than one public cloud vendor.',
    explanation: 'Multi-cloud refers to consuming services from two or more distinct public cloud providers simultaneously—often due to mergers, vendor risk diversification, or specialized service capabilities. Hybrid cloud specifically pairs public cloud resources with private/on-premises infrastructure.',
    awsComparison: 'AZ-900 explicitly distinguishes Multi-cloud (multiple public cloud vendors, managed via tools like Azure Arc) from Hybrid cloud (public + private).'
  },
  {
    id: 'az900-a1-009',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Private Cloud Characteristics',
    difficulty: 2,
    format: 'single',
    prompt: 'Which characteristic is a primary disadvantage of operating an on-premises private cloud compared to a public cloud?',
    options: [
      'Inability to enforce strict physical access policies on server racks',
      'Sharing underlying physical compute hosts with unrelated external organizations',
      'High upfront capital expenditure for hardware procurement and ongoing IT hardware maintenance',
      'Lack of control over operating system kernel customizations'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Single-tenant dedicated hardware gives you total control, but your finance and facilities teams bear the full cost of buying and refreshing servers.',
    explanation: 'A private cloud requires significant upfront Capital Expenditure (CapEx) to purchase servers, storage, and networking gear, plus skilled staff for ongoing hardware lifecycle maintenance. Private clouds provide complete single-tenant isolation and full control over physical access and OS kernels.',
    awsComparison: 'Same trade-off highlighted in AWS Cloud Economics when comparing self-managed on-premises virtualization clusters against public AWS regions.'
  },
  {
    id: 'az900-a1-010',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Public Cloud Characteristics',
    difficulty: 1,
    format: 'single',
    prompt: 'Which statement accurately describes a public cloud deployment model?',
    options: [
      'All physical servers must be purchased by the customer before virtual machines can be provisioned',
      'Resources are accessible only over isolated private dark fiber and never over the internet',
      'Hardware is dedicated exclusively to a single organization inside its corporate headquarters',
      'Hardware is owned and operated by a third-party cloud provider and shared securely across multiple tenants'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Think multi-tenancy: the cloud vendor owns the fleet and logically isolates many customers onto shared physical infrastructure.',
    explanation: 'In a public cloud such as Azure, Microsoft owns, operates, and maintains the physical hardware and datacenters, pooling compute, storage, and network resources securely across multiple customers (tenants). Customers provision resources on demand over the internet or private links without buying hardware.',
    awsComparison: 'Corresponds to standard multi-tenant AWS Regions (as opposed to Dedicated Hosts or on-premises VMware).'
  },
  {
    id: 'az900-a1-011',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Deployment Models Comparison',
    difficulty: 2,
    format: 'multi',
    prompt: 'An organization is evaluating a hybrid cloud model instead of migrating 100% of its workloads to the public cloud immediately. Which TWO scenarios justify choosing a hybrid cloud architecture? (Select 2)',
    options: [
      'Maintaining ultra-low-latency local processing on factory-floor hardware while sending aggregated telemetry to Azure',
      'Eliminating all responsibility for protecting corporate user accounts and customer data',
      'Complying with strict data residency mandates that require specific legacy records to remain on customer-owned storage hardware',
      'Guaranteeing zero operational expenditure (OpEx) when bursting workloads into public cloud regions'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'Edge latency constraints and regulatory hardware mandates are the two classic architectural drivers for keeping one foot on-premises.',
    explanation: 'Hybrid cloud excels when edge/factory workloads need local sub-millisecond processing or when regulatory/legacy constraints require specific datasets to stay on customer-owned hardware while still leveraging public cloud scale. Hybrid cloud never eliminates customer data/account responsibility, and public cloud bursting always incurs OpEx.',
    awsComparison: 'Mirrors the primary use cases for AWS Outposts and hybrid architectures: local low-latency processing and strict on-premises data residency.'
  },
  {
    id: 'az900-a1-012',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'CapEx vs OpEx',
    difficulty: 1,
    format: 'single',
    prompt: 'A company purchases $500,000 worth of physical blade servers, storage arrays, and uninterruptible power supplies for a new corporate datacenter, depreciating the assets over five years. How is this spending classified?',
    options: [
      'Capital Expenditure (CapEx)',
      'Operational Expenditure (OpEx)',
      'Consumption-based elasticity',
      'Serverless micro-billing'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Upfront spending on tangible physical infrastructure whose value is deducted over multi-year depreciation schedules is the classic accounting term.',
    explanation: 'Capital Expenditure (CapEx) is the upfront investment of money into physical infrastructure, facilities, and hardware assets whose accounting value is depreciated over time. Operational Expenditure (OpEx) refers to ongoing pay-as-you-go service bills deducted in the same period they are incurred.',
    awsComparison: 'Identical to the AWS Cloud Economics CapEx vs. OpEx distinction.'
  },
  {
    id: 'az900-a1-013',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'CapEx vs OpEx',
    difficulty: 1,
    format: 'single',
    prompt: 'A startup hosts its mobile backend on Azure App Service and Azure Cosmos DB, paying a monthly invoice based strictly on the compute hours and request units consumed that month. Which financial model does this represent?',
    options: [
      'Capital Expenditure (CapEx)',
      'Operational Expenditure (OpEx)',
      'Amortized hardware leasing',
      'Fixed depreciation accounting'
    ],
    correctIndices: [1],
    awsBridgeHint: 'No hardware assets are owned; monthly utility usage is expensed directly in the current billing cycle.',
    explanation: 'Cloud consumption billing is Operational Expenditure (OpEx): there are no upfront hardware costs, organizations pay for services or products as they use them, and expenses are billed and deducted within the same accounting period.',
    awsComparison: 'Matches AWS variable expense (OpEx) billing where monthly utility consumption replaces upfront hardware purchases.'
  },
  {
    id: 'az900-a1-014',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Consumption-Based Model',
    difficulty: 2,
    format: 'multi',
    prompt: 'Which THREE benefits are direct outcomes of Azure’s consumption-based pricing model? (Select 3)',
    options: [
      'No upfront infrastructure purchase costs are required to launch a workload',
      'Organizations stop paying for compute resources when they deallocate or delete them',
      'Users can dynamically pay for additional capacity only during peak demand windows',
      'Outbound network data transfer from Azure to the public internet is always unbilled',
      'Physical server depreciation can be claimed by the customer over a ten-year tax schedule'
    ],
    selectCount: 3,
    correctIndices: [0, 1, 2],
    awsBridgeHint: 'Focus on the three core consumption traits: zero upfront cost, scale-up on demand, and stop paying when resources are released—watch out for the egress trap!',
    explanation: 'Microsoft Learn defines three core benefits of the consumption-based model: no upfront costs, the ability to pay for extra resources when needed, and the ability to stop paying for resources that are no longer needed. Outbound internet data transfer (egress) is metered and billed, and customers cannot depreciate cloud-owned servers.',
    awsComparison: 'Same rule as AWS: inbound data transfer (ingress) is generally free, whereas outbound internet data transfer (egress) is billed per GB.'
  },
  {
    id: 'az900-a1-015',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Pricing Models',
    difficulty: 2,
    format: 'single',
    prompt: 'An enterprise runs a mission-critical ERP database on Azure Virtual Machines with steady, predictable 24/7 resource utilization for the next three years. Which pricing option provides the greatest cost savings compared to standard pay-as-you-go rates without risking workload interruption?',
    options: [
      'Azure Spot Virtual Machines',
      'Consumption-tier serverless functions',
      'Azure Reservations (1-year or 3-year commitment)',
      'Free Tier sandbox quotas'
    ],
    correctIndices: [2],
    awsBridgeHint: 'When baseline compute usage is rock-steady for 1 or 3 years and cannot tolerate preemption, commit to term capacity for deep discounts.',
    explanation: 'Azure Reservations offer discounts of up to 72% over pay-as-you-go prices when committing to one-year or three-year terms for predictable, continuously running workloads. Azure Spot VMs offer steeper discounts up to 90% but can be evicted at any time when Azure reclaims capacity, making them unsuitable for a mission-critical 24/7 ERP database.',
    awsComparison: 'Directly equivalent to AWS Reserved Instances (1-year or 3-year term commitments); Azure Savings Plans for Compute similarly mirror AWS Compute Savings Plans.'
  },
  {
    id: 'az900-a1-016',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Pricing Models',
    difficulty: 2,
    format: 'single',
    prompt: 'A media studio needs to render thousands of non-urgent animation frames overnight at the lowest possible compute cost. The rendering job saves checkpoints every minute and can gracefully resume if virtual machines are reclaimed by Azure. Which pricing option should the studio choose?',
    options: [
      '3-year Azure Reserved Virtual Machine Instances',
      'Standard Pay-As-You-Go Dedicated Hosts',
      'Azure Hybrid Benefit with Software Assurance',
      'Azure Spot Virtual Machines'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Checkpoint-friendly, interruptible batch processing is the textbook workload for spare datacenter capacity sold at steep discounts.',
    explanation: 'Azure Spot Virtual Machines allow customers to purchase unused Azure compute capacity at deep discounts (up to 90% off pay-as-you-go). Because Azure can evict Spot VMs with short notice whenever capacity is needed elsewhere, they are ideal for stateless, fault-tolerant, or checkpointed batch rendering jobs.',
    awsComparison: 'Directly equivalent to Amazon EC2 Spot Instances, complete with eviction notices when regional capacity tightens.'
  },
  {
    id: 'az900-a1-017',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Consumption Billing Mechanics',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding how consumption-based billing operates in Azure.',
    statements: [
      {
        statement: 'Shutting down a virtual machine from inside the guest operating system—without deallocating it through Azure—stops ongoing compute charges.',
        answer: false
      },
      {
        statement: 'Inbound data transfer (ingress) into Azure datacenters is generally free, while outbound data transfer (egress) incurs metered bandwidth charges.',
        answer: true
      },
      {
        statement: 'Even when an Azure Virtual Machine is in the Stopped (deallocated) state, the customer continues to pay storage charges for its persisted OS and data disks.',
        answer: true
      }
    ],
    awsBridgeHint: 'Watch out for a classic Azure VM billing difference: shutting down from inside Windows/Linux leaves the hardware slot reserved unless Azure explicitly deallocates the VM!',
    explanation: 'Shutting down from inside the guest OS puts an Azure VM in the "Stopped" (not deallocated) state, meaning compute hardware remains reserved and compute billing continues! Only stopping via Azure Portal/CLI/API ("Stopped (deallocated)") halts compute charges, though persisted Managed Disks continue incurring storage charges. Ingress is free while egress is billed.',
    awsComparison: 'Major AWS gotcha: on EC2, an OS-initiated shutdown stops compute billing on EBS-backed instances, whereas on Azure an OS shutdown stays in "Stopped" (billed!) until explicitly "Stopped (deallocated)".'
  },
  {
    id: 'az900-a1-018',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'High Availability',
    difficulty: 1,
    format: 'single',
    prompt: 'Which cloud benefit focuses primarily on ensuring maximum application uptime and continuous service continuity during localized hardware or component failures?',
    options: [
      'High availability',
      'Agility',
      'Vertical scalability',
      'Cost predictability'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Measured in "nines" of SLA uptime, this architectural property keeps users connected without downtime when an underlying server dies.',
    explanation: 'High availability (HA) ensures that systems remain operational and accessible with minimal or zero downtime for a high percentage of time, even if individual components fail. Agility measures deployment speed, vertical scalability increases single-node capacity, and cost predictability forecasts spending.',
    awsComparison: 'Same architectural pillar as High Availability in the AWS Well-Architected Reliability pillar, expressed via SLA uptime percentages.'
  },
  {
    id: 'az900-a1-019',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Vertical vs Horizontal Scaling',
    difficulty: 1,
    format: 'single',
    prompt: 'A database administrator increases the memory of an existing Azure Virtual Machine from 16 GB RAM to 64 GB RAM and upgrades its vCPU count to handle heavier analytical queries. What type of scaling is being performed?',
    options: [
      'Horizontal scaling (scaling out)',
      'Vertical scaling (scaling up)',
      'Geo-distribution',
      'Disaster recovery failover'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Making a single existing machine bigger rather than adding more machines to a fleet.',
    explanation: 'Vertical scaling (scaling up or down) changes the compute power—such as CPU or RAM—of an existing virtual machine or resource instance. Horizontal scaling (scaling out or in) changes the number of resource instances running in parallel.',
    awsComparison: 'Equivalent to resizing an Amazon EC2 or RDS instance from `m6i.large` to `m6i.2xlarge` (scaling up).'
  },
  {
    id: 'az900-a1-020',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Vertical vs Horizontal Scaling',
    difficulty: 1,
    format: 'single',
    prompt: 'During a holiday flash sale, an e-commerce platform adds twelve additional stateless web server instances behind a load balancer, then removes ten instances once traffic subsides. What type of scaling is demonstrated?',
    options: [
      'Vertical scaling (scaling up and scaling down)',
      'Storage tiering (archiving and rehydrating)',
      'Horizontal scaling (scaling out and scaling in)',
      'Fault domain isolation'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Adding and removing identical worker nodes side-by-side behind a load balancer.',
    explanation: 'Horizontal scaling adds more instances to meet demand (scaling out) and removes instances when demand drops (scaling in). Vertical scaling instead alters the CPU/RAM size of an individual instance.',
    awsComparison: 'Identical to Amazon EC2 Auto Scaling launching and terminating instances behind an Application Load Balancer.'
  },
  {
    id: 'az900-a1-021',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Elasticity vs Scalability',
    difficulty: 2,
    format: 'single',
    prompt: 'What is the primary distinction between scalability and elasticity in cloud computing?',
    options: [
      'Scalability applies only to storage accounts, whereas elasticity applies only to virtual networks',
      'Scalability requires serverless functions, whereas elasticity requires manual administrator tickets',
      'Scalability reduces availability zones, whereas elasticity permanently locks compute capacity for three years',
      'Scalability is the architectural capability to adjust capacity to meet demand, whereas elasticity automatically adds and removes resources dynamically as real-time load changes'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Think of one as the broader capability (manual or automated growth) and the other as the rubber-band automation that stretches out and snaps back automatically.',
    explanation: 'Scalability refers to the ability of a system to grow or shrink resources (manually or automatically) to handle changing load. Elasticity specifically describes dynamic, automated scaling that rapidly expands resources during traffic spikes and automatically scales back in when demand drops so you never overpay for idle capacity.',
    awsComparison: 'Matches the AWS exam distinction where Elasticity emphasizes automatic, real-time dynamic expansion and contraction aligned to demand.'
  },
  {
    id: 'az900-a1-022',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Agility',
    difficulty: 1,
    format: 'single',
    prompt: 'A development team provisions a complete test environment with twenty virtual machines, a managed relational database, and load balancers in six minutes instead of waiting eight weeks for hardware delivery. Which cloud benefit does this best illustrate?',
    options: [
      'Cloud agility',
      'Disaster recovery',
      'Geo-redundancy',
      'Multi-tenancy isolation'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Rapidly spinning up and tearing down environments to accelerate innovation and time-to-market.',
    explanation: 'Agility in cloud computing is the ability to deploy, configure, and iterate IT resources rapidly as business requirements evolve—provisioning environments in minutes rather than waiting weeks or months for physical hardware procurement.',
    awsComparison: 'Identical to the AWS Cloud Value Proposition definition of Agility (speed of experimentation and rapid provisioning).'
  },
  {
    id: 'az900-a1-023',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Reliability vs Disaster Recovery',
    difficulty: 2,
    format: 'single',
    prompt: 'An application is deployed across three separate datacenters within a single Azure region so that if one datacenter loses power, active user sessions continue seamlessly on the remaining two datacenters without manual intervention. Which cloud benefit is primarily demonstrated?',
    options: [
      'Vertical scaling',
      'Reliability (fault tolerance)',
      'Consumption-based metering',
      'Capital expenditure optimization'
    ],
    correctIndices: [1],
    awsBridgeHint: 'In Microsoft Learn AZ-900, resilient decentralized design that automatically survives localized failures without interruption falls under this core cloud benefit.',
    explanation: 'Reliability (encompassing fault tolerance and self-healing design) is the ability of a system to recover from failures and continue functioning seamlessly—such as automatically surviving a single datacenter outage via redundant instances.',
    awsComparison: 'Equivalent to Multi-AZ fault tolerance in AWS Reliability design.'
  },
  {
    id: 'az900-a1-024',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Fault Tolerance vs Disaster Recovery',
    difficulty: 3,
    format: 'single',
    prompt: 'How does disaster recovery (DR) differ architecturally from fault tolerance (high availability)?',
    options: [
      'Disaster recovery prevents individual hard drive failures with zero latency, while fault tolerance only restores weekly tape backups',
      'Disaster recovery applies exclusively to Software as a Service (SaaS), while fault tolerance applies exclusively to on-premises servers',
      'Fault tolerance keeps a workload running seamlessly during localized component failures, while disaster recovery restores operations and data in a secondary region after a catastrophic regional event',
      'Fault tolerance eliminates all cloud storage costs, while disaster recovery requires manual hardware shipping for every minor network blip'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Compare surviving a single node/rack failure seamlessly in real time versus orchestrating cross-region restoration governed by RPO and RTO after a major catastrophe.',
    explanation: 'Fault tolerance uses active redundancy to absorb localized hardware or zone failures with zero or near-zero user impact. Disaster recovery plans for major, catastrophic events (such as a natural disaster knocking out an entire region or severe data corruption), relying on cross-region replication, backups, and defined Recovery Point Objective (RPO) and Recovery Time Objective (RTO) targets.',
    awsComparison: 'Matches AWS Multi-AZ High Availability (surviving component/AZ failure automatically) vs. Multi-Region Disaster Recovery (Backup & Restore, Pilot Light, Warm Standby).'
  },
  {
    id: 'az900-a1-025',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Geo-Distribution',
    difficulty: 1,
    format: 'single',
    prompt: 'A gaming company deploys application instances in datacenters across Europe, East Asia, and North America so players connect to servers closest to them and regional privacy laws are respected. Which cloud capability does this describe?',
    options: [
      'Vertical scaling',
      'Serverless cold-start mitigation',
      'Single-tenant host dedication',
      'Geo-distribution'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Placing compute and data across global regions to minimize round-trip network latency and honor sovereign data residency.',
    explanation: 'Geo-distribution allows organizations to deploy applications and data into regional datacenters around the globe, giving end users lower latency by serving them from nearby locations while meeting local data-residency compliance rules.',
    awsComparison: 'Corresponds to the AWS Cloud benefit "Go global in minutes" using global regions.'
  },
  {
    id: 'az900-a1-026',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Predictability in the Cloud',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'In Microsoft’s Cloud Adoption Framework and AZ-900 curriculum, predictability is divided into performance predictability and cost predictability. Evaluate each statement.',
    statements: [
      {
        statement: 'Autoscaling and load balancing contribute to performance predictability by maintaining consistent user response times under variable load.',
        answer: true
      },
      {
        statement: 'Cost predictability means every customer receives an identical flat monthly invoice regardless of how many resources they deploy.',
        answer: false
      },
      {
        statement: 'Real-time resource cost tracking, data analytics, and estimation calculators support cost predictability before and after deployment.',
        answer: true
      }
    ],
    awsBridgeHint: 'Predictability in Azure doesn’t mean fixed flat-rate bills—it means transparent forecasting tools for finance and consistent throughput for engineering.',
    explanation: 'Microsoft Learn groups Predictability into Performance predictability (using autoscaling, load balancing, and repeatable templates to deliver expected performance) and Cost predictability (forecasting future spend using real-time analytics, historical trends, TCO, and pricing calculators—not charging everyone a flat rate).',
    awsComparison: 'AZ-900 uniquely highlights "Predictability" (Performance + Cost) as a named cloud benefit pillar—be ready to recognize both halves on the exam.'
  },
  {
    id: 'az900-a1-027',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Manageability in the Cloud',
    difficulty: 2,
    format: 'single',
    prompt: 'Microsoft Learn distinguishes between "management OF the cloud" and "management IN the cloud." Which activity is an example of management OF the cloud?',
    options: [
      'Configuring declarative templates and automated scaling rules through the Azure portal or REST APIs to provision resources automatically',
      'Logging into a Windows Server virtual machine via Remote Desktop to manually edit Windows Registry keys',
      'Creating new tables and stored procedures inside a guest SQL database engine',
      'Uploading product catalog images through a web application’s content management dashboard'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think Control Plane automation (provisioning, autoscaling, monitoring alerts via cloud APIs) rather than logging into a guest OS or app.',
    explanation: 'Management OF the cloud refers to managing cloud resources themselves through control-plane capabilities—autoscaling, declarative deployment templates, portal/CLI/APIs, and health monitoring alerts. Logging into a guest OS, editing DB schemas, or using an app UI is management IN the cloud.',
    awsComparison: 'Notice how Microsoft flips the phrasing slightly from AWS’s "Security OF/IN the cloud": in AZ-900 Manageability, "Management OF the cloud" means customer use of Azure’s automated control plane!'
  },
  {
    id: 'az900-a1-028',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'IaaS Use Cases',
    difficulty: 2,
    format: 'single',
    prompt: 'A software vendor must migrate a legacy C++ application that installs custom kernel-mode drivers and requires granular control over operating system registry settings and local services. Which cloud service model is required?',
    options: [
      'Software as a Service (SaaS)',
      'Infrastructure as a Service (IaaS)',
      'Serverless Functions-as-a-Service',
      'Platform as a Service (PaaS)'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Custom OS kernel drivers and registry access immediately rule out managed runtimes and turnkey SaaS.',
    explanation: 'Infrastructure as a Service (IaaS) provides virtualized compute, storage, and networking while granting full administrative control over the guest operating system—mandatory for custom kernel drivers and lift-and-shift legacy workloads. PaaS, SaaS, and serverless abstract away OS kernel access.',
    awsComparison: 'Same architectural trigger on AWS SAA that forces a workload onto Amazon EC2 instead of AWS Fargate, Elastic Beanstalk, or Lambda.'
  },
  {
    id: 'az900-a1-029',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'PaaS Use Cases',
    difficulty: 1,
    format: 'single',
    prompt: 'A web development team wants to deploy a custom .NET web API without managing virtual machines, patching operating systems, or configuring web server software packages. Which cloud service model best fits their requirement?',
    options: [
      'Infrastructure as a Service (IaaS)',
      'On-premises private virtualization',
      'Platform as a Service (PaaS)',
      'Software as a Service (SaaS)'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Bring your own application code while letting the cloud provider own the OS, runtime, and web server middleware.',
    explanation: 'Platform as a Service (PaaS) provides a complete managed development and deployment environment in the cloud. Developers deploy their own code while Microsoft handles OS patching, runtime maintenance, capacity provisioning, and underlying infrastructure.',
    awsComparison: 'Equivalent to AWS Elastic Beanstalk or AWS App Runner.'
  },
  {
    id: 'az900-a1-030',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'SaaS Use Cases',
    difficulty: 1,
    format: 'single',
    prompt: 'An organization subscribes to Microsoft 365 for corporate email, productivity suites, and team collaboration, configuring only user licenses and organizational policies through a web browser. Which cloud service model is the organization consuming?',
    options: [
      'Infrastructure as a Service (IaaS)',
      'Platform as a Service (PaaS)',
      'Hybrid bare-metal hosting',
      'Software as a Service (SaaS)'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Users connect over the internet to centrally hosted, ready-to-use productivity software on a subscription basis.',
    explanation: 'Software as a Service (SaaS) delivers complete, centrally hosted applications over the internet—commonly via subscription licensing—such as Microsoft 365, Dynamics 365, email, and CRM suites. The customer writes zero application code and manages zero servers.',
    awsComparison: 'Matches SaaS offerings like Salesforce or Microsoft 365 referenced in AWS Cloud Practitioner.'
  },
  {
    id: 'az900-a1-031',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Serverless Computing',
    difficulty: 2,
    format: 'multi',
    prompt: 'Which TWO characteristics define serverless computing on Azure? (Select 2)',
    options: [
      'Developers must manually select and patch the host operating system kernel once per quarter',
      'Compute capacity scales automatically in response to events and can scale down to zero when idle',
      'Billing in consumption plans is based on actual execution time and executions rather than idle reserved server hours',
      'Dedicated physical servers remain powered on and billed continuously for each individual function even when zero events occur'
    ],
    selectCount: 2,
    correctIndices: [1, 2],
    awsBridgeHint: 'Think event-driven auto-scaling to zero and sub-second execution metering with zero server administration.',
    explanation: 'Serverless computing abstracts away server and OS management completely, automatically scales capacity up and down to zero based on incoming events/triggers, and charges only when code or workflows actually execute (in consumption tiers).',
    awsComparison: 'Identical to AWS Lambda and AWS Step Functions serverless principles.'
  },
  {
    id: 'az900-a1-032',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Serverless Use Cases',
    difficulty: 2,
    format: 'single',
    prompt: 'Which workload is the MOST appropriate candidate for an event-driven serverless consumption architecture?',
    options: [
      'Generating image thumbnails automatically whenever a customer uploads a photo to cloud storage, which happens sporadically throughout the day',
      'Running a legacy monolithic database engine that requires 128 GB of pinned RAM and continuous open TCP sockets 24/7',
      'Hosting a custom domain controller that requires direct access to Windows Server Active Directory group policy consoles',
      'Training a multi-day deep learning foundation model across tightly coupled GPU clusters'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Sporadic, bursty, trigger-driven tasks avoid paying for 99% idle compute time.',
    explanation: 'Sporadic, event-triggered workloads—such as processing uploaded files, webhooks, or queue messages—are ideal for serverless computing because they scale instantly when events arrive and cost nothing while idle. Stateful 24/7 databases, domain controllers, and multi-day GPU training runs require persistent infrastructure.',
    awsComparison: 'Classic S3-event -> AWS Lambda thumbnail generation pattern.'
  },
  {
    id: 'az900-a1-033',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Disaster Recovery Metrics',
    difficulty: 2,
    format: 'single',
    prompt: 'A business continuity plan states that in the event of a catastrophic regional outage, no more than 15 minutes of committed database transactions may be lost. Which metric defines this requirement?',
    options: [
      'Recovery Time Objective (RTO)',
      'Recovery Point Objective (RPO)',
      'Mean Time Between Failures (MTBF)',
      'Service Level Agreement (SLA) credit percentage'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Distinguish between how much *data* measured in time you can afford to lose (looking backward to the last backup/replication point) vs. how long recovery takes.',
    explanation: 'Recovery Point Objective (RPO) defines the maximum acceptable amount of data loss measured in time (e.g., 15 minutes of transactions). Recovery Time Objective (RTO) defines the maximum acceptable duration of downtime before service must be restored after a disaster.',
    awsComparison: 'Identical to RPO vs. RTO definitions tested heavily on AWS Solutions Architect Associate.'
  },
  {
    id: 'az900-a1-034',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Disaster Recovery Metrics',
    difficulty: 2,
    format: 'single',
    prompt: 'An executive mandate requires that a customer-facing ordering portal must be fully operational again within two hours of declaring a regional disaster. Which metric captures this two-hour target?',
    options: [
      'Recovery Point Objective (RPO)',
      'Fault Domain Count',
      'Recovery Time Objective (RTO)',
      'Elasticity Cooldown Period'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Focus on the clock ticking forward from outage declaration until users can transact again.',
    explanation: 'Recovery Time Objective (RTO) is the maximum acceptable length of time an application can remain unavailable after a failure or disaster strikes before normal operations are restored. RPO measures data loss rather than downtime duration.',
    awsComparison: 'Identical to RTO in AWS Disaster Recovery planning.'
  },
  {
    id: 'az900-a1-035',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Economies of Scale',
    difficulty: 1,
    format: 'single',
    prompt: 'Why can hyperscale public cloud providers offer lower per-unit compute and storage pricing than most individual enterprises can achieve in their own datacenters?',
    options: [
      'Public cloud providers skip physical redundancy and power backup systems',
      'Public cloud providers pass guest operating system patching duties to end users in SaaS',
      'Public cloud providers bill only once every five years through capital depreciation',
      'Economies of scale allow cloud providers to purchase hardware, power, cooling, and networking in massive volume and pass savings to customers'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Buying millions of servers and megawatts of power lowers the unit cost curve across hundreds of thousands of tenants.',
    explanation: 'Economies of scale is the ability to do things more efficiently and at a lower per-unit cost when operating at massive scale. Hyperscale cloud providers negotiate bulk hardware, electricity, cooling, and bandwidth pricing and amortize datacenter operations across millions of workloads.',
    awsComparison: 'Matches AWS’s Sixth Benefit of Cloud Computing: "Benefit from massive economies of scale."'
  },
  {
    id: 'az900-a1-036',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Shared Responsibility Matrix Details',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding who owns specific security layers in the Microsoft Shared Responsibility Model.',
    statements: [
      {
        statement: 'Physical datacenter security, physical network, and physical hosts are wholly Microsoft’s responsibility across IaaS, PaaS, and SaaS.',
        answer: true
      },
      {
        statement: 'In an Infrastructure as a Service (IaaS) deployment, operating system patching is a shared responsibility between Microsoft and the customer.',
        answer: false
      },
      {
        statement: 'Identity and directory infrastructure is a shared responsibility in both PaaS and SaaS cloud models.',
        answer: true
      }
    ],
    awsBridgeHint: 'Check the exact cells of Microsoft’s 7-layer diagram: physical layers are 100% Microsoft in all cloud tiers, IaaS OS is 100% customer, and directory infrastructure stays half-and-half in PaaS/SaaS.',
    explanation: 'Across IaaS, PaaS, and SaaS, Microsoft exclusively owns physical datacenter, physical network, and physical hosts. In IaaS, the Operating System layer belongs 100% to the customer (not shared). Identity and directory infrastructure is explicitly marked as shared in both PaaS and SaaS because Microsoft operates the cloud directory platform while the customer configures tenant directory settings and federation.',
    awsComparison: 'Watch out for Microsoft’s specific distinction between "Accounts and identities" (always 100% customer) vs. "Identity and directory infrastructure" (shared in SaaS/PaaS, customer in IaaS).'
  },
  {
    id: 'az900-a1-037',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Vertical vs Horizontal Trade-offs',
    difficulty: 3,
    format: 'multi',
    prompt: 'An architect is comparing vertical scaling (scaling up) against horizontal scaling (scaling out) for a web tier. Which TWO limitations apply specifically to vertical scaling compared to horizontal scaling? (Select 2)',
    options: [
      'Vertical scaling hits an absolute ceiling determined by the largest physical host SKU available in the region',
      'Resizing a virtual machine vertically typically requires a reboot, causing brief service interruption if running a single instance',
      'Vertical scaling forces developers to rewrite stateful sessions into external distributed caches before resizing RAM',
      'Vertical scaling requires deploying a load balancer in front of multiple identical server instances'
    ],
    selectCount: 2,
    correctIndices: [0, 1],
    awsBridgeHint: 'Think about why scaling up a single box eventually hits a brick wall and causes maintenance blips.',
    explanation: 'Vertical scaling is bounded by the maximum hardware SKU size available in a datacenter and generally requires restarting/rebooting the VM to attach larger CPU/RAM allocations—creating downtime if there is only one instance. External session state and load balancers are architectural requirements of horizontal scaling, not vertical scaling.',
    awsComparison: 'Same EC2 instance-resize reboot and max-instance-size limitations tested on AWS SAA.'
  },
  {
    id: 'az900-a1-038',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Elastic Autoscaling Lifecycle',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order the stages of an automated elastic scale-out and scale-in cycle in chronological sequence from first (top) to last (bottom).',
    correctSequence: [
      'Application traffic surges and sustained CPU utilization crosses the configured scale-out threshold',
      'The autoscaler provisions additional compute instances and registers them behind the load balancer',
      'Peak user traffic subsides and average CPU utilization drops below the scale-in threshold for the cooldown window',
      'The autoscaler safely terminates excess instances so the customer stops paying for idle capacity'
    ],
    awsBridgeHint: 'Follow the natural demand curve: metric breach upward -> add nodes -> metric drop + cooldown -> terminate nodes.',
    explanation: 'Elasticity responds dynamically to metrics: first, surging load breaches the scale-out rule; second, extra instances spin up to serve traffic; third, demand falls below the scale-in threshold over a stabilization/cooldown period; fourth, unneeded instances terminate to save OpEx.',
    awsComparison: 'Identical lifecycle to Amazon CloudWatch Alarms triggering EC2 Auto Scaling out and in with cooldown windows.'
  },
  {
    id: 'az900-a1-039',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Overprovisioning vs Cloud Sizing',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Compare traditional on-premises capacity planning with cloud consumption sizing. Evaluate each statement.',
    statements: [
      {
        statement: 'In traditional on-premises datacenters, organizations often purchase hardware sized for rare peak traffic, leaving paid capacity idle during normal operations.',
        answer: true
      },
      {
        statement: 'If an on-premises datacenter underprovisions hardware, unexpected viral traffic surges can lead to degraded performance or turned-away users until new servers are procured.',
        answer: true
      },
      {
        statement: 'In a public cloud consumption model, organizations must permanently reserve peak holiday compute capacity all twelve months of the year.',
        answer: false
      }
    ],
    awsBridgeHint: 'Remember the classic capacity-vs-demand curve graph: fixed staircase CapEx causes either wasted idle servers or lost customers, whereas cloud OpEx tracks actual demand.',
    explanation: 'On-premises CapEx forces a painful choice between overprovisioning for peak demand (wasting money on idle servers most of the year) or underprovisioning (suffering outages/throttling when demand spikes). Public cloud elasticity lets you provision baseline capacity normally and scale out only during peak windows.',
    awsComparison: 'Matches the iconic AWS Cloud Practitioner capacity-demand curve diagram.'
  },
  {
    id: 'az900-a1-040',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Azure Hybrid Benefit Concept',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding cloud licensing and cost-efficiency concepts in Azure.',
    statements: [
      {
        statement: 'Azure Hybrid Benefit allows organizations to apply eligible existing on-premises Windows Server and SQL Server licenses with Software Assurance to reduce compute software costs in Azure.',
        answer: true
      },
      {
        statement: 'Moving from on-premises to Infrastructure as a Service (IaaS) automatically eliminates all software licensing, guest patching, and storage expenses.',
        answer: false
      },
      {
        statement: 'Combining Azure Reservations for compute capacity with Azure Hybrid Benefit for software licensing can stack discounts for steady-state workloads.',
        answer: true
      }
    ],
    awsBridgeHint: 'Think BYOL (Bring Your Own License) for Microsoft Server software, and remember that capacity discounts and license discounts cover two separate portions of a VM’s hourly rate.',
    explanation: 'Azure Hybrid Benefit lets customers reuse eligible on-premises Windows Server and SQL Server licenses (with active Software Assurance or qualifying subscriptions) so they pay only the base Linux/compute rate in Azure. It can be combined with 1-year or 3-year Azure Reservations for maximum savings, whereas IaaS never eliminates storage or guest patching responsibilities.',
    awsComparison: 'Similar to AWS License Included vs. Bring Your Own License (BYOL) on Dedicated Hosts, except Azure allows Windows/SQL BYOL directly on standard multi-tenant VMs via Azure Hybrid Benefit!'
  },
  {
    id: 'az900-a1-041',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Agility vs Elasticity',
    difficulty: 2,
    format: 'single',
    prompt: 'A product manager asks engineers to test a new AI chatbot idea. Within fifteen minutes, the team provisions a managed language model endpoint and a web frontend, gathers user feedback for two days, and deletes the environment. Which cloud benefit is PRIMARILY demonstrated?',
    options: [
      'Cloud agility',
      'Fault tolerance',
      'Geo-redundancy',
      'Vertical scaling'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Don’t confuse fast time-to-experimentation by developers with automated metric-driven scaling under load.',
    explanation: 'Cloud agility is the speed at which teams can provision, experiment with, iterate on, and decommission resources to accelerate business innovation. Elasticity is automated capacity scaling in response to live traffic load, while fault tolerance and geo-redundancy address resiliency.',
    awsComparison: 'Common exam trap on both AZ-900 and AWS CCP: fast deployment/experimentation = Agility; automatic load-based scaling = Elasticity.'
  },
  {
    id: 'az900-a1-042',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Multi-Tenancy & Resource Pooling',
    difficulty: 1,
    format: 'single',
    prompt: 'In a public cloud environment, multiple unrelated organizations run virtual machines on the same underlying physical server rack while remaining logically isolated from one another. What is this architectural concept called?',
    options: [
      'Bare-metal colocation',
      'Multi-tenancy (resource pooling)',
      'Hybrid cloud bursting',
      'Vertical overprovisioning'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Hypervisor-enforced logical isolation lets many separate customers safely share pooled physical host hardware.',
    explanation: 'Multi-tenancy (or resource pooling) means a public cloud provider shares physical compute, network, and storage infrastructure across multiple customers (tenants) while using hypervisor and network virtualization controls to keep each tenant’s data and workloads strictly isolated.',
    awsComparison: 'Equivalent to standard shared-tenancy instances in AWS (as opposed to Dedicated Instances or Dedicated Hosts).'
  },
  {
    id: 'az900-a1-043',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Shared Responsibility — Network Controls',
    difficulty: 3,
    format: 'single',
    prompt: 'How does responsibility for "Network controls" change when an organization moves a workload from Infrastructure as a Service (IaaS) to Software as a Service (SaaS)?',
    options: [
      'It shifts from wholly Microsoft’s responsibility to wholly the customer’s responsibility',
      'It remains wholly the customer’s responsibility in both models',
      'It shifts from wholly the customer’s responsibility in IaaS to wholly Microsoft’s responsibility in SaaS',
      'It remains a 50/50 shared responsibility in IaaS, PaaS, and SaaS alike'
    ],
    correctIndices: [2],
    awsBridgeHint: 'In virtual machine hosting you build your own subnets and security rules; in turnkey web software the vendor runs the entire network stack.',
    explanation: 'According to the Microsoft Shared Responsibility matrix, Network controls are wholly the customer’s responsibility in IaaS (configuring virtual networks, subnets, and firewall rules), become a shared responsibility in PaaS, and shift wholly to Microsoft in SaaS.',
    awsComparison: 'Mirrors moving from managing VPC Security Groups/NACLs on EC2 (IaaS) to consuming a pure SaaS web application where network infrastructure is vendor-managed.'
  },
  {
    id: 'az900-a1-044',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Shared Responsibility — Data Classification',
    difficulty: 2,
    format: 'single',
    prompt: 'A healthcare clinic stores patient records inside a cloud-based Software as a Service (SaaS) portal. Who is responsible for classifying the sensitivity of patient data, assigning least-privilege user access, and complying with data retention policies?',
    options: [
      'Microsoft physical datacenter operations staff',
      'The internet service provider carrying clinic traffic',
      'Microsoft’s automated hypervisor scheduler',
      'The healthcare clinic (the customer)'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Information, data governance, and user access entitlements never transfer to the cloud provider—even in SaaS.',
    explanation: 'Information and data—including data classification, retention policies, quality, and granting appropriate user access—is always 100% the customer’s responsibility across On-Premises, IaaS, PaaS, and SaaS.',
    awsComparison: 'Identical to AWS data ownership rules: customers always own their data governance, classification, and IAM least-privilege assignments.'
  },
  {
    id: 'az900-a1-045',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'On-Premises Hidden Costs (TCO)',
    difficulty: 2,
    format: 'multi',
    prompt: 'When calculating Total Cost of Ownership (TCO) to compare an on-premises datacenter against migrating to the public cloud, which THREE expenses represent hidden or indirect on-premises costs that are absorbed by Microsoft in Azure? (Select 3)',
    options: [
      'Datacenter electricity and HVAC cooling power consumption',
      '24/7 physical building security guards, biometric gates, and fire suppression systems',
      'Real estate floor space and backup diesel generator maintenance',
      'Salary of corporate business analysts writing SQL reports on company sales data',
      'Licensing of third-party mobile apps installed on employee smartphones'
    ],
    selectCount: 3,
    correctIndices: [0, 1, 2],
    awsBridgeHint: 'Include facilities, power/cooling, and physical security—exclude business staff salaries and client device apps.',
    explanation: 'Organizations comparing server sticker prices against cloud bills often forget indirect on-premises datacenter expenses: electricity, HVAC cooling, physical security, real estate, and backup power generators—all of which are built into Azure’s cloud service rates. Business analyst salaries and employee smartphone apps remain customer expenses regardless of cloud migration.',
    awsComparison: 'Matches the AWS Migration Evaluator / TCO analysis factors (facilities, power, cooling, rack space, physical security).'
  },
  {
    id: 'az900-a1-046',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Horizontal Scaling Stateless Design',
    difficulty: 3,
    format: 'single',
    prompt: 'Why are stateless application tiers significantly easier to scale horizontally (scale out and scale in) than stateful application tiers that store user session data in local server memory?',
    options: [
      'Any instance can serve any incoming user request, and instances can be terminated during scale-in without losing active user sessions',
      'Stateless applications bypass virtual networks and connect directly to physical host fiber cables',
      'Stateless applications never require a load balancer to distribute incoming HTTP requests',
      'Stateful applications cannot be hosted on Infrastructure as a Service (IaaS) virtual machines'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think about what happens to a shopper’s cart stored in local RAM when an autoscaler terminates an instance during scale-in.',
    explanation: 'When web or API servers are stateless (storing session data externally in a shared cache or database), a load balancer can route requests to any healthy instance, and autoscaling can safely terminate excess instances during scale-in without dropping user sessions.',
    awsComparison: 'Exact same AWS SAA best practice: externalize session state to ElastiCache or DynamoDB so Auto Scaling groups can scale out/in freely.'
  },
  {
    id: 'az900-a1-047',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Vertical Scaling Down',
    difficulty: 1,
    format: 'single',
    prompt: 'Monitoring reveals that a newly migrated virtual machine configured with 32 vCPUs and 128 GB of RAM averages less than 4% CPU and 8% memory utilization around the clock. The administrator resizes the virtual machine to 4 vCPUs and 16 GB of RAM. What action did the administrator take?',
    options: [
      'Scaling in (horizontal scaling)',
      'Scaling down (vertical scaling)',
      'Configuring active-active geo-replication',
      'Converting from OpEx to CapEx'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Reducing the compute size of a single existing instance—watch the directional preposition ("down" vs. "in")!',
    explanation: 'Reducing the CPU or memory allocation of a single existing resource is vertical scaling down (right-sizing). Scaling in reduces the count of instances in a horizontal pool rather than shrinking an individual VM’s SKU.',
    awsComparison: 'AZ-900 strictly enforces terminology: Scale Up/Down = vertical instance size; Scale Out/In = horizontal instance count.'
  },
  {
    id: 'az900-a1-048',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Serverless vs Traditional PaaS',
    difficulty: 3,
    format: 'single',
    prompt: 'Both standard Platform as a Service (PaaS) web hosting plans and serverless Consumption plans abstract away operating system patching. What is the key operational and billing difference of a pure serverless Consumption model?',
    options: [
      'Serverless requires customers to purchase 3-year hardware reservations upfront',
      'Standard PaaS cannot connect to managed cloud databases over HTTPS',
      'Serverless scales automatically to zero when idle and bills per execution and resource consumption rather than charging a continuous hourly plan rate',
      'Serverless grants root SSH access to the underlying hypervisor kernel'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Compare an always-running Elastic Beanstalk/App Runner baseline instance against an AWS Lambda function that receives ten calls a day.',
    explanation: 'In traditional Dedicated PaaS plans (such as a standard App Service Plan), underlying compute instances remain allocated and billed hourly even when zero requests arrive. Pure serverless Consumption plans automatically scale down to zero instances when idle and charge strictly per execution event and execution duration.',
    awsComparison: 'Equivalent to comparing provisioned PaaS compute (Elastic Beanstalk / provisioned ECS) against scale-to-zero AWS Lambda.'
  },
  {
    id: 'az900-a1-049',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Private Cloud Use Case',
    difficulty: 2,
    format: 'single',
    prompt: 'A national defense research laboratory operates under a strict legal mandate prohibiting its classified simulation workloads from residing on any hardware owned by or shared with external organizations. Which cloud deployment model MUST the laboratory use?',
    options: [
      'Multi-cloud across two commercial public cloud vendors',
      'Public cloud with consumption-based Spot instances',
      'Community SaaS portal shared with public universities',
      'Private cloud running on dedicated, organization-controlled infrastructure'
    ],
    correctIndices: [3],
    awsBridgeHint: 'When third-party multi-tenant hardware is legally forbidden, single-tenant customer-isolated private infrastructure is the only valid fit.',
    explanation: 'A private cloud provides compute, storage, and networking dedicated exclusively to a single organization—typically hosted in the organization’s own on-premises datacenter—satisfying mandates that forbid shared multi-tenant or third-party hardware.',
    awsComparison: 'Matches strict air-gapped / on-premises private cloud scenarios where commercial multi-tenant regions are out of bounds.'
  },
  {
    id: 'az900-a1-050',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'OpEx Cash Flow Benefits',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding why startups and enterprises adopt Operational Expenditure (OpEx) cloud models.',
    statements: [
      {
        statement: 'OpEx lowers the financial barrier to entry for startups because they do not need large upfront capital to buy servers before launching a product.',
        answer: true
      },
      {
        statement: 'If a cloud experiment fails after two months, an OpEx model allows the company to decommission the resources without being stuck with five years of sunk hardware costs.',
        answer: true
      },
      {
        statement: 'Under OpEx accounting rules, organizations must pay for three years of projected cloud bandwidth upfront before creating their first virtual network.',
        answer: false
      }
    ],
    awsBridgeHint: 'Zero upfront commitment and the freedom to shut down failed experiments cleanly without leftover hardware inventory.',
    explanation: 'OpEx preserves working capital by eliminating upfront hardware investments and lets organizations stop paying immediately if a project or product experiment is discontinued. Cloud bandwidth and compute under pay-as-you-go are billed arrears based on actual monthly usage, never three years upfront.',
    awsComparison: 'Core AWS Cloud Economics principle: replace large upfront fixed expenses with low variable expenses that scale with the business.'
  },
  {
    id: 'az900-a1-051',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'On-Demand Self-Service',
    difficulty: 1,
    format: 'single',
    prompt: 'An authorized developer logs into the Azure portal at midnight on a Saturday and deploys a managed PostgreSQL database in four minutes without phoning or emailing Microsoft support staff. Which fundamental cloud characteristic does this represent?',
    options: [
      'On-demand self-service',
      'Manual colocation provisioning',
      'Capital asset depreciation',
      'Air-gapped isolation'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think of the first NIST essential characteristic of cloud computing: automated provisioning without human interaction with the service provider.',
    explanation: 'On-demand self-service enables cloud consumers to unilaterally provision computing capabilities—such as server time, databases, and network storage—automatically as needed without requiring human intervention from the cloud provider.',
    awsComparison: 'Directly matches NIST Special Publication 800-145 "On-demand self-service," foundational to both AWS and Azure.'
  },
  {
    id: 'az900-a1-052',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Measured Service',
    difficulty: 1,
    format: 'single',
    prompt: 'Azure continuously meters every storage gigabyte-month, compute second, and API execution so resource usage can be monitored, controlled, and transparently billed to the customer. Which NIST cloud characteristic describes this capability?',
    options: [
      'Static overprovisioning',
      'Measured service',
      'Single-tenant dedication',
      'Manual capacity ticketing'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Utility-grade telemetry that meters exactly what you consume—just like an electric or water meter.',
    explanation: 'Measured service means cloud systems automatically control, optimize, and meter resource usage at an abstraction level appropriate to the type of service (e.g., storage, processing, bandwidth, active user accounts), providing transparency for both provider and consumer.',
    awsComparison: 'Matches NIST "Measured service" underpinning AWS Cost & Usage Reports and Azure Cost Management.'
  },
  {
    id: 'az900-a1-053',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Security & Governance Cloud Benefits',
    difficulty: 2,
    format: 'single',
    prompt: 'How does adopting a public cloud platform strengthen an organization’s governance and compliance posture compared to unmanaged ad-hoc servers?',
    options: [
      'By transferring legal liability for weak employee passwords entirely to Microsoft',
      'By disabling all external auditing and regulatory certifications across cloud regions',
      'By providing policy-driven governance templates, automated compliance assessments, and inherited physical datacenter certifications',
      'By preventing administrators from restricting which regions developers can deploy into'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Think inherited ISO/SOC/PCI physical controls combined with guardrails-as-code that audit and restrict non-compliant deployments.',
    explanation: 'Cloud governance benefits include standardized policy guardrails (such as restricting allowed regions or SKUs), continuous compliance posture scoring, and inheriting dozens of physical/infrastructure compliance certifications maintained by Microsoft. Weak employee passwords remain a customer identity responsibility.',
    awsComparison: 'Analogous to combining AWS Artifact (inherited compliance reports) with AWS Organizations SCPs and AWS Config guardrails.'
  },
  {
    id: 'az900-a1-054',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Azure Savings Plans vs Reservations',
    difficulty: 3,
    format: 'single',
    prompt: 'A cloud architect commits to spending a fixed hourly dollar amount on compute for three years, wanting discounts to apply automatically even as teams migrate workloads across different VM families, regions, and container compute services. Which pricing model fits best?',
    options: [
      'Azure Spot Virtual Machines',
      'Standard Pay-As-You-Go',
      'Single-scope Azure Reserved VM Instances pinned to one SKU',
      'Azure Savings Plans for Compute'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Commit to an hourly $/hr compute spend across regions and compute runtimes rather than locking into a specific instance family in one region.',
    explanation: 'Azure Savings Plans for Compute let organizations commit to a fixed hourly spend ($/hour) for 1 or 3 years, automatically applying discounted rates across participating compute services, VM sizes, and regions globally. Azure Reserved VM Instances yield slightly higher peak discounts (~72% vs ~65%) when pinned to specific VM series and regions.',
    awsComparison: 'Directly equivalent to AWS Compute Savings Plans ($/hr commitment across EC2, Fargate, and Lambda globally) vs. Standard EC2 Reserved Instances.'
  },
  {
    id: 'az900-a1-055',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Disaster Recovery Failover Sequence',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order the stages of a cross-region Disaster Recovery (DR) lifecycle from initial preparation (top) to post-incident return to normal operations (bottom).',
    correctSequence: [
      'Configure continuous asynchronous replication of workloads and data from the primary region to a secondary region',
      'Detect a catastrophic outage in the primary region that breaches acceptable availability thresholds',
      'Execute failover to activate compute instances and redirect user traffic to the secondary region within the RTO target',
      'Re-synchronize data and perform failback to the restored primary region once the outage is resolved'
    ],
    awsBridgeHint: 'Follow the standard DR lifecycle: replicate -> detect regional catastrophe -> failover -> re-sync & failback.',
    explanation: 'A complete disaster recovery plan begins before any outage with ongoing data/state replication, followed by outage detection/declaration, executing failover to restore service within RTO, and eventually re-synchronizing and failing back once the primary region is healthy again.',
    awsComparison: 'Identical workflow to AWS Elastic Disaster Recovery (AWS DRS) replication, failover, and failback stages.'
  },
  {
    id: 'az900-a1-056',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Single Points of Failure & High Availability',
    difficulty: 2,
    format: 'multi',
    prompt: 'An architect is reviewing a web application to achieve High Availability (HA) in the cloud. Which TWO design practices directly eliminate single points of failure? (Select 2)',
    options: [
      'Deploying multiple redundant web application instances across separate physical fault boundaries behind a load balancer',
      'Upgrading a single standalone virtual machine to the fastest NVMe local temporary disk available',
      'Replicating the backend database synchronously to an automatic failover standby replica',
      'Purchasing a 3-year Azure Reservation for a single-instance virtual machine'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'Redundancy across independent failure domains removes single points of failure; faster disks or billing discounts on a single box do not.',
    explanation: 'High availability requires eliminating single points of failure by running redundant compute instances behind a load balancer and maintaining redundant, automatically failing-over database replicas. Faster disks improve IOPS performance, and Reservations reduce billing cost, neither of which protects a single VM from outage.',
    awsComparison: 'Same principle as AWS Multi-AZ ALB + Auto Scaling web tier paired with Amazon RDS Multi-AZ standby failover.'
  },
  {
    id: 'az900-a1-057',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'PaaS Advantages & Trade-offs',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Platform as a Service (PaaS) offerings in Azure.',
    statements: [
      {
        statement: 'PaaS offerings typically include built-in high availability, automated OS patching, and integrated scaling controls out of the box.',
        answer: true
      },
      {
        statement: 'Because Microsoft manages the underlying platform, PaaS restricts customers from installing arbitrary custom hypervisor modules or custom OS kernels.',
        answer: true
      },
      {
        statement: 'In a PaaS relational database, Microsoft automatically writes the customer’s SQL table schemas and validates business logic accuracy.',
        answer: false
      }
    ],
    awsBridgeHint: 'Managed platforms trade low-level OS access for built-in HA/patching—while your application schema and data remain 100% yours.',
    explanation: 'PaaS accelerates development with built-in HA, scaling, and automated OS/middleware patching, at the trade-off of restricting low-level OS/kernel access. Designing database schemas, queries, and application data logic remains entirely the customer’s responsibility.',
    awsComparison: 'Same trade-off when choosing Amazon RDS or AWS App Runner over self-managed EC2.'
  },
  {
    id: 'az900-a1-058',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Hybrid vs Multi-Cloud Governance',
    difficulty: 2,
    format: 'single',
    prompt: 'A global retailer runs Kubernetes clusters in its own regional warehouses, on Azure, and on a second commercial public cloud provider. How is this combined architecture classified?',
    options: [
      'Both hybrid cloud and multi-cloud',
      'Pure single-tenant private cloud',
      'Software as a Service (SaaS) only',
      'Community mainframe colocation'
    ],
    correctIndices: [0],
    awsBridgeHint: 'It spans private customer-owned locations AND more than one public cloud provider simultaneously.',
    explanation: 'Hybrid cloud and multi-cloud are not mutually exclusive: combining private on-premises warehouse infrastructure with public cloud resources creates a hybrid cloud, while running across two or more public cloud providers establishes a multi-cloud footprint.',
    awsComparison: 'Azure heavily emphasizes hybrid + multi-cloud management under a single control plane (Azure Arc), a frequent conceptual theme in AZ-900.'
  },
  {
    id: 'az900-a1-059',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Data Sovereignty & Geo-Distribution',
    difficulty: 2,
    format: 'single',
    prompt: 'A European fintech startup must ensure that personally identifiable financial records of German citizens are stored and processed strictly within European Union borders while serving dashboard assets globally. Which cloud benefit enables meeting this requirement without building European datacenters?',
    options: [
      'Vertical compute scaling',
      'Geo-distribution across regional cloud datacenters',
      'Spot instance preemption',
      'Operating system virtualization'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Selecting specific geographic cloud regions lets you pin regulated data inside sovereign legal boundaries instantly.',
    explanation: 'Geo-distribution across dozens of global Azure regions enables customers to select exact geographic jurisdictions where regulated data resides to satisfy data residency/sovereignty laws, without investing CapEx in foreign physical datacenters.',
    awsComparison: 'Equivalent to selecting specific EU AWS Regions (e.g., `eu-central-1` Frankfurt) to enforce GDPR data residency.'
  },
  {
    id: 'az900-a1-060',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Serverless Anti-Patterns',
    difficulty: 3,
    format: 'single',
    prompt: 'In which scenario would a pure event-driven serverless Consumption architecture be LEAST cost-effective or technically unsuitable compared to provisioned VMs or Reserved PaaS?',
    options: [
      'Running a nightly 30-second cleanup script triggered by a cron timer',
      'Processing order confirmation webhooks from a payment gateway a few hundred times per hour',
      'Executing a CPU-saturated video transcoding cluster running at 95% utilization continuously 24 hours a day, 365 days a year',
      'Validating JSON payloads whenever a CSV file lands in cloud object storage'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Serverless shines on spiky or idle-heavy workloads; non-stop 24/7 max-CPU crunching pays a premium per GB-second over reserved compute.',
    explanation: 'Consumption-based serverless functions bill per execution second and memory-second and enforce execution duration limits. A workload running at 95% CPU continuously 24/7/365 has zero idle time to save on and is far more economical on Reserved VMs or Savings Plans.',
    awsComparison: 'Classic AWS SAA cost-optimization rule: steady high-duty-cycle 24/7 compute belongs on Reserved EC2/ECS rather than AWS Lambda.'
  },
  {
    id: 'az900-a1-061',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Service Level Agreements (SLA) Concept',
    difficulty: 2,
    format: 'single',
    prompt: 'In cloud computing concepts, what does a higher number of "nines" in a service’s availability target (for example, moving from 99.9% to 99.99% uptime) represent?',
    options: [
      'A guarantee that outbound network bandwidth costs decrease by 90%',
      'A transfer of customer data accuracy responsibility to Microsoft',
      'An increase in the maximum allowable hours of unscheduled downtime per year',
      'A dramatic reduction in the maximum allowable minutes of downtime per month or year, typically requiring greater architectural redundancy'
    ],
    correctIndices: [3],
    awsBridgeHint: '99.9% allows ~8.76 hours/year of downtime, whereas 99.99% shrinks that budget by 10x to ~52.6 minutes/year.',
    explanation: 'Each additional "nine" in availability cuts allowable downtime tenfold (99.9% is ~43.8 minutes/month; 99.99% is ~4.38 minutes/month). Achieving higher nines generally requires deploying redundant instances across multiple fault zones or regions, often increasing architectural complexity and cost.',
    awsComparison: 'Identical SLA "nines" math used across AWS and Azure Reliability engineering.'
  },
  {
    id: 'az900-a1-062',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Non-Production OpEx Optimization',
    difficulty: 1,
    format: 'single',
    prompt: 'A software engineering department uses fifty development virtual machines only Monday through Friday from 8:00 AM to 6:00 PM. How does the cloud consumption model allow the company to cut compute spend by more than 65%?',
    options: [
      'Configure automated schedules to deallocate the virtual machines every evening and weekend so compute billing stops while idle',
      'Convert the development virtual machines to five-year on-premises hardware leases',
      'Keep the virtual machines running 24/7 and disable operating system firewalls',
      'Move all developer laptops into a physical colocation cage'
    ],
    correctIndices: [0],
    awsBridgeHint: 'There are 168 hours in a week and developers work ~50 of them—stop and deallocate non-prod compute during the other 118 hours!',
    explanation: 'Because pay-as-you-go cloud compute bills only while virtual machines are allocated, scheduling automatic nightly and weekend deallocation ("Stopped (deallocated)") eliminates over two-thirds of weekly compute hours for dev/test environments.',
    awsComparison: 'Equivalent to using AWS Instance Scheduler to stop non-production EC2 and RDS instances outside business hours.'
  },
  {
    id: 'az900-a1-063',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Broad Network Access',
    difficulty: 1,
    format: 'single',
    prompt: 'Employees access cloud-hosted business applications seamlessly from Windows laptops, macOS workstations, iOS tablets, and Android phones over standard HTTPS protocols. Which essential cloud computing characteristic does this illustrate?',
    options: [
      'Resource pooling',
      'Broad network access',
      'Vertical scaling',
      'Capital depreciation'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Capabilities are available over the network and accessed through standard mechanisms by heterogeneous thin or thick client platforms.',
    explanation: 'Broad network access means cloud capabilities are available over the network and accessible through standard protocols (such as HTTPS) that support diverse client platforms including mobile phones, tablets, laptops, and workstations.',
    awsComparison: 'Matches NIST essential characteristic #2: "Broad network access."'
  },
  {
    id: 'az900-a1-064',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'RPO & RTO Cost Trade-offs',
    difficulty: 3,
    format: 'single',
    prompt: 'Business stakeholders ask an architect to change a secondary region’s disaster recovery strategy from restoring daily cold backups (RPO 24 hours, RTO 8 hours) to active-active multi-region synchronous/near-real-time deployment (RPO near-zero, RTO near-zero). What is the primary trade-off of this change?',
    options: [
      'Application availability during regional outages decreases significantly',
      'Customer responsibility for user identities shifts completely to Microsoft',
      'Ongoing operational expenditure (OpEx) and architectural complexity increase substantially because live compute and data tiers run in multiple regions simultaneously',
      'The workload converts automatically from public cloud to an air-gapped private cloud'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Driving RPO and RTO toward zero moves you from cheap backup storage to running duplicate live production stacks.',
    explanation: 'Achieving near-zero RPO and RTO requires continuously running redundant compute, networking, and multi-region replicated databases in multiple regions simultaneously, which substantially increases monthly OpEx and engineering complexity compared to cold backup-and-restore.',
    awsComparison: 'Matches the AWS Disaster Recovery spectrum: Backup & Restore ($) -> Pilot Light ($$) -> Warm Standby ($$$) -> Multi-Site Active/Active ($$$$).'
  },
  {
    id: 'az900-a1-065',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Evergreen Infrastructure',
    difficulty: 2,
    format: 'single',
    prompt: 'In an on-premises datacenter, IT teams must budget for disruptive hardware refresh projects every three to five years as servers age out of warranty. How does public cloud computing address hardware lifecycle aging?',
    options: [
      'Customers must mail replacement RAM sticks to Microsoft datacenters every four years',
      'Public cloud servers never use physical CPUs or solid-state drives',
      'Cloud virtual machines permanently lock to decade-old processor generations forever',
      'Microsoft continuously refreshes and retires underlying datacenter hardware transparently behind the hypervisor, and customers can adopt newer VM generations in minutes'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Hardware lifecycle management happens invisibly underneath the hypervisor, and upgrading to newer CPU generations is just an API resize.',
    explanation: 'In the public cloud, Microsoft handles ongoing physical hardware refreshes, firmware security, and faulty component replacement behind the scenes, while customers can switch to newer-generation VM SKUs through a simple configuration change rather than a multi-month CapEx procurement project.',
    awsComparison: 'Same operational benefit as upgrading an EC2 instance from `m5` to `m7i` in minutes without decommissioning physical racks.'
  },
  {
    id: 'az900-a1-066',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'CapEx vs OpEx Classification',
    difficulty: 1,
    format: 'yes-no',
    prompt: 'Classify whether each IT expenditure is an example of Operational Expenditure (OpEx) rather than Capital Expenditure (CapEx).',
    statements: [
      {
        statement: 'Paying per-seat monthly subscription fees for 250 employees using a cloud-based CRM Software as a Service (SaaS) platform.',
        answer: true
      },
      {
        statement: 'Purchasing a corporate building and installing raised-floor cooling units for an internal server room.',
        answer: false
      },
      {
        statement: 'Paying monthly metered charges for 12 terabytes of cloud object storage and associated API read operations.',
        answer: true
      }
    ],
    awsBridgeHint: 'Recurring per-seat SaaS subscriptions and metered monthly storage are pure ongoing operating expenses; real estate and HVAC hardware are upfront capital assets.',
    explanation: 'Monthly SaaS user subscriptions and metered cloud storage consumption are recurring Operational Expenditures (OpEx) deducted in the billing period incurred. Buying real estate and physical HVAC equipment is an upfront Capital Expenditure (CapEx).',
    awsComparison: 'Standard CapEx vs. OpEx classification shared across AZ-900 and AWS CCP.'
  },
  {
    id: 'az900-a1-067',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Service Model Mapping',
    difficulty: 2,
    format: 'multi',
    prompt: 'An organization runs three workloads in the cloud: (1) self-managed Linux virtual machines running custom network packet sniffers, (2) a managed cloud web app service where developers upload Python code without managing OS patches, and (3) browser-based corporate webmail. Which TWO statements accurately classify these workloads? (Select 2)',
    options: [
      'The self-managed Linux virtual machines represent Infrastructure as a Service (IaaS)',
      'The self-managed Linux virtual machines represent Software as a Service (SaaS)',
      'The managed Python web app service represents Platform as a Service (PaaS) and corporate webmail represents Software as a Service (SaaS)',
      'All three workloads represent Private Cloud Capital Expenditure (CapEx)'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'Match Linux VMs -> IaaS, managed code hosting -> PaaS, and turnkey webmail -> SaaS.',
    explanation: 'Virtual machines where the customer manages the Linux OS and packet tools are IaaS; managed application hosting where developers supply Python code without touching the OS is PaaS; and ready-to-use browser webmail is SaaS.',
    awsComparison: 'Maps directly to Amazon EC2 (IaaS), AWS Elastic Beanstalk/App Runner (PaaS), and Amazon WorkMail / Microsoft 365 (SaaS).'
  },
  {
    id: 'az900-a1-068',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Disaster Recovery Strategy Cost Ranking',
    difficulty: 3,
    format: 'sequence',
    prompt: 'Order these disaster recovery architectures from the LONGEST Recovery Time Objective / lowest ongoing cost (top) to the SHORTEST Recovery Time Objective / highest ongoing cost (bottom).',
    correctSequence: [
      'Cold backup and restore (redeploying infrastructure from templates and restoring off-site backups after an outage)',
      'Pilot light (replicating core databases continuously while keeping application compute turned off until failover)',
      'Warm standby (running a scaled-down but fully functional copy of the application stack continuously in the secondary region)',
      'Active-active multi-region deployment (serving live production traffic across full-capacity stacks in multiple regions simultaneously)'
    ],
    awsBridgeHint: 'Move progressively from cold backups up through Pilot Light and Warm Standby to full Multi-Site Active/Active.',
    explanation: 'Cold backup-and-restore costs the least (primarily backup storage) but has the longest RTO because compute must be provisioned and data restored. Pilot light keeps data live; warm standby keeps a minimal live app stack ready to scale up; and active-active serves live traffic across regions for near-zero RTO at the highest ongoing cost.',
    awsComparison: 'Identical 4-tier DR spectrum taught in the AWS Well-Architected Reliability Pillar.'
  },
  {
    id: 'az900-a1-069',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Planned vs Unplanned Downtime',
    difficulty: 2,
    format: 'single',
    prompt: 'How does deploying redundant compute instances across separate update and fault boundaries support High Availability during routine platform maintenance?',
    options: [
      'Updates are rolled out sequentially to a subset of instances at a time while healthy instances continue serving live user traffic',
      'Routine host security updates are permanently disabled for the lifetime of the subscription',
      'All instances reboot simultaneously at noon so downtime finishes faster',
      'Users are redirected to a static maintenance error page for four hours every Tuesday'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Rolling updates ensure only a fraction of your fleet restarts at once while load balancers route traffic to the active nodes.',
    explanation: 'High availability protects against both unplanned hardware failures (fault isolation) and planned maintenance reboots (rolling update isolation), updating only a subset of hosts at a time so remaining instances serve traffic without user-visible outage.',
    awsComparison: 'Foreshadows Azure Update Domains vs. Fault Domains—a core Azure concept with no exact 1:1 manual AWS Update Domain equivalent!'
  },
  {
    id: 'az900-a1-070',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Multi-Cloud Portability',
    difficulty: 2,
    format: 'single',
    prompt: 'An enterprise wants to minimize vendor lock-in so its microservices can run consistently across Azure, another public cloud provider, and on-premises datacenters. Which architectural approach best supports this multi-cloud portability goal?',
    options: [
      'Writing proprietary desktop applications compiled exclusively for legacy mainframe hardware',
      'Packaging applications into standardized OCI/Docker containers orchestrated on Kubernetes',
      'Hardcoding single-vendor proprietary storage memory addresses into assembly routines',
      'Storing all application state inside unbacked local temporary virtual machine disks'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Standardized container images and open-source container orchestration provide a consistent runtime abstraction across clouds.',
    explanation: 'Containerizing workloads using open standards and orchestrating them via Kubernetes allows teams to deploy portable application artifacts consistently across Azure, other public clouds, and on-premises environments.',
    awsComparison: 'Same portability rationale behind running standardized Kubernetes workloads across AKS, Amazon EKS, and on-premises clusters.'
  },
  {
    id: 'az900-a1-071',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Elasticity vs Permanent Growth',
    difficulty: 2,
    format: 'single',
    prompt: 'A tax-preparation web service experiences 15x normal traffic during the final week of April before returning to baseline volume on May 1. Which cloud characteristic allows the company to handle the April surge smoothly without paying for 15x capacity from May through March?',
    options: [
      'Capital asset amortization',
      'Single-region private colocation',
      'Elasticity',
      'Manual tape archiving'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Seasonal or spiky surges followed by automatic contraction back to baseline is the signature benefit of elastic cloud architecture.',
    explanation: 'Elasticity enables systems to automatically expand compute resources during predictable or unpredictable spikes (such as tax deadlines) and contract back to baseline immediately afterward, aligning OpEx strictly with actual demand.',
    awsComparison: 'Classic textbook Elasticity scenario on both AZ-900 and AWS exams.'
  },
  {
    id: 'az900-a1-072',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Shared Responsibility — SaaS Identity Security',
    difficulty: 2,
    format: 'single',
    prompt: 'An organization adopts a cloud-based SaaS human resources system. A former employee’s account is not deactivated after resignation, allowing unauthorized access to payroll records. Under the Shared Responsibility Model, whose failure allowed this incident?',
    options: [
      'Microsoft’s physical datacenter security team',
      'Microsoft’s SaaS application patching engineers',
      'The regional fiber-optic network carrier',
      'The customer, because managing user accounts, identities, and access lifecycle is always the customer’s responsibility'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Joiner-Mover-Leaver account lifecycle and MFA enforcement never belong to the SaaS vendor.',
    explanation: 'Accounts and identities—including provisioning users, enforcing Multi-Factor Authentication, and deprovisioning departing employees—are 100% the customer’s responsibility across SaaS, PaaS, IaaS, and on-premises.',
    awsComparison: 'Same IAM hygiene principle on AWS: compromised or unrevoked user credentials are always a customer "Security IN the Cloud" failure.'
  },
  {
    id: 'az900-a1-073',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Hybrid Cloud Intermittent Edge Connectivity',
    difficulty: 2,
    format: 'single',
    prompt: 'A cruise line operates passenger check-in, point-of-sale, and navigation systems locally aboard ships with intermittent satellite connectivity while synchronizing operational analytics to Azure whenever docked in port. Which deployment model does this architecture use?',
    options: [
      'Hybrid cloud',
      'Pure public cloud only',
      'Pure Software as a Service (SaaS) browser-only mode',
      'Multi-cloud across three public cloud vendors'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Disconnected/intermittent local edge infrastructure syncing periodically with a public cloud region.',
    explanation: 'Running local private compute aboard ships/edge locations for disconnected resiliency and syncing with Azure public cloud services when connected is a classic hybrid cloud edge pattern.',
    awsComparison: 'Analogous to AWS Snowball Edge / AWS Outposts / AWS IoT Greengrass hybrid edge architectures.'
  },
  {
    id: 'az900-a1-074',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Spot VM Workload Suitability',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate whether each workload is a suitable match for Azure Spot Virtual Machines.',
    statements: [
      {
        statement: 'A distributed Monte Carlo financial simulation whose worker nodes pull small independent tasks from a durable queue.',
        answer: true
      },
      {
        statement: 'A single-instance primary relational database backing a live hospital emergency room admissions system.',
        answer: false
      },
      {
        statement: 'Stateless automated CI/CD build agents that can retry a failed build job on another node if evicted.',
        answer: true
      }
    ],
    awsBridgeHint: 'Queue-driven stateless workers and retryable CI agents handle eviction gracefully; single-instance life-safety databases never can.',
    explanation: 'Spot VMs are ideal for interruptible, stateless, queue-backed simulations and retryable CI/CD build runners because evictions do not cause data loss or SLA breaches. A critical hospital admissions database cannot tolerate sudden compute eviction.',
    awsComparison: 'Exact same workload suitability rules as Amazon EC2 Spot Instances.'
  },
  {
    id: 'az900-a1-075',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Serverless Cold Starts & Characteristics',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding serverless computing architectures in the cloud.',
    statements: [
      {
        statement: 'When a scale-to-zero serverless function has been completely idle, the first incoming request may experience brief extra latency known as a cold start while the runtime initializes.',
        answer: true
      },
      {
        statement: 'Serverless architectures eliminate the customer’s responsibility for securing application code dependencies and API input validation.',
        answer: false
      },
      {
        statement: 'Serverless integration services allow teams to orchestrate event-driven workflows across SaaS and cloud services using visual connectors with minimal custom code.',
        answer: true
      }
    ],
    awsBridgeHint: 'Scale-to-zero introduces cold starts, low-code orchestrators (like Step Functions / EventBridge) are serverless too, and OWASP application security always stays yours!',
    explanation: 'Scale-to-zero Consumption serverless plans can incur brief cold-start latency when spinning up an idle worker, and serverless encompasses both Functions-as-a-Service and visual workflow orchestrators (like Azure Logic Apps). Customers remain fully responsible for securing their own code, dependencies, and input validation.',
    awsComparison: 'Mirrors AWS Lambda cold starts, AWS Step Functions workflow orchestration, and customer ownership of Lambda code/dependency security.'
  },
  {
    id: 'az900-a1-076',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Migration Service Refactoring',
    difficulty: 2,
    format: 'single',
    prompt: 'An organization migrates an on-premises Microsoft SQL Server database to a fully managed PaaS SQL database in Azure instead of lifting-and-shifting onto an IaaS virtual machine. Which administrative task is NO LONGER required from the customer’s DBA team?',
    options: [
      'Designing optimal table indexes for slow-running application queries',
      'Patching the underlying Windows Server operating system and SQL database engine builds',
      'Granting and revoking database user read/write permissions',
      'Auditing sensitive customer columns for privacy compliance'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Moving from self-managed DB-on-VM to managed DB-as-a-Service offloads OS and DB engine patching, while query tuning and data access stay yours.',
    explanation: 'In a PaaS database service, Microsoft automatically maintains and patches the host OS and database engine software, plus provides built-in high availability. Query/index tuning, user permissions, and data privacy compliance remain customer data/application responsibilities.',
    awsComparison: 'Identical shift when migrating SQL Server on EC2 to Amazon RDS for SQL Server.'
  },
  {
    id: 'az900-a1-077',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Deployment Model Comparison',
    difficulty: 1,
    format: 'single',
    prompt: 'A newly founded three-person mobile gaming studio has no IT hardware, no server room, and limited seed funding, and wants to launch globally next week. Which cloud deployment model is the BEST fit?',
    options: [
      'Private cloud',
      'Hybrid cloud',
      'Public cloud',
      'On-premises bare-metal cluster'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Zero existing hardware, minimal capital, and rapid global launch point straight to 100% vendor-hosted multi-tenant cloud.',
    explanation: 'Public cloud requires zero upfront CapEx, zero physical server room facilities, and allows a small startup team to launch globally in minutes on a pay-as-you-go OpEx basis.',
    awsComparison: 'Textbook greenfield startup public cloud use case.'
  },
  {
    id: 'az900-a1-078',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Reliability & Self-Healing',
    difficulty: 2,
    format: 'single',
    prompt: 'A cloud load balancer runs automated health probes every five seconds against four backend web instances. When one instance crashes due to an unhandled memory leak, the load balancer immediately stops sending traffic to it while an autoscaler replaces the unhealthy node. Which cloud benefit does this illustrate?',
    options: [
      'Capital expenditure depreciation',
      'Data sovereignty',
      'Vertical scaling up',
      'Reliability and self-healing fault tolerance'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Automated health checks routing around failed nodes and replacing them without waking an engineer at 3 AM.',
    explanation: 'Automated health probing, traffic rerouting, and instance replacement exemplify cloud reliability and self-healing fault tolerance—keeping the service healthy for users despite localized component crashes.',
    awsComparison: 'Equivalent to ALB Target Group health checks paired with EC2 Auto Scaling health-check replacement.'
  },
  {
    id: 'az900-a1-079',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Benefits Comprehensive Review',
    difficulty: 2,
    format: 'multi',
    prompt: 'Microsoft groups core cloud benefits into paired architectural and business themes (High Availability, Scalability, Reliability, Predictability, Governance, Security, and Manageability). Which TWO statements accurately match a scenario to its Microsoft cloud benefit? (Select 2)',
    options: [
      'Using historical usage telemetry and pricing calculators to forecast next quarter’s cloud invoice accurately demonstrates Cost Predictability',
      'Deploying application nodes in Tokyo, London, and Virginia to reduce player ping times demonstrates Vertical Scaling',
      'Enforcing corporate standards automatically across subscriptions via declarative policy templates demonstrates Cloud Governance',
      'Replacing a 4-vCPU virtual machine with a 16-vCPU virtual machine demonstrates Geo-distribution'
    ],
    selectCount: 2,
    correctIndices: [0, 2],
    awsBridgeHint: 'Match financial forecasting to Cost Predictability and policy guardrails to Governance; watch the swapped definitions in the other two choices!',
    explanation: 'Forecasting cloud spend with telemetry and calculators is Cost Predictability, and enforcing organizational standards via automated policy templates is Cloud Governance. Deploying across global cities is Geo-distribution (not vertical scaling), and upgrading from 4 to 16 vCPUs is Vertical Scaling (not geo-distribution).',
    awsComparison: 'Great sanity check on Microsoft’s Cloud Adoption Framework terminology tested in AZ-900 Domain 1.'
  },
  {
    id: 'az900-a1-080',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    subtopic: 'Cloud Pricing Commitment & Elasticity Synthesis',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'Evaluate each statement comparing Azure compute purchasing options across on-demand, savings plans, reservations, and Spot capacity.',
    statements: [
      {
        statement: 'Pay-as-you-go compute requires zero multi-year financial commitment and bills only while virtual machines remain allocated.',
        answer: true
      },
      {
        statement: 'A 3-year Azure Reserved Virtual Machine Instance allows Microsoft to evict your running production workload with 30 seconds of notice whenever regional capacity tightens.',
        answer: false
      },
      {
        statement: 'An Azure Savings Plan for Compute applies discounted rates automatically across participating compute families and regions up to your committed hourly spend.',
        answer: true
      }
    ],
    awsBridgeHint: 'Eviction risk belongs strictly to Spot VMs—never to 1-year or 3-year Reserved Instances or Compute Savings Plans!',
    explanation: 'Pay-as-you-go carries zero term commitment and halts compute billing once VMs are Stopped (deallocated). Only Azure Spot VMs carry eviction risk; 1-year and 3-year Azure Reservations guarantee steady-state pricing without eviction, while Compute Savings Plans provide cross-family and cross-region flexibility.',
    awsComparison: 'Matches the exact AWS division between On-Demand, Compute Savings Plans, Standard Reserved Instances, and interruptible EC2 Spot Instances.'
  }
];
