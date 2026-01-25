import { useState } from "react";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { emailReport } from "../api/reports.ts";

export function EmailReportButton({ reportId }: { reportId: string }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; ok: boolean; msg: string }>({
    open: false,
    ok: true,
    msg: "",
  });

  const handleClick = async () => {
    setLoading(true);
    try {
      await emailReport(reportId);
      setToast({ open: true, ok: true, msg: "Report emailed successfully." });
    } catch (e: any) {
      setToast({ open: true, ok: false, msg: e?.message ?? "Failed to email report." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClick} disabled={loading}>
        {loading ? <CircularProgress size={18} /> : "Email report"}
      </Button>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast(t => ({ ...t, open: false }))}>
        <Alert severity={toast.ok ? "success" : "error"}>{toast.msg}</Alert>
      </Snackbar>
    </>
  );
}
