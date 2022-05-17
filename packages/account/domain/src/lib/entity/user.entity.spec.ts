import { UserEntity } from './user.entity';

describe('User Entity', () => {
  it('should be properly initialized', () => {
    const model = UserEntity.create({
      id: '1',
      name: 'foo',
    });

    expect(model.id).toEqual('1');
    expect(model.name).toEqual('foo');
  });
});
