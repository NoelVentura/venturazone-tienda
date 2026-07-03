/** Perfiles nutricionales detallados — valores orientativos por porción. Consultar etiqueta del producto. */

const hiberBase = (flavorExtra) => ({
  servingLabel: '1 porción (33 g) preparada en 250 ml de leche descremada',
  servingNote: 'Valores diarios (% VRN) basados en una dieta de 2,000 kcal. Información orientativa.',
  items: [
    { name: 'Proteína de suero concentrada', amount: '12 g', dv: '24%', function: 'Apoya la síntesis muscular, recuperación post-ejercicio y sensación de saciedad.', origin: 'Suero lácteo', highlight: 'Proteína Whey' },
    { name: 'Vitamina B1 (Tiamina)', amount: '0.55 mg', dv: '46%', function: 'Contribuye al metabolismo energético normal y función del sistema nervioso.', origin: 'Síntesis fortificada' },
    { name: 'Vitamina B2 (Riboflavina)', amount: '0.60 mg', dv: '43%', function: 'Contribuye al metabolismo energético normal y a la protección de las células del estrés oxidativo.', origin: 'Síntesis fortificada' },
    { name: 'Vitamina B6', amount: '0.70 mg', dv: '41%', function: 'Participa en el metabolismo de proteínas y formación de glóbulos rojos.', origin: 'Síntesis fortificada', highlight: 'Complejo B' },
    { name: 'Vitamina B12', amount: '1.2 µg', dv: '50%', function: 'Esencial para la formación de glóbulos rojos y función neurológica.', origin: 'Síntesis fortificada' },
    { name: 'Calcio', amount: '220 mg', dv: '22%', function: 'Mantiene huesos y dientes fuertes; apoya contracción muscular.', origin: 'Carbonato de calcio', highlight: 'Calcio' },
    { name: 'Hierro', amount: '3.5 mg', dv: '19%', function: 'Contribuye al transporte de oxígeno en sangre y reduce el cansancio.', origin: 'Fumarato ferroso' },
    { name: 'Fibra dietética', amount: '4 g', dv: '16%', function: 'Favorece la digestión, saciedad y equilibrio del azúcar en sangre.', origin: 'Fibra de avena y inulina' },
    ...flavorExtra,
  ],
});

export const INGREDIENT_PROFILES = {
  product1: {
    ...hiberBase([
      { name: 'Cacao natural en polvo', amount: '3 g', dv: '—', function: 'Aporta sabor chocolate intenso y antioxidantes naturales (flavonoides).', origin: 'Granos de cacao', highlight: 'Cacao natural' },
      { name: 'Edulcorante (sucralosa)', amount: '45 mg', dv: '—', function: 'Endulza sin añadir calorías significativas a la porción.', origin: 'Síntesis alimentaria' },
    ]),
    allergens: ['Lácteos (proteína de suero)', 'Soja (puede contener trazas)', 'Gluten (verificar lote según fabricante)'],
    allergenNote: 'Contiene proteína de leche. No apto para personas con alergia a lácteos. Consulta la etiqueta si eres celíaco o intolerante al gluten.',
  },
  product2: {
    ...hiberBase([
      { name: 'Aroma natural de vainilla', amount: '120 mg', dv: '—', function: 'Perfil aromático suave y versátil para mezclas con frutas o avena.', origin: 'Extracto de vainilla' },
      { name: 'Edulcorante (sucralosa)', amount: '45 mg', dv: '—', function: 'Endulza sin añadir calorías significativas.', origin: 'Síntesis alimentaria' },
    ]),
    allergens: ['Lácteos (proteína de suero)', 'Soja (puede contener trazas)'],
    allergenNote: 'Contiene proteína de leche. Puede elaborarse en instalaciones que procesan frutos secos y soya.',
  },
  product3: {
    ...hiberBase([
      { name: 'Extracto de fresa', amount: '800 mg', dv: '—', function: 'Sabor frutal refrescante y aporte de antioxidantes naturales.', origin: 'Frutos rojos', highlight: 'Antioxidantes' },
      { name: 'Edulcorante (sucralosa)', amount: '45 mg', dv: '—', function: 'Endulza manteniendo un perfil bajo en azúcares añadidos.', origin: 'Síntesis alimentaria' },
    ]),
    allergens: ['Lácteos (proteína de suero)', 'Soja (puede contener trazas)'],
    allergenNote: 'Contiene proteína de leche. Revisa etiqueta si tienes sensibilidad a frutos rojos o colorantes naturales.',
  },
  product4: {
    servingLabel: '1 cápsula',
    servingNote: 'Valores diarios (% VRN) por cápsula. No exceder la dosis recomendada.',
    items: [
      { name: 'Vitamina C (ácido ascórbico)', amount: '60 mg', dv: '67%', function: 'Contribuye al funcionamiento normal del sistema inmunitario y a la protección de las células del estrés oxidativo.', origin: 'Síntesis farmacéutica', highlight: 'Vitamina C' },
      { name: 'Vitamina E (tocoferol)', amount: '10 mg', dv: '67%', function: 'Antioxidante que contribuye a la protección de las células del estrés oxidativo.', origin: 'Aceite vegetal', highlight: 'Vitamina E' },
      { name: 'Zinc (bisglicinato)', amount: '7 mg', dv: '64%', function: 'Contribuye al funcionamiento normal del sistema inmunitario y al metabolismo de macronutrientes.', origin: 'Mineral quelado', highlight: 'Zinc' },
      { name: 'Selenio', amount: '35 µg', dv: '64%', function: 'Contribuye a la función tiroidea normal y a la protección de las células del estrés oxidativo.', origin: 'Selenito de sodio' },
      { name: 'Magnesio', amount: '50 mg', dv: '12%', function: 'Contribuye al funcionamiento normal del sistema nervioso y de los músculos.', origin: 'Óxido de magnesio', highlight: 'Magnesio' },
      { name: 'Vitamina D3', amount: '5 µg (200 UI)', dv: '33%', function: 'Contribuye al mantenimiento de huesos y dientes en condiciones normales.', origin: 'Lichen / síntesis' },
      { name: 'Extracto de ginseng', amount: '50 mg', dv: '—', function: 'Extracto herbal tradicionalmente usado como complemento de vitalidad y bienestar masculino.', origin: 'Raíz de Panax ginseng' },
      { name: 'Extracto de saw palmetto', amount: '30 mg', dv: '—', function: 'Extracto herbal que puede acompañar el bienestar masculino.', origin: 'Serenoa repens' },
    ],
    allergens: ['Gelatina (cápsula)', 'Puede contener trazas de soya y gluten'],
    allergenNote: 'Fórmula diseñada para hombres adultos. Consulta a tu médico si tomas anticoagulantes o medicamentos hormonales.',
  },
  product5: {
    servingLabel: '1 cápsula',
    servingNote: 'Valores diarios (% VRN) por cápsula. Complemento herbal — no sustituye dieta balanceada.',
    items: [
      { name: 'Vitamina C', amount: '80 mg', dv: '89%', function: 'Contribuye al funcionamiento normal del sistema inmunitario.', origin: 'Ácido ascórbico', highlight: 'Vitamina C' },
      { name: 'Zinc', amount: '8 mg', dv: '73%', function: 'Contribuye al funcionamiento normal del sistema inmunitario y al metabolismo de macronutrientes.', origin: 'Gluconato de zinc', highlight: 'Zinc' },
      { name: 'Extracto de equinácea', amount: '200 mg', dv: '—', function: 'Planta herbal tradicionalmente usada como complemento alimenticio.', origin: 'Echinacea purpurea', highlight: 'Equinácea' },
      { name: 'Propóleo en polvo', amount: '100 mg', dv: '—', function: 'Resina de abeja con propiedades antioxidantes naturales.', origin: 'Colmenas / apicultura', highlight: 'Propóleo' },
      { name: 'Extracto de jengibre', amount: '50 mg', dv: '—', function: 'Puede acompañar el confort digestivo como complemento herbal.', origin: 'Zingiber officinale' },
      { name: 'Vitamina D3', amount: '5 µg', dv: '33%', function: 'Contribuye al mantenimiento de huesos y dientes en condiciones normales.', origin: 'Síntesis / lichen' },
      { name: 'Seleno', amount: '30 µg', dv: '55%', function: 'Contribuye a la protección de las células del estrés oxidativo.', origin: 'Selenito de sodio' },
    ],
    allergens: ['Propóleo (producto de abejas)', 'Gelatina o celulosa (cápsula)', 'Puede contener trazas de polen'],
    allergenNote: 'No apto para personas alérgicas a productos de abejas (propóleo, miel, polen). Consulta a tu médico si estás embarazada o lactando.',
  },
};
