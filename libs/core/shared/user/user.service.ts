import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'lib/common/entities';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}
  public async fetch(username: string): Promise<User & { password: string }> {
    const member = await this.dataSource.manager.findOneBy(User, {
      userName: username,
    });
    if (!member) throw new UnauthorizedException();
    return {
      id: member.id,
      userName: member.userName,
      email: member.email,
      role: member.role,
      password: member.password,
    };
  }
}
