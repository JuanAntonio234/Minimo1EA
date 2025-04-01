import mongoose, { Schema, model } from 'mongoose';

export interface IRating{
    userRated: mongoose.Types.ObjectId; 
    userRater: mongoose.Types.ObjectId;
    score:number;
    createdAt:Date;
}

export const ratingSchema=new Schema<IRating>({
    userRated: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userRater: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, min: 1, max: 5, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ratingModel = model<IRating>('Rating',ratingSchema);
export default ratingModel;