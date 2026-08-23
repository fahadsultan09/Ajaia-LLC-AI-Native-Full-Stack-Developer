export function convertTextToHtml(
  rawText: string
) {
  return `<p>${rawText
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")}</p>`;
}