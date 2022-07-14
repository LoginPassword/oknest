import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class User extends Model {
  @Column({
    allowNull: true,
    unique: true,
  })
  email: string;

  @Column({
    allowNull: true,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    allowNull: false,
  })
  passwordHash: string;

  @Column({
    allowNull: false,
  })
  name: string;
}
