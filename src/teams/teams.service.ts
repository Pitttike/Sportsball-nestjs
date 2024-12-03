import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
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

  async findPlayersOfTeam(id: number) {
    const team = await this.prisma.team.findUnique({
      where: { id },
      select: {
        players: true,
      },
    });
    return team?.players;
  }

  async findOne(id: number) {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
    }
    return team;
  }

  remove(id: number) {
    return this.prisma.team.delete({
      where: { id },
    });
  }

  removePlayer(id: number, playerId: number) {
    return this.prisma.team.update({
      where: { id },
      data: { players: { disconnect: { id: playerId } } },
    });
  }
}
