import type { ProjectKPI } from "@/types/portfolio.types";

// Only these two types are allowed
const KPI_CHALLENGES = "Key Challenges";
const KPI_LEARNINGS = "Key Learnings";

// Color classes for each type
const KPI_TYPE_STYLES = {
  [KPI_CHALLENGES]: {
    container: "bg-yellow-50 border-yellow-200",
    heading: "text-yellow-900",
    bullet: "text-yellow-600",
  },
  [KPI_LEARNINGS]: {
    container: "bg-green-50 border-green-200",
    heading: "text-green-900",
    bullet: "text-green-600",
  },
};

type ProjectKPIsProps = {
  projectKPIs: ProjectKPI[];
};

export function ProjectKPIs({ projectKPIs }: ProjectKPIsProps) {
  if (!projectKPIs?.length) {
    return null;
  }

  // Group KPIs by type
  const challenges = projectKPIs.filter((kpi) => kpi.type === KPI_CHALLENGES);
  const learnings = projectKPIs.filter((kpi) => kpi.type === KPI_LEARNINGS);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Key Challenges */}
      <div
        className={`rounded-xl border p-6 ${KPI_TYPE_STYLES[KPI_CHALLENGES].container}`}
      >
        <h4
          className={`mb-3 text-xl font-bold ${KPI_TYPE_STYLES[KPI_CHALLENGES].heading}`}
        >
          Key Challenges
        </h4>
        {challenges.length > 0 ? (
          <ul className="space-y-2 list-disc list-inside">
            {challenges.map((kpi, i) => (
              <li key={i} className={KPI_TYPE_STYLES[KPI_CHALLENGES].bullet}>
                {kpi.point}
              </li>
            ))}
          </ul>
        ) : (
          <div className="italic text-sm text-yellow-700">
            No Key Challenges listed
          </div>
        )}
      </div>
      {/* Key Learnings */}
      <div
        className={`rounded-xl border p-6 ${KPI_TYPE_STYLES[KPI_LEARNINGS].container}`}
      >
        <h4
          className={`mb-3 text-xl font-bold ${KPI_TYPE_STYLES[KPI_LEARNINGS].heading}`}
        >
          Key Learnings
        </h4>
        {learnings.length > 0 ? (
          <ul className="space-y-2 list-disc list-inside">
            {learnings.map((kpi, i) => (
              <li key={i} className={KPI_TYPE_STYLES[KPI_LEARNINGS].bullet}>
                {kpi.point}
              </li>
            ))}
          </ul>
        ) : (
          <div className="italic text-sm text-green-700">
            No Key Learnings listed
          </div>
        )}
      </div>
    </div>
  );
}
