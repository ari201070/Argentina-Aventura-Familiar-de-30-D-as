# app.py
import streamlit as st
import google.generativeai as genai
from github import Github

# --- Función para leer el contenido del repositorio (sin cambios) ---
@st.cache_data(ttl=3600) # La caché sigue siendo útil para cuando se reinicia el servidor
def leer_contenido_repo(_repo):
    contenido_total = ""
    st.write("Leyendo contenido del repositorio en GitHub (esto se hace solo una vez)...")
    try:
        contents = _repo.get_contents("", ref="ari201070-mcp-integration") # Especificamos la rama por claridad
        for file_content in contents:
            if file_content.type == "file" and (file_content.path.endswith('.md') or file_content.path.endswith('.txt')):
                st.write(f"  - Leyendo archivo: {file_content.path}")
                contenido_total += f"--- Contenido del archivo: {file_content.path} ---\n"
                contenido_total += file_content.decoded_content.decode('utf-8')
                contenido_total += "\n\n"
        return contenido_total
    except Exception as e:
        st.error(f"Error al leer el repositorio: {e}")
        return None

# --- Configuración de la Página y Título ---
st.set_page_config(page_title="Aventura Familiar Argentina", layout="wide")
st.title("Generador de Itinerarios para Aventura Familiar en Argentina 🇦🇷")
st.write("¡Bienvenido! Esta herramienta te ayudará a planificar tu viaje.")

# --- Inicialización de APIs y Carga de Contexto (SOLO UNA VEZ) ---
# Usamos st.session_state para evitar que esto se ejecute en cada interacción

if 'initialized' not in st.session_state:
    try:
        # Configurar API de Gemini
        gemini_api_key = st.secrets["GEMINI_API_KEY"]
        genai.configure(api_key=gemini_api_key)
        st.session_state.model = genai.GenerativeModel('gemini-1.5-pro-latest')
        
        # Configurar API de GitHub y leer el repo
        github_token = st.secrets.get("GITHUB_TOKEN", None)
        g = Github(github_token)
        repo = g.get_repo("ari201070/Argentina-Aventura-Familiar-de-30-D-as")
        
        # Guardamos el contexto en la memoria de la sesión
        st.session_state.contexto_repo = leer_contenido_repo(repo)
        
        # Marcamos como inicializado
        st.session_state.initialized = True
        st.success("Conexión con la API de Gemini y GitHub exitosa. Contexto del proyecto cargado.")

    except Exception as e:
        st.error(f"Ocurrió un error crítico durante la inicialización: {e}")
        st.stop()

# --- Interfaz de Usuario ---
st.divider()

if st.session_state.get('initialized', False):
    st.subheader("Genera ideas basadas en el itinerario existente")
    prompt_usuario = st.text_area("¿Qué deseas generar o mejorar?", "Ej: Sugiere una actividad para niños en Salta, basándote en el plan actual.")

    if st.button("Generar Sugerencia"):
        if prompt_usuario:
            with st.spinner("Pensando..."):
                try:
                    # MODIFICADO: Ahora usamos el contexto guardado en la sesión
                    prompt_completo = f"""
                    Eres un asistente de viajes experto. A continuación te proporciono el contexto de un viaje planificado.
                    --- CONTEXTO DEL PROYECTO ---
                    {st.session_state.contexto_repo}
                    --- FIN DEL CONTEXTO ---
                    Basado en esa información, responde a la siguiente petición del usuario:
                    Petición del usuario: "{prompt_usuario}"
                    """
                    
                    response = st.session_state.model.generate_content(prompt_completo)
                    
                    st.subheader("Sugerencia de la IA:")
                    st.markdown(response.text)
                    st.balloons()
                except Exception as e:
                    st.error(f"Ocurrió un error al generar la respuesta de Gemini: {e}")
        else:
            st.warning("Por favor, escribe tu petición.")
