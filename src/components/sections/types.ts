// src/components/sections/work/types.ts

export type ProjectStatus   = "live" | "in-progress" | "archived";
export type ProjectCategory = "next" | "react" | "js" | "css" | "html";

export interface Project {
  id:          string;
  title:       string;
  description: string;
  stack:       string[];
  category:    ProjectCategory[];
  liveUrl:     string | null;
  repoUrl:     string | null;
  status:      ProjectStatus;
  featured:    boolean;
  year:        string;
}

export type FilterValue = "all" | ProjectCategory;

export const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All",        value: "all"   },
  { label: "Next.js",   value: "next"  },
  { label: "React",     value: "react" },
  { label: "JS",        value: "js"    },
  { label: "CSS · HTML",value: "css"   },
];