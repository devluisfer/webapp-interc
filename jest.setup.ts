import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import fetchMock from 'jest-fetch-mock';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: '/',
  })),
}));

fetchMock.enableMocks(); // ✅ Habilita `fetchMock` para que Jest reconozca `fetch`
export default {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };