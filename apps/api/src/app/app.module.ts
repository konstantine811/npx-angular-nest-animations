import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// config
import { commonConfig } from '@api-server/config/common.config';
const userData = `${commonConfig.db.user}:${commonConfig.db.password}`;
// Modules
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRoot(
      `mongodb+srv://${userData}@${commonConfig.db.cluster}/${commonConfig.db.database}?${commonConfig.db.access}`
    ),
    AuthModule,
    UserModule,
    SharedModule,
    GoogleAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
