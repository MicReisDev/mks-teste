import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { AuthMiddleware } from './Middleware/auth.middleware';
import { MovieModule } from './Movie/movie.module';
import { AllRoutesMiddleware } from './Middleware/allroutes.middleware';

@Module({
  imports: [UserModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('movie');
    //consumer.apply(AllRoutesMiddleware).forRoutes('*');
  }
}
