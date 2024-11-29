import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}
  create(createPlayerDto: CreatePlayerDto) {
    return this.prisma.player.create({
      data: {
        ...createPlayerDto,
        birthDate: new Date(createPlayerDto.birthDate),
      },
    });
  }

  async findAll() {
    const players = await this.prisma.player.findMany();
    const playersWithStrippedBirthDate = players.map((player) => ({
      ...player,
      birthDate: player.birthDate.toISOString().split('T')[0],
    }));
    return playersWithStrippedBirthDate;
  }

  async findOne(id: number) {
    const player = await this.prisma.player.findUnique({
      where: { id },
    });
    return {
      ...player,
      birthDate: player.birthDate.toISOString().split('T')[0],
    };
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
    });
  }

  remove(id: number) {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}
