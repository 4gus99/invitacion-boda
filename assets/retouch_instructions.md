Retoque y color grading — Set “Vineyard Warm"

Resumen rápido
- Aplicar LUT base para unificar tono cálido y luego ajustar por imagen.
- Objetivo: tonos cálidos (beige/cream/soft pink/olive/wine), luz suave de hora dorada, profundidad de campo reducida, grano fino, viñeta sutil.
- Exportar: JPEG, sRGB, lado largo 3000 px, calidad 90.

Flujo recomendado (Lightroom / Lightroom Classic)
1. Importa las 4 imágenes y crea un nuevo catálogo o colección.
2. Aplica un perfil base (p. ej. Adobe Color o Camera Matching) para consistencia.
3. Ajustes globales (punto de partida, luego matizar por imagen):
   - Temperatura: +6 a +10 (calentar)
   - Tint: +1 a +3 (leves hacia magenta)
   - Exposición: +0.00 a +0.10 (según imagen)
   - Contraste: -5
   - Highlights: -20 a -30
   - Shadows: +12 a +25
   - Whites: -8
   - Blacks: +4 a +6
   - Texture: +4 a +8
   - Clarity: -2 a -4 (suavizar)
   - Dehaze: +1 a +3 (muy sutil)
4. HSL (afinación de colores):
   - Reds: Saturation +4–8, Luminance +1–3
   - Oranges: Saturation +4–6, Luminance +2–4
   - Yellows: Saturation -2 a -6 (reducir amarillos duros)
   - Greens: Hue -6 a -12 (tirar a oliva), Saturation -6 a -12
5. Color Grading / Split Toning:
   - Highlights: Hue ~40 (warm beige), Saturation 10–20
   - Shadows: Hue ~350 (sutil burgundy), Saturation 6–12
   - Balance: +10 (favor highlights)
6. Efectos finales:
   - Grain: Amount 6–10, tamaño 25–30, roughness 0.4
   - Vignette: Amount -6 a -10, midpoint 30–40, feather 50
7. Enfocar / Sharpen:
   - Sharpening: Amount 35–45, Radius 0.8–1.2, Detail 20–30, Masking 40–60
8. Exportar: Exportar con perfil sRGB, lado largo 3000 px, calidad 90, export sharpening "Standard" para pantalla.

Ajustes locales recomendados (por escena)
- Mesa (table): resaltar cristal y vino — usa un radial suave alrededor de las copas (+0.10 exposure, +6 clarity, +8 texture), aumentar highlights +6.
- Paisaje (landscape): potenciar líneas-guía y calidez — ligero incremento de dehaze +2, contrast +6, reducir saturación de amarillo si explota.
- Momento (moment): mantener sujetos fuera de foco — bajar clarity y texture en fondo, usar brush para levantar sombras alrededor de la pareja, conservar el halo de contraluz.
- Ramo (bouquet): microcontraste en flores — aumentar texture +8, clarity +2, levantar whites ligeramente y bajar shadows.

Aplicar LUT (.cube)
- Si tu software soporta .cube (DaVinci Resolve, Affinity, Photoshop Camera Raw con plugin), importa `assets/wedding_warm_LUT.cube` y aplícalo como LUT o Profile.
- Si tu software no acepta .cube, usa los ajustes de Lightroom arriba como sustituto (el LUT es un complemento, no obligatorio).

Batch / sincronización
- Selecciona la imagen que hayas ajustado como referencia y usa "Sync Settings" (Lightroom) para copiar ajustes a las otras imágenes. Ajusta localmente donde haga falta (exposición, radial/local).

Notas de retoque puntual (Photoshop)
- Elimina reflejos molestos o manchas pequeñas con Spot Healing o Patch.
- Para piel o telas delicadas, evita sobre-suavizar; preferir clon/curación mínima y un ligero dodge/burn para modelado.

Entrega y verificación
- Si quieres, puedo aplicar estos ajustes y exportar los JPEG finales.
- Para hacerlo necesito los archivos originales en alta resolución dentro de `assets/originals/` (pon los archivos allí) o permiso para usar las imágenes adjuntas del chat.

¿Procedo con el retoque ahora? Si sí, sube los originales a `assets/originals/` o dime que use las imágenes adjuntas.