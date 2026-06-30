export type DirectoryEntry = {
  id: string;
  name: string;
  role: string;
  city: string;
  country: string;
  region: string;
  bio: string;
  tags: string[];
  connect: {
    label: string;
    href: string;
    type: "email" | "social";
  };
};
