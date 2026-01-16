export function getUsername() {
  const host = window.location.hostname;
  return host.split(".")[0];
}

export async function getPortfolioData() {
  const username = getUsername();

  // Use environment variables for API configuration
  const protocol = import.meta.env.VITE_COFOUNDS_PROTOCOL || "http";
  const host = import.meta.env.VITE_COFOUNDS_HOST || "localhost:3000";
  const apiUrl =
    import.meta.env.VITE_COFOUNDS_API_URL ||
    `${protocol}://${host}/api/v3/portfolio`;

  const res = await fetch(`${apiUrl}/${username}`);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch portfolio: ${res.status} ${res.statusText}`
    );
  }

  const portfolioData = await res.json();
  return portfolioData;
}
