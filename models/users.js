const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.CHAR(11),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    user_role: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    user_ship_com_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shipcoms',
        key: 'company_id'
      }
    },
    user_shop: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shops',
        key: 'shop_id'
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "fk_users_shipcoms1_idx",
        using: "BTREE",
        fields: [
          { name: "user_ship_com_id" },
        ]
      },
      {
        name: "fk_user_ship_com_id_shops1_idx",
        using: "BTREE",
        fields: [
          { name: "user_shop" },
        ]
      },
    ]
  });
};
