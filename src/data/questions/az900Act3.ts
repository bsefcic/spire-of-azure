import type { ExamQuestion } from '../../types/curriculum';

export const AZ900_ACT3_QUESTIONS: ExamQuestion[] = [
  {
    id: 'az900-a3-001',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Cost Factors',
    difficulty: 1,
    format: 'single',
    prompt: 'Which combination of primary factors directly determines the monthly cost of running a resource in Azure?',
    options: [
      'The number of Microsoft Entra ID users, the browser used to access the Azure Portal, and the number of resource groups',
      'The number of Azure Policy assignments, the length of resource names, and the count of applied metadata tags',
      'Resource type, consumption meters, maintenance/operational footprint, and Azure geography',
      'The number of management groups, Activity Log retention defaults, and Azure Advisor recommendations'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Think about the same core billing drivers as cloud compute/storage meters: SKU size, metered usage hours/GB, and regional power/real-estate pricing.',
    explanation: 'Azure costs are primarily driven by resource type (fixed meters tracked per service SKU), consumption (pay-as-you-go usage or reserved commitment), maintenance (active vs. deallocated footprint), and geography (local labor, taxes, power, and infrastructure costs vary across regions). Resource groups, tags, management groups, and standard Azure Policy evaluations are free.',
    awsComparison: 'Just like AWS where IAM users, Resource Groups, and cost allocation tags are free while EC2 instance family, runtime hours, and AWS Region dictate pricing, Azure bills for metered resource SKUs and regional infrastructure rates.'
  },
  {
    id: 'az900-a3-002',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Network Bandwidth Billing',
    difficulty: 1,
    format: 'single',
    prompt: 'How does Azure bill for standard internet network data transfer into and out of an Azure datacenter?',
    options: [
      'Inbound data transfer (ingress) is always free, while outbound data transfer (egress) is billed based on tiered billing zones',
      'Outbound data transfer (egress) is always free, while inbound data transfer (ingress) is billed per gigabyte',
      'Both inbound and outbound internet data transfers are billed equally at a flat global rate',
      'All network data transfer into and out of Azure datacenters is completely free regardless of destination'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Cloud providers make it free to move your data in, and meter bandwidth when data leaves their backbone to the public internet.',
    explanation: 'In Azure, all inbound data transfer (data ingress going into Azure datacenters) is free. Outbound data transfer (data egress leaving Azure datacenters) is metered per GiB after a small monthly free allowance, with rates determined by the source Billing Zone.',
    awsComparison: 'Identical to AWS data transfer pricing: data transfer IN from the internet to EC2/S3 is $0.00/GB, whereas data transfer OUT to the internet is billed on a tiered per-GB schedule by region.'
  },
  {
    id: 'az900-a3-003',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Billing Zones',
    difficulty: 2,
    format: 'single',
    prompt: 'In the context of Azure cost management, what is the purpose of an Azure Billing Zone?',
    options: [
      'To isolate mission-critical virtual machines from single-datacenter power and cooling failures',
      'To enforce sovereign data residency laws so customer data never leaves a country',
      'To divide a single subscription into separate departmental invoices',
      'To group Azure geographies into pricing tiers for calculating outbound network bandwidth charges'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Do not confuse physical Availability Zones with continental bandwidth pricing tiers.',
    explanation: 'A Billing Zone is solely a geographical grouping of Azure regions (such as Zone 1 covering North America and Europe, Zone 2 covering Asia Pacific, etc.) used to calculate outbound data transfer (egress) pricing. It provides zero high-availability or fault-tolerance guarantees.',
    awsComparison: 'Unlike Availability Zones (which map to AWS AZs for fault isolation), Azure Billing Zones correspond to the regional continental tables in the AWS Data Transfer pricing sheet.'
  },
  {
    id: 'az900-a3-004',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Cost Factors',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'For each of the following statements regarding Azure cost behavior, select Yes if the statement is true or No if it is false.',
    statements: [
      {
        statement: 'Shutting down a virtual machine from within its guest operating system stops Azure compute charges immediately.',
        answer: false
      },
      {
        statement: 'Deploying the exact same virtual machine SKU in two different Azure regions can result in two different hourly prices.',
        answer: true
      },
      {
        statement: 'Creating additional resource groups to organize workloads incurs a flat monthly management fee per resource group.',
        answer: false
      }
    ],
    awsBridgeHint: 'Guest OS shutdown in Azure does NOT release the underlying hypervisor hardware allocation! Also check whether logical containers cost money.',
    explanation: 'Shutting down a VM inside Windows or Linux puts it in the "Stopped" state where hardware remains reserved and compute continues to be billed; you must stop it via Azure (Portal, CLI, or PowerShell) so it reaches "Stopped (deallocated)" to halt compute billing. Regional pricing varies by local electricity/tax/real-estate costs, and resource groups themselves are always free.',
    awsComparison: 'Major AWS-to-Azure trap! In AWS, running `sudo shutdown -h now` inside an EBS-backed EC2 instance usually transitions it to `stopped` and halts compute billing. In Azure, an OS-level shutdown leaves the VM `Stopped` (still billed for compute!) until you explicitly deallocate it via the Azure control plane (`az vm deallocate`).'
  },
  {
    id: 'az900-a3-005',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'VM Deallocation Billing',
    difficulty: 2,
    format: 'single',
    prompt: 'An administrator stops an Azure Virtual Machine from the Azure Portal, and its status changes to "Stopped (deallocated)". Which charges continue to accrue while the virtual machine remains in this state?',
    options: [
      'Virtual CPU and RAM compute hours only',
      'Managed OS and data disk storage charges (plus any static reserved Public IP addresses)',
      'Outbound internet bandwidth charges at the peak hourly rate',
      'Zero charges of any kind; all associated storage and networking resources become free while deallocated'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Releasing hypervisor compute slots stops hourly instance charges, but persistent block volumes and static IPs still sit on storage/network racks.',
    explanation: 'When a VM is in the "Stopped (deallocated)" state, Azure releases the physical compute hardware and stops billing for vCPU/RAM compute hours (and dynamic OS licenses). However, you continue to pay for provisioned Managed Disks (OS and data disks) and any static Public IP addresses attached to the NIC.',
    awsComparison: 'Exact match to a stopped EC2 instance in AWS: EC2 hourly compute charges stop, while attached EBS volumes ($/GB-month) and allocated Elastic IP addresses continue billing.'
  },
  {
    id: 'az900-a3-006',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Orphaned Resource Costs',
    difficulty: 2,
    format: 'single',
    prompt: 'A developer deletes a test Azure Virtual Machine without checking the option to delete its associated resources. Which leftover resource will continue generating monthly storage charges?',
    options: [
      'The empty resource group that previously held the virtual machine',
      'The Network Security Group rules associated with the subnet',
      'The unattached Managed Disk that stored the virtual machine operating system',
      'The Activity Log entries recording the virtual machine deletion'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Think of an EBS volume where DeleteOnTermination was left false.',
    explanation: 'Managed Disks are billed based on provisioned disk tier and size regardless of whether they are attached to a running VM. Resource groups, NSGs, and 90-day Activity Log retention do not incur standalone monthly storage charges.',
    awsComparison: 'Equivalent to orphaned EBS volumes left behind when an EC2 instance is terminated without `DeleteOnTermination: true`.'
  },
  {
    id: 'az900-a3-007',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Cost Optimization Actions',
    difficulty: 2,
    format: 'multi',
    prompt: 'A cloud administrator wants to reduce monthly Azure operational expenses immediately without deleting production data. Which TWO actions will directly lower ongoing Azure charges?',
    options: [
      'Configure auto-shutdown schedules to deallocate non-production virtual machines outside business hours',
      'Move all resources from five separate resource groups into a single consolidated resource group',
      'Right-size underutilized virtual machines to smaller SKUs recommended by Azure Advisor',
      'Apply a "CostCenter" tag to every virtual machine in the production subscription'
    ],
    correctIndices: [0, 2],
    selectCount: 2,
    awsBridgeHint: 'Focus on actions that reduce metered compute hours or downsize over-provisioned instance types rather than free organizational metadata.',
    explanation: 'Deallocating idle non-production VMs stops compute billing during nights/weekends, and right-sizing over-provisioned VMs to smaller SKUs lowers the hourly compute rate. Consolidating resource groups and applying tags help organize governance and reporting, but neither changes metered billing.',
    awsComparison: 'Matches using AWS Instance Scheduler + AWS Compute Optimizer recommendations, whereas tagging and AWS Resource Groups only organize Cost Explorer views.'
  },
  {
    id: 'az900-a3-008',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Free Account',
    difficulty: 1,
    format: 'single',
    prompt: 'What is included when a new customer signs up for a standard Azure Free Account?',
    options: [
      'Unlimited access to all Azure virtual machine SKUs for 30 days with automatic conversion to Pay-As-You-Go billing on day 31',
      'A fixed monetary credit valid for the first 30 days, 12 months of popular free services, and ongoing access to a set of Always Free services',
      'A 3-year Azure Reservation discount applied automatically across up to ten production subscriptions',
      'Free unlimited outbound internet data transfer for the lifetime of the Microsoft Entra tenant'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Azure combines a 30-day starter credit with 12-month free-tier allowances and permanent Always Free micro-services.',
    explanation: 'The Azure Free Account provides $200 USD (or local currency equivalent) in Azure credit to spend during the first 30 days, free monthly quotas of popular services (such as B1s VMs, Blob Storage, SQL Database) for 12 months, and 55+ Always Free services (with capped limits). Azure never charges your card after the credit/30 days expire unless you explicitly upgrade to Pay-As-You-Go.',
    awsComparison: 'Similar to the AWS Free Tier (12-month free + Always Free + new short-term credits), with an explicit safety rail: Azure disables the free subscription when the 30-day credit ends rather than silently billing overages unless you opt in to upgrade.'
  },
  {
    id: 'az900-a3-009',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Free Account Rules',
    difficulty: 1,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding the Azure Free Account. Select Yes if true, or No if false.',
    statements: [
      {
        statement: 'Unused starter credit from the Azure Free Account rolls over into the second month after the initial 30-day period ends.',
        answer: false
      },
      {
        statement: 'A credit or debit card is required for identity verification when creating an Azure Free Account, even though you are not charged automatically unless you upgrade.',
        answer: true
      },
      {
        statement: 'Services categorized as "Always Free" remain free up to their specified monthly usage limits even after upgrading to a Pay-As-You-Go subscription.',
        answer: true
      }
    ],
    awsBridgeHint: 'Starter credits have a strict 30-day expiration cliff, identity verification prevents bot abuse, and Always Free quotas persist.',
    explanation: 'Any unused portion of the $200 starter credit expires strictly at the end of 30 days and cannot roll over. A phone number and credit/debit card (not prepaid) are used for identity verification, with no automatic charges unless you manually upgrade to Pay-As-You-Go. Always Free tier allowances continue within their monthly thresholds.',
    awsComparison: 'Unlike AWS Free Tier where exceeding a limit immediately bills your card on a standard account, Azure starts Free Accounts with a spending limit lock ($0 charge cap) until you manually remove it by upgrading.'
  },
  {
    id: 'az900-a3-010',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Inter-Region & Peering Costs',
    difficulty: 2,
    format: 'single',
    prompt: 'Two Azure Virtual Networks located in East US and West Europe are connected using Global VNet Peering. How is traffic between virtual machines across this peering connection billed?',
    options: [
      'Only outbound traffic from East US is billed; inbound traffic into West Europe is free',
      'All private backbone traffic between peered Azure Virtual Networks is completely free worldwide',
      'A fixed monthly gateway uptime fee is charged, with zero per-gigabyte bandwidth charges',
      'Both inbound and outbound data transfer across the VNet peering link are metered per gigabyte'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Peering two virtual networks charges per-GB on BOTH ends (ingress and egress across the peering boundary), with no hourly gateway fee.',
    explanation: 'VNet Peering (both regional and global) has no upfront or hourly gateway fee, but both ingress and egress traffic traversing the VNet peering link are billed per GiB (with Global VNet Peering across regions priced higher than intra-region VNet Peering).',
    awsComparison: 'Matches AWS VPC Peering (especially inter-region VPC peering) where data transfer is metered across the peering boundary without an hourly Transit Gateway attachment fee.'
  },
  {
    id: 'az900-a3-011',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Marketplace Billing',
    difficulty: 1,
    format: 'single',
    prompt: 'A company deploys a third-party network virtual appliance from the Azure Marketplace into its Pay-As-You-Go subscription. How is this deployment typically billed?',
    options: [
      'Both the underlying Azure infrastructure consumption and the third-party vendor software license fee appear consolidated on the Azure invoice (unless using Bring-Your-Own-License)',
      'Azure bills only for the virtual network, while compute is free for all Azure Marketplace images',
      'Third-party Azure Marketplace solutions can only be deployed in Enterprise Agreement subscriptions',
      'All Azure Marketplace images include third-party software support and licensing at zero additional cost over base Linux compute'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think of deploying a Palo Alto or Fortinet PAYG AMI from the cloud marketplace.',
    explanation: 'When deploying a Pay-As-You-Go third-party appliance from Azure Marketplace, Azure bills for both the underlying Azure infrastructure (VM compute, storage, bandwidth) and the ISV software meter on your Azure bill—unless you choose a Bring-Your-Own-License (BYOL) SKU where you license software directly from the vendor.',
    awsComparison: 'Identical to AWS Marketplace PAYG vs. BYOL AMIs where EC2 infrastructure charges and third-party vendor hourly software charges appear together on your AWS bill.'
  },
  {
    id: 'az900-a3-012',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Subscription Purchasing Channels',
    difficulty: 2,
    format: 'single',
    prompt: 'A mid-sized business wants an external Microsoft partner to manage its Azure infrastructure, handle support escalations, and provide unified monthly billing. Which Azure purchasing channel best fits this requirement?',
    options: [
      'Azure Free Trial via Web Direct',
      'Cloud Solution Provider (CSP) program',
      'Visual Studio Dev/Test Individual Subscription',
      'Microsoft Service Trust Portal'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Which purchasing channel lets a certified partner own billing, provisioning, and first-line support on your behalf?',
    explanation: 'Through the Cloud Solution Provider (CSP) program, certified Microsoft partners provision, manage, support, and directly bill customers for Azure and Microsoft cloud services, making it ideal for organizations wanting partner-managed cloud operations.',
    awsComparison: 'Equivalent to the AWS Solution Provider Program (SPP) / Partner-led billing where an AWS Consulting Partner manages your AWS Organization billing and Tier-1 support.'
  },
  {
    id: 'az900-a3-013',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Pricing Calculator',
    difficulty: 1,
    format: 'single',
    prompt: 'Before deploying a new cloud-native application consisting of two App Service plans, an Azure SQL Database, and an Azure Storage account, an architect wants an itemized estimate of expected monthly Azure charges. Which tool should be used?',
    options: [
      'Microsoft Cost Management Cost Analysis',
      'Total Cost of Ownership (TCO) Calculator',
      'Azure Pricing Calculator',
      'Azure Advisor'
    ],
    correctIndices: [2],
    awsBridgeHint: 'You have not deployed anything yet and you are not comparing against an existing physical server room—you just want a bill of materials estimate.',
    explanation: 'The Azure Pricing Calculator is a free web-based tool used to configure prospective Azure SKUs, regions, tiers, and billing options (Pay-As-You-Go, Reservations, Savings Plans, Hybrid Benefit) to estimate expected monthly cloud costs before provisioning resources.',
    awsComparison: 'Direct equivalent to the AWS Pricing Calculator (calculator.aws) for building pre-deployment architecture estimates.'
  },
  {
    id: 'az900-a3-014',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'TCO Calculator',
    difficulty: 1,
    format: 'single',
    prompt: 'A Chief Financial Officer asks for a 3-year financial justification comparing the company’s existing physical servers—including datacenter electricity, cooling, SAN storage, and IT hardware maintenance—against migrating those workloads to Azure. Which tool provides this report?',
    options: [
      'Azure Pricing Calculator',
      'Microsoft Cost Management Budgets',
      'Azure Resource Graph Explorer',
      'Total Cost of Ownership (TCO) Calculator'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Whenever an exam question mentions comparing on-premises power, cooling, rack space, and IT labor against migrating to the cloud, only one calculator fits.',
    explanation: 'The Total Cost of Ownership (TCO) Calculator estimates the cost savings you can realize by migrating on-premises workloads to Azure over a 1-to-5-year timeframe, factoring in hidden on-premises expenses like electricity, cooling, real estate, networking, storage, and IT labor.',
    awsComparison: 'Maps to AWS Migration Evaluator (formerly TSO Logic) used to build executive business cases comparing on-premises TCO against cloud run rates.'
  },
  {
    id: 'az900-a3-015',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Cost Estimation vs Monitoring Tools',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Determine whether each statement accurately describes Azure cost estimation and tracking tools. Select Yes or No.',
    statements: [
      {
        statement: 'You must sign in with an active paid Azure Enterprise Agreement subscription before you can access the Azure Pricing Calculator.',
        answer: false
      },
      {
        statement: 'The Total Cost of Ownership (TCO) Calculator allows you to adjust underlying assumptions for local electricity rates and IT labor costs.',
        answer: true
      },
      {
        statement: 'Microsoft Cost Management tracks actual historical and forecasted spend for resources already running in your Azure subscriptions.',
        answer: true
      }
    ],
    awsBridgeHint: 'Pre-deployment web calculators are publicly accessible without paid contracts, whereas Cost Management analyzes real subscription telemetry.',
    explanation: 'Both the Azure Pricing Calculator and TCO Calculator are publicly available web tools requiring no paid Azure subscription. TCO Calculator follows three steps (Define workloads, Adjust assumptions like power/labor, View report). Microsoft Cost Management analyzes actual metered spend and forecasts inside active Azure subscriptions.',
    awsComparison: 'Pricing Calculator = public AWS Pricing Calculator; TCO Calculator = Migration Evaluator; Microsoft Cost Management = AWS Cost Explorer + AWS Budgets.'
  },
  {
    id: 'az900-a3-016',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Reservations',
    difficulty: 1,
    format: 'single',
    prompt: 'A company runs a steady-state production database on a specific virtual machine SKU in East US 2 that will remain unchanged 24/7 for the next three years. Which purchasing option provides the deepest compute discount (up to 72%) over Pay-As-You-Go rates?',
    options: [
      'Azure Reservations (Reserved Virtual Machine Instances)',
      'Azure Spot Virtual Machines',
      'Microsoft Cost Management Budgets',
      'Consumption-based serverless scaling'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Steady 24/7 predictable capacity pinned to a specific instance family and region for 1 or 3 years—and cannot tolerate eviction!',
    explanation: 'Azure Reservations offer discounts of up to 72% compared to Pay-As-You-Go prices when you commit to a 1-year or 3-year term for specific resource SKUs (such as Reserved VM Instances, Azure SQL Database, Cosmos DB, or Blob Storage capacity) in a designated region. Spot VMs offer steep discounts up to 90% but can be evicted at any time, making them unsuitable for a 24/7 production database.',
    awsComparison: 'Direct match to AWS Standard Reserved Instances (1-year or 3-year commitment pinned to instance family and region for maximum discount).'
  },
  {
    id: 'az900-a3-017',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Savings Plans for Compute',
    difficulty: 2,
    format: 'single',
    prompt: 'An engineering organization commits to spending $25 per hour on Azure compute for three years, but its teams frequently migrate workloads across Azure regions and switch between Virtual Machines, Azure Container Instances, and Azure App Service Premium plans. Which cost-saving option automatically applies discounts across all of these shifts?',
    options: [
      'Azure Spot Virtual Machines',
      'Azure Hybrid Benefit',
      'Azure Savings Plans for Compute',
      'Total Cost of Ownership (TCO) Calculator'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Think of committing to a flat $/hour spend rather than locking into a single VM family and region.',
    explanation: 'Azure Savings Plans for Compute save up to 65% off Pay-As-You-Go prices by committing to a fixed hourly spend (e.g., $/hour for 1 or 3 years). Discounts automatically apply across compute services (VMs, Dedicated Host, Container Instances, Azure Functions Premium, App Service Premium v3) regardless of region, instance family, or OS.',
    awsComparison: 'Exact 1:1 equivalent to AWS Compute Savings Plans ($/hr commitment that floats seamlessly across EC2 families, regions, OSs, Fargate, and Lambda).'
  },
  {
    id: 'az900-a3-018',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Reservations vs Savings Plans',
    difficulty: 2,
    format: 'single',
    prompt: 'How do Azure Reservations differ from Azure Savings Plans for Compute?',
    options: [
      'Azure Reservations are billed per second with zero term commitment, whereas Savings Plans require a 5-year contract',
      'Azure Reservations provide slightly higher maximum discounts (up to 72%) for fixed SKU/region workloads, whereas Savings Plans offer greater flexibility across regions and compute services (up to 65%)',
      'Azure Savings Plans cover Azure Blob Storage and Cosmos DB, whereas Azure Reservations apply exclusively to Linux virtual machines',
      'Azure Reservations automatically delete unused virtual machines, whereas Savings Plans pause them'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Compare Standard Reserved Instances (higher discount, rigid scope, also exists for DB/Storage) vs Compute Savings Plans (slightly lower max discount, flexible compute scope).',
    explanation: 'Azure Reservations give the highest discount (up to 72%) when your VM family and region are predictable—and Reservations also exist for non-compute services like SQL Database, Cosmos DB, and Storage. Azure Savings Plans for Compute offer up to 65% savings in exchange for dynamic flexibility across regions, VM series, and eligible compute runtimes.',
    awsComparison: 'Mirrors the AWS Standard RI / RDS RI / DynamoDB Reserved Capacity vs. AWS Compute Savings Plan trade-off.'
  },
  {
    id: 'az900-a3-019',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Hybrid Benefit',
    difficulty: 1,
    format: 'single',
    prompt: 'An enterprise owns on-premises Windows Server and SQL Server licenses covered by active Software Assurance (or qualifying subscriptions). Which program allows the company to apply these existing licenses to Azure to eliminate duplicate software licensing fees?',
    options: [
      'Microsoft Purview Compliance Manager',
      'Azure Service Health',
      'Azure Arc',
      'Azure Hybrid Benefit'
    ],
    correctIndices: [3],
    awsBridgeHint: 'First-party Microsoft advantage: bring your existing Software Assurance licenses so you only pay the base Linux/compute rate in Azure!',
    explanation: 'Azure Hybrid Benefit lets organizations reuse existing on-premises Windows Server and SQL Server licenses with active Software Assurance (as well as Red Hat Enterprise Linux and SUSE Linux subscriptions) on Azure VMs and Azure SQL, reducing Windows VM software costs down to the base Linux compute rate.',
    awsComparison: 'Comparable to License Mobility / BYOL on AWS Dedicated Hosts, except in Azure you can apply Azure Hybrid Benefit directly on standard shared-tenant VMs and PaaS Azure SQL without needing dedicated physical hosts!'
  },
  {
    id: 'az900-a3-020',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Stacking Discounts',
    difficulty: 2,
    format: 'multi',
    prompt: 'A solutions architect is optimizing costs for a fleet of Windows Server virtual machines that will run continuously for three years. Which TWO cost-saving mechanisms can be stacked together on the exact same virtual machines to achieve up to 80%+ total savings?',
    options: [
      'Azure Spot Virtual Machine pricing',
      '3-year Azure Reserved Virtual Machine Instances',
      'Azure Free Account 30-day starter credits',
      'Azure Hybrid Benefit using Windows Server licenses with Software Assurance'
    ],
    correctIndices: [1, 3],
    selectCount: 2,
    awsBridgeHint: 'One discounts the underlying hardware compute rate for 3 years; the other zeroes out the Windows OS software surcharge.',
    explanation: 'Azure Reservations discount the base compute infrastructure rate (up to 72%), while Azure Hybrid Benefit covers the Windows Server or SQL Server software licensing component. Combining both on the same workload yields up to 80–85% total savings compared to full Pay-As-You-Go Windows pricing.',
    awsComparison: 'In AWS, Windows EC2 RIs bundle OS + hardware together at a smaller percentage discount unless you manage Dedicated Hosts for BYOL; in Azure, stacking RIs + Hybrid Benefit is a flagship exam topic.'
  },
  {
    id: 'az900-a3-021',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Microsoft Cost Management Cost Analysis',
    difficulty: 1,
    format: 'single',
    prompt: 'A finance manager wants to visualize the current month’s accumulated Azure spend broken down by "Department" tag, resource group, and service meter, as well as view a forecast for the end of the billing cycle. Which feature should they open?',
    options: [
      'Cost Analysis in Microsoft Cost Management',
      'Total Cost of Ownership (TCO) Calculator',
      'Microsoft Service Trust Portal',
      'Azure Resource Health'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think of interactive charts showing actual month-to-date spend, end-of-month forecasts, and group-by tag filters.',
    explanation: 'Cost Analysis inside Microsoft Cost Management lets you explore, aggregate, filter, and group actual and forecasted Azure costs by subscription, resource group, service name, location, or resource tag.',
    awsComparison: 'Direct equivalent to AWS Cost Explorer (interactive charts, group-by tags/linked accounts, and month-end spend forecasting).'
  },
  {
    id: 'az900-a3-022',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Cost Alerts & Budgets',
    difficulty: 2,
    format: 'single',
    prompt: 'An engineering lead configures a $5,000 monthly budget in Microsoft Cost Management with email alerts set at 80% actual spend and 100% forecasted spend. By default, what happens if resources in the subscription reach $5,001 in charges?',
    options: [
      'Azure Resource Manager automatically deallocates all running virtual machines in the subscription',
      'Azure places a ReadOnly resource lock on every resource group until the next billing cycle',
      'Configured alert recipients are notified (and any linked Action Group triggers fire), while resources continue running normally',
      'Azure deletes the most recently created resources until monthly spend drops below $5,000'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Budgets notify humans and webhooks by default—they do NOT pull the plug on production databases out of the box!',
    explanation: 'By default, Microsoft Cost Management budgets generate cost alerts (emails) when actual or forecasted thresholds are crossed; they do NOT automatically stop or block Azure resources unless you explicitly wire an Azure Monitor Action Group to execute custom automation (such as an Azure Automation runbook or Logic App).',
    awsComparison: 'Identical to AWS Budgets: crossing 100% sends SNS/email notifications by default, and only enforces changes if you explicitly attach Budget Actions.'
  },
  {
    id: 'az900-a3-023',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Cost Alerts Types',
    difficulty: 3,
    format: 'yes-no',
    prompt: 'For each statement regarding Microsoft Cost Management alert types and cost controls, select Yes if true or No if false.',
    statements: [
      {
        statement: 'Budget alerts can be triggered based on either actual accumulated spend or forecasted spend thresholds.',
        answer: true
      },
      {
        statement: 'Credit alerts are generated automatically when Enterprise Agreement monetary prepayments (Azure Prepayment) are consumed.',
        answer: true
      },
      {
        statement: 'Azure Reservations are pure billing discounts and therefore automatically guarantee physical compute capacity in a region even if zero virtual machines are currently deployed.',
        answer: false
      }
    ],
    awsBridgeHint: 'Check all three statements carefully: Budget alerts support actual + forecasted; EA prepayments trigger credit alerts; Standard Reservations are a billing discount, not an On-Demand Capacity Reservation!',
    explanation: 'Microsoft Cost Management supports three alert types: Budget alerts (actual or forecasted thresholds), Credit alerts (when EA Azure Prepayment credits reach 90%/100%), and Department spending quota alerts. Note an important nuance: Azure Reservations provide a *billing discount* (prioritizing capacity slightly, whereas dedicated physical slot reservation without running VMs requires On-Demand Capacity Reservations).',
    awsComparison: 'Same subtle distinction as AWS: Regional Reserved Instances / Savings Plans are billing discounts, whereas AWS On-Demand Capacity Reservations (ODCRs) actually reserve physical hypervisor slots.'
  },
  {
    id: 'az900-a3-024',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Spot Virtual Machines',
    difficulty: 1,
    format: 'single',
    prompt: 'A media studio runs stateless nightly video-rendering batch jobs that can pause and resume safely if interrupted. Which purchasing option offers up to 90% savings by utilizing unused Azure compute capacity?',
    options: [
      'Azure Dedicated Host',
      'Azure Spot Virtual Machines',
      '1-year Azure Savings Plan for Compute',
      'On-Demand Capacity Reservation'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Stateless, interruptible batch jobs tapping spare datacenter capacity at up to 90% off.',
    explanation: 'Azure Spot Virtual Machines let you purchase unused Azure compute capacity at deep discounts (up to 90% compared to Pay-As-You-Go). If Azure needs the capacity back or the price exceeds your max threshold, the VM is evicted with a 30-second notice, making Spot ideal for batch jobs, rendering, and stateless dev/test.',
    awsComparison: 'Equivalent to AWS EC2 Spot Instances (up to 90% discount on spare capacity, with a 30-second eviction notice in Azure vs. 2-minute interruption notice in AWS).'
  },
  {
    id: 'az900-a3-025',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Cost Exports',
    difficulty: 2,
    format: 'single',
    prompt: 'A FinOps team needs raw daily usage and billing CSV/Parquet files delivered automatically every morning for ingestion into an external financial warehouse. Which Microsoft Cost Management capability should they configure?',
    options: [
      'Azure Pricing Calculator saved estimates',
      'Service Trust Portal audit downloads',
      'Azure Resource Locks',
      'Scheduled Exports to an Azure Storage account'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Think of automated daily billing file delivery into object storage.',
    explanation: 'The Exports feature in Microsoft Cost Management lets you schedule automatic daily, weekly, or monthly delivery of detailed cost and usage datasets directly into an Azure Blob Storage container in CSV or Parquet format.',
    awsComparison: 'Direct counterpart to AWS Cost and Usage Reports (CUR) / Data Exports automatically delivered to an S3 bucket.'
  },
  {
    id: 'az900-a3-026',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Resource Tags',
    difficulty: 1,
    format: 'single',
    prompt: 'What is the primary purpose of applying tags (such as `Environment: Production` and `CostCenter: 4410`) to Azure resources?',
    options: [
      'To attach custom key-value metadata for logical organization, cost allocation, and operational automation across resource groups',
      'To encrypt virtual machine disks using customer-managed keys',
      'To assign role-based access control permissions directly to external guest users',
      'To replicate storage data synchronously across three Availability Zones'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Key-value pairs used for chargeback reporting, ownership tracking, and automation scripts.',
    explanation: 'Resource tags are arbitrary name-value text pairs applied to Azure resources, resource groups, and subscriptions. They allow organizations to logically categorize resources across different resource groups for Microsoft Cost Management chargeback, governance reporting, and automation.',
    awsComparison: 'Identical to AWS Resource Tags + Cost Allocation Tags.'
  },
  {
    id: 'az900-a3-027',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Tag Inheritance Trap',
    difficulty: 2,
    format: 'single',
    prompt: 'An administrator applies the tag `Department: Finance` to a resource group named `rg-finance-prod` that already contains ten virtual machines and two storage accounts. By default, which resources now have the `Department: Finance` tag?',
    options: [
      'All ten virtual machines, both storage accounts, and `rg-finance-prod` immediately',
      'Only newly created resources added to `rg-finance-prod` after the tag was applied',
      'Only the `rg-finance-prod` resource group itself; child resources do not inherit tags automatically',
      'Every resource group and resource across the entire parent subscription'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Classic Microsoft exam trap! Unlike RBAC, Policy, and Locks, metadata tags do NOT trickle down by default!',
    explanation: 'Tags applied to a subscription or resource group are NOT inherited by child resources by default. Only `rg-finance-prod` itself receives the tag unless you assign an Azure Policy (such as "Inherit a tag from the resource group") to copy it onto child resources.',
    awsComparison: 'Huge governance exam favorite: in Azure, RBAC, Azure Policy, and Resource Locks all inherit down the scope hierarchy automatically, whereas Tags NEVER inherit automatically without Azure Policy.'
  },
  {
    id: 'az900-a3-028',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Enforcing & Inheriting Tags',
    difficulty: 2,
    format: 'single',
    prompt: 'How can a cloud governance team ensure that every new resource created inside a resource group automatically copies the `CostCenter` tag from its parent resource group?',
    options: [
      'Enable ReadOnly resource locks at the management group scope',
      'Assign a built-in `Modify` or `Append` definition in Azure Policy (such as "Inherit a tag from the resource group if missing")',
      'Upgrade Microsoft Entra ID to Governance P2 and enable Privileged Identity Management',
      'Configure an Azure Service Health advisory alert'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Since tags do not inherit natively, which Azure governance engine mutates or enforces resource properties during ARM deployment?',
    explanation: 'Azure Policy includes built-in definitions such as "Require a tag on resources" (Deny effect) and "Inherit a tag from the resource group if missing" (Modify effect + remediation task for existing resources) to enforce tagging standards and automate tag inheritance.',
    awsComparison: 'In AWS Organizations, Tag Policies validate tag case/values (with SCPs blocking untagged creation), whereas Azure Policy can actively inject/inherit missing parent tags inline via its `Modify` effect!'
  },
  {
    id: 'az900-a3-029',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Resource Tag Rules & Limits',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Review each statement about Azure resource tags. Select Yes if true, or No if false.',
    statements: [
      {
        statement: 'Each Azure resource or resource group can have up to 50 tag name-value pairs applied directly.',
        answer: true
      },
      {
        statement: 'A single Azure resource can belong to multiple resource groups simultaneously if they share the same tag.',
        answer: false
      },
      {
        statement: 'Tags can be used in Microsoft Cost Management to filter and group charges across resources located in different resource groups.',
        answer: true
      }
    ],
    awsBridgeHint: 'Remember the 50-tag limit, the strict 1-resource-group-per-resource rule, and cross-RG cost grouping.',
    explanation: 'Azure supports up to 50 tags directly per resource/resource group/subscription. Every Azure resource can exist in ONE and only one resource group, which is why tags are essential for cross-cutting cost and operational views across multiple resource groups.',
    awsComparison: 'Matches AWS’s 50 user-defined tags per resource limit! Note that while AWS Resource Groups are tag-query views, an Azure Resource Group is a mandatory single-parent lifecycle container.'
  },
  {
    id: 'az900-a3-030',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Governance Scope Hierarchy',
    difficulty: 1,
    format: 'sequence',
    prompt: 'Arrange the four levels of the Azure management scope hierarchy in order from the broadest (top) scope to the narrowest (bottom) scope.',
    correctSequence: [
      'Management groups',
      'Subscriptions',
      'Resource groups',
      'Resources'
    ],
    awsBridgeHint: 'Start at the multi-account organizational folder level, move to the billing/account boundary, then the logical lifecycle container, down to individual instances.',
    explanation: 'Azure organizes governance in four hierarchical scope levels from top to bottom: Management groups -> Subscriptions -> Resource groups -> Resources. Access control (Azure RBAC), Azure Policy assignments, and Resource Locks applied at any parent level inherit down to all child levels.',
    awsComparison: 'Maps to AWS Organizations OUs (`Management groups`) -> AWS Member Accounts (`Subscriptions`) -> mandatory lifecycle folder (`Resource groups`—no exact AWS mandatory parent!) -> EC2/S3 instances (`Resources`).'
  },
  {
    id: 'az900-a3-031',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Microsoft Purview',
    difficulty: 1,
    format: 'single',
    prompt: 'Which Microsoft solution provides unified data governance, automated data discovery, sensitive data classification, and end-to-end data lineage across on-premises, multicloud, and SaaS data estates?',
    options: [
      'Microsoft Purview',
      'Azure Advisor',
      'Azure Bastion',
      'Azure Monitor Application Insights'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Formerly Azure Purview + Microsoft 365 Compliance—think sensitive PII scanning, data cataloging, and lineage graphs.',
    explanation: 'Microsoft Purview brings together data governance, risk, and compliance solutions—including the Purview Data Map, Unified Data Catalog, automated sensitivity classification/labeling, and end-to-end data lineage tracking across Azure, on-premises SQL, and external SaaS/cloud data stores.',
    awsComparison: 'Combines the capabilities of Amazon Macie (sensitive PII discovery/classification), AWS Glue Data Catalog / Amazon DataZone (catalog & lineage), and AWS Audit Manager.'
  },
  {
    id: 'az900-a3-032',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Microsoft Purview Risk & Compliance',
    difficulty: 2,
    format: 'single',
    prompt: 'A Chief Data Officer needs business analysts to search a centralized enterprise glossary of approved datasets, see where customer records originated, and verify which transformations modified those tables downstream. Which service addresses this requirement?',
    options: [
      'Azure Key Vault',
      'Microsoft Cost Management',
      'Azure Traffic Manager',
      'Microsoft Purview'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Keywords: searchable enterprise data catalog, business glossary, and upstream-to-downstream data lineage.',
    explanation: 'Microsoft Purview’s Data Map and Data Catalog automatically scan structured and unstructured sources, apply business glossary terms and sensitivity classifications, and visualize end-to-end data lineage through ETL pipelines (such as Azure Data Factory and Synapse).',
    awsComparison: 'Equivalent to Amazon DataZone + AWS Glue Data Catalog lineage.'
  },
  {
    id: 'az900-a3-033',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Microsoft Purview Capabilities',
    difficulty: 2,
    format: 'multi',
    prompt: 'Which TWO capabilities are core functions of Microsoft Purview?',
    options: [
      'Automated scanning and classification of sensitive data (such as credit card numbers and national IDs) across hybrid data stores',
      'Load balancing incoming HTTPS web traffic across Availability Zones with Web Application Firewall inspection',
      'Commit-based 3-year compute discounting for virtual machine workloads',
      'Visualizing end-to-end data lineage and maintaining a searchable enterprise data catalog'
    ],
    correctIndices: [0, 3],
    selectCount: 2,
    awsBridgeHint: 'Pick the two capabilities focused on data classification/discovery and data cataloging/lineage.',
    explanation: 'Microsoft Purview specializes in data governance, compliance, and risk management—specifically scanning/classifying sensitive data assets and providing a searchable Data Catalog with visual data lineage. HTTPS WAF load balancing is Application Gateway/Front Door, and 3-year compute discounts are Reservations/Savings Plans.',
    awsComparison: 'Think Amazon Macie (classification) + Amazon DataZone (catalog/lineage) unified under the Microsoft Purview umbrella.'
  },
  {
    id: 'az900-a3-034',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Policy',
    difficulty: 1,
    format: 'single',
    prompt: 'A European bank requires a technical guardrail that prevents any administrator from deploying Azure resources outside of West Europe and North Europe, while also reporting compliance status across 40 subscriptions. Which Azure service should be used?',
    options: [
      'Azure Advisor',
      'Azure Policy',
      'Resource Locks',
      'Azure Service Health'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Enforcing "Allowed Locations" and "Allowed VM SKUs" across accounts + compliance dashboard.',
    explanation: 'Azure Policy enforces organizational standards and assesses compliance at scale. Assigning the built-in "Allowed locations" policy definition at a management group or subscription scope blocks creation of resources in unauthorized regions and evaluates existing resources for compliance.',
    awsComparison: 'Combines AWS Organizations Service Control Policies (SCPs—for preventive region/SKU guardrails) with AWS Config Rules (for continuous resource-property compliance auditing and remediation).'
  },
  {
    id: 'az900-a3-035',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Policy Definitions vs Initiatives',
    difficulty: 1,
    format: 'single',
    prompt: 'In Azure Policy, what is an "initiative definition" (sometimes called a policy set)?',
    options: [
      'A temporary 24-hour exemption allowing an Owner to bypass resource locks',
      'A Kusto Query Language script that deletes unattached disks every night',
      'A collection of related Azure Policy definitions grouped together to achieve an overarching compliance goal (such as ISO 27001 or PCI-DSS)',
      'A list of Microsoft Entra ID users permitted to approve support tickets'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Instead of assigning 85 individual compliance rules one by one to every subscription, you bundle them into one Compliance Pack.',
    explanation: 'An Azure Policy initiative is a bundle of multiple policy definitions tailored toward a single overarching goal (for example, CIS Benchmark, NIST SP 800-53, PCI-DSS, or corporate tagging standards). Assigning one initiative applies and tracks all included rules together.',
    awsComparison: 'Direct equivalent to AWS Config Conformance Packs (which bundle multiple AWS Config rules and remediation actions into a single deployable compliance standard).'
  },
  {
    id: 'az900-a3-036',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Policy Workflow',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Order the steps required to implement and remediate a multi-rule governance standard using Azure Policy from first to last.',
    correctSequence: [
      'Create or select individual policy definitions',
      'Group the related definitions into an initiative definition',
      'Assign the initiative to a target management group, subscription, or resource group scope',
      'Evaluate compliance results and trigger a remediation task for non-compliant resources'
    ],
    awsBridgeHint: 'Rule -> Rule Bundle (Initiative) -> Scope Assignment -> Compliance Evaluation & Remediation.',
    explanation: 'When rolling out Azure Policy at scale, you first define or select individual rules (policy definitions), group them into an initiative, assign that initiative to a scope (with optional exclusions), and finally inspect compliance and run remediation tasks (`DeployIfNotExists` / `Modify`) on non-compliant resources.',
    awsComparison: 'Matches authoring AWS Config Rules -> bundling into a Conformance Pack -> deploying to an AWS Organization OU -> running Systems Manager remediation.'
  },
  {
    id: 'az900-a3-037',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Policy vs Azure RBAC',
    difficulty: 2,
    format: 'single',
    prompt: 'A user holds the built-in "Owner" RBAC role on a subscription. An Azure Policy with a `Deny` effect is assigned to that subscription allowing only `Standard_B2s` virtual machines. What happens when the Owner attempts to deploy a `Standard_E64s_v5` virtual machine?',
    options: [
      'The deployment is blocked by Azure Policy because policy evaluates resource properties regardless of user RBAC permissions',
      'The deployment succeeds because the subscription Owner role automatically overrides all Azure Policy assignments',
      'The deployment succeeds, and Azure Advisor sends an email warning 24 hours later',
      'The user’s Owner role is permanently revoked by Microsoft Entra ID'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Think of an AWS SCP blocking `AdministratorAccess` inside a member account: RBAC grants who can act, Policy restricts what resource configurations are allowed to exist!',
    explanation: 'Azure RBAC focuses on user actions ("Who can perform this action?"), whereas Azure Policy focuses on resource properties ("Is this resource configuration compliant?"). Even if a user has full `Owner` permissions via RBAC, an explicit `Deny` Azure Policy blocks any non-compliant resource deployment (unless that scope is explicitly exempted).',
    awsComparison: 'Works just like an AWS Organizations SCP denying large EC2 instance types—even an IAM user with `AdministratorAccess` in the member account is denied.'
  },
  {
    id: 'az900-a3-038',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Policy Behavior',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure Policy behavior. Select Yes if true, or No if false.',
    statements: [
      {
        statement: 'Assigning a new Azure Policy with a `Deny` effect automatically deletes existing running virtual machines that violate the policy.',
        answer: false
      },
      {
        statement: 'Specific child resource groups can be excluded when assigning an Azure Policy at the subscription scope.',
        answer: true
      },
      {
        statement: 'Azure Policy assignments applied to a management group are inherited by all subscriptions beneath that management group.',
        answer: true
      }
    ],
    awsBridgeHint: 'Preventive `Deny` policies never blow up already-running production servers—they mark existing resources "Non-compliant" while blocking new violating writes!',
    explanation: 'Assigning a `Deny` policy blocks new non-compliant creations or updates going forward, while existing non-compliant resources continue running and are flagged as "Non-compliant" in the compliance dashboard (they are NEVER automatically deleted). Policy assignments inherit down the scope hierarchy and support scope exclusions for exceptions.',
    awsComparison: 'Just like enabling an SCP or Config Rule in AWS: existing resources aren’t destroyed retroactively, and OUs inherit policies downward.'
  },
  {
    id: 'az900-a3-039',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'CanNotDelete Resource Lock',
    difficulty: 1,
    format: 'single',
    prompt: 'An administrator wants to allow team members to read and update settings on a production Azure SQL Database while preventing anyone—including subscription Owners—from accidentally deleting it until a safeguard is explicitly removed. Which feature should be configured?',
    options: [
      'A `ReadOnly` resource lock',
      'A resource tag named `Protected: True`',
      'An Azure Monitor Metric Alert',
      'A `CanNotDelete` (Delete) resource lock'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Two lock levels exist in Azure: one blocks only deletion while permitting updates; the other freezes all changes.',
    explanation: 'A `CanNotDelete` lock (shown as "Delete" lock in the Azure Portal) allows authorized users to read and modify a resource, but blocks deletion until someone with `Owner` or `User Access Administrator` permissions explicitly removes the lock first.',
    awsComparison: 'Similar to RDS Deletion Protection / EC2 Termination Protection, except Azure Resource Locks work uniformly across ANY Azure resource, resource group, or subscription!'
  },
  {
    id: 'az900-a3-040',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'ReadOnly Resource Lock',
    difficulty: 1,
    format: 'single',
    prompt: 'Which actions are permitted on an Azure resource when a `ReadOnly` lock is applied to its parent resource group?',
    options: [
      'Authorized users can modify resource properties, resize SKUs, and delete the resource',
      'Authorized users can read resource configurations, while both modifications and deletions are blocked',
      'Authorized users can delete the resource, but cannot view or modify its properties',
      'All read, modify, and delete access is completely blocked for every user in the tenant'
    ],
    correctIndices: [1],
    awsBridgeHint: '`ReadOnly` means nobody can change state OR delete the resource—not even Contributors or Owners—until the lock is lifted.',
    explanation: 'A `ReadOnly` lock restricts authorized users to read-only (`GET`) operations on the control plane; it blocks both modifying (`PUT`/`PATCH`/`POST` state changes) and deleting (`DELETE`) any resource within the locked scope.',
    awsComparison: 'Equivalent to attaching an SCP/resource policy denying all mutating and delete API calls on a specific stack until unlocked.'
  },
  {
    id: 'az900-a3-041',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'ReadOnly Lock VM Gotcha',
    difficulty: 3,
    format: 'single',
    prompt: 'An administrator applies a `ReadOnly` lock to a resource group containing several production Azure Virtual Machines. Later that evening, an operator with the `Virtual Machine Contributor` role tries to restart an unresponsive virtual machine from the Azure Portal. What occurs?',
    options: [
      'The virtual machine restarts normally because restarting does not delete the resource',
      'The virtual machine restarts, and the `ReadOnly` lock is automatically downgraded to `CanNotDelete`',
      'The restart fails because starting, stopping, and restarting a virtual machine are control-plane state-change (`POST`) operations blocked by `ReadOnly` locks',
      'Azure creates a duplicate unlocked clone of the virtual machine in another Availability Zone'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Famous Microsoft exam gotcha! In Azure Resource Manager, `start`, `deallocate`, and `restart` are mutating HTTP `POST` actions on the VM resource.',
    explanation: '`ReadOnly` locks block all HTTP `POST` operations that alter resource state on the Azure Resource Manager control plane. Consequently, applying a `ReadOnly` lock to a VM or its resource group prevents starting, stopping/deallocating, or restarting the VM!',
    awsComparison: 'Critical real-world Azure gotcha with no direct AWS Termination Protection surprise: use `CanNotDelete` (not `ReadOnly`) on production VM resource groups unless you want to block reboots and scaling too!'
  },
  {
    id: 'az900-a3-042',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'ReadOnly Lock Storage Gotcha',
    difficulty: 3,
    format: 'single',
    prompt: 'After placing a `ReadOnly` lock on an Azure Storage account, developers report that Azure Portal blades and legacy scripts attempting to retrieve the storage account access keys fail with an authorization/lock error. Why does a `ReadOnly` lock block listing storage keys?',
    options: [
      'The `listKeys` operation is implemented as an ARM `POST` request because returned keys grant full read/write/delete data-plane access to the storage account',
      'A `ReadOnly` lock automatically deletes all existing storage account access keys and SAS tokens',
      'Storage accounts do not support resource locks of any kind',
      'Applying a `ReadOnly` lock converts the storage account into the offline Archive access tier'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Remember that ARM locks only inspect control-plane HTTP verbs—and `listKeys` uses HTTP `POST` specifically so `Reader` roles and `ReadOnly` locks cannot leak master read-write keys!',
    explanation: 'Because Azure Storage account keys provide full read/write/delete control over data inside the storage account, Azure Resource Manager implements `listKeys` as a `POST` action. A `ReadOnly` lock blocks `POST` actions, preventing callers from retrieving keys (workloads authenticating via Microsoft Entra ID RBAC on the data plane continue reading unaffected).',
    awsComparison: 'Major AZ-900/AZ-104 crossover trap! Always watch for `ReadOnly` lock side effects on Storage (`listKeys` blocked) and VMs (`start`/`restart` blocked).'
  },
  {
    id: 'az900-a3-043',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Resource Lock Inheritance & Permissions',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure Resource Locks. Select Yes if true, or No if false.',
    statements: [
      {
        statement: 'When a resource lock is applied to a resource group, all current and future resources created inside that resource group automatically inherit the lock.',
        answer: true
      },
      {
        statement: 'A user assigned only the built-in `Contributor` RBAC role can delete a `CanNotDelete` lock to remove a virtual machine.',
        answer: false
      },
      {
        statement: 'If both a `CanNotDelete` lock and a `ReadOnly` lock are applied to the same scope, the most restrictive lock (`ReadOnly`) takes precedence.',
        answer: true
      }
    ],
    awsBridgeHint: 'Remember: `Contributor` grants almost everything EXCEPT managing access (`Microsoft.Authorization/*`)—and locks live under `Microsoft.Authorization/locks`!',
    explanation: 'Resource locks automatically inherit down from subscriptions and resource groups to all current and future child resources. Only `Owner` and `User Access Administrator` (or custom roles with `Microsoft.Authorization/locks/*`) can create or delete locks—`Contributor` CANNOT remove a lock! When multiple locks apply, the most restrictive lock (`ReadOnly`) wins.',
    awsComparison: 'In Azure, `Contributor` = PowerUser without IAM/Lock admin rights, which makes `CanNotDelete` locks an effective safety net against accidental Terraform/script destruction by Contributors.'
  },
  {
    id: 'az900-a3-044',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Scope Inheritance Comparison',
    difficulty: 2,
    format: 'multi',
    prompt: 'Which TWO governance features are automatically inherited by child resources when configured directly on a parent Azure Resource Group (without requiring additional remediation rules)?',
    options: [
      'Resource metadata tags',
      'Azure Policy assignments',
      'Resource Locks (`CanNotDelete` and `ReadOnly`)',
      'Azure Pricing Calculator saved estimates'
    ],
    correctIndices: [1, 2],
    selectCount: 2,
    awsBridgeHint: 'RBAC, Policy, and Locks flow down the hierarchy automatically; Tags do NOT!',
    explanation: 'Azure RBAC role assignments, Azure Policy assignments, and Resource Locks all automatically inherit down from parent scopes (Management Group -> Subscription -> Resource Group -> Resource). Resource tags do NOT inherit automatically.',
    awsComparison: 'Keep this 4-item Azure inheritance rule memorized for exam day: RBAC = Yes, Policy = Yes, Locks = Yes, Tags = NO.'
  },
  {
    id: 'az900-a3-045',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Service Trust Portal',
    difficulty: 1,
    format: 'single',
    prompt: 'An external security auditor requests copies of Microsoft’s independent third-party SOC 2 Type II, ISO/IEC 27001, and FedRAMP audit reports along with GDPR implementation whitepapers. Where can an administrator download these official documents?',
    options: [
      'Azure Advisor',
      'Azure Pricing Calculator',
      'Azure Status page',
      'Microsoft Service Trust Portal'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Think of the self-service portal where compliance teams download SOC, ISO, and PCI audit attestations.',
    explanation: 'The Microsoft Service Trust Portal (`servicetrust.microsoft.com`) provides public and authenticated access to independent third-party audit reports (ISO, SOC 1/2/3, NIST, FedRAMP), penetration test summaries, regional compliance guides, and data protection documentation.',
    awsComparison: 'Exact 1:1 counterpart to AWS Artifact (where you download AWS SOC 1/2/3, PCI, and ISO audit reports).'
  },
  {
    id: 'az900-a3-046',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Trust & Compliance Documentation',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Determine whether each statement regarding Microsoft trust, privacy, and compliance resources is true (Yes) or false (No).',
    statements: [
      {
        statement: 'The Microsoft Privacy Statement explains what personal data Microsoft processes, how Microsoft processes it, and for what purposes.',
        answer: true
      },
      {
        statement: 'The Data Protection Addendum (DPA) defines the data processing and security obligations between Microsoft and the customer for enterprise cloud services.',
        answer: true
      },
      {
        statement: 'Microsoft Purview Compliance Manager is used exclusively to estimate virtual machine compute pricing across global regions.',
        answer: false
      }
    ],
    awsBridgeHint: 'Privacy Statement = personal data handling; DPA = legal processor/controller security terms; Compliance Manager = regulatory posture & Compliance Score (NOT pricing!).',
    explanation: 'The Microsoft Privacy Statement covers personal data collection and usage; the Data Protection Addendum (DPA) sets contractual GDPR/security obligations for enterprise services; and Microsoft Purview Compliance Manager translates regulatory frameworks into actionable controls and a measurable Compliance Score.',
    awsComparison: 'Maps to the AWS Privacy Notice, AWS GDPR Data Processing Addendum, and AWS Audit Manager respectively.'
  },
  {
    id: 'az900-a3-047',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Sovereign Cloud Regions',
    difficulty: 2,
    format: 'single',
    prompt: 'Which isolated Azure environment consists of physically and logically segregated datacenters operated exclusively by screened U.S. persons to meet strict federal defense and government compliance mandates?',
    options: [
      'Azure Public Cloud with a ReadOnly lock',
      'Azure Government',
      'Azure Billing Zone 1',
      'Azure Preview Portal'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Physically and network-isolated sovereign cloud built specifically for U.S. federal, state, local, and defense workloads (FedRAMP High / DoD IL5).',
    explanation: 'Azure Government provides a physically and logically isolated instance of Azure located in the United States, with dedicated network backbones and datacenters operated solely by screened U.S. citizens to meet FedRAMP High, ITAR, CJIS, and DoD compliance requirements. (Similarly, Azure China is a physically separated sovereign cloud operated locally by 21Vianet.)',
    awsComparison: 'Direct equivalent to AWS GovCloud (US) (and AWS China Regions operated by NWCD/Sinnet).'
  },
  {
    id: 'az900-a3-048',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Portal',
    difficulty: 1,
    format: 'single',
    prompt: 'Which management tool provides a unified, browser-based graphical user interface where administrators can visually deploy resources, build customizable telemetry dashboards, and manage subscriptions?',
    options: [
      'Azure Portal',
      'Azure Bicep CLI',
      'AzCopy utility',
      'Log Analytics agent'
    ],
    correctIndices: [0],
    awsBridgeHint: 'The primary web GUI console for interactive clicking, wizards, and shareable RBAC dashboards.',
    explanation: 'The Azure Portal (`portal.azure.com`) is a web-based unified console that provides a graphical alternative to command-line tools for building, managing, and monitoring everything from simple web apps to complex cloud deployments, complete with shareable role-based dashboards.',
    awsComparison: 'Direct counterpart to the AWS Management Console.'
  },
  {
    id: 'az900-a3-049',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Cloud Shell',
    difficulty: 1,
    format: 'single',
    prompt: 'An engineer needs to run interactive command-line management scripts from a locked-down kiosk browser without installing local tools, and wants both Bash and PowerShell pre-authenticated to their Azure account. Which tool should they launch?',
    options: [
      'Azure Resource Graph',
      'Azure Advisor',
      'Azure Cloud Shell',
      'Total Cost of Ownership Calculator'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Browser-embedded ephemeral container terminal right at the top bar of the Azure Portal, supporting both Bash (`az`) and PowerShell (`Az`).',
    explanation: 'Azure Cloud Shell is an interactive, authenticated, browser-accessible terminal environment for managing Azure resources. It comes pre-installed with Azure CLI, Azure PowerShell, Git, Terraform, Bicep, kubectl, and editors, letting you switch freely between Bash and PowerShell.',
    awsComparison: 'Equivalent to AWS CloudShell, with one key exam difference: persistent `$HOME/clouddrive` storage in Azure Cloud Shell mounts an Azure Storage (Azure Files) share in your subscription.'
  },
  {
    id: 'az900-a3-050',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Cloud Shell Mechanics',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure Cloud Shell. Select Yes if true, or No if false.',
    statements: [
      {
        statement: 'Azure Cloud Shell allows you to choose between a Bash environment and a PowerShell environment inside the browser.',
        answer: true
      },
      {
        statement: 'To persist files across sessions in `$HOME`, Azure Cloud Shell attaches a persistent Azure Files share backed by an Azure Storage account.',
        answer: true
      },
      {
        statement: 'An active Azure Cloud Shell container continues executing background scripts indefinitely even after 2 hours of complete user inactivity.',
        answer: false
      }
    ],
    awsBridgeHint: 'Cloud Shell supports Bash + PowerShell, persists files via Azure Files storage, and terminates inactive ephemeral containers after 20 minutes!',
    explanation: 'Azure Cloud Shell runs on a temporary per-session host that automatically terminates after 20 minutes of inactivity. To persist scripts across sessions, Cloud Shell mounts an Azure Files share (`clouddrive`), and users can toggle between Bash and PowerShell.',
    awsComparison: 'Just like AWS CloudShell terminating idle sessions after ~20 minutes of inactivity, except Azure persists files in a visible Azure Storage File Share (incurring small standard storage charges).'
  },
  {
    id: 'az900-a3-051',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure CLI vs Azure PowerShell',
    difficulty: 1,
    format: 'single',
    prompt: 'Which statement accurately describes both Azure CLI and Azure PowerShell?',
    options: [
      'Azure PowerShell runs only on Windows Server, whereas Azure CLI runs only on Linux',
      'Both are cross-platform command-line tools (available on Windows, macOS, and Linux) that send authenticated requests to Azure Resource Manager',
      'Azure CLI bypasses Azure Resource Manager RBAC checks, whereas Azure PowerShell enforces them',
      'Neither tool can be used inside automated CI/CD deployment pipelines'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Modern PowerShell 7+ (`Az` module) and `az` CLI both run natively on Windows, macOS, and Linux, and both hit the exact same ARM REST control plane!',
    explanation: 'Both Azure CLI (`az` command syntax, Python-based, great for Bash scripting) and Azure PowerShell (`Verb-AzNoun` cmdlets built on .NET/PowerShell Core) are cross-platform tools running on Windows, Linux, and macOS. Under the hood, every command translates into authenticated REST calls against Azure Resource Manager.',
    awsComparison: 'Comparable to `aws` CLI v2 vs. AWS Tools for PowerShell—both are cross-platform wrappers over the same cloud control-plane APIs.'
  },
  {
    id: 'az900-a3-052',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Mobile App',
    difficulty: 1,
    format: 'single',
    prompt: 'An on-call site reliability engineer is away from their laptop when an urgent alert arrives. Which official Microsoft tool enables them to check resource health, restart a virtual machine, and run quick Azure CLI or PowerShell commands directly from an iOS or Android smartphone?',
    options: [
      'Microsoft Purview Data Map',
      'Azure Migrate appliance',
      'Azure Storage Explorer',
      'Azure Mobile App'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Official iOS/Android companion app with alert push notifications, VM start/restart controls, and embedded Cloud Shell.',
    explanation: 'The Azure Mobile App (for iOS and Android) allows administrators to monitor health and metrics on the go, receive push notifications for Service Health and Monitor alerts, perform quick actions like starting/stopping VMs or web apps, and execute Azure Cloud Shell commands.',
    awsComparison: 'Direct counterpart to the AWS Console Mobile Application.'
  },
  {
    id: 'az900-a3-053',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Resource Manager (ARM)',
    difficulty: 1,
    format: 'single',
    prompt: 'What role does Azure Resource Manager (ARM) play whenever a user interacts with Azure through the Azure Portal, Azure CLI, Azure PowerShell, or REST SDKs?',
    options: [
      'It serves as the central deployment and management control plane that authenticates, authorizes, validates policies/locks, and routes every management request to resource providers',
      'It acts as a global content delivery network caching static images at edge locations',
      'It functions solely as a relational database engine for storing application user tables',
      'It provides local hypervisor virtualization for offline developer laptops'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Every single management tool—GUI, CLI, SDK, IaC—goes through this unified control-plane front door so RBAC, Locks, and Policy cannot be bypassed.',
    explanation: 'Azure Resource Manager (ARM) is the unified deployment and management service for Azure. Regardless of whether a request originates from the Portal, CLI, PowerShell, or an SDK, it passes through the ARM API layer, guaranteeing consistent Microsoft Entra authentication, RBAC, Azure Policy, and Resource Lock enforcement before reaching resource providers (like `Microsoft.Compute`).',
    awsComparison: 'Combines the unified AWS Control Plane API / Cloud Control API front door with native stack/resource-group orchestration.'
  },
  {
    id: 'az900-a3-054',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'ARM Templates',
    difficulty: 1,
    format: 'single',
    prompt: 'What is an Azure Resource Manager (ARM) template?',
    options: [
      'An imperative Bash script that executes step-by-step OS patching commands inside a Linux kernel',
      'A PDF compliance checklist downloaded from the Service Trust Portal',
      'A JavaScript Object Notation (JSON) file that declaratively defines the infrastructure and configuration for an Azure deployment',
      'A spreadsheet exported from Microsoft Cost Management showing monthly invoice line items'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Native JSON declarative Infrastructure-as-Code template submitted directly to the Azure control plane.',
    explanation: 'An ARM template is a JSON file that uses declarative syntax—stating *what* you intend to deploy (VMs, VNets, storage, parameters, outputs) without writing step-by-step imperative programming loops to create it. ARM orchestrates parallel creation and dependency ordering automatically.',
    awsComparison: 'Exact 1:1 counterpart to an AWS CloudFormation JSON template.'
  },
  {
    id: 'az900-a3-055',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Bicep',
    difficulty: 2,
    format: 'single',
    prompt: 'Why do platform engineering teams frequently choose Azure Bicep over raw JSON ARM templates for Azure-native Infrastructure-as-Code?',
    options: [
      'Bicep bypasses Azure Policy compliance rules during deployment',
      'Bicep provides a cleaner, concise domain-specific syntax with automatic dependency detection and transparent compilation into standard ARM JSON without managing external state files',
      'Bicep is required to deploy resources via the Azure Portal graphical wizard',
      'Bicep eliminates compute charges for all virtual machines declared in the file'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Think of a first-party, human-friendly declarative DSL specifically built to replace verbose ARM JSON—with zero Terraform `.tfstate` bucket headaches!',
    explanation: 'Azure Bicep is a domain-specific language (DSL) that uses clean, concise declarative syntax to deploy Azure resources. It automatically infers resource dependencies from symbolic references, offers day-0 support for all Azure resource previews/GA APIs, requires no external state file (state lives natively in Azure), and transpiles cleanly to ARM JSON.',
    awsComparison: 'Feels as clean as HCL (Terraform) while remaining 100% stateless and native to the cloud control plane like AWS CloudFormation YAML.'
  },
  {
    id: 'az900-a3-056',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Bicep IaC Lifecycle',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Arrange the standard lifecycle stages of deploying Azure infrastructure using a Bicep file in chronological order from start to finish.',
    correctSequence: [
      'Declare target Azure resources, parameters, and outputs inside a `.bicep` file',
      'Preview expected infrastructure changes using a `what-if` deployment check',
      'Submit the template deployment to Azure Resource Manager via Azure CLI or PowerShell',
      'Azure Resource Manager transpiles/validates the template and provisions the resources in parallel where dependencies allow'
    ],
    awsBridgeHint: 'Author `.bicep` -> Run `what-if` dry-run diff -> Submit deployment -> ARM validates & provisions resources.',
    explanation: 'In a standard Bicep workflow, engineers author declarative `.bicep` definitions, run `az deployment group what-if` (or `New-AzResourceGroupDeployment -WhatIf`) to preview changes, submit the deployment to ARM, and let ARM validate policies/dependencies and provision resources.',
    awsComparison: 'Mirrors Author CloudFormation/CDK -> Create Change Set (`what-if`) -> Execute Stack Deployment -> CloudFormation parallel provisioning.'
  },
  {
    id: 'az900-a3-057',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Declarative IaC Benefits',
    difficulty: 2,
    format: 'multi',
    prompt: 'Which TWO advantages are gained by deploying environments with Azure Bicep or ARM templates instead of manual point-and-click creation in the Azure Portal?',
    options: [
      'Consistent, repeatable deployments across development, staging, and production environments with eliminated configuration drift',
      'Automatic exemption from outbound internet bandwidth charges',
      'Automatic orchestration of interdependent resources in the proper creation order with parallel execution of independent resources',
      'Guaranteed 100% uptime SLA even for Free-tier and Public Preview resources'
    ],
    correctIndices: [0, 2],
    selectCount: 2,
    awsBridgeHint: 'Focus on repeatability across environments and automated dependency orchestration.',
    explanation: 'Infrastructure-as-Code with ARM/Bicep ensures repeatable, version-controlled deployments across environments without human click errors, while ARM automatically builds the dependency graph—provisioning independent resources concurrently and dependent resources in exact sequence.',
    awsComparison: 'Identical to the core architectural benefits of AWS CloudFormation.'
  },
  {
    id: 'az900-a3-058',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Idempotency',
    difficulty: 2,
    format: 'single',
    prompt: 'A DevOps pipeline deploys the exact same unmodified ARM template to `rg-app-prod` three times in a row using default Incremental mode. Instead of creating three duplicate virtual networks, the second and third runs leave the already-compliant virtual network unchanged. Which Infrastructure-as-Code property does this demonstrate?',
    options: [
      'Elasticity',
      'Data lineage',
      'Geo-redundancy',
      'Idempotency'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Applying the same operation multiple times yields the exact same end state without unintended side effects or duplicates.',
    explanation: 'Idempotency means that deploying the same declarative ARM or Bicep template repeatedly produces the exact same environment state: if the declared resources already exist with matching properties, ARM makes no duplicate resources or disruptive changes.',
    awsComparison: 'Same declarative idempotency principle shared by CloudFormation and Terraform.'
  },
  {
    id: 'az900-a3-059',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Arc for Servers',
    difficulty: 1,
    format: 'single',
    prompt: 'A global enterprise operates Linux and Windows servers in its own on-premises datacenters as well as in third-party public clouds. Which Azure service projects those external machines into Azure Resource Manager so they can be governed using Azure Policy, Tags, Microsoft Defender for Cloud, and Azure Monitor?',
    options: [
      'Azure Arc',
      'Azure Bastion',
      'Azure ExpressRoute',
      'Azure Virtual Desktop'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Hybrid/multicloud control-plane extension that gives non-Azure servers an actual Azure Resource ID inside a Resource Group!',
    explanation: 'Azure Arc extends the Azure control plane outside of Azure. By installing the Connected Machine agent on physical or virtual servers running on-premises or in other clouds, each server appears as a native resource inside an Azure Resource Group—enabling Tags, RBAC, Azure Policy guest configuration, Update Manager, Defender for Cloud, and Azure Monitor.',
    awsComparison: 'Similar to AWS Systems Manager (SSM) Hybrid Activations + EKS Anywhere, but deeply integrated into ARM: an Arc-enabled server gets a first-class Azure Resource ID alongside native Azure VMs!'
  },
  {
    id: 'az900-a3-060',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Arc Scope',
    difficulty: 2,
    format: 'single',
    prompt: 'Beyond physical and virtual Windows/Linux servers, which workloads can also be onboarded and centrally governed through Azure Arc?',
    options: [
      'Consumer mobile web browsers and personal home routers',
      'Microsoft Office 365 desktop spreadsheet macros',
      'External CNCF-certified Kubernetes clusters, SQL Server instances, and Azure Arc-enabled data services running on-premises or in multicloud environments',
      'Static DNS MX records hosted at external domain registrars'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Arc governs hybrid servers, Kubernetes clusters (with GitOps Flux), SQL Server instances, and VMware vSphere/SCVMM fleets.',
    explanation: 'Azure Arc supports Arc-enabled Servers, Arc-enabled Kubernetes (enabling Flux GitOps configuration and Azure Policy across any CNCF cluster), Arc-enabled SQL Server, Arc-enabled Data Services (SQL Managed Instance / PostgreSQL on hybrid K8s), and Arc-enabled VMware vSphere / System Center VMM.',
    awsComparison: 'Spans what AWS splits across Systems Manager Hybrid Nodes, Amazon EKS Connector / EKS Anywhere, and RDS Outposts.'
  },
  {
    id: 'az900-a3-061',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Arc Evaluation',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure Arc. Select Yes if true, or No if false.',
    statements: [
      {
        statement: 'Azure Arc allows you to organize non-Azure servers using Azure resource groups and Azure resource tags.',
        answer: true
      },
      {
        statement: 'Onboarding an on-premises server to Azure Arc automatically migrates its virtual hard disks into Azure Blob Storage and shuts down the physical server.',
        answer: false
      },
      {
        statement: 'Azure Policy can audit operating-system settings (such as password complexity or missing certificates) on Azure Arc-enabled servers.',
        answer: true
      }
    ],
    awsBridgeHint: 'Arc projects management & governance onto servers where they currently live—it is NOT a lift-and-shift VM migration tool (that is Azure Migrate)!',
    explanation: 'Azure Arc keeps workloads running in their existing on-premises or multicloud locations while projecting them into ARM for tagging, RBAC, monitoring, and Azure Policy Machine Configuration auditing. Actual workload migration to Azure uses Azure Migrate, not Azure Arc.',
    awsComparison: 'Do not confuse Azure Arc (hybrid management = SSM Hybrid) with Azure Migrate (lift-and-shift server migration = AWS Application Migration Service MGN).'
  },
  {
    id: 'az900-a3-062',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'ARM Deployment Modes',
    difficulty: 3,
    format: 'single',
    prompt: 'An engineer deploys an ARM template to an existing resource group while explicitly specifying `Complete` deployment mode instead of the default `Incremental` mode. What happens to existing resources in that resource group that are NOT listed in the template?',
    options: [
      'They are moved automatically to a backup resource group',
      'Azure Resource Manager deletes existing resources in the target resource group that are not specified in the template',
      'They are converted to the Free pricing tier',
      'Nothing happens; `Complete` mode only validates template syntax without deploying anything'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Huge operational hazard if chosen carelessly: `Incremental` only adds/updates; `Complete` makes the resource group match the template *exclusively* by pruning unlisted resources!',
    explanation: 'In `Incremental` mode (the default), ARM leaves existing resources in the resource group untouched if they are absent from the template. In `Complete` mode, ARM **deletes** any resource in that resource group that is not defined in the template (respecting resource locks).',
    awsComparison: 'Think of `Complete` mode like `terraform apply` against an entire Resource Group directory where anything outside your `.tf` code gets destroyed!'
  },
  {
    id: 'az900-a3-063',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Browser-Native Management Tools',
    difficulty: 1,
    format: 'multi',
    prompt: 'An administrator must manage Azure resources from a temporary loaner Chromebook using only a standard web browser, with zero local software installations permitted. Which TWO Azure management tools can they use directly?',
    options: [
      'Locally installed Azure PowerShell `Az` desktop module',
      'Azure Portal',
      'Azure Migrate physical appliance',
      'Azure Cloud Shell'
    ],
    correctIndices: [1, 3],
    selectCount: 2,
    awsBridgeHint: 'Pick the web GUI console and the browser-hosted container terminal.',
    explanation: 'Both the Azure Portal (graphical web UI) and Azure Cloud Shell (browser-hosted Bash and PowerShell terminal) run entirely inside a modern web browser without requiring local software installation.',
    awsComparison: 'Matches using the AWS Management Console + AWS CloudShell from any browser.'
  },
  {
    id: 'az900-a3-064',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Advisor',
    difficulty: 1,
    format: 'single',
    prompt: 'Which free, built-in Azure service analyzes your deployed resource configurations and usage telemetry, then provides actionable, personalized best-practice recommendations across Reliability, Security, Performance, Cost, and Operational Excellence?',
    options: [
      'Azure Activity Log',
      'Azure Service Health',
      'Microsoft Service Trust Portal',
      'Azure Advisor'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Azure’s personalized automated Well-Architected recommendation engine—and unlike AWS, all 5 pillars are completely free to every subscription!',
    explanation: 'Azure Advisor is a free personalized cloud consultant that continuously evaluates your resource configurations and telemetry across the five Well-Architected pillars—Reliability (formerly High Availability), Security, Performance, Cost, and Operational Excellence—offering step-by-step remediation actions.',
    awsComparison: 'Direct counterpart to AWS Trusted Advisor—with a crucial exam distinction: Azure Advisor is 100% free across all 5 pillars for every customer (no Business/Enterprise Support plan required!).'
  },
  {
    id: 'az900-a3-065',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Advisor Categories',
    difficulty: 1,
    format: 'multi',
    prompt: 'Select THREE official recommendation categories displayed in the Azure Advisor dashboard.',
    options: [
      'Reliability',
      'Operational Excellence',
      'Data Lineage',
      'Performance',
      'Brand Marketing'
    ],
    correctIndices: [0, 1, 3],
    selectCount: 3,
    awsBridgeHint: 'Azure Advisor aligns 1:1 with the 5 Azure Well-Architected Framework pillars: Reliability, Security, Cost, Operational Excellence, and Performance.',
    explanation: 'The five official Azure Advisor categories are **Reliability**, **Security**, **Performance**, **Cost**, and **Operational Excellence**. Data Lineage belongs to Microsoft Purview.',
    awsComparison: 'Matches the 5 classic AWS Trusted Advisor / Well-Architected pillars (minus AWS’s 6th Sustainability pillar).'
  },
  {
    id: 'az900-a3-066',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Status',
    difficulty: 1,
    format: 'single',
    prompt: 'Which view in the Azure health ecosystem displays a public, unauthenticated global matrix of all Azure services across every geographic region worldwide to communicate widespread outages?',
    options: [
      'Azure Status',
      'Azure Resource Health',
      'Azure Advisor',
      'Application Insights'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Know the 3-tier health pyramid cold: Global public status page -> Personalized subscription/region health -> Individual VM/DB instance health.',
    explanation: 'Azure Status (`azure.status.microsoft`) provides a global, public view of the health of all Azure services and regions worldwide. It is useful for checking massive multi-tenant incidents without signing in, whereas signed-in customers should check Azure Service Health for personalized impact.',
    awsComparison: 'Maps to the public AWS Health Dashboard (`health.aws.amazon.com`).'
  },
  {
    id: 'az900-a3-067',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Service Health',
    difficulty: 2,
    format: 'single',
    prompt: 'A cloud operations manager wants a personalized dashboard showing active Azure platform incidents, upcoming planned maintenance windows, and official Post-Incident Review (Root Cause Analysis) reports filtered specifically to the subscriptions and regions their company uses. Which tool provides this?',
    options: [
      'Azure Status',
      'Azure Activity Log',
      'Azure Service Health',
      'Microsoft Cost Management'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Middle tier of the 3-tier health suite: personalized to YOUR subscriptions & regions, includes Planned Maintenance, Health Advisories, Security Advisories, and downloadable RCA PDFs!',
    explanation: 'Azure Service Health provides a personalized view of the health of the Azure services and regions you actually use. It tracks four event types—Service issues (outages), Planned maintenance, Health advisories (deprecations/migrations), and Security advisories—and lets you configure alerts and download official Root Cause Analysis (RCA) documents.',
    awsComparison: 'Direct equivalent to your authenticated AWS Health Dashboard (Account Health / Personal Health Dashboard).'
  },
  {
    id: 'az900-a3-068',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Resource Health',
    difficulty: 2,
    format: 'single',
    prompt: 'A single production virtual machine named `vm-checkout-02` unexpectedly rebooted at 03:14 UTC while all other virtual machines in the same region remained healthy. Which tool tells the administrator whether the reboot was triggered by an underlying Azure hardware host failure versus a customer-initiated action?',
    options: [
      'Azure Status',
      'Azure Resource Health',
      'Azure Pricing Calculator',
      'Microsoft Purview'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Bottom (most granular) tier of the health pyramid: diagnoses the health history of ONE specific deployed resource instance!',
    explanation: 'Azure Resource Health diagnoses and provides support for service problems affecting a specific individual Azure resource (such as `vm-checkout-02` or a single SQL database). It reports current and historical availability (up to 30 days) and explicitly distinguishes "Platform-initiated" hardware events from "User-initiated" restarts/deallocations.',
    awsComparison: 'Combines EC2 Instance Status Checks (`System Status Check` vs `Instance Status Check`) with per-resource AWS Health event timelines across virtually any Azure resource.'
  },
  {
    id: 'az900-a3-069',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Service Health Suite Comparison',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement comparing Azure Status, Azure Service Health, and Azure Resource Health. Select Yes if true, or No if false.',
    statements: [
      {
        statement: 'Azure Status automatically filters out outages in regions where your subscription has zero deployed resources.',
        answer: false
      },
      {
        statement: 'Azure Service Health can send automated notifications via Action Groups when Microsoft schedules planned maintenance affecting your subscription.',
        answer: true
      },
      {
        statement: 'Azure Resource Health evaluates the availability of individual deployed resources and helps determine whether downtime was platform-initiated or user-initiated.',
        answer: true
      }
    ],
    awsBridgeHint: 'Azure Status = unfiltered global public map; Service Health = personalized to your subscriptions/regions + maintenance alerts; Resource Health = single resource diagnostics.',
    explanation: 'Azure Status shows all global regions unauthenticated and unfiltered. Azure Service Health filters specifically to your subscriptions/regions and integrates with Azure Monitor Action Groups for maintenance/outage alerts. Azure Resource Health inspects one specific resource instance.',
    awsComparison: 'Memorize this triad for guaranteed AZ-900 points: Status (Global) -> Service Health (Your Subscriptions/Regions) -> Resource Health (Single Resource).'
  },
  {
    id: 'az900-a3-070',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Monitor Metrics vs Logs',
    difficulty: 1,
    format: 'single',
    prompt: 'Azure Monitor organizes observability telemetry into two fundamental data platform stores. What are they?',
    options: [
      'Invoices and Reservations',
      'Policies and Locks',
      'Blobs and Queues',
      'Metrics and Logs'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Fast numerical time-series counters vs. rich queryable text/JSON event records.',
    explanation: 'Azure Monitor collects data into two core stores: **Azure Monitor Metrics** (lightweight numerical values collected at regular intervals describing system state like CPU % or network bytes, ideal for fast real-time alerting) and **Azure Monitor Logs** (structured and unstructured event, trace, and diagnostic records stored in Log Analytics for deep analysis).',
    awsComparison: 'Maps directly to Amazon CloudWatch Metrics + Amazon CloudWatch Logs.'
  },
  {
    id: 'az900-a3-071',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Log Analytics & KQL',
    difficulty: 1,
    format: 'single',
    prompt: 'Which tool inside Azure Monitor lets administrators write Kusto Query Language (KQL) queries to correlate, filter, and analyze millions of log records aggregated inside a Log Analytics workspace?',
    options: [
      'Log Analytics',
      'Azure Resource Graph',
      'Azure Advisor',
      'Total Cost of Ownership Calculator'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Interactive query workbench over a centralized log workspace using pipe-based KQL (`SecurityEvent | where EventID == 4625 | summarize count() by Account`).',
    explanation: 'Log Analytics is the web tool in the Azure Portal used to edit and run Kusto Query Language (KQL) queries against telemetry stored in an Azure Monitor Log Analytics workspace.',
    awsComparison: 'Equivalent to Amazon CloudWatch Logs Insights—except Azure’s KQL is substantially richer and shared across Azure Monitor, Microsoft Sentinel, Defender XDR, and Azure Resource Graph!'
  },
  {
    id: 'az900-a3-072',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Application Insights',
    difficulty: 2,
    format: 'single',
    prompt: 'A software engineering team wants to monitor a live `.NET` and `Node.js` web application to track HTTP request latency, unhandled runtime exceptions, database dependency call durations, and user session flows. Which feature of Azure Monitor provides this Application Performance Management (APM) capability?',
    options: [
      'Azure Activity Log',
      'Azure Network Watcher',
      'Application Insights',
      'Azure Blueprints'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Distributed tracing, live request/exception rates, application map topology, and synthetic URL ping tests.',
    explanation: 'Application Insights, an OpenTelemetry-powered feature of Azure Monitor, provides extensible Application Performance Management (APM) and distributed tracing for live web apps—tracking request rates, response times, failure codes, external SQL/API dependency latency, page views, and synthetic availability tests.',
    awsComparison: 'Combines AWS X-Ray (distributed tracing & service map), CloudWatch Application Signals, and CloudWatch Synthetics Canaries into one integrated APM tool.'
  },
  {
    id: 'az900-a3-073',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Azure Activity Log',
    difficulty: 2,
    format: 'single',
    prompt: 'During a security review, an auditor asks: "Which user deleted the production Network Security Group last Tuesday, from what IP address, and at what exact timestamp?" Which built-in Azure log answers control-plane "who, what, and when" questions for subscription resources?',
    options: [
      'Azure Monitor Metrics',
      'Azure Activity Log',
      'Azure Advisor Cost tab',
      'Azure Status history'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Subscription-level control-plane audit trail enabled automatically with 90 days free retention—captures ARM creates, updates, and deletes!',
    explanation: 'The Azure Activity Log is a platform log that provides insight into subscription-level control-plane events, recording *what* operation was performed on a resource, *who* initiated it, *when* it occurred, and its status (`Succeeded`/`Failed`). Events are retained for 90 days by default at no charge.',
    awsComparison: 'Exact 1:1 counterpart to AWS CloudTrail Event History (which also retains 90 days of management/control-plane events by default!). Note: just like CloudTrail Management Events, Activity Log does NOT capture guest OS CPU or inside-storage blob reads.'
  },
  {
    id: 'az900-a3-074',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Alerts & Action Groups',
    difficulty: 2,
    format: 'single',
    prompt: 'In Azure Monitor, multiple alert rules across three subscriptions all need to notify the same on-call SMS roster, post to an incident webhook, and trigger an Azure Function. Which reusable object stores this shared list of notification preferences and automated actions?',
    options: [
      'Initiative Definition',
      'Availability Set',
      'Management Group',
      'Action Group'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Alert Rule = threshold condition; this reusable object = the notification & automation target list (Email/SMS/Push/Webhook/Function/Logic App).',
    explanation: 'An Action Group in Azure Monitor is a reusable collection of notification preferences (Email, SMS, Azure app push, Voice) and automated actions (Webhook, ITSM, Azure Function, Logic App, Automation Runbook, Event Hub) that can be referenced by Metric alerts, Log alerts, Activity Log alerts, Service Health alerts, and Cost Budgets.',
    awsComparison: 'Maps directly to an Amazon SNS Topic (plus EventBridge target integrations) referenced across multiple CloudWatch Alarms.'
  },
  {
    id: 'az900-a3-075',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Diagnostic Settings & Log Retention',
    difficulty: 2,
    format: 'multi',
    prompt: 'Compliance regulations require retaining Azure Activity Log records for seven years and running cross-subscription KQL queries over them. Using Diagnostic Settings, to which TWO destinations can you stream Activity Logs to meet long-term archival and KQL querying needs?',
    options: [
      'Azure Advisor',
      'Log Analytics workspace',
      'Azure Storage account',
      'Azure Traffic Manager'
    ],
    correctIndices: [1, 2],
    selectCount: 2,
    awsBridgeHint: 'Default Activity Log retention is only 90 days! Diagnostic Settings routes platform/resource logs to three classic targets: KQL workspace, cheap archival object storage, or streaming Event Hubs.',
    explanation: 'Because the Azure Activity Log retains events for only 90 days natively, Diagnostic Settings let you export it to a **Log Analytics workspace** (for rich KQL querying and up to 12 years archive), an **Azure Storage account** (for low-cost immutable WORM archival), or **Azure Event Hubs** (for streaming to external SIEM tools).',
    awsComparison: 'Identical to configuring a multi-region AWS CloudTrail Trail that delivers logs to both CloudWatch Logs (querying) and an S3 Bucket with Glacier lifecycle rules (7-year archival).'
  },
  {
    id: 'az900-a3-076',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Monitoring & Advisory Facts',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure monitoring and advisory services. Select Yes if true, or No if false.',
    statements: [
      {
        statement: 'Accessing Azure Advisor security and cost recommendations requires purchasing a Premier/Unified Support contract.',
        answer: false
      },
      {
        statement: 'Azure Monitor Metrics are lightweight numerical time-series values suited for near real-time alerting.',
        answer: true
      },
      {
        statement: 'The Azure Activity Log automatically records every `SELECT` SQL query executed inside a guest virtual machine database.',
        answer: false
      }
    ],
    awsBridgeHint: 'Advisor is 100% free for everyone; Metrics are fast time-series numbers; Activity Log ONLY sees ARM control-plane calls, never inside-guest SQL queries!',
    explanation: 'Azure Advisor is completely free across all subscriptions and support tiers. Azure Monitor Metrics capture time-series numeric data for fast alerting. The Activity Log only records ARM control-plane operations (e.g., creating/deleting a VM), never internal data-plane SQL queries (which require SQL Auditing / Diagnostic Settings).',
    awsComparison: 'Big relief for AWS architects: unlike AWS Trusted Advisor (which gates most checks behind paid Business/Enterprise Support), all 5 pillars of Azure Advisor are free on every Azure account!'
  },
  {
    id: 'az900-a3-077',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Service Health Alerts',
    difficulty: 2,
    format: 'single',
    prompt: 'How are Azure Service Health alerts implemented under the hood so operations teams are notified immediately when an Azure regional incident or planned maintenance occurs?',
    options: [
      'As Activity Log alert rules triggered by `ServiceHealth` category events routed to an Azure Monitor Action Group',
      'As ReadOnly resource locks placed on virtual networks',
      'As Azure Policy `Deny` definitions applied to the Tenant Root Group',
      'As KQL queries inside the Azure Pricing Calculator'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Service Health notifications travel as administrative/service-health events through the subscription Activity Log pipeline into Action Groups.',
    explanation: 'Service Health integrates directly with Azure Monitor: because service health notifications are written to the subscription’s Activity Log (`ServiceHealth` category), Service Health alerts create Activity Log alert rules wired to your chosen Action Groups (email, SMS, webhook, PagerDuty/ITSM).',
    awsComparison: 'Parallels routing AWS Health events through Amazon EventBridge rules to an SNS topic.'
  },
  {
    id: 'az900-a3-078',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'SLA Fundamentals',
    difficulty: 1,
    format: 'single',
    prompt: 'What happens contractually if a General Availability paid Azure service fails to meet its published monthly Service Level Agreement (SLA) uptime percentage?',
    options: [
      'Microsoft issues an immediate wire-transfer cash refund equal to ten times your annual IT budget',
      'Microsoft automatically upgrades all virtual machines in your tenant to the largest SKU for free permanently',
      'Customers can submit a claim to receive a Service Credit applied as a percentage discount against that affected service’s monthly Azure bill',
      'All resource locks and Azure Policies in the subscription are disabled'
    ],
    correctIndices: [2],
    awsBridgeHint: 'Cloud SLAs never wire cash back to your bank account—remedies are percentage billing credits applied to future invoices for the affected service.',
    explanation: 'An Azure SLA defines Microsoft’s formal commitment for uptime and connectivity. If a paid GA service falls below its guaranteed uptime threshold (e.g., `< 99.9%`), the customer is eligible—upon submitting a validated claim—for a tiered **Service Credit** (such as 10%, 25%, or 100% credit off that service’s monthly fee).',
    awsComparison: 'Identical to AWS Service Level Agreements (10% / 25% / 100% AWS Service Credits applied against future monthly charges upon claim).'
  },
  {
    id: 'az900-a3-079',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Composite SLA Calculation',
    difficulty: 2,
    format: 'single',
    prompt: 'An application requires both an Azure App Service web app (99.9% SLA) and a backend API service (99.9% SLA) to be simultaneously available in series for every user request to succeed. What is the composite SLA of this two-tier synchronous architecture?',
    options: [
      '99.9%',
      '99.8001%',
      '99.9999%',
      '199.8%'
    ],
    correctIndices: [1],
    awsBridgeHint: 'Multiply independent serial probabilities in decimal form: `0.999 × 0.999 = 0.998001`! Notice that serial dependencies ALWAYS lower your composite SLA.',
    explanation: 'When multiple services are required in series (if either fails, the request fails), you multiply their decimal availability probabilities: `0.999 × 0.999 = 0.998001`, or **99.8001%**. Adding synchronous serial dependencies always reduces the overall composite SLA below the lowest single component.',
    awsComparison: 'Universal cloud reliability math tested heavily on AZ-900: serial components multiply (`A × B`), whereas active-active redundant zones reduce failure probability (`1 - (1 - A)(1 - B)`).'
  },
  {
    id: 'az900-a3-080',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Improving Application SLA',
    difficulty: 3,
    format: 'multi',
    prompt: 'An architect discovers that a mission-critical checkout workload’s composite SLA is lower than the business’s 99.95% target. Which TWO architectural changes will directly increase the workload’s achievable composite SLA?',
    options: [
      'Deploy redundant application instances across multiple Availability Zones (or paired regions with automatic failover)',
      'Add a third synchronous microservice in series between the web frontend and database',
      'Migrate the production database to a Free-tier or Public Preview SKU',
      'Decouple synchronous tiers using an asynchronous message queue or fallback cache so temporary downstream hiccups do not fail user requests'
    ],
    correctIndices: [0, 3],
    selectCount: 2,
    awsBridgeHint: 'To raise composite SLA: add parallel redundancy (Availability Zones / multi-region) and eliminate synchronous serial single points of failure!',
    explanation: 'Deploying redundant instances across Availability Zones raises single-tier SLAs (for example, VMs jump from 99.9% single-instance to 99.99% zone-redundant), and decoupling synchronous tiers with queues/fallback paths prevents cascading serial failures. Adding serial services lowers composite SLA, and Free/Preview SKUs drop the composite SLA to 0%!',
    awsComparison: 'Classic Well-Architected Reliability design: Multi-AZ redundancy + SQS/EventBridge asynchronous decoupling.'
  },
  {
    id: 'az900-a3-081',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Virtual Machine SLA Tiers',
    difficulty: 2,
    format: 'single',
    prompt: 'Which Azure Virtual Machine deployment configuration provides the highest Microsoft-guaranteed connectivity SLA of 99.99%?',
    options: [
      'Deploying two or more virtual machine instances across two or more Availability Zones in the same Azure region',
      'Deploying a single virtual machine using Standard HDD storage',
      'Deploying a single virtual machine using Premium SSD storage',
      'Deploying two virtual machines inside a single Availability Set within one datacenter'
    ],
    correctIndices: [0],
    awsBridgeHint: 'Memorize the Azure VM SLA ladder: Single VM (Standard HDD = 95%, Standard SSD = 99.5%, Premium SSD = 99.9%) -> Availability Set (99.95%) -> Availability Zones (99.99%)!',
    explanation: 'Azure Virtual Machine SLAs scale directly with fault-isolation redundancy: a single VM gets up to 99.9% (with Premium SSD/Ultra Disk on all disks), two or more VMs in an Availability Set (rack/PDU isolation in one datacenter) achieve **99.95%**, and two or more VMs across two or more Availability Zones achieve **99.99%**.',
    awsComparison: 'Matches AWS EC2’s SLA jump: Single-AZ EC2 Instance SLA (99.5%) vs. Multi-AZ EC2 SLA (99.99%).'
  },
  {
    id: 'az900-a3-082',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Free & Preview SLA Trap',
    difficulty: 1,
    format: 'single',
    prompt: 'A startup hosts its customer portal on an Azure App Service `F1 Free` plan and connects it to a database feature currently in Public Preview. What is the financially backed SLA for this architecture?',
    options: [
      '99.99%',
      '99.95%',
      '99.9%',
      'No financially backed SLA (0% / excluded from SLA guarantees)'
    ],
    correctIndices: [3],
    awsBridgeHint: 'Golden Microsoft exam rule: Free SKUs and Preview features NEVER carry a financially backed SLA!',
    explanation: 'Free tiers (such as App Service Free F1 or Shared D1, and Azure Cosmos DB free preview features) and ALL services/features in Private or Public Preview offer **no financially backed SLA**. Including any 0%-SLA component in a synchronous path drops the guaranteed composite SLA of the entire path to zero.',
    awsComparison: 'Same rule in AWS: Beta/Preview services and free unreserved sandboxes are excluded from financially backed SLA commitments.'
  },
  {
    id: 'az900-a3-083',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'SLA Ladder Ordering',
    difficulty: 2,
    format: 'sequence',
    prompt: 'Arrange the following Azure deployment architectures in ascending order from the LOWEST guaranteed SLA at the top to the HIGHEST guaranteed SLA at the bottom.',
    correctSequence: [
      'A workload relying on a Public Preview service (No SLA)',
      'Two serial services that each have a 99.9% SLA (99.8001% Composite SLA)',
      'A single Azure Virtual Machine using Premium SSD for all disks (99.9% SLA)',
      'Two or more Virtual Machines deployed across Availability Zones (99.99% SLA)'
    ],
    awsBridgeHint: 'Compare the numbers from lowest to highest: `0% (No SLA)` -> `99.8001%` -> `99.9%` -> `99.99%`.',
    explanation: 'From lowest to highest uptime guarantee: Public Preview features carry no SLA (`0%`), two serial `99.9%` components yield `99.8001%`, a single VM with Premium SSD yields `99.9%` (Availability Set would be `99.95%`), and multi-instance VMs across Availability Zones deliver `99.99%`.',
    awsComparison: 'Great mental ladder for composite reliability questions on both AZ-900 and AZ-104.'
  },
  {
    id: 'az900-a3-084',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'Service Release Lifecycle',
    difficulty: 1,
    format: 'sequence',
    prompt: 'Arrange the stages of an Azure feature’s lifecycle in chronological order from initial invite-only testing to end-of-life.',
    correctSequence: [
      'Private Preview',
      'Public Preview',
      'General Availability (GA)',
      'Service Retirement'
    ],
    awsBridgeHint: 'Closed invite-only beta -> Open opt-in beta -> Production-ready with full SLA & support -> Announced deprecation/end-of-life.',
    explanation: 'New Azure services progress through **Private Preview** (invite-only evaluation for select customers, no SLA), **Public Preview** (open to all Azure customers for testing/feedback, no SLA), **General Availability (GA)** (production-ready, backed by formal SLAs and full Microsoft Support), and eventually **Service Retirement** (announced well in advance via Azure Service Health advisories).',
    awsComparison: 'Mirrors AWS Private Beta -> Public Preview -> General Availability (GA) -> Deprecation.'
  },
  {
    id: 'az900-a3-085',
    track: 'az-900',
    act: 3,
    domain: 'az900-governance',
    subtopic: 'SLAs & Preview Lifecycles',
    difficulty: 2,
    format: 'yes-no',
    prompt: 'Evaluate each statement regarding Azure Service Lifecycles and SLAs. Select Yes if true, or No if false.',
    statements: [
      {
        statement: 'Features in Public Preview are open to all Azure customers for evaluation, but they are excluded from Azure SLAs and should not be used for mission-critical production workloads.',
        answer: true
      },
      {
        statement: 'Adding more synchronous dependent services in series to an architecture always increases its overall composite SLA.',
        answer: false
      },
      {
        statement: 'Once a feature reaches General Availability (GA), it is supported for production workloads under standard Microsoft support plans and applicable SLAs.',
        answer: true
      }
    ],
    awsBridgeHint: 'Public Preview = open to all, NO SLA; serial dependencies LOWER composite SLA; GA = full production SLA & support!',
    explanation: 'Public Preview lets any customer test upcoming Azure capabilities in non-production environments without SLA coverage (and sometimes limited support). Multiplying serial SLAs (`< 1.0 × < 1.0`) always *lowers* the composite SLA. General Availability (GA) unlocks full production support and formal SLA guarantees.',
    awsComparison: 'Universal cloud lifecycle & reliability math—keep Preview out of mission-critical paths and watch out for serial SLA multiplication!'
  }
];
