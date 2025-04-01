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

  