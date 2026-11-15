export const categories = {
  frutas: {
    intro: 'Si tu negocio compra frutas en volumen, prepara una lista con variedades, cantidades estimadas y frecuencia de compra. Con esos datos podremos revisar tu solicitud comercial.',
    cta: 'Cotizar frutas',
    details: 'Qué información ayuda a preparar tu cotización.',
    criteria: [
      ['Variedad y características.', 'Especifica el tipo de fruta y, si importa para tu operación, el calibre, maduración u otra preferencia.'],
      ['Unidad y cantidad.', 'Indica kilos, cajas u otra unidad de referencia. Las presentaciones se confirmarán al evaluar la cotización.'],
      ['Frecuencia.', 'Aclara si se trata de una compra puntual o de una necesidad recurrente.'],
    ],
    families: 'Familias de frutas que puedes consultar.',
    familiesIntro: 'Estos grupos sirven para organizar solicitudes; no representan un inventario confirmado ni disponibilidad permanente.',
    groups: [
      ['Cítricos', 'Puedes consultar variedades cítricas indicando la cantidad y unidad que requieres.'],
      ['Frutas de mesa', 'Especifica la variedad y las condiciones relevantes para su uso.'],
      ['Frutas tropicales', 'Describe las variedades y cantidades para evaluar la solicitud.'],
    ],
    request: 'Una consulta comercial más completa.',
    requestText: 'Cuantos más detalles operativos compartas, más fácil será revisar tu requerimiento sin intercambios innecesarios.',
    requestCta: 'Enviar lista de frutas',
    faq: [
      ['¿Muestran precios por kilo?', 'El sitio está orientado a cotizaciones empresariales; los precios y condiciones se definen conforme al requerimiento confirmado.'],
      ['¿Todas las variedades están disponibles?', 'No se garantiza disponibilidad permanente. Comparte tu lista para revisar las variedades solicitadas.'],
      ['¿Puedo incluir verduras en la misma consulta?', 'Sí. Puedes describir ambas categorías en una sola solicitud.'],
    ],
    final: 'Cuéntanos qué frutas necesita tu negocio.',
  },
  verduras: {
    intro: 'Prepara tu solicitud de hortalizas indicando productos, cantidades, presentaciones y frecuencia aproximada. VEGANFRESH evalúa consultas empresariales de compras mayoristas en Lima.',
    cta: 'Cotizar verduras',
    details: 'Especificaciones que facilitan tu cotización.',
    criteria: [
      ['Tipo de producto.', 'Indica con claridad la variedad y las características relevantes para tu cocina o servicio de alimentación.'],
      ['Presentación y volumen.', 'Comparte la unidad de compra deseada y una cantidad estimada. La presentación final se confirmará comercialmente.'],
      ['Regularidad de compra.', 'Aclara si necesitas una cotización puntual o si esperas realizar compras frecuentes.'],
    ],
    families: 'Organiza tu lista de hortalizas.',
    familiesIntro: 'Los siguientes grupos son una guía de consulta, no una relación de stock ni promesa de entrega.',
    groups: [
      ['Hojas', 'Indica variedades y cantidades que se ajusten a tus preparaciones.'],
      ['Raíces y tubérculos', 'Especifica los productos y unidades de referencia.'],
      ['Hortalizas de fruto', 'Añade variedades y características necesarias para tu operación.'],
    ],
    request: 'Un requerimiento claro ayuda a cotizar mejor.',
    requestText: 'Incluye distrito de atención, volúmenes y observaciones; si atiendes varios establecimientos, puedes señalarlo en el formulario.',
    requestCta: 'Enviar lista de verduras',
    faq: [
      ['¿Debo conocer las cantidades exactas?', 'Puedes indicar cantidades aproximadas. Las condiciones se revisarán antes de confirmar cualquier suministro.'],
      ['¿Es posible enviar una lista mixta de frutas y verduras?', 'Sí. El formulario permite describir un requerimiento combinado.'],
      ['¿Publican inventario actualizado?', 'No publicamos existencias en tiempo real. Se confirmará la disponibilidad al evaluar la solicitud.'],
    ],
    final: 'Describe tu compra mayorista de verduras.',
  },
} as const;
