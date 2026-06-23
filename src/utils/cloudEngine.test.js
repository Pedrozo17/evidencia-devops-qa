// Importación compatible usando require
const { syncData } = require('./cloudEngine');

global.fetch = jest.fn();

describe('Pruebas de QA - modulo cloudEngine', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Prueba 1: Schema Testing (Estructura de Supabase)
  test('Validacion de esquema de respuesta de Supabase', async () => {
    const resMock = {
      id: "d3b07384-d113-4c4e-9c8e-cf022f87a321",
      device_os: "iOS",
      payload: { bateria: 85, red: "5G" },
      status_code: 201
    };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([resMock]),
    });

    const data = await syncData(); 
    
    expect(data[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      device_os: expect.any(String),
      payload: expect.any(Object),
      status_code: expect.any(Number)
    }));
  });

  // Prueba 2: Resiliencia ante Errores 401
  test('Manejo de error 401 sin romper la app', async () => {
    fetch.mockRejectedValueOnce(new Error('401 Unauthorized'));

    try {
      const data = await syncData();
      expect(data).toEqual([]);
    } catch (err) {
      fail('El catch no atrapo el error 401');
    }
  });

  // Prueba 3: Performance Testing (Límite < 1500ms)
  test('Limite de tiempo de respuesta menor a 1500ms', async () => {
    jest.setTimeout(1500);

    fetch.mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            json: jest.fn().mockResolvedValue([])
          });
        }, 1100); 
      });
    });

    const t1 = performance.now();
    await syncData();
    const t2 = performance.now();

    expect(t2 - t1).toBeLessThan(1500);
  });
});