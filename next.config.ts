import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next dev` kendi kural bloğunu yalnızca CLAUDE.md'ye yazıp AGENT.md ile
  // ayrıştırıyor. Kapalı; aynı bilgi CLAUDE.md ve AGENT.md'de elle duruyor.
  agentRules: false,
};

export default nextConfig;
