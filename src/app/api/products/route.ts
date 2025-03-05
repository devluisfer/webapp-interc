import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://webapp-interc-production.up.railway.app/products');
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Error al obtener productos' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    
    console.error('Error en GET /api/products:', error); //Ahora el error se usa y no causa warning
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
