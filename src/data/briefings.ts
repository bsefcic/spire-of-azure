import type { ActIntelBriefing } from '../types/curriculum';

export const ACT_INTEL_BRIEFINGS: ActIntelBriefing[] = [
  {
    id: 'briefing-az900-act1',
    track: 'az-900',
    act: 1,
    domain: 'az900-concepts',
    title: 'Act I: Cloud Concepts & Shared Responsibility',
    subtitle: 'Microsoft’s exact vocabulary for CapEx/OpEx, IaaS/PaaS/SaaS boundaries, and cloud deployment models.',
    examWeight: '25–30%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Shared Responsibility Matrix',
        azureConcept: 'IaaS vs. PaaS vs. SaaS Ownership Split',
        awsEquivalent: 'AWS Shared Responsibility Model ("Of" vs. "In" the Cloud)',
        keyFacts: [
          'Customer ALWAYS owns 3 things regardless of model: Data & Information, Devices (Mobile/PCs), and Accounts & Identities.',
          'Shared responsibility (50/50 split) occurs on PaaS for Identity/Directory Infrastructure, Applications, and Network Controls.',
          'Microsoft ALWAYS owns Physical Datacenter, Physical Network, and Physical Hosts.'
        ],
        examTrap: 'Never pick Microsoft as responsible for user data classification, endpoint compliance, or Entra account lifecycle—even in 100% SaaS (Microsoft 365)!'
      },
      {
        title: 'CapEx vs. OpEx & Consumption Model',
        azureConcept: 'Consumption-Based Operational Expenditure (OpEx)',
        awsEquivalent: 'Pay-As-You-Go Variable Expense vs. Datacenter CapEx',
        keyFacts: [
          'CapEx = upfront capital purchase of physical servers/storage depreciated over years.',
          'OpEx = pay-as-you-go monthly operational billing with zero upfront infrastructure investment.',
          'Consumption model means billing tracks actual metered compute seconds, GB stored, and egress GiB.'
        ],
        examTrap: 'Purchasing a physical server rack for a Private Cloud is CapEx; paying upfront for a 1-year/3-year Azure Reservation is still classified under cloud OpEx optimization (predictable cloud spend), not physical CapEx depreciation.'
      },
      {
        title: 'High Availability vs. Scalability vs. Elasticity',
        azureConcept: 'Reliability & Dynamic Capacity Terminology',
        awsEquivalent: 'Multi-AZ HA vs. Auto Scaling Out/Up',
        keyFacts: [
          'Vertical Scaling (Scale Up/Down) = changing VM SKU vCPU/RAM (often requires brief reboot).',
          'Horizontal Scaling (Scale Out/In) = adding or removing VM/container instances.',
          'Elasticity = *automatic* rapid scale-out and scale-in driven by real-time demand spikes.',
          'Agility = speed of provisioning & deploying new features (minutes instead of months of hardware procurement).'
        ],
        examTrap: 'Microsoft strictly distinguishes Scalability (manual or planned ability to grow capacity) from Elasticity (*automatic* dynamic expansion and contraction).'
      },
      {
        title: 'Fault Tolerance vs. Disaster Recovery',
        azureConcept: 'Zero-Downtime Redundancy vs. Regional Catastrophe Recovery',
        awsEquivalent: 'Multi-AZ Active-Active vs. Cross-Region Pilot Light / Warm Standby',
        keyFacts: [
          'High Availability / Fault Tolerance keeps apps online seamlessly during single component/rack/zone failures.',
          'Disaster Recovery (DR) restores operations (governed by RPO & RTO) after a major regional catastrophe.',
          'Azure Site Recovery & geo-redundant backups anchor DR strategies across paired regions.'
        ],
        examTrap: 'Backups alone are NOT High Availability—if you have to restore from a vault with 30 minutes of downtime, that is Disaster Recovery, not HA!'
      },
      {
        title: 'Public, Private, Hybrid & Multicloud',
        azureConcept: 'Cloud Deployment Models + Azure Arc / Azure Local',
        awsEquivalent: 'AWS Public Cloud, VMware on-prem, AWS Outposts, Multi-Cloud',
        keyFacts: [
          'Public Cloud: no CapEx, shared multi-tenant Microsoft hardware, provisioned self-service over the internet.',
          'Private Cloud: dedicated single-tenant hardware (on-prem datacenter) for full physical/regulatory control, high CapEx.',
          'Hybrid Cloud: bridges Public + Private (via ExpressRoute/VPN + Azure Arc / Azure Local) for legacy or burst workloads.'
        ],
        examTrap: 'Deploying VMs inside a private Azure VNet with no public IPs is STILL **Public Cloud** (multi-tenant Azure hardware), NOT Private Cloud!'
      },
      {
        title: 'Serverless Computing',
        azureConcept: 'Azure Functions, Azure Logic Apps & Event Grid',
        awsEquivalent: 'AWS Lambda, AWS Step Functions & Amazon EventBridge',
        keyFacts: [
          'Azure Functions = code-first event-driven serverless execution (C#, Python, Node, PowerShell).',
          'Azure Logic Apps = low-code/no-code visual workflow orchestration with 1,000+ enterprise SaaS connectors.',
          'Consumption plan scales down to zero instances and bills only per execution time/count.'
        ],
        examTrap: 'PaaS (App Service) abstracts the OS, but you still pay for an underlying App Service Plan tier 24/7; true Serverless Consumption bills $0 when zero events fire.'
      }
    ]
  },
  {
    id: 'briefing-az900-act2',
    track: 'az-900',
    act: 2,
    domain: 'az900-architecture',
    title: 'Act II: Core Azure Architecture & Services',
    subtitle: 'Regions, Availability Zones, Entra ID, Compute, Storage, and Networking mapped from AWS.',
    examWeight: '35–40%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Regions, Availability Zones & Region Pairs',
        azureConcept: 'Physical Infrastructure Hierarchy',
        awsEquivalent: 'AWS Regions & AZs (plus unique Azure Region Pairs!)',
        keyFacts: [
          'Availability Zones = 3+ physically separate datacenters in ONE region with independent power, cooling, and networking (99.99% VM SLA).',
          'Region Pairs = two regions in the same geography ≥300 miles apart (e.g., East US ↔ West US) with sequential platform updates and automatic GRS replication.',
          'Sovereign Clouds: Azure Government (screened US persons) & Azure China (operated by 21Vianet).'
        ],
        examTrap: 'Not every Azure region has Availability Zones, and GRS storage replicates to a *fixed* Microsoft-defined Paired Region (you don’t pick an arbitrary target region like S3 CRR).'
      },
      {
        title: 'Compute & Containers Fleet',
        azureConcept: 'VMs, VMSS, Availability Sets, ACI, Container Apps, AKS, AVD',
        awsEquivalent: 'EC2, Auto Scaling, Placement Groups, Fargate, App Runner, EKS, WorkSpaces',
        keyFacts: [
          'Availability Set = rack isolation inside ONE datacenter: up to 3 Fault Domains (power/switch) & 20 Update Domains (reboot waves) -> 99.95% SLA.',
          'ACI (Container Instances) = fastest single-pod container with zero orchestration; Container Apps = serverless microservice KEDA scaling; AKS = full Kubernetes.',
          'Azure Virtual Desktop (AVD) = unique multi-session Windows 10/11 Enterprise cloud VDI.'
        ],
        examTrap: 'You can ONLY place a VM into an Availability Set or Availability Zone *at creation time*—changing it later requires recreating the VM from its disk!'
      },
      {
        title: 'VNet, Subnets, Peering, ExpressRoute & DNS',
        azureConcept: 'Core Virtual Networking & Connectivity',
        awsEquivalent: 'VPC, VPC Peering, Site-to-Site VPN, Direct Connect, Route 53',
        keyFacts: [
          'VNet spans an entire Azure Region; Subnets in Azure ALSO span all Availability Zones in the region by default (unlike single-AZ AWS subnets!).',
          'VNet Peering is non-transitive (`A↔B` and `B↔C` does NOT let `A` talk to `C` without Gateway Transit / NVA).',
          'ExpressRoute = dedicated private fiber via connectivity partner (does NOT traverse the public internet; NOT encrypted by default unless MACsec/IPsec added).'
        ],
        examTrap: 'In AWS, 1 Subnet = 1 AZ; in Azure, standard Subnets are **regional** (zonal spans)! Also remember VNet Peering is strictly non-transitive.'
      },
      {
        title: 'Storage Services, Redundancy & Access Tiers',
        azureConcept: 'Azure Storage Account (Blobs, Files, Queues, Tables)',
        awsEquivalent: 'S3 + EFS/FSx + SQS + Simple Key-Value Store inside one namespace',
        keyFacts: [
          '4 Services in 1 Storage Account: Blobs (S3 objects), Azure Files (SMB/NFS network shares), Queues (64 KB messages), Tables (NoSQL KV).',
          'Redundancy: LRS (11 nines, 1 DC), ZRS (12 nines, 3 AZs), GRS (16 nines, paired region), GZRS (16 nines, 3 AZs + paired region); `RA-` prefix unlocks secondary read endpoint.',
          'Blob Tiers: Hot (0d min), Cool (30d min), Cold (90d min), Archive (180d min, offline—must rehydrate to Hot/Cool before reading!).'
        ],
        examTrap: 'Plain `GRS` / `GZRS` secondary regions CANNOT be read until failover occurs! You MUST pick `RA-GRS` or `RA-GZRS` for read access to the secondary endpoint.'
      },
      {
        title: 'Microsoft Entra ID & Zero Trust',
        azureConcept: 'Identity, Conditional Access, SSO, MFA & PIM',
        awsEquivalent: 'IAM Identity Center + Cognito + IAM (for tenant/SaaS level)',
        keyFacts: [
          'Microsoft Entra ID (formerly Azure AD) is a cloud multi-tenant identity provider using OAuth2/OIDC/SAML—NOT domain-joined Kerberos/GPO (`Entra Domain Services` handles legacy LDAP/Kerberos).',
          'Conditional Access evaluates `Signals` (User, Location, Device health, Risk) -> `Decision` (Grant/Block) -> `Enforcement` (Require MFA).',
          'Defense-in-Depth 7 Layers (outside-in): Physical -> Identity & Access -> Perimeter -> Network -> Compute -> Application -> Data.'
        ],
        examTrap: 'Know the exact order of the 7 Defense-in-Depth layers, and remember Conditional Access requires **Microsoft Entra ID P1** (while risk-based Identity Protection & PIM require **P2**).'
      },
      {
        title: 'Defender for Cloud & Key Vault',
        azureConcept: 'Cloud Security Posture (CSPM/CWPP) & Secrets HSM',
        awsEquivalent: 'AWS Security Hub + GuardDuty + KMS + Secrets Manager',
        keyFacts: [
          'Azure Key Vault centralizes Secrets (passwords/API strings), Keys (encryption keys), and Certificates (TLS lifecycle) in one vault.',
          'Microsoft Defender for Cloud delivers free Secure Score posture tracking (CSPM) + paid Defender workload threat protection plans (CWPP) across Azure, on-prem, and AWS/GCP.',
          'Microsoft Sentinel = cloud-native SIEM + SOAR built on top of Log Analytics.'
        ],
        examTrap: 'In AWS, KMS and Secrets Manager are separate services; in Azure, **Key Vault** holds Keys, Secrets, AND Certificates all in one resource!'
      }
    ]
  },
  {
    id: 'briefing-az900-act3',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    title: 'Act III: Cost Management, Governance & SLAs',
    subtitle: 'Calculators, Reservations, Policy vs. RBAC, Resource Locks, Monitoring, and Composite SLA math.',
    examWeight: '30–35%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Pricing, TCO & Discount Levers',
        azureConcept: 'Calculators, Reservations, Savings Plans & Hybrid Benefit',
        awsEquivalent: 'Pricing Calculator, Migration Evaluator, RIs, Savings Plans & BYOL',
        keyFacts: [
          'Pricing Calculator = estimate monthly Azure bill for cloud SKUs; TCO Calculator = compare on-prem power/cooling/IT labor vs. Azure migration.',
          'Reservations (1yr/3yr, specific SKU+region, up to 72% off) vs. Compute Savings Plans (1yr/3yr $/hr commitment across regions/compute, up to 65% off).',
          'Azure Hybrid Benefit reuses Windows Server & SQL Server licenses with Software Assurance (stacks with Reservations for >80% off!).'
        ],
        examTrap: 'Data Ingress is always FREE; Data Egress is billed by Billing Zone. Also, shutting down a VM inside its OS leaves it `Stopped` (still billed!)—you must `Deallocate` via Azure!'
      },
      {
        title: 'Scopes, RBAC, Policy, Locks & Tags',
        azureConcept: 'Management Group -> Subscription -> Resource Group -> Resource',
        awsEquivalent: 'Organizations OUs -> Member Accounts -> Stacks -> Resources',
        keyFacts: [
          'Azure RBAC controls *who can perform actions*; Azure Policy controls *what resource properties are compliant* (even Subscription Owners are blocked by a `Deny` policy!).',
          'Policy Initiative = a bundle of Policy Definitions (like an AWS Config Conformance Pack).',
          'Tags (up to 50 KV pairs) do NOT inherit down from Subscriptions or Resource Groups unless copied by an Azure Policy `Modify` rule!'
        ],
        examTrap: 'RBAC, Policy, and Resource Locks ALL inherit down automatically—**Tags NEVER inherit automatically!**'
      },
      {
        title: 'Resource Locks & Purview Governance',
        azureConcept: '`CanNotDelete` vs. `ReadOnly` Locks & Microsoft Purview',
        awsEquivalent: 'SCPs/Deletion Protection & Amazon Macie + DataZone',
        keyFacts: [
          '`CanNotDelete` allows reading and modifying a resource, blocking only deletion.',
          '`ReadOnly` blocks both deleting AND state-mutating (`POST`/`PUT`) operations—only `Owner` or `User Access Administrator` can remove locks (`Contributor` cannot!).',
          'Microsoft Purview handles unified data discovery, PII sensitivity classification, Data Catalog, and data lineage; Service Trust Portal hosts SOC/ISO audit PDFs.'
        ],
        examTrap: 'Putting a `ReadOnly` lock on a VM blocks `Start`/`Stop`/`Restart` (`POST` calls!), and on a Storage Account blocks `listKeys`!'
      },
      {
        title: 'ARM, Bicep, Cloud Shell & Azure Arc',
        azureConcept: 'Control Plane, Declarative IaC & Hybrid Projection',
        awsEquivalent: 'CloudFormation, CloudShell & Systems Manager Hybrid / EKS Connector',
        keyFacts: [
          'Every tool (Portal, CLI, PowerShell, SDK) authenticates through Azure Resource Manager (ARM).',
          'Bicep = clean, stateless declarative DSL that transpiles to ARM JSON with automatic dependency ordering and idempotency.',
          'Cloud Shell = browser Bash/PowerShell backed by an Azure Files share (20-min idle timeout); Azure Arc projects on-prem & AWS/GCP servers/K8s into ARM.'
        ],
        examTrap: 'ARM `Complete` deployment mode **deletes** any existing resource in the target Resource Group omitted from your template (`Incremental` is the safe default)!'
      },
      {
        title: 'Monitor, Advisor & The 3-Tier Health Pyramid',
        azureConcept: 'Azure Monitor, Log Analytics (KQL), App Insights & Health Suite',
        awsEquivalent: 'CloudWatch, Logs Insights, X-Ray, CloudTrail & AWS Health',
        keyFacts: [
          'Azure Advisor = 100% FREE recommendations across 5 pillars: Reliability, Security, Performance, Cost, Operational Excellence.',
          'Health Pyramid: **Azure Status** (global public page) -> **Service Health** (personalized to YOUR regions/subs + RCAs) -> **Resource Health** (single VM/DB instance).',
          'Azure Monitor = Metrics (real-time numbers) + Logs (KQL in Log Analytics) + App Insights (APM) + Activity Log (90-day control-plane "who/what/when").'
        ],
        examTrap: 'Unlike AWS Trusted Advisor, all 5 Azure Advisor categories are FREE! And Activity Log only records ARM control-plane events—never guest OS CPU or SQL queries.'
      },
      {
        title: 'Composite SLAs & Preview Lifecycles',
        azureConcept: 'Availability Math & Private Preview -> Public Preview -> GA',
        awsEquivalent: 'Serial vs. Parallel Reliability Math & Beta Exclusions',
        keyFacts: [
          'Serial dependencies MULTIPLY and lower availability: `99.9% × 99.9% = 99.8001%`.',
          'VM SLA Ladder: Single VM w/ Standard HDD (95%) -> Standard SSD (99.5%) -> Premium SSD (99.9%) -> Availability Set (99.95%) -> Availability Zones (99.99%).',
          'SLA breaches award **Service Credits** (% off monthly service bill), never cash wire refunds.'
        ],
        examTrap: 'Free tiers (e.g., App Service F1) and **Private/Public Preview** features have **ZERO SLA (0%)**—never put Preview services in a production SLA path!'
      }
    ]
  },
  {
    id: 'briefing-az104-act1',
    track: 'az-104',
    act: 1,
    domain: 'az104-identity',
    title: 'Act I: Manage Azure Identities & Governance',
    subtitle: 'Entra ID licensing SKUs, B2B guest rules, custom RBAC JSON anatomy, and Policy remediation.',
    examWeight: '20–25%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Microsoft Entra ID Editions & Licensing',
        azureConcept: 'Free vs. Entra ID P1 vs. Entra ID P2 Feature Gates',
        awsEquivalent: 'IAM Identity Center Free vs. Enterprise IdP Tiering',
        keyFacts: [
          'Free: 500k objects, SSO, Security Defaults (basic tenant-wide MFA), B2B guest invites, standard cloud groups.',
          'Entra ID P1: Conditional Access, Dynamic Groups (user/device attribute rules), Self-Service Password Reset (SSPR) for hybrid writeback, Group-based licensing.',
          'Entra ID P2: Identity Protection (Sign-in Risk & User Risk policies), Privileged Identity Management (PIM just-in-time elevation), Access Reviews.'
        ],
        examTrap: 'Dynamic Membership Groups and Conditional Access require **P1**; PIM (time-bound JIT role activation) and Access Reviews require **P2**!'
      },
      {
        title: 'Entra Roles vs. Azure RBAC Roles',
        azureConcept: 'Tenant Identity Plane vs. ARM Resource Plane Separation',
        awsEquivalent: 'IAM Identity Center Admin vs. Member Account IAM Roles',
        keyFacts: [
          'Entra Roles (`Global Administrator`, `User Administrator`, `Application Administrator`) govern tenant objects (users, groups, app registrations) at tenant root.',
          'Azure RBAC Roles (`Owner`, `Contributor`, `Reader`, `User Access Administrator`) govern Azure resources at MG / Subscription / RG / Resource scopes.',
          '`Global Administrator` does NOT have access to Azure Subscriptions by default, unless toggling "Access management for Azure resources" (grants `User Access Administrator` at root).'
        ],
        examTrap: 'If an exam question asks for least-privilege to reset user passwords -> Entra `Password Administrator` / `User Administrator`; to create VMs without granting access -> Azure RBAC `Contributor`!'
      },
      {
        title: 'Custom RBAC Role JSON Anatomy',
        azureConcept: '`Actions`, `NotActions`, `DataActions`, `NotDataActions`, `AssignableScopes`',
        awsEquivalent: 'Customer-Managed IAM Policy JSON + Permission Boundaries',
        keyFacts: [
          'Control-plane permissions = `Actions` minus `NotActions`; Data-plane permissions (e.g., reading blobs/secrets) = `DataActions` minus `NotDataActions`.',
          '`AssignableScopes` defines *where* the custom role appears for assignment (e.g., specific Management Group, Subscriptions, or Resource Groups).',
          'Azure RBAC is additive (union of all assigned roles)—except explicit **Azure Deny Assignments** (created by Blueprints/Managed Apps), which override RBAC allows.'
        ],
        examTrap: '`NotActions` is NOT an explicit deny across all roles! It simply subtracts permissions from *that single role’s* wildcard `Actions`—if another role grants the action, the user CAN do it!'
      },
      {
        title: 'Groups, Administrative Units & B2B Guests',
        azureConcept: 'Security vs. M365 Groups, Dynamic Rules & External Collaboration',
        awsEquivalent: 'IAM Identity Center Groups, ABAC & Cross-Account RAM/Federation',
        keyFacts: [
          'Group types: `Security` (access to resources/apps) vs. `Microsoft 365` (shared mailbox/Teams/SharePoint—CAN also be assigned Azure RBAC roles!).',
          'Membership types: `Assigned` (manual), `Dynamic User`, or `Dynamic Device` (cannot mix Dynamic User + Dynamic Device in one group!).',
          'Administrative Units (AUs) scope Entra admin roles (e.g., lets regional IT reset passwords *only* for France users)!'
        ],
        examTrap: 'You CANNOT convert a Security Group into a Microsoft 365 Group (you must recreate), whereas you CAN change membership between `Assigned` and `Dynamic`!'
      },
      {
        title: 'SSPR, MFA & Conditional Access Precedence',
        azureConcept: 'Authentication Methods, Security Defaults & Zero Trust Signals',
        awsEquivalent: 'Cognito MFA / Okta Adaptive Policies',
        keyFacts: [
          'Security Defaults and Conditional Access are **mutually exclusive**—you must turn OFF Security Defaults before enabling any Conditional Access policy!',
          'SSPR requires choosing 1 or 2 authentication methods to reset; administrators are ALWAYS forced to use a strong 2-method policy.',
          'Conditional Access `Report-only` mode logs policy impact in Sign-in Logs without blocking users.'
        ],
        examTrap: 'If two Conditional Access policies match a sign-in—one `Grant with MFA` and one `Block access`—**`Block` ALWAYS wins**, and all matched `Grant` controls are ANDed unless OR is selected!'
      },
      {
        title: 'Azure Policy Effects & Remediation Tasks',
        azureConcept: '`Audit`, `Deny`, `Append`, `Modify`, `DeployIfNotExists` (DINE)',
        awsEquivalent: 'SCPs + AWS Config Rules with Auto-Remediation SSM Documents',
        keyFacts: [
          'Evaluation order: `Disabled` -> `Append` / `Modify` (mutates request before creation!) -> `Deny` -> `Audit` -> `DeployIfNotExists` / `AuditIfNotExists` (runs AFTER resource creation).',
          '`Modify` and `DeployIfNotExists` require a **Managed Identity** with appropriate RBAC permissions on the Policy Assignment!',
          'Existing non-compliant resources are fixed only after running an explicit **Remediation Task**.'
        ],
        examTrap: 'Need to auto-add or inherit a missing Tag and support remediating existing resources? Pick **`Modify`** (unlike `Append`, `Modify` supports Managed Identity remediation tasks and tag replacement!).'
      }
    ]
  },
  {
    id: 'briefing-az104-act2',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    title: 'Act II: Implement & Manage Storage',
    subtitle: 'Storage Account SKUs, SAS vs. Stored Access Policies, Lifecycle JSON, AzCopy, and Azure Files.',
    examWeight: '15–20%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Storage Account Kinds & Redundancy',
        azureConcept: 'Standard GPv2 vs. Premium (BlockBlob / FileShares / PageBlob)',
        awsEquivalent: 'S3 Standard/Express + FSx SSD + EBS Provisioned Volumes',
        keyFacts: [
          '`Standard general-purpose v2` supports all 4 services (Blobs, Files, Queues, Tables) and LRS, ZRS, GRS, RA-GRS, GZRS, RA-GZRS.',
          '`Premium` storage accounts run on pure NVMe/SSD and ONLY support **LRS** and **ZRS** (never GRS/GZRS!) and must be specialized (`BlockBlobStorage`, `FileStorage`, or `PageBlobStorage`).',
          'Switching LRS <-> GRS is live in-place; switching to/from **ZRS or GZRS** requires a physical live/manual migration request!'
        ],
        examTrap: 'Need SMB multichannel or NFSv4.1 file shares? You MUST create a **`Premium FileStorage`** account (NFS 4.1 is NOT supported on Standard GPv2 file shares—and requires VNet Private Endpoint/Service Endpoint with Secure Transfer disabled for unencrypted NFS!).'
      },
      {
        title: 'Access Keys, SAS & Stored Access Policies',
        azureConcept: 'Account SAS vs. Service SAS vs. User Delegation SAS',
        awsEquivalent: 'Root Bucket Keys vs. S3 Presigned URLs (IAM-signed)',
        keyFacts: [
          '3 SAS types: **User Delegation SAS** (signed with Entra ID credentials—MOST SECURE, Blobs/Data Lake only!), **Service SAS** (1 service, signed w/ Storage Key), **Account SAS** (account-level/multi-service).',
          'How do you revoke an already-issued Service SAS without rotating the entire Storage Account Key? Bind the SAS to a **Stored Access Policy** on the container and edit/delete that policy!',
          'Entra ID RBAC for blobs uses `Storage Blob Data Reader` / `Contributor` / `Owner` (`DataActions`!).'
        ],
        examTrap: 'Assigning standard `Owner` or `Contributor` lets a user see the Storage Account in the Portal (or `listKeys`), NOT authenticate via Entra OAuth to read blobs unless they have **`Storage Blob Data Reader/Contributor`**!'
      },
      {
        title: 'Blob Tiers, Rehydration & Lifecycle Management',
        azureConcept: 'Hot, Cool, Cold, Archive & Automated Rule Transitions',
        awsEquivalent: 'S3 Standard -> Standard-IA -> Glacier Instant -> Glacier Deep Archive',
        keyFacts: [
          'Account-level default tiers: Hot, Cool, or Cold; **Archive** can ONLY be set at the individual blob level (never account default!).',
          'Archive blobs are offline (`409 Conflict` if read directly)—rehydrate by copying to a new Hot/Cool blob OR changing blob tier (`Standard` priority up to 15 hrs; `High` priority < 1 hr for objects < 10 GB).',
          'Lifecycle Management JSON moves blobs `Hot -> Cool -> Cold -> Archive -> Delete` based on `daysAfterModificationGreaterThan` or `daysAfterLastAccessTimeGreaterThan`.'
        ],
        examTrap: '`ZRS`, `GZRS`, and `RA-GZRS` storage accounts do **NOT** support the **Archive** tier! Archive is only supported on LRS, GRS, and RA-GRS.'
      },
      {
        title: 'Object Replication, Soft Delete & Immutability (WORM)',
        azureConcept: 'Data Protection & Compliance Locks on Blob Storage',
        awsEquivalent: 'S3 Cross-Region Replication (CRR), S3 Versioning & S3 Object Lock',
        keyFacts: [
          'Asynchronous **Object Replication** copies blobs between *any* two storage accounts (same or cross-region)—requires **Blob Versioning** enabled on BOTH source and destination, plus **Change Feed** on the source!',
          'Soft Delete exists independently at 3 levels: Blob soft delete, Container soft delete, and Azure Files share soft delete (1–365 days).',
          'Immutable Blob Storage (WORM): **Time-based retention** (cannot shorten once *Locked*, only extend!) and **Legal Hold** (indefinite until all hold tags cleared).'
        ],
        examTrap: 'Exam favorite: if Object Replication fails to enable, check that **Blob Versioning** is ON for *both* accounts AND **Change Feed** is ON for the source account (and neither blob is in Archive)!'
      },
      {
        title: 'Azure Files & Azure File Sync',
        azureConcept: 'Managed SMB/NFS Cloud Shares + Hybrid Windows Server Tiering',
        awsEquivalent: 'Amazon FSx for Windows File Server + AWS Storage Gateway (File)',
        keyFacts: [
          'Direct SMB 3.0 mounting from on-prem requires outbound TCP port **445** open (if ISP blocks TCP 445, use Point-to-Site/Site-to-Site VPN, ExpressRoute, or SMB over QUIC on UDP 443).',
          '**Azure File Sync** installs agents on Windows Server (2012 R2+) to turn them into hot local caches of a central Azure File Share (`Cloud Tiering` stubs cold files locally by free space % or age days).',
          'Identity-based SMB auth supports On-Premises AD DS, Microsoft Entra Domain Services, or Microsoft Entra Kerberos (hybrid/cloud).'
        ],
        examTrap: 'Within one Azure File Sync **Sync Group**, there is ALWAYS **1 Cloud Endpoint** (the Azure File Share) and **1 or more Server Endpoints** (Windows Server folders)—never two Cloud Endpoints in the same Sync Group!'
      },
      {
        title: 'AzCopy, Storage Explorer & Import/Export / Data Box',
        azureConcept: 'Data Movement CLI & Offline Petabyte Appliances',
        awsEquivalent: '`aws s3 sync` CLI & AWS Snowcone / Snowball Edge',
        keyFacts: [
          '`azcopy copy` copies all files; `azcopy sync` performs one-way incremental synchronization (deletes destination extras ONLY if `--delete-destination=true`!).',
          '`azcopy login` uses Entra ID OAuth (supports **Blobs and Azure Files**; older versions only did Blobs—SAS tokens work for both Blobs and Files!).',
          'Offline migration: **Azure Import/Export** (ship YOUR own BitLocker drives; Import supports Blobs + Files, **Export supports Blobs ONLY!**) vs. **Azure Data Box** (Microsoft ships ruggedized 80 TB / 1 PB hardware).'
        ],
        examTrap: '**Azure Import/Export** CANNOT export **Azure Files**—it can import into Blobs or Files, but Export works *exclusively* for **Azure Blob Storage**!'
      }
    ]
  },
  {
    id: 'briefing-az104-act3',
    track: 'az-104',
    act: 3,
    domain: 'az104-compute',
    title: 'Act III: Deploy & Manage Azure Compute Resources',
    subtitle: 'VM disks, Availability Sets/VMSS, CSE/Cloud-init, App Service slots, and Container Apps/AKS.',
    examWeight: '20–25%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'VM Sizing, Managed Disks & Encryption',
        azureConcept: 'Standard HDD/SSD, Premium SSD, Ultra Disk, ADE vs. Encryption at Host',
        awsEquivalent: 'EBS sc1/gp3/io2 & EBS KMS Encryption vs. Guest OS BitLocker/LUKS',
        keyFacts: [
          'Disk tiers: Standard HDD -> Standard SSD -> Premium SSD -> Premium SSD v2 / Ultra Disk (dynamic IOPS/MBps tuning without resizing GB!).',
          'Online disk expansion works without deleting data, EXCEPT expanding an **OS disk** or shrinking ANY managed disk (shrinking is NEVER supported; OS/data resize in some configs requires VM **deallocation**!).',
          '`Azure Disk Encryption (ADE)` uses BitLocker/DM-Crypt inside OS + Key Vault; `Encryption at Host` encrypts temp disks + OS/data caches directly on the hypervisor (works with Ultra Disks/ephemeral OS!).'
        ],
        examTrap: 'You can **NEVER shrink** an Azure Managed Disk—you can only increase its size (after deallocating the VM if attached OS disk/non-live SKU)!'
      },
      {
        title: 'Availability Sets, Proximity Placement & VMSS',
        azureConcept: 'Fault/Update Domains, Flexible vs. Uniform Scale Sets',
        awsEquivalent: 'Spread/Cluster Placement Groups & EC2 Auto Scaling Groups',
        keyFacts: [
          'Proximity Placement Group (PPG) co-locates VMs physically close inside one datacenter for ultra-low sub-millisecond network latency.',
          'VM Scale Sets (VMSS) have two orchestration modes: **Uniform** (identical VM templates, non-standard VM ops) vs. **Flexible** (recommended! Mix VM SKUs, Spot + PayGo, standard VM APIs, up to 1,000 VMs, Fault Domain count = 1 for zonal or 2–3 regional).',
          'Autoscale cooldown prevents flapping; scale-in MUST have matching scale-out AND scale-in rules (otherwise capacity ratchets up and never shrinks!).'
        ],
        examTrap: 'Always inspect Autoscale schedules on the exam: if a VMSS scales out at `CPU > 75%` and has **no scale-in rule** (`CPU < 25%`), instances added during peak hours stay running forever!'
      },
      {
        title: 'VM Extensions, Custom Script & Bastion',
        azureConcept: 'Post-Deployment Automation & Zero-Public-IP Remote Access',
        awsEquivalent: 'EC2 UserData + SSM Run Command + EC2 Instance Connect Endpoint',
        keyFacts: [
          '`cloud-init` bootstraps Linux VMs on first boot only; **Custom Script Extension (CSE)** downloads scripts from GitHub/Azure Storage and executes them inside Windows/Linux (requires outbound HTTPS or storage access!).',
          '**Desired State Configuration (DSC)** / Azure Automanage Machine Configuration enforces ongoing OS drift compliance.',
          '**Azure Bastion** deploys into a dedicated subnet literally named **`AzureBastionSubnet`** (minimum `/26` CIDR!) for browser-based RDP/SSH over TLS 443 with zero Public IPs on VMs.'
        ],
        examTrap: 'The Bastion subnet MUST be named **`AzureBastionSubnet`** (exact spelling) with at least a **`/26`** prefix, and NSGs on target VMs only need inbound `3389`/`22` from `AzureBastionSubnet`!'
      },
      {
        title: 'ARM Templates & Bicep Parameterization',
        azureConcept: 'Parameters, Variables, `dependsOn`, Loops & `what-if`',
        awsEquivalent: 'CloudFormation Parameters, Mappings, `!Ref` & Change Sets',
        keyFacts: [
          '5 core ARM JSON sections: `$schema`, `contentVersion`, `parameters`, `variables`, `resources`, `outputs` (only `$schema`, `contentVersion`, and `resources` are strictly required!).',
          'Never hardcode secrets in parameter files—reference an **Azure Key Vault secret** dynamically inside the `.parameters.json` or Bicep module!',
          'Bicep `symbolicName.id` automatically generates ARM `dependsOn` arrays; `@secure()` decorator masks sensitive parameters from deployment logs.'
        ],
        examTrap: 'Storing VM admin passwords in plain text inside `azuredeploy.parameters.json` fails security questions—pass a `keyVault` reference (`Microsoft.KeyVault/vaults` with `"enabledForTemplateDeployment": true`)!'
      },
      {
        title: 'Azure App Service Plans & Deployment Slots',
        azureConcept: 'Managed Web PaaS, Scaling, VNet Integration & Zero-Downtime Swaps',
        awsEquivalent: 'Elastic Beanstalk / App Runner + Blue/Green Stage Swapping',
        keyFacts: [
          '**App Service Plan** defines region, OS (Linux/Windows), instance count, and SKU (`Free/Shared` -> `Basic` -> `Standard` -> `Premium v3` -> `Isolated v2` ASE)—multiple Web Apps/Function Apps in the same plan share its CPU/RAM!',
          '**Deployment Slots** (staging -> prod warm swap) start at the **`Standard`** tier (5 slots on Standard, 20 on Premium; 0 on Free/Shared/Basic!).',
          'Outbound VNet access from Web App -> private SQL uses **Regional VNet Integration**; inbound private-only access TO the Web App uses a **Private Endpoint**.'
        ],
        examTrap: 'During a Deployment Slot swap, App Settings & Connection Strings **swap with the code** UNLESS checked as **"Deployment slot setting"** (sticky to the slot—e.g., prod DB connection string stays pinned to Prod!).'
      },
      {
        title: 'Containers: ACR, ACI, Container Apps & AKS',
        azureConcept: 'Container Registry, Serverless Pods, KEDA Microservices & Kubernetes',
        awsEquivalent: 'ECR, ECS Fargate Standalone Tasks, App Runner & Amazon EKS',
        keyFacts: [
          '**ACR** SKUs: `Basic`, `Standard`, `Premium` (**Geo-replication**, Private Link, and Content Trust require **`Premium`**!); `az acr build` builds Docker images in the cloud without local Docker!',
          '**ACI** restart policies: `Always` (default for web), `OnFailure`, `Never` (batch jobs); persistent volume mounts use **Azure Files** (Linux containers ONLY—Windows ACI containers cannot mount Azure Files!).',
          '**AKS** separates System Node Pools (Linux only, runs `CoreDNS`/`konnectivity`—minimum 1 node!) from User Node Pools (Linux or Windows); Azure CNI gives every Pod a real VNet IP vs. Kubenet/Overlay NAT.'
        ],
        examTrap: 'Two huge AZ-104 container traps: (1) Only **Linux** ACI containers can mount Azure File shares; (2) AKS **System** node pools MUST run **Linux** (Windows Server nodes can only run as User node pools alongside a Linux System pool)!'
      }
    ]
  },
  {
    id: 'briefing-az104-act4',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    title: 'Act IV: Configure & Manage Virtual Networking',
    subtitle: 'Subnet math, NSGs/ASGs, UDRs, Peering Transit, Private Link, DNS, and Load Balancers.',
    examWeight: '15–20%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'VNet IP Addressing, Reserved IPs & Subnet Sizing',
        azureConcept: '5 Azure-Reserved IPs per Subnet & Dedicated Gateway Subnets',
        awsEquivalent: 'AWS VPC Subnet CIDR Math (5 Reserved IPs—identical count!)',
        keyFacts: [
          'Azure reserves **5 IP addresses** in EVERY subnet: `.0` (network), `.1` (default gateway), `.2` & `.3` (Azure DNS mapping), and `.255`/last (broadcast). So a `/24` yields `256 - 5 = 251` usable IPs; smallest `/29` yields `8 - 5 = 3` usable IPs!',
          'Special dedicated subnet exact names & min sizes: `GatewaySubnet` (`/27` recommended), `AzureBastionSubnet` (`/26` min), `AzureFirewallSubnet` (`/26` min), `RouteServerSubnet` (`/27`).',
          'You CANNOT attach NSGs or UDRs `0.0.0.0/0 -> VirtualAppliance` breaking control plane on `AzureFirewallSubnet`, and never deploy regular VMs inside special gateway subnets!'
        ],
        examTrap: 'Count `- 5` reserved IPs on every subnet calculation question (`/28` = `16 - 5 = 11` usable IPs; if you need 12 VMs, `/28` is too small—pick `/27`!).'
      },
      {
        title: 'NSGs, ASGs & Effective Security Rules',
        azureConcept: 'Stateful 5-Tuple Filtering at Subnet + NIC Boundaries',
        awsEquivalent: 'Security Groups + NACLs combined into Stateful Priority Rules (100–4096)',
        keyFacts: [
          'NSGs are **stateful** (return traffic automatically allowed!) and evaluate rules by **lowest priority number first** (`100` beats `200`; custom range `100–4096`).',
          'When an NSG is on BOTH the **Subnet** AND the **VM NIC**: Inbound evaluates `Subnet NSG -> NIC NSG`; Outbound evaluates `NIC NSG -> Subnet NSG`. **BOTH must allow** the packet!',
          '**Application Security Groups (ASGs)** let you group VM NICs by logical tier (`asg-web`, `asg-sql`) inside NSG rules instead of hardcoding IP lists (all NICs in an ASG must reside in the **same VNet**!).'
        ],
        examTrap: 'Default rule `65000 AllowVnetInBound` permits ALL VMs in a VNet (AND peered VNets!) to talk to each other unless you add a higher-priority `Deny` rule above `65000`!'
      },
      {
        title: 'VNet Peering, Gateway Transit & User-Defined Routes (UDRs)',
        azureConcept: 'Hub-and-Spoke Routing, Next-Hop Types & BGP Override',
        awsEquivalent: 'VPC Peering + Transit Gateway + VPC Route Tables',
        keyFacts: [
          'VNet Peering fails if CIDRs overlap! For Hub-and-Spoke VPN sharing: enable **"Allow gateway transit"** on the **Hub** AND **"Use remote gateways"** on the **Spoke** (Spoke cannot already have its own VPN Gateway!).',
          'UDR Next-Hop types: `Virtual network gateway`, `Virtual network`, `Internet`, `Virtual appliance` (NVA/Firewall—**MUST enable IP Forwarding** on the NVA’s Azure NIC *and* inside its OS!), `None` (blackhole drop).',
          'Route selection precedence: **Longest Prefix Match (LPM)** ALWAYS wins first (`/25` beats `/16`); if prefixes are identical length: `UDR` beats `BGP` beats `System`!'
        ],
        examTrap: 'Spoke-to-Spoke traffic through a Hub NVA requires THREE things: (1) `"Allow forwarded traffic"` checked on peering, (2) UDRs on both spokes pointing to the NVA private IP, and (3) **IP Forwarding enabled** on the NVA NIC!'
      },
      {
        title: 'Service Endpoints vs. Private Endpoints (Private Link)',
        azureConcept: 'Locking Down PaaS Storage, SQL & Key Vault to Private Networks',
        awsEquivalent: 'VPC Gateway Endpoints (S3/Dynamo) vs. AWS PrivateLink Interface Endpoints',
        keyFacts: [
          '**Service Endpoints** (free): extend VNet identity to PaaS firewall—traffic stays on Azure backbone, destination is STILL the **public IP** of Storage/SQL, and **on-premises VPN/ExpressRoute CANNOT reach it directly**!',
          '**Private Endpoints** (Private Link, billed/hr + per GB): injects a NIC with a **private VNet IP** (e.g., `10.1.2.4`) directly into your subnet—accessible across Peering, VPN, and ExpressRoute, and prevents data exfiltration to unauthorized accounts!',
          'Private Endpoints require a **Private DNS Zone** (e.g., `privatelink.blob.core.windows.net`) linked to your VNet so FQDNs resolve to the private IP.'
        ],
        examTrap: 'If an exam scenario says *"on-premises servers over VPN/ExpressRoute must access Azure Storage/SQL privately using a private IP"*, the answer is ALWAYS **Private Endpoint** (+ Private DNS Zone), NEVER Service Endpoint!'
      },
      {
        title: 'Azure DNS & Private DNS Zones',
        azureConcept: 'Public Authoritative Hosting & Split-Horizon Internal Resolution',
        awsEquivalent: 'Amazon Route 53 Public Hosted Zones & Private Hosted Zones',
        keyFacts: [
          '**Azure Public DNS** hosts DNS records for domains you already own—you **CANNOT buy/register** domain names inside Azure DNS (delegate NS records at your registrar)!',
          '**Azure Private DNS Zones** connect to up to 1,000 VNets via **Virtual Network Links**: `Resolution link` (VMs resolve records) vs. `Auto-registration enabled` (VM hostnames auto-create `A` records—only 1 auto-registered zone per VNet!).',
          '`Alias` record sets allow apex zone (`contoso.com`) records to point dynamically to Public IPs, Traffic Manager, or Front Door.'
        ],
        examTrap: 'Two instant traps: (1) Azure DNS is **NOT a domain registrar**; (2) A single VNet can link to many Private DNS Zones for resolution, but can enable **Auto-registration** on **ONLY ONE** Private DNS Zone!'
      },
      {
        title: 'Load Balancing Matrix & VPN Gateways',
        azureConcept: 'Load Balancer (L4) vs. App Gateway (L7) vs. Front Door vs. Traffic Manager',
        awsEquivalent: 'NLB vs. ALB+WAF vs. CloudFront+Global Accelerator vs. Route 53 Routing',
        keyFacts: [
          '**Azure Load Balancer** = Regional **Layer 4** (TCP/UDP); `Basic` SKU is retiring/open-by-default/single-AS, **`Standard` SKU** is secure-by-default (requires NSG Allow!), supports Availability Zones, HA Ports (for NVAs), and Outbound Rules/NAT Gateway.',
          '**Application Gateway** = Regional **Layer 7** (HTTP/HTTPS, TLS termination, URL path `/images` vs `/video` routing, cookie affinity, OWASP **WAF**—needs its own dedicated subnet!).',
          'Global: **Azure Front Door** = Global Layer 7 HTTPS/CDN/WAF instant failover; **Traffic Manager** = Global **DNS** load balancer (`Priority`, `Weighted`, `Performance`, `Geographic`—no TLS/WAF payload inspection!).'
        ],
        examTrap: 'Upgrading/deploying a **Standard Load Balancer** with a **Standard Public IP** blocks all inbound traffic until you attach an **NSG** explicitly allowing the port—and you CANNOT mix Basic and Standard Public IPs/LBs!'
      }
    ]
  },
  {
    id: 'briefing-az104-act5',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    title: 'Act V: Monitor & Back Up Azure Resources',
    subtitle: 'AMA & Data Collection Rules, Alert types, Network Watcher, Recovery Services Vaults, and ASR.',
    examWeight: '10–15%',
    readTimeSeconds: 60,
    cards: [
      {
        title: 'Azure Monitor Agent (AMA) & Data Collection Rules (DCRs)',
        azureConcept: 'Modern Guest OS Telemetry Collection & Log Analytics Routing',
        awsEquivalent: 'Unified CloudWatch Agent + Parameter Store Configs',
        keyFacts: [
          'Host hypervisor CPU/Network/Disk metrics emit automatically; **Guest OS memory (% Available Bytes)**, Windows Event Logs, and Linux Syslog require installing the **Azure Monitor Agent (AMA)**!',
          '**Data Collection Rules (DCRs)** centrally define *what* performance counters/logs AMA collects, transform/filter rows inline, and route data to **multiple** Log Analytics workspaces across regions.',
          'Legacy Log Analytics (MMA/OMS) and Diagnostics Extension (LAD) are retired in favor of **AMA + DCR** (using System/User-Assigned Managed Identity!).'
        ],
        examTrap: 'Need an alert on **VM Available Memory** or inside-OS `/var/log/syslog`? Host metrics CANNOT see RAM inside a VM—you MUST deploy **Azure Monitor Agent (AMA) + a Data Collection Rule (DCR)**!'
      },
      {
        title: 'Diagnostic Settings vs. Activity Log vs. Change Analysis',
        azureConcept: 'Platform Control-Plane Logs & PaaS Resource Logs',
        awsEquivalent: 'CloudTrail Trails + Service Access Logs + AWS Config Timeline',
        keyFacts: [
          '**Diagnostic Settings** must be enabled manually per resource (Storage, Key Vault, NSG, SQL, Subscription Activity Log) to send logs to Log Analytics, Storage Account, or Event Hubs (up to **5** diagnostic settings per resource!).',
          '**Log Analytics Workspace** must exist BEFORE creating the Diagnostic Setting, though unlike storage, a workspace CAN receive logs from resources in **any** Azure region!',
          '**Change Analysis** queries Azure Resource Graph to show exact before/after JSON property diffs ("who changed App Setting X 14 minutes ago?").'
        ],
        examTrap: 'A Storage Account target for Diagnostic Settings MUST reside in the **exact same Azure region** as the monitored resource—whereas a **Log Analytics Workspace** can be in **any region**!'
      },
      {
        title: 'Alert Rules, Dynamic Thresholds & Alert Processing Rules',
        azureConcept: 'Metric vs. Log vs. Activity Alerts, Action Groups & Maintenance Suppression',
        awsEquivalent: 'CloudWatch Alarms (Anomaly Detection) + SNS + EventBridge Mute Windows',
        keyFacts: [
          'Alert signal speed & cost: **Metric Alerts** (fastest, near real-time 1-min, stateful auto-resolve, supports ML `Dynamic Thresholds`) vs. **Log Search Alerts** (KQL query every 5–15 min, slightly higher latency/cost) vs. **Activity Log Alerts** (free, triggers on ARM events like VM delete).',
          '**Action Groups** define *who/what* gets called; **Alert Processing Rules** (formerly Action Rules) apply at scale across scopes to **suppress notifications during planned maintenance windows** or dynamically add an Action Group!',
          'Stateful alerts fire **once** when broken and once when resolved (`Auto-mitigate`); stateless alerts fire every evaluation interval.'
        ],
        examTrap: 'When asked *"How do you mute all SMS/email alert notifications from `rg-prod` every Sunday from 02:00–04:00 without disabling the underlying alert rules?"*, ALWAYS pick an **Alert Processing Rule**!'
      },
      {
        title: 'Network Watcher Diagnostics Toolkit',
        azureConcept: 'IP Flow Verify, Next Hop, Connection Troubleshoot, NSG/VNet Flow Logs',
        awsEquivalent: 'VPC Reachability Analyzer + VPC Flow Logs + Packet Mirroring',
        keyFacts: [
          '**IP Flow Verify**: checks in 2 seconds whether an NSG rule allows or denies a specific 5-tuple packet—and names the exact offending NSG rule!',
          '**Next Hop**: reveals the exact route table (System/UDR/BGP) and next-hop IP a VM uses to reach a destination IP (catches bad UDRs!).',
          '**Connection Troubleshoot**: end-to-end live TCP connectivity probe from VM/Bastion/AppGW -> target IP/FQDN; **VNet Flow Logs** (replacing legacy NSG Flow Logs!) log traffic into a same-region Storage Account + Traffic Analytics.'
        ],
        examTrap: 'Know which tool answers which question: *"Which NSG blocked port 443?"* -> **IP Flow Verify**; *"Why isn’t traffic hitting my firewall NVA?"* -> **Next Hop**; *"Check VPN tunnel health"* -> **VPN Troubleshoot**!'
      },
      {
        title: 'Azure Backup, Recovery Services Vault & Backup Vault',
        azureConcept: 'VM Snapshot + Vault Tiers, Soft Delete & Cross-Region Restore (CRR)',
        awsEquivalent: 'AWS Backup Vaults + Vault Lock + Cross-Region Copy',
        keyFacts: [
          '**Recovery Services Vault (RSV)** backs up Azure VMs, Azure Files, SQL in Azure VM, SAP HANA, and on-prem MARS agent; **Backup Vault** backs up Azure Managed Disks, Azure Blobs, PostgreSQL, and AKS!',
          'Azure VM Backup uses a **2-tier** restore design: **Instant Restore** snapshots stay locally for 1–5 days (default 2d) for ultra-fast recovery, then transfer to the **Vault tier** for daily/weekly/monthly/yearly GRS/LRS retention.',
          'Vault **Soft Delete** retains deleted backup data for **14 additional days** for free (extendable up to 180d) to defeat ransomware; **MUA (Multi-User Authorization)** uses a **Resource Guard** in another subscription/tenant!'
        ],
        examTrap: 'You **CANNOT change** a Recovery Services Vault’s storage redundancy (`GRS` <-> `LRS`/`ZRS`) AFTER you register/protect your first backup item! Also, **Cross-Region Restore (CRR)** requires `GRS` (`RA-GRS` under the hood)!'
      },
      {
        title: 'VM Restore Options & Azure Site Recovery (ASR)',
        azureConcept: 'Create New vs. Replace Existing Disks vs. Continuous DR Replication',
        awsEquivalent: 'EBS Snapshot Restore vs. AWS Elastic Disaster Recovery (DRS)',
        keyFacts: [
          'Restoring a backed-up Azure VM offers 4 paths: (1) **Create new VM**, (2) **Restore disks** (then build custom VM or attach), (3) **Replace existing disks** on the live VM (must **stop/deallocate** the VM first, and uses staging storage account!), (4) **File Recovery** (mount script downloads individual files without full VM restore!).',
          '**Azure Site Recovery (ASR)** continuously replicates VMs (via the **Mobility Service** extension) to a secondary Azure region for low-RPO/RTO disaster recovery (`Test Failover` -> isolated VNet with zero prod impact -> `Cleanup test failover`!).',
          'After failing over to the secondary region, you MUST click **Commit** -> **Reprotect** before you can fail back to the primary region!'
        ],
        examTrap: 'You CANNOT delete a Recovery Services Vault while protected items or **Soft-Deleted backup data** still exist inside it—disable Soft Delete (if permitted), permanently delete backup items, unregister servers, THEN delete the vault!'
      }
    ]
  }
];
