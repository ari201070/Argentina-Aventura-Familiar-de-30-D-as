// js/aiQuery.js

async function askAI() {
  const questionInput = document.getElementById('user-question');
  const responseDiv = document.getElementById('ai-response');
  const question = questionInput.value.trim();
  
  if (!question) {
    responseDiv.textContent = "אנא הזן שאלה";
    return;
  }

  responseDiv.textContent = "מעבד...";
  
  try {
    // Mock de respuesta (en producción usar API)
    const responses = {
      "bariloche": {
        "es": "En Bariloche recomendamos el Circuito Chico y el Cerro Campanario.",
        "he": "ברזילו recomendamos את מסלול צ'יקו וההר קמפאניירו."
      },
      "default": {
        "es": "Consulte sobre actividades específicas en cada ciudad.",
        "he": "שאלו על פעילויות ספציפיות בכל עיר."
      }
    };
    
    // Detectar idioma de la pregunta
    const isHebrew = /[\u0590-\u05FF]/.test(question);
    const key = question.toLowerCase().includes("bariloche") ? "bariloche" : "default";
    const answer = responses[key][isHebrew ? "he" : "es"];
    
    responseDiv.textContent = answer;
  } catch (error) {
    responseDiv.textContent = "שגיאה בתשובה";
  } finally {
    questionInput.value = '';
  }
}
