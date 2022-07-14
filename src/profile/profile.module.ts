import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ProfileController } from './profile.controller';

@Module({
  controllers: [ProfileController],
  imports: [UsersModule],
})
export class ProfileModule {}
