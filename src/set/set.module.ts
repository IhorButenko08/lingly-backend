import { Module } from '@nestjs/common';
import { SetController } from './set.controller';
import { SetService } from './set.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SetSchema, SetSchemaClass } from '../../schemas/set';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SetSchemaClass.name, schema: SetSchema },
    ]),
  ],
  controllers: [SetController],
  providers: [SetService],
})
export class SetModule {}
