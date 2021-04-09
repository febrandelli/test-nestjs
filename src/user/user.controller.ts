import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, UseFilters } from '@nestjs/common';
import { NotFoundExceptionFilter } from 'src/filters/notfound-exception.filter';
import { User } from './user.entity';
import { UserService } from './shared/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get(':id')
    @UseFilters(new NotFoundExceptionFilter)
    async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Post()
    @HttpCode(204)
    async create(@Body() user: User): Promise<User> {
        return this.userService.createUser(user)
    }

    @Delete(':id')
    @UseFilters(new NotFoundExceptionFilter)
    async deleteById(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.userService.deleteUserById(id);
    }
}
