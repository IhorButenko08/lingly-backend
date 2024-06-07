import { Module } from '@nestjs/common';
import { WritingEventsGateway } from './writing.gateway';
import { SetService } from '../../set.service';
import { SetSchema, SetSchemaClass } from '../../../../schemas/set';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionService } from './sessions/session.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SetSchemaClass.name, schema: SetSchema },
    ]),
  ],
  providers: [WritingEventsGateway, SetService, SessionService],
})
export class WritingEventsModule {}
