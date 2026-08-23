export const summarizeText = (htmlContent: string): string => {
  const plainText = htmlContent.replace(/<[^>]+>/g, ' ').trim();
  if (!plainText) return '<p><strong>Summary:</strong> Document is empty.</p>';
  const sentences = plainText.split('.').filter(Boolean);
  const summary = sentences.slice(0, 2).join('.') + '.';
  return `<p><strong>AI Summary:</strong> ${summary}</p>`;
};

export const improveWritingText = (htmlContent: string): string => {
  return htmlContent
    .replace(/very /gi, 'extremely ')
    .replace(/good/gi, 'exceptional')
    .replace(/bad/gi, 'suboptimal');
};

export const generateActionItemsText = (htmlContent: string): string => {
  const plainText = htmlContent.replace(/<[^>]+>/g, ' ').trim();
  if (!plainText) return '<p>No action items found.</p>';
  return `
    <h3>Generated Action Items</h3>
    <ul>
      <li>Review document requirements and objectives.</li>
      <li>Follow up on strategic milestones outlined above.</li>
      <li>Assign task owners for pending deliverables.</li>
    </ul>
  `;
};