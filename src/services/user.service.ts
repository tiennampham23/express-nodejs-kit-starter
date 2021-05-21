import { getRepository } from "typeorm";
import { UserEntity } from "../entities";

const getUserByUserName =  async (username: string): Promise<UserEntity> => {
    const repository = getRepository(UserEntity);
    const user = await repository.findOne({
        username
    });
    return user;
};

const getUserById =  async (id: number): Promise<UserEntity> => {
    const repository = getRepository(UserEntity);
    const user = await repository.findOne({
        id
    });
    return user;
};

const createUser = async (username: string, password: string): Promise<void> => {
    const repository = getRepository(UserEntity);
    await repository.save(new UserEntity(username, password, ""));
};

const getUsers = async (): Promise<UserEntity[]> => {
    const repository = getRepository(UserEntity);
    const users = await repository.find({});
    return users;
};
export const userService = {
    getUserByUserName,
    createUser,
    getUserById,
    getUsers
};