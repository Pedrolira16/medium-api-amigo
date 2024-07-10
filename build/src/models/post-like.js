"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _base=_interopRequireDefault(require("./base"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}class Post extends _base.default{static load(sequelize,DataTypes){return super.init({id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},user_id:{type:DataTypes.INTEGER,allowNull:false,references:{model:"users",key:"id"}},post_id:{type:DataTypes.INTEGER,allowNull:false,references:{model:"posts",key:"id"}},is_deleted:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}},{timestamps:true,sequelize,modelName:"post_likes",tableName:"post_likes",createdAt:"created_at",updatedAt:"updated_at"})}static associate(models){this.belongsTo(models.User,{foreignKey:"user_id",as:"user"});this.belongsTo(models.Post,{foreignKey:"post_id",as:"post"})}}exports.default=Post;
//# sourceMappingURL=post-like.js.map