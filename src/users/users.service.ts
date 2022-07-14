import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { User } from './user.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetAllUserDto } from './dto/get-all-user.dto';

@Injectable()
export class UsersService {
  async checkEmailExists(email: string) {
    return !!email && !!(await User.findOne({ where: { email } }));
  }

  async checkPhoneNumberExists(phoneNumber: string) {
    return !!phoneNumber && !!(await User.findOne({ where: { phoneNumber } }));
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.email && (await this.checkEmailExists(createUserDto.email))) {
      throw new ConflictException('Email already exists');
    }

    if (createUserDto.phoneNumber && (await this.checkPhoneNumberExists(createUserDto.phoneNumber))) {
      throw new ConflictException('Phone number already exists');
    }

    if (createUserDto.phoneNumber) {
      createUserDto.phoneNumber = createUserDto.phoneNumber.replace('+', '');
    }

    const passwordHash = crypto
      .createHash('sha256')
      .update(createUserDto.password + process.env.PASSWORD_SALT)
      .digest('hex');

    const { phoneNumber, email, name } = createUserDto;
    return (await User.create({ phoneNumber, email, name, passwordHash })).get();
  }

  getByLogin(emailOrPhoneNumber: string) {
    return User.findOne({
      where: {
        [Op.or]: {
          email: emailOrPhoneNumber,
          phoneNumber: emailOrPhoneNumber,
        },
      },
    });
  }

  getById(id: string) {
    return User.findOne({ where: { id }, attributes: { exclude: ['passwordHash'] }, raw: true });
  }

  getAllAndCount(getAllUserDto: GetAllUserDto) {
    return User.findAndCountAll({
      where: { ...getAllUserDto.filter },
      limit: getAllUserDto.limit || 10,
      offset: getAllUserDto.skip || 0,
      order: [[getAllUserDto.sort || 'id', getAllUserDto.order || 'asc']],
      attributes: { exclude: ['passwordHash'] },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!Object.keys(updateUserDto).length) {
      throw new BadRequestException('Empty body');
    }

    const { password, ...updateData } = updateUserDto;

    if (updateData.email && (await this.checkEmailExists(updateData.email))) {
      throw new ConflictException('Email already exists');
    }

    if (updateData.phoneNumber && (await this.checkPhoneNumberExists(updateData.phoneNumber))) {
      throw new ConflictException('Phone number already exists');
    }

    if (password) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      updateData.passwordHash = crypto
        .createHash('sha256')
        .update(password + process.env.PASSWORD_SALT)
        .digest('hex');
    }

    return User.update(updateData, { where: { id } });
  }

  delete(id: string) {
    return User.destroy({ where: { id } });
  }
}
