import React from "react";
import { useAppSettings } from "../context/AppSettingsContext";

export default function PrecioConIdioma({ precioBaseARS, tasas }) {
  const { idioma, moneda } = useAppSettings();

  // Traducciones simples de ejemplo
  const textos = {
    ES: {
      precio: "Precio",
      moneda: { ARS: "Pesos", USD: "Dólares", ILS: "Shekels" }
    },
    HE: {
      precio: "מחיר",
      moneda: { ARS: "פסו", USD: "דולר", ILS: "שקל" }
    }
  };

  // Conversion de moneda independiente del idioma
  const tasa = tasas?.[moneda] || 1;
  const precioConvertido = (precioBaseARS * tasa).toFixed(2);

  return (
    <div>
      <span>
        {textos[idioma].precio}: {precioConvertido} {textos[idioma].moneda[moneda]}
      </span>
    </div>
  );
}