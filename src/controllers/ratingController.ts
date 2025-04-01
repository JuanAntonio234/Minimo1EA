import { Request,Response } from "express";
import { error } from "console";
import * as ratingService from '../services/ratingService';


export const createRatingController = async (req: Request, res: Response) => {
    try {
        const{userRated,userRater,score}=req.body;
        const newScore=await ratingService.createRatingScore(userRated,userRater,score);
        res.status(201).json(newScore);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRatingController=async (req: Request, res: Response) => {
    try {
        const {id}=req.params;
        const {score}=req.body;
        const updatedScore=await ratingService.updateRatingScore(id,score);
        if(!updatedScore) {
            return res.status(404).json({ message: 'Puntuación no encontrada' });
        }
        res.json(updatedScore)
    }catch(error:any){
        res.status(400).json({ message: error.message });
    }
};

export const getUserRatingController=async (req: Request, res: Response) => {
    try{
        const data=await ratingService.getUserRating(req.params.id)
        res.json(data);
    }catch(error:any){
        res.status(500).json({message:error.message});
    }
}

//controlador para obtener puntuaciones paginadas
export const getRatingController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Obtener página y límite de los parámetros de consulta
    const page = parseInt(req.query.page?.toString() || '1', 10);
    const limit = parseInt(req.query.limit?.toString() || '10', 10);
    
    
    // Validar parámetros de paginación
    if (page < 1 || limit < 1 || limit > 100) {
      res.status(400).json({ message: 'Parámetros de paginación inválidos' });
      return;
    }
    
    // Obtener usuarios paginados
    const result = await ratingService.getPaginatedRating(page, limit);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al obtener las valoraciones:', error);
    res.status(500).json({ message: 'Error al obtener las valoraciones' });
  }
};

export const deleteScoreController=async (req:Request,res:Response)=>{
      try {
            const data = await ratingService.deleteRating(req.params.id);
            res.json({message: 'Valoración eliminada'});
            res.status(200).json({message:"Eliminado con éxito"});
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
;}