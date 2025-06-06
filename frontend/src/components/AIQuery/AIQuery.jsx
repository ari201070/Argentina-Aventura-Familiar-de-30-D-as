import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AIQuery.css';
import { getAIResponse } from '../../services/mcp/aiService.js';

function AIQuery() {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // The empty question check is now handled by the service,
    // but good to keep client-side validation too for immediate feedback if desired.
    // For this refactor, we'll rely on the service's check primarily.
    // if (!question.trim()) {
    //   setError('Please enter a question before submitting.');
    //   setResponse('');
    //   return;
    // }

    setIsLoading(true);
    setResponse('');
    setError('');

    try {
      const result = await getAIResponse(question, t); // Pass t function
      setResponse(result.answer);
    } catch (err) {
      // The error message from the service should now be translated
      setError(err.message || t('aiQueryErrorEmpty')); // Fallback, though service should provide translated error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-query-container">
      <h2>{t('aiQueryTitle')}</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask the AI something..." // This could be t('aiQueryPlaceholder') if added
        disabled={isLoading}
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? t('aiQueryButtonLoading') : t('aiQueryButtonAsk')}
      </button>

      {error && (
        <div className="ai-query-error">
          {error}
        </div>
      )}

      {response && (
        <div className="ai-query-response">
          <strong>AI's Answer:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default AIQuery;
