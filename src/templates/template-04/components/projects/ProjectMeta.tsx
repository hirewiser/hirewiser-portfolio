type ProjectMetaProps = {
  timeline?: string | null;
  role?: string | null;
  team?: string | null;
  status?: string | null;
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

  // Filter out null/undefined values
  const hasData = [timeline, role, team, status].some(
    (val) => val != null && val.trim() !== ""
  );

  if (!hasData) {
    return null;
  }

  return (
    <div className="w-full border border-border rounded-lg p-3 bg-muted max-w-2xl">
      {/* Mobile View - Grid Layout */}
      <div className="sm:hidden grid grid-cols-2 gap-4">
        {timeline && (
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-foreground">Timeline:</h4>
            <p className="text-muted-foreground">{timeline}</p>
          </div>
        )}

        {role && (
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-foreground">Role:</h4>
            <p className="text-muted-foreground">{role}</p>
          </div>
        )}

        {team && (
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-foreground">Team:</h4>
            <p className="text-muted-foreground">{team}</p>
          </div>
        )}

        {status && (
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-foreground">Status:</h4>
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusStyles.container}`}
            >
              <div className={`w-2 h-2 rounded-full ${statusStyles.dot}`} />
              <span className="text-xs font-medium">{status}</span>
            </div>
          </div>
        )}
      </div>

      {/* Desktop View - Original Layout */}
      <div className="hidden sm:flex flex-wrap items-center gap-8">
        {timeline && (
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">Timeline:</h4>
            <p className="text-muted-foreground">{timeline}</p>
          </div>
        )}

        {role && (
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">Role:</h4>
            <p className="text-muted-foreground">{role}</p>
          </div>
        )}

        {team && (
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">Team:</h4>
            <p className="text-muted-foreground">{team}</p>
          </div>
        )}

        {status && (
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">Status:</h4>
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusStyles.container}`}
            >
              <div className={`w-2 h-2 rounded-full ${statusStyles.dot}`} />
              <span className="text-xs font-medium">{status}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
