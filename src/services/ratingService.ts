import { Request, Response } from 'express';
import ratingModel, { IRating } from '../models/rating';

export const createRatingScore = async (userRated: string, userRater: string, score: number): Promise<IRating> => {
    if (userRated === userRater) {
        throw new Error('No puedes valorarte a ti mismo');
      }
    
      const existingScore = await ratingModel.findOne({ userRated, userRater });
      if (existingScore) {
        throw new Error('Ya has valorado a este usuario');
      }
    
      return await ratingModel.create({ userRated, userRater, score });
    };




    export const getPaginatedRating= async (userId: number,page:number) => {    }
/*
export const getPaginatedRating = async (page: number = 1, limit: number = 10): Promise<{
    users: IUser[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}> => {
  try {
    const skip = (page - 1) * limit;
    
    const query = {};
    
    console.log("Consulta MongoDB:", JSON.stringify(query));
    
    if (mongoose.connection.readyState !== 1) {
      throw new Error("La conexión a MongoDB no está disponible");
    }
    
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("La base de datos no está disponible");
    }
    
    const collection = db.collection('users');
    
    const users = await collection.find(query)
      .skip(skip)
      .limit(limit)
      .project({ password: 0 }) // Excluir la contraseña
      .toArray();
    
    const totalUsers = await collection.countDocuments(query);
    
    const totalPages = Math.ceil(totalUsers / limit);
    
    console.log(`Encontrados ${users.length} usuarios de un total de ${totalUsers}`);
    
    return {
      users: users as unknown as IUser[],
      totalUsers,
      totalPages,
      currentPage: page
    };
  } catch (error) {
    console.error('Error al obtener usuarios paginados:', error);
    throw error;
  }
};*/





export const updateRatingScore = async (id: string, updateData: Partial<IRating>): Promise<IRating | null> => {
    return await ratingModel.findByIdAndUpdate(id, updateData, { new: true });

  };

export const getUserRating= async (userId: string) => {
    const scores = await ratingModel.find({ userRated: userId });
  
    if (scores.length === 0) {
      return { averageScore: 0, totalRatings: 0 };
    }
  
    const totalScore = scores.reduce((acc, val) => acc + val.score, 0);
    return { averageScore: totalScore / scores.length, totalRatings: scores.length };
  };
  

export const deleteRating = async (id: string): Promise<IRating|null> => {
    return await ratingModel.findByIdAndDelete(id);
  };

  