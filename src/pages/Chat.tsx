export function Chat() {
  const embedUrl = "https://7d9da728-3eaf-4944-965c-d1d56538803c.looker.app/embed/conversations?ds.agent=dafc744bfcce4955abb8f200e1c629cf";

  return (
    <div className="h-full w-full bg-white relative">
      {/* We can just embed this iframe directly since it's a private embed link according to instructions */}
      <iframe
        src={embedUrl}
        className="w-full h-full border-none"
        allow="fullscreen"
        title="Conversational Analytics"
      />
    </div>
  );
}
