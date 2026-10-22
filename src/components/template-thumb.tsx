export function TemplateThumb({ html, title }: { html: string; title: string }) {
  return (
    <div className="template-thumb" aria-hidden="true">
      <iframe title={`${title} preview`} sandbox="allow-scripts" srcDoc={html} tabIndex={-1} />
    </div>
  );
}