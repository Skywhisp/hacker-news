import { Item } from '../interfaces/item.ts';

const BASE_URL: string = 'https://hacker-news.firebaseio.com/v0';

/**
 * Выполняет запрос по указанному URL и возвращает данные в формате JSON.
 *
 * @template T
 * @param {string} url - URL для запроса.
 * @returns {Promise<T>} - Промис с результатом запроса.
 * @throws {Error} - Если запрос не успешен.
 */
async function fetchJson<T>(url: string): Promise<T> {
    const response: Response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return response.json();
}

/**
 * Получает список лучших историй.
 *
 * @returns {Promise<number[]>} - Промис с массивом ID лучших историй.
 */
export const getTopStories = async (): Promise<number[]> => {
    return fetchJson<number[]>(`${BASE_URL}/topstories.json`);
};

/**
 * Получает список лучших историй.
 *
 * @returns {Promise<number[]>} - Промис с массивом ID лучших историй.
 */
export const getBestStories = async (): Promise<number[]> => {
    return fetchJson<number[]>(`${BASE_URL}/beststories.json`);
};

/**
 * Получает список новых историй.
 *
 * @returns {Promise<number[]>} - Промис с массивом ID новых историй.
 */
export const getNewStories = async (): Promise<number[]> => {
    return fetchJson<number[]>(`${BASE_URL}/newstories.json`);
};

/**
 * Получает данные элемента по его ID.
 *
 * @param {number} id - ID элемента.
 * @returns {Promise<Item>} - Промис с данными элемента.
 */
export const getItem = async (id: number): Promise<Item> => {
    return fetchJson<Item>(`${BASE_URL}/item/${id}.json`);
};
