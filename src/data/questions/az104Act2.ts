import type { ExamQuestion } from '../../types/curriculum';

export const AZ104_ACT2_QUESTIONS: ExamQuestion[] = [
  {
    id: 'az104-a2-001',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Storage Account Types & Supported Services',
    difficulty: 1,
    format: 'single',
    prompt:
      'An IoT telemetry pipeline ingests millions of small JSON payloads per minute requiring consistent single-digit millisecond write latency and very high transaction rates using block blobs. Which Azure Storage Account type is purpose-built on solid-state drives (SSDs) for this workload, and what service trade-off comes with it?',
    options: [
      'Standard general-purpose v2 (`StorageV2`), which supports only Blobs and Queues.',
      'Premium block blobs (`BlockBlobStorage`), which supports Block and Append blobs (including Data Lake Storage Gen2) but does NOT support Azure Files, Queues, or Tables.',
      'Premium page blobs (`PageBlobStorage`), which supports Hot, Cool, and Archive tiers.',
      'Premium file shares (`FileStorage`), which supports SMB, NFS, and Block Blobs in the same account.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Think S3 Express One Zone (specialized ultra-low-latency SSD object storage) vs standard multi-purpose storage accounts: specialized Premium accounts only host their single data type!',
    explanation:
      'Azure offers four modern Storage Account types: **Standard general-purpose v2** (HDD-backed, supports Blobs, Files, Queues, Tables, and Hot/Cool/Cold/Archive tiers), **Premium block blobs** (`BlockBlobStorage` — SSD-backed for high-IOPS/small-object/low-latency block & append blobs only), **Premium file shares** (`FileStorage` — SSD-backed for SMB & NFSv4.1 file shares only), and **Premium page blobs** (`PageBlobStorage` — SSD-backed for random R/W page blobs only).',
    awsComparison:
      'Unlike AWS where S3, EFS, SQS, and DynamoDB are completely independent endpoints, Azure bundles Blobs, Files, Queues, and Tables inside a **Standard GPv2 Storage Account**, while splitting SSD-backed **Premium** tiers into dedicated single-service account kinds.'
  },
  {
    id: 'az104-a2-002',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Storage Account Naming Constraints',
    difficulty: 1,
    format: 'single',
    prompt:
      'A Bicep deployment fails when attempting to create an Azure Storage Account named `st-Contoso-Prod-01`. Why was the storage account name rejected by Azure Resource Manager?',
    options: [
      'Storage account names must start with a numeric digit.',
      'Storage account names are only unique within a Resource Group, so hyphens require escaping.',
      'Storage account names cannot exceed 15 characters due to NetBIOS limits.',
      'Storage account names must be 3 to 24 characters long, globally unique across Azure, and contain ONLY lowercase letters and numbers (no hyphens or uppercase characters).'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Even stricter than S3 bucket naming! S3 allows hyphens and dots, whereas Azure Storage Account names forbid ALL punctuation, hyphens, underscores, and uppercase letters.',
    explanation:
      'Because the Storage Account name forms public DNS FQDNs (`<name>.blob.core.windows.net`, `<name>.file.core.windows.net`, etc.), Azure enforces strict rules: **3 to 24 characters**, **lowercase letters (`a-z`) and numbers (`0-9`) ONLY** (hyphens, underscores, and uppercase letters are forbidden!), and **globally unique** across all Azure tenants.',
    awsComparison:
      'Big gotcha for AWS engineers: S3 bucket names allow `my-prod-bucket-01` (3–63 chars with hyphens), whereas Azure Storage Account names reject hyphens completely (`myprodbucket01`, 3–24 chars).'
  },
  {
    id: 'az104-a2-003',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Blob Access Tiers & Early Deletion Penalties',
    difficulty: 2,
    format: 'single',
    prompt:
      'You are optimizing storage costs on a `Standard general-purpose v2` storage account using the `Hot`, `Cool`, `Cold`, and `Archive` blob access tiers. Which statement accurately describes tier scope and minimum retention (early deletion charge) durations?',
    options: [
      '`Hot`, `Cool`, and `Cold` can be set as the Storage Account default access tier, whereas `Archive` can ONLY be set at the individual blob level; minimum retention windows are 30 days (`Cool`), 90 days (`Cold`), and 180 days (`Archive`).',
      '`Archive` can be set as the Storage Account default access tier so every newly uploaded blob enters `Archive` immediately with a 90-day minimum retention.',
      '`Cool` has a 90-day minimum retention window and requires asynchronous rehydration before reading.',
      'All four access tiers are supported on both `Standard general-purpose v2` and `Premium block blobs` accounts.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Compare S3 Standard-IA (30d), Glacier Instant Retrieval (90d), and Glacier Deep Archive (180d)—and remember offline `Archive` is strictly per-blob, never an account-wide default!',
    explanation:
      'On `Standard general-purpose v2` accounts, you can set the account-level default access tier to **`Hot`**, **`Cool`** (30-day minimum retention), or **`Cold`** (90-day minimum retention)—all three are online tiers with millisecond first-byte latency! **`Archive`** (180-day minimum retention, supported on LRS, GRS, and RA-GRS—NOT ZRS/GZRS!) is an offline tier that can ONLY be applied to individual block blobs, never as the account default. Premium block blob accounts do not support Cool/Cold/Archive.',
    awsComparison:
      'Exact mapping to AWS S3: `Hot` ≈ S3 Standard (0d min); `Cool` ≈ S3 Standard-IA (30d min, online); `Cold` ≈ S3 Glacier Instant Retrieval (90d min, online); `Archive` ≈ S3 Glacier Flexible/Deep Archive (180d min, offline rehydration required).'
  },
  {
    id: 'az104-a2-004',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Archive Blob Rehydration Methods',
    difficulty: 2,
    format: 'single',
    prompt:
      'Legal auditors urgently need to read a 4 GB compliance PDF currently stored in the `Archive` access tier, while your data governance policy requires keeping the original blob in the `Archive` tier without resetting its 180-day retention clock. What is the fastest non-destructive way to make the PDF readable?',
    options: [
      'Generate a User Delegation SAS token with `Read` permission directly on the archived blob.',
      'Enable Read-Access Geo-Redundant Storage (`RA-GRS`) and read from the `-secondary` endpoint.',
      'Use the **Copy Blob** operation to copy the archived blob to a **new** blob name in the `Hot` tier with rehydration priority set to **High**.',
      'Mount the blob container via NFS 4.1 to bypass offline tier checks.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Azure offers two ways to rehydrate an offline blob: mutating its tier in place OR copying it into a separate online blob—and High priority speeds <10 GB restores to under an hour!',
    explanation:
      'Blobs in the `Archive` tier are offline and cannot be read or modified directly. Azure provides two rehydration methods: (1) **Set Blob Tier** to `Hot`/`Cool`/`Cold` (mutates the blob in place and incurs early deletion prorated fees if <180 days), or (2) **Copy Blob** to a different blob name in an online tier (`Hot`/`Cool`/`Cold`) within the same storage account—leaving the original archived blob untouched! Choosing **High** priority typically rehydrates blobs under 10 GB in **less than 1 hour** (vs **Standard** priority taking up to **15 hours**).',
    awsComparison:
      'Whereas S3 `RestoreObject` creates a temporary readable copy on the same key for `N` days while keeping the underlying object in Glacier, Azure either permanently changes the blob’s tier OR rehydrates via `Copy Blob` into a new destination blob.'
  },
  {
    id: 'az104-a2-005',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Storage Redundancy Options Overview',
    difficulty: 1,
    format: 'single',
    prompt:
      'Your enterprise architecture requires a Storage Account redundancy configuration that synchronously replicates data across three separate Availability Zones in the primary region AND asynchronously replicates data to a paired secondary Azure region, while ALSO allowing applications to read directly from the secondary region endpoint at any time without initiating a failover. Which SKU meets every requirement?',
    options: [
      '`RA-GZRS` (Read-Access Geo-Zone-Redundant Storage)',
      '`GZRS` (Geo-Zone-Redundant Storage)',
      '`RA-GRS` (Read-Access Geo-Redundant Storage)',
      '`ZRS` (Zone-Redundant Storage)'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Break down the acronym letters: `Z` = 3 Availability Zones in primary region, `G` = async copy to paired region, `RA` = readable `-secondary` endpoint without failing over!',
    explanation:
      'Here is the complete AZ-104 redundancy decoder: **`LRS`** = 3 synchronous copies in 1 datacenter; **`ZRS`** = 3 synchronous copies across 3 Availability Zones in the primary region; **`GRS`** = `LRS` in primary + async copy (`LRS`) to the paired secondary region (secondary is NOT readable until failover!); **`GZRS`** = `ZRS` in primary + async copy (`LRS`) to paired secondary region; **`RA-GRS`** and **`RA-GZRS`** expose `<account>-secondary.<service>.core.windows.net` for immediate read-only access at any time.',
    awsComparison:
      'In AWS S3, standard buckets automatically span ≥3 AZs (`ZRS` equivalent) and Cross-Region Replication copies objects to a second bucket you already own and can read; in Azure, `GRS`/`GZRS` hides the secondary copy unless you pick the **`RA-`** (`Read-Access`) variant!'
  },
  {
    id: 'az104-a2-006',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Replication SKU Conversion & Failover Gotchas',
    difficulty: 3,
    format: 'yes-no',
    prompt:
      'You manage several `Standard general-purpose v2` storage accounts across production subscriptions. Evaluate each of the following statements regarding changing replication SKUs and executing Customer-Managed Storage Failover.',
    statements: [
      {
        statement:
          'You can switch a storage account between `LRS`, `GRS`, and `RA-GRS` directly in the Configuration blade (or via CLI/PowerShell) at any time without downtime or live-migration support requests.',
        answer: true
      },
      {
        statement:
          'Switching an existing `LRS` storage account to `ZRS` (or `GZRS`) is an instantaneous metadata toggle identical to switching from `LRS` to `GRS`.',
        answer: false
      },
      {
        statement:
          'Immediately after a Customer-Managed Failover completes on a `GRS` or `RA-GRS` storage account, the newly promoted primary account in the former secondary region is configured as **`LRS`**, NOT `GRS`.',
        answer: true
      }
    ],
    awsBridgeHint:
      'Non-zonal toggles (`LRS <-> GRS <-> RA-GRS`) are simple config switches, moving into/out of 3-AZ physical placement (`ZRS`) requires data movement/live migration, and failing over to the secondary region leaves you single-region (`LRS`) until you re-enable geo-redundancy!',
    explanation:
      '1) Yes: Converting between `LRS`, `GRS`, and `RA-GRS` is a live configuration update because primary physical placement stays in a single datacenter while background geo-sync starts or stops. 2) No: Moving between single-zone (`LRS`/`GRS`) and multi-zone (`ZRS`/`GZRS`) requires physically redistributing data across 3 Availability Zones—requiring either an Azure **Live Migration** request (zero downtime, completed by Microsoft within ~72h) or manual copy to a new ZRS account. 3) Yes (classic AZ-104 trap!): After Customer-Managed Failover promotes the secondary region to primary, the account becomes **`LRS`**—you MUST manually re-enable `GRS` or `RA-GRS` afterward to restore geo-protection!',
    awsComparison:
      'Failing over an Aurora Global Database or RDS Cross-Region Read Replica similarly leaves you without a secondary replica until you add a new replica region—remember `GRS -> Failover -> LRS`!'
  },
  {
    id: 'az104-a2-007',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Evaluating Data Loss Before Unplanned Storage Failover',
    difficulty: 2,
    format: 'single',
    prompt:
      'The primary region (`East US`) for your `RA-GRS` storage account experiences a catastrophic outage. Before initiating an unplanned Customer-Managed Failover to `West US`, which storage account property should you query to determine the exact timestamp up to which all writes are guaranteed to exist in `West US`?',
    options: [
      '`CreationTime`',
      '`ProvisioningState`',
      '`KeyCreationTime`',
      '`LastSyncTime` (`GeoReplicationStats.LastSyncTime`)'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Async geo-replication commits logs continuously with ~15 min typical lag; one specific telemetry property exposes the exact recovery point watermark.',
    explanation:
      'Because `GRS`, `RA-GRS`, `GZRS`, and `RA-GZRS` replicate asynchronously to the paired secondary region, recent primary writes may not have arrived before an unplanned outage. Checking **`LastSyncTime`** (`az storage account show --expand geoReplicationStats` or `Get-AzStorageAccount -IncludeGeoReplicationStats`) tells you the exact UTC timestamp up to which all primary writes were durably committed to the secondary region; any data written *after* `LastSyncTime` will be permanently lost upon unplanned failover.',
    awsComparison:
      '`GeoReplicationStats.LastSyncTime` is the direct equivalent of S3 Replication Metrics’ replication watermark / RDS `ReplicaLag` RPO check prior to promoting a DR target.'
  },
  {
    id: 'az104-a2-008',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Reading from RA-GRS Secondary Endpoint',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your storage account `stcatalogprod` is configured with `RA-GRS` in `East US` (paired with `West US`). During a transient network disruption affecting `East US` blob endpoints, how can your read-only storefront application fetch product images from `West US` **without** an administrator performing a destructive storage account failover?',
    options: [
      'Direct read requests to `https://stcatalogprod.westus.blob.core.windows.net`.',
      'Direct read requests to `https://stcatalogprod-secondary.blob.core.windows.net` (or configure the Azure Storage SDK retry mode to `LocationMode.PrimaryThenSecondary` / `GeoRedundant`).',
      'Enable Blob Soft Delete on the primary endpoint.',
      'Mount `stcatalogprod` via SMB 3.0 using the secondary key `key2`.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Pay attention to the exact DNS naming pattern Azure uses for read-access geo-redundant secondary endpoints: `<account>-secondary.<service>.core.windows.net`!',
    explanation:
      'When `RA-GRS` or `RA-GZRS` is enabled, Azure automatically publishes a read-only secondary endpoint appending **`-secondary`** to the storage account name: `https://<account>-secondary.blob.core.windows.net` (likewise for `queue`, `table`, and `dfs`—note Azure Files does NOT offer `-secondary` read access!). Using the Azure Storage SDK with geo-redundant retry options automatically retries failed primary `GET` requests against `-secondary`.',
    awsComparison:
      'Unlike S3 Multi-Region Access Points (`*.accesspoint.s3-global.amazonaws.com`) which give one global alias, Azure `RA-GRS` appends `-secondary` to the hostname, which the official Azure SDKs failover to automatically on read timeouts.'
  },
  {
    id: 'az104-a2-009',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Object Replication Prerequisites & Limitations',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'Unlike `GRS` (which only replicates to Microsoft’s fixed regional pair), you need to asynchronously replicate block blobs from `steastus` (`East US`) to `stwesteurope` (`West Europe`) so European users can read and write locally in `stwesteurope`. You choose **Object Replication**. Which TWO requirements apply to configuring Object Replication?',
    options: [
      '**Blob Versioning** must be enabled on BOTH the source (`steastus`) and destination (`stwesteurope`) storage accounts, AND **Change Feed** must be enabled on the source (`steastus`) storage account.',
      '**Hierarchical Namespace** (Data Lake Storage Gen2) must be enabled on both storage accounts.',
      'Both storage accounts must be configured with `RA-GZRS` before Object Replication rules can be saved.',
      'Object Replication supports block blobs in `Standard general-purpose v2` and `Premium block blobs` accounts, and is NOT supported if Hierarchical Namespace is enabled.'
    ],
    correctIndices: [0, 3],
    awsBridgeHint:
      'Just like S3 Cross-Region Replication (CRR) requires S3 Versioning on BOTH source and destination buckets, Azure Object Replication requires Versioning on BOTH + Change Feed on source—and conflicts with ADLS Gen2 Hierarchical Namespace!',
    explanation:
      'To configure **Azure Blob Object Replication**: (1) **Blob Versioning** MUST be enabled on **both** the source and destination storage accounts, (2) **Change Feed** MUST be enabled on the **source** storage account (to track mutations asynchronously), and (3) **Hierarchical Namespace** (ADLS Gen2) must NOT be enabled on either account. Object Replication works across any two Azure regions (not restricted to Azure paired regions!) or even within the same region.',
    awsComparison:
      'Object Replication is the exact counterpart to **Amazon S3 Cross-Region / Same-Region Replication (CRR/SRR)**: both require Versioning on source + destination, support prefix/tag filtering, and replicate asynchronously to any region you choose.'
  },
  {
    id: 'az104-a2-010',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Object Replication Copy Scope & Metadata',
    difficulty: 2,
    format: 'single',
    prompt:
      'You configure a new Object Replication rule from `stsource` to `stdest` with default settings, and 20 minutes later new uploads are replicating properly, yet 50,000 block blobs uploaded *last month* still have not appeared in `stdest`. Why were the pre-existing blobs skipped?',
    options: [
      'Object Replication never supports copying blobs created prior to policy creation.',
      '`stdest` requires a `CanNotDelete` lock before historical blobs replicate.',
      'By default, an Object Replication rule’s copy scope is set to **Only new objects**; to include historical blobs, you must edit the rule’s filter scope to **Everything** (or **Custom** with a start timestamp).',
      'Change Feed purges historical metadata every 15 minutes.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Think S3 Replication vs S3 Batch Replication: by default, replication rules tail new events from the moment the rule is created unless you explicitly select historical scope!',
    explanation:
      'In Azure Object Replication, each rule lets you choose the **Copy over** scope: **Only new objects** (the default—replicates only blobs written after policy creation), **Everything** (replicates both existing and new blobs matching the prefix/tag filter), or **Custom** (replicates blobs created after a specified UTC date/time). Unlike AWS S3 (which requires a separate S3 Batch Operations job for existing objects), Azure lets you toggle **Everything** directly in the Object Replication rule!',
    awsComparison:
      'Nice upgrade over AWS S3 CRR: whereas S3 CRR strictly ignores pre-existing objects unless you run an S3 Batch Replication job, Azure Object Replication includes a built-in **Everything** / **Custom UTC** toggle right in the rule.'
  },
  {
    id: 'az104-a2-011',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'User Delegation SAS vs Service & Account SAS',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your security architecture forbids storing or using Storage Account Shared Access Keys (`key1`/`key2`) anywhere in application code, and you plan to disable Shared Key access (`allowSharedKeyAccess: false`) on `stmedrecords`. However, a web backend still needs to issue 15-minute pre-signed download URLs for individual patient PDF blobs. Which Shared Access Signature (SAS) type works in this environment and represents Microsoft’s highest-security recommendation?',
    options: [
      '**User Delegation SAS**, signed using Microsoft Entra ID credentials (maximum validity 7 days)',
      '**Service SAS** bound to a Stored Access Policy',
      '**Account SAS** restricted to HTTPS and single IP',
      'Shared Access Signatures cannot be used at all once Shared Key access is disabled.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Think STS IAM-Role-signed S3 Pre-Signed URLs (max 7 days) vs static access-key-signed URLs: one SAS flavor is backed by Entra OAuth tokens instead of `key1`/`key2`!',
    explanation:
      'Azure offers three SAS types: (1) **Account SAS** (signed with storage account key, covers 1+ services & service-level ops), (2) **Service SAS** (signed with storage account key, covers 1 service), and (3) **User Delegation SAS** (signed with **Microsoft Entra ID** credentials via `az storage blob generate-sas --as-user` / SDK `GetUserDelegationKey`, valid up to **7 days**). Because User Delegation SAS never uses `key1`/`key2`, it is the ONLY SAS type that continues working when `Allow storage account key access` is disabled!',
    awsComparison:
      '**User Delegation SAS** (max 7 days!) is identical in spirit and 7-day ceiling to an **S3 Pre-Signed URL generated with IAM Role STS temporary credentials** (which also caps at 7 days under SigV4!).'
  },
  {
    id: 'az104-a2-012',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'SAS Types & Revocation Mechanics',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Evaluate each of the following statements regarding Azure Storage Shared Access Signatures (SAS).',
    statements: [
      {
        statement:
          'A **User Delegation SAS** remains valid if an administrator regenerates both Storage Account access keys (`key1` and `key2`), because it was signed by a Microsoft Entra user delegation key rather than `key1` or `key2`.',
        answer: true
      },
      {
        statement:
          'An **Account SAS** can grant permissions to create or delete blob containers and file shares across both Azure Blob Storage and Azure Files in a single token.',
        answer: true
      },
      {
        statement:
          'An ad-hoc **Service SAS** generated with explicit `se` (expiry) and `sp` (permissions) in the query string—without referencing a Stored Access Policy—can be individually revoked in the Azure Portal without rotating storage keys or deleting the target resource.',
        answer: false
      }
    ],
    awsBridgeHint:
      'Stateless cryptographic signatures (like S3 pre-signed URLs) have no server-side revocation table unless anchored to a server-side Stored Access Policy or until the signing key/identity is revoked!',
    explanation:
      '1) Yes: User Delegation SAS uses an Entra-backed delegation key (`Revoke-AzStorageAccountUserDelegationKeys` revokes it, whereas rotating `key1`/`key2` has zero effect on it). 2) Yes: Only an **Account SAS** (`ss=bfqt`, `srt=sco`) can span multiple storage services (Blob, File, Queue, Table) AND authorize service/container-level operations like creating/deleting containers or shares. 3) No: An ad-hoc Service SAS has no server-side record—the ONLY way to revoke it early without a Stored Access Policy is to **regenerate the Storage Account key** that signed it (which breaks every other consumer of that key!).',
    awsComparison:
      'Just like an S3 Pre-Signed URL signed by an IAM User Access Key cannot be revoked individually without deactivating that Access Key (or adding an explicit Deny Bucket Policy), an ad-hoc Service SAS cannot be selectively revoked unless backed by a **Stored Access Policy**.'
  },
  {
    id: 'az104-a2-013',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Stored Access Policies',
    difficulty: 2,
    format: 'single',
    prompt:
      'You issue a **Service SAS** for blob container `partner-drop` to an external vendor, referencing a **Stored Access Policy** named `vendor-2026` (`si=vendor-2026`). Three weeks later, the vendor reports that the SAS URL leaked in a CI build log. You have 14 internal microservices also using `key1` on the same storage account. How do you immediately invalidate ONLY the leaked SAS URL with zero disruption to the 14 microservices?',
    options: [
      'Regenerate `key1` on the storage account.',
      'Modify or delete the `vendor-2026` Stored Access Policy (or change its identifier/expiry time to the past) on the `partner-drop` container.',
      'Set `Allow Blob anonymous access` to Disabled on the storage account.',
      'Apply a `CanNotDelete` Resource Lock on `partner-drop`.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Because the SAS URI points to `si=vendor-2026` for its permissions/expiry instead of embedding them immutably, mutating or deleting that server-side policy kills the token instantly!',
    explanation:
      'A **Stored Access Policy** (up to **5** policies per container, file share, queue, or table) stores start time, expiry time, and permissions server-side on the storage resource. Any Service SAS referencing `si=<policyId>` omits inline permissions/expiry or defers to the policy—allowing you to extend expiry, downgrade permissions, or **instantly revoke** those SAS tokens by deleting/renaming the policy or setting its expiry in the past, WITHOUT rotating `key1` or `key2`! (Note: Stored Access Policies work ONLY with **Service SAS**, NOT Account SAS or User Delegation SAS.)',
    awsComparison:
      'Stored Access Policies are a neat server-side revocation handle that AWS S3 Pre-Signed URLs lack natively (in AWS you’d have to write an S3 Bucket Policy explicit `Deny` matching the compromised query/principal).'
  },
  {
    id: 'az104-a2-014',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'SAS Clock Skew Best Practice',
    difficulty: 1,
    format: 'single',
    prompt:
      'Your API server generates short-lived Service SAS tokens whose signed start time (`st`) is set to exact `DateTime.UtcNow`. Intermittently, mobile and edge clients attempting to upload blobs within the first 2 minutes receive `AuthenticationFailed: Signed expiry time / start time invalid` errors. What is Microsoft’s recommended best practice to eliminate this issue?',
    options: [
      'Extend the SAS expiry (`se`) to 365 days.',
      'Allow HTTP in addition to HTTPS (`spr=https,http`).',
      'Include the client’s public NAT IP in `sip`.',
      'Omit the SAS start time (`st`) so it becomes valid immediately, or set `st` at least **15 minutes in the past** to account for NTP clock skew across servers.'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Distributed NTP clock drift between your token-minting VM and Azure Storage frontend nodes causes "not yet valid" rejections if `st = now`!',
    explanation:
      'Different machines can experience minor NTP clock drift (clock skew). If your API server’s clock is 45 seconds ahead of the Azure Storage frontend node handling the upload, a SAS with `st = UtcNow` appears to come "from the future" and fails validation! Microsoft recommends **omitting `st`** altogether (making the SAS active immediately) or setting **`st` to 15 minutes prior** to `UtcNow`.',
    awsComparison:
      'Identical best practice when crafting custom CloudFront Signed URLs (`DateLessThan` without tight `DateGreaterThan`) or STS clock-skew-sensitive signatures.'
  },
  {
    id: 'az104-a2-015',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Zero-Downtime Storage Access Key Rotation',
    difficulty: 1,
    format: 'sequence',
    prompt:
      'Every Azure Storage Account provides two 512-bit Shared Access Keys (`key1` and `key2`). Legacy batch jobs currently connect using `key1`, and your compliance policy requires rotating active keys every 90 days with zero application downtime. Place the key rotation steps in the correct sequence.',
    correctSequence: [
      'Confirm all active workloads are currently authenticating with `key1` and nothing relies exclusively on `key2`.',
      'Regenerate `key2` first (optional precaution if `key2` age is unknown) and update all applications or Key Vault secrets to connect using `key2`.',
      'Verify application telemetry and Storage Diagnostic logs confirm zero active traffic is still authenticating with `key1`.',
      'Regenerate `key1` so the retired 90-day-old secret is permanently invalidated and ready for the next rotation cycle.'
    ],
    awsBridgeHint:
      'Classic dual-slot secret rotation (just like rotating two IAM Access Keys on a legacy IAM user): flip consumers to the standby key, verify cutover, then kill the old primary key!',
    explanation:
      'Azure provides `key1` and `key2` specifically to enable zero-downtime key rotation (which can also be fully automated by Azure Key Vault Managed Storage Account Keys!). You always shift workloads onto the alternate key, confirm traffic cutover, and then regenerate the previously active key.',
    awsComparison:
      'Exact same runbook as rotating the two allowed Access Keys (`AKIA...`) on an AWS IAM User without downtime.'
  },
  {
    id: 'az104-a2-016',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Control-Plane vs Data-Plane Storage RBAC Roles',
    difficulty: 3,
    format: 'multi',
    selectCount: 2,
    prompt:
      'You set **Allow storage account key access** to **Disabled** on `stfinlake01` (an ADLS Gen2 storage account with Hierarchical Namespace enabled). Your user account holds the built-in **`Owner`** RBAC role on the Subscription, yet when you open a blob container in the Azure Portal with authentication method set to *Microsoft Entra user account*, you receive a `403 AuthorizationPermissionMismatch` error! Which TWO statements explain this and identify the right data-plane roles?',
    options: [
      'The built-in `Owner`, `Contributor`, and `Reader` roles grant control-plane `Actions` ONLY and do **NOT** include `DataActions` (`Microsoft.Storage/storageAccounts/blobServices/containers/blobs/*`); when Shared Key access is disabled, the portal cannot fall back to `listKeys`, so `Owner` cannot read blobs without an explicit Blob Data role!',
      'Adding a `ReadOnly` Resource Lock on `stfinlake01` automatically grants data-plane read access to `Owner`.',
      'Assigning **`Storage Blob Data Reader`** grants read-only blob access, **`Storage Blob Data Contributor`** grants read/write/delete blob access, and **`Storage Blob Data Owner`** adds full ownership including managing **POSIX ACLs** on ADLS Gen2 directories/files.',
      'Only `Global Administrator` can read blobs when Shared Key access is disabled.'
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Super important AZ-104 trap! Historically `Owner` could peek at blobs in the portal ONLY because the portal secretly called `listKeys` behind the scenes—disable Shared Keys, and `Owner` has ZERO blob data permissions!',
    explanation:
      'Memorize this AZ-104 favorite: `Owner`, `Contributor`, and `Reader` have `"DataActions": []` (empty!). Normally in the Azure Portal, if an `Owner` views blobs using "Access key" mode, ARM invokes `listKeys` (`Actions`) and uses `key1` on the data plane. Once `Allow storage account key access = Disabled` (or when switching auth method to **Microsoft Entra user account** / using `DefaultAzureCredential` in code), `Owner` gets `403` until assigned **`Storage Blob Data Reader`**, **`Storage Blob Data Contributor`**, or **`Storage Blob Data Owner`** (required for setting POSIX ACLs!).',
    awsComparison:
      'In AWS, `AdministratorAccess` (`*:*`) covers both control-plane (`s3:CreateBucket`) and data-plane (`s3:GetObject`); in Azure, `Owner` has `"Actions": ["*"]` ONLY—`DataActions` is empty!'
  },
  {
    id: 'az104-a2-017',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Impact of Disabling Shared Key Access',
    difficulty: 2,
    format: 'single',
    prompt:
      'A security audit flags `stcorpbackups` for allowing key-based authentication. If you run `az storage account update --name stcorpbackups --allow-shared-key-access false`, which client authentication flow will **immediately fail**?',
    options: [
      'An Azure Function using a System-Assigned Managed Identity with `Storage Blob Data Contributor`.',
      'A mobile client downloading a blob via a **User Delegation SAS**.',
      'A partner script uploading blobs via a **Service SAS** tied to a Stored Access Policy (as well as any client using `key1`/`key2` connection strings or Account SAS).',
      'An engineer browsing blobs in Azure Storage Explorer signed in via Microsoft Entra ID with `Storage Blob Data Reader`.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Ask which token was cryptographically signed with `key1`/`key2`—even if it uses a Stored Access Policy, a Service SAS is still HMAC-signed by the storage account key!',
    explanation:
      'Setting `--allow-shared-key-access false` rejects **every** request authorized via Shared Key—including raw `AccountKey=...` connection strings, **Account SAS**, and **Service SAS** (even with a Stored Access Policy!), returning `403 KeyBasedAuthenticationNotPermitted`. Only direct **Microsoft Entra ID OAuth tokens** (RBAC / POSIX ACLs) and **User Delegation SAS** (signed by Entra ID) continue to work.',
    awsComparison:
      'Think of disabling IAM User static Access Keys org-wide so only IAM Roles (STS tokens) and STS-signed Pre-Signed URLs succeed.'
  },
  {
    id: 'az104-a2-018',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Service Endpoints vs Private Endpoints for Storage',
    difficulty: 3,
    format: 'single',
    prompt:
      'You set the Public Network Access firewall on `stpayroll01` to **Enabled from selected virtual networks and IP addresses** and add `vnet-app/snet-workers` (which enables a `Microsoft.Storage` **Virtual Network Service Endpoint** on `snet-workers`). How do VMs inside `snet-workers` resolve DNS and route traffic to `stpayroll01.blob.core.windows.net` compared to using a **Private Endpoint**?',
    options: [
      'Service Endpoints assign a `10.x.x.x` private IP from `snet-workers` and create `privatelink.blob.core.windows.net` automatically.',
      'With a **Service Endpoint**, VMs still resolve `stpayroll01.blob.core.windows.net` to its **public IP address**, while Azure switches the next-hop route over the Microsoft backbone and stamps VNet/subnet identity for the storage firewall; a **Private Endpoint** instead assigns a **private NIC IP** inside your VNet and works even when Public Network Access is completely **Disabled**.',
      'Service Endpoints encrypt traffic with IPsec, whereas Private Endpoints send unencrypted HTTP.',
      'Service Endpoints allow data exfiltration blocking to ONLY `stpayroll01`, whereas Private Endpoints open access to all storage accounts in the region.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Compare an AWS **Gateway VPC Endpoint** for S3 (public DNS/IPs in route table over AWS backbone) vs an **Interface VPC Endpoint / PrivateLink** (private ENI IP inside your subnet + Private DNS)!',
    explanation:
      'Crucial architectural distinction: A **VNet Service Endpoint** (`Microsoft.Storage`) requires no DNS changes—clients resolve the Storage Account’s **public IP**, Azure injects an optimal system route over the Azure backbone overriding `0.0.0.0/0`, and the Storage Firewall permits that specific `VNet/subnet` identity (note: VMs in that subnet could still reach *other* public Azure Storage accounts in the region unless blocked by Service Endpoint Policies!). A **Private Endpoint** places a read-only **NIC with a private IP** from your subnet dedicated to that ONE storage account + sub-resource (`blob`), mapped via `privatelink.blob.core.windows.net`, allowing Public Network Access to be set to **Disabled** and preventing data exfiltration!',
    awsComparison:
      '**Service Endpoint** ≈ **AWS Gateway VPC Endpoint for S3** (uses public S3 DNS, routes over backbone, free); **Private Endpoint** ≈ **AWS PrivateLink Interface Endpoint** (private ENI IP in subnet, reachable over Direct Connect/VPN, paid hourly/per-GB).'
  },
  {
    id: 'az104-a2-019',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Hybrid Connectivity & Sub-Resource Private Endpoints',
    difficulty: 3,
    format: 'yes-no',
    prompt:
      'Your on-premises datacenter connects to `vnet-hub` in Azure via a Site-to-Site VPN Gateway. You need to lock down Storage Account `sthybrid01` (which hosts both **Blob containers** and **Azure File shares**) from the public internet. Evaluate each statement.',
    statements: [
      {
        statement:
          'Enabling ONLY a `Microsoft.Storage` Virtual Network **Service Endpoint** on `vnet-hub` allows on-premises servers across the Site-to-Site VPN to access `sthybrid01` privately without public IPs.',
        answer: false
      },
      {
        statement:
          'Deploying **Private Endpoints** in `vnet-hub` (plus conditional DNS forwarding to Azure DNS / Private DNS Zones) allows on-premises servers over Site-to-Site VPN or ExpressRoute private peering to connect to `sthybrid01` via private `10.x.x.x` IPs.',
        answer: true
      },
      {
        statement:
          'A single Private Endpoint resource targeting sub-resource `blob` automatically provides private IP connectivity to BOTH `sthybrid01.blob.core.windows.net` AND `sthybrid01.file.core.windows.net`.',
        answer: false
      }
    ],
    awsBridgeHint:
      'Three huge AZ-104 networking-meets-storage rules: (1) Storage Service Endpoints NEVER work transitively from on-prem VPN/ExpressRoute, (2) Private Endpoints DO work from on-prem, and (3) each storage service (`blob`, `file`, `queue`, `table`, `dfs`) needs its OWN separate Private Endpoint!',
    explanation:
      '1) No: Virtual Network Service Endpoints for Azure Storage **cannot** be used from on-premises networks over VPN or ExpressRoute—traffic must originate inside the Azure VNet (or on-prem public NAT IPs must be whitelisted on the public firewall). 2) Yes: **Private Endpoints** allocate standard private RFC1918 IPs inside `vnet-hub`, making them natively routable across Site-to-Site VPN, Point-to-Site VPN, and ExpressRoute Private Peering (once on-prem DNS forwards `*.core.windows.net` to an Azure DNS Private Resolver / forwarder). 3) No: Each storage sub-resource (`blob`, `file`, `queue`, `table`, `dfs`, `web`) requires its **own distinct Private Endpoint** and corresponding `privatelink.<subresource>.core.windows.net` Private DNS Zone!',
    awsComparison:
      'Just like AWS S3 Gateway Endpoints cannot be accessed directly from on-premises over VPN/Direct Connect whereas **S3 Interface Endpoints (PrivateLink)** CAN, Azure Private Endpoints are mandatory for private hybrid storage access—and require one endpoint per sub-resource (`blob` vs `file`).'
  },
  {
    id: 'az104-a2-020',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Storage Firewall Trusted Azure Services Exception',
    difficulty: 2,
    format: 'single',
    prompt:
      'You restrict `stvaultlogs` to **Enabled from selected virtual networks and IP addresses** and check the exception box **"Allow Azure services on the trusted services list to access this storage account"**. Which workload will be permitted through the storage firewall solely because of that exception checkbox (assuming valid RBAC permissions)?',
    options: [
      'First-party registered Microsoft services (such as **Azure Backup**, **Azure Monitor Diagnostic Settings**, **Event Grid**, or **Azure Data Factory** using Managed Identity) operating within your tenant/subscription boundary.',
      'Any Linux Virtual Machine running inside any VNet in your subscription without Service Endpoints or Private Endpoints.',
      'Any GitHub-hosted runner executing an Azure CLI workflow.',
      'Any anonymous browser client inside the same Azure region.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Think AWS `aws:ViaAWSService` / trusted service principals vs customer compute instances: your own EC2/Azure VMs are NEVER "Trusted Cloud Platform Services"!',
    explanation:
      'A classic exam misconception is assuming your own Azure VMs or App Services automatically qualify as "Trusted Azure Services"—they do **NOT**! Your VMs and App Services must connect via VNet Integration + Service/Private Endpoints or NAT Gateway IP whitelisting. The **Trusted Azure Services** exception specifically allows curated Microsoft-managed platform services (Azure Backup, Site Recovery, Event Grid, Event Hubs Capture, Defender for Cloud, Monitor Diagnostic Settings, Data Box, etc., or Resource Instance Rules via Managed Identity) to bypass VNet/IP rules securely.',
    awsComparison:
      'Equivalent to allowing trusted AWS service principals (`backup.amazonaws.com`, `logging.s3.amazonaws.com`) through an S3 Bucket Policy while still requiring VPC Endpoints for your own EC2/ECS tasks.'
  },
  {
    id: 'az104-a2-021',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Customer-Managed Keys (CMK) Prerequisites',
    difficulty: 2,
    format: 'single',
    prompt:
      'Compliance regulations require configuring **Customer-Managed Keys (CMK)** stored in Azure Key Vault (`kv-sec-01`) for Storage Service Encryption on `sthipaa01`. When you attempt to select `kv-sec-01` in the Storage Account Encryption blade, Azure rejects the Key Vault configuration. Beyond granting the Storage Account’s Managed Identity `Key Vault Crypto Service Encryption User` (`get`, `wrapKey`, `unwrapKey`), which TWO properties MUST be enabled on `kv-sec-01`?',
    options: [
      'Private Endpoint AND Geo-Zone-Redundant Replication',
      '`ReadOnly` Resource Lock AND Key Rotation Policy',
      '**Soft Delete** AND **Purge Protection**',
      'Premium HSM SKU AND Hierarchical Namespace'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'If someone accidentally—or maliciously—permanently purged a CMK in Key Vault, every terabyte in the Storage Account would become permanently unrecoverable cryptographic bricks! Two Key Vault protections prevent instant permanent key destruction.',
    explanation:
      'To prevent accidental or malicious permanent destruction of the root encryption key (which would permanently brick all encrypted data in the Storage Account), Azure mandates that **both Soft Delete** (enabled by default on all modern Key Vaults) **AND Purge Protection** (must be explicitly enabled!) are active on the Azure Key Vault before CMK can be configured for Azure Storage, Managed Disks, or SQL TDE. Also, the Key Vault and Storage Account must belong to the same Microsoft Entra tenant.',
    awsComparison:
      'AWS KMS enforces a mandatory minimum 7-day key deletion waiting period on all CMKs automatically; in Azure Key Vault, Soft Delete alone still lets a privileged user click "Purge", so **Purge Protection** is strictly required for CMK!'
  },
  {
    id: 'az104-a2-022',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Infrastructure Encryption (Double Encryption)',
    difficulty: 2,
    format: 'single',
    prompt:
      'A defense contractor requires **two independent layers of 256-bit AES encryption at rest** using two distinct cryptographic algorithms/keys (service-level Storage Service Encryption PLUS hardware/cluster-level **Infrastructure Encryption**) for an entire Storage Account. When can account-wide Infrastructure Encryption be enabled?',
    options: [
      'At any time in the Azure Portal under Security + networking > Encryption.',
      'Only after converting the storage account to `Premium page blobs`.',
      'Automatically whenever Customer-Managed Keys (CMK) are configured.',
      '**Only at Storage Account creation time** (or per-container later by creating an **Encryption Scope** with Infrastructure Encryption enabled); account-wide Infrastructure Encryption cannot be toggled on retroactively.'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Watch out for creation-time immutable flags in Azure Storage (`Hierarchical Namespace`, `NFS 4.1`, `Account-level Infrastructure Encryption`, `Version-level WORM` account default)!',
    explanation:
      'All Azure Storage accounts enable service-level 256-bit AES **Storage Service Encryption (SSE)** by default. Adding a second hardware/infrastructure layer (**Infrastructure Encryption** / double encryption) across the whole storage account can **ONLY be enabled when creating the Storage Account** (`--require-infrastructure-encryption`). If an account already exists without it, you can either migrate to a new storage account OR create an **Encryption Scope** with Infrastructure Encryption enabled and apply it to new containers/blobs.',
    awsComparison:
      'Directly comparable to **Amazon S3 Dual-Layer Server-Side Encryption (`DSSE-KMS`)**, which applies two independent encryption layers for strict defense/DoD compliance.'
  },
  {
    id: 'az104-a2-023',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Lifecycle Management Directionality & Filters',
    difficulty: 2,
    format: 'single',
    prompt:
      'You author a Blob **Lifecycle Management** policy on `stanalytics01` to transition log blobs with prefix `logs/raw/` from `Hot` -> `Cool` after 30 days, `Cool` -> `Archive` after 90 days, and `Delete` after 365 days. A developer asks if you can also add a Lifecycle Management rule action that automatically promotes `Archive` blobs back up to `Hot` (`tierToHot`) when a Blob Index Tag changes to `Restore = True`. Is this supported?',
    options: [
      'Yes, Lifecycle Management supports bidirectional transitions across all four tiers.',
      '**No**—Lifecycle Management rules only transition blobs from warmer tiers to cooler tiers (`Hot -> Cool -> Cold -> Archive -> Delete`) and cannot rehydrate/promote blobs upward unless **Access time tracking** auto-promotes `Cool` back to `Hot` upon read (`enableAutoTierToHotFromCool`).',
      'Yes, as long as `Blob Versioning` is enabled.',
      'No, because Lifecycle Management cannot filter by `prefixMatch` or `blobIndexMatch`.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Just like S3 Lifecycle Rules only waterfall downward toward colder storage and expiration, Azure Lifecycle Management never rehydrates `Archive` blobs upward (with one neat exception: auto-promoting `Cool -> Hot` on read when Access Time Tracking is active!).',
    explanation:
      'Lifecycle Management transitions move strictly downward toward colder tiers (`tierToCool`, `tierToCold`, `tierToArchive`, `delete`) using `prefixMatch` (up to 10 prefixes per rule) and/or `blobIndexMatch`. There is NO `tierToHot` action for `Archive` blobs! The sole upward transition option is `enableAutoTierToHotFromCool` when using `daysAfterLastAccessTimeGreaterThan`, which automatically moves a **`Cool`** blob back to **`Hot`** if it is accessed (read).',
    awsComparison:
      'Identical to **Amazon S3 Lifecycle Configuration** (one-way downward waterfall + expiration), with `enableAutoTierToHotFromCool` acting like a simplified cousin of **S3 Intelligent-Tiering**!'
  },
  {
    id: 'az104-a2-024',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Lifecycle Management Access Time Tracking',
    difficulty: 2,
    format: 'single',
    prompt:
      'Many reference datasets in `stmlfeatures` are uploaded once and never modified, yet ML training jobs **read** them daily. When an engineer deploys a Lifecycle Management rule using `daysAfterModificationGreaterThan: 30` to move blobs to `Archive`, actively read training files get archived and break ML pipelines! What two changes fix this so ONLY blobs unread for 30 days move down?',
    options: [
      'Enable **Last access time tracking** on the storage account (`Enable-AzStorageBlobLastAccessTimeTracking` / `az storage account blob-service-properties update --enable-last-access-tracking true`) AND change the rule condition to **`daysAfterLastAccessTimeGreaterThan: 30`**.',
      'Enable **Change Feed** and switch the rule condition to `daysAfterCreationGreaterThan: 30`.',
      'Enable **Blob Soft Delete** and add a `ReadOnly` lock.',
      'Switch the storage account to `Premium block blobs`.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'By default, object stores don’t update metadata on every `GET` request (that would cost write IOPS)—so you must explicitly turn on daily last-access tracking before using `daysAfterLastAccessTimeGreaterThan`!',
    explanation:
      '`LastModified` only updates when a blob is written/overwritten, NOT when it is read (`GetBlob`). Enabling **Access time tracking** updates a blob’s last-access timestamp at most once per 24-hour window upon read, unlocking the **`daysAfterLastAccessTimeGreaterThan`** condition in Lifecycle Management so frequently read static datasets stay in `Hot`!',
    awsComparison:
      'In AWS S3, standard Lifecycle rules ONLY support `Days` since object creation (never last-read time), forcing you to switch to the `INTELLIGENT_TIERING` storage class for read-based tiering; Azure lets you turn on **Last Access Time Tracking** directly on `Hot`/`Cool` blobs!'
  },
  {
    id: 'az104-a2-025',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Blob Versioning, Soft Delete & Point-in-Time Restore',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'You are designing data-plane ransomware and accidental-deletion recovery for `stcustomerdocs`. Evaluate each statement regarding Blob Versioning, Soft Delete, and Point-in-Time Restore.',
    statements: [
      {
        statement:
          'Enabling **Container Soft Delete** alone (with Blob Soft Delete and Blob Versioning both disabled) allows you to recover a single blob that was accidentally deleted from inside an active, non-deleted container.',
        answer: false
      },
      {
        statement:
          'When **Blob Versioning** is enabled, every overwrite of an existing blob automatically preserves the prior state as a timestamped version (`versionId`), and deleting the current blob turns the current state into a historical version without destroying prior versions.',
        answer: true
      },
      {
        statement:
          'Enabling **Point-in-Time Restore** for block blobs requires **Blob Soft Delete**, **Blob Versioning**, AND **Change Feed** to all be enabled on the storage account.',
        answer: true
      }
    ],
    awsBridgeHint:
      'Distinguish container-level trash (`DeleteContainer` recovery) from blob-level trash (`DeleteBlob` recovery), and memorize the 3-pillar recipe for Point-in-Time Restore!',
    explanation:
      '1) No (classic AZ-104 trap!): **Container Soft Delete** (1–365 days) ONLY recovers an entire container deleted via `DeleteContainer`—it provides ZERO protection if someone deletes or overwrites individual blobs inside a live container! Protecting individual blobs requires **Blob Soft Delete** (1–365 days) and/or **Blob Versioning**. 2) Yes: Blob Versioning preserves every historical mutation automatically. 3) Yes: **Point-in-Time Restore** lets you roll back a subset/prefix of block blobs to an exact UTC timestamp in the past, requiring **Blob Soft Delete + Versioning + Change Feed** (on `Standard GPv2` without Hierarchical Namespace).',
    awsComparison:
      'Blob Versioning works just like **Amazon S3 Versioning**, while **Point-in-Time Restore** is like having native S3 PITR rollback without writing custom version-restoration scripts!'
  },
  {
    id: 'az104-a2-026',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Immutable Blob Storage (WORM): Time-Based vs Legal Hold',
    difficulty: 3,
    format: 'single',
    prompt:
      'Financial regulators require SEC 17a-4 Write-Once, Read-Many (WORM) storage on container `trade-blotter` with a **7-year Locked Time-Based Retention Policy**. Two years later, a litigation discovery order requires holding all blobs in `trade-blotter` indefinitely even if litigation extends past the 7-year mark, while a FinOps manager asks to shorten the 7-year policy down to 3 years to save money. What allows Azure Immutable Storage to enforce this?',
    options: [
      'A `Global Administrator` can unlock the Locked Time-Based Retention Policy to shorten it to 3 years.',
      'Deleting the parent Resource Group deletes the locked WORM blobs immediately.',
      'Once **Locked**, a Time-Based Retention interval can NEVER be deleted or shortened (it can only be **extended** up to 5 times, max 146,000 days), AND you can simultaneously apply one or more **Legal Holds** (which prevent deletion until every Legal Hold tag is cleared, even after the time-based window expires).',
      'Time-Based Retention and Legal Hold are mutually exclusive on the same container.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Exact match to **Amazon S3 Object Lock Compliance Mode + Legal Hold**: Compliance/Locked retention can NEVER be shortened even by root/Global Admin (only extended!), and Legal Holds stack orthogonally!',
    explanation:
      'Azure Immutable Blob Storage offers two WORM mechanisms that can be used **together**: (1) **Time-Based Retention Policy** — starts `Unlocked` for testing, and once **`Locked`**, nobody (not even `Owner`, `Global Administrator`, or Microsoft Support!) can delete the policy, shorten the retention period, or delete the parent container/storage account/resource group while protected blobs exist! You CAN **increase** (extend) a locked retention interval. (2) **Legal Hold** — applies one or more alphanumeric tags (e.g., `case-2026-09`) with no fixed end date; blobs remain undeletable until *all* Legal Hold tags AND any Time-Based Retention period have both expired/cleared.',
    awsComparison:
      '`Unlocked` Time-Based Policy ≈ S3 Object Lock `Governance` mode (testing); `Locked` Time-Based Policy ≈ S3 Object Lock **`Compliance` mode** (nobody can shorten/delete, only extend); `Legal Hold` ≈ S3 Object Lock **Legal Hold**.'
  },
  {
    id: 'az104-a2-027',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Immutable Storage Scope & Tiering Interaction',
    difficulty: 2,
    format: 'single',
    prompt:
      'A blob named `audit-2026.zip` is currently protected by a **Locked Time-Based Immutability Policy** in the `Hot` access tier for 5 years. Can a Lifecycle Management rule move `audit-2026.zip` from `Hot` to `Cool` and then to `Archive` while it is under a WORM immutability lock?',
    options: [
      'No, because changing a blob’s access tier modifies its MD5 content hash.',
      'No, locked WORM blobs are frozen in the `Hot` tier for the entire retention duration.',
      'Yes, but only after clearing all Legal Holds first.',
      '**Yes**—WORM immutability protects blob content and blocks modification/deletion, while moving between access tiers (`Hot`, `Cool`, `Cold`, `Archive`) is a non-destructive storage metadata operation that remains fully permitted!'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'WORM locks the object bytes and blocks `PUT`/`DELETE`, not underlying storage class transitions (`Hot -> Archive`)—otherwise 7-year compliance archives in `Hot` would cost a fortune!',
    explanation:
      'Immutability policies (both Time-Based Retention and Legal Hold) prevent modifying or deleting blob data, while **fully allowing access tier changes** (`Set Blob Tier` or Lifecycle Management transitions between `Hot`, `Cool`, `Cold`, and `Archive`—just NOT the `delete` lifecycle action until retention expires!). This lets organizations ingest WORM records in `Hot` and automatically transition them to low-cost `Archive` storage.',
    awsComparison:
      'Exact same behavior in AWS S3: objects under S3 Object Lock `COMPLIANCE` mode can still transition smoothly from `STANDARD` -> `GLACIER_IR` -> `DEEP_ARCHIVE` via S3 Lifecycle rules.'
  },
  {
    id: 'az104-a2-028',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'AzCopy Server-to-Server Copy & Synchronization',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'You are migrating 18 TB of unstructured media files and synchronizing daily deltas into Azure Storage using the **`AzCopy` v10** command-line utility. Which TWO statements accurately describe `azcopy copy` and `azcopy sync`?',
    options: [
      'When copying blobs from one Azure Storage Account to another (`azcopy copy "https://src.blob.../?<SAS>" "https://dst.blob.../?<SAS>" --recursive`), `AzCopy` orchestrates asynchronous **server-to-server** APIs over the Azure backbone without downloading and re-uploading bytes through the admin workstation.',
      '`azcopy sync` automatically deletes files at the destination that no longer exist at the source **by default**, even if `--delete-destination` is omitted.',
      '`azcopy sync` compares file names and last-modified timestamps to transfer only new or modified files in **one direction** (source -> destination), and only deletes orphaned destination files if `--delete-destination=true` (or `prompt`) is explicitly passed.',
      '`AzCopy` requires installing a permanent background Windows Service agent and opening inbound TCP port 445 on the Storage Account.'
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Compare `azcopy copy` (server-side `PutBlockFromURL` across accounts!) and `azcopy sync` (like `aws s3 sync`, which NEVER deletes target-only files unless you pass `--delete` / `--delete-destination=true`!).',
    explanation:
      '1) Correct: `azcopy copy` between two Azure Storage endpoints invokes `PutBlockFromURL` / server-to-server copy APIs directly across Azure’s high-speed backbone—your laptop only sends lightweight control REST calls! 2) Incorrect / 3) Correct: `azcopy sync` performs a **one-way** differential sync (never bidirectional—use Azure File Sync for multi-site live sync!) comparing names and `LastModified` timestamps, and defaults to `--delete-destination=false` for safety unless `--delete-destination=true` is explicitly specified.',
    awsComparison:
      '`azcopy sync` behaves identically to `aws s3 sync` (one-way delta sync; requires `--delete` in AWS / `--delete-destination=true` in Azure to purge orphaned target objects).'
  },
  {
    id: 'az104-a2-029',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'AzCopy Authentication for Blobs vs Azure Files',
    difficulty: 2,
    format: 'single',
    prompt:
      'An administrator signs in interactively with `azcopy login` using their Microsoft Entra account (which holds `Owner` on the Subscription, with no other role assignments) and runs `azcopy copy "./backup.bak" "https://stdbbackups.blob.core.windows.net/sql/backup.bak"`. The upload fails with `403 AuthorizationPermissionMismatch`, AND a second `azcopy copy` targeting an **Azure File share** (`file.core.windows.net`) also fails when no SAS token or `--backup-mode`/File Data RBAC is supplied. What is the cleanest Microsoft-recommended way to authorize `azcopy` for the Blob upload using Entra ID, and how are Azure Files transfers commonly authorized?',
    options: [
      'Assign **`Storage Blob Data Contributor`** (or `Storage Blob Data Owner`) to the user for Entra-authenticated Blob uploads, and append a **SAS token** (or assign `Storage File Data Privileged Contributor` with `--trailing-dot` / OAuth header flags on AzCopy v10.25+) for Azure Files.',
      'Pass `--account-key` directly on the `azcopy copy` command line.',
      'Elevate to `Global Administrator` in Microsoft Entra ID before running `azcopy login`.',
      'Enable Anonymous Blob Access on the container to allow `azcopy` writes.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      '`AzCopy` never takes raw `--account-key` strings! It strictly uses **Microsoft Entra OAuth (`azcopy login`)** with Data-Plane RBAC OR **SAS tokens** appended to the URL.',
    explanation:
      'Unlike Azure CLI (`az storage blob upload --account-key ...`), **`AzCopy` v10 NEVER accepts raw storage account Shared Keys** directly! `AzCopy` supports only two credential mechanisms: (1) **Microsoft Entra ID** (`azcopy login` / Managed Identity), which requires `Storage Blob Data Contributor` or `Storage Blob Data Owner` for Blob writes (`Owner` alone fails!), or (2) **Shared Access Signatures (SAS)** appended to source/destination URLs (traditionally mandatory for Azure Files and cross-tenant transfers, with Entra OAuth for Azure Files recently supported via `Storage File Data Privileged*` roles).',
    awsComparison:
      'Think of `AzCopy` as a high-concurrency Go transfer engine designed strictly around OAuth bearer tokens or pre-signed SAS URLs rather than long-lived root access keys.'
  },
  {
    id: 'az104-a2-030',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Azure Storage Explorer Capabilities',
    difficulty: 1,
    format: 'single',
    prompt:
      'Support engineers working on macOS, Windows, and Ubuntu workstations need a standalone cross-platform graphical desktop application to browse blobs, inspect Queue messages, query Table entities, create **Stored Access Policies**, and connect to a single container using ONLY a partner-issued Service SAS URI (without having any Microsoft Entra login in the partner’s tenant). Which tool meets every requirement?',
    options: [
      'Azure File Sync Agent',
      '**Azure Storage Explorer**',
      'Azure Data Box Edge Manager',
      '`AzCopy` CLI'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Look for Microsoft’s free cross-platform Electron/GUI desktop client for all four storage services, Stored Access Policies, and local Azurite emulation.',
    explanation:
      '**Azure Storage Explorer** is a free cross-platform GUI app (Windows, macOS, Linux) that connects via Microsoft Entra ID, connection strings/account keys, **or a standalone SAS URI** (making it ideal for external partners granted scoped container/share SAS links!). It also provides a full visual editor for creating and modifying **Stored Access Policies**, which is faster and cleaner than hand-crafting REST calls, and integrates `AzCopy` under the hood for fast transfers.',
    awsComparison:
      'Think Cyberduck / S3 Browser, except Azure Storage Explorer is an official first-party Microsoft GUI tool supporting Blobs, Files, Queues, Tables, ADLS Gen2 ACLs, and Azurite local emulation.'
  },
  {
    id: 'az104-a2-031',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Azure Import/Export vs Azure Data Box',
    difficulty: 2,
    format: 'single',
    prompt:
      'A remote geological survey station has only a 50 Mbps satellite internet link and needs to **export 60 TB** of seismic data currently stored in an **Azure File share** (`file.core.windows.net`) onto physical storage shipped to their office, OR import/export using physical hardware. You evaluate **Azure Import/Export** (customer-supplied SATA/SSD drives with `WAImportExport`) versus **Azure Data Box**. Which technical limitation rules out Azure Import/Export for **exporting** from Azure Files?',
    options: [
      'Azure Import/Export drives are not encrypted at rest.',
      'Azure Import/Export only supports Table Storage.',
      '**Azure Import/Export** supports importing into BOTH Azure Blob Storage and Azure Files, but **exporting** via Azure Import/Export is supported **ONLY from Azure Blob Storage** (never from Azure Files!); **Azure Data Box** or copying shares to Blobs first is required.',
      'Azure Data Box is limited to 1 TB per appliance.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Classic AZ-104 directional matrix: Import/Export (customer BYO disks) imports to Blobs + Files, but EXPORTS ONLY from Blobs! Azure Data Box (Microsoft ruggedized 80 TB / 1 PB NAS appliance, like Snowball Edge) handles SMB/NFS/REST both ways.',
    explanation:
      'Memorize this exam table: **Azure Import/Export** (where you ship your own BitLocker-encrypted 2.5"/3.5" SATA/SSD drives prepared with `WAImportExport.exe` + journal files) supports **Import -> Blob Storage OR Azure Files**, and **Export -> Blob Storage ONLY** (Azure Files export is NOT supported!). **Azure Data Box** ships a Microsoft-owned ruggedized 80 TB appliance (`Data Box Heavy` up to 1 PB) with 10/40 GbE SMB/NFS/REST interfaces supporting both import and export for Blobs and Azure Files.',
    awsComparison:
      'Azure Import/Export ≈ legacy AWS Import/Export Disk (BYO drives); **Azure Data Box** ≈ **AWS Snowball Edge Storage Optimized** (cloud-provider-shipped ruggedized encrypted NAS appliance).'
  },
  {
    id: 'az104-a2-032',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Azure Files Protocols: SMB vs NFS 4.1',
    difficulty: 3,
    format: 'yes-no',
    prompt:
      'You are planning shared network file storage using **Azure Files** for mixed Windows Server and Linux workloads. Evaluate each statement regarding SMB and NFS 4.1 protocol support.',
    statements: [
      {
        statement:
          'Standard SMB mounts to Azure Files from outside Azure over the public internet require outbound **TCP port 445** to be unblocked by local firewalls and ISPs, plus **SMB 3.0+** with encryption in transit.',
        answer: true
      },
      {
        statement:
          '**NFS 4.1** Azure File shares can be created inside a `Standard general-purpose v2` HDD-backed storage account.',
        answer: false
      },
      {
        statement:
          'Deploying an **NFS 4.1** Azure File share requires setting **Secure transfer required** to **Disabled** on the `FileStorage` account AND restricting network access via a **Private Endpoint** or **Virtual Network Service Endpoint**.',
        answer: true
      }
    ],
    awsBridgeHint:
      'Three core AZ-104 Azure Files protocol rules: (1) Direct SMB = TCP 445 + SMB 3.x encryption, (2) NFS 4.1 ONLY exists on `Premium file shares` (`FileStorage`, LRS/ZRS), and (3) NFS 4.1 requires `Secure transfer required = Disabled` + VNet isolation (unless using the `aznfs` stunnel mount helper, the account toggle must still allow NFS)!',
    explanation:
      '1) Yes: Direct SMB over the internet uses TCP 445 and requires SMB 3.0/3.1.1 encryption (SMB 2.1 lacks encryption and is rejected outside the storage account’s Azure region or whenever `Secure transfer required = Enabled`). 2) No: **NFS 4.1** is ONLY supported on **`Premium file shares` (`FileStorage`)** accounts (`LRS` or `ZRS`—note `GRS` is NOT supported on Premium `FileStorage`!). 3) Yes: Because baseline NFS 4.1 does not natively encrypt payloads at the protocol layer, Azure requires disabling **Secure transfer required** on the `FileStorage` account and enforces VNet network-level security via **Private Endpoint** or **Service Endpoint**.',
    awsComparison:
      'In AWS, EFS = NFSv4.1 only and FSx for Windows = SMB only; **Azure Files** supports **both** SMB (Standard GPv2 + Premium `FileStorage`) and **NFS 4.1** (Premium `FileStorage` only), though a single share chooses either SMB OR NFS at creation time.'
  },
  {
    id: 'az104-a2-033',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Bypassing ISP Port 445 Blocks for Azure Files SMB',
    difficulty: 2,
    format: 'single',
    prompt:
      'Remote engineers working from home on residential ISPs cannot mount an SMB Azure File share (`\\stengfiles.file.core.windows.net\cad`) because their residential ISPs block outbound **TCP port 445**. Which architecture allows those engineers to mount the SMB share securely without changing ISPs?',
    options: [
      'Change the Azure Storage Account’s SMB listening port from 445 to 8443 in the Azure Portal.',
      'Downgrade the file share protocol to SMB 2.1.',
      'Configure a Virtual Network Service Endpoint on the engineers’ home routers.',
      'Deploy an **Azure Private Endpoint** for `file` inside an Azure VNet and connect the remote laptops via **Azure Point-to-Site (P2S) VPN** (tunneling TCP 445 inside OpenVPN/IKEv2 over TCP/UDP 443), or proxy via **SMB over QUIC** (UDP 443) / Azure File Sync.'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'You can never change the TCP port an Azure Storage SMB endpoint listens on (always 445)—you must encapsulate TCP 445 inside an encrypted VPN tunnel (P2S/S2S over 443) hitting a Private Endpoint!',
    explanation:
      'Residential and hotel ISPs almost universally drop TCP 445 at the edge to prevent WannaCry/NotPetya worm propagation, and Azure Files’ SMB port (445) cannot be altered. The canonical AZ-104 solution is deploying a **Private Endpoint** (`privatelink.file.core.windows.net`) inside an Azure VNet and connecting remote clients via **Point-to-Site (P2S) VPN** (OpenVPN over TCP 443) or branches via **Site-to-Site VPN / ExpressRoute**, so SMB 445 rides safely inside the encrypted VPN tunnel!',
    awsComparison:
      'Identical to accessing **Amazon FSx for Windows File Server** from remote laptops via **AWS Client VPN** over TCP/UDP 443 so ISP port-445 filters never see raw SMB packets.'
  },
  {
    id: 'az104-a2-034',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Deploying an NFS 4.1 Azure File Share',
    difficulty: 2,
    format: 'sequence',
    prompt:
      'You need to deploy a high-throughput POSIX **NFS 4.1** shared filesystem on Azure Files and mount it across 12 Ubuntu Virtual Machines running inside `vnet-render/snet-nodes`. Order the implementation steps from start to finish.',
    correctSequence: [
      'Create a Storage Account with Account kind **`FileStorage`** (Premium file shares) and redundancy **`LRS` or `ZRS`** in the same region as `vnet-render`.',
      'Disable **Secure transfer required** in the Storage Account Configuration blade (or install the `aznfs` TLS mount helper if encrypting in transit).',
      'Create a new Azure File share with protocol **`NFS`**, select the root squash behavior, and configure a **Private Endpoint** (or `Microsoft.Storage` Service Endpoint) for `vnet-render/snet-nodes`.',
      'Install `nfs-common` on the Ubuntu VMs, create the target directory, and mount using `sudo mount -t nfs <account>.file.core.windows.net:/<account>/<share> /mnt/render -o vers=4,minorversion=1,sec=sys`.'
    ],
    awsBridgeHint:
      'Remember the strict prerequisite chain: `Premium FileStorage` (`LRS`/`ZRS`) -> Disable `Secure transfer required` -> Create `NFS` share + VNet Private/Service Endpoint -> `mount -t nfs -o vers=4,minorversion=1`.',
    explanation:
      'Every step in this sequence hits an AZ-104 exam checkpoint: (1) NFS 4.1 requires `FileStorage` (`Premium_LRS` or `Premium_ZRS`), (2) `Secure transfer required` must be set to `Disabled`, (3) Protocol (`SMB` vs `NFS`) is immutable once the share is created and requires VNet Private Endpoint or Service Endpoint network locking, and (4) Linux clients mount via NFSv4.1 (`vers=4,minorversion=1`).',
    awsComparison:
      'Provisioning NFS 4.1 on Azure Files (`FileStorage` + Private Endpoint) gives you an **Amazon EFS**-style shared POSIX mount natively integrated into Azure Storage.'
  },
  {
    id: 'az104-a2-035',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Azure Files Share Soft Delete vs Share Snapshots',
    difficulty: 2,
    format: 'single',
    prompt:
      'A user connected to an SMB Azure File share (`\\sthr.file.core.windows.net\policies`) accidentally deletes a single Word document (`handbook-2026.docx`) from inside the live share. **File Share Soft Delete** (14 days) is enabled on `sthr`, while **Share Snapshots** and **Azure Backup** were never configured. Can you restore `handbook-2026.docx` using File Share Soft Delete?',
    options: [
      '**No**—File Share Soft Delete ONLY recovers an entire deleted file share (`DeleteShare`), NOT individual deleted or overwritten files inside a live share; item-level recovery requires **Azure File Share Snapshots** (automated via Azure Backup!).',
      'Yes, deleted individual files sit in a hidden `.Trash` directory for 14 days.',
      'Yes, running `Undo-AzStorageFileRemoval` restores individual SMB files.',
      'No, because Azure Files does not support snapshots or backups of any kind.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Same exact mental model as **Container Soft Delete** earlier! **File Share Soft Delete** protects the *share container* against `DeleteShare`; recovering individual files inside a share requires **Share Snapshots** (up to 200 per share)!',
    explanation:
      'Do NOT confuse **File Share Soft Delete** with Blob Soft Delete! In Azure Files, **Soft Delete operates strictly at the Share level** (like a recycle bin if an admin deletes the entire file share). If a user deletes or corrupts an individual file inside an active SMB/NFS share, Soft Delete does nothing—you need point-in-time **Share Snapshots** (incremental read-only snapshots, max **200 per share**, exposed right inside Windows Explorer’s *Previous Versions* tab and orchestrated automatically by **Azure Backup**!).',
    awsComparison:
      'Similar to how FSx for Windows relies on **Shadow Copies (VSS snapshots)** + AWS Backup for single-file self-service restore rather than filesystem-deletion protection.'
  },
  {
    id: 'az104-a2-036',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Azure Files Identity-Based SMB Authentication & Two-Layer Authorization',
    difficulty: 3,
    format: 'multi',
    selectCount: 2,
    prompt:
      'You configure **Identity-based access** for an SMB Azure File share using on-premises **Active Directory Domain Services (AD DS)** so Windows domain users authenticate with Kerberos tickets instead of Storage Account keys. Which TWO mechanisms work together to determine a user’s effective access to `\\stcorp.file.core.windows.net\finance\payroll\q4.xlsx`?',
    options: [
      '**Share-level Azure RBAC** (`Storage File Data SMB Share Reader`, `Storage File Data SMB Share Contributor`, or `Storage File Data SMB Share Elevated Contributor`) acts as a coarse outer gate across the whole share.',
      'Assigning `Storage Blob Data Contributor` automatically grants full SMB file share NTFS permissions.',
      '**Directory and file-level Windows DACLs (NTFS ACLs)** configured over SMB (`icacls` / File Explorer Security tab) enforce granular inner permissions, and the **most restrictive** combination between Share-level RBAC and NTFS ACLs wins!',
      'Enabling AD DS authentication automatically disables Storage Account key (`key1`/`key2`) superuser access.'
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Think Windows SMB **Share Permissions** intersected with **NTFS Security Tab ACLs**: Azure RBAC plays the outer Share Permission gate, Windows DACLs play the inner folder/file ACL gate, and **most restrictive wins**!',
    explanation:
      'Identity-based SMB access in Azure Files enforces a **two-stage authorization pipeline**: Stage 1 checks **Share-level Azure RBAC** (`Storage File Data SMB Share Reader` / `Contributor` / `Elevated Contributor`—or a default share-level permission). Stage 2 checks **Windows NTFS DACLs** (`icacls`) directly on the folder/file! Just like classic Windows File Servers combining Share Permissions + NTFS Permissions, the **most restrictive** permission wins (e.g., `SMB Share Reader` + NTFS `Full Control` = effective **Read-Only**!). Note: Mounting with the Storage Account key still acts as local superuser to bootstrap initial NTFS ACLs.',
    awsComparison:
      'Just like **FSx for Windows File Server** combines SMB Share-level ACLs (`Everyone` / Domain Groups) with granular NTFS folder/file ACLs where the intersection (most restrictive) governs effective access.'
  },
  {
    id: 'az104-a2-037',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Azure Files Share-Level RBAC Roles',
    difficulty: 2,
    format: 'single',
    prompt:
      'A delegated Windows File Server Administrator needs to connect over SMB using their Active Directory Kerberos identity (WITHOUT knowing the Storage Account Shared Key) to read, write, delete files, AND **modify Windows NTFS permissions (ACLs)** on folders inside `\\stcorp.file.core.windows.net\departments`. Which built-in Azure RBAC role must be assigned to this administrator?',
    options: [
      '`Storage File Data SMB Share Contributor`',
      '`Storage File Data SMB Share Elevated Contributor`',
      '`Storage File Data SMB Share Reader`',
      '`Owner`'
    ],
    correctIndices: [1],
    awsBridgeHint:
      '`Contributor` gives Read + Write + Delete; modifying Windows ACLs (`WriteDAC` / `WriteOwner`) requires the **Elevated** variant!',
    explanation:
      'Compare the three built-in SMB share-level RBAC roles: **`Storage File Data SMB Share Reader`** = read/traverse only; **`Storage File Data SMB Share Contributor`** = read, write, create, and delete files/folders (cannot change NTFS ACLs!); **`Storage File Data SMB Share Elevated Contributor`** = read, write, delete, **AND modify Windows NTFS permissions (ACLs)** over SMB!',
    awsComparison:
      'Equivalent to the `FSx File Share Delegated Administrators` group (`DNSAdmins` / delegated file admin group) in AWS Managed Microsoft AD + FSx for Windows.'
  },
  {
    id: 'az104-a2-038',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Microsoft Entra Kerberos for Hybrid User Identities',
    difficulty: 3,
    format: 'single',
    prompt:
      'Your organization has Microsoft Entra joined Windows 11 laptops for traveling consultants whose user accounts are synchronized from on-premises AD DS via Microsoft Entra Connect. While working from coffee shops (over VPN to a Private Endpoint, **without** network line-of-sight to on-premises Domain Controllers), these users need single sign-on Kerberos access to SMB Azure File shares. Which Azure Files identity source specifically enables Kerberos ticket issuance straight from Microsoft Entra ID without Domain Controller line-of-sight?',
    options: [
      'On-premises Active Directory Domain Services (AD DS) domain join of the Storage Account',
      'Microsoft Entra Domain Services (`Microsoft.AAD/domainServices` managed VNet DCs)',
      '**Microsoft Entra Kerberos** (for hybrid user identities)',
      'Anonymous Container Access'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Look at the three Azure Files identity options: (1) On-prem AD DS (needs DC line-of-sight!), (2) Entra Domain Services (needs VNet DC line-of-sight!), (3) **Entra Kerberos** (cloud KDC directly in Entra ID—NO DC line-of-sight needed for hybrid users!).',
    explanation:
      'Azure Files supports three identity sources (only ONE active per Storage Account): (1) **On-premises AD DS** (clients need network line-of-sight to AD DCs for Kerberos tickets), (2) **Microsoft Entra Domain Services** (clients need network line-of-sight to the managed domain’s VNet), and (3) **Microsoft Entra Kerberos**, which lets Microsoft Entra ID itself issue Kerberos service tickets over HTTPS to Entra-joined / hybrid-joined Windows clients for hybrid-synced user accounts **with zero Domain Controller line-of-sight**! (Note: cloud-only Entra users still cannot use NTFS ACLs via Entra Kerberos unless using default share-level permissions.)',
    awsComparison:
      'This solves a pain point that traditionally required VPN line-of-sight to AWS Managed Microsoft AD domain controllers when mounting FSx for Windows from roaming cloud-managed endpoints.'
  },
  {
    id: 'az104-a2-039',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Azure File Sync Topology & Cloud Change Detection',
    difficulty: 3,
    format: 'yes-no',
    prompt:
      'You deploy **Azure File Sync** to centralize branch-office Windows Server file shares into Azure Files while preserving fast local LAN access. Evaluate each architectural statement.',
    statements: [
      {
        statement:
          'A single **Sync Group** contains **exactly ONE Cloud Endpoint** (pointing to one Azure File share) and can contain multiple **Server Endpoints** across different registered Windows Servers to stay in multi-master sync.',
        answer: true
      },
      {
        statement:
          'A single Windows Server can be registered with three different **Storage Sync Services** simultaneously to separate HR, Finance, and Engineering sync groups.',
        answer: false
      },
      {
        statement:
          'If an external cloud workflow uploads or modifies a file **directly inside the Azure File share** (bypassing all Windows Server Endpoints), Azure File Sync immediately pushes that change to all branch Windows Servers within 5 seconds by default.',
        answer: false
      }
    ],
    awsBridgeHint:
      'Three golden **Azure File Sync** exam rules: (1) `1 Sync Group = 1 Cloud Endpoint + N Server Endpoints`, (2) `1 Windows Server = registered to AT MOST 1 Storage Sync Service`, and (3) direct cloud-side edits inside the Azure File share only scan **once every 24 hours** unless manually triggered!',
    explanation:
      '1) Yes: Every **Sync Group** maps **1 Cloud Endpoint** (1 Azure File share) to **1–100 Server Endpoints** (specific folder paths on registered Windows Server 2016+ instances). 2) No: A Windows Server can be registered with **only ONE Storage Sync Service** at a time (though that single Storage Sync Service can hold multiple Sync Groups, and the server can host multiple non-overlapping Server Endpoints across different Sync Groups!). 3) No (huge AZ-104 exam trap!): Changes made on a Windows **Server Endpoint** are caught instantly by the USN journal filter driver and sync in near-real time, whereas changes made **directly in the Azure File share** are only detected by a **once-every-24-hours** background scan unless you call **`Invoke-AzStorageSyncChangeDetection`**!',
    awsComparison:
      '**Azure File Sync** ≈ **AWS Storage Gateway (SMB File Gateway)**, including the exact same gotcha: writing directly to the backing S3 bucket (or Azure File share) bypasses the local gateway cache until `RefreshCache` (`Invoke-AzStorageSyncChangeDetection`) or the 24h scan runs!'
  },
  {
    id: 'az104-a2-040',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Azure File Sync Cloud Tiering Policies',
    difficulty: 2,
    format: 'single',
    prompt:
      'A branch office Windows Server has a `2 TB` data volume (`D:\Shares\CAD`), yet the engineering team’s active + historical CAD archive in the synced Azure File share totals `25 TB`. You enable **Cloud Tiering** on the Server Endpoint with **Volume free space policy = `20%`** and **Date policy = `30 days`**. How do these two policies interact, and can Cloud Tiering be enabled on `C:\`?',
    options: [
      'Cloud Tiering works only on the `C:\` OS boot volume and deletes local files permanently.',
      'Files older than 30 days are deleted from Azure Files to keep local disk usage below 80%.',
      'Only the Date policy runs until the disk reaches 0% free space.',
      'Cloud Tiering is **NOT supported on the `C:\` system boot volume**; on `D:\`, BOTH policies apply together so Azure File Sync always keeps at least `20%` (`400 GB`) of `D:\` free **AND** tiers (converts to NTFS reparse-point pointers) any files not accessed/modified within `30 days`—meaning whichever policy tiers **more** data wins!'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Volume Free Space % is mandatory when enabling Cloud Tiering, Date Policy is optional, system drive `C:\` cannot tier, and when both policies apply on the same volume, the stricter/higher tiering threshold wins!',
    explanation:
      '**Cloud Tiering** converts cold local files on non-system NTFS volumes (`D:\`, `E:\`—NEVER the `C:\` OS system volume!) into tiny NTFS reparse-point stubs (`Offline` attribute set) that seamlessly stream down from Azure Files on demand when double-clicked. **Volume free space policy** ensures `X%` of the entire local volume stays free (if multiple Server Endpoints share `D:\`, the **largest** free-space percentage across them governs the whole volume!), while the optional **Date policy** additionally tiers any file unaccessed for `N` days even when plenty of free space remains.',
    awsComparison:
      'Just like **AWS FSx File Gateway / S3 File Gateway** local SSD read cache evicting cold blocks into stub metadata while presenting the full multi-terabyte cloud namespace locally.'
  },
  {
    id: 'az104-a2-041',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Replacing a Failed Azure File Sync Server',
    difficulty: 2,
    format: 'single',
    prompt:
      'The hardware RAID controller on an on-premises Windows Server acting as the sole Server Endpoint in Sync Group `sg-marketing` suffers catastrophic failure. All data had already finished syncing to the Cloud Endpoint (`share-marketing`). You build a brand-new Windows Server (`FS-MKT-02`) with an empty `E:\Marketing` volume. How do you restore full access for local users in **minutes** rather than waiting hours to download 8 TB over the WAN?',
    options: [
      'Register `FS-MKT-02` with the Storage Sync Service, delete the dead server’s stale Server Endpoint, and add `E:\Marketing` on `FS-MKT-02` as a new Server Endpoint in `sg-marketing` with Cloud Tiering / **Fast Disaster Recovery** namespace-first sync—the full folder/file tree appears within minutes and files hydrate on demand!',
      'Create a brand-new Sync Group and copy 8 TB manually via `robocopy` over SMB.',
      'Ship an Azure Import/Export SATA drive.',
      'Trigger a Customer-Managed Storage Account Failover.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Azure File Sync downloads the lightweight **file/folder metadata namespace** first before hydrating file contents—giving near-instant disaster recovery on a fresh server!',
    explanation:
      'One of Azure File Sync’s killer features is **Fast Disaster Recovery (Namespace-First Sync)**: when you attach a new empty Server Endpoint to an existing Sync Group, the agent downloads the **entire directory and file metadata hierarchy first** (without downloading file payloads upfront!). Within minutes, you can share out `E:\Marketing` and users can browse every folder and open any file immediately via transparent on-demand cloud recall while background hydration runs according to your tiering policy.',
    awsComparison:
      'Similar to spinning up a replacement **AWS Storage Gateway** VM and pointing a new File Share at the existing S3 bucket so metadata populates rapidly while data blocks fetch lazily on read.'
  },
  {
    id: 'az104-a2-042',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Standard Azure Files Tiers vs Premium Provisioned Shares',
    difficulty: 2,
    format: 'single',
    prompt:
      'You manage an SMB file share in a `Standard general-purpose v2` storage account currently set to the **`Transaction optimized`** tier. Today at 09:00 UTC, you change the share’s tier to **`Cool`** to lower per-GiB storage costs, and at 14:00 UTC the same day, latency-sensitive batch jobs spike transaction fees, so you try to switch the share back to **`Hot`**. What happens?',
    options: [
      'The share switches immediately to `Premium` SSD storage.',
      'The tier change fails because an Azure File share’s access tier (`Transaction optimized`, `Hot`, `Cool`) can be changed **at most once every 24 hours** (and you cannot switch directly between `Standard` GPv2 tiers and `Premium FileStorage` without migrating data).',
      'The share switches immediately to `Hot` with zero restrictions.',
      'Changing a file share tier deletes all existing Share Snapshots.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Watch out for the 24-hour rate limit on changing an Azure File share’s tier—and remember `Standard` (`Transaction optimized`/`Hot`/`Cool` pay-as-you-go) vs `Premium` (`FileStorage` provisioned GiB) live in completely different Storage Account kinds!',
    explanation:
      'Standard Azure File shares inside `Standard GPv2` accounts offer three pay-as-you-go tiers: **`Transaction optimized`** (highest storage $/GiB, lowest transaction cost), **`Hot`** (balanced), and **`Cool`** (lowest storage $/GiB, highest transaction + data retrieval cost). You can switch freely among those three Standard tiers, **subject to a 24-hour cooldown** between tier changes! Moving to **Premium** SSD shares requires migrating (`AzCopy` / File Sync) to a separate `FileStorage` account.',
    awsComparison:
      'Matches **Amazon EFS**’s exact 24-hour cooldown constraint when modifying Throughput Mode (`Elastic` / `Provisioned` / `Bursting`)!'
  },
  {
    id: 'az104-a2-043',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Azure Data Lake Storage Gen2 (Hierarchical Namespace)',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'Your data engineering team asks you to enable **Hierarchical Namespace** on a new `Standard general-purpose v2` storage account to turn it into **Azure Data Lake Storage (ADLS) Gen2** for Apache Spark / Azure Databricks analytics. Which TWO architectural changes occur when Hierarchical Namespace is enabled?',
    options: [
      'Directories become real filesystem objects rather than virtual slash prefixes—making **directory rename and recursive delete atomic `O(1)` metadata operations** instead of copying and deleting thousands of individual blobs.',
      'Granular **POSIX-compliant Access Control Lists (ACLs)** (Access ACLs + Default ACLs for `user`, `group`, `other`, `mask`) can be applied directly to individual directories and files.',
      'Blob **Point-in-Time Restore** and **Object Replication** are automatically enabled.',
      'The storage account can no longer store block blobs or integrate with Lifecycle Management.'
    ],
    correctIndices: [0, 1],
    awsBridgeHint:
      'Think S3 Directory Buckets (Express One Zone) + HDFS semantics layered right onto Azure Blob Storage: `O(1)` atomic folder renames + fine-grained POSIX `rwx` ACLs, at the cost of losing a few flat-blob features (Versioning/Object Replication/PITR)!',
    explanation:
      'Enabling **Hierarchical Namespace (ADLS Gen2)** transforms flat virtual `/` prefixes into a true hierarchical filesystem (`dfs.core.windows.net` + `blob.core.windows.net` multi-protocol access): (1) **Atomic `O(1)` directory rename/move/delete** (crucial for Spark/Parquet commit stages!), and (2) **POSIX ACLs** (`rwx` access + default inheritance ACLs on folders/files, managed by `Storage Blob Data Owner`). Trade-off to remember for AZ-104: ADLS Gen2 still supports Lifecycle Management and Soft Delete, but **does NOT support Blob Versioning, Object Replication, or Point-in-Time Restore**!',
    awsComparison:
      'Huge architectural advantage over standard flat Amazon S3 (where renaming a "folder" of 100,000 Parquet files requires 100,000 `CopyObject` + `DeleteObject` calls unless using S3 Tables/Iceberg metadata pointers).'
  },
  {
    id: 'az104-a2-044',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Block Blobs vs Append Blobs vs Page Blobs',
    difficulty: 1,
    format: 'single',
    prompt:
      'You are building three cloud components: (A) a video streaming archive uploading `20 GB` MP4 files, (B) a centralized immutable audit sink where worker nodes strictly append log lines to the end of a blob without modifying prior bytes, and (C) a legacy diagnostic appliance writing random 512-byte aligned disk sectors up to `8 TiB`. Remember that blob type cannot be changed after creation! Which mapping of Azure Blob types is correct?',
    options: [
      'A = Page blob, B = Block blob, C = Append blob',
      'A = Append blob, B = Page blob, C = Block blob',
      'A = Block blob, B = Block blob, C = Block blob',
      'A = **Block blob** (up to ~190.7 TiB), B = **Append blob** (up to ~195 GiB, append-only blocks up to 50,000 blocks), C = **Page blob** (up to 8 TiB random read/write 512-byte pages)'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Azure splits object storage into 3 immutable blob structures at `PutBlob` time: `Block` (standard objects/multipart), `Append` (tail-append logs), and `Page` (512B sector-addressed VHD backing store)!',
    explanation:
      'Every blob in Azure Blob Storage is permanently typed at creation: (1) **Block blobs** (up to 50,000 blocks × 4,000 MiB ≈ **190.7 TiB** — general files, media, Parquet, backups), (2) **Append blobs** (up to 50,000 × 4 MiB ≈ **195 GiB** — optimized strictly for `AppendBlock` tail writes; updating/deleting existing blocks is unsupported), and (3) **Page blobs** (up to **8 TiB** of 512-byte aligned pages — random read/write I/O for VHD disks and specialized DB journals).',
    awsComparison:
      'Standard AWS S3 previously had only immutable whole objects (`Block blob` equivalent, until S3 Express One Zone recently added `Append`); Azure has natively offered `Block`, `Append`, and `Page` blobs for over a decade.'
  },
  {
    id: 'az104-a2-045',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Storage Network Routing Preference',
    difficulty: 2,
    format: 'single',
    prompt:
      'Media clients in Australia download large video assets from an Azure Storage Account hosted in `West US 2`. You want client packets to enter Microsoft’s global fiber backbone at the edge Point-of-Presence (PoP) in Sydney rather than traversing congested public ISP transit all the way across the Pacific Ocean, versus configuring a separate archive storage account to minimize egress bandwidth cost over public ISP transit. Which Storage Account setting controls this?',
    options: [
      '**Routing preference**: **`Microsoft network routing`** (default—lowest latency via closest Microsoft WAN edge PoP) vs **`Internet routing`** (egress stays on public ISP networks longer for lower egress cost).',
      'Replication SKU (`RA-GZRS` vs `LRS`).',
      'Storage Account Access Tier (`Hot` vs `Cold`).',
      'Blob Index Tags.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Think **AWS S3 Transfer Acceleration** (entering via CloudFront edge PoPs onto AWS global backbone) vs ISP hot-potato egress routing—except in Azure, **Microsoft network routing** is the default!',
    explanation:
      'Under Firewalls and virtual networks > **Network Routing**, Azure Storage lets you choose your default routing preference (and optionally publish separate route-specific endpoints!): **`Microsoft network routing`** (the default—ingresses/egresses client traffic at the Microsoft global WAN edge PoP closest to the user for optimal throughput and reliability) vs **`Internet routing`** (hands traffic off to public transit ISPs right near the storage region to reduce data-egress cost for latency-insensitive workloads).',
    awsComparison:
      'Comparable to AWS Global Accelerator / S3 Transfer Acceleration vs regional public internet egress.'
  },
  {
    id: 'az104-a2-046',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Anonymous Blob Access Levels & Account Override',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'You are auditing public exposure on Azure Storage Accounts. Evaluate each statement regarding **Allow Blob anonymous access** and container public access levels (`Private`, `Blob`, `Container`).',
    statements: [
      {
        statement:
          'When **Allow Blob anonymous access** is set to **Disabled** at the Storage Account level (the default on new accounts), even a container previously configured with access level **`Container`** rejects all unauthenticated anonymous requests.',
        answer: true
      },
      {
        statement:
          'When anonymous access is enabled on the account and a container’s access level is set to **`Blob` (anonymous read access for blobs only)**, an unauthenticated user can call `?restype=container&comp=list` to list all blob filenames in that container.',
        answer: false
      },
      {
        statement:
          'Setting a container’s access level to **`Container`** allows anonymous unauthenticated internet users to upload and overwrite blobs inside that container.',
        answer: false
      }
    ],
    awsBridgeHint:
      '(1) Account-level `Allow Blob anonymous access = Disabled` is exact **S3 Block Public Access** at the account/bucket level! (2) `Blob` = `s3:GetObject` ONLY (no `ListBucket`), `Container` = `s3:GetObject` + `s3:ListBucket`—and anonymous **writes** NEVER exist without a SAS!',
    explanation:
      '1) Yes: Disabling **Allow Blob anonymous access** (`--allow-blob-public-access false`) at the Storage Account level acts as a master kill-switch overriding every container’s public access level. 2) No: Access level **`Blob`** permits anonymous `GET` on individual blobs ONLY if the requester knows the exact URL—container enumeration (`ListBlobs`) is denied! Access level **`Container`** permits anonymous `GET` on blobs AND `ListBlobs` enumeration. 3) No: Anonymous access in Azure Blob Storage is strictly **read-only**—unauthenticated users can NEVER write/delete without a valid SAS or RBAC token.',
    awsComparison:
      '`Allow Blob anonymous access = Disabled` ≈ **Amazon S3 Block Public Access = ON**! And unlike misconfigured S3 Bucket Policies that can accidentally grant `"Principal": "*", "Action": "s3:PutObject"`, Azure’s built-in anonymous access toggle is strictly **read-only**.'
  },
  {
    id: 'az104-a2-047',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Static Website Hosting in Azure Storage',
    difficulty: 1,
    format: 'single',
    prompt:
      'You want to host a React single-page application (`index.html`, `404.html`, and static JS/CSS bundles) directly out of a `Standard general-purpose v2` storage account without running an App Service Plan or Virtual Machine. When you enable **Static website** in the Data management blade, what special container and endpoint does Azure create, and how does it interact with `Allow Blob anonymous access = Disabled`?',
    options: [
      'It creates a `$root` container served over `blob.core.windows.net`, which fails if `Allow Blob anonymous access` is Disabled.',
      'It creates an Azure File share named `wwwroot` served over port 445.',
      'It automatically creates a **`$web`** blob container and serves static content over a dedicated **`https://<account>.<zone>.web.core.windows.net`** web endpoint—which **continues serving public read traffic** even when `Allow Blob anonymous access` is Disabled on the blob endpoint (unless restricted via Storage Firewall / Private Endpoint)!',
      'It deploys an Azure Container Instance behind the scenes.'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Notice the subtle security detail: `$web` serves over `*.web.core.windows.net`, NOT `*.blob.core.windows.net`—so disabling anonymous access on the `blob` endpoint does NOT turn off the static website endpoint!',
    explanation:
      'Enabling **Static website** on a `Standard GPv2` or `BlockBlobStorage` account automatically creates the **`$web`** container and publishes a separate primary/secondary web endpoint (`https://<account>.z13.web.core.windows.net`) with configurable Index document (`index.html`) and Error document path (`index.html` for SPA client-side routing!). Crucially, files served via the **`web`** endpoint are ALWAYS anonymously readable (independent of `Allow Blob anonymous access` on the `blob` endpoint!) unless you lock down networking via the Storage Firewall or a `web` Private Endpoint (e.g., behind Azure Front Door).',
    awsComparison:
      'Just like **Amazon S3 Static Website Hosting** (`s3-website-us-east-1.amazonaws.com`), except Azure Static Websites natively support **HTTPS** out of the box on `*.web.core.windows.net` (whereas S3 website endpoints are HTTP-only without CloudFront)!'
  },
  {
    id: 'az104-a2-048',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Cross-Origin Resource Sharing (CORS) for Direct Browser Uploads',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your single-page web app hosted at `https://app.contoso.com` fetches a valid **User Delegation SAS** from your backend API and then executes a browser `fetch()` `PUT` request directly to `https://stmedia01.blob.core.windows.net/uploads/photo.jpg?<SAS>`. Using `curl` from a terminal with the exact same SAS URL succeeds (`201 Created`), yet Chrome and Edge fail immediately in the browser console before uploading bytes, citing a blocked preflight `OPTIONS` request! What must you configure on `stmedia01`?',
    options: [
      'Disable `Secure transfer required` on `stmedia01`.',
      'Add a **CORS (Cross-Origin Resource Sharing)** rule on the **Blob service** of `stmedia01` allowing Origin `https://app.contoso.com`, Allowed Methods `PUT, OPTIONS` (plus `GET` if reading), and Allowed Headers (`x-ms-*`, `content-type`).',
      'Switch from User Delegation SAS to Account SAS.',
      'Add `app.contoso.com` to the Storage Account IP Firewall.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Classic `curl` works vs browser `fetch()` fails on preflight `OPTIONS`! Same-Origin Policy requires a CORS configuration on the Blob service.',
    explanation:
      'Because `https://app.contoso.com` and `https://stmedia01.blob.core.windows.net` are different origins, modern web browsers send an unauthenticated HTTP `OPTIONS` preflight check before executing a cross-origin `PUT` with `x-ms-blob-type` headers. By default, Azure Storage has zero CORS rules (blocking cross-origin browser requests while `curl` ignores CORS!). Configuring a **CORS rule** under Settings > Resource sharing (CORS) on the Blob service resolves the error.',
    awsComparison:
      '100% identical to configuring **S3 Bucket CORS** (`AllowedOrigins`, `AllowedMethods: ["PUT"]`, `AllowedHeaders: ["*"]`) when browsers upload directly to S3 via Pre-Signed URLs.'
  },
  {
    id: 'az104-a2-049',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Converting Storage Redundancy from LRS to ZRS',
    difficulty: 2,
    format: 'sequence',
    prompt:
      'A business-critical `Standard general-purpose v2` storage account (`stordersprod`) was originally deployed with **`LRS`**, and a resiliency audit mandates upgrading it to **`ZRS` (Zone-Redundant Storage)** while preserving the storage account name, endpoints, access keys, and RBAC assignments with zero downtime. Order the steps for performing an Azure Storage **Live Migration** to `ZRS`.',
    correctSequence: [
      'Verify `stordersprod` resides in an Azure region supporting `ZRS`, contains no `Archive`-tier blobs (rehydrate or move any archived blobs first, as `Archive` is unsupported on `ZRS`), and meets live-migration prerequisites.',
      'Initiate a **Customer-Initiated Conversion / Live Migration** to `ZRS` via the Azure Portal Redundancy blade (or run `Set-AzStorageAccount ... -ConvertToZrs` / `az storage account migration start --type Standard_ZRS`).',
      'Allow Microsoft’s background replication engine to copy and synchronize data across three Availability Zones while `stordersprod` remains online for reads and writes.',
      'Verify migration status completes (`migrationState: Succeeded`) and confirm the Storage Account SKU reflects **`Standard_ZRS`** with all original endpoints intact.'
    ],
    awsBridgeHint:
      'Watch out for two exam gems in this sequence: (1) `ZRS` and `GZRS` do **NOT** support the **`Archive`** blob tier, so archived blobs block `ZRS` conversion! (2) Customer-initiated Live Migration (`-ConvertToZrs`) performs the physical 3-AZ migration online with zero endpoint change.',
    explanation:
      'Unlike toggling `LRS -> GRS`, moving from `LRS -> ZRS` requires re-striping storage stamps across 3 Availability Zones. First, ensure zero `Archive`-tier blobs exist (because **`Archive` tier is ONLY supported on `LRS`, `GRS`, and `RA-GRS`—NEVER `ZRS` or `GZRS`!**). Next, trigger **Customer-Initiated Live Migration** (`az storage account migration start` / Portal Redundancy conversion), which completes asynchronously (typically within 72 hours) with zero downtime and preserves the account name and keys.',
    awsComparison:
      'Think migrating an Amazon EFS One Zone filesystem or single-AZ EBS data into multi-AZ storage, except Azure Storage provides an automated in-place **Live Migration** API (`migration start`) that keeps your DNS endpoint untouched.'
  },
  {
    id: 'az104-a2-050',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Customer-Managed Key (CMK) Versionless Rotation',
    difficulty: 3,
    format: 'multi',
    selectCount: 2,
    prompt:
      'Your Storage Account (`stvaulted01`) uses a **Customer-Managed Key (CMK)** stored in Azure Key Vault (`kv-central`) via a User-Assigned Managed Identity (`uami-storage-cmk`). Security requires automated annual CMK rotation in Key Vault with zero manual storage reconfiguration and without re-encrypting 200 TB of existing blob blocks. Which TWO facts explain how Azure Storage handles CMK rotation and accidental key revocation?',
    options: [
      'When CMK is configured with a **versionless Key URI** (omitting the specific key version GUID), Azure Storage checks Key Vault roughly hourly and **automatically adopts newly rotated key versions** to re-wrap the account’s root encryption key (envelope encryption) without rewriting 200 TB of data.',
      'Rotating the CMK in Key Vault triggers a full 200 TB physical rewrite of every blob block in `stvaulted01`.',
      'If an administrator disables the active CMK in Key Vault or revokes `uami-storage-cmk`’s `unwrapKey` permission, client read and write operations to `stvaulted01` fail within minutes (providing an emergency cryptographic "kill switch").',
      'Customer-Managed Keys can only encrypt Blobs and cannot encrypt Azure Files, Queues, or Tables.'
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'Envelope encryption 101 (just like AWS KMS + S3 Bucket Keys!): the CMK wraps the account Data Encryption Key (DEK), so rotating a versionless CMK just re-wraps the DEK—and revoking `unwrapKey` kills access across all four storage services within ~10–15 minutes!',
    explanation:
      '1) Correct: Azure Storage uses **envelope encryption**—your Key Vault CMK encrypts (wraps) Azure Storage’s internal root Account Encryption Key, not every raw 4 MB blob block directly. Configuring CMK without pinning a key version enables **automatic key version updates** whenever Key Vault’s rotation policy mints a new version! 3) Correct: Revoking the Managed Identity’s Key Vault access or disabling the key revokes access to ALL encrypted data in the Storage Account (Blobs, Files, Tables, AND Queues—all four services support CMK in modern GPv2 accounts!) once cached keys expire.',
    awsComparison:
      'Works identically to **AWS KMS Automatic Key Rotation + S3 Bucket Keys**, including the ability to disable the KMS key or revoke the grant as an emergency cryptographic circuit breaker.'
  },
  {
    id: 'az104-a2-051',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Azure Queue Storage Sizing & RBAC',
    difficulty: 1,
    format: 'single',
    prompt:
      'A decoupled image-thumbnail worker polls an **Azure Queue Storage** queue inside a `Standard general-purpose v2` storage account (`stjobs01`). What is the maximum size of a **single queue message**, what is the maximum total capacity of the queue, and which Entra RBAC role lets the worker dequeue and delete processed messages without Shared Keys?',
    options: [
      '1 MB per message, 80 GB max queue size, `Owner` role',
      '256 KB per message, 5 GB max queue size, `Storage Blob Data Contributor` role',
      '**64 KB** per message (`48 KB` raw binary if Base64-encoded), scaling up to the **500 TiB** capacity limit of the Storage Account, authorized via **`Storage Queue Data Contributor`** (or `Storage Queue Data Message Processor`)',
      '100 MB per message, unlimited queue size, `Reader` role'
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Contrast Azure Queue Storage (**64 KB** max message, **500 TiB** massive backlog capacity!) with Azure Service Bus Queues (256 KB Standard / 100 MB Premium, 1–80 GB queue cap)—if payloads exceed 64 KB, store the payload in Blob Storage and put the blob URI in the queue message!',
    explanation:
      '**Azure Queue Storage** supports individual messages up to **64 KB** (or **48 KB** before Base64 encoding when required by XML/SDK clients), while a single queue can hold **millions of messages up to the entire Storage Account capacity limit (500 TiB)**! For payloads >64 KB, the classic claim-check pattern writes the payload to **Blob Storage** and places the blob reference in Queue Storage. Data-plane Entra roles include `Storage Queue Data Reader`, `Storage Queue Data Message Sender`, `Storage Queue Data Message Processor` (peek + dequeue/delete), and `Storage Queue Data Contributor`.',
    awsComparison:
      'Compare **Amazon SQS** (256 KB message limit + S3 Extended Client Library claim-check pattern for large payloads) to **Azure Queue Storage** (64 KB message limit + Blob claim-check pattern).'
  },
  {
    id: 'az104-a2-052',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Blob Snapshots Deletion & Incremental Billing',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Before running a risky database export script, an operator takes manual **Blob Snapshots** of three `100 GB` block blobs in `stexports01`. Evaluate each statement regarding Blob Snapshots.',
    statements: [
      {
        statement:
          'Attempting to delete the base blob via `DeleteBlob` **without** specifying `DeleteSnapshotsOption.IncludeSnapshots` (or deleting its snapshots first) fails with a `409 Conflict (SnapshotsPresent)` error.',
        answer: true
      },
      {
        statement:
          'Once a Blob Snapshot is created, you can modify bytes inside that snapshot in place to patch corrupted blocks.',
        answer: false
      },
      {
        statement:
          'Immediately after taking a snapshot of a `100 GB` block blob (before any blocks on the base blob are modified), your billable storage consumption jumps from `100 GB` to `200 GB`.',
        answer: false
      }
    ],
    awsBridgeHint:
      'Snapshots are **read-only**, **incrementally billed** (sharing unchanged blocks/pages with the base blob!), and **block deleting the base blob** unless you explicitly cascade-delete or delete snapshots first!',
    explanation:
      '1) Yes: Azure protects snapshots attached to a base blob—calling `DeleteBlob` on a blob with active snapshots fails unless you pass `x-ms-delete-snapshots: include` (deletes base + all snapshots) or `only` (deletes snapshots only). (Note: by contrast, **Blob Versions** have independent lifecycles and allow deleting the current base blob while retaining versions!). 2) No: All **Blob Snapshots** are strictly **read-only**—to "revert", you copy the snapshot over the base blob (`Promote`). 3) No: Snapshots are **incremental**; unchanged blocks/pages between the base blob and snapshot are stored and billed only once!',
    awsComparison:
      'Incremental billing works just like **AWS EBS Snapshots**, while the `SnapshotsPresent` delete protection prevents orphaning dependent snapshot pointers.'
  },
  {
    id: 'az104-a2-053',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Unattended AzCopy Cron Jobs with Managed Identity',
    difficulty: 2,
    format: 'single',
    prompt:
      'A Linux Virtual Machine runs an unattended `02:00 UTC` `systemd` timer that uploads compressed PostgreSQL dumps to `https://stpgbackups.blob.core.windows.net/nightly/` using `AzCopy`. Security forbids SAS tokens on disk, Shared Key access is disabled on `stpgbackups`, and no human is awake to complete an interactive device-code prompt. What is the cleanest way to authenticate `AzCopy` on this VM?',
    options: [
      'Attach a **System-Assigned (or User-Assigned) Managed Identity** to the Linux VM, grant it **`Storage Blob Data Contributor`** on `stpgbackups` (or the `nightly` container), and set `AZCOPY_AUTO_LOGIN_TYPE=MSI` (or run `azcopy login --identity` in earlier v10 builds).',
      'Embed a `Global Administrator` username and password in `/etc/crontab`.',
      'Enable Anonymous `Container` access on `nightly`.',
      'Use `az storage account keys list` inside the cron script.'
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Zero-secret compute-to-storage auth: attach an Instance Profile (**Managed Identity**) + S3 write role (**`Storage Blob Data Contributor`**) and tell `AzCopy` to pull tokens from IMDS (`169.254.169.254`) via `AZCOPY_AUTO_LOGIN_TYPE=MSI`!',
    explanation:
      'In modern `AzCopy` (v10.21+, where `azcopy login` flags deprecated in favor of environment variables or `--login-type=MSI`), setting **`AZCOPY_AUTO_LOGIN_TYPE=MSI`** (and optionally `AZCOPY_MSI_CLIENT_ID` for a specific User-Assigned Managed Identity) instructs `AzCopy` to fetch short-lived OAuth tokens automatically from the Azure Instance Metadata Service (`169.254.169.254`), requiring zero secrets or SAS tokens on disk!',
    awsComparison:
      'Exact Azure counterpart to running `aws s3 cp` on an EC2 instance backed by an **IAM Instance Profile** querying EC2 IMDSv2 (`169.254.169.254`).'
  },
  {
    id: 'az104-a2-054',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Secure Transfer Required & Minimum TLS Enforcement',
    difficulty: 1,
    format: 'single',
    prompt:
      'A PCI-DSS penetration test flags a Storage Account if it accepts cleartext HTTP REST calls, unencrypted SMB 3.0 connections, SMB 2.1 connections, or deprecated TLS 1.0/1.1 handshakes. Which combination of two native Storage Account configuration settings remediates ALL of these findings immediately?',
    options: [
      'Enable **Hierarchical Namespace** and set **Blob Soft Delete** to 365 days.',
      'Set **Secure transfer required** to **Enabled** AND set **Minimum TLS version** to **Version 1.2** (or 1.3 where supported).',
      'Set **Routing preference** to **Microsoft network routing** and enable **Blob Versioning**.',
      'Apply a **`ReadOnly` Resource Lock** and disable **Allow Blob anonymous access**.'
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Two simple security toggles on every Storage Account: one blocks HTTP + unencrypted SMB (`aws:SecureTransport`), and the other rejects TLS < 1.2 (`s3:TlsVersion`)!',
    explanation:
      '(1) **Secure transfer required = Enabled** (on by default) rejects all HTTP REST requests (requiring HTTPS) AND rejects any SMB connection without encryption in transit (blocking SMB 2.1 and unencrypted SMB 3.x). (2) **Minimum TLS version = Version 1.2** rejects legacy TLS 1.0 and TLS 1.1 handshakes on HTTPS endpoints.',
    awsComparison:
      'In AWS S3, enforcing HTTPS + TLS 1.2 requires authoring explicit `Deny` Bucket Policy statements (`"Bool": {"aws:SecureTransport": "false"}` and `"NumericLessThan": {"s3:TlsVersion": "1.2"}`); Azure exposes both as first-class checkboxes on the Storage Account!'
  },
  {
    id: 'az104-a2-055',
    track: 'az-104',
    act: 2,
    domain: 'az104-storage',
    subtopic: 'Enterprise Storage Architecture Synthesis',
    difficulty: 3,
    format: 'single',
    prompt:
      'A hospital network is migrating its medical imaging archive to Azure Storage with four strict requirements:\n1. Blobs that have **not been read** for 60 days must automatically move to `Cool`, and blobs **not read** for 180 days must remain online with millisecond latency at even lower storage cost (`Cold`), **without** ever going offline into `Archive`, while surviving a full datacenter Availability Zone failure.\n2. Hospital PACS servers on-premises (connected via ExpressRoute Private Peering) must access blobs strictly over private `10.x.x.x` IPs with Public Network Access completely **Disabled**.\n3. Storage Account Shared Keys (`key1`/`key2`) must be **Disabled** (`allowSharedKeyAccess: false`), yet clinicians’ web portals must receive 10-minute pre-signed blob URLs.\n\nWhich architecture satisfies EVERY requirement?',
    options: [
      '`Premium block blobs` (`ZRS`) + Lifecycle Management (`daysAfterModificationGreaterThan`) + VNet Service Endpoint + Service SAS.',
      '`Standard GPv2` (`LRS`) + `Archive` tier + Public Firewall IP whitelist + Account SAS.',
      '`Premium file shares` (`ZRS`) + NFS 4.1 + Azure File Sync + Stored Access Policy.',
      '`Standard general-purpose v2` with **`ZRS`** (or **`GZRS`**) + **Last access time tracking** enabled with Lifecycle Management (`daysAfterLastAccessTimeGreaterThan` -> `Cool` at 60d, `Cold` at 180d) + **Private Endpoint** (`blob`) linked to **`privatelink.blob.core.windows.net`** with Public Network Access Disabled + Entra RBAC (`Storage Blob Data*`) issuing **User Delegation SAS** tokens.'
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Check all 4 puzzle pieces together: `ZRS` survives AZ loss (and supports online `Hot`/`Cool`/`Cold`!), `Access time tracking` tiers on last-read, `Private Endpoint` (`privatelink.blob...`) traverses ExpressRoute privately, and `User Delegation SAS` works with Shared Keys disabled!',
    explanation:
      'Every requirement aligns cleanly: (1) **`Standard GPv2` + `ZRS`/`GZRS`** survives an Availability Zone outage AND supports online `Hot`, `Cool`, and `Cold` tiers (remember `ZRS` only blocks offline `Archive`, which requirement 1 explicitly avoids!), paired with **Access time tracking** + `daysAfterLastAccessTimeGreaterThan`; (2) **Private Endpoint (`blob`)** + `privatelink.blob.core.windows.net` gives an RFC1918 IP routable over ExpressRoute while Public Network Access is `Disabled` (whereas Service Endpoints fail over ExpressRoute!); and (3) **User Delegation SAS** signed by Microsoft Entra ID works seamlessly with `--allow-shared-key-access false`!',
    awsComparison:
      'Equivalent to **Amazon S3 Intelligent-Tiering** (Frequent -> Infrequent -> Archive Instant Access across 3 AZs) fronted by **AWS PrivateLink for S3** over Direct Connect + **IAM Role STS Pre-Signed URLs**.'
  }
];

