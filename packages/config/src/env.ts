export function validateEnv(requiredVars: string[]) {
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export const requiredWebEnvVars = [
  'NEXT_PUBLIC_CONVEX_URL',
  'AUTH_GOOGLE_ID',
  'AUTH_GOOGLE_SECRET',
  'STRIPE_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY'
];

export const requiredNativeEnvVars = [
  'EXPO_PUBLIC_CONVEX_URL',
  'AUTH_GOOGLE_ID',
  'AUTH_GOOGLE_SECRET',
  'REVENUECAT_API_KEY'
];

export const requiredBackendEnvVars = [
  'CONVEX_DEPLOYMENT',
  'AUTH_GOOGLE_ID',
  'AUTH_GOOGLE_SECRET',
  'OPENAI_API_KEY'
];
