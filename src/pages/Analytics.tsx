import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function Analytics() {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSignedUrl() {
      try {
        const username = sessionStorage.getItem("username") || "creator1_456";
        const creatorId = sessionStorage.getItem("creator_id") || "1";

        const payload = {
          target_url: "https://7d9da728-3eaf-4944-965c-d1d56538803c.looker.app/dashboards/WrnU0VAhr4rLax8po5wagx?theme=Streaming_Platform",
          session_length: 28800,
          force_logout_login: true,
          external_user_id: username,
          first_name: "Demo",
          last_name: "User",
          permissions: [
            "access_data",
            "see_looks",
            "see_user_dashboards",
            "see_lookml_dashboards",
            "download_with_limit",
            "schedule_look_emails",
            "schedule_external_look_emails",
            "create_alerts",
            "see_drill_overlay",
            "save_content",
            "embed_browse_spaces",
            "send_to_sftp",
            "send_to_s3",
            "send_outgoing_webhook",
            "send_to_integration",
            "download_without_limit",
            "explore",
            "see_sql",
            "gemini_in_looker",
            "chat_with_agent",
            "chat_with_explore"
          ],
          models: ["streaming_platform"],
          group_ids: [],
          external_group_id: "",
          user_attributes: {
            "creator_id": creatorId
          },
          secret_id: ""
        };

        const response = await fetch("/api/looker/signed-embed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Failed to fetch signed URL");
        }

        const data = await response.json();
        setEmbedUrl(data.url);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    }

    fetchSignedUrl();
  }, []);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 flex-col px-4 text-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 max-w-md w-full">
          <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-500 text-sm">{error}</p>
          <div className="mt-6 text-xs text-gray-400 bg-gray-50 p-3 rounded text-left font-mono">
            Ensure LOOKERSDK_BASE_URL, LOOKERSDK_CLIENT_ID, and LOOKERSDK_CLIENT_SECRET are set in the .env file.
          </div>
        </div>
      </div>
    );
  }

  if (!embedUrl) {
    return (
      <div className="h-full flex items-center justify-center flex-col text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-orange-500" />
        <p>Authenticating & loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white">
      <iframe
        src={embedUrl}
        className="w-full h-full border-none"
        allow="fullscreen"
        title="Looker Analytics Dashboard"
      />
    </div>
  );
}
