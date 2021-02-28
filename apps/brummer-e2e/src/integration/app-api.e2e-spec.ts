import * as request from 'supertest';
// config
import { RegisterDto } from '../../../api/src/app/models/dto/user.dto';

const app = 'http://localhost:3333';

describe('ROOT', () => {
  it('should ping', () => {
    return request(app).get('/api').expect(200).expect({
      message: 'Welcome to api!',
    });
  });
});

describe('AUTH', () => {
  it('should register', () => {
    const user: RegisterDto = {
      username: 'username',
      password: 'password',
    };

    return request(app)
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .send(user);
  });
});
