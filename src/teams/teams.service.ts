import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  create(createTeamDto: CreateTeamDto) {
    return this.prisma.team.create({
      data: {
        ...createTeamDto,
      },
    });
  }

  addPlayer(id: number, playerId: number) {
    return this.prisma.team.update({
      where: { id },
      data: {
        players: { connect: { id: playerId } },
      },
    });
  }

  findAll() {
    return this.prisma.team.findMany();
  }

  async findPlayers() {
    const teams = await this.prisma.team.findMany({
      select: {
        country: true,
        players: true,
      },
    });
    return teams;
  }

  findOne(id: number) {
    return this.prisma.team.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.prisma.team.update({
      where: { id },
      data: {
        ...updateTeamDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.team.delete({
      where: { id },
    });
  }
}
