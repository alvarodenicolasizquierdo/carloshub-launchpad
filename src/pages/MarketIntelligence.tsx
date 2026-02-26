import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { tagScreen, startEngagementTimer, trackSectionExplored } from "@/utils/clarityTracking";
import { motion } from "framer-motion";
import {
  Radar,
  Swords,
  Table2,
  CalendarRange,
  ChevronDown,
  ChevronRight,
  Printer,
  Check,
  X,
  AlertTriangle,
  Info,
  ShieldCheck,
  Lightbulb,
  Filter,
  Database,
  FileText,
  ArrowUpDown,
  Building2,
  DollarSign,
  Users,
  MapPin,
  ExternalLink,
  GitCompare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TIC_COMPANIES, THREAT_LEVEL_CONFIG, CATEGORY_CONFIG, type TicCompany } from "@/data/ticCompanies";

/* ─── Quadrant Data (expanded from repo) ─── */

const QUADRANT_PLAYERS = [
  { name: "CARLOS", x: 35, y: 90, color: "#00C49F", label: "AI-Native TIC Platform" },
  { name: "Altana AI", x: 28, y: 82, color: "#E74C3C", label: "Value Chain OS" },
  { name: "Inspectorio", x: 20, y: 70, color: "#FF6B35", label: "AI Supply Chain Platform" },
  { name: "Prewave", x: 15, y: 65, color: "#3498DB", label: "Risk Superintelligence" },
  { name: "EcoVadis", x: 22, y: 55, color: "#2ECC71", label: "Sustainability Utility" },
  { name: "Assent", x: 30, y: 58, color: "#9B59B6", label: "Compliance Centaur" },
  { name: "TradeBeyond", x: 25, y: 45, color: "#8884D8", label: "End-to-End Supply Chain Suite" },
  { name: "IntegrityNext", x: 18, y: 42, color: "#1ABC9C", label: "ESG Compliance" },
  { name: "Sourcemap", x: 40, y: 50, color: "#F39C12", label: "Traceability Specialist" },
  { name: "Sedex", x: 50, y: 35, color: "#95A5A6", label: "Audit Standard Holder" },
  { name: "QIMA", x: 85, y: 30, color: "#FFBB28", label: "Digital-Enhanced TIC Services" },
];

/* ─── Battlecard Data ─── */

interface BattleCard {
  id: string;
  name: string;
  color: string;
  tagline: string;
  header: string;
  quickFacts: string[];
  strengths: string[];
  weaknesses: string[];
  winThemes: string[];
  objections: { claim: string; response: string }[];
}

const BATTLECARDS: BattleCard[] = [
  {
    id: "inspectorio",
    name: "Inspectorio",
    color: "#FF6B35",
    header: "Inspectorio | AI Supply Chain Platform | Pure SaaS",
    tagline: "The closest direct competitor on AI depth",
    quickFacts: [
      "Model: Pure SaaS — no field inspectors",
      "Scale: $340B customer revenue; 15,000+ suppliers",
      "Key customers: Target, major apparel/hardlines/grocery retailers",
      "Latest launch: Supply Chain Network Intelligence (Jan 2026), Paramo AI (Sep-Oct 2025)",
      "DPP positioning: Strongest in market — dedicated content, claims brands already using it",
    ],
    strengths: [
      "Paramo AI with cited/sourced recommendations (closest to reasoning transparency in TIC)",
      "Autonomous agents for end-to-end workflow automation",
      "NLP queries with conversational AI assistant",
      "Multi-language document processing with cross-referencing",
      "Explicit DPP positioning with supplier engagement automation",
      "Supply Chain Network Intelligence — real-time AI-driven sourcing network",
    ],
    weaknesses: [
      "No full reasoning chains — cites sources but doesn't show WHY a recommendation was made",
      "No confidence ranges — provides point estimates, not probability distributions",
      "No downstream impact visualization — can't trace how a change propagates through the supply chain",
      "No scenario simulator — can't model \"what if\" scenarios",
      "No care labelling AI",
      "No component N:M linking",
      "No multi-framework simultaneous validation (bluesign + OEKO-TEX + ZDHC in one view)",
      "No field presence — depends on third-party inspectors",
    ],
    winThemes: [
      "\"They cite sources. We show the full reasoning chain.\"",
      "\"Their AI tells you WHAT. Ours tells you WHY and WHAT HAPPENS NEXT.\"",
      "\"They track compliance frameworks one at a time. We validate across bluesign, OEKO-TEX, and ZDHC simultaneously.\"",
    ],
    objections: [
      {
        claim: "Paramo AI is more advanced",
        response: "Paramo cites documents. CARLOS builds full reasoning chains with confidence ranges — you see not just the answer but the logic, the uncertainty, and the downstream impact.",
      },
      {
        claim: "Inspectorio is already the DPP leader",
        response: "They have strong DPP positioning. We have multi-framework validation — bluesign, OEKO-TEX, ZDHC validated simultaneously. DPP isn't just about tracking; it's about validating across every applicable framework at once.",
      },
      {
        claim: "They have more suppliers on the network",
        response: "Network size measures adoption. Our 847 ML features measure analytical depth. Ask: do you need more data points, or better decisions from the data you have?",
      },
    ],
  },
  {
    id: "tradebeyond",
    name: "TradeBeyond",
    color: "#8884D8",
    header: "TradeBeyond | End-to-End Supply Chain Suite | Pure SaaS",
    tagline: "Broadest coverage, but shallow AI",
    quickFacts: [
      "Model: Pure SaaS — no field inspectors",
      "Scale: 50,000+ supply chain partners in 112 countries",
      "Key customers: Under Armour, Oakley, Intersport",
      "Latest launch: PO Line Risk Rating (2024), AI Chain of Custody, AI Chatbot",
      "DPP positioning: Adjacent capability only (Chain of Custody), no dedicated DPP product",
    ],
    strengths: [
      "PO Line Risk Rating — ML-driven percentage risk scores per purchase order line",
      "End-to-end coverage: PLM → Sourcing → Orders → Quality → ESG",
      "AI Chain of Custody for UFLPA/EUDR compliance",
      "Free supplier/retailer connections (strong adoption lever)",
      "Nth-tier automated supply chain mapping",
      "AI-powered vendor chatbot for real-time guidance",
    ],
    weaknesses: [
      "Risk scoring shows factors but no full reasoning transparency",
      "No DPP product — Chain of Custody is adjacent, not DPP-specific",
      "No scenario simulation or \"what if\" modelling",
      "No care labelling AI",
      "No downstream impact visualization",
      "No confidence ranges — provides colour-coded risk (green/yellow/red), not probability distributions",
      "No multi-framework simultaneous validation",
      "No component N:M linking",
      "No field presence — depends on third-party inspectors",
    ],
    winThemes: [
      "\"TradeBeyond covers the supply chain end-to-end. CARLOS goes deeper on the intelligence layer.\"",
      "\"Their PO Risk Rating flags risk. Our scenario simulator models what happens next.\"",
      "\"They colour-code risk. We quantify it with confidence ranges.\"",
    ],
    objections: [
      {
        claim: "TradeBeyond covers PLM to ESG in one platform",
        response: "Breadth is valuable. But for compliance intelligence specifically, you need depth — reasoning chains, scenario modelling, multi-framework validation. That's where CARLOS operates.",
      },
      {
        claim: "Free supplier connections make adoption easier",
        response: "Adoption speed is important. But the value isn't in connecting suppliers — it's in what intelligence you extract from the connection. Our 847 ML features extract more insight from fewer data points.",
      },
    ],
  },
  {
    id: "qima",
    name: "QIMA",
    color: "#FFBB28",
    header: "QIMA | Digital-Enhanced TIC Services | Hybrid (SaaS + 2,500 Inspectors)",
    tagline: "Field presence powerhouse, operational AI only",
    quickFacts: [
      "Model: Hybrid — SaaS platform + 2,500+ owned inspectors/auditors in 95+ countries",
      "Scale: 30,000+ clients in 120 countries, 20 years in market",
      "Latest launch: AI Report Summary (2025-26), Risk Radar expansion, QIMAone platform tiers",
      "DPP positioning: Thought leadership only — webinars, no product",
      "Unique model: Per-service transparent pricing (inspection quotes visible upfront)",
    ],
    strengths: [
      "Largest owned inspector network in the comparison (2,500+)",
      "Risk Radar — factory risk scorecards, order risk ratings, country benchmarking",
      "AI-driven incident monitoring via media/social scanning",
      "Per-service transparent pricing (unique in market)",
      "Deep domain expertise across consumer products, food & agri, life sciences",
      "Physical audit and testing capability no pure SaaS player can match",
    ],
    weaknesses: [
      "AI is operational (report summaries, risk flags) — not strategic",
      "No reasoning transparency — risk surfacing without underlying logic",
      "No DPP product — addressed through educational webinars only",
      "No scenario simulation",
      "No care labelling AI",
      "No downstream impact visualization",
      "No confidence ranges",
      "No multi-framework validation",
      "No autonomous workflow agents",
      "No NLP query capability",
    ],
    winThemes: [
      "\"QIMA executes inspections. CARLOS predicts what needs inspecting and why.\"",
      "\"They're a TIC company that added tech. We're tech that transforms TIC.\"",
      "\"Their AI summarises reports. Ours builds the reasoning chain before the report exists.\"",
    ],
    objections: [
      {
        claim: "QIMA has 2,500 inspectors on the ground",
        response: "Physical presence is valuable — and complementary. CARLOS doesn't replace inspectors; it makes them smarter by telling them WHERE to look, WHAT to prioritise, and WHY a specific risk matters.",
      },
      {
        claim: "QIMA is a one-stop shop",
        response: "One-stop-shop for execution. But execution without intelligence is repeating yesterday's inspections. CARLOS adds the intelligence layer: scenario modelling, confidence ranges, downstream impact.",
      },
    ],
  },
  {
    id: "altana-ai",
    name: "Altana AI",
    color: "#00D4AA",
    header: "Altana AI | Value Chain Management System | AI-Native Platform",
    tagline: "The unicorn building a parallel supply chain OS",
    quickFacts: [
      "Model: AI-native platform — no field inspectors",
      "Scale: $622M–$670M raised, $1B valuation (unicorn)",
      "Key customers: U.S. Customs and Border Protection, Maersk, Boston Scientific",
      "Latest launch: Value Chain Management System (VCMS)",
      "Focus: Government/defence and enterprise supply chain visibility",
    ],
    strengths: [
      "Massive data asset — maps global trade flows across customs, shipping, and corporate data",
      "Government-grade intelligence (U.S. CBP is a customer)",
      "Network-level visibility that no single-company tool can replicate",
      "Strong investor backing ($200M Series C, July 2024)",
      "Platform approach could make per-test billing obsolete",
      "Cross-industry applicability beyond TIC",
    ],
    weaknesses: [
      "No product-level compliance intelligence — operates at trade/logistics layer, not product quality",
      "No care labelling AI or textile-specific functionality",
      "No multi-framework validation (bluesign, OEKO-TEX, ZDHC)",
      "No DPP readiness — focused on trade compliance, not product passports",
      "No scenario simulation at product/order level",
      "No field inspection capability",
      "Government-heavy customer base — limited retail/consumer goods penetration",
    ],
    winThemes: [
      "\"Altana maps trade flows. CARLOS maps product intelligence.\"",
      "\"They tell you WHERE goods move. We tell you WHETHER they're compliant and WHY.\"",
      "\"Their value is at the border. Ours is at the factory, the lab, and the product.\"",
    ],
    objections: [
      {
        claim: "Altana has a $1B valuation and government contracts",
        response: "Impressive scale — in a different domain. Altana solves trade-level visibility (customs, sanctions, shipping). CARLOS solves product-level intelligence (quality, compliance, sustainability). They're complementary, not competitive.",
      },
      {
        claim: "Their network data is unmatched",
        response: "For trade flows, yes. But trade flow data doesn't tell you if a product passes bluesign, if a care label is correct, or if a supplier meets CSRD requirements. That's CARLOS territory.",
      },
    ],
  },
  {
    id: "prewave",
    name: "Prewave",
    color: "#4ECDC4",
    header: "Prewave | AI Risk & Sustainability Monitoring | SaaS",
    tagline: "The EU regulatory play — strong on risk, light on product",
    quickFacts: [
      "Model: Pure SaaS — AI-driven monitoring",
      "Scale: ~$98M raised, 200+ employees",
      "Key customers: BMW, Siemens, Lufthansa, Hyundai",
      "Latest launch: €63M Series B (June 2024) led by Hedosophia",
      "Focus: Supply chain risk monitoring and EU regulatory compliance (LkSG, CSDDD)",
    ],
    strengths: [
      "Real-time risk monitoring across 50+ languages using NLP on news, social media, and public data",
      "Strong EU regulatory alignment (LkSG, CSDDD, CSRD)",
      "Automotive and industrial customer base with deep procurement integration",
      "Predictive risk alerts before incidents hit mainstream news",
      "Sub-tier supplier risk visibility",
      "Strong European market positioning",
    ],
    weaknesses: [
      "Risk monitoring only — no quality management or inspection capability",
      "No product-level compliance (care labels, composition, testing)",
      "No DPP readiness",
      "No care labelling AI",
      "No multi-framework validation",
      "No scenario simulation",
      "No field presence",
      "Monitoring tells you WHAT happened — doesn't tell you what to DO about it",
    ],
    winThemes: [
      "\"Prewave monitors risk. CARLOS manages compliance.\"",
      "\"They alert you to problems. We prevent them.\"",
      "\"Risk monitoring is one input. CARLOS is the decision engine.\"",
    ],
    objections: [
      {
        claim: "Prewave catches risks before anyone else",
        response: "Prewave excels at external risk signals — news, social media, public data. But product compliance risk isn't in the news. It's in test reports, supplier documentation, and framework requirements. That's where CARLOS operates.",
      },
      {
        claim: "They're aligned with EU regulations we need to comply with",
        response: "They monitor regulatory risk. We validate regulatory compliance. Monitoring tells you there's a CSRD requirement. CARLOS tells you whether your products and suppliers actually meet it — with evidence.",
      },
    ],
  },
  {
    id: "ecovadis",
    name: "EcoVadis",
    color: "#2ECC71",
    header: "EcoVadis | Sustainability Ratings Platform | Network/SaaS",
    tagline: "The procurement gatekeeper — network power, not product intelligence",
    quickFacts: [
      "Model: Network-based sustainability ratings platform",
      "Scale: $735.8M raised, $1B+ valuation, 560–1,894 employees",
      "Key customers: L'Oreal, Burberry, Henkel, Sanofi, Johnson & Johnson",
      "Network: 130,000+ rated companies across 220+ industries",
      "Focus: Supplier sustainability scoring and carbon management",
    ],
    strengths: [
      "Utility-status in procurement — many RFPs require an EcoVadis score",
      "Massive network effects (130,000+ rated companies)",
      "Carbon scorecards and Scope 3 measurement",
      "Recognised by procurement teams globally as the default ESG rating",
      "Strong brand trust and industry adoption",
      "ITC integration partnerships with SAP Ariba, Coupa",
    ],
    weaknesses: [
      "Ratings are self-reported questionnaires — not verified through testing or inspection",
      "No product-level compliance intelligence",
      "No care labelling or textile-specific capability",
      "No AI reasoning chains or explainability",
      "No DPP readiness at product level",
      "No scenario simulation",
      "No field inspection capability",
      "Scores can be gamed — based on policies and documentation, not outcomes",
      "Annual assessment cycle — not real-time",
    ],
    winThemes: [
      "\"EcoVadis scores policies. CARLOS validates products.\"",
      "\"Their rating tells you a supplier SAYS they're sustainable. Our intelligence tells you if they ARE.\"",
      "\"EcoVadis is the starting gate. CARLOS is the finish line.\"",
    ],
    objections: [
      {
        claim: "Our procurement team already requires EcoVadis scores",
        response: "EcoVadis is valuable for supplier screening. But an EcoVadis score doesn't tell you if a specific product meets bluesign, OEKO-TEX, or CSRD at the item level. CARLOS complements EcoVadis — they screen, we verify.",
      },
      {
        claim: "EcoVadis has 130,000 rated companies",
        response: "Network size is their moat. But ratings based on self-reported questionnaires aren't the same as evidence-based compliance intelligence. You need both: EcoVadis for supplier-level screening, CARLOS for product-level assurance.",
      },
    ],
  },
  {
    id: "sourcemap",
    name: "Sourcemap",
    color: "#E67E22",
    header: "Sourcemap | Supply Chain Traceability | SaaS",
    tagline: "The regulatory gatekeeper — EUDR specialist, narrow scope",
    quickFacts: [
      "Model: Pure SaaS — traceability and compliance mapping",
      "Scale: $47M raised, ~51 employees",
      "Key customers: Ferrero Group, Oxford University Press, Salesforce (partner)",
      "Latest launch: $20M Series B (June 2023) led by Energize Ventures",
      "Focus: n-Tier tariff mapping, EUDR compliance automation, EU TRACES integration",
    ],
    strengths: [
      "Deep EUDR compliance specialisation — regulatory gatekeeper positioning",
      "EU TRACES integration for deforestation-free verification",
      "n-Tier supply chain mapping with tariff intelligence",
      "Strategic importance far exceeds company size",
      "Strong regulatory expertise in emerging compliance areas",
      "Academic origins (MIT) lend credibility",
    ],
    weaknesses: [
      "Very small team (~51 employees) — limited capacity and support",
      "Narrow focus: traceability and deforestation compliance only",
      "No quality management or inspection capability",
      "No care labelling AI",
      "No multi-framework validation beyond EUDR",
      "No AI reasoning chains or explainability",
      "No scenario simulation",
      "No field presence",
      "Revenue estimated at $1M–$10M — sustainability risk",
    ],
    winThemes: [
      "\"Sourcemap traces origin. CARLOS validates everything that happens after origin.\"",
      "\"They solve one regulation (EUDR). We solve the full compliance landscape.\"",
      "\"Great for knowing WHERE materials come from. CARLOS tells you if they COMPLY.\"",
    ],
    objections: [
      {
        claim: "Sourcemap is the EUDR expert",
        response: "They are — for deforestation traceability specifically. But EUDR is one of many regulations your products need to meet. CARLOS handles CSRD, DPP, OEKO-TEX, bluesign, ZDHC, and UFLPA alongside EUDR. One platform, not ten.",
      },
      {
        claim: "They have EU TRACES integration",
        response: "Valuable for EUDR specifically. But compliance is broader than deforestation. Your products need care label accuracy, chemical compliance, sustainability certifications, and product passport readiness. Sourcemap covers one slice; CARLOS covers the full picture.",
      },
    ],
  },
  {
    id: "assent",
    name: "Assent Compliance",
    color: "#9B59B6",
    header: "Assent Compliance | Product Compliance Platform | SaaS",
    tagline: "The commercially mature unicorn — strong platform, different focus",
    quickFacts: [
      "Model: Pure SaaS — comprehensive compliance platform",
      "Scale: $501.64M raised, $1.3B valuation, ~1,000 employees",
      "Key customers: Honeywell, Boeing, General Electric, Johnson & Johnson, Toshiba",
      "Latest: $400M acquisition-financing (June 2025) from Vista & Blackstone",
      "Focus: Product compliance for complex manufacturing (chemicals, conflict minerals, trade)",
    ],
    strengths: [
      "Most commercially mature platform — $100M ARR (Centaur status)",
      "44 consecutive quarters of ARR growth",
      "Deep regulatory data intelligence across REACH, RoHS, conflict minerals, TSCA",
      "Enterprise customer base in aerospace, defence, medical devices, automotive",
      "Strong data collection automation from deep supply chain tiers",
      "Positioned for IPO or continued independent growth",
    ],
    weaknesses: [
      "Focus on manufactured product compliance (electronics, chemicals) — not textile/apparel",
      "No care labelling AI",
      "No textile-specific framework validation (bluesign, OEKO-TEX, ZDHC)",
      "No DPP readiness for fashion/textile products",
      "No field inspection capability",
      "No scenario simulation for supply chain decisions",
      "Limited sustainability/ESG depth compared to dedicated ESG platforms",
      "Heavy industry focus — may not translate to consumer goods/retail",
    ],
    winThemes: [
      "\"Assent is the compliance leader for manufactured goods. CARLOS is the intelligence leader for consumer products.\"",
      "\"They track REACH and RoHS. We validate bluesign, OEKO-TEX, and ZDHC.\"",
      "\"Different industries, different regulations, different intelligence needs.\"",
    ],
    objections: [
      {
        claim: "Assent is a $1.3B company with $100M ARR",
        response: "Impressive commercial traction — in manufactured goods compliance (aerospace, electronics, medical devices). For textile, apparel, and consumer products, the compliance landscape is different: care labels, sustainability frameworks, DPP. That's CARLOS.",
      },
      {
        claim: "They already handle product compliance",
        response: "Product compliance for electronics (RoHS, REACH, conflict minerals) is a different domain from product compliance for consumer goods (bluesign, OEKO-TEX, care labelling, DPP). Same word, different world.",
      },
    ],
  },
  {
    id: "integritynext",
    name: "IntegrityNext",
    color: "#1ABC9C",
    header: "IntegrityNext | ESG Compliance Platform | SaaS",
    tagline: "The bootstrapped challenger — profitable, focused, European",
    quickFacts: [
      "Model: Pure SaaS — supplier ESG compliance platform",
      "Scale: €100M from EQT Growth, 200+ employees, profitable",
      "Key customers: Siemens Gamesa, Infineon, SwissRe, Kion, Hilti, Unilever",
      "Latest: First institutional round from EQT Growth (March 2023)",
      "Focus: Supplier ESG compliance, due diligence, and risk management",
    ],
    strengths: [
      "Bootstrapped to profitability before raising — unique financial discipline",
      "Direct EcoVadis competitor with lower cost and faster onboarding",
      "Strong European enterprise customer base",
      "Automated supplier self-assessments with document verification",
      "LkSG and CSDDD compliance specialisation",
      "Backed by EQT Growth — serious scale-up potential",
    ],
    weaknesses: [
      "Supplier-level ESG focus only — no product-level intelligence",
      "No care labelling AI or textile-specific capability",
      "No multi-framework product validation",
      "No DPP readiness",
      "No AI reasoning chains or explainability",
      "No scenario simulation",
      "No field inspection capability",
      "Smaller network than EcoVadis",
      "Self-assessment model has same verification limitations as EcoVadis",
    ],
    winThemes: [
      "\"IntegrityNext checks supplier ESG status. CARLOS validates product compliance.\"",
      "\"They automate questionnaires. We automate intelligence.\"",
      "\"Supplier-level due diligence is table stakes. Product-level assurance is the differentiator.\"",
    ],
    objections: [
      {
        claim: "IntegrityNext is cheaper and faster to deploy than EcoVadis",
        response: "For supplier ESG screening, that may be true. But supplier screening and product compliance intelligence are different problems. You may want IntegrityNext for supplier onboarding AND CARLOS for product assurance. They're complementary.",
      },
      {
        claim: "They handle LkSG compliance which we need",
        response: "LkSG requires supply chain due diligence — which IntegrityNext covers at the supplier level. But LkSG also implies knowing your products meet standards. CARLOS provides the product-level evidence that makes your LkSG reporting credible.",
      },
    ],
  },
  {
    id: "sedex",
    name: "Sedex",
    color: "#3498DB",
    header: "Sedex | Ethical Trade Platform | Member-Owned Non-Profit",
    tagline: "The audit infrastructure — embedded but aging",
    quickFacts: [
      "Model: Member-owned non-profit — data sharing and audit standard (SMETA)",
      "Scale: 95,000+ members globally, 540,000 audits conducted",
      "Key validation: Forrester validated 312% ROI for members",
      "Focus: SMETA audit standard, supplier data sharing, responsible sourcing",
      "Unique: Non-profit status means different competitive dynamics",
    ],
    strengths: [
      "SMETA is an industry-standard audit methodology — embedded infrastructure",
      "Massive member network (95,000+ members)",
      "540,000 audits conducted — enormous data asset",
      "Forrester-validated 312% ROI",
      "Non-profit trust — perceived as neutral industry infrastructure",
      "Data sharing reduces audit duplication across the industry",
    ],
    weaknesses: [
      "Audit-centric model — no AI-driven intelligence or prediction",
      "No product-level compliance intelligence",
      "No care labelling AI",
      "No multi-framework validation",
      "No DPP readiness",
      "No scenario simulation",
      "No reasoning chains or explainability",
      "Annual audit cycle — not continuous monitoring",
      "SMETA audits are point-in-time snapshots, not real-time compliance",
      "Non-profit governance can slow innovation",
    ],
    winThemes: [
      "\"Sedex audits the past. CARLOS predicts the future.\"",
      "\"SMETA tells you what WAS compliant on audit day. CARLOS tells you what IS compliant today.\"",
      "\"They reduce audit duplication. We reduce the need for audits in the first place.\"",
    ],
    objections: [
      {
        claim: "We already use Sedex for our ethical trade programme",
        response: "Sedex is foundational for ethical trade auditing — and CARLOS doesn't replace it. CARLOS adds the intelligence layer on top: AI-driven risk prediction, multi-framework validation, and continuous compliance monitoring between audit cycles.",
      },
      {
        claim: "Sedex has 95,000 members and 540,000 audits",
        response: "That's an enormous and valuable data asset for audit sharing. But audit data and compliance intelligence are different. Audits verify a point in time. CARLOS provides continuous, AI-driven intelligence that tells you what needs attention before the next audit.",
      },
    ],
  },
];

/* ─── AI Matrix Data ─── */

type CellStatus = "full" | "partial" | "none";

interface MatrixRow {
  feature: string;
  carlos: { text: string; status: CellStatus; tooltip?: string };
  inspectorio: { text: string; status: CellStatus; tooltip?: string };
  tradebeyond: { text: string; status: CellStatus; tooltip?: string };
  qima: { text: string; status: CellStatus; tooltip?: string };
}

const AI_MATRIX: MatrixRow[] = [
  {
    feature: "Predictive risk scoring",
    carlos: { text: "847 ML features, multi-model ensemble", status: "full" },
    inspectorio: { text: "Paramo risk detection", status: "full" },
    tradebeyond: { text: "PO Line Risk Rating", status: "full" },
    qima: { text: "Risk Radar scorecards", status: "full" },
  },
  {
    feature: "Cited/sourced recommendations",
    carlos: { text: "Full reasoning chains with provenance", status: "full" },
    inspectorio: { text: "Source-backed assessments", status: "full" },
    tradebeyond: { text: "Not documented", status: "none" },
    qima: { text: "Not documented", status: "none" },
  },
  {
    feature: "Autonomous workflow agents",
    carlos: { text: "Graduated autonomy model", status: "full" },
    inspectorio: { text: "Agentic AI for end-to-end tasks", status: "full" },
    tradebeyond: { text: "Not documented", status: "none" },
    qima: { text: "Not documented", status: "none" },
  },
  {
    feature: "Natural language query",
    carlos: { text: "Contextual NLP with explanation", status: "full" },
    inspectorio: { text: "Conversational AI assistant", status: "full" },
    tradebeyond: { text: "AI Chatbot for vendors", status: "partial" },
    qima: { text: "Not documented", status: "none" },
  },
  {
    feature: "Document auto-processing",
    carlos: { text: "Multi-framework extraction", status: "full" },
    inspectorio: { text: "Multi-language, cross-reference", status: "full" },
    tradebeyond: { text: "Chain of Custody doc linking", status: "partial" },
    qima: { text: "AI report summaries", status: "partial" },
  },
  {
    feature: "Explainability / reasoning",
    carlos: { text: "Full chains + confidence ranges + downstream", status: "full" },
    inspectorio: { text: "Citations + source references", status: "partial" },
    tradebeyond: { text: "Contributing factors shown", status: "partial" },
    qima: { text: "Risk factors visible", status: "partial" },
  },
  {
    feature: "EU DPP readiness",
    carlos: { text: "Multi-framework validation (2027 architected)", status: "full" },
    inspectorio: { text: "End-to-end traceability; dedicated DPP", status: "partial" },
    tradebeyond: { text: "Adjacent only (Chain of Custody)", status: "none" },
    qima: { text: "Thought leadership only", status: "none" },
  },
  {
    feature: "Supply chain mapping",
    carlos: { text: "Digital intelligence layer", status: "partial" },
    inspectorio: { text: "Network of 15,000+ suppliers", status: "full" },
    tradebeyond: { text: "Nth-tier automated mapping", status: "full" },
    qima: { text: "2,500+ owned inspectors", status: "full" },
  },
  {
    feature: "Scenario simulation",
    carlos: { text: "What-if modelling with confidence", status: "full" },
    inspectorio: { text: "—", status: "none" },
    tradebeyond: { text: "—", status: "none" },
    qima: { text: "—", status: "none" },
  },
  {
    feature: "Care labelling AI",
    carlos: { text: "Automated compliance labelling", status: "full" },
    inspectorio: { text: "—", status: "none" },
    tradebeyond: { text: "—", status: "none" },
    qima: { text: "—", status: "none" },
  },
  {
    feature: "Downstream impact",
    carlos: { text: "Change propagation tracing", status: "full" },
    inspectorio: { text: "—", status: "none" },
    tradebeyond: { text: "—", status: "none" },
    qima: { text: "—", status: "none" },
  },
  {
    feature: "Multi-framework validation",
    carlos: { text: "bluesign + OEKO-TEX + ZDHC simultaneous", status: "full" },
    inspectorio: { text: "Basic compliance tracking", status: "partial" },
    tradebeyond: { text: "—", status: "none" },
    qima: { text: "—", status: "none" },
  },
  {
    feature: "Confidence ranges",
    carlos: { text: "Probability distributions, not point estimates", status: "full" },
    inspectorio: { text: "—", status: "none" },
    tradebeyond: { text: "—", status: "none" },
    qima: { text: "—", status: "none" },
  },
  {
    feature: "Component N:M linking",
    carlos: { text: "Complex product structure mapping", status: "full" },
    inspectorio: { text: "—", status: "none" },
    tradebeyond: { text: "—", status: "none" },
    qima: { text: "—", status: "none" },
  },
];

const MATRIX_SCORES = { carlos: "14/16", inspectorio: "9/16", tradebeyond: "5/16", qima: "3.5/16" };

/* ─── Timeline Data ─── */

const TIMELINE = [
  {
    year: "2025",
    events: [
      "Inspectorio launches Paramo AI + DPP content",
      "QIMA runs DPP webinars",
      "TradeBeyond launches AI Chain of Custody",
    ],
  },
  {
    year: "2026",
    label: "NOW",
    events: [
      "Inspectorio claims \"brands already using Inspectorio for DPP\"",
      "CARLOS builds multi-framework validation",
      "EU delegated acts being finalised",
    ],
  },
  {
    year: "2027",
    events: [
      "EU DPP mandatory for priority product groups (batteries, industrial equipment)",
      "CARLOS target: simultaneous multi-framework validation live",
    ],
  },
  {
    year: "2028–30",
    events: ["Phased expansion to textiles, electronics, broader product categories"],
  },
];

/* ─── Regulatory Demand Data ─── */

interface RegFeature {
  feature: string;
  regulation: "CSRD" | "EUDR" | "DPP" | "UFLPA";
  primaryUser: string;
  urgency: "high" | "med" | "low";
  readiness: string;
}

const REGULATORY_FEATURES: RegFeature[] = [
  { feature: "Scope 3 emissions data collection", regulation: "CSRD", primaryUser: "Sustainability Manager", urgency: "high", readiness: "Low" },
  { feature: "Double materiality assessment tooling", regulation: "CSRD", primaryUser: "CFO / ESG Lead", urgency: "high", readiness: "Very Low" },
  { feature: "Auditor-ready data lineage trails", regulation: "CSRD", primaryUser: "External Auditor", urgency: "high", readiness: "Low" },
  { feature: "Geo-located plot-level traceability", regulation: "EUDR", primaryUser: "Procurement Lead", urgency: "high", readiness: "Very Low" },
  { feature: "Deforestation risk satellite overlay", regulation: "EUDR", primaryUser: "Compliance Officer", urgency: "high", readiness: "None" },
  { feature: "Due diligence statement generation", regulation: "EUDR", primaryUser: "Legal / Compliance", urgency: "med", readiness: "Low" },
  { feature: "Batch-level product passport creation", regulation: "DPP", primaryUser: "Product Manager", urgency: "med", readiness: "Very Low" },
  { feature: "Interoperable data exchange API", regulation: "DPP", primaryUser: "IT / Integration", urgency: "med", readiness: "None" },
  { feature: "Circularity & repair score tracking", regulation: "DPP", primaryUser: "Sustainability Team", urgency: "low", readiness: "None" },
  { feature: "Forced labor rebuttable presumption engine", regulation: "UFLPA", primaryUser: "Trade Compliance", urgency: "high", readiness: "Very Low" },
  { feature: "Multi-tier supplier origin mapping", regulation: "UFLPA", primaryUser: "Supply Chain Lead", urgency: "high", readiness: "Low" },
  { feature: "Evidence chain document vault", regulation: "UFLPA", primaryUser: "Legal Counsel", urgency: "med", readiness: "Low" },
];

const REG_COLORS: Record<string, string> = {
  CSRD: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  EUDR: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  DPP: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  UFLPA: "bg-orange-500/10 text-orange-400 border-orange-500/30",
};

/* ─── White Space Data ─── */

interface WhiteSpaceItem {
  rank: number;
  feature: string;
  description: string;
  regulation: string;
  opportunity: string;
}

const WHITE_SPACE: WhiteSpaceItem[] = [
  { rank: 1, feature: "Plot-Level Geolocation Traceability", description: "Track raw materials to specific GPS coordinates, not just supplier entities.", regulation: "EUDR", opportunity: "No TIC platform offers sub-supplier geo-tracing." },
  { rank: 2, feature: "Multi-Framework Simultaneous Validation", description: "Validate bluesign + OEKO-TEX + ZDHC in a single pass.", regulation: "DPP / Cross-reg", opportunity: "All platforms validate frameworks sequentially." },
  { rank: 3, feature: "Predictive Compliance Forecasting", description: "AI models predicting regulatory non-compliance 6–12 months ahead.", regulation: "All", opportunity: "Current tools are reactive, not predictive." },
  { rank: 4, feature: "Automated DPP Data Assembly", description: "Auto-populate Digital Product Passports from existing test/audit data.", regulation: "DPP", opportunity: "Manual data assembly is the industry norm." },
  { rank: 5, feature: "Scope 3 Emission Attribution Engine", description: "Attribute emissions to specific products, not just suppliers.", regulation: "CSRD", opportunity: "Product-level attribution is unsolved at scale." },
  { rank: 6, feature: "Deforestation Risk Satellite Overlay", description: "Real-time satellite imagery integrated into supplier risk scoring.", regulation: "EUDR", opportunity: "Separate tooling exists but not integrated into TIC." },
  { rank: 7, feature: "Scenario Simulation Engine", description: "Model 'what-if' scenarios for supplier changes and regulation shifts.", regulation: "Cross-reg", opportunity: "No TIC platform offers simulation capabilities." },
  { rank: 8, feature: "Forced Labor Evidence Chain Builder", description: "Structured evidence packages meeting UFLPA rebuttable presumption standard.", regulation: "UFLPA", opportunity: "Legal teams assemble evidence manually." },
  { rank: 9, feature: "Circularity & Repairability Scoring", description: "Quantified scores for product lifecycle and repair potential.", regulation: "DPP", opportunity: "Emerging requirement with zero tooling." },
  { rank: 10, feature: "Cross-Regulation Impact Analyzer", description: "Show how one regulatory change cascades across all applicable frameworks.", regulation: "All", opportunity: "Siloed compliance is the industry default." },
];

/* ─── Sub-components ─── */

function StatusIcon({ status }: { status: CellStatus }) {
  if (status === "full") return <Check className="h-4 w-4 text-accent-green" />;
  if (status === "partial") return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  return <X className="h-4 w-4 text-muted-foreground/50" />;
}

function MatrixCell({ cell }: { cell: MatrixRow[keyof Pick<MatrixRow, "carlos" | "inspectorio" | "tradebeyond" | "qima">] }) {
  const c = cell as { text: string; status: CellStatus; tooltip?: string };
  const inner = (
    <span className="inline-flex items-center gap-1.5">
      <StatusIcon status={c.status} />
      <span className={c.status === "full" ? "text-foreground" : c.status === "partial" ? "text-yellow-500" : "text-muted-foreground/60"}>
        {c.text}
      </span>
    </span>
  );
  if (c.tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild><span className="cursor-help">{inner}</span></TooltipTrigger>
        <TooltipContent className="max-w-xs text-xs"><p>{c.tooltip}</p></TooltipContent>
      </Tooltip>
    );
  }
  return inner;
}

function BattleCardComponent({ card }: { card: BattleCard }) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow || !ref.current) return;
    printWindow.document.write(`
      <html><head><title>${card.name} Battlecard</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 24px; color: #1a1a2e; }
        h1 { font-size: 20px; border-bottom: 3px solid ${card.color}; padding-bottom: 8px; }
        h2 { font-size: 14px; color: #555; margin-top: 16px; }
        h3 { font-size: 13px; margin: 12px 0 4px; }
        ul { padding-left: 16px; margin: 4px 0; }
        li { font-size: 12px; margin: 3px 0; line-height: 1.5; }
        .tagline { font-style: italic; color: #666; margin-bottom: 12px; }
        .section { margin-bottom: 12px; }
        .objection { background: #f5f5f5; padding: 8px 12px; border-radius: 6px; margin: 6px 0; font-size: 12px; }
        .objection strong { color: #333; }
        @media print { body { padding: 0; } }
      </style></head><body>
        <h1>${card.name} Battlecard</h1>
        <p class="tagline">${card.tagline}</p>
        <div class="section"><h2>Quick Facts</h2><ul>${card.quickFacts.map((f) => `<li>${f}</li>`).join("")}</ul></div>
        <div class="section"><h2>Where They're Strong</h2><ul>${card.strengths.map((s) => `<li>✅ ${s}</li>`).join("")}</ul></div>
        <div class="section"><h2>Where They Fall Short (CARLOS Advantage)</h2><ul>${card.weaknesses.map((w) => `<li>❌ ${w}</li>`).join("")}</ul></div>
        <div class="section"><h2>Win Themes</h2><ul>${card.winThemes.map((t) => `<li>${t}</li>`).join("")}</ul></div>
        <div class="section"><h2>Objection Handlers</h2>${card.objections.map((o) => `<div class="objection"><strong>"${o.claim}"</strong><br/>→ ${o.response}</div>`).join("")}</div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div ref={ref} id={`battlecard-${card.id}`}>
      <AccordionItem value={card.id} className="border rounded-lg overflow-hidden mb-4">
        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30">
          <div className="flex items-center gap-3 text-left">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: card.color }} />
            <div>
              <span className="font-display font-semibold text-foreground">{card.name}</span>
              <span className="text-sm text-muted-foreground ml-3 italic">{card.tagline}</span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{card.header}</p>
              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5 text-xs">
                <Printer className="h-3.5 w-3.5" />
                Print
              </Button>
            </div>

            <div>
              <h4 className="text-sm font-display font-semibold text-foreground mb-2">Quick Facts</h4>
              <ul className="space-y-1">
                {card.quickFacts.map((f, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>{f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-display font-semibold text-accent-green mb-2">✅ Where They're Strong</h4>
                <ul className="space-y-1">
                  {card.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-accent-green mt-0.5 shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-display font-semibold text-destructive mb-2">❌ CARLOS Advantage</h4>
                <ul className="space-y-1">
                  {card.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                      <X className="h-3.5 w-3.5 text-destructive/60 mt-0.5 shrink-0" />{w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-display font-semibold text-primary mb-2">🎯 Win Themes</h4>
              <div className="space-y-2">
                {card.winThemes.map((t, i) => (
                  <p key={i} className="text-sm text-foreground/90 italic pl-4 border-l-2 border-primary/30">{t}</p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-display font-semibold text-foreground mb-2">💬 Objection Handlers</h4>
              <div className="space-y-3">
                {card.objections.map((o, i) => (
                  <Card key={i} className="border-border/30 bg-muted/30">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-foreground mb-1">If they say: "{o.claim}"</p>
                      <p className="text-sm text-muted-foreground italic">→ {o.response}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

/* ─── Regulatory Map Tab ─── */

function RegulatoryMapTab() {
  const [regFilter, setRegFilter] = useState<string>("All");
  const filtered = regFilter === "All" ? REGULATORY_FEATURES : REGULATORY_FEATURES.filter((f) => f.regulation === regFilter);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">Regulatory Feature Demand Matrix</h2>
      <p className="text-sm text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
        Mapping EU & Global regulations to concrete platform capabilities. The shift from "test reporting" to "dynamic compliance intelligence."
      </p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {["All", "CSRD", "EUDR", "DPP", "UFLPA"].map((reg) => (
          <Button
            key={reg}
            variant={regFilter === reg ? "default" : "outline"}
            size="sm"
            onClick={() => setRegFilter(reg)}
            className="text-xs"
          >
            {reg === "All" && <Filter className="h-3 w-3 mr-1" />}
            {reg}
          </Button>
        ))}
      </div>

      <Card className="overflow-hidden border-border/60">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#334155]">
                <TableHead className="text-foreground font-display text-sm">Feature</TableHead>
                <TableHead className="text-foreground font-display text-sm">Regulation</TableHead>
                <TableHead className="text-foreground font-display text-sm">Primary User</TableHead>
                <TableHead className="text-foreground font-display text-sm text-center">Urgency</TableHead>
                <TableHead className="text-foreground font-display text-sm text-center">Market Readiness</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row, i) => (
                <TableRow key={row.feature} className={i % 2 === 0 ? "bg-[#1E293B]" : "bg-[#1E293B]/60"}>
                  <TableCell className="font-medium text-foreground text-sm">{row.feature}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${REG_COLORS[row.regulation] || ""}`}>
                      {row.regulation}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{row.primaryUser}</TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                      row.urgency === "high" ? "bg-red-500/15 text-red-400" :
                      row.urgency === "med" ? "bg-yellow-500/15 text-yellow-400" :
                      "bg-emerald-500/15 text-emerald-400"
                    }`}>
                      {row.urgency === "high" ? "High" : row.urgency === "med" ? "Medium" : "Low"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">{row.readiness}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Implications */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-foreground mb-3">Implication for Product Teams</h3>
            <ul className="space-y-2">
              <li className="text-sm text-foreground/80 flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Data Lineage:</strong> Every feature must support verifiable "auditor-ready" data trails for CSRD/CSDDD.</span>
              </li>
              <li className="text-sm text-foreground/80 flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Granularity:</strong> Shift from "Supplier" entities to "Plot-of-land" (EUDR) or "Batch-item" (DPP) entities.</span>
              </li>
              <li className="text-sm text-foreground/80 flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span><strong>Interoperability:</strong> API-first strategy for DPP data exchange with external circularity platforms.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-foreground mb-3">Platform Readiness Gap</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Current portals lack the entity-relationship depth for multi-tier traceability. QIMAone and Inspectorio are closest on workflow, but lack the geolocation-specific risk modules required for EUDR. No platform currently offers batch-level DPP assembly or forced-labor evidence chain tooling.
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

/* ─── White Space Tab ─── */

function WhiteSpaceTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">The Top 10 White Space Opportunities</h2>
      <p className="text-sm text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
        Essential features currently missing or under-developed across all major TIC portals. Each represents a first-mover advantage.
      </p>

      <div className="space-y-4 max-w-4xl mx-auto">
        {WHITE_SPACE.map((item, i) => (
          <motion.div
            key={item.rank}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <Card className="border-border/40 hover:border-primary/30 transition-colors">
              <CardContent className="p-5 flex gap-5">
                {/* Rank */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-sm font-display font-bold text-primary">{item.rank}</span>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-display font-semibold text-foreground text-sm">{item.feature}</h3>
                    <Badge variant="outline" className="text-[10px]">{item.regulation}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <p className="text-xs text-primary/80 italic flex items-start gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    {item.opportunity}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Company Database Tab ─── */

function CompanyDatabaseTab() {
  const [sortField, setSortField] = useState<"name" | "fundingAmount" | "headcountNumber">("fundingAmount");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("desc"); }
  };

  const filtered = categoryFilter === "All"
    ? TIC_COMPANIES
    : TIC_COMPANIES.filter((c) => c.category === categoryFilter);

  const sorted = [...filtered].sort((a, b) => {
    const v = sortDir === "asc" ? 1 : -1;
    return (a[sortField] > b[sortField] ? 1 : -1) * v;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">TIC Market Company Database</h2>
      <p className="text-sm text-muted-foreground text-center mb-2 max-w-2xl mx-auto">
        10 profiled companies from the TIC Market Database — sortable by funding, headcount, and category.
      </p>
      <p className="text-xs text-muted-foreground/60 text-center mb-8">
        Source:{" "}
        <a
          href="https://github.com/alvarodenicolasizquierdo/tic-market-database"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/70 hover:text-primary underline inline-flex items-center gap-1"
        >
          tic-market-database <ExternalLink className="h-3 w-3" />
        </a>
      </p>

      {/* Filters & Sort */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {["All", "digital-native", "power-player"].map((cat) => (
          <Button
            key={cat}
            variant={categoryFilter === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter(cat)}
            className="text-xs"
          >
            {cat === "All" ? "All Companies" : CATEGORY_CONFIG[cat]?.label || cat}
          </Button>
        ))}
        <div className="w-px bg-border/40 mx-1" />
        {([
          { field: "fundingAmount" as const, label: "Funding", icon: DollarSign },
          { field: "headcountNumber" as const, label: "Headcount", icon: Users },
          { field: "name" as const, label: "Name", icon: Building2 },
        ]).map(({ field, label, icon: Icon }) => (
          <Button
            key={field}
            variant="ghost"
            size="sm"
            onClick={() => toggleSort(field)}
            className={`text-xs gap-1 ${sortField === field ? "text-primary" : ""}`}
          >
            <Icon className="h-3 w-3" />
            {label}
            {sortField === field && <ArrowUpDown className="h-3 w-3" />}
          </Button>
        ))}
      </div>

      {/* Company Cards */}
      <div className="grid gap-4 max-w-5xl mx-auto">
        {sorted.map((company, i) => {
          const threat = THREAT_LEVEL_CONFIG[company.threatLevel];
          const cat = CATEGORY_CONFIG[company.category];
          const isExpanded = expandedId === company.id;

          return (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Card
                className={`border-border/40 hover:border-primary/20 transition-all cursor-pointer ${isExpanded ? "border-primary/30" : ""}`}
                onClick={() => setExpandedId(isExpanded ? null : company.id)}
              >
                <CardContent className="p-5">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-display font-bold text-foreground text-base">{company.name}</h3>
                        <Badge variant="outline" className={`text-[10px] ${cat?.color || ""}`}>
                          {cat?.label}
                        </Badge>
                        <Badge variant="outline" className={`text-[10px] ${threat?.color || ""}`}>
                          {threat?.label} Threat
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{company.coreProduct}</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </div>

                  {/* Key metrics row */}
                  <div className="flex flex-wrap gap-4 mt-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-primary/60" /> {company.funding}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3 text-primary/60" /> {company.headcount}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-primary/60" /> {company.headquarters}
                    </span>
                    {company.founded && (
                      <span className="text-xs text-muted-foreground">Est. {company.founded}</span>
                    )}
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-border/30 space-y-3"
                    >
                      {company.valuation && (
                        <div>
                          <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Valuation</span>
                          <p className="text-sm text-foreground">{company.valuation}</p>
                        </div>
                      )}
                      {company.revenue && (
                        <div>
                          <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Revenue</span>
                          <p className="text-sm text-foreground">{company.revenue}</p>
                        </div>
                      )}
                      {company.keyFunding && (
                        <div>
                          <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Key Funding</span>
                          <p className="text-sm text-foreground">{company.keyFunding}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Key Clients</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {company.keyClients.map((c) => (
                            <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Strategic Position</span>
                        <p className="text-sm text-foreground/80 leading-relaxed mt-1">{company.strategicPosition}</p>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Market Analysis Tab ─── */

function MarketAnalysisTab() {
  const orchestrators = TIC_COMPANIES.filter(c => c.quadrant === 'orchestrator');
  const dataEngines = TIC_COMPANIES.filter(c => c.quadrant === 'data-engine');
  const nicheExperts = TIC_COMPANIES.filter(c => c.quadrant === 'niche-expert');
  const structuralThreats = TIC_COMPANIES.filter(c => c.threatLevel === 'structural');
  const hybridThreats = TIC_COMPANIES.filter(c => c.threatLevel === 'hybrid');
  const networkThreats = TIC_COMPANIES.filter(c => c.threatLevel === 'network');
  const tacticalThreats = TIC_COMPANIES.filter(c => c.threatLevel === 'tactical');
  const totalFunding = TIC_COMPANIES.reduce((sum, c) => sum + c.fundingAmount, 0);
  const totalHeadcount = TIC_COMPANIES.reduce((sum, c) => sum + c.headcountNumber, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">Market Analysis</h2>
      <p className="text-sm text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
        Strategic insights, funding landscape, and competitive positioning in the TIC sector
      </p>

      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-border/40">
            <CardContent className="p-5 text-center">
              <p className="text-2xl font-display font-bold text-primary">${totalFunding.toFixed(0)}M</p>
              <p className="text-xs text-muted-foreground mt-1">Total Funding</p>
            </CardContent>
          </Card>
          <Card className="border-border/40">
            <CardContent className="p-5 text-center">
              <p className="text-2xl font-display font-bold text-primary">{totalHeadcount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Total Headcount</p>
            </CardContent>
          </Card>
          <Card className="border-border/40">
            <CardContent className="p-5 text-center">
              <p className="text-2xl font-display font-bold text-primary">{TIC_COMPANIES.filter(c => c.valuation?.includes('Billion')).length}</p>
              <p className="text-xs text-muted-foreground mt-1">Unicorns ($1B+)</p>
            </CardContent>
          </Card>
          <Card className="border-border/40">
            <CardContent className="p-5 text-center">
              <p className="text-2xl font-display font-bold text-primary">~29%</p>
              <p className="text-xs text-muted-foreground mt-1">Digital CAGR</p>
            </CardContent>
          </Card>
        </div>

        {/* Executive Summary */}
        <Card className="border-border/60">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Executive Summary
            </h3>
            <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
              <p>
                The TIC industry is undergoing a structural transformation from manual, periodic audits to continuous, AI-driven assurance.
                While the traditional market grows at 3-5% CAGR, the digital-native platform segment is expanding at over 20% annually.
              </p>
              <p>
                Our analysis reveals a market that is both more heavily capitalized and more concentrated than initially understood,
                with significant funding discrepancies and critical omissions in standard market scans.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Funding Comparison Chart */}
        <Card className="border-border/60">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Funding Landscape
            </h3>
            <img
              src="/charts/funding_comparison.png"
              alt="TIC-Tech Funding: Gemini Claims vs Verified"
              className="w-full rounded-lg border border-border/30 mb-4"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground mb-3">
              Source: Crunchbase, CB Insights, PitchBook, press releases | Feb 2026
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Forensic analysis reveals material discrepancies between initial claims and verified funding data.
              Altana AI's verified funding is nearly double what was initially reported, placing it in a different strategic weight class.
            </p>
          </CardContent>
        </Card>

        {/* VC Funding Trajectory */}
        <Card className="border-border/60">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-primary" />
              Venture Capital Trajectory
            </h3>
            <img
              src="/charts/tic_funding_trajectory.png"
              alt="Supply Chain / TIC Tech VC Funding (2021-2025)"
              className="w-full rounded-lg border border-border/30 mb-4"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground mb-3">
              Source: PitchBook, MicroVentures | 2025 projected from Q3 run-rate
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              After a peak in 2021 driven by the e-commerce boom, funding contracted in 2023 during the broader market reset.
              Investment rebounded in 2024-2025 with clear focus on AI-native platforms.
            </p>
          </CardContent>
        </Card>


        {/* Competitive Positioning Matrix */}
        <Card className="border-border/60">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Radar className="h-5 w-5 text-primary" />
              Competitive Positioning by Quadrant
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30 text-[10px]">Critical</Badge>
                  Orchestrators
                </h4>
                <p className="text-xs text-muted-foreground mb-3">High depth, high network effects</p>
                <div className="space-y-2">
                  {orchestrators.map(c => (
                    <div key={c.id} className="p-2 bg-muted/20 rounded text-sm">
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{c.funding}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 text-[10px]">Moderate</Badge>
                  Data Engines
                </h4>
                <p className="text-xs text-muted-foreground mb-3">Intelligence providers</p>
                <div className="space-y-2">
                  {dataEngines.map(c => (
                    <div key={c.id} className="p-2 bg-muted/20 rounded text-sm">
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{c.funding}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px]">Focused</Badge>
                  Niche Experts
                </h4>
                <p className="text-xs text-muted-foreground mb-3">Deep vertical solutions</p>
                <div className="space-y-2">
                  {nicheExperts.map(c => (
                    <div key={c.id} className="p-2 bg-muted/20 rounded text-sm">
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{c.funding}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Threat Assessment */}
        <Card className="border-border/60">
          <CardContent className="p-6">
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Strategic Threat Assessment
            </h3>
            <div className="space-y-5">
              {[
                { label: "Structural", threats: structuralThreats, desc: "Platform-level disruption — could make per-test billing obsolete", color: "bg-red-500/10 border-red-500/20" },
                { label: "Hybrid", threats: hybridThreats, desc: "Competing on both physical inspection AND digital platform", color: "bg-orange-500/10 border-orange-500/20" },
                { label: "Network", threats: networkThreats, desc: "Utility status — deeply embedded in procurement workflows", color: "bg-purple-500/10 border-purple-500/20" },
                { label: "Tactical", threats: tacticalThreats, desc: "Segment competition — potential acquisition targets", color: "bg-emerald-500/10 border-emerald-500/20" },
              ].map(({ label, threats, desc, color }) => (
                <div key={label}>
                  <h4 className="font-display font-semibold text-foreground mb-1">
                    {label} Threats ({threats.length})
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">{desc}</p>
                  <div className="space-y-2">
                    {threats.map(c => (
                      <Card key={c.id} className={`border ${color}`}>
                        <CardContent className="p-3">
                          <p className="text-sm font-medium text-foreground">{c.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{c.strategicPosition.slice(0, 150)}…</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

/* ─── Market Report Tab ─── */

function MarketReportTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">Consolidated Market Report</h2>
      <p className="text-sm text-muted-foreground text-center mb-2 max-w-2xl mx-auto">
        The TIC Sector's Digital Reckoning — a unified market analysis synthesized from multiple sources.
      </p>
      <p className="text-xs text-muted-foreground/60 text-center mb-8">
        Source:{" "}
        <a
          href="https://github.com/alvarodenicolasizquierdo/tic-market-database"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/70 hover:text-primary underline inline-flex items-center gap-1"
        >
          tic-market-database <ExternalLink className="h-3 w-3" />
        </a>
      </p>

      <Card className="border-border/60 max-w-4xl mx-auto">
        <CardContent className="p-8">
          <ScrollArea className="h-[70vh]">
            <div className="prose prose-invert prose-sm max-w-none space-y-6">
              {/* Executive Summary */}
              <section>
                <h3 className="font-display text-lg font-bold text-foreground border-b border-border/30 pb-2">Executive Summary</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  The TIC industry, valued at over €300 billion, is at a critical inflection point. The sector is undergoing a structural transformation from manual, periodic audits to continuous, AI-driven assurance. While the traditional market grows at 3-5% CAGR, the digital-native platform segment is expanding at over 20% annually.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <Card className="border-border/30 bg-muted/20">
                    <CardContent className="p-4">
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Market Growth</h4>
                      <p className="text-sm text-foreground/80">Digital assurance growing at ~29% CAGR — 8× faster than traditional TIC services.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20">
                    <CardContent className="p-4">
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Funding Landscape</h4>
                      <p className="text-sm text-foreground/80">Altana AI verified at ~$622M (not $343M reported). Capital concentrating in top-tier platforms.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Key Findings */}
              <section>
                <h3 className="font-display text-lg font-bold text-foreground border-b border-border/30 pb-2">Key Findings</h3>
                <ul className="space-y-3">
                  {[
                    { title: "A Tale of Two TICs", text: "Digital assurance at ~29% CAGR vs traditional TIC at 3-5%. A structural shift, not cyclical." },
                    { title: "Major Players Omitted", text: "Assent, IntegrityNext, QIMA, Sedex collectively represent $600M+ in funding and ~5,800 employees." },
                    { title: "New Breed of Competitor", text: "Altana AI builds a global trade OS; EcoVadis is a de facto sustainability utility; QIMA integrates physical + digital." },
                    { title: "Existential Threat to Big Three", text: "SGS, Bureau Veritas, Intertek face systemic shift — multi-billion digital programs may be insufficient against data network effects." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-semibold text-foreground">{item.title}:</span>{" "}
                        <span className="text-sm text-foreground/80">{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Strategic Implications */}
              <section>
                <h3 className="font-display text-lg font-bold text-foreground border-b border-border/30 pb-2">Strategic Implications</h3>
                <div className="space-y-4">
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">The Regulatory Supercycle</h4>
                      <p className="text-sm text-foreground/80">CSRD, CSDDD, EUDR — deep-tier supply chain visibility is now a legal necessity. Compliance shifted from cost center to market access prerequisite.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">The Resilience Imperative</h4>
                      <p className="text-sm text-foreground/80">Post-COVID shift from "just-in-time" to "just-in-case" requires predictive, real-time visibility that periodic audits cannot provide.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20">
                    <CardContent className="p-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">AI & Data Network Effects</h4>
                      <p className="text-sm text-foreground/80">Platform value increases exponentially with each participant, creating competitive moats that traditional players cannot replicate.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Market Size */}
              <section>
                <h3 className="font-display text-lg font-bold text-foreground border-b border-border/30 pb-2">Market Size & Trajectory</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-4">
                      <p className="text-2xl font-display font-bold text-primary">€300B</p>
                      <p className="text-xs text-muted-foreground">Total TIC market (2024)</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-4">
                      <p className="text-2xl font-display font-bold text-primary">$7.7B</p>
                      <p className="text-xs text-muted-foreground">Digital segment by 2029</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/30 bg-muted/20 text-center">
                    <CardContent className="p-4">
                      <p className="text-2xl font-display font-bold text-primary">~29%</p>
                      <p className="text-xs text-muted-foreground">Digital CAGR</p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Page ─── */

const ALL_TABS = ["landscape", "companies", "analysis", "battlecards", "matrix", "compare", "report", "regulatory", "whitespace", "timeline"];

const ComparePage = lazy(() => import("./Compare"));

export default function MarketIntelligencePage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const hash = location.hash.replace("#", "");
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || hash || "landscape");

  useEffect(() => { tagScreen("competitive"); return startEngagementTimer('competitive'); }, []);
  useEffect(() => {
    const target = tabParam || hash;
    if (target && ALL_TABS.includes(target)) {
      setActiveTab(target);
    }
  }, [hash, tabParam]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-tht-dark py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="secondary" className="text-xs tracking-wide uppercase mb-4">
              Internal Only
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
              Market Intelligence
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="mt-4 text-lg text-muted-foreground">
            Source-backed competitive analysis with positioning, battlecards, and AI feature comparisons.
          </motion.p>
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); trackSectionExplored(v); }}>
          <div className="flex justify-center mb-10 overflow-x-auto">
            <TabsList className="grid grid-cols-5 md:grid-cols-10">
              <TabsTrigger value="landscape" className="gap-1.5 text-xs"><Radar className="h-3.5 w-3.5" /> Landscape</TabsTrigger>
              <TabsTrigger value="companies" className="gap-1.5 text-xs"><Database className="h-3.5 w-3.5" /> Companies</TabsTrigger>
              <TabsTrigger value="analysis" className="gap-1.5 text-xs"><ArrowUpDown className="h-3.5 w-3.5" /> Analysis</TabsTrigger>
              <TabsTrigger value="battlecards" className="gap-1.5 text-xs"><Swords className="h-3.5 w-3.5" /> Battlecards</TabsTrigger>
              <TabsTrigger value="matrix" className="gap-1.5 text-xs"><Table2 className="h-3.5 w-3.5" /> AI Matrix</TabsTrigger>
              <TabsTrigger value="compare" className="gap-1.5 text-xs"><GitCompare className="h-3.5 w-3.5" /> Compare</TabsTrigger>
              <TabsTrigger value="report" className="gap-1.5 text-xs"><FileText className="h-3.5 w-3.5" /> Report</TabsTrigger>
              <TabsTrigger value="regulatory" className="gap-1.5 text-xs"><ShieldCheck className="h-3.5 w-3.5" /> Reg Map</TabsTrigger>
              <TabsTrigger value="whitespace" className="gap-1.5 text-xs"><Lightbulb className="h-3.5 w-3.5" /> White Space</TabsTrigger>
              <TabsTrigger value="timeline" className="gap-1.5 text-xs"><CalendarRange className="h-3.5 w-3.5" /> Timeline</TabsTrigger>
            </TabsList>
          </div>

          {/* ── Landscape ── */}
          <TabsContent value="landscape">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card className="border-border/60">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">Market Positioning — 2×2 Quadrant</h2>
                  <p className="text-xs text-muted-foreground text-center mb-8">Now showing all 10 profiled competitors + CARLOS</p>
                  {/* Quadrant Chart */}
                  <div className="relative mx-auto" style={{ maxWidth: 700, aspectRatio: "1" }}>
                    {/* Axes */}
                    <div className="absolute inset-0 border border-border/30 rounded-lg">
                      {/* Grid lines */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/20" />
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-border/20" />
                      {/* Axis labels */}
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-medium">Field Capability →</span>
                      <span className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground font-medium whitespace-nowrap">AI Depth →</span>
                      {/* Quadrant labels */}
                      <span className="absolute top-3 left-3 text-[10px] text-muted-foreground/50 uppercase tracking-wider">Strategic AI / No Field</span>
                      <span className="absolute top-3 right-3 text-[10px] text-muted-foreground/50 uppercase tracking-wider">Strategic AI / Field</span>
                      <span className="absolute bottom-3 left-3 text-[10px] text-muted-foreground/50 uppercase tracking-wider">Operational / No Field</span>
                      <span className="absolute bottom-3 right-3 text-[10px] text-muted-foreground/50 uppercase tracking-wider">Operational / Field</span>
                    </div>
                    {/* Players */}
                    {QUADRANT_PLAYERS.map((p, idx) => {
                      const battlecardId = BATTLECARDS.find((b) => b.name.toLowerCase() === p.name.toLowerCase())?.id;
                      const isClickable = !!battlecardId;
                      return (
                        <motion.div
                          key={p.name}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 + idx * 0.06, type: "spring" }}
                          className={`absolute flex flex-col items-center -translate-x-1/2 translate-y-1/2 ${isClickable ? "cursor-pointer group" : ""}`}
                          style={{ left: `${p.x}%`, bottom: `${p.y}%` }}
                          onClick={() => {
                            if (battlecardId) {
                              setActiveTab("battlecards");
                              setTimeout(() => {
                                const el = document.getElementById(`battlecard-${battlecardId}`);
                                el?.scrollIntoView({ behavior: "smooth", block: "center" });
                              }, 300);
                            }
                          }}
                        >
                          <div
                            className={`${p.name === "CARLOS" ? "w-14 h-14" : "w-10 h-10"} rounded-full flex items-center justify-center text-white font-display font-bold shadow-lg border-2 border-white/20 transition-transform ${isClickable ? "group-hover:scale-110 group-hover:shadow-xl" : ""}`}
                            style={{ backgroundColor: p.color, fontSize: p.name === "CARLOS" ? 11 : 9 }}
                          >
                            {p.name.slice(0, 3).toUpperCase()}
                          </div>
                          <span className={`mt-1 font-display font-semibold text-foreground whitespace-nowrap ${p.name === "CARLOS" ? "text-xs" : "text-[10px]"} ${isClickable ? "group-hover:text-primary transition-colors" : ""}`}>{p.name}</span>
                          <span className="text-[9px] text-muted-foreground whitespace-nowrap">{p.label}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                  {/* Callout */}
                  <Card className="mt-12 border-primary/30 bg-primary/5">
                    <CardContent className="p-6 text-center">
                      <p className="text-sm text-foreground leading-relaxed">
                        <strong>CARLOS occupies the only position combining strategic AI depth with TIC domain expertise.</strong>{" "}
                        No other platform operates in the upper quadrant with field-grounded intelligence.
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ── Companies ── */}
          <TabsContent value="companies">
            <CompanyDatabaseTab />
          </TabsContent>

          {/* ── Analysis ── */}
          <TabsContent value="analysis">
            <MarketAnalysisTab />
          </TabsContent>

          {/* ── Battlecards ── */}
          <TabsContent value="battlecards">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">Competitor Battlecards</h2>
              <Accordion type="single" collapsible defaultValue={hash?.startsWith("battlecard-") ? hash.replace("battlecard-", "") : undefined}>
                {BATTLECARDS.map((card) => (
                  <BattleCardComponent key={card.id} card={card} />
                ))}
              </Accordion>
            </motion.div>
          </TabsContent>

          {/* ── AI Matrix ── */}
          <TabsContent value="matrix">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Accordion type="single" collapsible defaultValue="ai-matrix">
                <AccordionItem value="ai-matrix" className="border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30">
                    <h2 className="font-display text-2xl font-bold text-foreground">AI Feature Comparison Matrix</h2>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-0">
                    <TooltipProvider delayDuration={200}>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-[#334155]">
                              <TableHead className="text-foreground font-display text-sm w-[200px]">AI Feature</TableHead>
                              <TableHead className="text-center font-display font-bold" style={{ color: "#00C49F" }}>CARLOS</TableHead>
                              <TableHead className="text-center font-display font-bold" style={{ color: "#FF6B35" }}>Inspectorio</TableHead>
                              <TableHead className="text-center font-display font-bold" style={{ color: "#8884D8" }}>TradeBeyond</TableHead>
                              <TableHead className="text-center font-display font-bold" style={{ color: "#FFBB28" }}>QIMA</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {AI_MATRIX.map((row, i) => (
                              <TableRow key={row.feature} className={i % 2 === 0 ? "bg-[#1E293B]" : "bg-[#1E293B]/60"}>
                                <TableCell className="font-medium text-foreground text-sm">{row.feature}</TableCell>
                                <TableCell className="text-center text-sm"><MatrixCell cell={row.carlos} /></TableCell>
                                <TableCell className="text-center text-sm"><MatrixCell cell={row.inspectorio} /></TableCell>
                                <TableCell className="text-center text-sm"><MatrixCell cell={row.tradebeyond} /></TableCell>
                                <TableCell className="text-center text-sm"><MatrixCell cell={row.qima} /></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                          <TableFooter>
                            <TableRow className="bg-[#334155]">
                              <TableCell className="font-display font-bold text-foreground">Score</TableCell>
                              <TableCell className="text-center font-display font-bold" style={{ color: "#00C49F" }}>{MATRIX_SCORES.carlos}</TableCell>
                              <TableCell className="text-center font-display font-bold" style={{ color: "#FF6B35" }}>{MATRIX_SCORES.inspectorio}</TableCell>
                              <TableCell className="text-center font-display font-bold" style={{ color: "#8884D8" }}>{MATRIX_SCORES.tradebeyond}</TableCell>
                              <TableCell className="text-center font-display font-bold" style={{ color: "#FFBB28" }}>{MATRIX_SCORES.qima}</TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>
                      </div>
                    </TooltipProvider>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </TabsContent>

          {/* ── Compare ── */}
          <TabsContent value="compare">
            <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading…</div>}>
              <ComparePage />
            </Suspense>
          </TabsContent>

          {/* ── Market Report ── */}
          <TabsContent value="report">
            <MarketReportTab />
          </TabsContent>

          {/* ── Regulatory Demand Map ── */}
          <TabsContent value="regulatory">
            <RegulatoryMapTab />
          </TabsContent>

          {/* ── White Space ── */}
          <TabsContent value="whitespace">
            <WhiteSpaceTab />
          </TabsContent>

          {/* ── DPP Timeline ── */}
          <TabsContent value="timeline">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">EU Digital Product Passport — 2027 Timeline</h2>
              <div className="relative mx-auto max-w-4xl">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20" />

                <div className="space-y-8">
                  {TIMELINE.map((item, i) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                      className="relative pl-20"
                    >
                      {/* Year badge */}
                      <div className="absolute left-0 flex items-center gap-2">
                        <div className={`w-16 h-8 rounded-full flex items-center justify-center text-sm font-display font-bold ${item.label ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"}`}>
                          {item.year}
                        </div>
                      </div>
                      {/* Dot on timeline */}
                      <div className={`absolute left-[29px] top-2 w-3 h-3 rounded-full border-2 ${item.label ? "bg-primary border-primary" : "bg-card border-primary/40"}`} />

                      <Card className={`border-border/40 ${item.label ? "border-primary/30 bg-primary/5" : ""}`}>
                        <CardContent className="p-4">
                          {item.label && (
                            <Badge className="bg-primary text-primary-foreground text-[10px] mb-2">{item.label}</Badge>
                          )}
                          <ul className="space-y-1">
                            {item.events.map((e, j) => (
                              <li key={j} className="text-sm text-foreground/80 flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                {e}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Footnote */}
                <p className="mt-8 text-xs text-muted-foreground text-center italic max-w-2xl mx-auto">
                  No vendor can claim "full DPP compliance" today — EU delegated acts specifying exact requirements are still being finalised.
                  All claims represent architectural readiness, not certified regulatory compliance.
                </p>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
