import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { SetSchemaClass } from '../../schemas/set';
import flashcard from './interfaces/flashcard';

@Injectable()
export class SetService {
  constructor(
    @InjectModel(SetSchemaClass.name)
    private readonly setModel: Model<SetSchemaClass>,
  ) {}

  async createSet(setData: {
    name: string;
    set: flashcard[];
  }): Promise<{ id: ObjectId }> {
    const createSet = new this.setModel(setData);
    const newSet = await createSet.save();
    return { id: newSet.id };
  }

  async findAll(): Promise<SetSchemaClass[]> {
    return this.setModel.find().exec();
  }

  async FindById(id: string): Promise<SetSchemaClass> {
    return await this.setModel.findById(id).exec()
  }
}
