import type { ExamQuestion } from '../../types/curriculum';

export const AZ104_ACT4_QUESTIONS: ExamQuestion[] = [
  {
    id: 'az104-a4-001',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'VNet Addressing & Reserved IPs',
    difficulty: 1,
    format: 'single',
    prompt:
      'You are designing a tightly scoped virtual network for a point-to-point appliance subnet and assign the IPv4 address prefix 10.10.1.0/29. How many usable IP addresses are available for virtual machine network interfaces in this subnet?',
    options: [
      '2 usable IP addresses',
      '3 usable IP addresses',
      '4 usable IP addresses',
      '6 usable IP addresses',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Just like another major cloud reserves 5 addresses per subnet rather than traditional on-premises networking (which only reserves 2), subtract 5 platform-reserved addresses from 2^(32 - 29).',
    explanation:
      'A /29 CIDR block contains 8 total IPv4 addresses (2^3 = 8). Azure reserves 5 IP addresses in every subnet: .0 (network address), .1 (default gateway), .2 and .3 (mapped by Azure to the Azure DNS IPs), and the last address (.7 in a /29) for network broadcast. 8 - 5 leaves 3 usable host IPs (.4, .5, and .6).',
    awsComparison:
      'Identical count to AWS VPC subnets! Both AWS and Azure reserve 5 IPs per subnet (.0, .1, .2, .3, and broadcast), meaning /29 is the smallest practical subnet (3 usable IPs) in Azure, whereas AWS stops at /28 (11 usable IPs).',
  },
  {
    id: 'az104-a4-002',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'VNet Addressing & Reserved IPs',
    difficulty: 1,
    format: 'single',
    prompt:
      'You create a new virtual network with a single subnet named AppSubnet using the CIDR block 10.20.4.0/24. You deploy your first virtual machine (VM1) into AppSubnet with dynamic private IP allocation. Which private IPv4 address will Azure assign to VM1?',
    options: [
      '10.20.4.1',
      '10.20.4.2',
      '10.20.4.3',
      '10.20.4.4',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Count past the network address, the implicit router gateway, and the two platform DNS relay addresses at the bottom of every subnet.',
    explanation:
      'In subnet 10.20.4.0/24, Azure reserves 10.20.4.0 (network), 10.20.4.1 (default gateway), 10.20.4.2 and 10.20.4.3 (Azure DNS mapping), and 10.20.4.255 (broadcast). Therefore, the first dynamically allocated host IP address in any /24 subnet is .4 (10.20.4.4).',
    awsComparison:
      'Matches AWS VPC dynamic host assignment (.4 is the first usable host IP in an AWS /24 subnet as well, since AWS reserves .0 network, .1 VPC router, .2 DNS, and .3 future use).',
  },
  {
    id: 'az104-a4-003',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'IPv4/IPv6 Dual-Stack Addressing',
    difficulty: 2,
    format: 'single',
    prompt:
      'You are configuring an existing IPv4 virtual network to support dual-stack IPv4/IPv6 workloads. You add the IPv6 address space fd00:db8:deca::/48 to the virtual network. What prefix length MUST you assign to the IPv6 range on each dual-stack subnet?',
    options: [
      '/64',
      '/56',
      '/96',
      '/120',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Standard cloud dual-stack subnets require a fixed 64-bit host boundary for IPv6 subnetting regardless of how small the IPv4 CIDR is.',
    explanation:
      'In Azure Virtual Networks, IPv6 address spaces added at the VNet level are typically /48 or /56, while every dual-stack subnet MUST be configured with an exact /64 IPv6 prefix. Smaller or larger IPv6 subnet masks are rejected by Azure Resource Manager.',
    awsComparison:
      'Same rule as AWS VPC! AWS allocates a /56 IPv6 block to a VPC and strictly enforces /64 IPv6 CIDR blocks on individual subnets (though AWS recently added custom CIDRs via IPAM, /64 remains standard).',
  },
  {
    id: 'az104-a4-004',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'VNet & Subnet Scope',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Evaluate the following architectural statements regarding Azure Virtual Networks (VNets) and subnets in regions that support Availability Zones:',
    statements: [
      {
        statement:
          'A single subnet in an Azure Virtual Network automatically spans all Availability Zones within that region without requiring separate per-zone subnets.',
        answer: true,
      },
      {
        statement:
          'A single Azure Virtual Network can span two paired Azure regions to simplify disaster recovery.',
        answer: false,
      },
      {
        statement:
          'Before you can delete a subnet from a virtual network, all network interfaces and delegated service resources inside that subnet must be removed or moved.',
        answer: true,
      },
    ],
    awsBridgeHint:
      'Beware a massive architectural difference here: in Azure, subnets are regional constructs rather than pinned to a single Availability Zone!',
    explanation:
      'Both VNets and subnets in Azure are scoped to a single Azure region and subscription, and they automatically span all Availability Zones in that region (you can deploy Zone 1, Zone 2, and Zone 3 VMs into the exact same subnet!). A VNet can never span multiple regions, and Azure blocks deleting any subnet that still contains allocated IP configurations or NICs.',
    awsComparison:
      'Major AWS SAA gotcha! In AWS, a VPC spans all AZs in a region, but each Subnet is strictly locked to ONE Availability Zone. In Azure, a single Subnet spans ALL Availability Zones in the region!',
  },
  {
    id: 'az104-a4-005',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Dedicated Platform Subnets',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'You are designing a hub virtual network (`10.0.0.0/16`) that will host both Azure Bastion and Azure Firewall. Which TWO dedicated subnet configurations meet Microsoft mandatory naming and minimum prefix size requirements? (Select 2.)',
    options: [
      'A subnet named AzureBastionSubnet with prefix 10.0.1.0/26',
      'A subnet named BastionSubnet with prefix 10.0.1.0/27',
      'A subnet named FirewallSubnet with prefix 10.0.2.0/24',
      'A subnet named AzureFirewallSubnet with prefix 10.0.2.0/26',
      'A subnet named AzureFirewallSubnet with prefix 10.0.2.0/28',
    ],
    correctIndices: [0, 3],
    awsBridgeHint:
      'Managed first-party security appliances in Azure require exact case-match reserved subnet names and at least 64 total addresses (/26) to accommodate platform autoscaling.',
    explanation:
      'Azure Bastion requires a dedicated subnet named exactly `AzureBastionSubnet` with a minimum size of `/26` (or larger, like `/25` or `/24`). Azure Firewall similarly requires a dedicated subnet named exactly `AzureFirewallSubnet` with a minimum size of `/26` so it has sufficient IP addresses to scale out underlying firewall instances.',
    awsComparison:
      'Unlike AWS Network Firewall or EC2 Instance Connect Endpoint (where you can name the dedicated firewall/endpoint subnet anything you want and use a /28), Azure enforces exact reserved names (`AzureBastionSubnet`, `AzureFirewallSubnet`, `GatewaySubnet`) and strict minimum CIDR masks.',
  },
  {
    id: 'az104-a4-006',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'GatewaySubnet Governance',
    difficulty: 2,
    format: 'single',
    prompt:
      'You plan to deploy a Virtual Network Gateway for Site-to-Site VPN today and add an ExpressRoute gateway in the same virtual network next quarter. Which configuration practice should you follow when provisioning `GatewaySubnet`?',
    options: [
      'Create GatewaySubnet as a /29 and attach a strict Network Security Group allowing only UDP 500 and 4500',
      'Deploy a domain controller VM inside GatewaySubnet so DNS traffic traverses the VPN tunnel first',
      'Size GatewaySubnet as /27 or larger and do not associate any Network Security Group with it',
      'Name the subnet VpnGatewaySubnet and enable VNet Service Endpoints for Microsoft.KeyVault',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Platform VPN/ExpressRoute gateway subnets must never host workload VMs or packet-filtering security groups, and coexisting gateways require at least 32 addresses.',
    explanation:
      'Microsoft recommends creating `GatewaySubnet` with a `/27` or `/26` prefix—especially when ExpressRoute and Site-to-Site VPN gateways coexist, which strictly requires at least `/27`. Furthermore, you should never deploy VMs into `GatewaySubnet` or associate an NSG with `GatewaySubnet`, as an NSG causes the gateway to stop functioning (and Azure Portal actively blocks attaching one).',
    awsComparison:
      'In AWS, a Virtual Private Gateway (VGW) or Transit Gateway attachment sits at the VPC edge or in standard subnets without reserved naming; in Azure, `GatewaySubnet` is a rigid platform-managed appliance subnet.',
  },
  {
    id: 'az104-a4-007',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Azure Firewall Forced Tunneling',
    difficulty: 3,
    format: 'single',
    prompt:
      'Security compliance mandates that all internet-bound traffic (`0.0.0.0/0`) from your Azure Firewall must be routed via forced tunneling back to an on-premises edge firewall over ExpressRoute rather than exiting directly to the internet. What additional networking prerequisite is required to deploy Azure Firewall in forced-tunneling mode?',
    options: [
      'Enable BGP route propagation on AzureFirewallSubnet and remove its Public IP',
      'Create an AzureFirewallManagementSubnet (/26 or larger) with its own Standard Public IP and default route to Internet',
      'Deploy an Application Security Group inside AzureFirewallSubnet',
      'Downgrade the Azure Firewall SKU from Standard to Basic',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Even when customer data-plane traffic is forced back on-premises, Azure control-plane telemetry and certificate updates still need an isolated direct internet management channel.',
    explanation:
      'Azure Firewall requires direct internet connectivity for platform management operations, health updates, and threat intelligence feeds. When `AzureFirewallSubnet` uses forced tunneling (`0.0.0.0/0` pointing to an on-premises NVA or VPN/ExpressRoute), you must provision a second dedicated subnet named `AzureFirewallManagementSubnet` (minimum `/26`) with its own Standard Public IP and a system/UDR route for `0.0.0.0/0` -> `Internet`.',
    awsComparison:
      'In AWS Network Firewall, management plane communication uses internal AWS Hyperplane interfaces completely invisible to your VPC route tables; Azure Firewall exposes this split explicitly via `AzureFirewallManagementSubnet`.',
  },
  {
    id: 'az104-a4-008',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Resizing Peered VNets',
    difficulty: 2,
    format: 'sequence',
    prompt:
      '`VNet-Hub` (`10.0.0.0/24`) and `VNet-Spoke` (`10.1.0.0/24`) are already connected via an active VNet Peering. You need to expand `VNet-Hub` by adding a new non-overlapping address range (`10.2.0.0/24`), deploy a new subnet inside it, and ensure VMs in `VNet-Spoke` can route to the new prefix without deleting the peering. Arrange the steps in the correct operational order:',
    correctSequence: [
      'Add the non-overlapping IPv4 address range 10.2.0.0/24 to the VNet-Hub address space',
      'Create the new workload subnet within the 10.2.0.0/24 address space on VNet-Hub',
      'Run the Sync operation on the VNet peering link so remote system routes update',
      'Inspect Effective Routes on a VNet-Spoke VM network interface to verify the 10.2.0.0/24 prefix',
    ],
    awsBridgeHint:
      'Modern Azure lets you append CIDRs to an already-peered VNet without tearing down the peering, provided you explicitly synchronize the peering route state afterward.',
    explanation:
      'Historically, resizing a peered VNet required deleting and recreating the peering. Today, Azure allows adding or removing non-overlapping CIDR blocks on a peered VNet directly, after which you MUST trigger a `Sync` operation (`Sync-AzVirtualNetworkPeering` or `Sync` in the portal) on the peering so the remote VNet updates its `VNetPeering` system routes.',
    awsComparison:
      'In AWS VPC Peering, adding a secondary CIDR to a VPC automatically exposes the new prefix toVPC route tables (you just manually add the static route in the peer VPC route table). In Azure, system routes for peered VNets are auto-programmed once you click `Sync`.',
  },
  {
    id: 'az104-a4-009',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Application Gateway Subnet Rules',
    difficulty: 2,
    format: 'single',
    prompt:
      'You attempt to deploy an Azure Application Gateway (`WAF_v2` SKU) into an existing `FrontendSubnet` (`10.5.1.0/24`) that currently hosts two Linux web server VMs, and the deployment fails with a subnet validation error. What is the cause of this failure?',
    options: [
      'The subnet must be named exactly ApplicationGatewaySubnet',
      'Application Gateway v2 requires at least a /23 subnet prefix',
      'Application Gateway v2 must be deployed into GatewaySubnet',
      'An Application Gateway subnet can only contain Application Gateway instances and cannot share a subnet with VM network interfaces',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Unlike an Application Load Balancer whose ENIs happily share public subnets with EC2 instances, this regional Layer 7 proxy demands a subnet free of regular compute NICs.',
    explanation:
      'Application Gateway requires a dedicated subnet that contains ONLY Application Gateways (multiple Application Gateways of the same version can share the subnet, but VMs, container instances, Private Endpoints, or Load Balancers are prohibited). Unlike Bastion or Azure Firewall, the subnet can have any custom name (e.g., `AppGwSubnet`), with `/24` recommended for v2 autoscaling.',
    awsComparison:
      'Big AWS SAA migration trap! In AWS, you routinely place an ALB into the same public subnets as bastion hosts or NAT Gateways. In Azure, Application Gateway v2 fails deployment if even a single VM NIC exists in its subnet.',
  },
  {
    id: 'az104-a4-010',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'VNet Peering Transitivity',
    difficulty: 1,
    format: 'single',
    prompt:
      'You configure VNet Peering between `VNet-A` and `VNet-B`, and a second VNet Peering between `VNet-B` and `VNet-C`. No Network Virtual Appliances, Virtual Network Gateways, or User-Defined Routes are deployed. Which connectivity statement is true by default?',
    options: [
      'VMs in VNet-A can communicate with VMs in VNet-C automatically via VNet-B',
      'VMs in VNet-A can communicate with VMs in VNet-C only over ICMP and TCP port 443',
      'VMs in VNet-A can communicate with VMs in VNet-B, and VNet-B with VNet-C, but VNet-A cannot communicate with VNet-C',
      'No communication works until BGP is configured across all three virtual networks',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Peer-to-peer virtual network links are strictly non-transitive across both clouds unless you insert a hub router, gateway, or direct mesh peering.',
    explanation:
      'VNet Peering is non-transitive. Peering `A <-> B` and `B <-> C` only establishes direct backbone routing between directly peered pairs. For `VNet-A` to reach `VNet-C`, you must either create a direct peering between `VNet-A` and `VNet-C`, or deploy a hub NVA / VPN Gateway in `VNet-B` with UDRs and `AllowForwardedTraffic` enabled.',
    awsComparison:
      '100% identical to AWS VPC Peering! Neither AWS VPC Peering nor Azure VNet Peering supports transitive routing natively (for automatic hub transitivity at scale, AWS uses Transit Gateway while Azure uses Azure Virtual WAN or a Hub NVA/Firewall).',
  },
  {
    id: 'az104-a4-011',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Gateway Transit in Hub-Spoke',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'You have a hub-and-spoke topology where `VNet-Hub` hosts an active Site-to-Site Virtual Network Gateway connected to your on-premises datacenter. You want `VNet-Spoke` VMs to reach on-premises servers through the hub gateway without deploying a separate gateway in `VNet-Spoke`. Evaluate each statement:',
    statements: [
      {
        statement:
          'You must enable "Allow gateway transit" (Allow VNet-Spoke to use VNet-Hub\'s virtual network gateway) on the peering from VNet-Hub to VNet-Spoke.',
        answer: true,
      },
      {
        statement:
          'You must enable "Use the remote virtual network\'s gateway" on the peering from VNet-Spoke to VNet-Hub.',
        answer: true,
      },
      {
        statement:
          'VNet-Spoke can retain its own local backup Virtual Network Gateway while "Use remote gateways" is enabled.',
        answer: false,
      },
    ],
    awsBridgeHint:
      'Hub-and-spoke gateway sharing requires complementary flags on both ends of the peering, and a spoke cannot simultaneously own a local gateway and borrow a remote one.',
    explanation:
      'To share a Hub VPN or ExpressRoute gateway across VNet Peering, the Hub-to-Spoke peering must enable `AllowGatewayTransit`, and the Spoke-to-Hub peering must enable `UseRemoteGateways`. Critically, a spoke VNet CANNOT already have its own Virtual Network Gateway configured if `UseRemoteGateways` is enabled.',
    awsComparison:
      'In AWS,VPC Peering CANNOT transit a Virtual Private Gateway (VGW) at all—you would be forced to migrate from VGW + VPC Peering to AWS Transit Gateway! Azure VNet Peering natively supports VPN/ExpressRoute gateway transit via these two checkboxes.',
  },
  {
    id: 'az104-a4-012',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'VNet Peering Constraints',
    difficulty: 2,
    format: 'single',
    prompt:
      'Following a corporate acquisition, you need to connect `VNet-Finance` (`10.0.0.0/16`) in Subscription A with `VNet-Acquired` (`10.0.10.0/24`) in Subscription B. When you attempt to create a VNet Peering, Azure blocks the deployment. Why does the peering fail?',
    options: [
      'The IPv4 address spaces of the two virtual networks overlap',
      'VNet Peering cannot connect virtual networks located in different Azure subscriptions',
      'VNet Peering requires identical subnet prefix lengths (/24 to /24) on both sides',
      'Global VNet Peering is required whenever two virtual networks belong to different Resource Groups',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Check whether 10.0.10.0/24 falls inside 10.0.0.0/16—routing tables cannot disambiguate colliding RFC 1918 blocks across a direct L3 peering.',
    explanation:
      '`10.0.10.0/24` is a subset of `10.0.0.0/16`, creating an overlapping CIDR conflict. Azure strictly prohibits VNet Peering (and VNet-to-VNet VPN connections without NAT) between virtual networks with overlapping IPv4 or IPv6 address spaces. Cross-subscription, cross-resource-group, cross-region, and even cross-Entra-tenant peerings are all supported as long as CIDRs do not overlap.',
    awsComparison:
      'Same constraint as AWS VPC Peering (overlapping CIDRs cannot be peered; in AWS you would use PrivateLink or Private NAT Gateway, and in Azure you use Azure Private Link or an Azure VPN Gateway with NAT rules).',
  },
  {
    id: 'az104-a4-013',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Spoke-to-Spoke Routing via Hub NVA',
    difficulty: 3,
    format: 'multi',
    selectCount: 2,
    prompt:
      '`VNet-Spoke1` (`10.1.0.0/16`) and `VNet-Spoke2` (`10.2.0.0/16`) are both peered with `VNet-Hub` (`10.0.0.0/16`). `VNet-Hub` runs an Azure Firewall / Network Virtual Appliance at `10.0.1.4` with IP forwarding enabled. Which TWO configurations are required so VMs in `VNet-Spoke1` can communicate with VMs in `VNet-Spoke2` through the hub appliance? (Select 2.)',
    options: [
      'Enable "Use remote gateways" on both spoke-to-hub peerings',
      'Enable "Allow forwarded traffic" on the spoke-side peering settings so each spoke accepts packets forwarded by the hub NVA',
      'Associate User-Defined Routes on the spoke subnets routing 10.2.0.0/16 and 10.1.0.0/16 to next hop VirtualAppliance 10.0.1.4',
      'Create a direct Global VNet Peering between VNet-Spoke1 and VNet-Spoke2 with BGP enabled',
      'Change the hub subnet name to GatewaySubnet',
    ],
    correctIndices: [1, 2],
    awsBridgeHint:
      'Spokes need explicit route table entries pointing at the hub firewall IP, AND peering security must permit packets whose source IP did not originate inside the hub VNet itself.',
    explanation:
      'By default, a peered VNet drops traffic arriving over a peering link if that traffic did not originate inside the directly peered VNet. When `VNet-Spoke1` (`10.1.x.x`) sends packets through `VNet-Hub` to `VNet-Spoke2` (`10.2.x.x`), you must (1) attach UDRs in both spokes pointing to Next Hop `VirtualAppliance` (`10.0.1.4`) and (2) enable `AllowForwardedTraffic` on the peering configurations so forwarded cross-spoke packets are accepted.',
    awsComparison:
      'In AWS Transit Gateway inspection architectures, you configure TGW route tables + Appliance Mode; in Azure DIY hub-and-spoke Peering, forgetting the `AllowForwardedTraffic` checkbox silently drops cross-spoke traffic at the VNet boundary!',
  },
  {
    id: 'az104-a4-014',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Global VNet Peering Limitations',
    difficulty: 3,
    format: 'single',
    prompt:
      'You establish a Global VNet Peering between `VNet-EastUS` and `VNet-WestEurope`. VMs in `VNet-WestEurope` can ping individual backend VMs in `VNet-EastUS` directly, but all connections to the frontend private IP of an Internal Load Balancer (`ILB-Legacy`) in `VNet-EastUS` time out. What is the most likely root cause?',
    options: [
      'Global VNet Peering blocks all RFC 1918 TCP traffic unless ExpressRoute Global Reach is enabled',
      'Internal Load Balancers require Floating IP to be enabled across regional boundaries',
      'The VNet Peering is missing a Private DNS Zone auto-registration link',
      'ILB-Legacy uses the Basic SKU, which does not support traffic across Global VNet Peering',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Legacy/Basic tier load balancers in Azure only work over same-region peering, never inter-region peering.',
    explanation:
      'One of the classic AZ-104 constraints of **Global VNet Peering** (peering across two different Azure regions) is that resources behind a **Basic SKU Internal Load Balancer** (and certain legacy Basic-tier services) CANNOT be reached over Global VNet Peering—they only work over Regional VNet Peering. Upgrading to a **Standard SKU Internal Load Balancer** resolves the issue.',
    awsComparison:
      'Similar to AWS inter-region VPC Peering historic limitations (e.g., AWS NLB originally needed explicit cross-region target/client support); in Azure, Basic vs Standard SKU compatibility is heavily tested on AZ-104.',
  },
  {
    id: 'az104-a4-015',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'VNet Peering State Troubleshooting',
    difficulty: 2,
    format: 'single',
    prompt:
      'You are the Network Contributor for Subscription A (`VNet-App`), while another administrator manages Subscription B (`VNet-Data`). Using Azure CLI, you create a peering link from `VNet-App` targeting `VNet-Data`\'s resource ID. When you inspect the peering status, it remains `Initiated` instead of `Connected`, and traffic fails. How do you complete the connection?',
    options: [
      'Restart all virtual machines in VNet-App and VNet-Data so their NICs refresh ARP tables',
      'Have the Subscription B administrator create the reciprocal peering link from VNet-Data back to VNet-App',
      'Deploy a Local Network Gateway in both subscriptions with matching pre-shared keys',
      'Wait up to 24 hours for Azure Backbone BGP convergence to transition the state to Connected',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Unlike an accept-request handshake workflow, Azure VNet Peering via CLI/IaC consists of two independent unidirectional peering resources that must both exist.',
    explanation:
      'When creating a VNet Peering in the Azure Portal with permissions to both VNets, the portal conveniently creates both directional peering links at once. However, via CLI/PowerShell/ARM—or when two separate admins manage two subscriptions—creating only one side leaves `PeeringState` as `Initiated`. Once the second admin creates the matching peering from `VNet-Data` to `VNet-App`, both links immediately flip to `Connected`.',
    awsComparison:
      'Notice the workflow difference from AWS! AWS VPC Peering uses a Request (`pending-acceptance`) -> Accept (`active`) handshake on a single `pcx-*` object. Azure creates two separate peering child resources (A->B and B->A) that auto-handshake when both exist.',
  },
  {
    id: 'az104-a4-016',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Cross-Tenant VNet Peering RBAC',
    difficulty: 2,
    format: 'single',
    prompt:
      'Two partner companies use separate Microsoft Entra tenants (`contoso.com` and `fabrikam.com`) and want to establish VNet Peering between `VNet-Contoso` and `VNet-Fabrikam`. What identity and RBAC configuration allows an administrator to configure the cross-tenant peering?',
    options: [
      'VNet Peering is blocked across different Microsoft Entra tenants; an IPsec Site-to-Site VPN is mandatory',
      'Both tenants must first establish a two-way Active Directory forest trust',
      'Invite the administrator as a Microsoft Entra B2B guest in the partner tenant and assign at least Network Contributor on both virtual networks',
      'Assign Global Reader at the tenant root group in both tenants',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Azure supports cross-tenant peering natively—the principal establishing each side just needs B2B guest access (or dual-tenant CLI auth) with network write permissions on the respective VNet.',
    explanation:
      'VNet Peering works across different Microsoft Entra tenants! To set it up, invite the admin user into the remote tenant via Microsoft Entra B2B collaboration (or authenticate a user/service principal to both tenants in Azure CLI/PowerShell) and grant `Network Contributor` (or a custom role with `Microsoft.Network/virtualNetworks/peer/action`) on each VNet.',
    awsComparison:
      'Equivalent to cross-account VPC Peering across two completely separate AWS Organizations—supported natively as long as IAM principals in both AWS accounts authorize the link and CIDRs do not overlap.',
  },
  {
    id: 'az104-a4-017',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Route Precedence & Longest Prefix Match',
    difficulty: 2,
    format: 'single',
    prompt:
      'A subnet has three active routes in its effective route table: (1) a System route for `10.50.0.0/16` via `VNetPeering`, (2) a User-Defined Route (UDR) for `10.50.0.0/16` via `VirtualAppliance` (`10.0.1.4`), and (3) a BGP route learned over ExpressRoute for `10.50.16.0/20` via `VirtualNetworkGateway`. If a VM sends a packet to `10.50.20.15`, which next hop will Azure select?',
    options: [
      'VirtualNetworkGateway (BGP route 10.50.16.0/20)',
      'VirtualAppliance 10.0.1.4 (UDR 10.50.0.0/16)',
      'VNetPeering (System route 10.50.0.0/16)',
      'The packet is dropped due to conflicting routes',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Standard IP routing physics still rules first: Longest Prefix Match (/20 vs /16) ALWAYS beats administrative route source priority!',
    explanation:
      'Azure evaluates routes first by **Longest Prefix Match (LPM)**. Destination `10.50.20.15` falls within `10.50.16.0/20` (`10.50.16.0` – `10.50.31.255`) as well as both `/16` routes. Because `/20` is a longer, more specific prefix than `/16`, the BGP route via `VirtualNetworkGateway` wins—even over a `/16` User-Defined Route! Source preference (`UDR > BGP > System`) is ONLY used as a tie-breaker when prefix lengths are identical.',
    awsComparison:
      'Identical to AWS VPC route evaluation! Longest Prefix Match always wins first across static routes, propagated BGP/DX routes, and local routes.',
  },
  {
    id: 'az104-a4-018',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Route Tie-Breaking Order',
    difficulty: 2,
    format: 'single',
    prompt:
      'When an effective route table on an Azure subnet contains three active routes with the exact same address prefix (`172.16.10.0/24`)—one System route, one BGP-propagated route, and one User-Defined Route (UDR)—in what priority order does Azure evaluate them from highest priority to lowest priority?',
    options: [
      'System route -> User-Defined Route -> BGP route',
      'BGP route -> User-Defined Route -> System route',
      'System route -> BGP route -> User-Defined Route',
      'User-Defined Route -> BGP route -> System route',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Explicit administrator overrides beat dynamically learned hybrid routes, which in turn beat built-in platform defaults.',
    explanation:
      'When multiple routes match a destination with an **identical prefix length** (tie on Longest Prefix Match), Azure breaks the tie in strict order: **1. User-Defined Route (UDR)** -> **2. BGP route** -> **3. System default route**. This allows administrators to override system routes (such as `0.0.0.0/0 -> Internet` or intra-VNet `VNetLocal` routing) using UDRs.',
    awsComparison:
      'Matches AWS static vs propagated BGP route priority, PLUS an extra superpower: in Azure, a UDR for the VNet CIDR itself can override the local intra-VNet system route easily to force east-west subnet traffic through an NVA!',
  },
  {
    id: 'az104-a4-019',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'NVA IP Forwarding Requirement',
    difficulty: 2,
    format: 'single',
    prompt:
      'You deploy an Ubuntu Linux VM (`VM-NVA`, private IP `10.0.254.4`) to inspect outbound traffic from `WorkloadSubnet`. Inside Ubuntu, you enable `net.ipv4.ip_forward = 1` and configure `iptables` NAT rules. You also associate a Route Table with `WorkloadSubnet` containing `0.0.0.0/0 -> VirtualAppliance (10.0.254.4)`. However, `tcpdump` on `VM-NVA` shows forwarded packets never even arrive at the Linux guest OS. What step did you miss?',
    options: [
      'Attach a Basic SKU Public IP to every VM in WorkloadSubnet',
      'Enable IP forwarding on the Azure Network Interface (NIC) resource attached to VM-NVA',
      'Rename VM-NVA\'s subnet to AzureFirewallSubnet',
      'Change the UDR next hop type from VirtualAppliance to VNetLocal',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Think of disabling the hypervisor "Source/Destination Check" on an EC2 NAT/firewall instance—Azure enforces the exact same anti-spoofing drop on every NIC by default!',
    explanation:
      'By default, the Azure SDN fabric drops any packet destined for a VM NIC if the packet\'s destination IP does not match the NIC\'s own assigned IP configuration. For a Network Virtual Appliance (NVA) to receive and route traffic addressed to external destinations (`0.0.0.0/0` or another subnet), you MUST enable **IP forwarding** BOTH on the **Azure Network Interface (NIC)** resource AND inside the **guest OS**.',
    awsComparison:
      'Direct equivalent to disabling **Source/Destination Check** on an AWS EC2 ENI! Azure calls it **Enable IP forwarding = Enabled** (`enableIPForwarding: true`) on the Azure NIC.',
  },
  {
    id: 'az104-a4-020',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'UDR Next Hop Types',
    difficulty: 2,
    format: 'single',
    prompt:
      'You want to blackhole (silently drop) all direct internet-bound traffic (`0.0.0.0/0`) from `DatabaseSubnet` at the routing layer without deploying a firewall appliance or modifying Network Security Groups. Which User-Defined Route configuration accomplishes this?',
    options: [
      'Address prefix 0.0.0.0/0 with Next hop type set to VNetLocal',
      'Address prefix 0.0.0.0/0 with Next hop type set to VirtualNetworkGateway and no gateway deployed',
      'Address prefix 0.0.0.0/0 with Next hop type set to None',
      'Address prefix 10.0.0.0/8 with Next hop type set to Internet',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Azure includes a dedicated null-route / blackhole next-hop type right in the route table dropdown to override built-in system routes.',
    explanation:
      'Every Azure subnet starts with a built-in system route `0.0.0.0/0 -> Internet`. Creating a User-Defined Route for `0.0.0.0/0` with **Next hop type = `None`** overrides the system route (since UDR beats System on equal `/0` prefix length) and immediately drops all matching packets at the SDN layer.',
    awsComparison:
      'In AWS, a private subnet simply omits a `0.0.0.0/0 -> igw-*` route because AWS has no default `0.0.0.0/0 -> Internet` system route. Because Azure injects `0.0.0.0/0 -> Internet` by default in EVERY subnet, `Next hop = None` is how you create a true route-table blackhole.',
  },
  {
    id: 'az104-a4-021',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'BGP Route Propagation Control',
    difficulty: 3,
    format: 'single',
    prompt:
      'Your virtual network connects to on-premises datacenters via ExpressRoute using BGP. You deploy a centralized inspection NVA and attach a Route Table to `AppSubnet` with `0.0.0.0/0 -> VirtualAppliance (10.0.100.4)`. However, traffic from `AppSubnet` to on-premises `192.168.10.0/24` still bypasses the NVA and goes directly to the ExpressRoute gateway. What is the cleanest fix on `AppSubnet`\'s Route Table?',
    options: [
      'Set Propagate gateway routes (BGP route propagation) to No / Disabled on the Route Table',
      'Delete the ExpressRoute Virtual Network Gateway and recreate it as PolicyBased',
      'Enable Floating IP on the NVA network interface',
      'Add a Service Endpoint for Microsoft.Web on AppSubnet',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'More-specific /24 BGP prefixes advertised from on-premises beat your /0 UDR via Longest Prefix Match unless you stop gateway routes from being injected into that route table!',
    explanation:
      'Because ExpressRoute advertises specific on-premises prefixes like `192.168.10.0/24` via BGP, Longest Prefix Match chooses the `/24` BGP route (`VirtualNetworkGateway`) over your `0.0.0.0/0` UDR (`VirtualAppliance`). Disabling **Propagate gateway routes** (`disableBgpRoutePropagation: true`) on `AppSubnet`\'s Route Table prevents BGP/VPN routes from being injected, forcing all traffic (including `192.168.10.0/24`) to match the `0.0.0.0/0` NVA route (just ensure the NVA\'s own subnet keeps BGP propagation enabled!).',
    awsComparison:
      'Equivalent to turning OFF **Route Propagation** from a Virtual Private Gateway (VGW) on an AWS VPC Route Table so propagated DX/VPN `/24` routes don\'t bypass a `0.0.0.0/0` firewall route.',
  },
  {
    id: 'az104-a4-022',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Route Table Association Rules',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Evaluate the following statements regarding Azure Route Tables (User-Defined Routes):',
    statements: [
      {
        statement:
          'An Azure Route Table can be associated directly with an individual virtual machine Network Interface (NIC).',
        answer: false,
      },
      {
        statement:
          'A single Route Table can be associated with multiple subnets across virtual networks in the same Azure subscription and region.',
        answer: true,
      },
      {
        statement:
          'A single subnet can have two different Route Tables associated with it at the same time.',
        answer: false,
      },
    ],
    awsBridgeHint:
      'Unlike security groups (which can bind to both subnets and NICs in Azure), route tables strictly bind at the subnet layer on a 0-or-1 per-subnet basis.',
    explanation:
      'Azure Route Tables can ONLY be associated with **subnets**—never with individual NICs. Each subnet can have **zero or one** Route Table associated with it at any time, whereas a single Route Table resource can be shared across multiple subnets within the same subscription and region.',
    awsComparison:
      'Very close to AWS VPC Route Tables (0/1 explicit association per subnet, reusable across subnets in the same VPC)—except in Azure, one Route Table can even be shared across subnets in *different* VNets in the same region/subscription!',
  },
  {
    id: 'az104-a4-023',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'End-to-End NVA Traffic Inspection',
    difficulty: 3,
    format: 'sequence',
    prompt:
      'You need to force all traffic between `FrontendSubnet` (`10.0.1.0/24`) and `BackendSubnet` (`10.0.2.0/24`) inside the same VNet to pass symmetrically through a firewall NVA VM deployed in `PerimeterSubnet` (`10.0.254.4`). Arrange the implementation steps in the correct logical sequence:',
    correctSequence: [
      'Enable IP forwarding on both the NVA\'s Azure Network Interface and inside the NVA guest OS',
      'Create a Frontend Route Table with a UDR for 10.0.2.0/24 -> VirtualAppliance (10.0.254.4) and associate it with FrontendSubnet',
      'Create a Backend Route Table with a UDR for 10.0.1.0/24 -> VirtualAppliance (10.0.254.4) and associate it with BackendSubnet',
      'Verify symmetric NVA traversal from both tiers using Azure Network Watcher Next Hop',
    ],
    awsBridgeHint:
      'First prepare the appliance NIC/OS to accept transit packets, then override the built-in intra-VNet route in BOTH directions to avoid asymmetric stateful firewall drops!',
    explanation:
      'Because VMs in `FrontendSubnet` and `BackendSubnet` share the built-in `10.0.0.0/16 -> VNetLocal` system route, overriding only `FrontendSubnet` would cause return packets from `BackendSubnet` to go directly back to `FrontendSubnet` (asymmetric routing, causing stateful firewalls to drop the TCP handshake!). Enabling NIC + OS IP forwarding and attaching symmetrical `/24` UDRs on both subnets ensures clean bidirectional inspection.',
    awsComparison:
      'Classic stateful firewall symmetric routing discipline—identical to AWS Gateway Load Balancer / Transit Gateway Appliance Mode or VPC Ingress/More-Specific Intra-VPC routing!',
  },
  {
    id: 'az104-a4-024',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Stateful NSG Behavior',
    difficulty: 1,
    format: 'single',
    prompt:
      'A Network Security Group (NSG) attached to `WebSubnet` has a custom Inbound rule at Priority `100` allowing TCP port `443` from `Internet`. An administrator adds a custom Outbound rule at Priority `4000` denying ALL outbound traffic (`*`) to `Internet`. When external clients browse to `https://portal.contoso.com` hosted in `WebSubnet`, what happens?',
    options: [
      'Inbound TCP SYN arrives, but the server\'s SYN-ACK response is dropped by the Priority 4000 outbound deny rule',
      'Connections fail unless an explicit outbound allow rule for ephemeral ports 49152-65535 is added at Priority 100',
      'Connections work only for clients inside the same Azure region',
      'External HTTPS clients connect and receive responses normally, while outbound connections initiated by the web servers to the internet are blocked',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Determine whether Azure NSGs behave like stateless NACLs or stateful Security Groups!',
    explanation:
      'Azure Network Security Groups (NSGs) are **stateful** 5-tuple firewalls! Return packets belonging to an already-permitted inbound session are automatically allowed out regardless of outbound deny rules. The Priority `4000` outbound deny rule ONLY blocks new outbound connections *initiated* from inside `WebSubnet` toward `Internet`.',
    awsComparison:
      'Crucial AWS SAA distinction! Even though Azure NSGs attach to subnets AND have numbered Allow/Deny rules (which *looks* superficially like an AWS stateless Network ACL), Azure NSGs are **100% stateful** like AWS Security Groups! Azure has no stateless NACL equivalent.',
  },
  {
    id: 'az104-a4-025',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Dual NSG Inbound Evaluation',
    difficulty: 2,
    format: 'single',
    prompt:
      '`VM1` resides in `WebSubnet`. `NSG-Subnet` (associated with `WebSubnet`) has custom inbound allow rules for TCP `80`, `443`, and `22` from `Internet`. `NSG-NIC` (associated directly with `VM1`\'s network interface) has only a custom inbound allow rule for TCP `443` from `Internet` plus default rules. Which ports from the public internet can successfully reach `VM1`?',
    options: [
      'TCP 80, 443, and 22, because Subnet NSG rules override NIC NSG rules',
      'None, because attaching NSGs at both Subnet and NIC levels causes an explicit conflict block',
      'TCP 443 only, because inbound traffic must be permitted by NSG-Subnet first and then by NSG-NIC',
      'TCP 80 and 22 only',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'When two security boundaries wrap a workload (subnet perimeter + NIC perimeter), traffic must pass BOTH gates independently—it is a logical AND, not a union!',
    explanation:
      'For **inbound** traffic when both a Subnet NSG and a NIC NSG exist, Azure evaluates the **Subnet NSG first**, and if allowed, evaluates the **NIC NSG second**. Both NSGs must independently allow the flow! Here, TCP `80` and `22` pass `NSG-Subnet` but hit `DenyAllInBound` (`65500`) on `NSG-NIC`. Only TCP `443` is allowed by both.',
    awsComparison:
      'Be careful! In AWS, attaching two Security Groups to one ENI creates a *permissive union* (OR logic—if SG1 allows 80 and SG2 allows 443, both work). In Azure, stacking a Subnet NSG + NIC NSG creates a *restrictive intersection* (AND logic—both gates must allow!).',
  },
  {
    id: 'az104-a4-026',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Dual NSG Outbound Evaluation',
    difficulty: 2,
    format: 'single',
    prompt:
      '`VM-App` has `NSG-NIC` attached to its network interface and `NSG-Subnet` attached to its subnet. When `VM-App` initiates a new outbound HTTPS request to an external webhook on the internet, in what order are security rules evaluated?',
    options: [
      'NSG-Subnet is evaluated first; if allowed, NSG-NIC is evaluated second',
      'NSG-NIC is evaluated first; if allowed, NSG-Subnet is evaluated second',
      'Only NSG-NIC is evaluated for outbound traffic when both are present',
      'Both NSGs are merged into a single priority list sorted from 100 to 4096',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Follow the physical path of the packet leaving the virtual machine: it exits the VM\'s network card before crossing the subnet boundary!',
    explanation:
      'Azure evaluates NSGs in the exact order a packet traverses them: **Inbound** = `Subnet NSG -> NIC NSG`; **Outbound** = `NIC NSG -> Subnet NSG`. If `NSG-NIC` denies the outbound packet, processing stops immediately and `NSG-Subnet` never sees it. To reduce management complexity, Microsoft recommends applying NSGs primarily at the subnet level unless per-VM exceptions require NIC NSGs.',
    awsComparison:
      'Just like a packet leaving an AWS EC2 ENI checks the ENI\'s Security Group outbound rules first and then the Subnet NACL outbound rules second (except in Azure, both layers are stateful NSGs).',
  },
  {
    id: 'az104-a4-027',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'NSG Default Rules & Service Tags',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'You create a brand-new Network Security Group with zero custom rules and associate it with `AppSubnet` behind a Standard Public Load Balancer. Evaluate the behavior of Azure\'s built-in default NSG rules (`65000`, `65001`, `65500`):',
    statements: [
      {
        statement:
          'Default rule 65001 (AllowAzureLoadBalancerInBound) automatically permits external internet user traffic forwarded through the Public Load Balancer on TCP port 443 without needing a custom inbound rule.',
        answer: false,
      },
      {
        statement:
          'Default rule 65000 (AllowVNetInBound) permits inbound traffic not only from the local VNet, but also from peered VNets and on-premises networks connected via VPN Gateway or ExpressRoute.',
        answer: true,
      },
      {
        statement:
          'You can delete default rule 65001 (AllowInternetOutBound) directly to block internet egress.',
        answer: false,
      },
    ],
    awsBridgeHint:
      'Watch out for two top AZ-104 traps: `AzureLoadBalancer` only means the infrastructure health-probe IP (`168.63.129.16`), and `VirtualNetwork` is much broader than just a single VNet!',
    explanation:
      '1. **False**: `AllowAzureLoadBalancerInBound` (`65001`) uses the `AzureLoadBalancer` service tag, which ONLY covers health probes originating from the Azure host wire server (`168.63.129.16`). Because Public LB preserves the client\'s real public source IP, external client traffic hits `DenyAllInBound` (`65500`) unless you add a custom Allow rule for TCP 443! 2. **True**: The `VirtualNetwork` service tag includes the local VNet, peered VNets, and VPN/ExpressRoute connected CIDRs. 3. **False**: Default rules (`65000+`) can never be deleted, only overridden with rules at priority `100`–`4096`.',
    awsComparison:
      'Massive AWS NLB -> Azure Standard LB gotcha! Just like AWS NLB preserves client IP (so target SGs need `0.0.0.0/0:443`, not just the NLB subnet), Azure Standard LB preserves client IP so `AllowAzureLoadBalancerInBound` does NOT open your app port to clients!',
  },
  {
    id: 'az104-a4-028',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Regional Service Tags',
    difficulty: 2,
    format: 'single',
    prompt:
      'Security auditors require that VMs in `BatchSubnet` must be blocked from all outbound internet access EXCEPT HTTPS connections to Azure Blob/Queue/Table Storage endpoints specifically in the `East US` region, without manually maintaining Microsoft public IP ranges. Which outbound NSG rule pair satisfies this requirement?',
    options: [
      'Priority 200: Allow TCP 443 to Service Tag Storage.EastUS; Priority 300: Deny Any (*) to Service Tag Internet',
      'Priority 200: Deny Any (*) to Service Tag Internet; Priority 300: Allow TCP 443 to Service Tag Storage.EastUS',
      'Priority 200: Allow TCP 443 to Application Security Group Storage.EastUS; Priority 300: Delete AllowInternetOutBound',
      'Priority 65100: Deny Any (*) to 0.0.0.0/0',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Microsoft maintains auto-updating regional IP prefix labels called Service Tags, and lower priority numbers execute before broader deny rules.',
    explanation:
      'Service Tags represent Microsoft-managed groups of IP address prefixes that update automatically as Azure IP ranges change, and many tags support regional scoping such as `Storage.EastUS` or `Sql.WestEurope`. Placing `Allow` TCP 443 to `Storage.EastUS` at Priority `200` and `Deny` `*` to `Internet` at Priority `300` permits regional Azure Storage traffic while overriding the `65001 AllowInternetOutBound` default rule.',
    awsComparison:
      'Azure **Service Tags** (`Storage.EastUS`, `AzureMonitor`, `Sql`) are the direct counterpart to **AWS Managed Prefix Lists** (`com.amazonaws.us-east-1.s3`, `com.amazonaws.us-east-1.dynamodb`) used inside Security Groups!',
  },
  {
    id: 'az104-a4-029',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Application Security Groups (ASGs)',
    difficulty: 2,
    format: 'single',
    prompt:
      'You want to replace brittle IP-based NSG rules with logical workload tiers (`ASG-Web`, `ASG-Api`, `ASG-Sql`). You successfully assign NICs in `VNet-Prod` (`East US`) to `ASG-Web` and `ASG-Api`, then attempt to assign database VM NICs located in peered `VNet-Data` (`East US`) to `ASG-Sql` and reference both `ASG-Api` and `ASG-Sql` in a single NSG rule. Why does this fail?',
    options: [
      'All network interfaces assigned to Application Security Groups referenced together must belong to the same Virtual Network',
      'A virtual machine network interface can belong to an ASG only if it uses a Static Public IP',
      'Application Security Groups cannot be used inside Subnet-level NSGs',
      'An NSG rule can reference an ASG as Source or Destination, never both in the same rule',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Think of referencing one Security Group ID inside another Security Group rule—in Azure, ASG membership is strictly bounded to a single VNet!',
    explanation:
      'Application Security Groups (ASGs) let you group VM NICs by workload role (e.g., `Web` -> `Api` on TCP 8080) and use ASGs as both Source and Destination in NSG rules. However, Azure enforces a strict VNet boundary: all NICs assigned to an ASG (and all ASGs combined in an NSG rule) **must reside within the same single Virtual Network**—they cannot span across VNet Peerings!',
    awsComparison:
      'Watch out! In AWS, Security Group referencing (`sg-111` allowing `sg-222`) *actually works across same-region VPC Peering*! In Azure, **Application Security Groups (ASGs)** CANNOT span VNet Peering—every NIC must live in the exact same VNet.',
  },
  {
    id: 'az104-a4-030',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'NSG Priority Ordering',
    difficulty: 1,
    format: 'single',
    prompt:
      'An NSG on `MgmtSubnet` contains two custom inbound rules:\n• Rule1 — Priority `150`, Source `Internet`, Destination `*`, Port `3389`, Protocol `TCP`, Action `Deny`\n• Rule2 — Priority `200`, Source `203.0.113.25/32`, Destination `*`, Port `3389`, Protocol `TCP`, Action `Allow`\n\nWhen an administrator connects via RDP from public IP `203.0.113.25`, what occurs?',
    options: [
      'The connection succeeds because /32 is a longer prefix match than Internet',
      'The connection succeeds because Allow rules take precedence over Deny rules',
      'The connection prompts for Just-In-Time VM Access approval automatically',
      'The connection is blocked because Priority 150 matches first and terminates NSG rule evaluation',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Do NOT confuse routing Longest Prefix Match with firewall rule evaluation! NSGs strictly scan top-down by priority integer (100 -> 4096) and stop on first match.',
    explanation:
      'Unlike route tables (which use Longest Prefix Match), NSGs evaluate rules strictly in ascending numerical **Priority** order (`100` is highest priority, `4096` is lowest custom priority) on a **first-match-wins** basis. Since `203.0.113.25` is part of the `Internet` service tag, Rule1 at Priority `150` matches first and drops the packet; Rule2 (`200`) is never reached.',
    awsComparison:
      'Rule evaluation order works like AWS Network ACL numbered rules (lowest rule number wins, first match stops processing—put specific `/32` Allow rules at a *lower* number like `110` BEFORE a broad `150` Deny!).',
  },
  {
    id: 'az104-a4-031',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'VirtualNetwork Service Tag Scope',
    difficulty: 2,
    format: 'multi',
    selectCount: 3,
    prompt:
      'In an Azure Network Security Group rule, which THREE network address ranges are automatically included within the built-in `VirtualNetwork` Service Tag? (Select 3.)',
    options: [
      'All IPv4 and IPv6 address prefixes configured on the local Virtual Network',
      'Address prefixes of directly peered Virtual Networks (regional and global)',
      'Public endpoints of Azure Storage and Azure SQL in the local region',
      'On-premises address spaces connected to the VNet via VPN Gateway or ExpressRoute',
      'Unpeered Virtual Networks that reside in the same Resource Group',
    ],
    correctIndices: [0, 1, 3],
    awsBridgeHint:
      '`VirtualNetwork` means "your entire routed private network domain" (local VNet + peered VNets + gateway-connected on-premises), NOT isolated VNets or public PaaS IPs!',
    explanation:
      'The `VirtualNetwork` service tag dynamically encompasses: (1) the local VNet\'s address space, (2) all directly connected VNet Peering address spaces, (3) on-premises address spaces reachable via Virtual Network Gateways (VPN/ExpressRoute), and (4) Virtual IP addresses of host-level services (`168.63.129.16`) and Service Endpoints if enabled. Unpeered VNets are never included.',
    awsComparison:
      'Big surprise for AWS engineers! In AWS, the default VPC NACL or SG `vpc-cidr` only matches that single VPC\'s CIDR. In Azure, default NSG rule `65000 AllowVNetInBound` automatically trusts peered VNets and VPN/DX networks unless you add explicit Deny rules!',
  },
  {
    id: 'az104-a4-032',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Micro-Segmentation Inside a VNet',
    difficulty: 3,
    format: 'single',
    prompt:
      '`VNet1` (`10.10.0.0/16`) contains `WebSubnet` (`10.10.1.0/24`) and `PciSubnet` (`10.10.2.0/24`). You associate a newly created NSG with `PciSubnet`, leaving all default rules intact and adding only one custom inbound rule: Priority `100` Allow TCP `443` from `10.10.1.0/24`. During a penetration test, `WebSubnet` VMs can still connect to `PciSubnet` VMs over SSH (`22`) and RDP (`3389`)! Why, and how do you fix it?',
    options: [
      'Subnet NSGs do not filter intra-VNet traffic between subnets; move the VMs into separate subscriptions',
      'Default rule 65001 AllowAzureLoadBalancerInBound allows intra-VNet SSH; disable the Load Balancer',
      'Default rule 65000 AllowVNetInBound allows all ports across the VNet; add a custom Inbound Deny rule (e.g., Priority 4000 Deny * from VirtualNetwork) below your explicit Allow rules',
      'Add a Route Table with Next Hop None for 10.10.2.0/24 on PciSubnet',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Look at rule `65000` sitting at the bottom of every brand-new NSG—unlike an AWS Security Group that denies intra-VPC inbound traffic unless listed, Azure NSGs allow all intra-VNet inbound traffic by default!',
    explanation:
      'Every Azure NSG includes `65000 AllowVNetInBound` (`Source: VirtualNetwork -> Destination: VirtualNetwork, Port: *, Action: Allow`), AND Subnet NSGs DO filter inter-subnet AND even intra-subnet VM-to-VM traffic! Because only Priority `100` Allow `443` was added, ports `22` and `3389` fell through to rule `65000` and were permitted! Adding a custom `Deny` rule at Priority `4000` for `VirtualNetwork` (or `*`) enforces strict zero-trust micro-segmentation.',
    awsComparison:
      'CRITICAL AWS SAA -> Azure Security trap! A fresh AWS Security Group has ZERO inbound allow rules (implicit deny-all, even from the same VPC). A fresh Azure NSG has `65000 AllowVNetInBound` wide open to the entire VNet, peered VNets, and VPN!',
  },
  {
    id: 'az104-a4-033',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Azure Bastion Architecture',
    difficulty: 1,
    format: 'single',
    prompt:
      'Your organization wants administrators to connect via RDP and SSH to private Windows and Linux VMs directly from the Azure Portal browser without assigning Public IPs to any VM or opening ports `3389`/`22` to the internet. Over which protocol and port do administrators\' browsers connect to the Azure Bastion service?',
    options: [
      'SSH/RDP encapsulated over UDP port 4500',
      'HTTPS / TLS over TCP port 443',
      'SSTP over TCP port 8443',
      'WireGuard over UDP port 51820',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'This managed HTML5 jumpbox streams remote desktop/shell pixels directly inside the cloud web console over standard encrypted web port 443.',
    explanation:
      'Azure Bastion is a fully managed PaaS service deployed in `AzureBastionSubnet` (with a Standard SKU Static Public IP). Administrators authenticate in the Azure Portal and connect to Azure Bastion over **TLS on TCP port 443** (HTML5 client); Bastion then initiates private RDP (`3389`) or SSH (`22`) sessions over the VNet backbone (including peered VNets!) to the target VMs\' private IPs.',
    awsComparison:
      'Closest AWS equivalents are **EC2 Instance Connect Endpoint (EICE)** (private SSH/RDP tunneling via CLI without public IPs) and **AWS Systems Manager Fleet Manager / Session Manager** (agent-based browser shell/RDP over HTTPS 443—note Azure Bastion needs ZERO agent on the target VM!).',
  },
  {
    id: 'az104-a4-034',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'AzureBastionSubnet Custom NSG Rules',
    difficulty: 3,
    format: 'multi',
    selectCount: 2,
    prompt:
      'Your security policy requires attaching a hardened Network Security Group to every subnet, including `AzureBastionSubnet`. When you try to associate a locked-down NSG with `AzureBastionSubnet`, Azure rejects the association unless specific mandatory rules exist. Which TWO inbound allow rules MUST be present on an NSG attached to `AzureBastionSubnet`? (Select 2.)',
    options: [
      'Inbound TCP port 3389 and 22 from Service Tag Internet',
      'Inbound TCP port 443 from Service Tag Internet',
      'Inbound UDP port 500 from Service Tag VirtualNetwork',
      'Inbound TCP port 443 from Service Tag GatewayManager',
      'Inbound TCP port 80 from Service Tag AzureTrafficManager',
    ],
    correctIndices: [1, 3],
    awsBridgeHint:
      'Users connect to Bastion over HTTPS 443 from the internet, AND Azure\'s control-plane management fabric (`GatewayManager`) also validates TCP 443 inbound before allowing the NSG attachment!',
    explanation:
      'Unlike `GatewaySubnet` (which prohibits NSGs), `AzureBastionSubnet` DOES support an NSG, and Azure validates every required rule at save/associate time! Inbound rules MUST allow: TCP `443` from `Internet` (user sessions), TCP `443` from `GatewayManager` (Azure control plane management), TCP `443` from `AzureLoadBalancer` (health probes), and TCP `8080`/`5701` from `VirtualNetwork` (Bastion host data-plane communication). Outbound MUST allow TCP `22`/`3389` to `VirtualNetwork` and TCP `443` to `AzureCloud`.',
    awsComparison:
      'Classic AZ-104 lab & exam favorite—unlike AWS EICE where a regular Security Group just needs outbound 22/3389 to the VPC CIDR, Azure ARM actively blocks associating an NSG to `AzureBastionSubnet` if `GatewayManager:443` or any required Bastion rule is missing.',
  },
  {
    id: 'az104-a4-035',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Azure Bastion SKUs & Peering',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'You currently run an Azure Bastion host deployed with the `Basic` SKU in `VNet-Hub`, which is peered with `VNet-Spoke1`. Evaluate the following statements:',
    statements: [
      {
        statement:
          'A single Azure Bastion host in VNet-Hub can connect to private VMs in directly peered VNet-Spoke1 without deploying a second Bastion host in VNet-Spoke1.',
        answer: true,
      },
      {
        statement:
          'Target virtual machines must have a Basic or Standard Public IP attached before Azure Bastion can establish an RDP session.',
        answer: false,
      },
      {
        statement:
          'Upgrading the Bastion host from Basic SKU to Standard SKU is required to enable native RDP/SSH client support (`az network bastion ssh/rdp`) and file upload/download.',
        answer: true,
      },
    ],
    awsBridgeHint:
      'Hub Bastion works across VNet Peering, target VMs only need private IPs, and advanced features (native local clients, file transfer, host scaling, IP-based connect) live in Standard/Premium SKUs.',
    explanation:
      '1. **True**: Azure Bastion supports VNet Peering natively—one Bastion in `VNet-Hub` serves VMs across all directly peered spoke VNets! 2. **False**: Target VMs only need a private IP and NSG inbound `22`/`3389` allowed from `AzureBastionSubnet`. 3. **True**: `Basic` SKU supports fixed 2 instances and browser-only sessions without file transfer; upgrading to `Standard` SKU unlocks host scaling (`2`–`50`), file upload/download, native CLI/mstsc tunneling, custom ports, and IP-based connections.',
    awsComparison:
      'Very cost-effective hub pattern: just as one centralized Bastion/SSM setup in a Shared Services VPC can reach peered VPCs, a single Hub Azure Bastion covers all peered Spoke VNets.',
  },
  {
    id: 'az104-a4-036',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Service Endpoints vs Private Endpoints',
    difficulty: 2,
    format: 'single',
    prompt:
      'On-premises application servers connect to `VNet-Hub` over an ExpressRoute Private Peering circuit. They must upload sensitive files directly to an Azure Storage Account (`stcorpvault01` blob service) over private RFC 1918 IP routing, and public network access on `stcorpvault01` must be completely disabled. Which feature must you configure?',
    options: [
      'Enable a Virtual Network Service Endpoint (`Microsoft.Storage`) on GatewaySubnet',
      'Create an NSG outbound rule using the `Storage` Service Tag',
      'Deploy an Azure Private Endpoint for the `blob` subresource in VNet-Hub with Private DNS integration',
      'Configure an Azure NAT Gateway on VNet-Hub',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Compare Gateway Endpoints (VPC-only, public destination IPs in route table) against Interface Endpoints / PrivateLink (private ENI IP inside your subnet reachable over VPN and Direct Connect)!',
    explanation:
      '**VNet Service Endpoints** continue using the PaaS service\'s public endpoint IP and **cannot** be used directly by on-premises servers over VPN or ExpressRoute. **Azure Private Endpoints** (powered by Azure Private Link) inject a private NIC with a private IP from your VNet subnet mapped to the specific subresource (`blob`), allowing completely private connectivity across local VNets, peered VNets, VPN Gateways, and ExpressRoute—even with `Public network access = Disabled` on the storage account!',
    awsComparison:
      'Exact 1-to-1 architectural match! **VNet Service Endpoints** ≈ **AWS VPC Gateway Endpoints** (free, VPC-local only, cannot be reached directly from on-prem DX/VPN). **Azure Private Endpoints (Private Link)** ≈ **AWS VPC Interface Endpoints (AWS PrivateLink)** (private IP ENI in subnet, reachable over VPN/DX/Peering, paid hourly + per GB).',
  },
  {
    id: 'az104-a4-037',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Private Endpoint & Private DNS Workflow',
    difficulty: 3,
    format: 'sequence',
    prompt:
      'You need to lock down an existing Azure Key Vault (`kv-prod-01.vault.azure.net`) so that VMs across `VNet-Hub` and `VNet-Spoke` resolve its standard FQDN to a private IP address and all public internet access to the vault is blocked. Arrange the configuration steps in the proper end-to-end sequence:',
    correctSequence: [
      'Create a Private Endpoint in VNet-Hub targeting kv-prod-01\'s vault subresource',
      'Provision the Azure Private DNS Zone named privatelink.vaultcore.azure.net and register the Private Endpoint\'s DNS Zone Group',
      'Create Virtual Network Links associating privatelink.vaultcore.azure.net with both VNet-Hub and VNet-Spoke',
      'Disable Public Network Access on the Key Vault networking firewall and verify private FQDN resolution via nslookup',
    ],
    awsBridgeHint:
      'Without linking the `privatelink.*` Private DNS Zone to EVERY VNet that queries the vault, spoke VMs will still follow the public CNAME to the blocked public IP!',
    explanation:
      'When Private Link is enabled on Key Vault, public DNS updates `kv-prod-01.vault.azure.net` with a `CNAME` pointing to `kv-prod-01.privatelink.vaultcore.azure.net`. Inside VNets linked to the `privatelink.vaultcore.azure.net` Private DNS Zone, Azure DNS resolves that CNAME to the Private Endpoint\'s private IP (`10.x.x.x`), allowing apps to keep using the standard `kv-prod-01.vault.azure.net` URI unchanged!',
    awsComparison:
      'Similar to enabling **Private DNS Name** on an AWS Interface VPC Endpoint (which manages a hidden Route 53 Private Hosted Zone)—except in Azure you explicitly manage and VNet-link the `privatelink.<service>` Private DNS Zone across hub and spokes!',
  },
  {
    id: 'az104-a4-038',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Service Endpoints vs Private Endpoints Matrix',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Compare the technical mechanics of VNet Service Endpoints and Azure Private Endpoints:',
    statements: [
      {
        statement:
          'Enabling a VNet Service Endpoint allocates a private IPv4 address from your subnet to the target Azure SQL Server.',
        answer: false,
      },
      {
        statement:
          'Creating a Private Endpoint creates a read-only Network Interface (NIC) in your chosen subnet that maps to ONE specific PaaS instance and subresource (for example, `blob` vs `file`).',
        answer: true,
      },
      {
        statement:
          'Enabling a VNet Service Endpoint injects a more-specific system route (`VirtualNetworkServiceEndpoint`) that overrides `0.0.0.0/0` User-Defined Routes for that Azure service\'s prefixes.',
        answer: true,
      },
    ],
    awsBridgeHint:
      'Service Endpoints alter your subnet route table toward the service\'s public IPs over the Azure backbone; Private Endpoints place an actual NIC inside your subnet per subresource!',
    explanation:
      '1. **False**: Service Endpoints keep using the PaaS resource\'s public IP as the destination (only switching the source IP seen by the PaaS firewall to your VNet private IP). 2. **True**: A Private Endpoint creates a dedicated NIC per target subresource (`blob`, `table`, `file`, `queue` each require their own Private Endpoint!). 3. **True**: Enabling a Service Endpoint adds a `VirtualNetworkServiceEndpoint` route with specific service `/prefix` CIDRs that beat a `0.0.0.0/0` NVA route via Longest Prefix Match!',
    awsComparison:
      'Notice Statement 3—identical to how an AWS S3 Gateway Endpoint injects a `pl-xxxxxx` prefix-list route into your VPC Route Table that beats `0.0.0.0/0 -> nat-gateway` via Longest Prefix Match!',
  },
  {
    id: 'az104-a4-039',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Standard Public IP Secure-by-Default',
    difficulty: 2,
    format: 'single',
    prompt:
      'You deploy a test Linux VM (`VM-Diag`) in a lab subnet that has NO Network Security Group attached to either the subnet or the VM NIC. You attach a newly created **Standard SKU** Public IP address to `VM-Diag`\'s NIC, confirm `sshd` is listening on port 22, and try to SSH from home—but every connection times out. Why?',
    options: [
      'Standard SKU Public IPs can only be attached to Load Balancers, never directly to VM NICs',
      'Standard SKU Public IPs are secure-by-default and block ALL inbound internet traffic unless an NSG is attached and explicitly allows the port',
      'Standard SKU Public IPs use Dynamic allocation and have not bound an IP address yet',
      'SSH over a Standard SKU Public IP requires Azure Bastion to be deployed first',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Unlike legacy Basic Public IPs (which were wide open if you forgot an NSG), Standard SKU Public IPs operate under a zero-trust closed posture without an NSG!',
    explanation:
      '**Standard SKU Public IPs** (now the universal Azure standard; Basic SKU is retired) are always **Static**, support Availability Zones, and are **closed to inbound traffic by default**! If neither the Subnet nor the VM NIC has an NSG with an explicit Inbound Allow rule, Azure drops 100% of inbound internet packets to a Standard Public IP.',
    awsComparison:
      'In AWS, every EC2 ENI *must* have at least one Security Group attached (you literally cannot have an ENI with zero SGs). Because Azure *allows* a subnet and NIC to have zero NSGs attached, Microsoft made Standard Public IPs fail-closed whenever an NSG is absent!',
  },
  {
    id: 'az104-a4-040',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Azure NAT Gateway & SNAT Exhaustion',
    difficulty: 2,
    format: 'single',
    prompt:
      'A Virtual Machine Scale Set in `BackendSubnet` makes thousands of concurrent short-lived HTTPS calls per second to an external payment gateway API. During peak hours, connections fail intermittently with **SNAT port exhaustion** alerts. Which Azure service is purpose-built to solve outbound SNAT port exhaustion with dynamic port pooling and predictable static egress IPs?',
    options: [
      'Azure NAT Gateway associated with BackendSubnet',
      'Azure Bastion Standard SKU',
      'Azure Private Link Service',
      'Application Security Group with ephemeral port augmentation',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Same exact name and purpose as the managed outbound NAT service you deploy for private subnets in AWS—except in Azure it attaches directly as a property of the subnet without even needing a UDR!',
    explanation:
      '**Azure NAT Gateway** provides fully managed, highly resilient outbound-only connectivity for subnets. Unlike Load Balancer SNAT (which pre-allocates rigid blocks of SNAT ports per backend VM, wasting idle ports), NAT Gateway dynamically pools all **64,512 ephemeral SNAT ports** per Public IP across all VMs in the subnet on demand, scaling up to **16 Public IPs** (or a `/28` Public IP Prefix) for over 1 million concurrent SNAT ports!',
    awsComparison:
      'Compare **Azure NAT Gateway** vs **AWS NAT Gateway**: in AWS, you deploy NAT Gateway inside a *public* subnet and point a *private* subnet\'s Route Table `0.0.0.0/0 -> nat-xxx`. In Azure, NAT Gateway is a standalone PaaS resource attached **directly to the private subnet**—no public subnet and no `0.0.0.0/0` UDR required!',
  },
  {
    id: 'az104-a4-041',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Outbound Connectivity Precedence',
    difficulty: 3,
    format: 'single',
    prompt:
      '`VM-Web01` sits in `WebSubnet`. All three of the following are configured simultaneously:\n1. `VM-Web01` has an instance-level Standard Public IP (`20.10.1.10`) directly on its NIC.\n2. `VM-Web01` is in the backend pool of a Standard Public Load Balancer (`20.10.1.20`) with an Outbound Rule.\n3. `WebSubnet` is associated with an Azure NAT Gateway (`20.10.1.30`).\n\nWhen `VM-Web01` initiates a new outbound HTTPS connection to `api.github.com`, which source public IP address will `api.github.com` see?',
    options: [
      '20.10.1.10 (Instance-level Public IP)',
      '20.10.1.20 (Standard Public Load Balancer)',
      'Connections alternate round-robin across all three public IPs',
      '20.10.1.30 (Azure NAT Gateway)',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Subnet-level managed outbound NAT overrides both instance-level public IPs and load balancer SNAT for egress-initiated connections, while inbound requests to the VM IP or LB still return symmetrically!',
    explanation:
      'Azure\'s outbound connectivity precedence hierarchy from highest to lowest priority is: **1. Explicit UDR to Firewall/NVA** -> **2. Azure NAT Gateway (`20.10.1.30`)** -> **3. Instance-level Public IP (`20.10.1.10`)** -> **4. Load Balancer Outbound Rules (`20.10.1.20`)**. When NAT Gateway is attached to a subnet, it automatically takes over all outbound-initiated internet flows (while inbound flows arriving via the Public LB or VM Public IP still return symmetrically on the IP they entered!).',
    awsComparison:
      'Huge difference from AWS! In AWS, if an EC2 instance has a Public IP in a subnet whose route table points `0.0.0.0/0 -> nat-gateway`, inbound internet access to that EC2\'s Public IP breaks due to asymmetric routing! Azure SDN tracks flow symmetry cleanly.',
  },
  {
    id: 'az104-a4-042',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Azure NAT Gateway Requirements',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'Which TWO statements accurately describe technical requirements and limits of an Azure NAT Gateway? (Select 2.)',
    options: [
      'It requires Standard SKU Public IP addresses or Standard SKU Public IP Prefixes',
      'It can be associated directly with GatewaySubnet to accelerate VPN IPsec tunnels',
      'Each assigned Public IP address provides 64,512 outbound SNAT ports shared dynamically across associated subnets',
      'It supports inbound DNAT port-forwarding rules to route external traffic to private VMs',
      'A single NAT Gateway can simultaneously attach to subnets across two different Virtual Networks',
    ],
    correctIndices: [0, 2],
    awsBridgeHint:
      'NAT Gateway is strictly outbound-only SNAT within one VNet, never attaches to `GatewaySubnet`, and requires Standard SKU IPs/prefixes.',
    explanation:
      'Azure NAT Gateway is strictly an **outbound-only** service (zero inbound DNAT capability), requires **Standard SKU** Public IPs or Public IP Prefixes (up to 16 total IPs), provides **64,512 SNAT ports per IP**, can be associated with multiple subnets *within the same VNet* (never across multiple VNets), and **cannot** be attached to `GatewaySubnet`.',
    awsComparison:
      'Just like AWS NAT Gateway (outbound-only SNAT, scales up to secondary Elastic IPs for extra SNAT ports beyond 55,000 per IP, never performs inbound port forwarding).',
  },
  {
    id: 'az104-a4-043',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Global vs Regional Load Balancing',
    difficulty: 1,
    format: 'single',
    prompt:
      'You are deploying a mission-critical public SaaS web application active-active across `East US`, `West Europe`, and `Southeast Asia`. You need a single global entry point providing Layer 7 HTTP/HTTPS routing, Anycast edge acceleration, TLS/SSL termination at the edge, global Web Application Firewall (WAF), and integrated CDN caching. Which Azure service should you select?',
    options: [
      'Azure Standard Public Load Balancer',
      'Azure Application Gateway v2',
      'Azure Front Door',
      'Azure Traffic Manager',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Think of combining CloudFront + Global Accelerator + AWS WAF + global multi-region ALB origin failover into one unified Microsoft global edge proxy!',
    explanation:
      '**Azure Front Door** is Microsoft\'s **global Layer 7** (HTTP/HTTPS) load balancer and modern cloud CDN operating across global edge PoPs via **Anycast** TCP split-connection acceleration. By contrast, **Application Gateway** is strictly *regional* Layer 7, **Load Balancer** is Layer 4 TCP/UDP, and **Traffic Manager** is DNS-only global routing (no TLS offload, WAF, or caching).',
    awsComparison:
      '**Azure Front Door** ≈ **Amazon CloudFront + AWS WAF** (with built-in multi-region active/passive & latency origin routing). **Traffic Manager** ≈ **Route 53 Routing Policies**. **Application Gateway** ≈ **AWS ALB**. **Azure Load Balancer** ≈ **AWS NLB**.',
  },
  {
    id: 'az104-a4-044',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Application Gateway Layer 7 Routing',
    difficulty: 2,
    format: 'single',
    prompt:
      'Within a single Azure region (`Central US`), your e-commerce site `https://shop.contoso.com` must route requests for `/catalog/*` to a Linux container pool, `/checkout/*` to a Windows VM scale set, terminate TLS certificates centrally, and keep returning shoppers pinned to the same checkout instance via browser cookies. Which service meets all requirements with minimal complexity?',
    options: [
      'Azure Standard Public Load Balancer with Client IP affinity',
      'Azure Application Gateway with URL path-based routing and cookie-based affinity',
      'Azure Traffic Manager with Geographic routing',
      'Azure Internal Load Balancer with HA Ports enabled',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'URL path inspection (`/catalog/*` vs `/checkout/*`), TLS offload, and HTTP cookie stickiness are classic single-region Layer 7 reverse-proxy features.',
    explanation:
      '**Azure Application Gateway** operates at **OSI Layer 7** (HTTP/HTTPS), supporting **URL path-based routing** (`Path-based` rules mapping URL prefixes to distinct backend pools), **Multi-site listeners** (host-header routing), **SSL/TLS termination** (or end-to-end TLS), and **Cookie-based session affinity** (`ApplicationGatewayAffinity` managed cookie).',
    awsComparison:
      'Direct equivalent of **AWS Application Load Balancer (ALB)** listener path-based target group rules + ALB duration/application-cookie stickiness!',
  },
  {
    id: 'az104-a4-045',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Load Balancer SKU Mixing Rules',
    difficulty: 2,
    format: 'single',
    prompt:
      'You provision a new **Standard SKU** Public Load Balancer (`LB-Web-Std`) and attempt to add three existing web VMs to its Backend Pool. `VM1` and `VM2` succeed, but `VM3` is grayed out / rejected during backend pool assignment. Upon inspecting `VM3`, you notice it lives in the same VNet and has an older **Basic SKU** Public IP attached to its NIC. How do you resolve this?',
    options: [
      'Enable IP forwarding on VM3\'s network interface',
      'Move VM3 into a separate Availability Set',
      'Change LB-Web-Std\'s health probe from HTTP to TCP',
      'Disassociate the Basic SKU Public IP from VM3 (or upgrade it to a Standard SKU Public IP) before adding VM3 to the Standard Load Balancer',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Azure enforces a hard SKU isolation wall: Standard Load Balancers and Basic Public IPs can NEVER mix on the same network interface!',
    explanation:
      'Azure strictly prohibits mixing **Basic SKU** and **Standard SKU** networking components. A VM placed behind a **Standard SKU Load Balancer** must either have **no instance-level Public IP** or use a **Standard SKU Public IP**—attaching a Basic SKU Public IP makes the NIC incompatible with a Standard Load Balancer backend pool.',
    awsComparison:
      'Unique to Azure\'s Basic-vs-Standard SKU split (AWS retired Classic Load Balancer EC2-Classic mixing years ago; in Azure AZ-104 exams, Basic vs Standard SKU mismatch is a top troubleshooting scenario).',
  },
  {
    id: 'az104-a4-046',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Load Balancer Floating IP (DSR)',
    difficulty: 3,
    format: 'single',
    prompt:
      'You are configuring a two-node **SQL Server Always On Availability Group** listener behind an Azure Standard Internal Load Balancer (`10.10.5.100` on TCP `1433`). SQL Server requires arriving TCP packets to preserve the Load Balancer\'s frontend virtual IP (`10.10.5.100`) as the packet destination IP ( configured on a loopback adapter inside Windows) rather than translating destination IP to the backend NIC\'s private IP. Which Load Balancing Rule setting MUST you enable?',
    options: [
      'Floating IP (Direct Server Return)',
      'HA Ports',
      'Inbound NAT Rule port mapping',
      'Client IP and protocol session persistence',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Think of NLB "Preserve destination IP" / Direct Server Return (DSR) used for clustered SQL listeners and reusing the same backend port across multiple frontend IPs!',
    explanation:
      'Normally, Azure Load Balancer rewrites the destination IP of incoming packets from the LB Frontend IP to the selected backend VM\'s private IP. Enabling **Floating IP** (Microsoft\'s term for Direct Server Return) leaves the **Frontend IP intact as the destination IP** inside the IP header! This is mandatory for **SQL Server Always On Availability Group listeners**, Windows Server Failover Clustering, and multi-VIP port reuse.',
    awsComparison:
      'Equivalent to **AWS Network Load Balancer (NLB)** registering targets **by Instance ID** (which preserves the NLB\'s IP as destination IP for Direct Server Return / SQL Always On listeners, vs registering by IP which performs DNAT)!',
  },
  {
    id: 'az104-a4-047',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Load Balancer Session Persistence',
    difficulty: 2,
    format: 'single',
    prompt:
      'A legacy stateful TCP application runs behind an Azure Standard Load Balancer. Users report getting logged out whenever their client opens a second TCP connection from a new ephemeral source port and lands on a different backend VM. Because the protocol is raw binary TCP (not HTTP), Application Gateway cookies cannot be used. Which Load Balancer configuration keeps all connections from the same client IP routed to the same healthy backend VM?',
    options: [
      'Enable Floating IP on the load-balancing rule',
      'Switch the health probe protocol from TCP to HTTPS',
      'Change Session persistence (distribution mode) from None (5-tuple) to Client IP (2-tuple) or Client IP and protocol (3-tuple)',
      'Configure an Outbound Rule with 10,000 SNAT ports per instance',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'By default, Layer 4 load balancing hashes a 5-tuple (so a new ephemeral client port can pick a new server); reducing the hash tuple to Source IP + Destination IP pins the client IP!',
    explanation:
      'By default (`Session persistence = None`), Azure Load Balancer uses a **5-tuple hash** (`Source IP, Source Port, Destination IP, Destination Port, Protocol`), distributing separate TCP connections from the same client across different VMs. Setting **Session persistence** to **Client IP (2-tuple: Source IP, Destination IP)** or **Client IP and protocol (3-tuple)** pins successive connections from the same client IP to the same backend instance.',
    awsComparison:
      'Exact match to enabling **Source IP stickiness** on an **AWS Network Load Balancer (NLB)** target group!',
  },
  {
    id: 'az104-a4-048',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Load Balancer Inbound NAT Rules',
    difficulty: 2,
    format: 'single',
    prompt:
      'Three Linux VMs (`VM1`, `VM2`, `VM3`) sit behind a Standard Public Load Balancer (`20.85.10.50`) with no instance-level Public IPs and no Azure Bastion deployed. You need to allow SSH access specifically to `VM1` when connecting to `20.85.10.50:50021` and specifically to `VM2` when connecting to `20.85.10.50:50022`, forwarding both to backend TCP port `22`. Which Load Balancer feature should you configure?',
    options: [
      'Load Balancing Rules with HA Ports',
      'Inbound NAT Rules',
      'Outbound Rules',
      'URL Path-Based Rules',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Rather than load-balancing across a pool, this feature performs deterministic 1-to-1 port forwarding (DNAT) from a high frontend port to a specific VM\'s SSH/RDP port.',
    explanation:
      '**Inbound NAT Rules** on an Azure Public Load Balancer perform deterministic port forwarding (Destination NAT) from a specific frontend port (e.g., TCP `50021`) to a target port (e.g., TCP `22`) on a specific backend VM NIC (or automatic port-range mapping across a Virtual Machine Scale Set!). Remember you must also allow backend port `22` (not `50021`) in the VM\'s NSG!',
    awsComparison:
      'Nice Azure built-in convenience—in AWS NLB, Listener port-forwarding to individual instances requires separate single-instance Target Groups per port; Azure Load Balancer has first-class **Inbound NAT Rules** built right in (and auto-generates port-range mappings for VMSS).',
  },
  {
    id: 'az104-a4-049',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Standard Internal LB HA Ports',
    difficulty: 3,
    format: 'single',
    prompt:
      'You deploy a cluster of two active-active third-party firewall Network Virtual Appliances behind a Standard **Internal** Load Balancer in `VNet-Hub` to inspect all hub-and-spoke traffic across thousands of TCP and UDP ports simultaneously. Instead of creating hundreds of per-port load-balancing rules, which feature balances ALL TCP and UDP flows (`port 0`) in a single rule?',
    options: [
      'Inbound NAT port-range pool',
      'Basic SKU Load Balancer All-Ports mode',
      'Application Gateway multi-site wildcard listener',
      'HA Ports enabled on the Standard Internal Load Balancer rule',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Available exclusively on *Internal* Standard Load Balancers, this single toggle load-balances every TCP and UDP port simultaneously for active-active NVA clusters.',
    explanation:
      '**HA Ports** is a specialized feature available **only on Standard SKU Internal Load Balancers** (never Public LBs or Basic LBs). Turning on `HA Ports` sets frontend/backend port to `0` and protocol to `All`, load-balancing all TCP and UDP traffic simultaneously across healthy NVA firewall instances (often combined with `Floating IP` so NVA firewalls see original destination IPs!).',
    awsComparison:
      'In AWS, load-balancing all ports/protocols transparently across firewall appliances requires **AWS Gateway Load Balancer (GWLB)** using GENEVE encapsulation (`UDP 6081`); Azure also offers Gateway LB, plus this super clean L4 **Standard Internal LB + HA Ports** pattern!',
  },
  {
    id: 'az104-a4-050',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Application Gateway v2 Capabilities',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      'Evaluate the following statements regarding Azure Application Gateway (`Standard_v2` and `WAF_v2` SKUs):',
    statements: [
      {
        statement:
          'A single Application Gateway can host multiple distinct domain names (such as `hr.contoso.com` and `shop.fabrikam.com`) routed to different backend pools using Multi-site listeners.',
        answer: true,
      },
      {
        statement:
          'Cookie-based session affinity works by injecting a gateway-managed HTTP cookie (`ApplicationGatewayAffinity`) so subsequent client requests route to the same backend server.',
        answer: true,
      },
      {
        statement:
          'A single Application Gateway v2 instance can span backend pools across three Azure regions natively as an Anycast global edge service without VNet Peering or public IPs.',
        answer: false,
      },
    ],
    awsBridgeHint:
      'Application Gateway v2 supports host-header multi-site routing and managed affinity cookies, while global Anycast edge acceleration belongs to Azure Front Door.',
    explanation:
      '1. **True**: **Multi-site listeners** inspect the HTTP `Host` header / TLS SNI (`hr.contoso.com` vs `shop.fabrikam.com`)—up to 100+ sites on one Application Gateway! 2. **True**: Cookie-based affinity uses `ApplicationGatewayAffinity` (and `ApplicationGatewayAffinityCORS`) SHA-256 hash cookies. 3. **False**: Application Gateway is a **regional** resource deployed into a regional VNet subnet (global Anycast edge is **Azure Front Door**; though App Gateway backend pools *can* hold FQDNs/public IPs/peered IPs, the gateway itself is strictly regional, never Anycast!).',
    awsComparison:
      'Multi-site listeners = **AWS ALB Host-header listener rules**; `ApplicationGatewayAffinity` = **AWSALB stickiness cookie**.',
  },
  {
    id: 'az104-a4-051',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Load Balancer Health Probes',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'Which TWO statements accurately describe Health Probes on an Azure **Standard SKU** Load Balancer? (Select 2.)',
    options: [
      'ICMP Echo (ping) health probes can be configured to monitor UDP backend pools',
      'Supported health probe protocols are TCP, HTTP, and HTTPS',
      'Health probe packets originate from the client\'s public IPv4 address',
      'Health probe packets originate from the Azure host wire server IP `168.63.129.16` (covered by the `AzureLoadBalancer` Service Tag)',
      'HTTP health probes consider any HTTP status code between 200 and 503 as healthy',
    ],
    correctIndices: [1, 3],
    awsBridgeHint:
      'ICMP ping probes are NOT supported, HTTP/HTTPS probes strictly expect HTTP `200 OK`, and probe traffic comes from Azure\'s magic platform IP `168.63.129.16`!',
    explanation:
      'Standard Load Balancer supports **TCP**, **HTTP**, and **HTTPS** health probes (Basic LB didn\'t support HTTPS; **ICMP is never supported** on either!). HTTP/HTTPS probes strictly require an **HTTP `200 OK`** response to mark an instance healthy. All Load Balancer health probes originate from Azure\'s well-known platform IP **`168.63.129.16`**, which is automatically permitted by default NSG rule `65001 AllowAzureLoadBalancerInBound` unless overridden by a broad custom Deny `*` rule!',
    awsComparison:
      'Watch out! In AWS NLB/ALB, health checks originate from **private IPs inside your Load Balancer\'s subnets**! In Azure, Load Balancer health probes come from the universal Azure platform IP **`168.63.129.16`** (`AzureLoadBalancer` tag)—so if you put `Deny * from *` at Priority `4000` without allowing `AzureLoadBalancer` above it, all backends instantly go unhealthy!',
  },
  {
    id: 'az104-a4-052',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Azure Public DNS Delegation',
    difficulty: 1,
    format: 'single',
    prompt:
      'Your company registered the domain `fabrikamcloud.com` at a third-party domain registrar and wants to manage all public DNS records (`A`, `MX`, `TXT`, `CNAME`) in **Azure Public DNS**. After creating the DNS zone `fabrikamcloud.com` in Azure, how do you complete domain delegation?',
    options: [
      'Copy the four assigned Azure Name Server (NS) records from the Azure DNS zone and update the NS records at the third-party domain registrar',
      'Initiate an ICANN EPP auth-code domain registration transfer into the Azure DNS Zone blade',
      'Create a Virtual Network Link between the Public DNS Zone and your production VNet',
      'Upload a TLS certificate `.pfx` file to verify domain ownership in Azure DNS',
    ],
    correctIndices: [0],
    awsBridgeHint:
      'Important limitation compared to Route 53: Azure DNS is an authoritative DNS hosting service, NOT a domain name registrar!',
    explanation:
      'You **cannot buy or transfer domain registrations** into Azure DNS (App Service Domains is separate/limited). Instead, you keep domain registration at your registrar, create a **Public DNS Zone** in Azure, note the **4 authoritative Azure Name Servers** (`ns1-xx.azure-dns.com`, `.net`, `.org`, `.info`), and update the parent **NS delegation records** at your registrar.',
    awsComparison:
      'Key difference from **Amazon Route 53**! Route 53 acts as *both* an ICANN Domain Registrar AND an authoritative DNS host. **Azure DNS** is *only* authoritative DNS hosting (like Route 53 Hosted Zones without Route 53 Domain Registration).',
  },
  {
    id: 'az104-a4-053',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Azure DNS Alias Records',
    difficulty: 2,
    format: 'single',
    prompt:
      'You host `contoso.com` in an Azure Public DNS Zone and want the bare zone apex (`contoso.com`, `@`) to point dynamically to an **Azure Front Door** endpoint (`contoso-fd.z01.azurefd.net`) or an Azure Public IP resource so DNS updates automatically if the underlying IP changes. Standard DNS RFCs forbid creating a `CNAME` record at the zone apex (`@`). Which Azure DNS feature solves this?',
    options: [
      'Create a PTR record at `@` pointing to the Front Door FQDN',
      'Enable Private DNS Auto-Registration on the Public DNS Zone',
      'Create an Alias record set (`A` / `AAAA` with Alias enabled) referencing the Azure Front Door or Public IP resource',
      'Replace the zone\'s SOA record with the Front Door hostname',
    ],
    correctIndices: [2],
    awsBridgeHint:
      'Same exact name and zone-apex capability as Route 53\'s proprietary extension for pointing naked domains (`contoso.com`) at cloud load balancers/CDNs!',
    explanation:
      'Per RFC 1034, a `CNAME` record cannot coexist with `NS` and `SOA` records at the zone apex (`@`). **Azure DNS Alias record sets** allow `A`, `AAAA`, or `CNAME` records (including `A`/`AAAA` at the zone apex `@`!) to reference an **Azure Public IP**, **Azure Front Door** endpoint, **Traffic Manager** profile, or **Azure CDN** endpoint directly by Azure Resource ID, preventing dangling DNS entries too!',
    awsComparison:
      '100% analogous to **Amazon Route 53 Alias Records** pointing zone apex `example.com` to CloudFront, ALB, NLB, or S3 website endpoints!',
  },
  {
    id: 'az104-a4-054',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Private DNS Zone VNet Link Limits',
    difficulty: 2,
    format: 'single',
    prompt:
      '`VNet-App` (`10.1.0.0/16`) needs internal DNS name resolution for five different Azure Private DNS Zones (`corp.internal`, `dev.internal`, `privatelink.blob.core.windows.net`, `privatelink.vaultcore.azure.net`, and `privatelink.database.windows.net`). You also want VMs deployed in `VNet-App` to automatically register their dynamic host `A` records into Private DNS. What is the maximum number of Private DNS Zones to which `VNet-App` can be linked **with auto-registration enabled**?',
    options: [
      'Unlimited Private DNS Zones with auto-registration enabled',
      'Maximum 1 Private DNS Zone with auto-registration enabled (and up to 1,000 Private DNS Zones linked for resolution with auto-registration disabled)',
      'Maximum 5 Private DNS Zones with auto-registration enabled',
      'Maximum 100 Private DNS Zones with auto-registration enabled per VNet',
    ],
    correctIndices: [1],
    awsBridgeHint:
      'Think logically: when a VM boots in `VNet-App`, it only has ONE primary DNS suffix identity to auto-register into—though it can *resolve* queries across up to 1,000 linked Private DNS Zones!',
    explanation:
      'Know both directions of Azure Private DNS Virtual Network Link quotas cold for AZ-104:\n• A **single VNet** can be linked to **at most 1 Private DNS Zone with auto-registration enabled** (e.g., `corp.internal`), while simultaneously linking to up to **1,000 Private DNS Zones** for name resolution (`auto-registration disabled`, such as all your `privatelink.*` zones!).\n• Conversely, a **single Private DNS Zone** (e.g., `corp.internal`) can accept up to **1,000 total VNet links** for resolution, of which up to **100 VNet links** can have auto-registration enabled.',
    awsComparison:
      'Great enhancement over **AWS Route 53 Private Hosted Zones**! Route 53 PHZs can associate with many VPCs for resolution, but AWS has **no native VM hostname auto-registration** into custom PHZs (you\'d have to build EventBridge + Lambda scripts on EC2 state change, whereas Azure Private DNS does it out of the box!).',
  },
  {
    id: 'az104-a4-055',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Private DNS Auto-Registration Behavior',
    difficulty: 2,
    format: 'yes-no',
    prompt:
      '`VNet-Prod` is linked to the Azure Private DNS Zone `prod.contoso.internal` with **Enable auto-registration** checked. Evaluate which DNS records Azure manages automatically:',
    statements: [
      {
        statement:
          'When you deploy an Azure Internal Standard Load Balancer into VNet-Prod, Azure automatically registers an `A` record for the Load Balancer\'s frontend IP.',
        answer: false,
      },
      {
        statement:
          'When you deploy a multi-NIC virtual machine into VNet-Prod, auto-registration creates a DNS `A` record ONLY for the VM\'s primary Network Interface (NIC).',
        answer: true,
      },
      {
        statement:
          'When an auto-registered virtual machine is deleted from VNet-Prod, Azure automatically removes its auto-registered `A` record from `prod.contoso.internal`.',
        answer: true,
      },
    ],
    awsBridgeHint:
      'Auto-registration tracks the full VM lifecycle, applies exclusively to Virtual Machines (not Load Balancers/App Gateways), and only registers the primary NIC!',
    explanation:
      'Azure Private DNS **auto-registration** applies **exclusively to Virtual Machines** (Internal Load Balancers, Application Gateways, and secondary NICs must have static `A` records created manually!). For multi-NIC VMs, only the **primary NIC** is auto-registered, and when a VM is stopped/deallocated or deleted, Azure automatically cleans up its dynamic `A` record.',
    awsComparison:
      'No built-in AWS Route 53 equivalent beyond rigid `ip-10-x-x-x.ec2.internal` private DNS hostnames; Azure\'s custom domain VM lifecycle registration (`vm-web01.prod.contoso.internal`) is super clean—just remember secondary NICs and ILBs are manual!',
  },
  {
    id: 'az104-a4-056',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Site-to-Site VPN Deployment Sequence',
    difficulty: 2,
    format: 'sequence',
    prompt:
      'You are building an IPsec/IKEv2 **Site-to-Site (S2S) VPN** tunnel between a greenfield Azure Virtual Network (`10.20.0.0/16`) and your on-premises Cisco ASA firewall (`198.51.100.10`, LAN `192.168.0.0/16`). Arrange the Azure resource provisioning steps in the required order:',
    correctSequence: [
      'Create the dedicated subnet named GatewaySubnet inside the Azure Virtual Network',
      'Deploy a RouteBased Virtual Network Gateway (Gateway type: Vpn) into GatewaySubnet with a Standard Public IP',
      'Create a Local Network Gateway resource specifying on-premises public IP 198.51.100.10 and address space 192.168.0.0/16',
      'Create a Site-to-Site (IPsec) Connection resource linking the Virtual Network Gateway and Local Network Gateway with a matching pre-shared key',
    ],
    awsBridgeHint:
      'Map the four pieces to AWS VPN: `GatewaySubnet` + `Virtual Network Gateway` (= VGW), `Local Network Gateway` (= Customer Gateway CGW), and `Connection` (= Site-to-Site VPN Connection)!',
    explanation:
      'A complete Azure Site-to-Site VPN consists of: (1) `GatewaySubnet` in the VNet, (2) a **Virtual Network Gateway** (`Vpn` / `RouteBased`) with a Standard Public IP (takes ~20–45 minutes to provision), (3) a **Local Network Gateway** representing your **on-premises** VPN appliance\'s public IP/FQDN and on-premises private CIDRs, and (4) a **Connection** (`IPsec`) binding both gateways with a shared key (PSK).',
    awsComparison:
      'Watch the misleading name! In AWS it\'s called **Customer Gateway (CGW)**; in Azure it\'s called **Local Network Gateway (LNG)**—"Local" means *your local on-premises datacenter*, NOT local to Azure! That naming trip-up catches tons of AWS architects!',
  },
  {
    id: 'az104-a4-057',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Local Network Gateway Maintenance',
    difficulty: 2,
    format: 'single',
    prompt:
      'Your company has a working static (non-BGP) Site-to-Site VPN between Azure and your Chicago office (`192.168.1.0/24`). The network team adds a new VLAN (`192.168.50.0/24`) in Chicago and updates the on-premises firewall crypto/routing policies, yet Azure VMs still route `192.168.50.0/24` toward the internet instead of down the VPN tunnel. Which Azure resource must you update?',
    options: [
      'Virtual Network address space',
      'GatewaySubnet CIDR prefix',
      'Connection pre-shared key (PSK)',
      'Local Network Gateway Address Space',
    ],
    correctIndices: [3],
    awsBridgeHint:
      'Without BGP dynamic route exchange, which Azure object stores the list of on-premises private subnets reachable across the VPN?',
    explanation:
      'When BGP is NOT used on a Site-to-Site VPN, Azure learns which private IP prefixes live on-premises from the **Address Space** property of the **Local Network Gateway** resource! Adding `192.168.50.0/24` to the Local Network Gateway automatically updates system/gateway routes (`VirtualNetworkGateway`) across the VNet for that new on-premises subnet.',
    awsComparison:
      'In AWS static Site-to-Site VPN, static on-premises CIDRs are entered on the **VPN Connection -> Static Routes** tab (while CGW only holds the public IP); in Azure, **Local Network Gateway** holds BOTH the on-premises public IP AND the static on-premises private CIDRs!',
  },
  {
    id: 'az104-a4-058',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'PolicyBased vs RouteBased VPN Gateways',
    difficulty: 3,
    format: 'single',
    prompt:
      'You inherit an older Azure Virtual Network Gateway configured with **VPN type = `PolicyBased`** (`Basic` SKU) supporting one legacy Site-to-Site IKEv1 tunnel. Leadership now wants to enable **Point-to-Site (P2S) VPN** for remote developers and add a second IKEv2 Site-to-Site branch tunnel. Why can\'t you simply upgrade the SKU in place, and what is the required remediation?',
    options: [
      'A PolicyBased gateway cannot be converted to RouteBased in place; you must delete the existing Virtual Network Gateway and deploy a new RouteBased gateway (VpnGw1 or higher)',
      'Keep PolicyBased and attach an Azure Application Gateway in front of GatewaySubnet',
      'Enable BGP on the PolicyBased Basic gateway using PowerShell to unlock Point-to-Site',
      'Add a second GatewaySubnet2 (/27) in the same VNet for a dedicated Point-to-Site gateway',
    ],
    correctIndices: [0],
    awsBridgeHint:
      '`PolicyBased` (static IKEv1) is a dead-end legacy mode: it locks you to `Basic` SKU, max 1 S2S tunnel, no P2S, no BGP, and immutable `vpnType`!',
    explanation:
      'In Azure, **VPN Type** (`PolicyBased` vs `RouteBased`) and **Gateway Type** (`Vpn` vs `ExpressRoute`) are **immutable after creation**! `PolicyBased` gateways only support `Basic` SKU, IKEv1, a single S2S tunnel, and **do NOT support Point-to-Site (P2S), VNet-to-VNet, BGP, or ExpressRoute coexistence**. You must **delete** the `PolicyBased` gateway and recreate a new **`RouteBased`** gateway (`VpnGw1`/`VpnGw2`/etc.).',
    awsComparison:
      'Similar to immutable gateway types in AWS—always deploy **`RouteBased`** (`VpnGw1AZ` or higher) in Azure for all modern workloads!',
  },
  {
    id: 'az104-a4-059',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'Point-to-Site VPN Protocols & Auth',
    difficulty: 2,
    format: 'multi',
    selectCount: 2,
    prompt:
      'Your remote workforce uses **Windows 11**, **macOS**, and **iOS** devices and needs **Point-to-Site (P2S) VPN** access to `VNet-Corp` using **Microsoft Entra ID** native authentication (with Conditional Access MFA). Which TWO configurations are required? (Select 2.)',
    options: [
      'Enable the OpenVPN (SSL/TLS) tunnel protocol on the RouteBased Virtual Network Gateway',
      'Configure SSTP (Secure Socket Tunneling Protocol) as the sole VPN protocol for macOS and iOS',
      'Deploy a PolicyBased Virtual Network Gateway',
      'Grant tenant admin consent for the Azure VPN Client enterprise application and distribute the generated XML configuration profile',
      'Configure a Local Network Gateway for each remote laptop\'s home Wi-Fi IP',
    ],
    correctIndices: [0, 3],
    awsBridgeHint:
      'SSTP is strictly Windows-only! Cross-platform TLS 443 + Microsoft Entra ID native auth specifically requires **OpenVPN** + the **Azure VPN Client**!',
    explanation:
      'Know the three P2S VPN protocols and three auth modes for AZ-104:\n• **SSTP** (TLS 443): **Windows ONLY** (no macOS/Linux/iOS/Android!).\n• **IKEv2** (UDP 500/4500): Windows/macOS/iOS, fast, but UDP 500/4500 is often blocked by hotel/airport firewalls and does NOT support Entra ID auth.\n• **OpenVPN** (TLS 443): Cross-platform (Windows, macOS, Linux, iOS, Android) AND is **mandatory for Microsoft Entra ID authentication** using the **Azure VPN Client**!',
    awsComparison:
      'Directly parallels **AWS Client VPN** (which is managed OpenVPN over TLS 443 supporting SAML/IAM Identity Center SSO via the AWS VPN Client app!).',
  },
  {
    id: 'az104-a4-060',
    track: 'az-104',
    act: 4,
    domain: 'az104-networking',
    subtopic: 'ExpressRoute & VPN Coexistence',
    difficulty: 3,
    format: 'yes-no',
    prompt:
      'Your enterprise connects global datacenters to Azure via **Azure ExpressRoute** and deploys a **Site-to-Site VPN** as an encrypted failover backup path into the same `VNet-Hub`. Evaluate the following architectural statements:',
    statements: [
      {
        statement:
          'Standard ExpressRoute Private Peering traffic bypasses the public internet via a connectivity provider, and Layer 3 IP packets are NOT encrypted by default unless IPsec VPN over ExpressRoute or ExpressRoute Direct MACsec is layered on top.',
        answer: true,
      },
      {
        statement:
          'To run both an ExpressRoute Virtual Network Gateway and a VPN Virtual Network Gateway side-by-side in the same VNet, `GatewaySubnet` must be `/27` or larger and the VPN gateway must be `RouteBased`.',
        answer: true,
      },
      {
        statement:
          'When both ExpressRoute Private Peering and a BGP Site-to-Site VPN advertise the exact same `/24` on-premises prefix, Azure prefers the Site-to-Site VPN tunnel during normal operation.',
        answer: false,
      },
    ],
    awsBridgeHint:
      'Just like Direct Connect, private leased circuits are private—NOT encrypted by default—and private dedicated circuits always win route preference over backup internet VPN tunnels when prefixes match!',
    explanation:
      '1. **True**: ExpressRoute travels privately over a telco/exchange partner (never the public internet), but payload is **unencrypted by default** unless MACsec (Layer 2 on ExpressRoute Direct) or IPsec S2S VPN over ExpressRoute is configured. 2. **True**: Coexistence in one VNet requires `GatewaySubnet` >= `/27` and a `RouteBased` non-Basic VPN SKU. 3. **False**: When both ExpressRoute and S2S VPN advertise identical prefixes, **ExpressRoute always wins** during normal operation, automatically failing over to VPN only if the ExpressRoute BGP session drops!',
    awsComparison:
      '100% identical to **AWS Direct Connect + Site-to-Site VPN backup**! Neither AWS DX nor Azure ExpressRoute encrypts traffic by default (both offer MACsec on dedicated ports or IPsec VPN over private peering), and both prefer the dedicated circuit over backup VPN!',
  },
];
