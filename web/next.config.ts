import { withReticle } from '@reticlehq/next';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone with only the files the server actually needs, which
  // is what the runtime stage of the Dockerfile copies.
  output: "standalone",
  typedRoutes: true,
};

export default withReticle(nextConfig);
