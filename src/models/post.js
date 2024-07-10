import { replace } from 'lodash';
import BaseModel from './base';

export default class Post extends BaseModel {
    static load(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            summary: {
                type: DataTypes.STRING,
                allowNull: false
            },
            total_likes: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            available_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
            {
                timestamps: true,
                sequelize,
                modelName: 'post',
                tableName: 'posts',
                createdAt: 'created_at',
                updatedAt: 'updated_at',

            });
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.hasMany(models.PostLike, { foreignKey: 'post_id', as: 'post_likes' });
    }
}

