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
		}, {
			timestamps: true,
			sequelize,
			modelName: 'post',
			tableName: 'posts',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			scopes: {
				withUserLike: id => ({
					attributes: [
						sequelize.literal(
							`CASE WHEN (
									SELECT 1
									FROM post_likes
									WHERE post_likes.post_id = post.id
									AND post_likes.user_id = :user_id
									AND post_likes.deleted_at is NULL
								) is not null THEN true ELSE false END`
						), "is_liked",
					],
					replacements: { user_id: id }
				})
			}
		});
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		this.hasMany(models.PostLike, { foreignKey: 'post_id', as: 'post_likes' });
	}
};