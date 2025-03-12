import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherReviewService } from './teacher_review.service';
import { CreateTeacherReviewDto, UpdateTeacherReviewDto } from './dto';

@Controller('teacher-review')
export class TeacherReviewController {
  constructor(private readonly teacherReviewService: TeacherReviewService) {}

  @Post()
  create(@Body() createTeacherReviewDto: CreateTeacherReviewDto) {
    return this.teacherReviewService.create(createTeacherReviewDto);
  }

  @Get()
  findAll() {
    return this.teacherReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherReviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherReviewDto: UpdateTeacherReviewDto) {
    return this.teacherReviewService.update(+id, updateTeacherReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherReviewService.delete(+id);
  }

 
}
