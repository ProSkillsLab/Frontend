export async function emailReport(reportId: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reports/email/${reportId}`, {
    method: "POST",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.success === false) {
    throw new Error(data?.error || data?.message || "Failed to email report");
  }
  return data;
}
