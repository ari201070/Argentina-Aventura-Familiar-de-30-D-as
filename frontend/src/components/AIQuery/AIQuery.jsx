import React, { useState } from 'react';
import './AIQuery.css';
import { useTranslation } from 'react-i18next';

const IA_MOCK_RESPONSE = {
  es: "¡Gracias por tu consulta! Pronto tendrás una respuesta personalizada sobre tu viaje familiar en Argentina.",
  he: "תודה על פנייתך! תקבל בקרוב תשובה מותאמת למסלול המשפחתי שלך בארגנטינה."
};

function AIQuery() {
  const { t, i18n } = useTranslation();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    // Simulación de llamada a IA (mock)
    setTimeout(() => {
      setResponse(IA_MOCK_RESPONSE[i18n.language] || IA_MOCK_RESPONSE['es']);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="aiquery-container">
      <h2>{t('aiQueryTitle') || 'Consulta a IA'}</h2>
      <form onSubmit={handleQuery}>
        <textarea
          className="aiquery-textarea"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder={t('aiQueryPlaceholder') || "Escribe tu pregunta sobre el viaje..."}
          disabled={loading}
          required
        />
        <button
          className="aiquery-btn"
          type="submit"
          disabled={loading || !question.trim()}
        >
          {loading ? t('aiQueryLoading') || 'Consultando...' : t('aiQueryBtn') || 'Consultar'}
        </button>
      </form>
      {response && (
        <div className="aiquery-response">
          {response}
        </div>
      )}
    </div>
  );
}

export default AIQuery;
