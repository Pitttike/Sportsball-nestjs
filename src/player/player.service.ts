import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }
    return {
      ...player,
      birthDate: player.birthDate.toISOString().split('T')[0],
    };
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
      const updatedPlayer = await this.prisma.player.update({
        where: { id },
        data: updatePlayerDto,
    });
      return updatedPlayer;
    } catch (error) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number) {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}
