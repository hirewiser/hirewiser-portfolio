type ProjectMetaProps = {
  timeline?: string;
  role?: string;
  team?: string;
  status?: string;
};

export function ProjectMeta({
  timeline,
  role,
  team,
  status,
}: ProjectMetaProps) {
  const getStatusStyles = (statusName: string) => {
    switch (statusName) {
      case "Completed":
        return {
          container: "bg-green-100 text-green-800 border-green-200",
          dot: "bg-green-500",
        };
      case "In Progress":
        return {
          container: "bg-blue-100 text-blue-800 border-blue-200",
          dot: "bg-blue-500",
        };
      case "Planning":
        return {
          container: "bg-yellow-100 text-yellow-800 border-yellow-200",
          dot: "bg-yellow-500",
        };
      default:
        return {
          container: "bg-gray-100 text-gray-800 border-gray-200",
          dot: "bg-gray-500",
        };
    }
  };

  const statusStyles = getStatusStyles(status || "In Progress");

  // Return null if no data to display
  if (!(timeline || role || team || status)) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-30 border border-[var(--border)] rounded-lg p-2 bg-[var(--muted)] max-w-2xl">
      {timeline && (
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-[var(--foreground)]">Timeline:</h4>
          <p className="text-[var(--muted-foreground)]">{timeline}</p>
        </div>
      )}

      {role && (
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-[var(--foreground)]">Role:</h4>
          <p className="text-[var(--muted-foreground)]">{role}</p>
        </div>
      )}

      {team && (
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-[var(--foreground)]">Team:</h4>
          <p className="text-[var(--muted-foreground)]">{team}</p>
        </div>
      )}

      {status && (
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-[var(--foreground)]">Status:</h4>
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusStyles.container} inline-flex`}
          >
            <div className={`w-2 h-2 rounded-full ${statusStyles.dot}`} />
            <span className="text-xs font-medium">{status}</span>
          </div>
        </div>
      )}
    </div>
  );
}
