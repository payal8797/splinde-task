import type { Section, ComputedSection } from "./types";

export function computeSums(section: Section): ComputedSection {
  // Recursively compute sums for a section and its children
  const children = section.children.map((child) => {
    if ("children" in child) return computeSums(child);
    return child;
  });

  const computedSum = children.reduce(
    (acc, child) =>
      acc + ("computedSum" in child ? child.computedSum : child.sum),
    0
  );

  return {
    name: section.name,
    children,
    computedSum,
  };
}
