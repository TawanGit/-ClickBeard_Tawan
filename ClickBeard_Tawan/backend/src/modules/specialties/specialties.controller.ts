import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSpecialtiesDto } from './dtos/create-specialties-dto';
import { SpecialtiesService } from './specialties.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('specialties')
@Controller('specialties')
export class SpecialtiesController {
  constructor(private specialtiesService: SpecialtiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new specialty' })
  @ApiBody({ type: CreateSpecialtiesDto })
  @ApiResponse({ status: 201, description: 'Specialty created successfully' })
  create(@Body() createSpecialtiesDto: CreateSpecialtiesDto) {
    return this.specialtiesService.create(createSpecialtiesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all specialties' })
  @ApiResponse({ status: 200, description: 'List of all specialties' })
  findAll() {
    return this.specialtiesService.findAll();
  }
}
