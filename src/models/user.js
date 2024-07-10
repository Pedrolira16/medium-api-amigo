import BaseModel from './base';

export default class User extends BaseModel {
    static load(sequelize, Datatypes) {
        return super.init({
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Datatypes.STRING,
                allowNull: false
            },
            email: {
                type: Datatypes.STRING,
                allowNull: false
            },
            password: {
                type: Datatypes.STRING,
                allowNull: false
            }
        },
            {
                paranoid: true,
                timestamps: true,
                sequelize,
                modalName: 'user',
                tableName: 'users',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                deletedAt: 'deleted_at'

            });
    }
    static associate(models) {
        this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
        this.hasMany(models.PostLike, { foreignKey: 'user_id', as: `post_likes` });
    }
}