"use strict";
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define(
    "books",
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      page: DataTypes.INTEGER,
      language: DataTypes.STRING,
      publisher_id: DataTypes.INTEGER
    },
    {}
  );
  books.associate = function(models) {
    // associations can be defined here
  };
  return books;
};
