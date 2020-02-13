var model = require("../models/index");
const { check, validationResult } = require("express-validator");

module.exports = function(app) {
  /* GET book listing. */
  app.get("/books", function(req, res, next) {
    model.books
      .findAll({})
      .then(book =>
        res.json({
          error: false,
          data: book
        })
      )
      .catch(error =>
        res.json({
          error: true,
          data: [],
          error: error
        })
      );
  });
  /* POST book. */
  app.post(
    "/books",

    [
      check("title")
        .isLength({ min: 3 })
        .withMessage("Title minimal 3 Huruf"),

      check("author")
        .isLength({ min: 3 })
        .withMessage("Author minimal 3 huruf"),

      //   check("page")
      //     .isInt({ gt: 0 })
      //     .withMessage("Minimal halaman 1"),

      check("language")
        .isLength({ min: 3 })
        .withMessage("Language minimal 3 huruf")

      //   check("publisher_id")
      //     .isInt({ gt: 0 })
      //     .withMessage("Publisher ID harus berupa angka")
    ],
    // (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(422).json({ errors: errors.array() });
    //   }
    // },

    function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { title, author, page, language, publisher_id } = req.body;
      model.books
        .create({
          title: title,
          author: author,
          page: page,
          language: language,
          publisher_id: publisher_id
        })
        .then(book =>
          res.status(201).json({
            error: false,
            data: book,
            message: "New book has been created."
          })
        )
        .catch(error =>
          res.json({
            error: true,
            data: [],
            error: error
          })
        );
    }
  );
  /* update book. */
  app.put(
    "/books/:id",

    [
      check("title")
        .isLength({ min: 3 })
        .withMessage("Title minimal 3 Huruf"),
      check("author")
        .isLength({ min: 3 })
        .withMessage("Author minimal 3 huruf"),

      //   check("page")
      //     .isInt({ gt: 0 })
      //     .withMessage("Minimal halaman 1"),

      check("language")
        .isLength({ min: 3 })
        .withMessage("Language minimal 3 huruf")

      //   check("publisher_id")
      //     .isInt({ gt: 0 })
      //     .withMessage("Publisher ID harus berupa angka")
    ],

    function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const book_id = req.params.id;
      const { title, author, page, language, publisher_id } = req.body;
      model.books
        .update(
          {
            title: title,
            author: author,
            page: page,
            language: language,
            publisher_id: publisher_id
          },
          {
            where: {
              id: book_id
            }
          }
        )
        .then(book =>
          res.json({
            error: false,
            message: "book has been updated."
          })
        )
        .catch(error =>
          res.json({
            error: true,
            error: error
          })
        );
    }
  );
  /* GET book listing. */
  /* Delete book. */
  app.delete("/books/:id", function(req, res, next) {
    const book_id = req.params.id;
    model.books
      .destroy({
        where: {
          id: book_id
        }
      })
      .then(status =>
        res.json({
          error: false,
          message: "book has been delete."
        })
      )
      .catch(error =>
        res.json({
          error: true,
          error: error
        })
      );
  });
};
