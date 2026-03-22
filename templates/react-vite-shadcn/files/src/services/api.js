/**
 * API service - define your backend API calls here.
 *
 * Pattern:
 *   import http from './http';
 *   import log from './log';
 *
 *   export const fetchItems = async () => {
 *     try {
 *       const response = await http.get('/items');
 *       log.debug('Fetched items:', response.data);
 *       return response.data;
 *     } catch (error) {
 *       log.error('Error fetching items:', error);
 *       throw error;
 *     }
 *   };
 *
 *   export const createItem = async (data) => {
 *     try {
 *       const response = await http.post('/items', data);
 *       log.debug('Created item:', response.data);
 *       return response.data;
 *     } catch (error) {
 *       log.error('Error creating item:', error);
 *       throw error;
 *     }
 *   };
 */
