import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class UserService {

    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ){}      
    
    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }
    
    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (user == undefined){
            throw new NotFoundException ('Usuario não encontrado.');
        }
        return user;
    }

    async createUser(user: User): Promise<User> {
        const userCreated = await this.userRepository.save(user);
        console.log(userCreated);
        return userCreated;
    }
    
    async deleteUserById(id: number): Promise<string> {
        const userFinded = await this.userRepository.findOne(id);
        if (userFinded != undefined){
            await this.userRepository.delete(userFinded)
            return "Usuario deletado"
        }

        throw new NotFoundException ('Usuario não encontrado.');        
    }
}
