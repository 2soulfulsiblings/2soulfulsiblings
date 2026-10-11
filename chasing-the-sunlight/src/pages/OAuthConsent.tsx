import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthResult = {
  data: {
    client?: { name?: string; client_id?: string; redirect_uris?: string[] };
    scope?: string;
    redirect_url?: string;
    redirect_to?: string;
    user?: { email?: string };
  } | null;
  error: { message: string } | null;
};
type OAuthNs = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
  approveAuthorization: (id: string) => Promise<OAuthResult>;
  denyAuthorization: (id: string) => Promise<OAuthResult>;
};
function oauthNs(): OAuthNs {
  return (supabase.auth as unknown as { oauth: OAuthNs }).oauth;
}

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthResult["data"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      setUserEmail(sess.session.user?.email ?? "");
      const { data, error } = await oauthNs().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error } = approve
      ? await oauthNs().approveAuthorization(authorizationId)
      : await oauthNs().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  };

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full"><CardContent className="p-6">
          <h1 className="text-xl font-serif font-bold mb-2">Couldn't load this request</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent></Card>
      </main>
    );
  }
  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-muted-foreground">Loading…</p>
      </main>
    );
  }

  const clientName = details.client?.name ?? "an app";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-md w-full">
        <CardContent className="p-8">
          <h1 className="text-2xl font-serif font-bold mb-2">
            Connect {clientName} to Chasing the Sunlight
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {clientName} will be able to call this app's enabled tools while you are signed in
            {userEmail ? ` as ${userEmail}` : ""}.
          </p>

          <div className="text-sm mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">App</span>
              <span>{clientName}</span>
            </div>
            {details.client?.redirect_uris?.[0] && (
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Redirects to</span>
                <span className="truncate max-w-[220px]" title={details.client.redirect_uris[0]}>
                  {details.client.redirect_uris[0]}
                </span>
              </div>
            )}
            {details.scope && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scope</span>
                <span className="truncate max-w-[220px]" title={details.scope}>{details.scope}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground mb-6">
            This does not bypass this app's permissions or backend policies.
          </p>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" disabled={busy} onClick={() => decide(false)}>
              Cancel connection
            </Button>
            <Button className="flex-1" disabled={busy} onClick={() => decide(true)}>
              Approve
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default OAuthConsent;
