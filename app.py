# app.py
import streamlit as st
import subprocess # Esta librería nos permite ejecutar comandos de la terminal, como "gemini"

# --- Configuración de la Página ---
st.set_page_config(page_title="Aventura Familiar Argentina", layout="wide")
st.title("Generador de Itinerarios para Aventura Familiar en Argentina 🇦🇷")
st.write("Usa esta herramienta para generar ideas y planes para tu viaje. Simplemente escribe lo que necesitas y la IA te ayudará.")

# --- Área de Interacción con el Usuario ---
# Un área de texto grande para que el usuario escriba su petición
prompt_usuario = st.text_area("Escribe tu petición aquí (ej: 'Dame un itinerario de 3 días para ver cataratas en Iguazú con niños de 8 y 10 años')", height=150)

# El botón que iniciará la magia
if st.button("Generar Itinerario"):
    if prompt_usuario: # Nos aseguramos de que el usuario haya escrito algo
        # Mostramos un mensaje de "cargando" para que el usuario sepa que algo está pasando
        with st.spinner("Contactando a la IA de Gemini... por favor, espera."):
            try:
                # --- ¡AQUÍ ESTÁ LA MAGIA! ---
                # Ejecutamos el comando "gemini" con el prompt del usuario
                # subprocess.run es como escribir "gemini 'el texto del usuario'" en la terminal
                comando = ["gemini", prompt_usuario]
                resultado = subprocess.run(comando, capture_output=True, text=True, check=True)

                # Si el comando fue exitoso, mostramos la respuesta
                st.subheader("💡 Respuesta de Gemini:")
                st.markdown(resultado.stdout) # stdout es la respuesta estándar del comando

            except subprocess.CalledProcessError as e:
                # Si el comando falla, mostramos un error útil
                st.error(f"Ocurrió un error al ejecutar Gemini:")
                st.code(e.stderr) # stderr es el mensaje de error del comando
            except FileNotFoundError:
                # Este error ocurre si Streamlit Cloud no puede encontrar el comando "gemini"
                st.error("Error crítico: El comando 'gemini' no se encontró en el entorno de la aplicación.")

    else:
        # Si el usuario no escribió nada, le avisamos
        st.warning("Por favor, escribe una petición en el área de texto.")
