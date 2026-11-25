import type { RosettaServiceRow, CheatSheetTable } from '../types/curriculum';

export const ROSETTA_SERVICES: RosettaServiceRow[] = [
  // ==========================================
  // 1. Compute & Containers (6 rows)
  // ==========================================
  {
    id: 'rosetta-compute-01',
    category: 'Compute & Containers',
    awsService: 'Amazon EC2',
    azureService: 'Azure Virtual Machines',
    examTrack: 'Both',
    architectGotcha: 'Shutting down inside the guest OS (`shutdown -h now`) leaves an Azure VM `Stopped` and STILL BILLED for compute! You must stop it via Azure (`az vm deallocate`) to reach `Stopped (deallocated)`. Also, Availability Set (99.95% SLA) or Availability Zone (99.99% SLA) placement is locked at VM creation.'
  },
  {
    id: 'rosetta-compute-02',
    category: 'Compute & Containers',
    awsService: 'EC2 Auto Scaling Groups (ASG)',
    azureService: 'Virtual Machine Scale Sets (VMSS)',
    examTrack: 'Both',
    architectGotcha: 'Choose `Flexible` orchestration mode (over legacy `Uniform`) to mix VM SKUs, combine Spot + Pay-As-You-Go, and use standard VM APIs up to 1,000 instances. Always pair every scale-out rule with a matching scale-in rule or capacity never shrinks after a traffic spike!'
  },
  {
    id: 'rosetta-compute-03',
    category: 'Compute & Containers',
    awsService: 'AWS Elastic Beanstalk / App Runner',
    azureService: 'Azure App Service (Web Apps)',
    examTrack: 'Both',
    architectGotcha: 'Multiple Web Apps inside the same `App Service Plan` share its underlying vCPU/RAM pool and scale together! Zero-downtime `Deployment Slots` require `Standard` tier or higher, and connection strings swap with code UNLESS marked as a sticky "Deployment slot setting".'
  },
  {
    id: 'rosetta-compute-04',
    category: 'Compute & Containers',
    awsService: 'Amazon ECS on AWS Fargate',
    azureService: 'Azure Container Apps (ACA) & Azure Container Instances (ACI)',
    examTrack: 'Both',
    architectGotcha: '`ACI` is the fastest way to run an isolated single container/pod group billed per second (note: only *Linux* ACI containers can mount Azure Files shares!). `Azure Container Apps` adds serverless HTTP ingress, Dapr, Blue/Green revisions, and KEDA scale-to-zero without managing Kubernetes control planes.'
  },
  {
    id: 'rosetta-compute-05',
    category: 'Compute & Containers',
    awsService: 'Amazon EKS & Amazon ECR',
    azureService: 'Azure Kubernetes Service (AKS) & Azure Container Registry (ACR)',
    examTrack: 'Both',
    architectGotcha: 'Every AKS cluster requires at least one Linux `System` node pool (`CoreDNS`); Windows Server containers can only run in secondary `User` node pools. `Azure CNI` assigns real VNet IPs to every Pod (watch subnet sizing!), and `ACR` geo-replication + Private Link require the `Premium` SKU.'
  },
  {
    id: 'rosetta-compute-06',
    category: 'Compute & Containers',
    awsService: 'Amazon WorkSpaces & AppStream 2.0',
    azureService: 'Azure Virtual Desktop (AVD)',
    examTrack: 'AZ-900',
    architectGotcha: 'Exclusive Microsoft cloud superpower: AVD is the ONLY cloud VDI platform offering native **Windows 10 / Windows 11 Enterprise multi-session** (multiple concurrent users sharing a single VM license with FSLogix profile containers on Azure Files).'
  },

  // ==========================================
  // 2. Networking & Delivery (6 rows)
  // ==========================================
  {
    id: 'rosetta-net-01',
    category: 'Networking & Delivery',
    awsService: 'Amazon VPC & Subnets',
    azureService: 'Azure Virtual Network (VNet) & Subnets',
    examTrack: 'Both',
    architectGotcha: 'Unlike AWS where 1 Subnet = 1 Availability Zone, Azure Subnets are **regional** and span all Availability Zones in that VNet automatically! Like AWS, Azure reserves **5 IPs per subnet** (`.0`, `.1`, `.2`, `.3`, and `.255` broadcast). VNet Peering is strictly non-transitive unless using Gateway Transit or a Hub NVA.'
  },
  {
    id: 'rosetta-net-02',
    category: 'Networking & Delivery',
    awsService: 'Security Groups & Network ACLs (NACLs)',
    azureService: 'Network Security Groups (NSGs) & Application Security Groups (ASGs)',
    examTrack: 'Both',
    architectGotcha: 'Azure has NO stateless NACLs! `NSGs` are **stateful**, support explicit `Allow` AND `Deny` rules by priority (`100–4096`), and attach to **Subnets AND/OR NICs** (inbound checks Subnet NSG -> NIC NSG; BOTH must allow!). `ASGs` tag NICs logically (`asg-web`) within a single VNet.'
  },
  {
    id: 'rosetta-net-03',
    category: 'Networking & Delivery',
    awsService: 'AWS Direct Connect & Site-to-Site VPN',
    azureService: 'Azure ExpressRoute & Azure VPN Gateway',
    examTrack: 'Both',
    architectGotcha: 'Gateways must deploy into a dedicated subnet literally named `GatewaySubnet`. `ExpressRoute` provides private SLA-backed MPLS/partner fiber (bypassing the public internet), but traffic is **NOT encrypted by default** unless you layer IPsec VPN over ExpressRoute or MACsec on Direct Ports!'
  },
  {
    id: 'rosetta-net-04',
    category: 'Networking & Delivery',
    awsService: 'Network Load Balancer (NLB) & Application Load Balancer (ALB)',
    azureService: 'Azure Load Balancer (L4) & Azure Application Gateway (L7)',
    examTrack: 'Both',
    architectGotcha: '`Standard` Azure Load Balancer (TCP/UDP L4) is secure-by-default: all inbound traffic fails unless an **NSG** explicitly allows it, and you cannot mix `Basic` and `Standard` Public IPs! `Application Gateway` (HTTP/HTTPS L7 + URL path routing + OWASP WAF) requires its own dedicated subnet.'
  },
  {
    id: 'rosetta-net-05',
    category: 'Networking & Delivery',
    awsService: 'Amazon CloudFront + AWS Global Accelerator + WAF',
    azureService: 'Azure Front Door',
    examTrack: 'Both',
    architectGotcha: 'Azure Front Door is a **Global Layer 7** edge network combining Anycast split-TCP acceleration, global HTTP/HTTPS load balancing across regions, TLS offload, CDN caching, and edge WAF—offering much faster HTTP regional failover than DNS TTL-bound Traffic Manager.'
  },
  {
    id: 'rosetta-net-06',
    category: 'Networking & Delivery',
    awsService: 'Amazon Route 53 & AWS PrivateLink',
    azureService: 'Azure DNS, Azure Traffic Manager & Azure Private Endpoints',
    examTrack: 'Both',
    architectGotcha: '(1) `Azure DNS` hosts zones but **cannot register domain names**; (2) `Traffic Manager` is pure global **DNS** load balancing (no L7 WAF/TLS termination); (3) To access Storage/SQL privately from on-prem over VPN/ExpressRoute, use a **Private Endpoint** + `Private DNS Zone` (never a `Service Endpoint`, which uses public IPs!).'
  },

  // ==========================================
  // 3. Storage (6 rows)
  // ==========================================
  {
    id: 'rosetta-storage-01',
    category: 'Storage',
    awsService: 'Amazon S3',
    azureService: 'Azure Blob Storage (inside an Azure Storage Account)',
    examTrack: 'Both',
    architectGotcha: 'Unlike global S3 buckets, Blobs live inside a regional `Storage Account` (`https://<account>.blob.core.windows.net/<container>/<blob>`). Know the 4 tiers: `Hot` (0d), `Cool` (30d), `Cold` (90d), `Archive` (180d, offline—cannot be account default, and **NOT supported on ZRS/GZRS**!).'
  },
  {
    id: 'rosetta-storage-02',
    category: 'Storage',
    awsService: 'Amazon EBS',
    azureService: 'Azure Managed Disks',
    examTrack: 'Both',
    architectGotcha: 'Four disk tiers (`Standard HDD`, `Standard SSD`, `Premium SSD`, `Ultra Disk` / `Premium SSD v2`). You can **NEVER shrink** a Managed Disk! Single-VM 99.9% SLA requires `Premium SSD` or `Ultra Disk` on ALL attached OS and data disks.'
  },
  {
    id: 'rosetta-storage-03',
    category: 'Storage',
    awsService: 'Amazon EFS & FSx for Windows File Server',
    azureService: 'Azure Files & Azure File Sync',
    examTrack: 'Both',
    architectGotcha: 'Standard GPv2 supports SMB; **NFSv4.1 requires a `Premium FileStorage` account** + VNet Private/Service Endpoint with "Secure transfer required" disabled! `Azure File Sync` caches an Azure File Share across Windows Servers (1 Cloud Endpoint + N Server Endpoints per Sync Group).'
  },
  {
    id: 'rosetta-storage-04',
    category: 'Storage',
    awsService: 'S3 Cross-Region Replication (CRR) & S3 Object Lock',
    azureService: 'GRS / RA-GZRS, Blob Object Replication & Immutable Storage',
    examTrack: 'Both',
    architectGotcha: 'Plain `GRS`/`GZRS` replicates to a fixed Paired Region that you **cannot read** unless Microsoft/you initiate failover—pick **`RA-GRS` / `RA-GZRS`** for secondary read access! Custom cross-account `Object Replication` requires **Blob Versioning** on BOTH accounts + **Change Feed** on the source.'
  },
  {
    id: 'rosetta-storage-05',
    category: 'Storage',
    awsService: 'S3 Presigned URLs & S3 Bucket Policies',
    azureService: 'Shared Access Signatures (SAS) & Stored Access Policies',
    examTrack: 'AZ-104',
    architectGotcha: 'Prefer **User Delegation SAS** (signed with Microsoft Entra ID credentials, Blobs/ADLS only) over key-signed Service/Account SAS. To revoke a distributed Service SAS immediately without rotating master Storage Account Keys, attach it to a container **Stored Access Policy** and delete/expire the policy!'
  },
  {
    id: 'rosetta-storage-06',
    category: 'Storage',
    awsService: 'AWS Snowball Edge & `aws s3 sync`',
    azureService: 'Azure Data Box, Azure Import/Export & AzCopy',
    examTrack: 'Both',
    architectGotcha: '`Azure Data Box` ships Microsoft ruggedized hardware (80 TB / 1 PB); `Azure Import/Export` ships YOUR own BitLocker drives—and while it can *import* to Blobs or Azure Files, **Import/Export can ONLY export from Blob Storage (NEVER Azure Files)**! `azcopy sync` only deletes extra target files if `--delete-destination=true`.'
  },

  // ==========================================
  // 4. Databases & Cache (6 rows)
  // ==========================================
  {
    id: 'rosetta-db-01',
    category: 'Databases & Cache',
    awsService: 'Amazon DynamoDB',
    azureService: 'Azure Cosmos DB',
    examTrack: 'AZ-900',
    architectGotcha: 'Globally distributed multi-model NoSQL database supporting turn-key multi-region active-active writes, `<10 ms` latency SLA, 5 tunable consistency levels (`Strong`, `Bounded Staleness`, `Session` [default], `Consistent Prefix`, `Eventual`), and wire APIs for NoSQL, MongoDB, Apache Cassandra, Gremlin, PostgreSQL, and Table.'
  },
  {
    id: 'rosetta-db-02',
    category: 'Databases & Cache',
    awsService: 'Amazon RDS for SQL Server',
    azureService: 'Azure SQL Database vs. Azure SQL Managed Instance (SQL MI)',
    examTrack: 'AZ-900',
    architectGotcha: 'Crucial 3-tier SQL choice on AZ-900: `SQL on Azure VMs` = IaaS (full OS/SQL version control); `SQL Managed Instance` = PaaS w/ ~100% on-prem compatibility (SQL Agent, cross-DB queries, native VNet injection) for easy lift-and-shift; `Azure SQL Database` = modern cloud PaaS (Single DB, Elastic Pools, Serverless scale-to-pause).'
  },
  {
    id: 'rosetta-db-03',
    category: 'Databases & Cache',
    awsService: 'Amazon RDS / Aurora (PostgreSQL & MySQL)',
    azureService: 'Azure Database for PostgreSQL & MySQL (Flexible Server)',
    examTrack: 'AZ-900',
    architectGotcha: 'Fully managed open-source relational PaaS (`Flexible Server` deployment model) offering built-in automated backups, patching, same-zone or Zone-Redundant High Availability, burstable compute SKUs, and compute stop/start cost savings for dev/test.'
  },
  {
    id: 'rosetta-db-04',
    category: 'Databases & Cache',
    awsService: 'Amazon ElastiCache (for Redis / Valkey)',
    azureService: 'Azure Managed Redis / Azure Cache for Redis',
    examTrack: 'AZ-900',
    architectGotcha: 'In-memory key-value data store accelerating database read/session performance with sub-millisecond latency. Supports Private Endpoints across tiers and active geo-replication on Enterprise tiers.'
  },
  {
    id: 'rosetta-db-05',
    category: 'Databases & Cache',
    awsService: 'Amazon Redshift, EMR & AWS Glue',
    azureService: 'Azure Synapse Analytics, Azure Databricks & Azure Data Factory',
    examTrack: 'AZ-900',
    architectGotcha: '`Azure Data Factory` = code-free hybrid ETL/ELT orchestration (uses a Self-Hosted Integration Runtime for on-prem data); `Synapse Analytics` (and `Microsoft Fabric`) unifies enterprise MPP SQL data warehousing + Apache Spark big data; `Azure HDInsight` = managed Hadoop/Kafka/HBase.'
  },
  {
    id: 'rosetta-db-06',
    category: 'Databases & Cache',
    awsService: 'AWS Database Migration Service (DMS) & MGN',
    azureService: 'Azure Database Migration Service & Azure Migrate',
    examTrack: 'AZ-900',
    architectGotcha: '`Azure Migrate` is the unified central hub for agentless/agent-based discovery, dependency mapping, TCO sizing, and VM/SQL/Web App lift-and-shift; `Azure Database Migration Service` executes online continuous-sync database cutovers with minimal downtime.'
  },

  // ==========================================
  // 5. Identity & Security (6 rows)
  // ==========================================
  {
    id: 'rosetta-sec-01',
    category: 'Identity & Security',
    awsService: 'AWS IAM & AWS IAM Identity Center',
    azureService: 'Microsoft Entra ID & Azure RBAC',
    examTrack: 'Both',
    architectGotcha: 'AWS combines identity and resource permissions inside IAM; Azure **strictly splits** them! **Microsoft Entra ID** (formerly Azure AD) handles tenant Authentication (Users, Groups, App Registrations, OAuth2/OIDC/SAML) + Entra Roles; **Azure RBAC** handles ARM Resource Authorization (`Owner`, `Contributor`, `Reader`, plus `DataActions` for Blob/KeyVault data!).'
  },
  {
    id: 'rosetta-sec-02',
    category: 'Identity & Security',
    awsService: 'IAM Identity Center Permission Sets & STS JIT',
    azureService: 'Conditional Access & Entra Privileged Identity Management (PIM)',
    examTrack: 'Both',
    architectGotcha: 'Watch SKU gates: **Conditional Access** (`Signals -> Decision -> MFA/Block`) requires **Entra ID P1** (and requires disabling `Security Defaults` first!); **PIM** (time-bound Just-In-Time admin role activation with approval/justification) and **Identity Protection** risk policies require **Entra ID P2**!'
  },
  {
    id: 'rosetta-sec-03',
    category: 'Identity & Security',
    awsService: 'AWS Directory Service (Managed Microsoft AD)',
    azureService: 'Microsoft Entra Domain Services',
    examTrack: 'Both',
    architectGotcha: 'Plain Microsoft Entra ID speaks modern HTTPS protocols (OIDC/SAML) and **does NOT support legacy Kerberos, NTLM, LDAP, Domain Join, or GPOs**! If a lift-and-shift VM app needs Kerberos/LDAP without managing AD Domain Controller VMs, deploy **Microsoft Entra Domain Services** into your VNet.'
  },
  {
    id: 'rosetta-sec-04',
    category: 'Identity & Security',
    awsService: 'AWS KMS & AWS Secrets Manager & ACM',
    azureService: 'Azure Key Vault',
    examTrack: 'Both',
    architectGotcha: 'Instead of three separate AWS services, **Azure Key Vault** stores cryptographic **Keys**, application **Secrets**, AND auto-renewing TLS **Certificates** in one resource (`Standard` software vs. `Premium` FIPS HSM). Customer-Managed Key (CMK) encryption requires enabling **both Soft Delete AND Purge Protection** on the vault!'
  },
  {
    id: 'rosetta-sec-05',
    category: 'Identity & Security',
    awsService: 'AWS Security Hub & Amazon GuardDuty',
    azureService: 'Microsoft Defender for Cloud',
    examTrack: 'Both',
    architectGotcha: 'Delivers continuous CSPM (**Secure Score** + regulatory compliance checks—free foundational tier!) plus paid CWPP workload threat detection plans (Defender for Servers, Storage, SQL, Containers) across Azure, on-premises (via Azure Arc), AND native AWS/GCP connectors.'
  },
  {
    id: 'rosetta-sec-06',
    category: 'Identity & Security',
    awsService: 'Amazon Security Lake / SIEM, Network Firewall & EC2 Instance Connect',
    azureService: 'Microsoft Sentinel, Azure Firewall & Azure Bastion',
    examTrack: 'Both',
    architectGotcha: '`Microsoft Sentinel` = cloud-native KQL SIEM + SOAR (Playbooks use Logic Apps!). `Azure Firewall` (stateful L3–L7 FQDN/TLS firewall) requires `AzureFirewallSubnet` (`/26`); `Azure Bastion` (browser RDP/SSH over TLS 443 with zero VM public IPs) requires `AzureBastionSubnet` (`/26`).'
  },

  // ==========================================
  // 6. Governance & IaC (6 rows)
  // ==========================================
  {
    id: 'rosetta-gov-01',
    category: 'Governance & IaC',
    awsService: 'AWS Organizations, OUs & Member Accounts',
    azureService: 'Azure Management Groups, Subscriptions & Resource Groups',
    examTrack: 'Both',
    architectGotcha: 'Management Groups nest up to **6 levels deep** (excluding Tenant Root Group) and group Subscriptions. Unlike AWS where Resource Groups are optional tag views, EVERY Azure resource MUST live in **exact 1 Resource Group**! RBAC, Policy, and Locks inherit down; **Tags NEVER inherit automatically**!'
  },
  {
    id: 'rosetta-gov-02',
    category: 'Governance & IaC',
    awsService: 'Service Control Policies (SCPs) & AWS Config Conformance Packs',
    azureService: 'Azure Policy & Policy Initiatives',
    examTrack: 'Both',
    architectGotcha: 'Unifies preventive guardrails (`Deny` Allowed Locations / VM SKUs—blocks even Subscription `Owner`s!) with continuous compliance (`Audit`) and inline auto-remediation (`Modify` for missing tags, `DeployIfNotExists` for agents/diagnostics—both require a Managed Identity!). An **Initiative** bundles multiple Policy Definitions.'
  },
  {
    id: 'rosetta-gov-03',
    category: 'Governance & IaC',
    awsService: 'EC2/RDS Deletion Protection & Resource Lock SCPs',
    azureService: 'Azure Resource Locks (`CanNotDelete` & `ReadOnly`)',
    examTrack: 'Both',
    architectGotcha: 'Applies at Subscription, RG, or Resource scope and inherits down. `Contributor` **cannot** remove locks (only `Owner` or `User Access Administrator`). Huge exam trap: `ReadOnly` locks block ARM `POST` calls—meaning VMs **cannot Start/Stop/Restart** and Storage Accounts **cannot `listKeys`**!'
  },
  {
    id: 'rosetta-gov-04',
    category: 'Governance & IaC',
    awsService: 'AWS CloudFormation & AWS CDK',
    azureService: 'ARM Templates (JSON) & Azure Bicep',
    examTrack: 'Both',
    architectGotcha: '`Bicep` gives Terraform-clean declarative syntax while compiling natively to ARM JSON with **zero external state files** and day-0 API support. Always use default `Incremental` deployment mode—switching to `Complete` mode **deletes** every existing resource in the target Resource Group omitted from your template!'
  },
  {
    id: 'rosetta-gov-05',
    category: 'Governance & IaC',
    awsService: 'AWS Cost Explorer, Budgets, RIs, Savings Plans & Migration Evaluator',
    azureService: 'Microsoft Cost Management, Pricing/TCO Calculators, Reservations & Hybrid Benefit',
    examTrack: 'AZ-900',
    architectGotcha: '`Pricing Calculator` estimates cloud SKUs; `TCO Calculator` compares on-prem power/cooling/labor vs. Azure. `Budgets` send alerts at actual/forecasted % without stopping VMs unless wired to an Action Group runbook. Stack **3-yr Reservations (72%) + Azure Hybrid Benefit** (Windows/SQL Software Assurance) for >80% savings!'
  },
  {
    id: 'rosetta-gov-06',
    category: 'Governance & IaC',
    awsService: 'Amazon Macie + DataZone, AWS Artifact & SSM Hybrid Nodes',
    azureService: 'Microsoft Purview, Service Trust Portal & Azure Arc',
    examTrack: 'AZ-900',
    architectGotcha: '`Microsoft Purview` = unified data governance, PII discovery, Data Catalog & lineage; `Service Trust Portal` = self-service ISO/SOC/FedRAMP audit reports; `Azure Arc` = projects on-prem and AWS/GCP servers & Kubernetes clusters as first-class resources inside an Azure Resource Group!'
  },

  // ==========================================
  // 7. Messaging & Serverless (6 rows)
  // ==========================================
  {
    id: 'rosetta-msg-01',
    category: 'Messaging & Serverless',
    awsService: 'AWS Lambda',
    azureService: 'Azure Functions',
    examTrack: 'AZ-900',
    architectGotcha: 'Event-driven code execution supporting **Consumption** (scales to zero, billed per execution), **Flex Consumption / Elastic Premium** (eliminates cold starts via pre-warmed instances + VNet integration + longer runtimes), or **Dedicated App Service Plan**. Add `Durable Functions` for stateful code-first orchestrations.'
  },
  {
    id: 'rosetta-msg-02',
    category: 'Messaging & Serverless',
    awsService: 'AWS Step Functions & Amazon AppFlow',
    azureService: 'Azure Logic Apps',
    examTrack: 'AZ-900',
    architectGotcha: 'Low-code/no-code visual workflow designer with **1,000+ prebuilt connectors** (SAP, Salesforce, SharePoint, ServiceNow, SQL). Pick `Azure Functions` for custom code algorithms; pick `Logic Apps` for enterprise SaaS/B2B integration workflows and Sentinel SOAR playbooks.'
  },
  {
    id: 'rosetta-msg-03',
    category: 'Messaging & Serverless',
    awsService: 'Amazon SQS (Standard & FIFO) & Amazon SNS',
    azureService: 'Azure Queue Storage vs. Azure Service Bus',
    examTrack: 'Both',
    architectGotcha: 'Know when to pick each queue! `Queue Storage` = simple HTTP REST queue inside a Storage Account (64 KB max message, massive >80 TB backlog capacity, at-least-once). `Azure Service Bus` = enterprise AMQP broker supporting **FIFO ordered sessions**, duplicate detection, dead-lettering, transactions, and **Topics/Subscriptions** (pub/sub).'
  },
  {
    id: 'rosetta-msg-04',
    category: 'Messaging & Serverless',
    awsService: 'Amazon EventBridge',
    azureService: 'Azure Event Grid',
    examTrack: 'AZ-900',
    architectGotcha: 'Serverless reactive pub/sub event backplane using push delivery for discrete state-change notifications ("A new blob was uploaded", "A resource group was modified")—eliminating polling loops across Azure services and custom webhooks.'
  },
  {
    id: 'rosetta-msg-05',
    category: 'Messaging & Serverless',
    awsService: 'Amazon Kinesis Data Streams & Amazon MSK',
    azureService: 'Azure Event Hubs',
    examTrack: 'Both',
    architectGotcha: 'Big-data real-time telemetry ingestion front door capable of receiving **millions of events per second** from IoT/clickstreams/Diagnostic Settings, featuring native Apache Kafka protocol support (zero code change!) and `Event Hubs Capture` directly to Blob/Data Lake.'
  },
  {
    id: 'rosetta-msg-06',
    category: 'Messaging & Serverless',
    awsService: 'Amazon API Gateway',
    azureService: 'Azure API Management (APIM)',
    examTrack: 'AZ-900',
    architectGotcha: 'Full lifecycle API gateway providing a developer portal, rate limiting/quotas, OAuth/JWT token validation at the edge, XML-to-JSON payload transformation policies, response caching, and secure exposure of private VNet/on-prem microservices.'
  },

  // ==========================================
  // 8. Monitoring & DR (6 rows)
  // ==========================================
  {
    id: 'rosetta-mon-01',
    category: 'Monitoring & DR',
    awsService: 'Amazon CloudWatch (Metrics, Logs Insights & Unified Agent)',
    azureService: 'Azure Monitor, Log Analytics (KQL) & Azure Monitor Agent (AMA)',
    examTrack: 'Both',
    architectGotcha: 'Hypervisor CPU/Disk/Network metrics flow for free, but **guest OS RAM (Available Memory)**, Windows Event Logs, and Syslog require **Azure Monitor Agent (AMA) + a Data Collection Rule (DCR)**! Note: Diagnostic Storage Accounts must match the resource’s region, whereas a `Log Analytics Workspace` can be in **any region**.'
  },
  {
    id: 'rosetta-mon-02',
    category: 'Monitoring & DR',
    awsService: 'AWS X-Ray & CloudWatch Synthetics',
    azureService: 'Application Insights (feature of Azure Monitor)',
    examTrack: 'Both',
    architectGotcha: 'OpenTelemetry-based Application Performance Management (APM) tracking live HTTP request rates, response latencies, unhandled exceptions, SQL/HTTP dependency maps, user funnels, and multi-region synthetic URL ping tests.'
  },
  {
    id: 'rosetta-mon-03',
    category: 'Monitoring & DR',
    awsService: 'AWS CloudTrail & AWS Trusted Advisor',
    azureService: 'Azure Activity Log & Azure Advisor',
    examTrack: 'Both',
    architectGotcha: '`Activity Log` retains 90 days of subscription control-plane ("who created/deleted what when") events for free—export via Diagnostic Settings to Storage/Log Analytics for >90 days! Unlike AWS Trusted Advisor, **Azure Advisor is 100% FREE across all 5 pillars** (Reliability, Security, Performance, Cost, Operational Excellence).'
  },
  {
    id: 'rosetta-mon-04',
    category: 'Monitoring & DR',
    awsService: 'AWS Health Dashboard, VPC Reachability Analyzer & Flow Logs',
    azureService: 'Azure Service Health Suite & Azure Network Watcher',
    examTrack: 'Both',
    architectGotcha: 'Health triad: `Azure Status` (global public) -> `Service Health` (your regions/subs + RCAs) -> `Resource Health` (single VM). Network Watcher triad: `IP Flow Verify` (which NSG rule blocked?), `Next Hop` (which UDR routed?), and `VNet Flow Logs` (replaces legacy NSG Flow Logs!). Use **Alert Processing Rules** to mute alerts during maintenance windows.'
  },
  {
    id: 'rosetta-mon-05',
    category: 'Monitoring & DR',
    awsService: 'AWS Backup',
    azureService: 'Azure Backup (Recovery Services Vault & Backup Vault)',
    examTrack: 'AZ-104',
    architectGotcha: '`Recovery Services Vault` protects VMs, Azure Files, and SQL-in-VM (2-tier restore: fast local Instant Restore snapshots for 1–5d + Vault tier). Vault storage redundancy (`GRS`/`ZRS`/`LRS`) is **locked permanently** once the first item is backed up, and **14-day Soft Delete** blocks vault deletion until purged!'
  },
  {
    id: 'rosetta-mon-06',
    category: 'Monitoring & DR',
    awsService: 'AWS Elastic Disaster Recovery (DRS)',
    azureService: 'Azure Site Recovery (ASR)',
    examTrack: 'Both',
    architectGotcha: 'Replicates Azure VMs across regions (or VMware/Hyper-V/physical servers to Azure) via the `Mobility Service` agent for near-zero RPO/minute-level RTO. Run non-disruptive `Test Failover` into an isolated VNet; after real failover, execute **Commit -> Reprotect** before failing back!'
  }
];

export const CHEAT_SHEET_TABLES: CheatSheetTable[] = [
  {
    id: 'cheat-storage-redundancy',
    title: '1. Azure Storage Redundancy Matrix',
    subtitle: 'Durability nines, copy distribution, outage survival, secondary read access, and failover rules.',
    track: 'Both',
    headers: [
      'SKU',
      'Durability (Nines)',
      'Copies & Placement',
      'Survives Zone Outage?',
      'Survives Region Outage?',
      'Secondary Read Without Failover?'
    ],
    rows: [
      [
        'LRS (Locally Redundant)',
        '11 nines (99.999999999%)',
        '3 sync copies in 1 datacenter',
        'No',
        'No',
        'No'
      ],
      [
        'ZRS (Zone-Redundant)',
        '12 nines (99.9999999999%)',
        '3 sync copies across 3 AZs in 1 region',
        'Yes (zero downtime)',
        'No',
        'No (single region)'
      ],
      [
        'GRS (Geo-Redundant)',
        '16 nines',
        '3 sync LRS primary + 3 async LRS in Paired Region (6 total)',
        'No (primary is single DC)',
        'Yes (requires failover; async RPO ~15m)',
        'NO — opaque until failover!'
      ],
      [
        'RA-GRS (Read-Access GRS)',
        '16 nines',
        'Same 6 copies as GRS + `<account>-secondary` endpoint',
        'No (primary write)',
        'Yes (failover for writes; immediate secondary read)',
        'YES (`-secondary` endpoint)'
      ],
      [
        'GZRS (Geo-Zone-Redundant)',
        '16 nines',
        '3 sync ZRS across 3 AZs primary + 3 async LRS in Paired Region',
        'Yes',
        'Yes (requires failover)',
        'NO — opaque until failover!'
      ],
      [
        'RA-GZRS (Read-Access GZRS)',
        '16 nines',
        'Same as GZRS + `<account>-secondary` read endpoint',
        'Yes',
        'Yes (maximum Microsoft recommended HA/DR)',
        'YES (`-secondary` endpoint)'
      ]
    ],
    proTip: 'Premium Storage Accounts (`BlockBlobStorage`, `FileStorage`, `PageBlobStorage`) ONLY support LRS and ZRS—never GRS/GZRS! Also, switching to/from ZRS requires a migration rather than a simple dropdown toggle.'
  },
  {
    id: 'cheat-blob-access-tiers',
    title: '2. Azure Blob Access Tiers',
    subtitle: 'Minimum retention cliffs, cost profiles, first-byte latency, and SKU compatibility.',
    track: 'Both',
    headers: [
      'Access Tier',
      'Min Retention Days',
      'Storage GB Cost',
      'Read / Transaction Cost',
      'Retrieval Latency',
      'Key Exam Constraints'
    ],
    rows: [
      [
        'Hot',
        '0 days (None)',
        'Highest',
        'Lowest',
        'Milliseconds (Online)',
        'Default account tier for active data; valid at Account or Blob level.'
      ],
      [
        'Cool',
        '30 days',
        'Lower than Hot',
        'Higher than Hot',
        'Milliseconds (Online)',
        'Early deletion/move before 30d incurs prorated Cool charge; valid as Account default.'
      ],
      [
        'Cold',
        '90 days',
        'Lower than Cool',
        'Higher than Cool',
        'Milliseconds (Online)',
        'Online tier for rarely read 90d+ data; valid at Account or Blob level.'
      ],
      [
        'Archive',
        '180 days',
        'Lowest (pennies/TB)',
        'Highest + Rehydration fee',
        'Offline! Hours (<15h Standard, <1h High <10GB)',
        'Blob-level ONLY (never Account default!); NOT supported on ZRS, GZRS, or RA-GZRS!'
      ]
    ],
    proTip: 'To read an Archive blob without losing its archived copy, use `Copy Blob` to a new Hot/Cool target blob instead of changing the original blob’s tier in place!'
  },
  {
    id: 'cheat-load-balancing-matrix',
    title: '3. Azure Load Balancing Decision Matrix',
    subtitle: 'Pick the exact traffic distributor in 5 seconds using OSI Layer, Scope, and WAF requirements.',
    track: 'Both',
    headers: [
      'Service',
      'OSI Layer / Protocol',
      'Geographic Scope',
      'Built-in WAF?',
      'TLS Offload / Path Routing?',
      'Signature Exam Trigger'
    ],
    rows: [
      [
        'Azure Load Balancer',
        'Layer 4 (TCP / UDP)',
        'Regional',
        'No',
        'No (pass-through 5-tuple hash)',
        'Non-HTTP TCP/UDP, SQL/NVA HA Ports, ultra-low latency internal/public VMs (Standard SKU needs NSG!).'
      ],
      [
        'Application Gateway',
        'Layer 7 (HTTP / HTTPS / WS / HTTP2)',
        'Regional',
        'Yes (OWASP WAF_v2)',
        'Yes (`/images` -> Pool A, `/video` -> Pool B, cookie affinity)',
        'Single-region web apps needing URL path/host routing, SSL offload, or regional WAF in a dedicated subnet.'
      ],
      [
        'Azure Front Door',
        'Layer 7 (HTTP / HTTPS Anycast Edge)',
        'Global (Multi-Region)',
        'Yes (Global Edge WAF)',
        'Yes + Built-in CDN caching & Split-TCP acceleration',
        'Multi-region active/active HTTPS web apps needing instant global HTTP failover, CDN, and edge WAF.'
      ],
      [
        'Azure Traffic Manager',
        'DNS Level (Any port/protocol after lookup)',
        'Global (Multi-Region / Hybrid)',
        'No (never sees payload!)',
        'No (returns IP/CNAME via DNS)',
        'Global non-HTTP workloads, hybrid on-prem failover, or pure DNS routing (`Priority`, `Weighted`, `Performance`, `Geographic`).'
      ]
    ],
    proTip: 'Enterprise reference architecture frequently pairs **Azure Front Door** (Global Edge WAF + Region Failover) in front of regional **Application Gateways** or **Internal Standard Load Balancers**!'
  },
  {
    id: 'cheat-governance-inheritance',
    title: '4. Governance Scope & Inheritance Matrix',
    subtitle: 'How RBAC, Azure Policy, Resource Locks, and Resource Tags behave across the 4-tier hierarchy.',
    track: 'Both',
    headers: [
      'Scope Level (Top -> Bottom)',
      'Max Scale / Nesting',
      'Azure RBAC Inherited?',
      'Azure Policy Inherited?',
      'Resource Locks Inherited?',
      'Resource Tags Inherited?'
    ],
    rows: [
      [
        '1. Management Group',
        'Up to 6 levels deep (excl. Root); 10,000 MGs/tenant',
        'Yes (flows to all child MGs, Subs, RGs, Resources)',
        'Yes (supports child scope exclusions)',
        'N/A (Locks apply at Subscription, RG, or Resource!)',
        'N/A (Tags apply at Subscription, RG, or Resource)'
      ],
      [
        '2. Subscription',
        'Billing & quota boundary under 1 Entra Tenant',
        'Yes (flows to all RGs & Resources)',
        'Yes (flows to all RGs & Resources)',
        'Yes (locks every RG & Resource in the subscription)',
        'NO — stays on Subscription only unless Policy copies it!'
      ],
      [
        '3. Resource Group',
        '1 mandatory parent RG per resource; up to 980/sub',
        'Yes (flows to all Resources inside RG)',
        'Yes (flows to all Resources inside RG)',
        'Yes (all current & future child resources inherit lock)',
        'NO — child resources do NOT inherit RG tags automatically!'
      ],
      [
        '4. Resource',
        'Individual VM, VNet, Storage Account, SQL DB',
        'Applies to resource (+ sub-resources)',
        'Evaluated directly on resource properties',
        'Applies directly (`ReadOnly` beats `CanNotDelete`)',
        'Up to 50 key-value pairs per resource directly'
      ]
    ],
    proTip: 'Double-trap alert: (1) **Tags NEVER inherit** without an Azure Policy `Modify` rule; (2) **Resource Locks CANNOT be assigned at a Management Group**—only at Subscription, Resource Group, or Resource!'
  },
  {
    id: 'cheat-entra-rbac-policy',
    title: '5. Microsoft Entra Roles vs. Azure RBAC vs. Azure Policy',
    subtitle: 'Never confuse tenant identity administration, ARM action permissions, and resource property compliance.',
    track: 'Both',
    headers: [
      'Dimension',
      'Microsoft Entra Roles',
      'Azure RBAC Roles',
      'Azure Policy'
    ],
    rows: [
      [
        'Core Question Answered',
        '"Who can manage users, groups, domains & enterprise apps?"',
        '"Who can perform control/data actions on Azure cloud resources?"',
        '"What resource configurations, SKUs & regions are allowed to exist?"'
      ],
      [
        'Control Plane',
        'Microsoft Entra ID (Graph API / Identity Plane)',
        'Azure Resource Manager (ARM API + `DataActions`)',
        'Azure Resource Manager (ARM Governance Engine)'
      ],
      [
        'Assignment Scopes',
        'Tenant-wide, Administrative Unit (AU), or single Entra object',
        'Management Group -> Subscription -> Resource Group -> Resource',
        'Management Group -> Subscription -> Resource Group (with resource exclusions)'
      ],
      [
        'Built-in Examples',
        '`Global Administrator`, `User Administrator`, `Billing Administrator`',
        '`Owner`, `Contributor`, `Reader`, `User Access Administrator`, `Storage Blob Data Reader`',
        '`Allowed locations`, `Allowed virtual machine size SKUs`, `Require a tag on resources`'
      ],
      [
        'Precedence / Override Trap',
        'Does NOT grant Azure Subscription access by default unless elevated at root!',
        'Additive union (`Actions - NotActions`); blocked by Deny Assignments, Locks & Policy!',
        'Evaluates resource JSON regardless of caller—a `Deny` policy blocks even a Subscription `Owner`!'
      ]
    ],
    proTip: 'If an exam prompt asks to *"allow Helpdesk to reset user passwords only for the Tokyo office"*, combine an **Entra Administrative Unit (AU)** with the Entra **`Password Administrator`** role—not Azure RBAC!'
  },
  {
    id: 'cheat-defense-and-sla',
    title: '6. Defense-in-Depth 7 Layers & Composite SLA Quick Reference',
    subtitle: 'Outside-in security onion layers paired with Microsoft’s canonical SLA ladder and composite math.',
    track: 'AZ-900',
    headers: [
      'Defense Layer (Outside -> Inside)',
      'Primary Azure Controls',
      'Reference Architecture / Tier',
      'Guaranteed SLA & Math Rule'
    ],
    rows: [
      [
        '1. Physical Security',
        'Biometric access, 24/7 guards, mantraps, seismic racks (Microsoft-owned)',
        'Free Tiers (e.g., App Service F1) & Private/Public Preview',
        '0% (NO SLA — drops any serial composite path to 0%!)'
      ],
      [
        '2. Identity & Access',
        'Microsoft Entra ID, Conditional Access, MFA, PIM, Azure RBAC',
        'Single VM (Standard HDD / Standard SSD / Premium SSD)',
        '95% (Std HDD) -> 99.5% (Std SSD) -> 99.9% (Premium SSD / Ultra on ALL disks)'
      ],
      [
        '3. Perimeter',
        'Azure DDoS Protection (Network/IP tiers), Azure Firewall edge',
        '2+ VMs in an Availability Set (Fault + Update Domains in 1 DC)',
        '99.95% VM Connectivity SLA'
      ],
      [
        '4. Network',
        'VNet segmentation, NSGs, ASGs, Private Link, UDRs -> NVA',
        '2+ VMs deployed across 2+ Availability Zones in 1 Region',
        '99.99% VM Connectivity SLA (~52.6 min max downtime/year)'
      ],
      [
        '5. Compute',
        'Azure Bastion (no public RDP/SSH), JIT VM Access, Endpoint Defender, Patching',
        'Serial Dependency Math (Web 99.9% -> API 99.9%)',
        'Multiply decimals: `0.999 × 0.999 = 99.8001%` (always LOWER than weakest link!)'
      ],
      [
        '6. Application',
        'Application Gateway / Front Door WAF, Key Vault secrets (zero hardcoded keys), TLS',
        'Serial Dependency Math (Web App 99.95% -> SQL DB 99.99%)',
        'Multiply decimals: `0.9995 × 0.9999 = 99.940005%` (~99.94%)'
      ],
      [
        '7. Data (Innermost Core)',
        'Storage Service Encryption (SSE), SQL TDE, Disk Encryption, Purview labels',
        'Parallel Active-Active Redundancy (2 independent 99.9% regions)',
        '`1 - ((1 - 0.999) × (1 - 0.999)) = 99.9999%` (redundancy RAISES SLA!)'
      ]
    ],
    proTip: 'Memorize the 7 layers mnemonic **"Please Ignore Petty Network Complaints About Data"**: **P**hysical -> **I**dentity & Access -> **P**erimeter -> **N**etwork -> **C**ompute -> **A**pplication -> **D**ata!'
  }
];
