export type DirectoryEntry = {
  id: string;
  name: string;
  role: string;
  city: string;
  country: string;
  region: string;
  bio: string;
  tags: string[];
  connect: DirectoryConnect | null;
};

export type DirectoryConnect = {
  label: string;
  href: string;
  type: "email" | "social";
};
