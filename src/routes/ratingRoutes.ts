import express from 'express';
import * as ratingController from '../controllers/ratingController';

const router = express.Router();

/**
 * @openapi
 * /api/ratingScore:
 *   post:
 *     summary: Crear una nueva valoración
 *     tags: [Rating]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userRated:
 *                 type: string
 *                 description: ID del usuario que va a ser valorado
 *               userRater:
 *                 type: string
 *                 description: ID del usuario que realiza la valoración
 *               score:
 *                 type: number
 *                 description: Puntuación otorgada
 *             required:
 *               - userRated
 *               - userRater
 *               - score
 *     responses:
 *       201:
 *         description: Valoración creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       500:
 *         description: Error al procesar la solicitud
 */
router.post('/',ratingController.createRatingController);

/**
 * @openapi
 * /api/ratingScore/scores:
 *   get:
 *     summary: Obtener las puntuaciones con paginación
 *     tags: [Rating]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de valoraciones por página
 *     responses:
 *       200:
 *         description: Lista de valoraciones con metadatos de paginación
 *       400:
 *         description: Parámetros de paginación inválidos
 *       500:
 *         description: Error al obtener las valoraciones
 */
router.get('/scores',ratingController.getRatingController);
router.get('/:userId',ratingController.getUserRatingController);
/**
 * @openapi
 * /api/ratingScore/{id}:
 *   delete:
 *     summary: Eliminar una valoración por ID
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la valoración a eliminar
 *     responses:
 *       200:
 *         description: Valoración eliminada con éxito
 *       500:
 *         description: Error al eliminar la valoración
 */
router.delete('/:id', ratingController.deleteScoreController);

export default router;