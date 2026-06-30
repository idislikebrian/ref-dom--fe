import type { Profile } from "@prisma/client";
import type { DirectoryConnect, DirectoryEntry } from "@/types/directory";
import { getPrisma } from "../../lib/prisma";

type ProfileDirectory = {
  profiles: DirectoryEntry[];
  tags: string[];
  regions: string[];
};

type ConnectProfile = Pick<
  Profile,
  "email" | "website" | "instagram" | "linkedin"
>;

function hasProtocol(value: string) {
  return /^https?:\/\//i.test(value);
}

function ensureUrl(value: string) {
  const trimmed = value.trim();

  if (hasProtocol(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function normalizeSocialUrl(value: string, baseUrl: string) {
  const trimmed = value.trim();

  if (hasProtocol(trimmed)) {
    return trimmed;
  }

  if (trimmed.includes("/")) {
    return ensureUrl(trimmed);
  }

  return `${baseUrl}/${trimmed.replace(/^@/, "")}`;
}

export function normalizeConnect(
  profile: ConnectProfile
): DirectoryConnect | null {
  if (profile.website?.trim()) {
    return {
      label: "Website",
      href: ensureUrl(profile.website),
      type: "social"
    };
  }

  if (profile.instagram?.trim()) {
    return {
      label: "Instagram",
      href: normalizeSocialUrl(profile.instagram, "https://instagram.com"),
      type: "social"
    };
  }

  if (profile.linkedin?.trim()) {
    return {
      label: "LinkedIn",
      href: normalizeSocialUrl(profile.linkedin, "https://linkedin.com/in"),
      type: "social"
    };
  }

  if (profile.email?.trim()) {
    const email = profile.email.trim();

    return {
      label: "Email",
      href: email.startsWith("mailto:") ? email : `mailto:${email}`,
      type: "email"
    };
  }

  return null;
}

function mapProfileToDirectoryEntry(profile: Profile): DirectoryEntry {
  return {
    id: profile.slug,
    name: profile.name,
    role: profile.role,
    city: profile.city,
    country: profile.country,
    region: profile.region ?? profile.country,
    bio: profile.bio ?? "",
    tags: profile.disciplines,
    connect: normalizeConnect(profile)
  };
}

export async function getProfileDirectory(): Promise<ProfileDirectory> {
  const prisma = getPrisma();
  const rows = await prisma.profile.findMany({
    orderBy: {
      name: "asc"
    }
  });
  const profiles = rows.map(mapProfileToDirectoryEntry);

  return {
    profiles,
    tags: Array.from(new Set(profiles.flatMap((profile) => profile.tags))).sort(
      (a, b) => a.localeCompare(b)
    ),
    regions: Array.from(
      new Set(profiles.map((profile) => profile.region))
    ).sort((a, b) => a.localeCompare(b))
  };
}
