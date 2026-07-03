export interface JobPosting {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  mode: string;
  datePosted: string;
  validThrough: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  preferred: string[];
  environment: string;
  whyItMatters: string;
}

export const jobs: JobPosting[] = [
  {
    slug: "chiller-operator-columbiana",
    title: "Chiller Operator / Data Center Mechanical Technician",
    department: "Operations",
    location: "Columbiana, AL 35051",
    type: "Full-time",
    mode: "On-site",
    datePosted: "2026-03-02",
    validThrough: "2026-09-30",
    overview:
      "We are seeking an experienced Chiller Operator / Mechanical Technician to support mission-critical cooling infrastructure in a high-availability data center environment. This role is responsible for the operation, monitoring, maintenance, and optimization of chilled water systems and associated mechanical equipment supporting redundant (N+1 / 2N) configurations. The ideal candidate has hands-on experience with industrial chillers, closed-loop cooling systems, pumps, heat exchangers, and control systems.",
    responsibilities: [
      "Operate, start up, shut down, and monitor water-cooled and air-cooled chillers, cooling towers, and pumping systems.",
      "Maintain optimal system performance under continuous load conditions, monitoring flow rates and pressures.",
      "Operate and maintain N+1 and 2N redundant configurations and execute controlled failover procedures.",
      "Maintain and troubleshoot closed-loop chilled water systems, including expansion tanks and loop pressurization.",
      "Perform preventative and corrective maintenance on chillers, pumps, valves, actuators, and VFDs.",
      "Utilize BMS / BAS / SCADA systems for monitoring and respond to alerts and alarms in real time.",
      "Follow all safety protocols, lockout/tagout procedures, and maintain OSHA compliance standards.",
    ],
    qualifications: [
      "5+ years of experience operating and maintaining industrial or data center cooling systems.",
      "Hands-on experience with major chiller manufacturers (e.g., Trane, Carrier, York, Daikin).",
      "Strong understanding of hydronic systems, closed-loop cooling, and redundant mechanical design.",
      "Ability to read P&IDs, mechanical drawings, and electrical schematics.",
      "Experience in mission-critical or Tier III / Tier IV environments preferred.",
    ],
    preferred: [
      "EPA Certification (Universal).",
      "Experience with high-density AI / HPC cooling environments or direct-to-chip liquid cooling.",
      "Background in commissioning support and load bank testing.",
    ],
    environment:
      "24/7 critical infrastructure facility. May require shift work, on-call rotation, and emergency response availability.",
    whyItMatters:
      "This position is critical to ensuring infrastructure reliability, scalability, and operational excellence in a high-performance computing environment.",
  },
  {
    slug: "data-center-mep-engineer-manager",
    title: "Data Center MEP Engineer / MEP Manager",
    department: "Engineering",
    location: "Columbiana, AL",
    type: "Full-time",
    mode: "On-site",
    datePosted: "2026-03-02",
    validThrough: "2026-09-30",
    overview:
      "USDC is looking for a Data Center MEP Engineer / MEP Manager to lead the design, commissioning, and operational oversight of mission-critical mechanical, electrical, and plumbing systems in a high-performance data center facility. The ideal candidate combines deep technical expertise with strong project leadership capabilities across complex infrastructure environments.",
    responsibilities: [
      "Lead MEP engineering design reviews, ensuring compliance with Tier III/IV standards and local codes.",
      "Oversee installation, commissioning, and integration of critical electrical and mechanical systems.",
      "Manage and coordinate with contractors, vendors, and cross-functional teams during build-out and operations phases.",
      "Develop and maintain preventive maintenance programs for all MEP systems including UPS, generators, switchgear, chillers, and fire suppression.",
      "Drive energy efficiency improvements and capacity planning across the facility.",
      "Ensure compliance with all safety, environmental, and regulatory standards.",
      "Provide technical leadership for incident response and root-cause analysis.",
    ],
    qualifications: [
      "Bachelor's degree in Mechanical, Electrical, or related Engineering discipline.",
      "7+ years of experience in MEP engineering, with at least 3 years in data center environments.",
      "Proven track record managing MEP projects from design through commissioning.",
      "Deep understanding of redundant power and cooling architectures (N+1, 2N, 2N+1).",
      "Proficiency with BMS/BAS, SCADA, and CMMS platforms.",
    ],
    preferred: [
      "Professional Engineer (PE) license or equivalent certification.",
      "Experience with high-density compute or AI/HPC infrastructure.",
      "LEED or energy management certifications.",
    ],
    environment:
      "Full-time, on-site role at USDC's Columbiana, AL facility. Occasional travel to other sites may be required.",
    whyItMatters:
      "This role directly shapes the reliability and scalability of USDC's data center infrastructure, ensuring world-class uptime for mission-critical AI workloads.",
  },
  {
    slug: "chiller-operator-north-tonawanda",
    title: "Chiller Operator / Data Center Mechanical Technician",
    department: "Operations",
    location: "1070 Erie Ave, North Tonawanda, NY 14120",
    type: "Full-time",
    mode: "On-site",
    datePosted: "2026-03-02",
    validThrough: "2026-09-30",
    overview:
      "We are seeking an experienced Chiller Operator / Mechanical Technician to support mission-critical cooling infrastructure at our North Tonawanda facility. This role is responsible for the operation, monitoring, maintenance, and optimization of chilled water systems and associated mechanical equipment supporting redundant (N+1 / 2N) configurations.",
    responsibilities: [
      "Operate, start up, shut down, and monitor water-cooled and air-cooled chillers, cooling towers, and pumping systems.",
      "Maintain optimal system performance under continuous load conditions, monitoring flow rates and pressures.",
      "Operate and maintain N+1 and 2N redundant configurations and execute controlled failover procedures.",
      "Maintain and troubleshoot closed-loop chilled water systems, including expansion tanks and loop pressurization.",
      "Perform preventative and corrective maintenance on chillers, pumps, valves, actuators, and VFDs.",
      "Utilize BMS / BAS / SCADA systems for monitoring and respond to alerts and alarms in real time.",
      "Follow all safety protocols, lockout/tagout procedures, and maintain OSHA compliance standards.",
    ],
    qualifications: [
      "5+ years of experience operating and maintaining industrial or data center cooling systems.",
      "Hands-on experience with major chiller manufacturers (e.g., Trane, Carrier, York, Daikin).",
      "Strong understanding of hydronic systems, closed-loop cooling, and redundant mechanical design.",
      "Ability to read P&IDs, mechanical drawings, and electrical schematics.",
      "Experience in mission-critical or Tier III / Tier IV environments preferred.",
    ],
    preferred: [
      "EPA Certification (Universal).",
      "Experience with high-density AI / HPC cooling environments or direct-to-chip liquid cooling.",
      "Background in commissioning support and load bank testing.",
    ],
    environment:
      "24/7 critical infrastructure facility. May require shift work, on-call rotation, and emergency response availability.",
    whyItMatters:
      "This position is critical to ensuring infrastructure reliability, scalability, and operational excellence in a high-performance computing environment.",
  },
];

export function getJobBySlug(slug: string): JobPosting | undefined {
  return jobs.find((j) => j.slug === slug);
}

export function getAllSlugs(): string[] {
  return jobs.map((j) => j.slug);
}
