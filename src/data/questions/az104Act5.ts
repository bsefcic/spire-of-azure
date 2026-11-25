import type { ExamQuestion } from '../../types/curriculum';

export const AZ104_ACT5_QUESTIONS: ExamQuestion[] = [
  {
    id: 'az104-a5-001',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Azure Monitor Metrics Store',
    difficulty: 1,
    format: 'single',
    prompt:
      'You deploy ten production Azure Virtual Machines and do not configure any Log Analytics Workspace, VM extensions, or Diagnostic Settings. How long are standard host-level platform metrics (such as `Percentage CPU`, `Network In Total`, and `Disk Read Operations/Sec`) retained by default in the Azure Monitor Metrics database?',
    options: [
      '14 days',
      '30 days',
      '93 days',
      '365 days',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Platform hypervisor metrics are collected automatically at 1-minute intervals free of charge and retained for roughly three months (93 days) without any workspace configuration.',
    explanation:
      'Azure Monitor automatically collects platform metrics at 1-minute frequency for most Azure resources at zero cost and stores them in a lightweight time-series database for **93 days** by default. To retain metrics longer than 93 days, export `AllMetrics` via a Diagnostic Setting to a Log Analytics Workspace or Azure Storage Account.',
    awsComparison:
      'Compare with **Amazon CloudWatch Metrics** (which retains 1-minute datapoints for 15 days, 5-minute datapoints for 63 days, and 1-hour datapoints for 15 months); Azure Monitor retains 1-minute platform metrics uniformly for **93 days**.',
  },
  {
    id: 'az104-a5-002',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Azure Activity Log Retention',
    difficulty: 1,
    format: 'single',
    prompt:
      'During a security audit, an investigator asks who deallocated a production virtual machine 60 days ago and which IP address submitted the Azure Resource Manager request. No custom logging was previously configured on the subscription. Where is this control-plane event stored natively, and what is its default retention period?',
    options: [
      'Azure Activity Log, retained natively for 90 days',
      'Resource Diagnostic Logs, retained natively for 30 days',
      'Microsoft Entra Sign-in Logs, retained natively for 180 days',
      'Azure Network Watcher Flow Logs, retained natively for 93 days',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Think of CloudTrail Event History—every subscription records control-plane `Write`, `Delete`, and `Action` operations automatically for 90 days!',
    explanation:
      'The **Azure Activity Log** is a subscription-level platform log that automatically captures all Azure Resource Manager (ARM) control-plane operations (who, what, when, status, caller IP) plus Service Health events, retaining them natively at no charge for **90 days**.',
    awsComparison:
      'Exact counterpart to **AWS CloudTrail Event History**! Remarkably, both AWS CloudTrail Event History and the Azure Activity Log retain free built-in control-plane history for **90 days** by default!',
  },
  {
    id: 'az104-a5-003',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Exporting Activity Logs',
    difficulty: 2,
    format: 'multi',
    selectCount: 3,
    prompt:
      'Corporate compliance mandates retaining Azure Activity Log records for **7 years**, running interactive KQL audit queries over the past year, and streaming events in real time to an external third-party SIEM platform. When configuring **Diagnostic Settings** on the subscription\'s Activity Log, which THREE native destination types support these use cases? (Select 3.)',
    options: [
      'Send to a Log Analytics Workspace (`AzureActivity` table)',
      'Send to an Azure Service Bus Topic',
      'Archive to an Azure Storage Account',
      'Stream to an Azure Event Hub',
      'Replicate to an Azure Site Recovery Cache Vault',
    ],
    correctIndices: [0, 2, 3],
    awsBridgeHint:
      'Remember the big three native Azure Monitor Diagnostic Setting sinks: KQL query engine, low-cost blob archive, and high-throughput Kafka-compatible event streaming!',
    explanation:
      'Both subscription **Activity Log Diagnostic Settings** and **Resource Diagnostic Settings** support three core Azure destinations (plus Partner Solutions): (1) **Log Analytics Workspace** (`AzureActivity` table for KQL queries, alerting, and up to 12-year archive), (2) **Azure Storage Account** (low-cost immutable/lifecycle-managed JSON blob archive), and (3) **Azure Event Hubs** (real-time streaming ingestion into Splunk, Datadog, Sentinel, or QRadar).',
    awsComparison:
      'Maps cleanly to AWS CloudTrail Trails: **Storage Account** ≈ **S3 Bucket**; **Log Analytics Workspace** ≈ **CloudWatch Logs / CloudTrail Lake**; **Azure Event Hubs** ≈ **Amazon Kinesis Data Streams / EventBridge** to SIEM!',
  },
  {
    id: 'az104-a5-004',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Control Plane vs Resource Logs',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Distinguish between the Subscription **Activity Log** and **Resource Diagnostic Logs** in Azure Monitor by evaluating each statement:',
    statements: [
      {
        statement:
          'Deleting an Azure Key Vault resource or modifying its RBAC role assignments is captured automatically in the Subscription Activity Log.',
        answer: true,
      },
      {
        statement:
          'Reading a secret value inside an Azure Key Vault (`SecretGet` data-plane call) is recorded in the Subscription Activity Log by default.',
        answer: false,
      },
      {
        statement:
          'Resource Diagnostic Settings are disabled by default on newly created Azure resources and must be enabled per resource (or via Azure Policy) to capture resource-plane logs.',
        answer: true,
      },
    ],
    awsBridgeHint:
      'Just like CloudTrail Management Events vs Data Events, Azure splits ARM control-plane changes (Activity Log, auto-on) from data-plane operations inside a resource (Resource Logs, off by default)!',
    explanation:
      '1. **True**: Creating, updating, deleting, or changing RBAC on any ARM resource hits the ARM control plane and logs to the **Activity Log**. 2. **False**: Reading a Key Vault secret (`SecretGet`), reading a Storage blob (`StorageRead`), or executing a SQL query happens on the **data plane**—never in the Activity Log! 3. **True**: Resource Diagnostic Settings (`AuditEvent`, `StorageRead`, etc.) are **off by default** and must be explicitly configured.',
    awsComparison:
      'Identical mental model to **AWS CloudTrail Management Events** (enabled by default for 90 days) vs **CloudTrail Data Events / S3 Server Access Logs / ALB Access Logs** (disabled by default until explicitly turned on)!',
  },
  {
    id: 'az104-a5-005',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Governance-Driven Diagnostic Settings',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your organization has 15 subscriptions where developers frequently deploy new Azure Key Vaults and Azure SQL Databases. Security requires that EVERY current and future Key Vault and SQL Database automatically receive a Diagnostic Setting forwarding `Audit` logs to a central Log Analytics Workspace without manual administrator intervention. What should you implement?',
    options: [
      'A subscription-level Alert Processing Rule with an Automation Runbook',
      'A single Data Collection Rule associated at the tenant root group',
      'An Activity Log Diagnostic Setting with Cross-Region Restore enabled',
      'An Azure Policy assignment at the Management Group scope using built-in `DeployIfNotExists` diagnostic definitions and a Managed Identity remediation task',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Think of AWS Config Conformance Packs with Auto-Remediation across an AWS Organization—Azure has a native governance engine with `DeployIfNotExists` templates for Diagnostic Settings!',
    explanation:
      'Because Resource Diagnostic Settings must exist on each individual Azure resource, manually configuring hundreds of resources doesn\'t scale. Assigning built-in **Azure Policy** `DeployIfNotExists` initiatives (e.g., *Enable logging by category group for supported resources to Log Analytics*) at the Management Group or Subscription scope automatically deploys Diagnostic Settings onto every new resource (~15 mins after creation) and remediates existing resources via a Remediation Task!',
    awsComparison:
      'Cleaner than AWS custom EventBridge + Lambda or Config Remediation SSM documents—Microsoft ships ready-made `DeployIfNotExists` Azure Policy definitions for Diagnostic Settings on nearly every resource type!',
  },
  {
    id: 'az104-a5-006',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Metrics Explorer & Dimensions',
    difficulty: 2,
    format: 'single',
    prompt:
      'In **Azure Monitor Metrics Explorer**, you plot the `Transactions` metric for a general-purpose v2 Storage Account (`stprodlogs01`). Instead of a single combined line, you want separate color-coded time-series lines on the same chart broken down by HTTP/SMB response outcome (such as `Success`, `ClientOtherError`, `AuthorizationError`). Which Metrics Explorer feature should you apply?',
    options: [
      'Change the metric aggregation from Sum to Min',
      'Use Apply splitting on the ResponseType (or API name) metric dimension',
      'Convert the chart into an Activity Log Alert rule',
      'Create a Data Collection Endpoint for the Storage Account',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Multi-dimensional metrics carry metadata key-value attributes—splitting by a dimension breaks a single aggregate curve into one series per dimension value!',
    explanation:
      'Platform metrics in Azure Monitor often include **Dimensions** (key-value pairs describing attributes of the metric, such as `ResponseType`, `ApiName`, `GeoType`, or `HttpStatusCode`). Clicking **Apply splitting** in Metrics Explorer groups and renders separate lines for each dimension value, while **Add filter** narrows the chart to specific dimension values. Charts can then be pinned directly to shared **Azure Dashboards** or **Azure Monitor Workbooks**.',
    awsComparison:
      'In **CloudWatch Metrics**, dimensions are rigid part of a metric\'s unique identity (often requiring Metric Math `SEARCH()` expressions to aggregate or split across dimensions); Azure Monitor Metrics Explorer makes **Filter** and **Apply splitting** effortless one-click operations!',
  },
  {
    id: 'az104-a5-007',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Diagnostic Setting Regional Constraints',
    difficulty: 2,
    format: 'single',
    prompt:
      'You are configuring a **Resource Diagnostic Setting** on an Azure Application Gateway located in **`West Europe`**. You want to send logs both to a central **Log Analytics Workspace** (`LAW-Global` in `East US`) and to an archival **Azure Storage Account** (`starchive01` in `East US`). In the portal, `LAW-Global` is selectable, whereas `starchive01` does not appear in the Storage Account dropdown. Why?',
    options: [
      'A destination Storage Account (or Event Hub) in a Resource Diagnostic Setting MUST reside in the same Azure region as the monitored resource, whereas a Log Analytics Workspace can be in any region',
      'Diagnostic Settings cannot send logs to both a Log Analytics Workspace and a Storage Account at the same time',
      'Storage Accounts used for Diagnostic Settings must use Premium Page Blob SKU',
      'Application Gateway logs can only be sent to Application Insights',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Watch this subtle regional asymmetry on AZ-104: Log Analytics Workspaces accept cross-region Diagnostic Settings, while Storage Accounts and Event Hubs MUST sit in the exact same region as the resource!',
    explanation:
      'When configuring a **Resource Diagnostic Setting** on a regional resource (like an Application Gateway, Key Vault, or VNet in `West Europe`):\n• **Storage Account** and **Event Hub** destinations **MUST be in the exact same Azure region** (`West Europe`) as the monitored resource!\n• **Log Analytics Workspace** destinations **CAN reside in any Azure region** (`East US`), though cross-region egress bandwidth charges may apply.\n(Note: Each resource can have up to **5** separate Diagnostic Settings, and each setting can check all three destinations simultaneously!)',
    awsComparison:
      'Very similar to how **AWS ALB Access Logs** require an S3 bucket in the **same AWS Region** as the ALB, while CloudWatch cross-region observability can centralize queries across regions!',
  },
  {
    id: 'az104-a5-008',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Azure Monitor Agent (AMA) & DCRs',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'You are migrating 100 Windows and Linux VMs from legacy monitoring agents to the modern **Azure Monitor Agent (AMA)** governed by **Data Collection Rules (DCRs)**. Which TWO architectural capabilities are natively provided by AMA and DCRs? (Select 2.)',
    options: [
      'Authentication via System-Assigned or User-Assigned Managed Identity without storing shared Workspace IDs and primary keys on VMs',
      'Automatic continuous block-level OS disk replication to a secondary Azure region for disaster recovery',
      'Granular XPath / Syslog facility filtering and multi-homing support on both Linux and Windows VMs to route specific log subsets to multiple Log Analytics Workspaces',
      'Zero VM extension installation required inside Azure Virtual Machines',
      'Unlimited free retention of all guest OS logs inside the Activity Log',
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Think of replacing old static-credential agents with IAM Role-authenticated unified CloudWatch Agent JSON configs stored centrally in SSM Parameter Store—plus native Linux & Windows multi-workspace routing!',
    explanation:
      'The **Azure Monitor Agent (`AzureMonitorWindowsAgent` / `AzureMonitorLinuxAgent`)** replaces the retired MMA/OMS and Telegraf agents:\n1. **Managed Identity auth**: Uses VM Managed Identities instead of shared workspace keys.\n2. **Centralized DCRs**: Define exact Windows Event XPath queries (e.g., `Security!*[System[(EventID=4625)]]`), Linux Syslog facilities/levels, and Perf counters centrally.\n3. **Full Multi-homing**: Unlike legacy Linux OMS agent (which could only report to 1 workspace), AMA on **both Linux and Windows** can associate with multiple DCRs routing security logs to a SecOps workspace and perf counters to an AppOps workspace!',
    awsComparison:
      '**AMA + DCR** ≈ **Unified CloudWatch Agent + SSM centralized config** (authenticatable via EC2 Instance Profile / IAM Role, filtering metrics/logs before shipping to specific CloudWatch Log Groups).',
  },
  {
    id: 'az104-a5-009',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'AMA & DCR Onboarding Workflow',
    difficulty: 2,
    format: 'sequence',
    prompt:
      'You need to collect Windows Security Event ID `4625` (failed logon attempts) and `% Committed Bytes In Use` memory counters from 25 existing Windows Server Azure VMs into a new central Log Analytics Workspace using the **Azure Monitor Agent (AMA)**. Arrange the steps in the proper deployment sequence:',
    correctSequence: [
      'Provision the target Log Analytics Workspace and ensure Managed Identity is enabled on the target Azure VMs',
      'Create a Data Collection Rule defining the Windows Security XPath filter, Performance Counter data source, and destination Log Analytics Workspace',
      'Create Data Collection Rule Associations linking the 25 Azure VMs to the DCR (which automatically installs the AzureMonitorWindowsAgent extension)',
      'Run KQL queries against the SecurityEvent/Event and Perf tables in Log Analytics to confirm telemetry ingestion',
    ],
    awsBridgeHint:
      'In modern Azure Monitor, you build the Workspace + DCR recipe *first*, and associating VMs to that DCR automatically pushes the AMA extension onto the VMs!',
    explanation:
      'When you associate Azure VMs with a **Data Collection Rule (DCR)** in the Azure Portal or via Policy/ARM (`dataCollectionRuleAssociations`), Azure automatically deploys the `AzureMonitorWindowsAgent` or `AzureMonitorLinuxAgent` VM extension if not already present, downloads the DCR configuration to the agent, and begins streaming filtered guest OS events into the specified Log Analytics Workspace.',
    awsComparison:
      'Streamlines the AWS CloudWatch Agent rollout (where installing the agent via SSM Run Command and applying `AmazonCloudWatch-ManageAgent` config are two separate SSM actions unless wrapped in State Manager).',
  },
  {
    id: 'az104-a5-010',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Data Collection Endpoints (DCEs)',
    difficulty: 3,
    format: 'single',
    prompt:
      'Your enterprise isolates VMs inside an air-gapped virtual network with **no public internet egress** and uses **Azure Monitor Private Link Scope (AMPLS)** so all telemetry travels exclusively over Private Endpoints. In addition to Azure Monitor Agent and a Data Collection Rule, which Azure Monitor resource is REQUIRED to ingest custom text/IIS logs or accept private-link ingestion traffic from AMA?',
    options: [
      'Alert Processing Rule',
      'Local Network Gateway',
      'Application Security Group',
      'Data Collection Endpoint (DCE)',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'When AMA needs a specific regional ingestion URL—such as over Private Link (AMPLS) or when uploading custom text/JSON/IIS files—it connects through a dedicated endpoint resource associated with the DCR/VM.',
    explanation:
      'While standard public Windows Event / Syslog / Perf DCRs don\'t strictly require a manual DCE anymore, a **Data Collection Endpoint (DCE)** (deployed in the **same region** as the monitored VMs) IS required whenever using **Azure Monitor Private Link Scope (AMPLS)** for private network isolation, **Custom Text / JSON Logs**, **IIS Logs**, or the **Logs Ingestion API**.',
    awsComparison:
      'Analogous to provisioning a **VPC Interface Endpoint (`com.amazonaws.<region>.logs` / `monitoring`)** so the CloudWatch Agent can push logs privately without an Internet/NAT Gateway!',
  },
  {
    id: 'az104-a5-011',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'KQL Aggregations & Time Bucketing',
    difficulty: 2,
    format: 'single',
    prompt:
      'You want to write a **Kusto Query Language (KQL)** query in Log Analytics against the `Perf` table that calculates the **average** `% Processor Time` per virtual machine (`Computer`) grouped into **5-minute time intervals** over the **last 24 hours**. Which KQL query is syntactically accurate?',
    options: [
      'SELECT Computer, AVG(CounterValue) FROM Perf WHERE TimeGenerated > NOW() - 24h GROUP BY Computer, 5m',
      'Perf | where TimeGenerated > ago(24h) and CounterName == "% Processor Time" | summarize avg(CounterValue) by Computer, bin(TimeGenerated, 5m)',
      'Perf | filter TimeGenerated < 24h | project avg(CounterValue) over Computer every 5m',
      'Perf | top 24h by CounterName == "% Processor Time" | extend avg(CounterValue), bin(5m)',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'KQL is a pipe-delimited (`|`) dataflow language: `where` filters rows with `ago(24h)`, `summarize` computes aggregations (`avg()`, `count()`), and `bin(TimeGenerated, 5m)` buckets timestamps!',
    explanation:
      'Master these core KQL idioms for AZ-104:\n• Pipe operator `|` chains transformations.\n• `where TimeGenerated > ago(24h)` filters records from the past 24 hours (`==` is case-sensitive equality; `=~` is case-insensitive).\n• `summarize avg(CounterValue) by Computer, bin(TimeGenerated, 5m)` groups rows by hostname and 5-minute time buckets (`bin()`).',
    awsComparison:
      'Very close to **CloudWatch Logs Insights** pipe syntax (`filter @message like ... | stats avg(cpu) by host, bin(5m)`), except KQL is far richer and powers Azure Monitor, Application Insights, Microsoft Sentinel, and Azure Resource Graph!',
  },
  {
    id: 'az104-a5-012',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'KQL Heartbeat Agent Monitoring',
    difficulty: 1,
    format: 'single',
    prompt:
      'Each virtual machine running the Azure Monitor Agent automatically emits one health record per minute to its Log Analytics Workspace. Which built-in Log Analytics table and KQL query pattern should you use to trigger an alert whenever any reporting VM stops sending agent telemetry for more than **15 minutes**?',
    options: [
      'Heartbeat | summarize LastCall = max(TimeGenerated) by Computer | where LastCall < ago(15m)',
      'AzureActivity | where OperationNameValue == "AgentOffline" and Duration > 15m',
      'Syslog | where SeverityLevel == "Dead" and TimeGenerated > ago(15m)',
      'Usage | project Computer | where IsBillable == false',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Look for the dedicated once-per-minute agent pulse table, find each server\'s most recent timestamp (`max(TimeGenerated)`), and check if that timestamp is older than `ago(15m)`!',
    explanation:
      'Every Azure Monitor Agent (and legacy MMA agent) sends one record per minute into the **`Heartbeat`** table containing `Computer`, `OSType`, `ComputerIP`, `Version`, and `TimeGenerated`. Grouping by `Computer` with `summarize LastCall = max(TimeGenerated) by Computer | where LastCall < ago(15m)` (scoped over the last 24h) immediately surfaces VMs that crashed, lost network connectivity, or had their agent stopped!',
    awsComparison:
      'Cleaner than AWS SSM PingStatus + CloudWatch missing-data alarms: `Heartbeat` gives you a single SQL/KQL-queryable inventory & uptime table across Azure VMs and Azure Arc hybrid servers!',
  },
  {
    id: 'az104-a5-013',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'KQL Column Shaping Operators',
    difficulty: 3,
    format: 'single',
    prompt:
      'You query the `AzureActivity` table in Log Analytics, which contains dozens of columns. You want the final result set to display **ONLY** four columns—`TimeGenerated`, `Caller`, `OperationNameValue`, and a newly calculated column `ResourceShortName`—dropping all other columns. Which KQL operator accomplishes this in a single step?',
    options: [
      'extend',
      'summarize',
      'project',
      'distinct',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Know the classic KQL distinction: `extend` appends a calculated column while keeping ALL existing columns; this other operator acts like SQL `SELECT col1, col2` and drops unmentioned columns!',
    explanation:
      'In KQL:\n• **`project TimeGenerated, Caller, OperationNameValue, ResourceShortName = ...`** selects, reorders, renames, or computes ONLY the listed columns and **drops all others**.\n• **`extend`** computes and appends a new column while **retaining all existing columns**.\n• **`project-away`** drops specific named columns while keeping the rest.',
    awsComparison:
      'KQL `project` ≈ CloudWatch Logs Insights `fields` / SQL `SELECT` (strict projection); KQL `extend` ≈ adding a derived field without hiding raw columns.',
  },
  {
    id: 'az104-a5-014',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Log Analytics Retention & Access Modes',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Evaluate the following statements regarding **Log Analytics Workspace** data retention and RBAC access control modes:',
    statements: [
      {
        statement:
          'By default, standard tables in a newly created Pay-As-You-Go Log Analytics Workspace retain interactive queryable data for 30 days (90 days for `AzureActivity` and `Usage`), and interactive retention can be extended up to 730 days.',
        answer: true,
      },
      {
        statement:
          'When workspace access mode is set to "Use resource or workspace permissions" (resource-context RBAC), a developer with `Monitoring Reader` on `VM-App01` can view `VM-App01`\'s logs from that shared workspace without seeing logs from other teams\' VMs.',
        answer: true,
      },
      {
        statement:
          'Logs moved into long-term Archive (up to 12 years total retention) remain immediately visible in standard real-time dashboard KQL queries at zero search or restore cost.',
        answer: false,
      },
    ],
    awsBridgeHint:
      '30d default -> 730d max interactive -> 12yr total archive (which requires paid Search Jobs or Restore to query!), and Resource-context RBAC automatically scopes KQL queries to the user\'s Azure RBAC resources!',
    explanation:
      '1. **True**: Default interactive retention is **30 days** (free) and scales up to **730 days** (2 years), with **Archive / Total retention** extending up to **12 years** (`4,383` days). 2. **True**: **Resource-context RBAC** lets Azure scope KQL queries by `_ResourceId` automatically so one central workspace safely serves many app teams without granting workspace-wide `Log Analytics Reader`. 3. **False**: Archived logs beyond the interactive window are NOT returned by regular interactive queries—you must run a paid **Search Job** or **Restore** operation to access archived data.',
    awsComparison:
      'Resource-context RBAC is a massive advantage over **CloudWatch Logs** (where access is typically all-or-nothing at the Log Group level rather than dynamically filtered per resource ARN inside a shared table!).',
  },
  {
    id: 'az104-a5-015',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'DCR Ingestion-Time Transformations',
    difficulty: 3,
    format: 'single',
    prompt:
      'Your security team enables verbose Firewall logs into a Log Analytics Workspace, causing monthly log ingestion bills to spike by 60% due to noisy `DEBUG` and health-probe rows that nobody ever queries. How can you drop those `DEBUG` rows and strip unneeded payload columns **before** Log Analytics ingestion charges are calculated?',
    options: [
      'Create a Saved Search in Log Analytics using `| where Level != "DEBUG"`',
      'Configure an ingestion-time KQL Transformation (`source | where ... | project-away ...`) inside a Data Collection Rule',
      'Lower the Log Analytics Workspace interactive retention from 30 days to 7 days',
      'Apply an Alert Processing Rule to suppress `DEBUG` severity events',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Saved queries and short retention only act *after* ingestion fees are already billed—you must filter `source` in the ingestion pipeline itself!',
    explanation:
      'Log Analytics bills primarily **per GB ingested** (and retention < 31 days is already included, so lowering retention below 30 days saves $0!). **Ingestion-time KQL Transformations** inside a **Data Collection Rule (DCR)** (`source | where Level != "DEBUG" | project-away VerbosePayload`) execute inside the Azure Monitor pipeline **before storage**, dropping unwanted rows/columns and directly slashing ingestion costs (note: if transformation drops >50% of incoming volume on certain tables, minimal filtering processing fees can apply, still far cheaper than full ingestion).',
    awsComparison:
      'Parallels **CloudWatch Logs Data Protection / Subscription Filter / OpenSearch Ingestion pipelines** dropping verbose fields prior to indexing.',
  },
  {
    id: 'az104-a5-016',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Static vs Dynamic Metric Thresholds',
    difficulty: 2,
    format: 'single',
    prompt:
      'An internal payroll web application processes 5,000 requests/minute on weekday afternoons and fewer than 50 requests/minute overnight and on weekends. Static metric thresholds on `HttpResponseTime` and `Requests` either miss weekday slowdowns or generate false alarms every weekend. Which Azure Monitor Alert feature adapts automatically to daily and weekly seasonal traffic patterns?',
    options: [
      'Metric Alert Rule configured with a Dynamic Threshold condition (using machine learning sensitivity Low, Medium, or High)',
      'Activity Log Alert Rule filtered by Administrative category',
      'Alert Processing Rule with static suppression',
      'Resource Health Alert Rule',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Exact counterpart to CloudWatch Anomaly Detection alarms—ML learns historical seasonality (minimum 3 days / 30+ samples, full weekly seasonality at 10+ days) and builds a dynamic upper/lower band!',
    explanation:
      'Azure Monitor **Metric Alerts** offer two threshold types: **Static** (fixed constant like `CPU > 85%`) and **Dynamic** (machine-learning algorithms continuously learn historical daily/weekly seasonal behavior and alert only when metrics deviate outside normal upper/lower confidence bands, adjustable via `High`, `Medium`, or `Low` alert sensitivity).',
    awsComparison:
      '100% equivalent to **Amazon CloudWatch Anomaly Detection** metric alarms!',
  },
  {
    id: 'az104-a5-017',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Alert Severity Levels',
    difficulty: 1,
    format: 'single',
    prompt:
      'You are standardizing incident response runbooks for Azure Monitor Metric and Log Search Alert Rules, which assign severity values from `Sev 0` through `Sev 4`. Which severity level represents the **highest-urgency Critical** production outage?',
    options: [
      'Sev 4',
      'Sev 1',
      'Sev 0',
      'Sev 5',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Lower integer = higher fire! Zero is the top-priority critical page.',
    explanation:
      'Azure Monitor Alert severities run from `0` (most urgent) to `4` (least urgent):\n• **`Sev 0` = Critical**\n• **`Sev 1` = Error**\n• **`Sev 2` = Warning**\n• **`Sev 3` = Informational**\n• **`Sev 4` = Verbose**',
    awsComparison:
      'CloudWatch Alarms themselves only have states (`OK`, `ALARM`, `INSUFFICIENT_DATA`) without built-in numeric severity tiers; Azure bakes `Sev 0`–`Sev 4` directly into every Metric and Log Alert Rule so Action Groups and Alert Processing Rules can filter by severity!',
  },
  {
    id: 'az104-a5-018',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Alert Processing Rules (Maintenance Suppression)',
    difficulty: 2,
    format: 'single',
    prompt:
      'Every Saturday between `01:00` and `04:00 UTC`, Azure Update Manager patches and reboots 80 VMs inside `RG-Production`, triggering dozens of `Sev 1` and `Sev 2` alerts that wake on-call engineers via SMS and PagerDuty. Compliance requires that the alerts **continue to fire and be logged** in Azure Monitor history, while **all outgoing Action Group notifications are muted** during that recurring weekly window. What should you create?',
    options: [
      'An Azure Automation script that deletes and recreates all Alert Rules every Saturday',
      'A new Action Group with zero recipients attached permanently to RG-Production',
      'A Service Health Planned Maintenance advisory',
      'An Alert Processing Rule scoped to RG-Production with "Suppress notifications" and a weekly Saturday 01:00–04:00 UTC recurrence schedule',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Formerly called "Action Rules", this layer sits *between* fired alerts and Action Groups—letting you mute pages during maintenance windows (or attach a global Action Group at scale) without disabling the underlying alert rules!',
    explanation:
      '**Alert Processing Rules** modify how *fired* alerts are handled across a Subscription, Resource Group, or specific resources (with optional filters on Severity, Monitor Service, or Alert Rule name). They do NOT prevent alerts from firing or recording in the Alerts dashboard—instead, they either:\n1. **Suppress notifications** (one-time, permanent, or recurring maintenance schedules!), or\n2. **Apply action group** (e.g., auto-attach a central SecOps webhook to every `Sev 0` alert in a subscription!).',
    awsComparison:
      'Huge operational upgrade over **Amazon CloudWatch Alarms** (where silencing maintenance pages historically required calling `DisableAlarmActions` / `EnableAlarmActions` via EventBridge Scheduler + Lambda or using Systems Manager Maintenance Windows). Azure builds scheduled alert muting natively into **Alert Processing Rules**!',
  },
  {
    id: 'az104-a5-019',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Action Groups Notifications & Remediation',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'When an Azure Monitor Alert Rule triggers an **Action Group**, it can send human notifications (Email, SMS, Azure mobile app Push, Voice call) AND invoke automated programmatic actions. Which TWO sets of automated action types are natively supported inside an Azure Monitor Action Group? (Select 2.)',
    options: [
      'Direct SSH shell command execution inside private Linux VMs without any extension or runbook',
      'Automation Runbook, Azure Function, and Logic App',
      'Automatic VNet Peering creation and Route Table BGP modification',
      'Automatic Azure Site Recovery Commit and Reprotect',
      'Event Hubs, ITSM connector (such as ServiceNow), Webhook, and Secure Webhook',
    ],
    correctIndices: [1, 4],
    awsBridgeHint:
      'Think of an SNS Topic + EventBridge Targets combined into one reusable object: serverless compute/workflow triggers + webhooks/event streams/ITSM ticketing!',
    explanation:
      'An **Action Group** splits targets into:\n• **Notifications**: `Email Azure Resource Manager Role` (e.g., email everyone with the `Owner` or `Monitoring Contributor` role!), `Email/SMS message/Push/Voice`.\n• **Actions** (max combinations per group): **Automation Runbook**, **Azure Function**, **Logic App**, **Event Hub**, **ITSM** (ServiceNow, etc. via ITSM Connector), **Webhook**, and **Secure Webhook** (Microsoft Entra authenticated webhook). Enabling the **Common Alert Schema** standardizes JSON payloads across Metric, Log, and Activity Log alerts!',
    awsComparison:
      '**Azure Action Group** ≈ **Amazon SNS Topic** (Email/SMS/HTTPS Webhook/Lambda) + **Systems Manager OpsCenter / Incident Manager**!',
  },
  {
    id: 'az104-a5-020',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Alert Rule Mechanics & Statefulness',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Evaluate the following technical behaviors of Azure Monitor **Alert Rules** and **Action Groups**:',
    statements: [
      {
        statement:
          'Metric Alert Rules are stateful by default: an alert fires once when the threshold is breached, will not keep re-firing every minute while unhealthy, and automatically resolves (sending a Resolved notification) once the metric returns to normal.',
        answer: true,
      },
      {
        statement:
          'Azure Service Health alerts (for regional platform incidents and planned maintenance) are stored and managed as Activity Log Alert Rules.',
        answer: true,
      },
      {
        statement:
          'Each Action Group can only be linked to a single Alert Rule; monitoring 50 Alert Rules requires creating 50 separate Action Groups.',
        answer: false,
      },
    ],
    awsBridgeHint:
      'Metric alerts track `Fired` vs `Resolved` state cleanly, Service Health rides inside the Activity Log pipeline, and Action Groups are modular reusable fan-out targets!',
    explanation:
      '1. **True**: Metric alerts are **stateful** by default (`Automatically resolve alerts = Checked`), firing once upon breach and auto-closing with a `Resolved` payload when healthy for 3 consecutive evaluations. (Activity Log alerts, by contrast, are *stateless*—every matching control-plane event fires a new alert!). 2. **True**: Service Health events write to the subscription Activity Log (`Category = ServiceHealth`), so Service Health alerts are literally Activity Log Alert Rules! 3. **False**: One Action Group (`AG-OnCall-Ops`) can be reused across hundreds of Metric, Log, and Activity Log alert rules!',
    awsComparison:
      'Metric Alert stateful `Fired`/`Resolved` lifecycle matches **CloudWatch Alarms** (`ALARM` -> `OK`); Service Health Alerts match **AWS Health EventBridge rules**!',
  },
  {
    id: 'az104-a5-021',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Azure Service Health vs Resource Health',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your cloud operations team wants automated Microsoft Teams webhook notifications whenever Microsoft announces **Planned Maintenance** or an active **Regional Platform Outage** affecting `Virtual Machines` or `Azure Kubernetes Service` specifically in `East US` and `Central US`. Which Azure capability provides personalized subscription-scoped platform health alerting?',
    options: [
      'Azure Status page (`status.azure.com`) RSS feed',
      'Azure Service Health Alert configured for target services, regions, and event types',
      'Network Watcher Connection Monitor',
      'Application Insights Smart Detection',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Remember the Azure health trio: *Azure Status* = global public marketing dashboard; *Service Health* = personalized regional/service platform incidents + maintenance alerts; *Resource Health* = single-instance health (`VM1` rebooted due to host hardware failure)!',
    explanation:
      'Know all three Azure Health views for AZ-104:\n• **Azure Status**: Global public page of widespread outages (not personalized).\n• **Azure Service Health**: Personalized view of Azure services & regions *your subscriptions actually use*, supporting **Service Health Alerts** via Action Groups for `Service issues`, `Planned maintenance`, `Health advisories`, and `Security advisories`.\n• **Azure Resource Health**: Granular health of **one specific resource instance** (e.g., distinguishing whether `VM-Prod01` stopped due to *User-initiated* shutdown vs *Platform-initiated* host hardware failure!).',
    awsComparison:
      '**Azure Status** ≈ public **AWS Service Health Dashboard** (`health.aws.amazon.com`); **Azure Service Health + Resource Health** ≈ **AWS Health Dashboard** (Personal Health Dashboard + EventBridge `aws.health` events)!',
  },
  {
    id: 'az104-a5-022',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Application Insights Availability Tests',
    difficulty: 2,
    format: 'single',
    prompt:
      'You want to monitor your external customer portal (`https://app.contoso.com/login`) from **five global Azure point-of-presence locations** every 5 minutes, verifying both an HTTP `200 OK` status code and proactive **SSL/TLS certificate expiration warnings** 14 days before expiry—firing an alert only if at least 3 of the 5 global locations fail simultaneously. Which feature accomplishes this without writing custom code?',
    options: [
      'Application Insights Standard Availability Test',
      'Azure Load Balancer HTTPS Health Probe',
      'Network Watcher IP Flow Verify',
      'Log Analytics Heartbeat KQL Alert',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Think of Route 53 HTTP Health Checks / CloudWatch Synthetics Canaries pinging your public URL from multiple worldwide PoPs with N-of-M quorum failure thresholds!',
    explanation:
      '**Application Insights Availability Tests** provide synthetic external endpoint monitoring from global Microsoft PoPs:\n• **Standard test** (replaces legacy URL ping test): Checks HTTP/HTTPS response codes, custom headers/verbs, dependent requests, and **SSL/TLS certificate validity & proactive expiration countdown** with configurable multi-location quorum alerting (e.g., fail if >= 3 of 5 locations fail).\n• **Custom `TrackAvailability` test**: Runs custom C#/JavaScript multi-step Playwright/API scripts via Azure Functions.',
    awsComparison:
      'Directly corresponds to **Amazon CloudWatch Synthetics Canaries** and **Route 53 Global HTTPS Health Checks**!',
  },
  {
    id: 'az104-a5-023',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Application Insights APM Architecture',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Evaluate the following statements regarding **Workspace-based Application Insights**:',
    statements: [
      {
        statement:
          'Workspace-based Application Insights stores its telemetry in a Log Analytics Workspace (using tables such as `AppRequests`, `AppDependencies`, and `AppExceptions`) so application logs and infrastructure VM/PaaS logs can be joined in unified KQL queries.',
        answer: true,
      },
      {
        statement:
          'Application Map automatically discovers outbound HTTP API calls, Azure SQL databases, and Storage dependencies to visualize bottleneck latency and failure rates across distributed components.',
        answer: true,
      },
      {
        statement:
          'Opening the Live Metrics stream in the Azure Portal during an incident requires restarting the production web app and bills double Log Analytics ingestion rates for streamed telemetry.',
        answer: false,
      },
    ],
    awsBridgeHint:
      'Classic standalone App Insights is retired—all modern App Insights instances store data in a Log Analytics Workspace, draw distributed X-Ray maps, and offer 1-second **Live Metrics** at ZERO Log Analytics ingestion cost!',
    explanation:
      '1. **True**: Workspace-based Application Insights unifies APM data (`AppRequests`, `AppTraces`, `AppDependencies`) inside your Log Analytics Workspace. 2. **True**: **Application Map** renders distributed OpenTelemetry dependency graphs automatically. 3. **False**: **Live Metrics** gives real-time (1-second latency) CPU, request, and failure inspection with **zero restart** (once SDK/auto-instrumentation is enabled) and **Live Metrics stream data is NOT stored or billed in Log Analytics**!',
    awsComparison:
      '**Application Insights** combines **AWS X-Ray** + **CloudWatch Application Signals** + **CloudWatch Synthetics** + **Real-User Monitoring (RUM)** into one cohesive, developer-loved experience!',
  },
  {
    id: 'az104-a5-024',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Network Watcher IP Flow Verify',
    difficulty: 1,
    format: 'single',
    prompt:
      'Developers report that `VM-Api01` (`10.2.1.4`) cannot connect outbound to a partner SFTP server (`198.51.100.77`) on TCP port `22`. Multiple Subnet-level and NIC-level Network Security Groups are in place. Which **Azure Network Watcher** diagnostic tool immediately tells you whether the packet is **Allowed or Denied** and names the **exact NSG security rule** blocking it?',
    options: [
      'Next Hop',
      'IP Flow Verify',
      'VPN Troubleshoot',
      'Packet Capture',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Match the exact symptom to the exact Network Watcher tool: when the question asks "Allowed/Denied + which NSG rule", pick the 5-tuple flow checker!',
    explanation:
      '**IP Flow Verify** tests a simulated 5-tuple packet (`Protocol`, `Direction: Inbound/Outbound`, `Local IP & Port`, `Remote IP & Port`) against a specific VM\'s Network Interface. Within seconds (and without installing any VM agent!), it returns `Access allowed` or `Access denied` along with the **exact NSG and Security Rule** (e.g., `DenyAllOutBound` or `BlockSshEgress`) responsible!',
    awsComparison:
      'Like a fast, focused single-NIC version of **AWS VPC Reachability Analyzer** specifically targeting Security Group / NSG rule evaluation!',
  },
  {
    id: 'az104-a5-025',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Network Watcher Next Hop',
    difficulty: 1,
    format: 'single',
    prompt:
      'Traffic from `VM-App02` (`10.1.4.5`) to an on-premises subnet (`172.20.10.25`) is not arriving at your Virtual Network Gateway. You suspect a conflicting User-Defined Route or missing BGP route is steering packets toward an NVA or dropping them (`None`). Which **Azure Network Watcher** tool evaluates effective routes for `172.20.10.25` and outputs the exact `Next Hop Type`, `Next Hop IP`, and `Route Table ID`?',
    options: [
      'IP Flow Verify',
      'Effective Security Rules',
      'Next Hop',
      'NSG Diagnostics',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'IP Flow Verify = NSG firewall rules; this tool = Route Tables (UDR vs BGP vs System routes)!',
    explanation:
      'Network Watcher **Next Hop** takes a source VM, NIC, source IP, and **Destination IP** (`172.20.10.25`), evaluates Longest Prefix Match and route precedence (`UDR > BGP > System`), and immediately returns the winning **Next Hop Type** (`VirtualNetworkGateway`, `VirtualAppliance`, `VNetPeering`, `Internet`, `VNetLocal`, or `None`) and the **Route Table ID** (`System Route` or specific UDR resource ID) so you know exactly where Azure is routing the packet!',
    awsComparison:
      'Saves you from manually eyeball-calculating Longest Prefix Match across propagated BGP and static routes like you have to do in the AWS VPC Route Table console!',
  },
  {
    id: 'az104-a5-026',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Network Watcher Connection Troubleshoot',
    difficulty: 2,
    format: 'single',
    prompt:
      'Both **IP Flow Verify** and **Next Hop** report that TCP port `443` from `VM-Web01` to `VM-Sql01` (or an external FQDN `https://api.fabrikam.com`) is allowed by NSGs and routed properly, yet live connections still fail—possibly due to a guest OS Windows Firewall rule, DNS failure, or remote socket refusal. Which Network Watcher tool tests live end-to-end TCP/ICMP connectivity, and what prerequisite must exist on `VM-Web01`?',
    options: [
      'Connection Troubleshoot, requiring the Network Watcher Agent VM extension (`NetworkWatcherAgentWindows` / `NetworkWatcherAgentLinux`) on the source VM',
      'Traffic Analytics, requiring an Azure Bastion Premium host',
      'IP Flow Verify in Deep Packet mode, requiring IP forwarding on the NIC',
      'Diagnostic Settings, requiring an Event Hub namespace',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Unlike control-plane metadata checks (`IP Flow Verify` / `Next Hop`), sending an *actual live probe packet* from inside `VM-Web01` requires an agent extension inside `VM-Web01`!',
    explanation:
      'Memorize which Network Watcher tools are **agentless** vs **require the `NetworkWatcherAgent` VM extension**:\n• **Agentless** (SDN control-plane checks): `IP Flow Verify`, `Next Hop`, `Effective Security Rules`, `VPN Troubleshoot`, `VNet/NSG Flow Logs`.\n• **Require `NetworkWatcherAgentWindows` / `NetworkWatcherAgentLinux` extension**: **Connection Troubleshoot** (live end-to-end TCP/ICMP test to VM, FQDN, URI, or IPv4—catching guest OS firewalls, DNS issues, hop-by-hop latency), **Connection Monitor** (continuous SLA monitoring), and **Packet Capture**!',
    awsComparison:
      '`IP Flow Verify` / `Next Hop` ≈ **AWS VPC Reachability Analyzer** (control-plane static model analysis, zero packets sent); **Connection Troubleshoot** ≈ **AWS VPC Network Access Analyzer / SSM live `Test-NetConnection` probe**!',
  },
  {
    id: 'az104-a5-027',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Network Watcher Packet Capture',
    difficulty: 2,
    format: 'single',
    prompt:
      'An intermittent TLS handshake reset occurs on a hardened production Linux VM (`VM-Pay01`) where direct interactive SSH access is restricted by policy. Using **Azure Network Watcher Packet Capture** (with `NetworkWatcherAgentLinux` already installed), where can you instruct Azure to save the resulting `.cap` capture file?',
    options: [
      'Directly into the Azure Activity Log table only',
      'Directly into an Azure Key Vault secret only',
      'To an Azure DNS TXT record',
      'To an Azure Storage Account blob container, a local file path on the VM disk, or both simultaneously',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Remote on-demand `tcpdump` triggered via ARM APIs (or even automatically via an Alert Action!) writes `.cap` files to Blob Storage, local VM disk, or both—with byte/time caps so you never fill the disk!',
    explanation:
      'Network Watcher **Packet Capture** lets you remotely trigger filtered packet captures (by protocol, local/remote IP, port, bytes-per-packet truncate, max bytes per session, and max duration up to 5 hours) via Portal/CLI/REST without SSH/RDP access! Output `.cap` files (readable in Wireshark) can be saved to an **Azure Storage Account**, a **local file path on the VM**, or **both**.',
    awsComparison:
      'Much lighter for one-off troubleshooting than **AWS VPC Traffic Mirroring** (which clones ENI VXLAN traffic 24/7 to a target NLB/appliance ENI, rather than writing an on-demand `.cap` directly to S3)!',
  },
  {
    id: 'az104-a5-028',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Network Watcher VPN Troubleshoot',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your Site-to-Site IPsec VPN Connection between `VNet-Hub` and your Dallas datacenter drops every two hours with suspected Phase 2 PFS mismatch errors. When you initiate **VPN Troubleshoot** in Azure Network Watcher against the Virtual Network Gateway / Connection, which Azure resource MUST you specify to store the resulting diagnostic logs (`IKEDiagnostics.txt`, `ConnectivityLogs.txt`)?',
    options: [
      'A Recovery Services Vault',
      'An Azure Storage Account',
      'An Application Insights instance',
      'An Azure Private DNS Zone',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Nearly every bulk file-producing diagnostic tool in Network Watcher (`Packet Capture`, `VPN Troubleshoot`, `Flow Logs`) writes its raw files to the exact same storage service!',
    explanation:
      'Running **VPN Troubleshoot** in Network Watcher inspects your Virtual Network Gateway and VPN Connection health and writes detailed zip/text archives (`IKEDiagnostics`, `AdapterStats`, `ConnectivityLogs`, `DropLogs`) into a blob container inside an **Azure Storage Account** that you select before starting the diagnostic run.',
    awsComparison:
      'Compare with **AWS Site-to-Site VPN Tunnel Logs**, which stream IKE Phase 1/Phase 2 logs to **CloudWatch Logs** or **Kinesis Data Firehose -> S3**.',
  },
  {
    id: 'az104-a5-029',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Flow Logs & Traffic Analytics',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'You want to enable **Virtual Network Flow Logs** (or NSG Flow Logs) along with **Traffic Analytics** to visualize top talkers, geo-IP threat intelligence maps, and unexpected east-west traffic flows across `VNet-Prod` (`East US`). Which TWO Azure resources are required to store the raw flow logs and run Traffic Analytics? (Select 2.)',
    options: [
      'An Azure Storage Account located in the exact same region (`East US`) to store raw JSON flow log blobs',
      'An Azure Managed Grafana Enterprise workspace in West US',
      'A Log Analytics Workspace to store and query aggregated, enriched Traffic Analytics records',
      'An Azure Backup Vault with Zone-Redundant Storage',
      'An Azure Bastion Standard host in VNet-Prod',
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Raw 1-minute JSON flow tuples land in same-region Blob Storage first; Traffic Analytics then crunches those blobs every 10 or 60 minutes and writes enriched insights into a Log Analytics Workspace!',
    explanation:
      'Know the two-tier storage pipeline for **VNet Flow Logs / NSG Flow Logs + Traffic Analytics**:\n1. **Azure Storage Account (MUST be in the same region as the VNet/NSG, with Hierarchical Namespace / Data Lake Gen2 NOT conflicting if legacy NSG logs used—standard GPv2 in same region)**: Stores raw 5-tuple JSON flow records + byte/packet counts (Version 2).\n2. **Log Analytics Workspace** (can be in supported regions): **Traffic Analytics** aggregates raw flow logs (every 10 min or 60 min), enriches IPs with Microsoft Threat Intelligence / GeoIP / VNet topology, and writes to `NTANetAnalytics` in Log Analytics!',
    awsComparison:
      '**VNet/NSG Flow Logs -> Storage Account** ≈ **AWS VPC Flow Logs -> S3**; **Traffic Analytics -> Log Analytics** ≈ **Athena + GuardDuty VPC Flow Log analysis / CloudWatch Contributor Insights** built in!',
  },
  {
    id: 'az104-a5-030',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Network Watcher Architecture Matrix',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Evaluate the following operational statements about **Azure Network Watcher**:',
    statements: [
      {
        statement:
          'Azure Network Watcher is a regional service (typically auto-created inside `NetworkWatcherRG` per region when you create or update a VNet), so monitoring VNets across three Azure regions requires an enabled Network Watcher instance in each of those three regions.',
        answer: true,
      },
      {
        statement:
          'Running IP Flow Verify or Next Hop requires installing the `NetworkWatcherAgent` VM extension inside the target virtual machine first.',
        answer: false,
      },
      {
        statement:
          'Effective Security Rules displays the evaluated union of both the Subnet-associated NSG and NIC-associated NSG rules for a running virtual machine.',
        answer: true,
      },
    ],
    awsBridgeHint:
      'Network Watcher is strictly per-region (`NetworkWatcher_eastus`, `NetworkWatcher_westeurope`), SDN metadata tools (`IP Flow Verify`, `Next Hop`, `Effective Security Rules`) are agentless, and Effective Security Rules only works while the VM is running!',
    explanation:
      '1. **True**: Network Watcher is regional (Azure auto-creates `NetworkWatcher_<region>` inside `NetworkWatcherRG` whenever you create a VNet in that region). 2. **False**: `IP Flow Verify`, `Next Hop`, and `Effective Security Rules` query the Azure SDN host fabric directly with **no guest VM extension needed**! 3. **True**: `Effective Security Rules` shows both Subnet NSG and NIC NSG rules side by side on a **running** VM\'s NIC (note: if a VM is stopped/deallocated, Effective Routes & Effective Security Rules cannot be computed!).',
    awsComparison:
      'Bonus exam tip in Statement 3: because Azure deallocates fabric NIC attachment when a VM is `Stopped (deallocated)`, `Effective Routes` and `Effective Security Rules` require the VM to be in the **`Running`** state!',
  },
  {
    id: 'az104-a5-031',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Azure Backup Vault Region Rule',
    difficulty: 1,
    format: 'single',
    prompt:
      'You manage 20 production Azure Virtual Machines running in **`Central US`** and need to configure daily automated backups using **Azure Backup** with Geo-Redundant protection (`GRS`). In which Azure region MUST you create the **Recovery Services Vault**?',
    options: [
      'East US 2 (the paired secondary region of Central US)',
      'Any Azure region within the United States geography',
      'Central US (the exact same region as the virtual machines being backed up)',
      'Global (Recovery Services Vaults are non-regional global resources)',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Memorize this critical contrast between Azure Backup and Azure Site Recovery: **Backup Vaults MUST sit in the SAME region as the source VM**; **ASR Vaults MUST sit in a DIFFERENT region**!',
    explanation:
      'To back up Azure VMs (or Azure Files / SQL in Azure VMs) with **Azure Backup**, the **Recovery Services Vault MUST reside in the exact same Azure region** (`Central US`) as the source VMs! Cross-region off-site protection is handled automatically under the hood by the vault\'s **Geo-Redundant Storage (`GRS` / `RA-GRS`)** replicating backup data to the Azure paired region (`East US 2`).',
    awsComparison:
      'Matches **AWS Backup** primary Backup Vault placement (where primary backups land in a vault in the **same AWS Region** as the EC2/EBS resource, and Cross-Region Copy replicates recovery points to a secondary region vault).',
  },
  {
    id: 'az104-a5-032',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'VM Backup Two-Phase & Instant Restore',
    difficulty: 2,
    format: 'single',
    prompt:
      'When Azure Backup runs a scheduled daily backup of a production Azure VM under a Standard Backup Policy, it executes a **two-phase** backup process. Why does restoring a VM from yesterday\'s recovery point complete dramatically faster than restoring from a 20-day-old recovery point?',
    options: [
      'Phase 1 retains local disk snapshots in the Instant Restore tier (configurable from 1 to 5 days) alongside the disks before/alongside Phase 2 transferring data to the Recovery Services Vault',
      'Yesterday\'s backup is stored in unencrypted RAM inside Azure Bastion',
      'Phase 1 keeps a hot standby clone VM running in a hidden subscription for 7 days',
      'Backups older than 24 hours are automatically compressed onto physical LTO magnetic tape',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Phase 1 = instant local disk snapshot (kept locally 1–5 days, default 2 days, for ultra-fast restore without waiting to stream terabytes back out of the vault!); Phase 2 = asynchronous transfer into Vault storage!',
    explanation:
      'Azure VM Backup runs in **two distinct phases**:\n• **Phase 1 (Snapshot / Instant Restore)**: The `VMSnapshot` / `VMSnapshotLinux` extension takes a consistent disk snapshot stored locally with the disks in a hidden restore point collection for **1 to 5 days** (default **2 days**; minimum 1 day if backup frequency is weekly/enhanced). Restoring during this window uses **Instant Restore** directly from local snapshots in minutes!\n• **Phase 2 (Vault Transfer)**: Snapshot blocks are transferred into the **Recovery Services Vault** (`Vault-standard` / `Vault-archive`) for long-term daily/weekly/monthly/yearly retention.',
    awsComparison:
      'Similar to **EBS Fast Snapshot Restore / local EBS Snapshots** vs cold archive tiers (**AWS Backup Vault Cold Storage**), except Azure gives you fast 1–5 day local **Instant Restore** automatically on every Standard/Enhanced VM backup policy!',
  },
  {
    id: 'az104-a5-033',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Azure Backup Item-Level File Recovery',
    difficulty: 2,
    format: 'single',
    prompt:
      'A finance analyst accidentally overwrote three Excel spreadsheets (`Q4-Forecast.xlsx`) on data drive `F:\\` of a 4-TB Windows Server Azure VM (`VM-Fin01`) two days ago. You need to recover ONLY those three files in the fastest, least disruptive way without rebooting `VM-Fin01`, overwriting its disks, or provisioning a 4-TB clone VM. Which Azure Backup feature should you use?',
    options: [
      'Replace existing disks restore',
      'Cross-Region Restore to the paired region',
      'Azure Site Recovery Test Failover',
      'File Recovery (mounts the recovery point volumes locally as temporary drives via a downloaded iSCSI script)',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Instead of restoring whole multi-terabyte volumes just to grab 3 files, Azure Backup lets you download a tiny executable/script that mounts the backup snapshot over **iSCSI** as local drive letters (`G:\\`, `H:\\`) in seconds!',
    explanation:
      '**File Recovery** from an Azure VM backup generates a lightweight password-protected executable (Windows) or Python/bash script (Linux). Running it on `VM-Fin01` (or another compatible recovery machine) establishes a secure **iSCSI** tunnel directly to the recovery point in Azure Backup, mounting the backed-up volumes as read-only local drive letters/mount points (for up to 12 hours until you click **Unmount disks**) so you simply copy the 3 `.xlsx` files out!',
    awsComparison:
      'Awesome built-in time-saver! In AWS EC2/EBS Backup, AWS Backup added S3 item-level restore, while for EBS snapshots admins historically had to create a new EBS volume from the snapshot, attach it to an EC2 instance, mount it, copy files, detach, and delete the volume—Azure\'s **iSCSI File Recovery** skips provisioning any disk!',
  },
  {
    id: 'az104-a5-034',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'MARS Agent File & Folder Backup',
    difficulty: 2,
    format: 'single',
    prompt:
      'You have an on-premises physical Windows Server 2022 file server in a branch office (no Hyper-V or VMware infrastructure) and want to back up ONLY the `D:\\LegalDocs` folder and Windows **System State** up to **three times per day** directly to an Azure Recovery Services Vault. Which backup component should you install on the server, and what critical credential rule applies?',
    options: [
      'Azure Monitor Agent (AMA); authenticate with a Data Collection Endpoint',
      'Microsoft Azure Recovery Services (MARS) agent; generate and safely store the client encryption passphrase externally because Microsoft cannot recover it if lost',
      'Azure Site Recovery Mobility Service; store the pre-shared key in Local Network Gateway',
      'VMSnapshot extension; enable Managed Identity auto-rotation',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'MARS = direct Windows file/folder/System State backup agent (up to 3x/day, Windows ONLY), encrypted client-side before upload with a passphrase that **even Microsoft support CANNOT reset or recover**!',
    explanation:
      'Know the Azure Backup agent lineup for AZ-104:\n• **Azure VM Agent (`VMSnapshot`)**: Whole-VM image/disk backup of Azure VMs (1x/day Standard or hourly Enhanced).\n• **MARS Agent (Microsoft Azure Recovery Services / Azure Backup Agent)**: Installed directly on **Windows** (on-premises or inside an Azure VM) to back up specific **files, folders, and System State** up to **3 times per day** directly to a Recovery Services Vault. Requires >=16-character **passphrase** created during registration—if lost, existing backups are permanently unreadable!\n• **MABS (Microsoft Azure Backup Server) / DPM**: App-aware backup of VMware, Hyper-V, SQL, SharePoint, Exchange, and Linux.',
    awsComparison:
      'No direct 1-to-1 AWS native file-level OS backup agent (AWS Backup Gateway backs up full VMware VMs, or DataSync copies files without point-in-time System State); MARS is heavily tested on AZ-104!',
  },
  {
    id: 'az104-a5-035',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Azure Backup Soft Delete',
    difficulty: 2,
    format: 'single',
    prompt:
      'Ransomware attackers compromise a Subscription Contributor account, stop backup protection on ten SQL Virtual Machines in a Recovery Services Vault, and click **Delete backup data**. Because **Soft Delete** is enabled by default on the Recovery Services Vault, what happens to the deleted recovery points?',
    options: [
      'They are permanently purged within 60 minutes unless Azure Bastion is enabled',
      'They are moved to the subscription Activity Log for 90 days',
      'They are retained in a soft-deleted state for 14 additional days at no extra cost (and up to 180 days if configured), allowing an administrator to Undelete and restore them',
      'They are converted into unmanaged VHD page blobs in a random storage account',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Memorize **14 days** free built-in retention! Even if an attacker or careless admin deletes backup data, Soft Delete keeps all recovery points intact for 14 days (extendable up to 180 days + lockable to "Always On")!',
    explanation:
      '**Soft Delete** for Azure Backup protects backup data from accidental deletion or malicious ransomware actors. When backup data is deleted, recovery points remain preserved for **14 days** at **zero additional storage cost** (configurable from **14 to 180 days**, with an optional irreversible **Always On** lock and **Multi-User Authorization (MUA)** via Resource Guard!). During that window, an admin simply runs **Undelete** and restores normally.',
    awsComparison:
      'Serves the same anti-ransomware purpose as **AWS Backup Vault Lock** (WORM compliance mode) — with a built-in 14-day recycle bin on all Recovery Services and Backup Vaults by default!',
  },
  {
    id: 'az104-a5-036',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Cross-Region Restore & Storage Redundancy Lock',
    difficulty: 3,
    format: 'single',
    prompt:
      'Six months ago, an administrator created a Recovery Services Vault (`RSV-East`) configured with **Locally-Redundant Storage (`LRS`)** and began backing up 40 production Azure VMs. Today, auditors require **Cross-Region Restore (CRR)** so you can test restoring any VM into the Azure paired secondary region (`West US`) on demand, even when `East US` is healthy. How must you fulfill this requirement?',
    options: [
      'Create a new Recovery Services Vault configured with Geo-Redundant Storage (`GRS`) and Cross-Region Restore enabled (`RA-GRS`), because storage redundancy cannot be changed from LRS once items are protected in a vault',
      'Flip the Storage Replication toggle on RSV-East directly from LRS to RA-GRS in the Vault Properties blade',
      'Attach an Azure NAT Gateway to RSV-East to replicate LRS snapshots across regions',
      'Enable VNet Global Peering on RSV-East',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Two killer AZ-104 Backup rules in one scenario: (1) Cross-Region Restore strictly requires `GRS` + CRR (`RA-GRS`), and (2) Vault storage redundancy (`LRS`/`ZRS`/`GRS`) locks permanently the moment the FIRST backup item is protected!',
    explanation:
      '1. **Storage Redundancy Lock**: On a Recovery Services Vault, default redundancy is `GRS`, which you can change to `LRS` or `ZRS` **ONLY BEFORE any backup item is registered/protected**! Once items are protected in an `LRS` vault, the replication setting is permanently locked.\n2. **Cross-Region Restore (CRR)**: Normally with plain `GRS`, you cannot restore in the paired region until Microsoft formally declares a regional disaster. Enabling **Cross-Region Restore** switches the vault to **`RA-GRS`** (Read-Access Geo-Redundant Storage), letting you restore VMs/SQL in the paired region **at any time** for compliance drills! To move from `LRS`, you must provision a **new vault** with `GRS` + `CRR` (`RA-GRS`).',
    awsComparison:
      'Major Azure gotcha! In AWS Backup, you can add a Cross-Region Copy rule to an existing Backup Plan at any time without replacing your vault. In Azure, choosing `LRS` on day 1 permanently locks that Recovery Services Vault out of `GRS` and Cross-Region Restore!',
  },
  {
    id: 'az104-a5-037',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Recovery Services Vault vs Backup Vault Lifecycle',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Evaluate the following operational statements regarding **Recovery Services Vaults**, **Backup Vaults**, and VM restoration:',
    statements: [
      {
        statement:
          'Backing up Azure Blobs, Azure Database for PostgreSQL Servers, and standalone Azure Managed Disks uses an Azure **Backup Vault** rather than a Recovery Services Vault.',
        answer: true,
      },
      {
        statement:
          'Restoring an Azure VM using the **Replace existing** option requires specifying a staging Storage Account and replaces the disks on the existing VM rather than creating a brand-new VM resource.',
        answer: true,
      },
      {
        statement:
          'You can delete a Recovery Services Vault immediately in a single click even while active or soft-deleted backup items still exist inside it.',
        answer: false,
      },
    ],
    awsBridgeHint:
      'Azure has two vault generations (Recovery Services Vault = VMs/Files/SQL-in-VM/ASR; Backup Vault = Disks/Blobs/PostgreSQL/AKS), in-place disk replacement uses staging storage, and Azure fiercely blocks deleting non-empty vaults!',
    explanation:
      '1. **True**: Know which vault protects what! **Recovery Services Vault** = Azure VMs, Azure Files, SQL/SAP HANA in Azure VM, MARS, MABS, and ASR. **Backup Vault** = Managed Disks, Azure Blobs, PostgreSQL, and AKS! 2. **True**: **Replace existing** takes a backup recovery point, stages data via a staging Storage Account, and swaps the OS/data disks on the existing VM. 3. **False**: Azure blocks deleting any vault that still contains protected items, registered servers/storage accounts, or **soft-deleted** backup data (you must stop protection + delete data, undelete/purge soft-deleted items if soft delete is unlocked, and unregister containers first!).',
    awsComparison:
      'Same safety guardrail as **AWS Backup Vaults** (which also refuse deletion until every single Recovery Point inside the vault has been deleted!).',
  },
  {
    id: 'az104-a5-038',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'VM Snapshot Consistency & Restore Disks',
    difficulty: 3,
    format: 'multi',
    selectCount: 2,
    prompt:
      'Which TWO statements accurately describe how **Azure VM Backup** captures snapshots and restores customized virtual machine configurations? (Select 2.)',
    options: [
      'Azure Backup requires shutting down and deallocating Windows VMs every night before taking a snapshot',
      'On running Windows VMs, the `VMSnapshot` extension coordinates with Windows Volume Shadow Copy Service (VSS) to capture application-consistent backups without shutting down the VM',
      'Instant Restore local snapshots can be retained for up to 365 days in the local subnet',
      'Choosing "Restore disks" during recovery creates managed disks from the recovery point (plus an exported ARM template) so you can build a VM with custom NICs, custom VM size, or specific Availability Settings',
      'Azure Backup automatically configures continuous 5-second RPO replication via the Mobility Service extension',
    ],
    correctIndices: [1, 3],
    awsBridgeHint:
      'Backups run hot/online via VSS on Windows (`file-system consistent` on Linux unless custom pre/post scripts are used), and **Restore disks** is the go-to exam answer whenever you need full control over NICs/load balancers/custom VM assembly during restore!',
    explanation:
      '1. **Online Consistency**: On running Windows VMs, `VMSnapshot` uses **VSS** for **Application-consistent** backups (memory + pending I/O flushed cleanly with zero downtime!). On Linux VMs, `VMSnapshotLinux` takes **File-system-consistent** backups by default (upgradeable to Application-consistent via custom pre-snapshot/post-snapshot scripts); if a VM is stopped, snapshots are **Crash-consistent**.\n2. **Restore Options**: `Create new VM` builds a basic VM directly; `Replace existing` swaps disks on the original VM; **`Restore disks`** creates raw Managed Disks + a ready-to-edit **ARM Template** in your staging storage account whenever you need multi-NICs, custom naming, or custom load balancer / availability configurations!',
    awsComparison:
      'Compare with AWS EC2 `CreateImage` (`NoReboot=true` crash-consistent by default unless using AWS Backup with VSS-enabled SSM agent on Windows!). Azure VM Backup does VSS app-consistency on Windows **by default**!',
  },
  {
    id: 'az104-a5-039',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'Azure Backup vs Azure Site Recovery',
    difficulty: 1,
    format: 'single',
    prompt:
      'A healthcare customer runs a multi-tier electronic health records application across six Azure VMs in `East US`. Business continuity mandates a **Recovery Point Objective (RPO) under 5 minutes** and a **Recovery Time Objective (RTO) under 30 minutes** to bring the entire multi-VM stack online in `West US 2` if `East US` experiences a catastrophic regional outage. Which Azure service is designed for this requirement?',
    options: [
      'Azure Backup with a Standard Daily Backup Policy',
      'Microsoft Azure Recovery Services (MARS) agent',
      'Azure Monitor Action Group with Dynamic Thresholds',
      'Azure Site Recovery (ASR)',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Daily or even 4-hour snapshots cannot hit a <5-minute RPO and <30-minute orchestrated multi-VM regional failover—you need continuous block-level disaster recovery replication!',
    explanation:
      '**Azure Backup** is designed for data protection against corruption, accidental deletion, ransomware, and long-term archival retention (RPO typically 4–24 hours). **Azure Site Recovery (ASR)** is Microsoft\'s dedicated Business Continuity and Disaster Recovery (**BCDR**) replication engine, providing **continuous asynchronous replication** (crash-consistent recovery points every **5 minutes**, app-consistent every 1–12 hours) and automated multi-VM regional failover for minimal RPO and RTO!',
    awsComparison:
      '**Azure Backup** ≈ **AWS Backup**; **Azure Site Recovery (ASR)** ≈ **AWS Elastic Disaster Recovery (AWS DRS)**!',
  },
  {
    id: 'az104-a5-040',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'ASR Vault Regional Placement Rule',
    difficulty: 2,
    format: 'single',
    prompt:
      'You are setting up **Azure-to-Azure VM replication** with **Azure Site Recovery (ASR)** to protect production VMs running in **`East US`** (source region) so they can fail over to **`West US 2`** (target DR region) if `East US` goes completely offline. In which region MUST the **Recovery Services Vault** for ASR be located?',
    options: [
      'East US (the exact same region as the source VMs)',
      'West US 2 (or any region within the geographic boundary OTHER than the East US source region)',
      'Only in Brazil South',
      'Inside the source VMs\' GatewaySubnet',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Think about blast radius! If `East US` goes completely dark and your DR orchestration vault lived inside `East US`, how could you click the Failover button?!',
    explanation:
      'Memorize the exact inverse rule between Backup and ASR:\n• **Azure Backup**: Vault **MUST be in the SAME region** as the source VMs (`East US`).\n• **Azure Site Recovery (ASR)**: Vault **CANNOT be in the source region** (`East US`)! It MUST be placed in a **different region** (almost always the **target DR region**, `West US 2`), ensuring the ASR control plane remains 100% reachable to execute Failover even if the entire `East US` source region is down!',
    awsComparison:
      'Exact same DR blast-radius principle as **AWS Elastic Disaster Recovery (DRS)**, where you ALWAYS configure and initiate recovery from the **target DR AWS Region**, never the failing source region!',
  },
  {
    id: 'az104-a5-041',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'ASR Mobility Service & Cache Storage',
    difficulty: 2,
    format: 'single',
    prompt:
      'When you enable Azure-to-Azure **Site Recovery** replication for a production VM in `North Europe` targeting `West Europe`, Azure automatically installs an extension inside the source VM and provisions a staging storage resource in `North Europe` before sending delta blocks across the Azure backbone to replica managed disks in `West Europe`. What are these two source-side components?',
    options: [
      'VMSnapshot extension and an Azure Backup Vault',
      'Network Watcher Agent and a Data Collection Endpoint',
      'Mobility Service extension and a Cache Storage Account in the source region',
      'MARS agent and a Local Network Gateway',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'In ASR, an in-guest replication driver intercepts every disk write in RAM and flushes replication logs into a local staging blob account in the *source* region before ASR ships them to target replica disks!',
    explanation:
      'Know the Azure-to-Azure **ASR data path** cold for AZ-104:\n1. **Mobility Service extension** (`SiteRecovery-Windows` / `Linux`): Automatically installed inside the source VM; intercepts disk writes at the OS filter-driver level.\n2. **Cache Storage Account (in the SOURCE region)**: Mobility Service streams write logs over HTTPS 443 to this cache storage account (requires outbound connectivity or Private Endpoints from the source VNet!).\n3. **Target Replica Managed Disks (in the TARGET region)**: ASR asynchronously reads from the Cache Storage Account and writes recovery points onto replica managed disks in the target DR region.',
    awsComparison:
      'Compare with **AWS Elastic Disaster Recovery (DRS)**: ASR\'s **Mobility Service** ≈ **AWS Replication Agent**; ASR\'s **Cache Storage + Target Replica Disks** ≈ AWS DRS **Staging Area Subnet EBS disks** (except ASR needs *zero* staging EC2 replication servers running in the target region!).',
  },
  {
    id: 'az104-a5-042',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'ASR Recovery Plans',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your three-tier application consists of Active Directory Domain Controllers, SQL Server VMs, and IIS Web Server VMs replicated via Azure Site Recovery. During a regional failover, the Domain Controllers MUST boot first, followed by SQL Server second, followed by an automated script attaching a Public IP / updating DNS third, and finally the IIS Web VMs last. Which ASR feature orchestrates this sequence with one click?',
    options: [
      'Backup Policy with tiered retention',
      'Alert Processing Rule',
      'Availability Set update domains',
      'Site Recovery Plan with ordered boot groups and integrated Azure Automation Runbooks',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'This single-click DR runbook groups VMs into sequential Group 1 -> Group 2 -> Group 3 boot waves and lets you inject Automation scripts or manual human checkpoints between groups!',
    explanation:
      'An **Azure Site Recovery (ASR) Recovery Plan** gathers replicated VMs into sequenced **Groups** (`Group 1` boots completely before `Group 2` starts, while VMs within the same group boot in parallel). Between or within groups, you can insert **Pre-actions and Post-actions** implemented as either **Azure Automation Runbooks** (e.g., attaching Public IPs, updating NSGs, flipping Azure Traffic Manager / DNS) or **Manual actions** (operator verification steps).',
    awsComparison:
      'Equivalent to **AWS Elastic Disaster Recovery Launch Plans / AWS Resilience Hub & Systems Manager Automation DR playbooks**—built right into the Recovery Services Vault UI!',
  },
  {
    id: 'az104-a5-043',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'ASR Non-Disruptive Test Failover Drill',
    difficulty: 2,
    format: 'sequence',
    prompt:
      'Auditors require you to perform a live quarterly disaster recovery drill on production VMs replicated with **Azure Site Recovery**, proving the application boots and serves requests in the secondary region **without** disrupting live production traffic or pausing ongoing replication. Arrange the drill workflow in the exact required order:',
    correctSequence: [
      'Select Test Failover on the Recovery Plan or VM and choose an isolated non-production Virtual Network in the secondary region',
      'Sign in to the spun-up test VMs in the secondary region to validate application and database functionality',
      'Click Cleanup test failover and record drill notes so ASR automatically deletes the temporary test VMs and disks',
      'Verify that ongoing production replication health remains Healthy with zero RPO interruption',
    ],
    awsBridgeHint:
      'NEVER run a Test Failover into a VNet peered/connected to production (or duplicate IPs/Active Directory names will collide!), and ALWAYS run `Cleanup test failover` afterward so test VMs don\'t keep billing compute!',
    explanation:
      '**Test Failover** has zero impact on live source VMs or ongoing replication! Best practices tested heavily on AZ-104:\n1. Always pick an **isolated non-production VNet** disconnected from your production hub/ExpressRoute so duplicate private IPs and Domain Controller SPNs don\'t clash.\n2. Validate the test environment.\n3. **Click `Cleanup test failover`**! Until you click Cleanup test failover, the temporary test VMs keep incurring hourly Azure VM compute charges AND block initiating another Test Failover or real Failover!',
    awsComparison:
      'Identical workflow to launching **Drill Instances** in an isolated drill VPC in **AWS Elastic Disaster Recovery (DRS)** and then terminating the drill instances from the DRS console!',
  },
  {
    id: 'az104-a5-044',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'ASR Failover, Commit, Reprotect & Failback',
    difficulty: 3,
    format: 'sequence',
    prompt:
      'Your primary region (`East US`) suffers a prolonged outage, so you decide to fail over production to your secondary region (`West US 2`) using **Azure Site Recovery**—and then fail back to `East US` once `East US` recovers three days later. Arrange the four ASR lifecycle stages in strict chronological order:',
    correctSequence: [
      'Execute Failover from East US to West US 2 selecting the appropriate recovery point (such as Latest / lowest RPO)',
      'Validate the failed-over workloads in West US 2 and click Commit to finalize the failover',
      'Once East US is healthy, click Reprotect so West US 2 VMs start replicating changes back to East US',
      'Execute Planned Failover (Failback) from West US 2 back to East US, followed by Commit and Reprotect',
    ],
    awsBridgeHint:
      'Memorize this 4-word AZ-104 mantra forever: **`Failover` -> `Commit` -> `Reprotect` -> `Failback` (`+ Commit + Reprotect`)**! After initial failover, your DR VMs are running *unprotected* until you click `Reprotect`!',
    explanation:
      'Every AZ-104 candidate must know the exact post-failover state machine in ASR:\n1. **Failover**: Spins up target VMs in `West US 2` (before clicking Commit, you can still click *Change recovery point* if the latest crash-consistent point had data corruption!).\n2. **Commit**: Locks in the chosen recovery point and cleans up older secondary recovery points.\n3. **Reprotect**: **Reverses replication direction** (`West US 2 -> East US`), provisioning a cache storage account in `West US 2` and syncing delta changes back to `East US`!\n4. **Failback**: Fails workloads back from `West US 2` to `East US` once synchronized (followed again by **Commit** and **Reprotect** to restore normal `East US -> West US 2` protection!).',
    awsComparison:
      'Same reverse-replication requirement as **AWS DRS Failback** (where launched recovery instances in Region B must first establish reverse replication back to Region A before cutting back over)!',
  },
  {
    id: 'az104-a5-045',
    track: 'az-104',
    act: 5,
    domain: 'az104-monitoring',
    subtopic: 'ASR Cost & Operational Guardrails',
    difficulty: 3,
    format: 'yes-no',
    prompt:
      'Evaluate the following architectural and cost-governance statements regarding **Azure Site Recovery (ASR)** for Azure-to-Azure VM replication:',
    statements: [
      {
        statement:
          'During normal steady-state ASR replication (before any Failover or Test Failover is triggered), you pay full 24/7 Azure Virtual Machine compute hourly charges for standby VMs in the secondary region.',
        answer: false,
      },
      {
        statement:
          'Running a Test Failover into a production VNet that has active VNet Peering or ExpressRoute connectivity to live production is discouraged because duplicate private IP addresses and hostnames can disrupt live traffic.',
        answer: true,
      },
      {
        statement:
          'If an administrator finishes a DR drill and manually deletes the test VMs from the Virtual Machines blade instead of clicking "Cleanup test failover" in the vault, ASR replication state remains stuck in Test Failover Pending Cleanup until cleaned up in the vault.',
        answer: true,
      },
    ],
    awsBridgeHint:
      'Pilot-light / warm-standby without idle compute! ASR only creates the actual target VM compute instances *at the moment of Failover or Test Failover*!',
    explanation:
      '1. **False**: One of ASR\'s biggest cost advantages is **zero target VM compute charges during steady-state replication**! You only pay the per-protected-instance ASR license fee, Cache Storage + Managed Replica Disk storage, and cross-region egress bandwidth; target VMs are only instantiated when `Failover` or `Test Failover` runs! 2. **True**: Always isolate `Test Failover` in a non-routed test VNet. 3. **True**: Always clean up drills via **Cleanup test failover** inside the Recovery Services Vault.',
    awsComparison:
      'Even leaner than **AWS Elastic Disaster Recovery (DRS)** (which runs small low-cost `t3.small` staging replication EC2 instances in the target region, whereas Azure-to-Azure ASR runs **zero** VMs in the target region until failover!).',
  },
];
