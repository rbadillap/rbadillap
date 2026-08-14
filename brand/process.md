# process.md — cómo se construyó el brand system (light mode)

Documento VIVO. Toda sesión que avance el branding actualiza este archivo.
Su propósito: cuando toque diseñar una variante (dark mode es la primera
prevista), el proceso se replica paso a paso en vez de reinventarse.

Método base: extraer invariantes → codificar decisiones (no assets) →
implementación de referencia → stress-test en contextos hostiles reales →
loop de juicio. Registro por paso: qué se hizo, con qué inputs, qué
decisión salió y quién la tomó.

## Bitácora light mode (v1) — 2026-08-13

### 1. Inventario de superficies

- **Hecho**: se identificaron las superficies que ya portan el diseño:
  sitio (`~/apps/rbadillap/src/`), 20 resumes HTML + propuestas en
  `~/code/lab/resume-v4-src/`, y una cotización sin marca
  (`~/apps/licensekey.ai/proposal/cotizacion.md`).
- **Hallazgo**: los documentos los generan agentes de AI (archivos
  nombrados por agente: `proposal-codex.html`, `proposal-fable.html`).
  El consumidor del sistema es un agente en sesión fresca.
- **Decisión (Ronny)**: superficies v1 = propuesta/cotización + resume.
  Factura fuera. Archives de `applications/` congelados.

### 2. Auditoría de ambiente hostil

- **Inputs**: `proposal-codex.html` y `proposal-fable.html` (mismo
  encargo, dos agentes distintos, componentes inventados on-the-fly) +
  `resume-platform.html`.
- **Hecho**: inventario de convergencias (se canonizaron) y derivas (se
  nombraron reflejos prohibidos).
- **Convergieron ambos agentes**: section-label con punto, tabla con th
  mono uppercase, rows key/value, footer mono paginado, page shell carta
  con sombra, callout de borde izquierdo, diagramas SVG en paleta del
  sistema. → sección "Published grammar" de DESIGN.md.
- **Derivas detectadas**: 3 nomenclaturas de tokens; bodies 9.2 / 9.3 /
  9.5pt; acento `#b5523a` introducido por un solo agente sin regla; el
  resume perdió el punto del section-label; 4 nombres de clase para 2
  patrones (`.decision-table`/`.delivery-table`/`.positions` → `.data-table`;
  `.method` → `.cards`). → sección "Rejected reflexes" de DESIGN.md.
- **Decisión (Ronny)**: el ambiente hostil del stress-test son artefactos
  reales generados por agentes, no contextos sintéticos.

### 3. Extracción de invariantes

- **Inputs**: `src/app/globals.css`, `src/app/page.tsx`,
  `src/components/logomark.tsx`, `src/app/icon.svg`, specimens del paso 2.
- **Invariantes fijados**: papel `#fafaf8`; escala zinc para texto;
  hairlines `#e4e4e7`; el arco (línea y=34, arco r=26, apoyos r=2.4,
  ápice r=1.6); gramática section-label; spine/landing en el sitio;
  Schibsted Grotesk como sans.
- **Semántica registrada**: el arco = trayectoria sobre línea base (dos
  apoyos, un ápice); el punto del section-label es nodo del símbolo.

### 4. Tokens (`brand/tokens.css`)

- **Decisión (Ronny)**: mono canónica = **JetBrains Mono** (OFL),
  reemplaza a Berkeley Mono (documentos) y Geist Mono (sitio). Motivo:
  tipografía de libre uso en todos los artefactos; disuelve la
  restricción de licencia del repo público.
- **Decisión (Claude, revisable)**: la diferencia sitio/documentos en
  grises se codificó como regla por medio: en papel cada rol de texto
  baja un paso en la escala zinc (body 600→700, muted 400→500).
- **Decisión (Claude, revisable)**: escala pt unificada con body 9.3pt
  (fable 9.3 / codex 9.2 / resume 9.5); 9.3 cabe en la página de altura
  fija de las propuestas. El resume v1 adopta 9.3 (antes 9.5).
- **Decisión (Ronny)**: `--accent` reservado y VACÍO; el stress-test
  decide si `#b5523a` entra. Prohibido que un agente lo rellene.

### 5. Marks (`brand/mark.svg`, `brand/mark-32.svg`)

- **Hecho**: SVG canónico extraído de `logomark.tsx`; variante 32px de
  `icon.svg` con la regla de recalibración de trazos (1.5/1.75)
  documentada en DESIGN.md.
- **Regla**: componente del sitio, favicon y archivos de brand/ deben
  coincidir geométricamente; cambiar el mark es decisión de marca.

### 6. Templates (`brand/templates/proposal.html`, `resume.html`)

- **Hecho**: shells tokenizados extraídos de los specimens; contenido →
  placeholders `{{slot}}` con guía para el agente; tokens embebidos en
  bloque `/* @brand tokens v1 */` greppeable; fuentes relativas a
  `brand/fonts/` (JetBrains Mono + OFL.txt + Schibsted, commiteados).
- **Corrección de deriva**: el resume recupera el punto del
  section-label. Pendiente de juicio de Ronny en la revisión de paridad.

### 7. Contrato (`brand/DESIGN.md`)

- **Decisión (Ronny)**: el contrato se llama DESIGN.md y calca la
  estructura de vercel.com/design.md (contrato para agentes: contexto →
  prioridades → pases de trabajo → sistema visual → gramática publicada →
  reflejos rechazados → checklist).
- **Hecho**: escrito al final del proceso, documentando lo construido y
  auditado — no intenciones.

### 8. Skill (`.claude/skills/brand/SKILL.md`)

- **Decisión (Ronny)**: nace project-level en este repo; se promueve a
  `~/.claude/skills/` cuando madure (sandbox → tracción → catálogo).

### 9. Loop de verificación

- **Paridad estructural**: template + contenido original vs specimen,
  lado a lado, navegador + print preview. Juez: Ronny. Excepción
  declarada: reflow por el cambio de mono (Berkeley → JetBrains).
- **Loop de agente (test de la tesis)**: sesión fresca + skill + brief →
  documento nuevo juzgado contra el checklist de DESIGN.md, sin acceso a
  documentos previos.
- **Estado**: artefactos de paridad generados (copias v1 de ambos
  specimens + compare.html lado a lado); juicio de Ronny pendiente.
  Loop de agente fresco pendiente.

### 10. Reconciliación con reportes tardíos (2026-08-13, tarde)

Los dos subagentes (exploración y plan) reportaron DESPUÉS de construida
v1 — no murieron, fueron lentos. Lo incorporado de sus hallazgos:

- **`vaults/brand.md` existe** — "Marca rbadillap — filosofía del
  símbolo", documento canónico previo, git-ignored. DESIGN.md se
  realineó con su canon: semántica **baseline → emergence → synthesis →
  execution** (línea = base técnica; arco = idea que emerge, sintetiza y
  aterriza; tres puntos = partida, claridad, ejecución), espíritu
  ("mínimo, analítico, sobrio... una mente ordenando complejidad"),
  jerarquía por tinta antes que por tamaño, el símbolo completo una sola
  vez por superficie, criterios QA integrados al checklist y la pregunta
  maestra ("¿extensión del símbolo o una interfaz moderna más?").
- **`src/app/globals.css` ahora importa `brand/tokens.css`** en vez de
  duplicar valores — muere el eje de deriva contrato↔sitio (idea del
  agente plan). Build verificado; tokens presentes en el CSS compilado.
- **`.flush`** reemplaza el escape `style="margin-top: 0"` en el
  template de propuesta — cero estilos inline (idea del agente plan).
- Historia del dark mode: el sitio pre-rediseño ERA dark por defecto
  (`git show 1fd0210^:src/app/globals.css`, oklch + tokens shadcn). El
  rediseño lo eliminó deliberadamente. Input directo para el replay.

### 11. Juicio de paridad — primer hallazgo (2026-08-13)

- **Hallazgo (Ronny)**: en papel, los títulos de sección no tienen
  jerarquía — se confunden con las anotaciones internas de la sección
  (th de tablas, keys, eyebrows), que comparten color y tipografía.
  Causa raíz: la gramática del sitio (un solo mono por vista) se
  trasplantó a un medio denso en anotaciones mono; además Berkeley Mono
  solo tenía Regular, así que nada podía diferenciarse por peso.
- **Fix (Claude, dentro del canon "jerarquía por tinta")**: el label de
  sección sube un paso de tinta (muted→soft) y adopta JetBrains Mono
  Medium (500) — peso que Berkeley no ofrecía; las anotaciones internas
  quedan muted Regular. Web no cambia (ahí el label es el único mono en
  vista). Aplicado en ambos templates, DESIGN.md (gramática + reflejo
  prohibido nuevo) y copias v1 de paridad.
- **Decisión (Ronny)**: DESIGN.md SÍ será público — la publicación de la
  ruta `/design.md` es el ÚLTIMO paso, cuando el plan quede aprobado.
  Resuelve el pendiente de privacidad.

### 12. Juicio de paridad — segundo hallazgo: aire (2026-08-13)

- **Hallazgo (Ronny)**: todo muy condensado; falta espacio para
  respirar. Causa raíz: los specimens los densificaron agentes peleando
  contra páginas de altura fija — lo contrario del espíritu del canon
  ("mucho espacio en blanco").
- **Fix (Claude)**: ritmo de espaciado del papel subido ~15–30% en ambos
  templates (gaps de sección 20→26 / 23→28, label 11-12→14, p+p 6-7→8,
  line-heights 1.48→1.55 y componentes 1.3-1.36→1.4-1.45, padding de
  celdas y cards +2px). Regla nueva en DESIGN.md (per-medium + reflejo
  prohibido): **el aire no se comprime — se corta contenido o se añade
  página**.
- **Consecuencia asumida**: con más aire, el contenido real de una
  propuesta ocupa más páginas (el preview de paridad deja crecer las
  páginas para mostrarlo; el documento real se rebalancea por página).

### 13. Juicio de paridad — tercer hallazgo: bordes sin doctrina (2026-08-13)

- **Hallazgo (Ronny)**, cuatro síntomas: (a) el borde bajo el header de
  tabla parece pertenecer a la primera fila; (b) la última fila arrastra
  un borde huérfano; (c) ese borde huérfano choca con la regla del
  section-label siguiente; (d) `.rows` con bordes en una sección
  (`.terms`) y sin bordes en otra — mismo componente, distinto vestido.
  Causa raíz: en los specimens todo borde era `border-bottom` uniforme —
  accidente de implementación, no decisión.
- **Fix (Claude) — doctrina del hairline** (DESIGN.md, gramática):
  1. Un borde es separador entre hermanos o base propia de un head —
     nunca marco ni cierre. Implementación `tr + tr { border-top }`:
     imposible el borde colgante → muere el choque con section-labels.
  2. Rango por tinta: el head de tabla asienta sobre 1px muted (un solo
     trazo oscuro por tabla); separadores de hermanos en `--border`.
  3. Dos hairlines nunca se apilan; el aire gana.
  4. Un componente, un vestido: `.rows` nunca lleva bordes; `.terms`
     muere — lista con peso de ledger = `.data-table`.
- Reflejo prohibido nuevo registrado en DESIGN.md.

### 14. Stress-test ronda 2: FAQ y cotización con precios (2026-08-13)

- **Método**: 4 agentes independientes (2 por encargo), a ciegas — solo
  DESIGN.md + template, sin specimens ni acceso entre ellos. Encargos:
  Engagement FAQ (inglés) y cotización con líneas de precio y total
  (español). Outputs en scratchpad/hostile/.
- **Convergencias → canonizadas**:
  - FAQ: ambos agentes eligieron `.data-table` con `.row-id` Q1–QN,
    pregunta en columna strong, secciones temáticas. Ninguno lo marcó
    como invención (compusieron de primitivas publicadas). → publicado
    como uso de `.data-table`.
  - Total de cotización: ambos lo resolvieron como fila hermana normal
    (sin borde de cierre), separador promovido a tinta muted, importe en
    strong. → canonizado `tr.total`.
- **Bug de template encontrado por el test**: colisión de nombre `.gate`
  — vestido de card (borde/radius/padding) definido con selector global
  se filtraba al uso inline dentro de `.rows`. Los dos agentes de
  cotización lo esquivaron (uno con reset, otro evitando la clase);
  faq-a pisó la mina y renderizó la frase enmarcada. Origen: mi fusión
  de las gramáticas codex+fable. → Fix: dress scoped a
  `.gate-flow .gate`; DESIGN.md define `.gate` = condición dura, un
  significado, vestido según contexto.
- **Legislado**: `style` inline prohibido salvo widths en `<col>`
  (geometría de contenido — los 8 casos detectados eran del template).
- **Cumplimiento (los 4 outputs)**: 0 colores fuera de escala, 0
  tamaños fuera de tokens, punto del section-label presente, `--accent`
  vacío, footers paginados. La tesis del sistema (agente fresco →
  documento on-brand sin ver documentos previos) queda validada con
  evidencia.
- Español confirmado como dimensión no-hostil: keys largos y cifras no
  rompieron la gramática.

### 15. Reporte verbal de quote-a — legislación fina + defecto de print (2026-08-13)

Del reporte de ambigüedades del agente quote-a (lo que los archivos no
mostraban):

- **Defecto de print CONFIRMADO y corregido**: el template de propuesta
  imprimía 3 hojas PDF para 2 páginas (redondeo de `height: 11in` con
  `@page margin 0` en Chrome). Reproducido con Chrome headless (3 hojas),
  fix `height: calc(11in - 1px)` solo en `@media print`, verificado (2
  hojas). El defecto venía de los specimens.
- **Legislado en DESIGN.md**:
  - `.num` para columnas numéricas (alineación derecha, tabular figures)
    — no existía regla de alineación numérica.
  - Página subllena es correcta: el footer ancla a la base y el aire se
    queda; prohibido estirar o rellenar. (El "paper breathes" corta en
    ambos sentidos.)
  - Español conserva tildes también en labels mono uppercase.
  - Checklist 7 reescrito: "byte for byte" era insatisfacible (el bloque
    del template omite comentarios); ahora exige igualdad de VALORES.
- Pendiente: reportes verbales de faq-a, faq-b y quote-b — se integran
  al llegar.

### 16. Reportes de faq-a, faq-b y quote-b integrados → contrato v1.1 (2026-08-13)

Hallazgo de PROCESO (faq-b): edité contrato y template mientras los
agentes trabajaban, ambos etiquetados "v1" sin marcador de revisión —
faq-b lo detectó diffeando antes de entregar; sin eso habría embarcado
la gramática vieja. → **Versionado**: DESIGN.md y templates versionan
juntos (v1.1); regla escrita en el header del contrato: una generación
entrega bajo la versión que leyó o re-sincroniza, nunca mezcla.

Demás legislación integrada:
- `--accent: ;` leída como CSS inválido por dos auditores → la reserva
  es ahora COMENTARIO, no declaración (tokens.css + templates); build
  del sitio verificado tras el cambio.
- Doctrina de hairlines aclarada: gobierna REGLAS (1px); los enclosures
  (.cards, .gate-flow .gate, .memo) son otra clase de elemento —
  patrones publicados, nunca improvisados.
- Mark: un documento multipágina es UNA superficie — mark solo en
  página 1; las de continuación llevan la línea de identidad del footer.
  Checklist 1 reescrito.
- Checklist 2 reescrito: "one strong element" → un elemento FOCAL
  strong; la textura strong (primeras columnas, keys, .gate) no compite.
- Column counts de .cards/.gate-flow = geometría de contenido (como
  widths de <col>) — comentado en template; "the stylesheet travels
  whole" legislado (documento lleva el stylesheet completo, diffeable).
- Moneda: `USD 2,400` en ambos idiomas (evidencia: corpus existente).
- Labels nunca envuelven: label ≈ media columna = es título, no label.
- Aire final del documento: la banda grande al final, no en medio.
- Checklist 10 nuevo: sin comentarios de fill-in ni {{slots}}; un
  comentario de procedencia (template + versión).
- Fonts: los 4 woff2 de Schibsted eran byte-idénticos → queda solo
  schibsted-400.woff2 + README de brand/fonts/. PENDIENTE: verificar
  que es variable real (los pesos 600/650 podrían ser síntesis del
  navegador).

### 17. La infraestructura de preview mentía (2026-08-13)

- **Hallazgo (disparado por Ronny: "¿cambiaron el sans?")**: las páginas
  de juicio se abrían vía `file://`; Chrome pide webfonts en modo CORS y
  los orígenes file:// son opacos → las fuentes NUNCA cargaron. Todos
  los juicios previos (rango de títulos, aire, bordes) se hicieron sobre
  SF Pro / mono de sistema, no sobre Schibsted + JetBrains. Tres agentes
  auditores habían chocado con el mismo muro (por eso montaron
  localhost propio para verificar).
- **Fix**: fuentes copiadas al scratchpad, URLs reescritas a relativas,
  servidor `python3 -m http.server 8471` sobre el scratchpad; juicio
  ahora en http://localhost:8471/. Verificado en el navegador:
  `document.fonts` reporta Schibsted loaded.
- **Regla de proceso**: las páginas de juicio visual SIEMPRE se sirven
  por localhost, nunca file:// — el fallback de fuentes es silencioso y
  contamina el juicio.
- **Consecuencia**: los juicios de las entradas 11–14 merecen una
  re-mirada rápida con las fuentes reales (los fixes eran de espaciado,
  tinta y bordes — probablemente sobreviven — pero el juicio formal se
  hizo sobre fuentes equivocadas).

### 18. Stress-test ronda 3: proposal.html (gen3) → contrato v1.2 (2026-08-13)

- **Specimen**: `applications/lcm-go-cloud/proposal.html` — documento
  VIVO de la aplicación LCM, escrito en paralelo por un agente que NO
  sabe que el brand system existe (instrucción de Ronny: no tocarlo;
  trabajar sobre copia). **Primer miss real de adopción del sistema —
  evidencia directa para la promoción del skill/contrato.**
- **Convergencia clave**: el documento necesitó la anatomía .memo TRES
  veces y la nombró tres veces distinto (.summary-grid, .commercial-grid,
  .credential-grid). La anatomía es canon; el enforcement de nombres es
  el hueco. → aliases muertos registrados; .memo.figures publicado
  (stat strip).
- **Primitivas canonizadas** (estructura, sin decisión de color):
  .title-note (abstract de header), .list/.cols-2 (viñetas de guion —
  la gramática de propuesta no tenía listas), .next-step (card de
  cierre), h2+p de capítulo, título strong opcional en .callout.
- **Decisiones de branding (Claude, delegadas por Ronny, revisables)**
  con estándar explícito: canonizar con 2 votos independientes,
  registrar con 1:
  1. **Acento ENTRA: #9f4b37, solo papel** (2 votos: fable #b5523a,
     gen3 #9f4b37; gana gen3 por sobriedad y contraste ~7:1 en micro).
     Ley: .row-id.hot + máx UN .callout.accent por documento; el sitio
     sigue monocromo.
  2. **Escala se queda zinc** (warm-shift de gen3 = 1 voto; fable usó
     zinc puro). Hilo abierto con A/B barato si reaparece.
  3. **Sin wash** (1 voto; el sitio no tiene fills en ningún elemento).
- **Deriva registrada como reflejos**: 4.ª nomenclatura de tokens
  (--ink/--canvas/--wash...), warm-shift, wash de fondo.
- **Demo**: proposal-gen3-v12.html (workspace) — contenido gen3
  rebasado a v1.2, verificado: 0 clases viejas, 0 inline styles no-col,
  exactamente 1 callout accent. Juicio en hostile-juicio.html.

### 19. Diagramas tokenizados + mandato de port → contrato v1.3 (2026-08-13)

- **Hallazgo (Ronny)**: los diagramas — comunes en cotizaciones —
  faltaban en la gramática estresada. Auditoría de los dos specimens
  (codex: architecture review map; fable: panorama de servicios):
  TODO estaba hardcodeado en atributos de presentación
  (`font-family="'Berkeley Mono'"`, hex sueltos por `<text>`) — la
  fuente de deriva máxima del corpus.
- **Fix**: diagrama tokenizado. Clases `d-*` publicadas en el template
  (zones, nodes normal/open/focal/hot, flows, títulos/anotaciones,
  refs, masks, legend) consumiendo tokens vía CSS; prohibido estilar
  SVG por atributos. Ejemplo mínimo en el template, en página propia
  (verificado: 3 hojas para 3 páginas). El hot-path de fable se ata a
  la ley del acento (tercer uso publicado: nodo/flujo `.hot` — la misma
  dimensión crítica que `.row-id.hot`). Demo: el panorama de fable-v1
  remapeado al acento canónico (6 ocurrencias #b5523a → #9f4b37).
- **GATE DE PUBLICACIÓN (Ronny)**: `/design.md` NO se publica hasta que
  `applications/lcm-go-cloud/proposal.html` tenga el branding al 100%.
  **El port es responsabilidad del brand engineer** (Claude), como paso
  final, cuando el contenido del archivo vivo se estabilice.

### 20. Escala de lectura 16 → contrato v1.4 (2026-08-13)

- **Decisión (Ronny)**: "yo soy más de 16" — todo se veía
  extremadamente pequeño. Diagnóstico: la densidad 9.3pt venía heredada
  de los specimens (compresión de agentes), no de la identidad; y el
  medio real de estos documentos es la PANTALLA (PDFs leídos en
  pantalla, casi nunca impresos).
- **Fix (Claude)**: escala de papel re-anclada a lectura de 16px =
  12pt body. Nueva escala: 2xs 8.5 / xs 9.5 / sm 10.5 / body 12 /
  md 13 / lg 16 / name 24 / title 27. Los labels crecen menos que el
  body para que el registro mono siga siendo anotación. Sitio: body
  15px → 16px (registrado como revisable — el 15 era el ajuste manual
  previo de Ronny). Verificado: template 3 hojas = 3 páginas; build del
  sitio verde.
- **Consecuencia**: los documentos ocupan más páginas (regla vigente:
  se corta contenido o se añade página). El port de proposal.html
  deberá rebalancear con esta escala.

### 21. Escala juzgada: 15 → contrato v1.5 (2026-08-13)

- **Juicio (Ronny)**, con compare 16 vs 15 sobre el documento LCM
  rebasado: "15 definitivamente mejor". El ancla de lectura de la marca
  es **15px en todo medio**: papel body 11.25pt (escala completa: 2xs 8 /
  xs 9 / sm 10 / body 11.25 / md 12 / lg 15 / name 22.5 / title 25.5);
  sitio vuelve a su 15px original (el 16 de la entrada 20 duró una
  iteración — el instinto dijo 16, el ojo eligió el 15 que Ronny ya
  había afinado a mano en el sitio).
- Verificado: template 3 hojas = 3 páginas; build del sitio verde;
  demos servidos regenerados a v1.5.
- Nota de método: el loop juicio-sobre-compare (dos anclas, contenido
  real, scroll paralelo) resolvió en minutos lo que la conversación
  sobre números no habría resuelto — patrón a repetir para decisiones
  de valor perceptual.

### 22. Port ejecutado y entregado (2026-08-13)

- **Port final**: contenido del proposal.html vivo (7 páginas densas,
  4.ª generación con document-map, support-grid, continuation-flow)
  rebasado íntegro al sistema v1.6 → **14 páginas**, repaginación por
  MEDICIÓN (alturas reales por sección vía Chrome + fuentes cargadas;
  presupuesto 916px/página; tablas largas partidas con thead repetido).
- Primitivas de 4.ª generación canonizadas antes del port:
  `.document-map` (TOC navegable, anchors en SECCIONES — mejora sobre
  el original que anclaba páginas), capa de navegación en pantalla
  (smooth scroll + scroll-margin), `.memo.two`, `.gate-flow.duo`;
  estados interactivos (focus) = único acento legal fuera de la
  dimensión crítica. Acento del documento: el callout "Phase A
  acceptance gate" (los otros 3 bajaron a plano).
- **Verificado**: 0 desbordes en 14 páginas (scrollHeight==clientHeight
  con fuentes reales), 14 hojas PDF, anchors resuelven, 1 callout
  accent, 0 colores/tamaños/inline-styles fuera de sistema, 0 Berkeley,
  0 slots; el archivo vivo no cambió durante el port (diff verificado).
- **Entrega (orden de Ronny)**: original respaldado como
  `proposal-pre-brand.html`; port instalado como `proposal.html` (fonts
  → `../../fonts/`; JetBrains Regular+Medium añadidas al lab).
  Costo honesto registrado: 7→14 páginas; recorte candidato si pesa:
  las 3 páginas de operaciones opcionales.
- **Git**: branch local con el sistema completo, SIN push (orden
  explícita). Pendiente: push + deploy (= publicación de /design.md)
  cuando Ronny lo ordene.

### 23. proposal-min: la imitación (gen5) → port + contrato v1.7 (2026-08-13)

- **Detección**: barrido por marcador (`grep -L "@brand tokens"` sobre
  HTML recientes) — Ronny ni tuvo que decir cuál era. Encontrado:
  `proposal-min.html`, creado 40 min DESPUÉS del port del proposal
  grande, por el agente LCM.
- **El modo de deriva nuevo y más peligroso: la imitación.** El archivo
  DECLARA "rbadillap brand v1.6" y copia el sistema a ojo al ~90%:
  acierta ley de acento, hairlines, rango de section-label. El 10%:
  `.data-table.compact` inventada (9.35pt off-scale, lh 1.32), body
  11pt vs 11.25, aire afeitado ~8% en cada padding/gap, diagrama con
  clases renombradas y markers con hex en atributos, sin scope .paper,
  voz ASCII (`-`, `>`, "San Jose"), sin document-map en 7 páginas.
  El casi-cumplimiento LEE como cumplimiento — solo el bloque verbatim
  del template es cumplimiento. → 3 reflejos prohibidos nuevos en
  DESIGN.md (v1.7): stylesheet reconstruido a ojo, claim falso de
  procedencia, sustitutos ASCII.
- **Port**: stylesheet → bloque v1.6 real; `.compact` eliminada;
  diagrama → clases `d-*` y markers tokenizados; voz restaurada
  (`·`, `→`, José); document-map + ids de sección añadidos (contrato:
  obligatorio en 5+ páginas); repaginación medida 7→10 páginas (tablas
  D7-D12 en 3+3 y Phase B en 3+1 con thead repetido). Verificado: 0
  desbordes, mapa resuelve, 1 callout accent + 1 row-id hot (misma
  dimensión: ad path), 10 hojas PDF con fuentes embebidas.
- **Entrega**: backup `proposal-min-pre-brand.html`; port instalado
  como `proposal-min.html`; `proposal-min.pdf` regenerado vía
  localhost.
- **Lección de adopción (la segunda en un día)**: el agente LCM ahora
  IMITA el sistema en vez de ignorarlo — señal de que lo ve y lo
  quiere, pero no lo carga. La promoción del skill + /design.md público
  convierte imitación en cumplimiento.

### 24. Bug de print: colapso móvil en PDF → contrato v1.8 (2026-08-13)

- **Reporte (Ronny)**: los PDFs mostraban contenido superpuesto en cada
  inicio de página. Diagnóstico por inspección VISUAL del PDF en el
  navegador (screenshot): el PDF renderizaba el **layout móvil** (gates
  apilados, tablas colapsadas).
- **Causa raíz**: el media query responsive del template estaba SIN
  calificar — `@media (max-width: 820px)` — heredado del specimen de
  fable. Sin tipo `screen`, aplica a print; el papel carta imprime a
  816px < 820px → colapso móvil en PDF → contenido desborda las páginas
  fijas y sangra entre hojas. Explica también el 3-hojas-para-2-páginas
  de la entrada 15 (el calc(11in-1px) fue curita sobre herida
  equivocada; se conserva por el redondeo real).
- **Ironía registrada**: proposal-min (la imitación) tenía el query
  BIEN calificado — mi port le inyectó el bug al reemplazar su
  stylesheet. La imitación corrigió al sistema en un punto; auditar en
  ambas direcciones.
- **Fix**: `@media screen and (max-width: 820px)` en template + ambos
  ports (lab y workspace) + demos; PDFs regenerados y verificados
  VISUALMENTE (página 8 del min: gate-flow horizontal, tablas de 3
  columnas, cero sangrado).
- **Legislado (v1.8)**: regla per-medium "responsive rules are
  screen-only" + checklist 9 reescrito: la verificación de print es
  visual, no solo conteo — "a correct count over a broken layout has
  happened".

### R6. Diagrama bajo el skill diagram-design (2026-08-13)

- **Contexto corregido**: `proposal-ronny.html` EXISTE (la versión de
  Ronny, 4 columnas, descendiente del port de 14 pág) — eso significaba
  "mas no en ronny" en R5. Interpretación anterior inofensiva.
- **Skill adoptado** (plugin no registrado como skill invocable — leído
  y seguido directo: SKILL.md + style-guide.md + type-architecture.md).
  Su skin rbadillap estaba desfasado (onboardeado del sitio
  pre-sistema): re-sincronizado al contrato v2.2 (accent #9f4b37 con su
  ley; JetBrains como mono de marca — desviación documentada de la
  regla genérica del skill).
- **Auditoría del diagrama vivo** (el agente LCM lo complejizó): annos
  mono más anchas que sus nodos (la causa de todos los choques del
  screenshot de Ronny), canaleta CF→Media abrazando bordes Y redundante
  (el nodo ya anota "served through CloudFront" — regla del skill:
  eliminar), nodos de datos angostos para 2 líneas, clases d-boundary
  inventadas (canonizables). Lo que el agente hizo BIEN: un bridge
  correcto, fans de attach points, acento en una sola dimensión.
- **Fix mínimo-invasivo**: canaleta eliminada (ledger de fidelidad: la
  semántica vive en la anno del nodo), nodos app 160→168 y datos
  112→128 (grid de 4), 5 recortes editoriales de annos, máscara del
  boundary-label ajustada. Verificación VISUAL en navegador: cero
  choques, flujos trazables, hot path legal.
- **Mismo diagrama en ambos documentos** (orden de Ronny):
  proposal.html corregido in situ; proposal-ronny.html ganó página
  "Architecture map" propia (+ CSS d-boundary + entrada en su
  document-map, que completó la cuadrícula 4×2) → 15 pág; y su página
  D1-D6 desbordaba 222px POR el contenido 4-col pre-existente → tabla
  partida 3+3 con thead repetido (tabla sigue tabla: su decisión) → 16
  pág. PDFs: 11 y 16 hojas, fuentes embebidas.
- Backups: proposal-diagrama.backup.html,
  proposal-ronny-sin-diagrama.backup.html.
- Pendiente de canonizar en template: `.d-boundary`/`.d-boundary-label`
  (invención del agente, funciona, dos votos aún no — registrada).

## Port pendiente: proposal.html (LCM) — procedimiento

Cuando Ronny dé la señal (contenido estable):

1. Copiar la versión final de
   `~/code/lab/resume-v4-src/applications/lcm-go-cloud/proposal.html`
   al workspace (NUNCA editar el original sin instrucción).
2. Aplicar la transformación (probada en proposal-gen3-v12.html):
   head/style del template v1.3 · clases: summary/commercial/credential-grid
   → `.memo`/`.memo.figures` · `.method`→`.cards` (`.number`→`.eyebrow`) ·
   `.decisions`/`.delivery`/`.responsibility` → `.data-table` con widths
   en `<col>` · `.decision-id`→`.row-id` · `.boundary-list`→`.list.cols-2` ·
   `.answer-list`→`.list` · inline styles → `.flush`/`h2+p` · acento: máx
   1 `.callout.accent`, ids `.hot` solo en la dimensión crítica ·
   diagramas (si los gana) → clases `d-*`.
3. Rebalancear contenido por página (aire v1.2 ocupa más) y renumerar
   footers.
4. Verificar: checklist de DESIGN.md completo + hojas PDF == páginas
   (Chrome headless) + juicio visual de Ronny vía localhost.
5. Con el port aprobado: commit del repo + publicar `/design.md`
   (deploy), en ese orden.

## Replay dark mode — EN CURSO (2026-08-13)

Primera ejecución real de la sección de replay. Mandato de Ronny: dark
mode no es poner colores opuestos — es crear un branding, con el mismo
proceso del light.

### R1. Dossier de insumos

- **Histórico 1**: el sitio pre-rediseño era DARK por defecto, de la
  mano de Ronny (`git show 1fd0210^:src/app/globals.css`): fondo
  `#18181b`, texto `#a1a1aa`, strong `#e4e4e7`, muted `#71717a`, border
  `#52525b`. La MISMA escalera zinc del light con roles rotados — la
  tinta de hoy era el suelo de ayer. Semilla anti-inversión: el
  material es la escalera; light/dark son posiciones sobre ella.
- **Histórico 2**: `src/components/color-control.tsx` (widget muerto)
  — su default también era dark zinc.
- **Canon**: `vaults/brand.md` — "el blanco domina" es doctrina del
  light; en dark se re-deriva qué domina, no se invierte.
- **Decisiones de Ronny (2026-08-13)**: superficies v1 = SOLO WEB
  (documentos siguen light; print siempre light — regla a canonizar);
  mecanismo = auto por OS (`prefers-color-scheme`), cero UI nueva.
- **Método paso 2**: 3 agentes ciegos entre sí, mismo encargo (home
  dark standalone), lentes distintas — A ciego (solo contrato),
  B histórico (+ paleta pre-rediseño), C filosófico (+ vaults/brand.md
  y la pregunta "¿qué ES el dark mode de este símbolo?").

### R2. Specimens entregados + auditoría de convergencia (2026-08-13)

Los 3 agentes entregaron (A ciego, B histórico, C filosófico), ciegos
entre sí. Auditoría con el estándar 2-votos:

- **Tesis identitaria: 3/3 CONVERGEN** (canon): dark no es el light
  invertido — es el plano técnico sin luz, donde lo legible es luz
  EMITIDA y se administra como el light administra la tinta; la
  oscuridad domina como el blanco domina en light ("que el blanco
  domine" era ley de ración, no de color — lectura de C). Nada estático
  alcanza el blanco: la luz plena existe solo bajo la mano del lector.
- **Valores convergidos** (canon): strong `#d4d4d8` (zinc-300, 3/3
  exacto — "un peldaño antes del tope; firme, nunca una lámpara");
  body `#a1a1aa` (3/3 — el MISMO body del dark histórico de Ronny:
  continuidad real); muted `#71717a` (2/3: A+B; C quería `#52525b` por
  paridad perceptual — registrado); border `#27272a` zinc-800 (2/3:
  A+B; C quería `#302f2b` más presente con la tesis "en el plano sin
  luz la base ES el material, iluminado" — registrado).
- **Principio del suelo: 3/3** — off-ladder ("el suelo es material, la
  tinta es la escalera") y rechazo unánime del `#18181b` histórico
  porque hoy es tinta strong ("un suelo que dobla como tinta es la
  huella del espejo" — B).
- **DIVERGENCIA A JUICIO: la temperatura del suelo.** A `#0a0a0a`
  (neutro, sin tinte), B `#121316` (frío, +azul), C `#100f0d` (cálido —
  simétrico del papel cálido). La única decisión identitaria abierta;
  perceptual → compare de 4 paneles.
- Secundaria a juicio: selection (A: luz strong emitida; B: apagada;
  C: `#f4f4f5` luz plena solo bajo la mano — la única que cumple la
  tesis 3/3 literalmente).
- Specimen 0 (histórico exacto) reconstruido como panel de referencia.

### R3. Veredicto y canonización → contrato v1.9 (2026-08-13)

- **Juicio (Ronny): specimen A** — suelo neutro `#0a0a0a`, sin tinte
  ("el plano apagado no es material, no lleva tinte").
- **Meta-hallazgo mayor**: A era el agente CIEGO — solo el contrato.
  El sistema sin insumos extra produjo el canon que el ojo de Ronny
  eligió sobre la continuidad histórica y la lectura filosófica. El
  test de agente-fresco del paso 6 queda satisfecho por construcción:
  A ERA ese test.
- **Canon dark (web only)**: ground `#0a0a0a` · strong `#d4d4d8` ·
  body `#a1a1aa` (el mismo del histórico — continuidad emergente) ·
  muted `#71717a` · border `#27272a` · selection = strong-on-ground vía
  variables (luz plena solo bajo la mano). Leyes: nada estático alcanza
  el blanco; el acento sigue siendo de papel — en dark la luz ES el
  acento; papel SIEMPRE light (roles pineados en .paper).
- **Implementado**: tokens.css (bloque `prefers-color-scheme: dark` +
  pines light en .paper), DESIGN.md v1.9 (sección "Dark variant", no
  fork), viewport themeColor dual, favicon con media query propia
  (geometría intacta, solo pintura). Build verde; bloque dark
  verificado en el CSS compilado.
- El replay light→dark completo tomó ~40 minutos de pared: dossier →
  3 specimens ciegos → auditoría → juicio → canon. El proceso
  documentado funciona.

### R4. El sitio con el branding adaptado → contrato v2.0 (2026-08-13)

Corrección de rumbo de Ronny: la meta del branch es EL SITIO adaptado,
no la publicación de /design.md (ese gate es suyo, sin fecha).

- **Metadata alineada al dominio canónico** (decisión Ronny):
  ronnybadilla.com en metadataBase, authors, og:url.
- **Limpieza del canon** (decisión Ronny): eliminados
  color-control.tsx (55 hex de escalas ajenas, no importado) y
  components.json (shadcn sin shadcn); comment de globals.css al día.
- **Tecla D** (decisión Ronny: "patrón común que ya ni siquiera hace
  necesario poner el icono"): toggle light/dark sin UI — el toggle es
  conocimiento, no chrome. Implementación: patrón 3 estados en
  tokens.css (auto-OS default, data-theme override en ambas
  direcciones), theme-key.tsx (ignora inputs/modificadores, persiste,
  actualiza theme-color), anti-FOUC inline en layout.
- **Verificado en navegador real** (dev server): D alterna
  #0a0a0a↔#fafaf8 con persistencia; "d" dentro del input del
  newsletter NO cambia el tema; build verde; compare light|dark del
  build real servido para juicio.
- Incidente menor registrado: el primer test corrió contra el dev de
  agent-plugins.directory (puerto 3000 ocupado); su localStorage.theme
  fue tocado y restaurado a default con removeItem. Lección: verificar
  el TITLE de la página antes de testear.
- Contrato v2.0. Sugerencia para Ronny (su documento, su mano): la
  tabla-apéndice de vaults/brand.md podría ganar filas para la
  variante dark, el favicon dual y la tecla D.

### R5. La estrofa — 4 facetas sin 4 columnas → contrato v2.2 (2026-08-13)

- **Solicitud de última hora (Ronny)**: el agente LCM añadió una 4.ª
  columna a las tablas de decisiones ("What we need to decide") —
  información válida, jerárquicamente desigual. "¿Qué componente
  propondrías?"
- **Diagnóstico**: la geometría de tabla raciona rangos IGUALES; 4
  columnas de prosa en carta = celdas ilegibles y jerarquía falsa.
  Cuando los rangos son desiguales, la jerarquía migra de la geometría
  a la tipografía — la gramática del sistema.
- **Componente canonizado: la estrofa** — `.rows` + `.facet` /
  `.facet-label` (registro th). Cuerpo = la faceta dominante; facetas
  secundarias como líneas anotadas. Regla de elección en DESIGN.md:
  tabla cuando el escaneo columnar entre items importa más que la
  jerarquía; estrofa cuando no. Aprobado por juicio con demo de
  contenido real.
- **Aplicado en proposal.html LCM** (instrucción: "en proposal mas no
  en ronny"): las 3 tablas de decisiones (D1–D12, 4 col) → estrofas
  (key = decisión + row-id, cuerpo = what-we-need-to-decide, facetas =
  evaluación y evidencia; D2 hot preservado). La tabla de
  responsabilidades ("Ronny") y las demás 3-col SIGUEN siendo tablas.
  Sitio y templates personales: sin cambios de layout — interpretación
  registrada de "yo me quedo con las 4 columnas" (sus superficies
  conservan tablas; corregible si refería otra cosa).
- **Nota operativa**: el archivo vivo cambió DOS veces bajo mis pies
  (agente LCM activo — 10 páginas nuevas, min-estructura, a las 18:59).
  El pipeline se re-corrió sobre snapshot con guardia de diff antes de
  instalar. Backup: proposal-tabla-phaseb.backup.html.
- Verificado: 11 páginas, 0 desbordes, mapa resuelve, 24 facetas, cero
  tablas 4-col, PDF 11 hojas con fuentes embebidas.

### R7. Product, no Design — hotfix de posicionamiento → contrato v2.3 (2026-08-14)

- **Origen (Ronny)**: el headline público decía "Design / DevOps / AI
  Engineer"; la disciplina correcta es Product — "son disciplinas
  diferentes". Corregido como hotfix desde main, sin esperar este branch.
- **Hotfix en main** (branch `chore/metadata-cleanup`, FF-merge,
  deployado a producción): tagline → "Product / DevOps / AI Engineer"
  en `content/home.md`; `layout.tsx` deriva sus tres descriptions de
  `home.tagline` (fuente única); `public/og.jpg` (texto quemado en
  píxeles) reemplazado por `src/app/opengraph-image.tsx` — ImageResponse
  en build que deriva nombre y tagline del content. La share card ya no
  puede driftar del copy.
- **Merge main → branch** (`0c54f32`): conflicto único en `layout.tsx`;
  resolución preserva la intención de cada lado — ronnybadilla.com,
  JetBrains Mono y ThemeKey (branch) + derivación `home.tagline` y sin
  `og.jpg` (main).
- **Alineación al sistema**: DESIGN.md §Context "design/DevOps/AI
  engineer" → "product/DevOps/AI engineer" → bump v2.3. La OG route
  cambia Geist Mono → JetBrains Mono (fetch de Google Fonts en build;
  los woff2 de `brand/fonts/` no sirven aquí — satori no lee woff2) y
  documenta que su paleta espeja tokens.css (#fafaf8 / #18181b /
  #a1a1aa — los valores ya coincidían, solo faltaba la trazabilidad).
- **Drift corregido de paso**: resume.html declaraba v1.7 pese a su
  propia regla "any revision to either bumps both" (proposal iba en
  v2.2). Ambos templates sincronizados a v2.3 — solo el header, cero
  cambios de shell.
- Verificado: build estático OK con /design.md y /opengraph-image;
  la OG card renderiza el tagline nuevo en JetBrains Mono. Juicio
  visual de Ronny: pendiente.

### R8. El branding a partir de shadcn — primitivos del símbolo → contrato v3.0 (2026-08-14)

- **Origen (Ronny)**: "no puedo mantener dos cosas al mismo tiempo, o
  estoy en react/next o en html/css" → migrar el branding a su stack.
  Scope explícito: SOLO el homepage actual; proposals/resumes ignorados
  hasta un task futuro. Segunda corrección suya, rechazando el primer
  plan (nomenclatura propia + `.paper` heredado): "shadcn es 100%
  customizable y el branding podría crearse a partir de ahí" — la marca
  se expresa como theme shadcn, no como vocabulario paralelo.
- **Anatomía adoptada** (leída del source en el fork
  `~/code/github/rbadillap/ui`, registry new-york-v4): funciones planas
  `React.ComponentProps` + spread, `data-slot` en cada parte, `cn()`
  className-último, `cva` solo con variantes reales, cero Radix sin
  comportamiento.
- **Tokens**: `brand/tokens.css` eliminado; `src/app/globals.css` es la
  fuente única, en vocabulario shadcn con valores de marca. Mapping:
  strong→`--primary`, body→`--foreground`, muted→`--muted-foreground`,
  ground→`--background`, hairline→`--border`. Roles sin uso declarados
  provisionales (escalera zinc); `--radius: 0` por mandato. Colisión
  `--accent` resuelta en DESIGN.md: el de shadcn es tint de superficie,
  la ley terracota gobierna solo papel. `.paper` NO migró — documentos
  pospuestos; sus valores viven congelados (nombres v2) en los bloques
  `@brand tokens` de los templates.
- **Primitivos** (`src/components/ui/`): `Node` (el punto), `Rule` (la
  base; el spine es un Rule vertical), `Meta` (registro mono; variantes
  label/data), `Mark` (el arco — único lugar del símbolo completo).
  Los gestos son composiciones: section label = Node+Meta+Rule; el
  aterrizaje = Rule+Node. `components.json` restaurado (baseColor zinc)
  para `shadcn add` futuro. Deps nuevas: clsx, tailwind-merge, cva.
- **Verificado (no inferido)**: paridad PIXEL-PERFECT — screenshots
  antes/después (1280×900, light y dark) con MD5 idénticos; audit DOM:
  `data-slot` mark=1, node=7 (6 secciones + landing), rule=8 (+spine),
  meta=10; build estático limpio; cero referencias a la nomenclatura
  vieja en `src/`.
- Contrato → **v3.0** (cambio de lenguaje del sistema); templates
  re-headereados v3.0 sin cambios de shell.
- **Corrección (Ronny, mismo día)**: (1) los primitivos se mueven de
  `src/components/ui/` a `src/components/` — `ui/` queda RESERVADO para
  lo que instale `shadcn add`. (2) Los roles sin uso NO se rellenan
  "provisionales desde la escalera": lo correcto es que el branding
  PROPONGA su derivación aunque nadie los use aún. Re-derivados con
  doctrina: superficies no elevan (card/popover = `var(--background)`),
  la interacción profundiza tinta (secondary/muted/accent = un aliento
  de tinta `#f4f4f2` conservando el cast cálido; emitido `#18181b` en
  dark), inputs sobre hairlines (`var(--border)`), focus = énfasis
  (`var(--ring)` → primary), y `--destructive` propone la terracota
  `#9f4b37` — el único pigmento de la marca marca lo crítico; extensión
  de la ley del acento al web, ratificación pendiente.
  `--primary-foreground` ahora se auto-deriva: `var(--background)`.

## Replay para una variante nueva (p. ej. dark mode)

El contrato y la gramática NO cambian; cambian valores de tokens y las
reglas por medio. Pasos parametrizados:

1. **Superficies**: confirmar cuáles reciben la variante (¿solo web? ¿PDF
   dark no existe como medio?). Decisión de Ronny.
2. **Ambiente hostil**: generar specimens reales de la variante con 2+
   agentes independientes ANTES de canonizar nada (mismo rol que
   codex/fable en light). Auditar convergencias y derivas.
3. **Invariantes**: verificar cuáles sobreviven (¿el papel cálido tiene
   equivalente oscuro o el fondo es otro material? ¿el mark invierte o
   mantiene strong?). Todo cambio de invariante es decisión de Ronny.
4. **Tokens**: nueva columna de valores para los MISMOS roles en
   `tokens.css` (scope `[data-theme="dark"]` o equivalente). La regla
   "papel baja un paso de contraste" debe re-derivarse para la variante,
   no copiarse.
5. **Marks**: revisar recalibración de trazos sobre fondo oscuro.
6. **Templates**: los shells no cambian; solo consumen los tokens nuevos.
7. **Contrato**: DESIGN.md gana una sección de variante, no un fork.
8. **Skill**: sin cambios si el contrato absorbe la variante.
9. **Verificación**: mismo loop — paridad contra los specimens hostiles
   del paso 2 + agente fresco + juicio de Ronny.

## Pendientes registrados

- Juicio de paridad de Ronny (artefactos generados en el scratchpad de
  la sesión 2026-08-13) + loop de agente fresco.
- **RATIFICAR (Ronny)**: `vaults/brand.md` dicta "Radius 0, sin sombras"
  para el sitio; los documentos papel canonizaron cards con radius 6px y
  la sombra de hoja (convergencia codex+fable). DESIGN.md lo codificó
  como excepción por medio — falta que Ronny lo ratifique o extienda la
  doctrina radius-0 al papel (rompería paridad con los specimens).
- ~~PRIVACIDAD~~ RESUELTO (Ronny, 2026-08-13): DESIGN.md será público;
  publicar la ruta `/design.md` (commit + deploy) es el ÚLTIMO paso, al
  aprobar el plan. Hasta entonces todo queda local.
- Decisión del acento (candidato: terracota `#b5523a`) vía stress-test.
- Skill: project-level NO carga al trabajar en otros repos
  (resume-v4-src, licensekey.ai) — limitación aceptada por decisión de
  staging; resolver al promover a `~/.claude/skills/`.
- Superficie artículos: `vaults/articles/style.css` re-declara la paleta
  con una 3.ª nomenclatura (`--bg/--ink/--body/--muted/--line`) y medida
  620px — integrarla a `src/app/globals.css` (vocabulario shadcn, R8)
  cuando se construya la superficie de escritura.
- ~~Dead files~~ RESUELTO (R8, 2026-08-14): `color-control.tsx` ya
  estaba borrado en el branch; `components.json` volvió deliberadamente
  (baseColor zinc) — Ronny quiere `shadcn add` pronto.
- Dark mode: recorrer el replay de arriba (arranque: la paleta oscura
  pre-rediseño en git).
- Factura: primera superficie nueva nacida del sistema (fuera de v1).
