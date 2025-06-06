/**
 * Simulates fetching an AI response.
 * @param {string} question The question for the AI.
 * @param {function} t The i18next translation function.
 * @returns {Promise<{answer: string}>} A promise that resolves with the AI's answer.
 */
export async function getAIResponse(question, t) {
  if (!question || question.trim() === '') {
    // Simulating an error for an empty question, using the translated string
    return Promise.reject(new Error(t('aiQueryErrorEmpty')));
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a successful response, using the translated prefix
  return { answer: `${t('aiQueryMockResponsePrefix')} "${question}"` };
}
