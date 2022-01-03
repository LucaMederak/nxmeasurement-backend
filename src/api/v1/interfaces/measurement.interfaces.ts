import mongoose from 'mongoose';
import { IUserDocument } from './user.interfaces';
import { IClientDocument } from './client.interfaces';

export interface IMeasurementInput {
  user: IUserDocument['_id'];
  client: IClientDocument['_id'];
  name: string;
  notes?: string;
  weight: number;
  height: number;
  pal: number;
  bmi: number;
  bmi_type: 'niedowaga' | 'norma' | 'nadwaga' | 'otyłość';
  ppm_mifflin: number;
  ppm_harris: number;
  cpm: number;
  whr?: number;
  whtr?: number;
  ymca?: number;
  //circuits
  chest_breath?: number;
  chest_exhaust?: number;
  shoulder?: number;
  shoulder_tonus?: number;
  waist?: number;
  hip?: number;
  forearm?: number;
  thigh?: number;
  calf?: number;
  //lappets
  // biceps: number;
  // triceps: number;
  // shoulder_blade: number;
  // ala_of_ilium: number;
  // iliac_spine: number;
}

export interface IMeasurementDocument
  extends IMeasurementInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
