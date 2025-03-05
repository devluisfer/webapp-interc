import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'http://localhost:3001'; // JSON Server en local

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(`${API_URL}/products`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}
