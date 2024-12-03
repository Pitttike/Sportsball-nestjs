import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Post(':id/addPlayer/:playerId')
  addPlayer(@Param('id') id: string, @Param('playerId') playerId: string) {
    return this.teamsService.addPlayer(+id, +playerId);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id(\\d+)')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Get(':id/players')
  findPlayersOfTeam(@Param('id') id: string) {
    return this.teamsService.findPlayersOfTeam(+id);
  }

  @Get('players')
  findPlayers() {
    return this.teamsService.findPlayers();
  }
  
  @Delete(':id(\\d+)')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }

  @Delete(':id/removePlayer/:playerId')
  removePlayer(@Param('id') id: string, @Param('playerId') playerId: string) {
    return this.teamsService.removePlayer(+id, +playerId);
  }
  
}
