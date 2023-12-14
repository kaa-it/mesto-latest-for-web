export const getResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}