export interface TicCompany {
  id: string;
  name: string;
  category: "digital-native" | "power-player";
  quadrant: "orchestrator" | "data-engine" | "niche-expert" | "service-enabler";
  funding: string;
  fundingAmount: number;
  valuation?: string;
  headcount: string;
  headcountNumber: number;
  revenue?: string;
  coreProduct: string;
  keyClients: string[];
  strategicPosition: string;
  threatLevel: "structural" | "tactical" | "hybrid" | "network";
  founded?: number;
  headquarters: string;
  keyFunding?: string;
}

export const TIC_COMPANIES: TicCompany[] = [
  {
    id: "altana-ai",
    name: "Altana AI",
    category: "digital-native",
    quadrant: "orchestrator",
    funding: "~$622M - $670M",
    fundingAmount: 622,
    valuation: "$1 Billion (Unicorn)",
    headcount: "200-276",
    headcountNumber: 238,
    revenue: "$100M - $250M (Estimate)",
    coreProduct: "Value Chain Management System (VCMS)",
    keyClients: ["U.S. Customs and Border Protection", "Maersk", "Boston Scientific"],
    strategicPosition:
      'Creates a parallel "operating system" for value chains that could make traditional per-test billing obsolete. Network-level intelligence provides value impossible to replicate through periodic inspections.',
    threatLevel: "structural",
    founded: 2018,
    headquarters: "New York, NY, USA",
    keyFunding: "$200M Series C (July 2024) led by USIT",
  },
  {
    id: "prewave",
    name: "Prewave",
    category: "digital-native",
    quadrant: "data-engine",
    funding: "~$98M",
    fundingAmount: 98,
    valuation: "$300M - $500M (Estimate)",
    headcount: "200+",
    headcountNumber: 200,
    revenue: "$15M - $25M (Estimate)",
    coreProduct: "AI-driven Supply Chain Risk & Sustainability Monitoring",
    keyClients: ["BMW", "Siemens", "Lufthansa", "Hyundai"],
    strategicPosition:
      "Competes on risk intelligence layer; could be absorbed by an incumbent. Strong EU regulatory alignment makes it a prime acquisition target.",
    threatLevel: "tactical",
    founded: 2017,
    headquarters: "Vienna, Austria",
    keyFunding: "€63M Series B (June 2024) led by Hedosophia",
  },
  {
    id: "inspectorio",
    name: "Inspectorio",
    category: "digital-native",
    quadrant: "niche-expert",
    funding: "$64.9M",
    fundingAmount: 64.9,
    valuation: "$250M - $400M (Estimate)",
    headcount: "~234",
    headcountNumber: 234,
    revenue: "$30M - $50M (Estimate)",
    coreProduct: "Supply Chain Network Intelligence (SCNI) with Paramo AI",
    keyClients: ["Target", "Dick's Sporting Goods", "Urban Outfitters", "Mango"],
    strategicPosition:
      'Retail-vertical quality orchestration; displaces per-inspection revenue through SaaS model and AI-driven "management by exception."',
    threatLevel: "tactical",
    founded: 2015,
    headquarters: "Minneapolis, MN, USA",
    keyFunding: "$50M Series B (January 2022) led by Insight Partners",
  },
  {
    id: "ecovadis",
    name: "EcoVadis",
    category: "digital-native",
    quadrant: "orchestrator",
    funding: "$735.8M",
    fundingAmount: 735.8,
    valuation: "$1 Billion+",
    headcount: "560-1,894",
    headcountNumber: 1200,
    revenue: "$107M - $515M (Wide Range)",
    coreProduct: "Sustainability Risk Assessment & Carbon Scorecards",
    keyClients: ["L'Oreal", "Burberry", "Henkel", "Sanofi", "Johnson & Johnson"],
    strategicPosition:
      "Has achieved utility status in sustainability ratings; procurement teams now require EcoVadis scores. Network-based existential threat to assurance divisions.",
    threatLevel: "network",
    founded: 2007,
    headquarters: "Paris, France",
    keyFunding: "$500M (June 2022) led by Astorg and BeyondNetZero",
  },
  {
    id: "tradebeyond",
    name: "TradeBeyond",
    category: "digital-native",
    quadrant: "niche-expert",
    funding: "$10M",
    fundingAmount: 10,
    valuation: "$50M - $100M (Estimate)",
    headcount: "~200",
    headcountNumber: 200,
    revenue: "$10M - $25M (Estimate)",
    coreProduct: "Multi-tier Supply Chain Management & PLM Integration",
    keyClients: ["Walgreens Boots Alliance", "Party City", "Tokmanni"],
    strategicPosition:
      "Niche retail PLM; small enough for bolt-on acquisition. Embeds compliance directly into product lifecycle.",
    threatLevel: "tactical",
    founded: 1995,
    headquarters: "Hong Kong / San Diego, CA",
    keyFunding: "$10M Series A from BPEA EQT",
  },
  {
    id: "sourcemap",
    name: "Sourcemap",
    category: "digital-native",
    quadrant: "niche-expert",
    funding: "$47M",
    fundingAmount: 47,
    valuation: "$100M - $150M (Estimate)",
    headcount: "~51",
    headcountNumber: 51,
    revenue: "$1M - $10M (Estimate)",
    coreProduct: "n-Tier Tariff Mapping & EUDR Compliance Automation",
    keyClients: ["Ferrero Group", "Oxford University Press", "Salesforce (partner)"],
    strategicPosition:
      "High regulatory gatekeeper value (EUDR/EU TRACES) relative to small size. Strategic importance far exceeds revenue.",
    threatLevel: "tactical",
    founded: 2011,
    headquarters: "New York, NY, USA",
    keyFunding: "$20M Series B (June 2023) led by Energize Ventures",
  },
  {
    id: "assent",
    name: "Assent Compliance",
    category: "power-player",
    quadrant: "orchestrator",
    funding: "$501.64M",
    fundingAmount: 501.64,
    valuation: "$1.3 Billion",
    headcount: "~1,000",
    headcountNumber: 1000,
    revenue: "$100M ARR (Centaur Status)",
    coreProduct: "Comprehensive supply chain sustainability and product compliance platform",
    keyClients: ["Honeywell", "Boeing", "General Electric", "Johnson & Johnson", "Toshiba"],
    strategicPosition:
      "Most commercially mature platform in the space. 44 consecutive quarters of ARR growth. Positioned for independent growth or IPO.",
    threatLevel: "structural",
    founded: 2010,
    headquarters: "Ottawa, Canada",
    keyFunding: "$400M acquisition-financing (June 2025) from Vista & Blackstone",
  },
  {
    id: "integritynext",
    name: "IntegrityNext",
    category: "power-player",
    quadrant: "niche-expert",
    funding: "€100M",
    fundingAmount: 107,
    valuation: "Not Disclosed",
    headcount: "200+",
    headcountNumber: 200,
    revenue: "Profitable (Bootstrapped)",
    coreProduct: "ESG and supply chain compliance platform",
    keyClients: ["Siemens Gamesa", "Infineon", "SwissRe", "Kion", "Hilti", "Unilever"],
    strategicPosition:
      "Bootstrapped to profitability before raising — unique in the space. Direct EcoVadis competitor in European ESG compliance.",
    threatLevel: "tactical",
    founded: 2016,
    headquarters: "Munich, Germany",
    keyFunding: "€100M from EQT Growth (March 2023) - first institutional round",
  },
  {
    id: "qima",
    name: "QIMA",
    category: "power-player",
    quadrant: "orchestrator",
    funding: "Private (TA Associates)",
    fundingAmount: 0,
    valuation: "Not Disclosed",
    headcount: "4,000+",
    headcountNumber: 4000,
    revenue: "32% CAGR (4 years)",
    coreProduct: "QIMAone platform + Physical inspection network",
    keyClients: ["30,000+ clients globally"],
    strategicPosition:
      "The only company competing head-to-head with Big Three on both physical and digital dimensions. Existential threat to incumbent operating models.",
    threatLevel: "hybrid",
    founded: 2005,
    headquarters: "Hong Kong",
    keyFunding: "TA Associates strategic partnership (March 2025)",
  },
  {
    id: "sedex",
    name: "Sedex",
    category: "power-player",
    quadrant: "data-engine",
    funding: "Member-owned",
    fundingAmount: 0,
    valuation: "Non-profit",
    headcount: "~586",
    headcountNumber: 586,
    revenue: "~$22M (Estimate)",
    coreProduct: "SMETA audit standard holder & data-sharing platform",
    keyClients: ["95,000+ members globally"],
    strategicPosition:
      "Standards body with 540,000 audits conducted. Forrester validated 312% ROI. Embedded foundational infrastructure.",
    threatLevel: "network",
    founded: 2004,
    headquarters: "London, UK",
    keyFunding: "N/A (Member-owned)",
  },
];

export const THREAT_LEVEL_CONFIG: Record<
  string,
  { label: string; color: string }
> = {
  structural: { label: "Structural", color: "bg-red-500/15 text-red-400 border-red-500/30" },
  tactical: { label: "Tactical", color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
  hybrid: { label: "Hybrid", color: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  network: { label: "Network", color: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
};

export const CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string }
> = {
  "digital-native": { label: "Digital-Native", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  "power-player": { label: "Power Player", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
};
