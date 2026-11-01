import data from "@/content/claims.json";

export type Claim = { id: string; text: string; verified: boolean; source: string };

const claims = data.claims as Claim[];

export const isDev = process.env.NODE_ENV !== "production";

export function getClaim(id: string): Claim | undefined {
  return claims.find((c) => c.id === id);
}

/** Verified claims, in file order. */
export function verifiedClaims(ids?: string[]): Claim[] {
  const list = ids ? ids.map(getClaim).filter((c): c is Claim => !!c) : claims;
  return list.filter((c) => c.verified);
}

/** Unverified claims, shown only in `npm run dev` as TODO chips. */
export function unverifiedClaims(ids?: string[]): Claim[] {
  const list = ids ? ids.map(getClaim).filter((c): c is Claim => !!c) : claims;
  return list.filter((c) => !c.verified);
}
