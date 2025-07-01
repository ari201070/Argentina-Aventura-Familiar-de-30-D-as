# app.py
import streamlit as st
import google.generativeai as genai
import os

# --- Configuración de la Página y Título ---
st.set_page_config(page_title="Aventura Familiar Argentina", layout="wide")
st.title("Generador de Itinerarios para Aventura Familiar en Argentina 🇦🇷")
st.write("¡Bienvenido! Esta herramienta te ayudará a planificar tu viaje.")

# --- Configuración de la API de Gemini ---
# IMPORTANTE: Debes configurar tu clave de API en los "Secrets" de Streamlit
# El nombre del secret debe ser "GEMINI_API_KEY"
try:
    api_key = st.secrets["GEMINI_API_KEY"]
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
    st.success("Conexión con la API de Gemini exitosa.")
except KeyError:
    st.error("Error: La clave de API de Gemini no se encuentra en los Secrets de Streamlit.")
    st.info("Por favor, añade 'GEMINI_API_KEY = \"tu_clave_aqui\"' a los secrets de tu app.")
    st.stop()
except Exception as e:
    st.error(f"Ocurrió un error al configurar la API: {e}")
    st.stop()


# --- Interfaz de Usuario ---
prompt_usuario = st.text_area("Describe el tipo de itinerario que deseas:", "Ej: Un itinerario de 5 días por el norte de Argentina, enfocado en naturaleza y con actividades para niños.")

if st.button("Generar Itinerario"):
    if prompt_usuario:
        with st.spinner("Generando tu aventura... Por favor, espera."):
            try:
                # --- Llamada a la API de Gemini ---
                response = model.generate_content(prompt_usuario)
                
                # --- Mostrar la Respuesta ---
                st.subheader("Aquí tienes tu itinerario propuesto:")
                st.markdown(response.text)
                st.balloons()
            except Exception as e:
                st.error(f"Ocurrió un error al generar la respuesta de Gemini: {e}")
    else:
        st.warning("Por favor, escribe una descripción para generar el itinerario.")
