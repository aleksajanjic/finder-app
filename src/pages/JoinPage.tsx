import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getSessionByCode, joinSession } from "../services/sessionApi";
import { getDeviceId } from "../utils/deviceId";

function JoinPage() {
  const navigate = useNavigate();
  const { code: codeParam } = useParams();
  const [searchParams] = useSearchParams();
  const codeFromUrl = codeParam ?? searchParams.get("code") ?? "";
  const [code, setCode] = useState(codeFromUrl);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCode((prev) => codeFromUrl || prev);
  }, [codeFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      toast.error("Enter a join code");
      return;
    }
    setLoading(true);
    try {
      const session = await getSessionByCode(trimmed);
      if (!session) {
        toast.error("Invalid or expired code");
        setLoading(false);
        return;
      }
      const deviceId = getDeviceId();
      await joinSession(session.id, deviceId);
      toast.success("You joined the session!");
      navigate(`/session/${session.id}`, { replace: true });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-page-wrapper">
      <h1>Join with Code</h1>
      <p>Enter the code your friend shared with you</p>
      <form onSubmit={handleSubmit} className="join-form">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="e.g. ABC12X"
          maxLength={10}
          className="join-code-input"
          disabled={loading}
          autoFocus
        />
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? "Joining…" : "Join Session"}
        </button>
      </form>
    </div>
  );
}

export default JoinPage;
